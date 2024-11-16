import { Brain, AlertTriangle, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { analyzeIncident } from "@/lib/api";

const AIAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    priority: number;
    recommendation: string;
    requiredResources: string[];
    conversationInsights?: {
      sentiment: string;
      urgency: string;
      keyTopics: string[];
    };
  } | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeIncident("Medical emergency at downtown area, elderly patient with chest pain");
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-dark p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">AI Analysis</h2>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-info text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isAnalyzing ? (
            <span className="flex items-center">
              <Brain className="w-4 h-4 mr-2 animate-pulse" />
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Analyze New Incident
            </span>
          )}
        </button>
      </div>

      {analysis ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`w-5 h-5 ${analysis.priority === 1 ? 'text-emergency' : 'text-warning'}`} />
            <span className="text-foreground">Priority Level: {analysis.priority}</span>
          </div>
          
          {analysis.conversationInsights && (
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <MessageSquare className="w-4 h-4 mr-2 text-info" />
                <h3 className="font-semibold text-foreground">Conversation Insights:</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>Sentiment: {analysis.conversationInsights.sentiment}</p>
                <p>Urgency Level: {analysis.conversationInsights.urgency}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.conversationInsights.keyTopics.map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Recommendation:</h3>
            <p className="text-gray-300">{analysis.recommendation}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Required Resources:</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.requiredResources.map((resource, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                >
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No active analysis. Click analyze to process a new incident.</p>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;