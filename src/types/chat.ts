export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
  priority?: "high" | "medium" | "low";
  type?: "incident" | "recommendation" | "alert";
  attachment?: {
    name: string;
    url: string;
    type: string;
  };
  metadata?: {
    location?: string;
    incidentType?: string;
    severity?: string;
    suggestedActions?: string[];
  };
}