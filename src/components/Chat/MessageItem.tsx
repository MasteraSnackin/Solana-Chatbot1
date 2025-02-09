import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, ThumbsDown, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";

interface MessageItemProps {
  message: Message;
  onFeedback: (isPositive: boolean) => void;
}

const MessageItem = ({ message, onFeedback }: MessageItemProps) => {
  return (
    <div
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
        role="article"
        aria-label={`${message.role} message`}
      >
        {message.type === "alert" && (
          <Badge variant="destructive" className="mb-2">
            System Alert
          </Badge>
        )}
        <div className="mb-2">{message.content}</div>
        {message.attachment && (
          <div className="mt-2 mb-2">
            {message.attachment.type.startsWith('image/') ? (
              <img 
                src={message.attachment.url} 
                alt={message.attachment.name}
                className="max-w-full rounded-lg"
              />
            ) : (
              <a 
                href={message.attachment.url}
                download={message.attachment.name}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
              >
                <Paperclip className="h-4 w-4" />
                {message.attachment.name}
              </a>
            )}
          </div>
        )}
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
                onClick={() => onFeedback(true)}
                className="h-6 w-6 p-0"
                aria-label="Positive feedback"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFeedback(false)}
                className="h-6 w-6 p-0"
                aria-label="Negative feedback"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;