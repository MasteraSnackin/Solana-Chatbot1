import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ChatHeader = () => (
  <div className="mb-4">
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Active Emergency Response Session - All communications are encrypted and logged
      </AlertDescription>
    </Alert>
  </div>
);

export default ChatHeader;