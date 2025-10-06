import { Activity } from "lucide-react";

const AnalysisPipeline = () => {
  const steps = [
    {
      number: 1,
      title: "Bootstrap Learning",
      description: "Pattern discovery & clustering",
    },
    {
      number: 2,
      title: "Temporal CNN",
      description: "Deep feature extraction",
    },
    {
      number: 3,
      title: "Classification",
      description: "Species identification",
    },
    {
      number: 4,
      title: "Validation",
      description: "Database matching",
    },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Analysis Pipeline</h2>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {step.number}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPipeline;
