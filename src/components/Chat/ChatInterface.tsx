import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Message } from "@/types/chat";
import { sendMessage } from "@/services/chat";
import { speak } from "@/utils/voiceUtils";

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
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);

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
      const data = await sendMessage([...messages, userMessage]);
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
      
      // Only speak if voice output is enabled
      if (isVoiceOutputEnabled) {
        speak(assistantMessage.content);
      }
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
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onVoiceOutputToggle={setIsVoiceOutputEnabled}
      />
    </Card>
  );
};

export default ChatInterface;