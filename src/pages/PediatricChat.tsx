
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChatMessage } from "@/components/pediatric-chat/ChatMessage";
import { ChatInput } from "@/components/pediatric-chat/ChatInput";
import { useToast } from "@/components/ui/use-toast";
import { Book, SparkleIcon } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const PediatricChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceChapters, setSourceChapters] = useState<string[]>([]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message when the component mounts
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Welcome to NelsonAssist-AI Pediatric Chat! I'm your pediatric assistant based on the Nelson Textbook of Pediatrics. How can I help you today?"
        }
      ]);
    }
  }, []);

  const handleSend = async (message: string) => {
    try {
      // Add user message to the chat
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: message
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Format conversation history for the API
      const history = messages
        .filter(msg => msg.id !== "welcome")
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("pediatric-chat", {
        body: {
          message,
          history
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Add assistant response to the chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Set source chapters if available
      if (data.sourceChapters && data.sourceChapters.length > 0) {
        setSourceChapters(data.sourceChapters);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in container mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-primary">
          <SparkleIcon className="inline-block mr-2 h-8 w-8 text-accent animate-pulse-slow" />
          Pediatric Chat Assistant
        </h1>
        <p className="text-muted-foreground">
          Ask pediatric medicine questions and get evidence-based answers from the Nelson Textbook of Pediatrics
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Card className="border shadow-lg h-[600px] flex flex-col transition-all duration-300 hover:shadow-xl">
              <CardHeader className="px-4 py-3 border-b">
                <CardTitle className="text-lg font-medium">Chat with NelsonAssist-AI</CardTitle>
                <CardDescription>AI-powered pediatric assistant</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex flex-col space-y-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                    />
                  ))}
                  {isLoading && (
                    <ChatMessage
                      role="assistant"
                      content=""
                      isLoading={true}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <ChatInput onSend={handleSend} isLoading={isLoading} />
              </div>
            </Card>
          </div>
          
          {sourceChapters.length > 0 && (
            <div className="w-full md:w-64 space-y-4">
              <Card className="border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardHeader className="px-4 py-3 border-b">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    Reference Chapters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm">
                    {sourceChapters.map((chapter, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent"></div>
                        {chapter}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PediatricChat;
