import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Volume2, VolumeX, Paperclip } from "lucide-react";
import { useState, useRef } from "react";
import { startVoiceRecognition } from "@/utils/voiceUtils";
import { toast } from "@/components/ui/use-toast";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent, attachment?: File) => void;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select a file smaller than 10MB",
        });
        return;
      }
      setSelectedFile(file);
      toast({
        title: "File attached",
        description: file.name,
      });
    }
  };

  const handleSubmitWithAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, selectedFile || undefined);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmitWithAttachment} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1"
        aria-label="Message input"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        className={selectedFile ? "bg-blue-100" : ""}
        aria-label="Attach file"
      >
        <Paperclip className="h-4 w-4" />
      </Button>
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