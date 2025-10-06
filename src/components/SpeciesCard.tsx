import { SpeciesData } from "@/pages/index";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Pill, Leaf } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SpeciesCardProps {
  species: SpeciesData;
}

const SpeciesCard = ({ species }: SpeciesCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors">
        <CollapsibleTrigger className="w-full">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    {species.clusterName}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground">
                    {species.scientificName}
                  </h3>
                  {species.status === "known" ? (
                    <Badge className="bg-success/20 text-success border-success/30 gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      known
                    </Badge>
                  ) : (
                    <Badge className="bg-warning/20 text-warning border-warning/30 gap-1">
                      <AlertCircle className="w-3 h-3" />
                      novel
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {species.commonName}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {species.confidence}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Confidence
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Confidence Score
                  </span>
                  <span className="font-semibold">{species.confidence}%</span>
                </div>
                <Progress value={species.confidence} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Relative Abundance
                  </span>
                  <span className="font-semibold">{species.abundance}%</span>
                </div>
                <Progress value={species.abundance} className="h-2" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Click for detailed analysis
              </span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6 space-y-4 border-t border-border/50 pt-4">
            {/* Ecological Information */}
            <div className="bg-secondary/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-success" />
                Ecological Profile
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <span className="ml-2 font-medium">
                    {species.ecologicalRole}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Phylogenetic Group:
                  </span>
                  <span className="ml-2 font-medium">
                    {species.phylogeneticGroup}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Sequence Length:
                  </span>
                  <span className="ml-2 font-medium">
                    {species.sequenceInfo.length} bp
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">GC Content:</span>
                  <span className="ml-2 font-medium">
                    {species.sequenceInfo.gcContent}%
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">
                    Conserved Motifs:
                  </span>
                  <span className="ml-2 font-medium">
                    {species.sequenceInfo.conservedMotifs} identified
                  </span>
                </div>
              </div>
            </div>

            {/* Biosynthetic Potential */}
            {species.biosyntheticPotential.hasPotential && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <Pill className="w-4 h-4" />
                  Biosynthetic Pathway Potential
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">
                      Predicted Compounds:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {species.biosyntheticPotential.compounds.map(
                        (compound, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-primary/5 border-primary/30"
                          >
                            {compound}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">
                      Potential Applications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {species.biosyntheticPotential.applications.map(
                        (app, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-success/5 border-success/30 text-success"
                          >
                            {app}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    * Predictions based on genomic analysis and pathway
                    reconstruction. Further wet-lab validation required.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default SpeciesCard;
