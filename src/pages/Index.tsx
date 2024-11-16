import StatusBar from "@/components/Dashboard/StatusBar";
import IncidentList from "@/components/Dashboard/IncidentList";
import ResourceMap from "@/components/Dashboard/ResourceMap";
import AIAnalysis from "@/components/Dashboard/AIAnalysis";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Emergency Response Dashboard</h1>
        <p className="text-gray-400">Real-time incident monitoring and resource management</p>
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