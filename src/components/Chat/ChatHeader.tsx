import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ChatHeader = () => (
  <div className="mb-4">
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Solana Development Assistant - AI-powered guidance for blockchain development and analysis
      </AlertDescription>
    </Alert>
  </div>
);

export default ChatHeader;