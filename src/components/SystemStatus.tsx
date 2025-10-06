import { Database, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SystemStatusProps {
  isAnalyzing: boolean;
}

const SystemStatus = ({ isAnalyzing }: SystemStatusProps) => {
  const technologies = [
    { name: "Deep 1D ResNet / Temporal CNN / Bootstraping", status: "active" },
    { name: "HDBSCAN Clustering", status: "active" },
    { name: "BioPython Pipeline", status: "active" },
    { name: "Docker Container", status: "standby" },
    { name: "FastAPI Backend", status: "standby" },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Database className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">System Status</h2>
      </div>

      <div className="space-y-3">
        {technologies.map((tech, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{tech.name}</span>
            <Badge
              className={
                tech.status === "active"
                  ? "bg-success/20 text-success border-success/30"
                  : "bg-warning/20 text-warning border-warning/30"
              }
            >
              {tech.status === "active" ? "Active" : "Standby"}
            </Badge>
          </div>
        ))}


        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Processing Speed
          </span>
          <span className="text-sm font-semibold text-primary">
            &lt;5 min/sample
          </span>
        </div>
      </div>

      {isAnalyzing && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-primary">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Analysis in progress...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemStatus;
