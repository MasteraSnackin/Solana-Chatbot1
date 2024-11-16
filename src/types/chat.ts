export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  type: "incident" | "recommendation" | "alert";
  priority?: "high" | "medium" | "low";
  metadata?: {
    suggestedActions?: string[];
    ipAddress?: string;
    location?: string;
  };
}