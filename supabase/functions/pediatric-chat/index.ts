
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NelsonContentRow {
  chunk_id: string;
  chapter: string;
  content: string;
}

interface ChatRequest {
  message: string;
  history: Array<{role: string, content: string}>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials are not set');
    }

    const { message, history }: ChatRequest = await req.json();
    
    // Query the NelsonContent table to find relevant content
    const searchResponse = await fetch(`${SUPABASE_URL}/rest/v1/NelsonContent?select=*&or=(content.ilike.%25${encodeURIComponent(message)}%25)`, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    const relevantContent: NelsonContentRow[] = await searchResponse.json();
    
    // Extract content from the search results
    const contextContent = relevantContent.map(row => `Chapter: ${row.chapter}\n${row.content}`).join('\n\n');

    // System prompt with instructions
    const systemPrompt = `You are a pediatric assistant AI that provides accurate information based on the Nelson Textbook of Pediatrics. 
    Focus on providing helpful, evidence-based information drawn from the textbook. Always cite the relevant chapters.
    If you don't have information from the textbook to answer a question, acknowledge that and suggest consulting a healthcare professional.
    Here is relevant content from the Nelson Textbook that may help you answer the current question:
    
    ${contextContent}`;

    // Format the chat history for Gemini API
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as the first message if there's no history yet
    if (formattedHistory.length === 0) {
      formattedHistory.push({
        role: "model",
        parts: [{ text: systemPrompt }]
      });
    }

    // Add the user's current message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedHistory,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
          topK: 40,
          topP: 0.95,
        },
      }),
    });

    const geminiData = await geminiResponse.json();
    console.log("Gemini API response:", JSON.stringify(geminiData));

    let responseText = "I'm sorry, I couldn't generate a response. Please try again.";
    
    if (geminiData.candidates && geminiData.candidates.length > 0 && 
        geminiData.candidates[0].content && geminiData.candidates[0].content.parts && 
        geminiData.candidates[0].content.parts.length > 0) {
      responseText = geminiData.candidates[0].content.parts[0].text;
    }

    // Return the formatted response
    return new Response(JSON.stringify({ 
      response: responseText,
      sourceChapters: relevantContent.map(row => row.chapter).filter((value, index, self) => self.indexOf(value) === index)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in pediatric-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
