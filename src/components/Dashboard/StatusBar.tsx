import { Bell, Shield, Ambulance } from "lucide-react";

const StatusBar = () => {
  return (
    <div className="bg-dark p-4 rounded-lg shadow-lg flex items-center justify-between mb-6">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-success animate-pulse" />
          <span className="text-success">System Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <Ambulance className="w-6 h-6 text-info" />
          <span className="text-info">12 Units Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-warning" />
          <span className="text-warning">3 Active Incidents</span>
        </div>
      </div>
      <div className="text-foreground">
        Last Updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default StatusBar;