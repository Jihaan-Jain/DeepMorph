import { AnalysisResult } from "@/pages/index";
import SpeciesCard from "./SpeciesCard";
import { Clock } from "lucide-react";
import { Card } from "./ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  // Prepare data for charts
  const abundanceData = result.species.map((s) => ({
    cluster: s.clusterName,
    abundance: s.abundance,
    name: s.scientificName.split(" ").slice(0, 2).join(" "),
    status: s.status,
  }));

  const confidenceData = result.species.map((s) => ({
    cluster: s.clusterName,
    confidence: s.confidence,
    name: s.scientificName.split(" ").slice(0, 2).join(" "),
  }));

  const COLORS = [
    "#0ea5e9",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="text-3xl font-bold text-foreground mb-1">
            {result.totalClusters}
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            Total Clusters
          </div>
        </div>

        <div className="bg-success/10 border-success/30 rounded-xl border p-4">
          <div className="text-3xl font-bold text-success mb-1">
            {result.knownSpecies}
          </div>
          <div className="text-sm text-success/80 uppercase tracking-wide">
            Known Species
          </div>
        </div>

        <div className="bg-warning/10 border-warning/30 rounded-xl border p-4">
          <div className="text-3xl font-bold text-warning mb-1">
            {result.novelCandidates}
          </div>
          <div className="text-sm text-warning/80 uppercase tracking-wide">
            Novel Candidates
          </div>
        </div>

        <div className="bg-primary/10 border-primary/30 rounded-xl border p-4">
          <div className="text-3xl font-bold text-primary mb-1">
            {result.processingTime}s
          </div>
          <div className="text-sm text-primary/80 uppercase tracking-wide flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Processing Time
          </div>
        </div>
      </div>

      {/* Cluster Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
          <h3 className="text-lg font-semibold mb-4">
            Species Abundance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={abundanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="cluster"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
                interval={0}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                label={{
                  value: "Abundance (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "hsl(var(--muted-foreground))" },
                }}
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        style={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          padding: "8px",
                        }}
                      >
                        <p
                          style={{
                            color: "hsl(var(--foreground))",
                            fontWeight: "bold",
                          }}
                        >
                          {payload[0].payload.cluster}
                        </p>
                        <p style={{ color: "hsl(var(--primary))" }}>
                          Abundance: {payload[0].value}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="abundance"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
          <h3 className="text-lg font-semibold mb-4">
            Species Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Known Species", value: result.knownSpecies },
                  { name: "Novel Candidates", value: result.novelCandidates },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="hsl(var(--success))" />
                <Cell fill="hsl(var(--warning))" />
              </Pie>
              <Tooltip
                  wrapperStyle={{ outline: "none" }} // avoids focus outline artifacts
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                  itemStyle={{ color: "hsl(var(--popover-foreground))" }}
                  labelStyle={{ color: "hsl(var(--popover-foreground))" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Species List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Identified Species</h2>
        {result.species.map((species) => (
          <SpeciesCard key={species.id} species={species} />
        ))}
      </div>
    </div>
  );
};

export default AnalysisResults;
