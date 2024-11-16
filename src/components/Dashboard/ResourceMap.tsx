import { MapPin } from "lucide-react";

const ResourceMap = () => {
  return (
    <div className="bg-dark p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-foreground">Resource Map</h2>
      <div className="relative h-[400px] bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 flex flex-col items-center">
            <MapPin className="w-8 h-8 mb-2" />
            <span>Map visualization coming soon</span>
          </div>
        </div>
        {/* Map markers for resources */}
        <div className="absolute top-1/4 left-1/4">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <div className="w-3 h-3 bg-info rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <div className="w-3 h-3 bg-warning rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;