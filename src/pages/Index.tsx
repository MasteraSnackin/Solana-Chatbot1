import StatusBar from "@/components/Dashboard/StatusBar";
import IncidentList from "@/components/Dashboard/IncidentList";
import ResourceMap from "@/components/Dashboard/ResourceMap";
import AIAnalysis from "@/components/Dashboard/AIAnalysis";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">EROS Dashboard</h1>
            <p className="text-gray-400">Emergency Response Optimization System by Mythic Mind Labs</p>
          </div>
          <img src="/og-image.svg" alt="EROS Logo" className="h-12 w-auto" />
        </div>
      </header>

      <StatusBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <IncidentList />
          <AIAnalysis />
        </div>
        <ResourceMap />
      </div>
    </div>
  );
};

export default Index;