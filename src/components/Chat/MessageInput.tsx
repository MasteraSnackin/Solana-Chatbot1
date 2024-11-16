import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { startVoiceRecognition } from "@/utils/voiceUtils";
import { toast } from "@/components/ui/use-toast";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onVoiceOutputToggle: (enabled: boolean) => void;
}

const MessageInput = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onVoiceOutputToggle,
}: MessageInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);

  const startListening = () => {
    const newRecognition = startVoiceRecognition(
      (text) => {
        onInputChange(text);
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
      }
    );

    if (newRecognition) {
      setIsListening(true);
      setRecognition(newRecognition);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setRecognition(null);
    }
  };

  const toggleVoiceOutput = () => {
    setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
    onVoiceOutputToggle(!isVoiceOutputEnabled);
    toast({
      title: !isVoiceOutputEnabled ? "Voice Output Enabled" : "Voice Output Disabled",
      description: !isVoiceOutputEnabled ? "Assistant will speak responses" : "Assistant will be silent",
    });
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
        onMouseDown={startListening}
        onMouseUp={stopListening}
        onMouseLeave={stopListening}
        className={isListening ? "bg-red-100" : ""}
        aria-label="Hold to speak"
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleVoiceOutput}
        className={!isVoiceOutputEnabled ? "bg-gray-100" : ""}
        aria-label="Toggle voice output"
      >
        {isVoiceOutputEnabled ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </Button>
      <Button type="submit" disabled={isLoading} aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;