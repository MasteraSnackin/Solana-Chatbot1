import ChatInterface from "@/components/Chat/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Solana Development Assistant</h1>
            <p className="text-gray-400">AI-powered guidance for blockchain development</p>
          </div>
        </div>
      </header>

      <div className="mt-6">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;