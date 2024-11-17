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
      content: "Solana Development Assistant initialized. Ready to help with blockchain development, analysis, and insights.",
      timestamp: new Date(),
      type: "alert",
      metadata: {
        suggestedActions: [
          "Analyze wallet activities",
          "Explore Solana network extensions",
          "Build Solana programs",
          "Learn about NFT projects"
        ]
      }
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);

  const handleSubmit = async (e: React.FormEvent, attachment?: File) => {
    e.preventDefault();
    if (!input.trim() && !attachment) return;

    let attachmentData;
    if (attachment) {
      try {
        const reader = new FileReader();
        attachmentData = await new Promise((resolve) => {
          reader.onload = (e) => resolve({
            name: attachment.name,
            url: e.target?.result as string,
            type: attachment.type
          });
          reader.readAsDataURL(attachment);
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to process attachment",
        });
        return;
      }
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      type: "incident",
      attachment: attachmentData
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage([...messages, userMessage]);
      
      if (response.choices?.[0]?.message?.content) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.choices[0].message.content,
          timestamp: new Date(),
          type: "recommendation",
          priority: "medium",
          metadata: {
            suggestedActions: [
              "View on-chain data",
              "Check wallet activity",
              "Deploy program",
              "Analyze NFT market"
            ]
          }
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        if (isVoiceOutputEnabled) {
          speak(assistantMessage.content);
        }

        toast({
          title: "Response received",
          description: "New insights from Solana Assistant",
        });
      }
    } catch (error) {
      console.error("Failed to process message:", error);
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