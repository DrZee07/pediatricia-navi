
import { cn } from "@/lib/utils";
import { MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

export const ChatMessage = ({ content, role, isLoading = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 py-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <Card className={cn(
        "max-w-[80%] overflow-hidden transition-all duration-300 hover:shadow-md",
        role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
              {role === "user" ? <User className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
            </div>
            <div className="flex-1 space-y-2 overflow-hidden">
              <div className="space-y-2 leading-relaxed">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.4s]"></div>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{content}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
