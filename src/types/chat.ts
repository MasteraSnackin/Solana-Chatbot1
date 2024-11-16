export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
  priority?: "high" | "medium" | "low";
  type?: "incident" | "recommendation" | "alert";
  metadata?: {
    location?: string;
    incidentType?: string;
    severity?: string;
    suggestedActions?: string[];
  };
}