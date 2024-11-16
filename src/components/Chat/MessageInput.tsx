import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { startVoiceRecognition } from "@/utils/voiceUtils";
import { toast } from "@/components/ui/use-toast";

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
}: MessageInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const handleVoiceInput = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
      setRecognition(null);
      return;
    }

    const newRecognition = startVoiceRecognition(
      (text) => {
        onInputChange(text);
        setIsListening(false);
        setRecognition(null);
        toast({
          title: "Voice captured",
          description: "Your message is ready to send.",
        });
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Voice Input Error",
          description: error,
        });
        setIsListening(false);
        setRecognition(null);
      }
    );

    if (newRecognition) {
      setIsListening(true);
      setRecognition(newRecognition);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1"
        aria-label="Message input"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleVoiceInput}
        className={isListening ? "bg-red-100" : ""}
        aria-label="Toggle voice input"
      >
        {isListening ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      <Button type="submit" disabled={isLoading} aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;