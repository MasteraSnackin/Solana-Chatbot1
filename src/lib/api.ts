import { OpenAI } from "openai";

const NEBIUS_API_KEY = import.meta.env.VITE_NEBIUS_API_KEY || 'default_key_for_development';

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: NEBIUS_API_KEY,
});

export interface IncidentAnalysis {
  priority: number;
  recommendation: string;
  requiredResources: string[];
}

export const analyzeIncident = async (description: string): Promise<IncidentAnalysis> => {
  try {
    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
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
      max_tokens: 100,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content) as IncidentAnalysis;
  } catch (error) {
    console.error("Error analyzing incident:", error);
    return {
      priority: 1,
      recommendation: "Error analyzing incident. Please review manually.",
      requiredResources: ["manual-review"]
    };
  }
};