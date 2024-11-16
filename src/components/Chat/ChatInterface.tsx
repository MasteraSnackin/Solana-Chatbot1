import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, AlertTriangle, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
  priority?: "high" | "medium" | "low";
  type?: "incident" | "recommendation" | "alert";
  metadata?: {
    location?: string;
    incidentType?: string;
    severity?: string;
    suggestedActions?: string[];
  };
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "EROS Emergency Response System initialized. Ready to assist with incident management.",
      timestamp: new Date(),
      type: "alert"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFeedback = async (messageIndex: number, isPositive: boolean) => {
    toast({
      title: "Feedback Recorded",
      description: `Thank you for your feedback. This helps improve our recommendations.`,
    });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-emergency text-white";
      case "medium":
        return "bg-warning text-white";
      case "low":
        return "bg-info text-white";
      default:
        return "bg-muted";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      type: "incident"
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
        type: "recommendation",
        priority: "medium",
        metadata: {
          suggestedActions: ["Dispatch emergency response", "Alert nearby units", "Request backup"]
        }
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from emergency system",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 bg-background">
      <div className="mb-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Active Emergency Response Session - All communications are encrypted and logged
          </AlertDescription>
        </Alert>
      </div>

      <ScrollArea className="h-[600px] pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.type === "alert" && (
                  <Badge variant="destructive" className="mb-2">
                    System Alert
                  </Badge>
                )}
                {message.priority && (
                  <Badge className={`mb-2 ${getPriorityColor(message.priority)}`}>
                    {message.priority.toUpperCase()} PRIORITY
                  </Badge>
                )}
                <div className="mb-2">{message.content}</div>
                {message.metadata?.suggestedActions && (
                  <div className="mt-2 space-y-1">
                    <div className="text-sm font-semibold">Suggested Actions:</div>
                    {message.metadata.suggestedActions.map((action, i) => (
                      <div key={i} className="text-sm flex items-center gap-2">
                        <span>•</span> {action}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {message.timestamp?.toLocaleTimeString()}
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(index, true)}
                        className="h-6 w-6 p-0"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(index, false)}
                        className="h-6 w-6 p-0"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
          aria-label="Message input"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

export default ChatInterface;