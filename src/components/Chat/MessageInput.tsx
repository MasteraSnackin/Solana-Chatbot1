import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MessageInput = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: MessageInputProps) => (
  <form onSubmit={onSubmit} className="flex gap-2">
    <Input
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="Type your message..."
      disabled={isLoading}
      className="flex-1"
      aria-label="Message input"
    />
    <Button type="submit" disabled={isLoading} aria-label="Send message">
      <Send className="h-4 w-4" />
    </Button>
  </form>
);

export default MessageInput;