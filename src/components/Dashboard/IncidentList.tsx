import { useState } from "react";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

interface Incident {
  id: string;
  type: string;
  location: string;
  priority: number;
  timestamp: string;
  status: "pending" | "dispatched" | "resolved";
}

const IncidentList = () => {
  const [incidents] = useState<Incident[]>([
    {
      id: "1",
      type: "Medical Emergency",
      location: "123 Main St",
      priority: 1,
      timestamp: new Date().toISOString(),
      status: "pending"
    },
    {
      id: "2",
      type: "Fire Alarm",
      location: "456 Oak Ave",
      priority: 2,
      timestamp: new Date().toISOString(),
      status: "dispatched"
    }
  ]);

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return "bg-emergency";
      case 2: return "bg-warning";
      default: return "bg-info";
    }
  };

  return (
    <div className="bg-dark p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-foreground">Active Incidents</h2>
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(incident.priority)}`} />
              <div>
                <h3 className="font-semibold text-foreground">{incident.type}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{incident.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
              </div>
              {incident.status === "pending" && (
                <AlertTriangle className="w-6 h-6 text-emergency animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentList;