import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./MessageItem";
import { Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFeedback = async (isPositive: boolean) => {
    toast({
      title: "Feedback Recorded",
      description: `Thank you for your feedback. This helps improve our recommendations.`,
    });
  };

  return (
    <ScrollArea className="h-[600px] pr-4 mb-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            onFeedback={handleFeedback}
          />
        ))}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;