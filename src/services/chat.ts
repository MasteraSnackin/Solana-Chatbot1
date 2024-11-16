const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const sendMessage = async (messages: any[]) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: messages.map(({ role, content }) => ({ role, content })),
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};