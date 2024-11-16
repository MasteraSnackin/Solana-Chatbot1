import { OpenAI } from "openai";
import { toast } from "@/components/ui/use-toast";

const NEBIUS_API_KEY = import.meta.env.VITE_NEBIUS_API_KEY || 'default_key_for_development';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || 'default_key_for_development';

const nebiusClient = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: NEBIUS_API_KEY,
  dangerouslyAllowBrowser: true
});

const groqClient = new OpenAI({
  baseURL: "https://api.groq.com/v1/",
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface IncidentAnalysis {
  priority: number;
  recommendation: string;
  requiredResources: string[];
  estimatedResponseTime: number;
  nearestUnits: string[];
}

export const analyzeIncident = async (description: string): Promise<IncidentAnalysis> => {
  try {
    const completion = await groqClient.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: "You are an emergency response expert. Analyze incidents and provide structured recommendations."
        },
        {
          role: "user",
          content: `Analyze this emergency: ${description}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content) as IncidentAnalysis;
    toast({
      title: "Incident Analysis Complete",
      description: `Priority Level: ${result.priority}`,
    });
    return result;
  } catch (error) {
    console.error("Error analyzing incident:", error);
    toast({
      variant: "destructive",
      title: "Analysis Failed",
      description: "Unable to analyze incident. Please try again.",
    });
    return {
      priority: 1,
      recommendation: "Error analyzing incident. Please review manually.",
      requiredResources: ["manual-review"],
      estimatedResponseTime: 0,
      nearestUnits: []
    };
  }
};