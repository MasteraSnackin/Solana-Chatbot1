import { Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const sendMessage = async (messages: Message[]): Promise<GroqResponse> => {
  try {
    const systemPrompt = {
      role: "system",
      content: `You are an AI assistant specialized in Solana blockchain development and analysis. You can help with:
      - Analyzing on-chain data and wallet activities
      - Understanding Solana network extensions like Sonic and MagicBlock
      - Providing guidance on Solana program development
      - Explaining token economics and NFT projects
      - Offering code examples and development best practices
      
      Always provide specific, actionable advice and include code examples when relevant.`
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [systemPrompt, ...messages.map(({ role, content }) => ({ role, content }))],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Groq');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to communicate with Groq API",
    });
    throw error;
  }
};