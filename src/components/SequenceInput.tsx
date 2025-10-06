import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { AnalysisResult } from "@/pages/Index";
import { analyzeSequence } from "@/lib/sequenceAnalyzer";

interface SequenceInputProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const SequenceInput = ({
  onAnalysisComplete,
  setIsAnalyzing,
}: SequenceInputProps) => {
  const [sequence, setSequence] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateSequence = (seq: string): boolean => {
    const cleaned = seq.replace(/\s/g, "").toUpperCase();
    const validPattern = /^[AGCT]+$/;
    return validPattern.test(cleaned);
  };

  const handleLoadSample = () => {
    const sampleSequence = `ATGCGATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG`;
    setSequence(sampleSequence);
  };

  const handleAnalyze = async () => {
    const cleaned = sequence.replace(/\s/g, "").toUpperCase();

    if (cleaned.length < 1) {
      toast({
        title: "Sequence required",
        description: "Please enter a DNA sequence",
        variant: "destructive",
      });
      return;
    }

    if (!validateSequence(cleaned)) {
      toast({
        title: "Invalid sequence",
        description: "Sequence must contain only A, G, C, T nucleotides",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsAnalyzing(true);

    // Simulate analysis with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = analyzeSequence(cleaned);

    setIsLoading(false);
    setIsAnalyzing(false);
    onAnalysisComplete(result);

    toast({
      title: "Analysis Complete",
      description: `Identified ${result.knownSpecies} known species and ${result.novelCandidates} novel candidates`,
    });
  };

  const nucleotideCount = sequence.replace(/\s/g, "").length;

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">eDNA Sequence Data</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadSample}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Load Sample
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter raw DNA sequence data (A, T, G, C nucleotides) of any length.
          Our hybrid AI pipeline will identify species and predict biosynthetic
          potential.
        </p>
      </div>

      <Textarea
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        placeholder="Enter DNA sequence (A, G, C, T nucleotides)..."
        className="min-h-[320px] font-mono text-sm bg-secondary/30 border-border/50 focus:border-primary transition-colors resize-none"
      />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {nucleotideCount} nucleotides
        </span>
        <span className="text-success">Any sequence length accepted</span>
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={isLoading || nucleotideCount < 1}
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-glow"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Sequence...
          </>
        ) : (
          "Analyze Sequence"
        )}
      </Button>
    </div>
  );
};

export default SequenceInput;
