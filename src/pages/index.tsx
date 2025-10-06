import { useState } from "react";
import { Dna, Database, Activity } from "lucide-react";
import SequenceInput from "../components/SequenceInput";
import AnalysisResults from "@/components/AnalysisResults";
import SystemStatus from "@/components/SystemStatus";
import AnalysisPipeline from "@/components/AnalysisPipeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AnalysisResult {
  totalClusters: number;
  knownSpecies: number;
  novelCandidates: number;
  processingTime: number;
  species: SpeciesData[];
}

export interface SpeciesData {
  id: string;
  scientificName: string;
  commonName: string;
  status: "known" | "novel";
  confidence: number;
  abundance: number;
  ecologicalRole: string;
  biosyntheticPotential: {
    hasPotential: boolean;
    compounds: string[];
    applications: string[];
  };
  phylogeneticGroup: string;
  clusterName: string;
  sequenceInfo: {
    length: number;
    gcContent: number;
    conservedMotifs: number;
  };
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("input");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setActiveTab("results");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Dna className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DEEPMORPH</h1>
              <p className="text-sm text-muted-foreground">
                Advanced eDNA Sequence Analysis Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analysis Area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                <TabsTrigger
                  value="input"
                  className="data-[state=active]:bg-card"
                >
                  Sequence Input
                </TabsTrigger>
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-card"
                >
                  Analysis Results
                </TabsTrigger>
              </TabsList>

              <TabsContent value="input" className="mt-6">
                <SequenceInput
                  onAnalysisComplete={handleAnalysisComplete}
                  setIsAnalyzing={setIsAnalyzing}
                />
              </TabsContent>

              <TabsContent value="results" className="mt-6">
                {analysisResult ? (
                  <AnalysisResults result={analysisResult} />
                ) : (
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      No analysis results yet. Submit a sequence to begin.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SystemStatus isAnalyzing={isAnalyzing} />
            <AnalysisPipeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
