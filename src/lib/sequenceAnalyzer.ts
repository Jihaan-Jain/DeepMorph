import { AnalysisResult, SpeciesData } from "@/pages/index";

// Real marine species with scientifically-grounded biosynthetic potential
const marineSpeciesDatabase = [
  {
    scientificName: "Lepetodrilus fucensis",
    commonName: "Vent limpet, grazer",
    phylogeneticGroup: "Gastropoda",
    ecologicalRole: "Primary consumer, grazer on bacterial mats",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Antimicrobial peptides", "Heat-shock proteins"],
      applications: ["Antibiotic development", "Thermostable enzymes"],
    },
  },
  {
    scientificName: "Paralvinella sulfincola",
    commonName: "Thermophilic polychaete",
    phylogeneticGroup: "Annelida",
    ecologicalRole: "Thermophilic decomposer, sulfide oxidizer",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Sulfide-binding proteins", "Thermostable enzymes"],
      applications: ["Industrial biocatalysts", "Bioremediation"],
    },
  },
  {
    scientificName: "Bathymodiolus thermophilus",
    commonName: "Hydrothermal vent mussel",
    phylogeneticGroup: "Bivalvia",
    ecologicalRole: "Chemosymbiotic filter feeder",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Symbiont-derived polyketides", "Antimicrobial compounds"],
      applications: ["Novel antibiotics", "Wound healing"],
    },
  },
  {
    scientificName: "Riftia pachyptila",
    commonName: "Giant tube worm",
    phylogeneticGroup: "Annelida",
    ecologicalRole: "Chemosymbiotic primary producer",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Hemoglobin variants", "Sulfide-binding proteins"],
      applications: ["Blood substitutes", "Oxygen delivery systems"],
    },
  },
  {
    scientificName: "Vulcanoctopus hydrothermalis",
    commonName: "Hydrothermal vent octopus",
    phylogeneticGroup: "Cephalopoda",
    ecologicalRole: "Predator, scavenger",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Neurotoxins", "Pressure-adapted proteins"],
      applications: ["Neuroprotective drugs", "Pain management"],
    },
  },
  {
    scientificName: "Thermococcus barophilus",
    commonName: "Hyperthermophilic archaeon",
    phylogeneticGroup: "Archaea",
    ecologicalRole: "Extreme thermophile, decomposer",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["DNA polymerases", "Proteases"],
      applications: ["PCR technology", "Industrial enzymes"],
    },
  },
  {
    scientificName: "Alvinella pompejana",
    commonName: "Pompeii worm",
    phylogeneticGroup: "Annelida",
    ecologicalRole: "Extreme thermophile, biofilm grazer",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Heat-shock proteins", "Collagen variants"],
      applications: ["Thermal protection", "Tissue engineering"],
    },
  },
];

const novelSpeciesCandidates = [
  {
    scientificName: "Abyssophilus xenomorphus sp. nov.",
    commonName: "Deep-sea xenophyophore candidate",
    phylogeneticGroup: "Foraminifera",
    ecologicalRole: "Sediment processor, potential symbiont host",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Novel bioactive lipids", "Unique polysaccharides"],
      applications: ["Anti-inflammatory agents", "Immunomodulators"],
    },
  },
  {
    scientificName: "Thermobacterium profundum sp. nov.",
    commonName: "Uncharacterized thermophilic bacteria",
    phylogeneticGroup: "Bacteria",
    ecologicalRole: "Chemolithoautotroph, sulfur oxidizer",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Novel polyketides", "Extremozymes"],
      applications: ["Cancer therapy", "Industrial processes"],
    },
  },
  {
    scientificName: "Hadalomonas psychrophila sp. nov.",
    commonName: "Hadal zone cold-adapted bacteria",
    phylogeneticGroup: "Bacteria",
    ecologicalRole: "Barophilic decomposer",
    biosyntheticPotential: {
      hasPotential: true,
      compounds: ["Cold-active enzymes", "Antifreeze proteins"],
      applications: ["Cryo-preservation", "Cold-chain logistics"],
    },
  },
];

const calculateGCContent = (sequence: string): number => {
  const gcCount = (sequence.match(/[GC]/g) || []).length;
  return Math.round((gcCount / sequence.length) * 100);
};

const findConservedMotifs = (sequence: string): number => {
  // Simulate motif finding (in reality would use bioinformatics algorithms)
  const motifPatterns = [
    /TATA[AT]A/g,
    /GC{2,}GC/g,
    /CAT{2,}C/g,
    /[AG]ATCG[AT]/g,
  ];

  let motifCount = 0;
  motifPatterns.forEach((pattern) => {
    const matches = sequence.match(pattern);
    if (matches) motifCount += matches.length;
  });

  return motifCount;
};

export const analyzeSequence = (sequence: string): AnalysisResult => {
  const startTime = Date.now();

  // Simulate bootstrap clustering and CNN analysis
  const knownSpeciesCount = Math.floor(Math.random() * 3) + 3; // 3-5 known
  const novelCandidatesCount = Math.floor(Math.random() * 2) + 2; // 2-3 novel
  const totalClusters = knownSpeciesCount + novelCandidatesCount;

  // Select random species from databases
  const selectedKnown = [...marineSpeciesDatabase]
    .sort(() => Math.random() - 0.5)
    .slice(0, knownSpeciesCount)
    .map((sp) => ({ ...sp, isKnown: true }));

  const selectedNovel = [...novelSpeciesCandidates]
    .sort(() => Math.random() - 0.5)
    .slice(0, novelCandidatesCount)
    .map((sp) => ({ ...sp, isKnown: false }));

  const allSelected = [...selectedKnown, ...selectedNovel];

  // Calculate sequence properties
  const gcContent = calculateGCContent(sequence);
  const conservedMotifs = findConservedMotifs(sequence);

  // Generate species data with realistic confidence and abundance
  const species: SpeciesData[] = allSelected.map((sp, idx) => {
    const baseConfidence = sp.isKnown
      ? 85 + Math.floor(Math.random() * 15) // Known: 85-100%
      : 60 + Math.floor(Math.random() * 25); // Novel: 60-85%

    // Generate abundance that sums to ~100% across all species
    const baseAbundance = Math.floor(Math.random() * 40) + 10;

    // Generate cluster name
    const clusterName = `Species-${String.fromCharCode(65 + idx)}`; // A, B, C, etc.

    return {
      id: `species-${idx}`,
      scientificName: sp.scientificName,
      commonName: sp.commonName,
      status: sp.isKnown ? "known" : "novel",
      confidence: baseConfidence,
      abundance: baseAbundance,
      ecologicalRole: sp.ecologicalRole,
      biosyntheticPotential: sp.biosyntheticPotential,
      phylogeneticGroup: sp.phylogeneticGroup,
      clusterName,
      sequenceInfo: {
        length: sequence.length,
        gcContent: gcContent + Math.floor(Math.random() * 10) - 5, // Slight variation per species
        conservedMotifs:
          Math.floor(conservedMotifs / allSelected.length) +
          Math.floor(Math.random() * 3),
      },
    };
  });

  // Normalize abundances to sum to 100%
  const totalAbundance = species.reduce((sum, s) => sum + s.abundance, 0);
  species.forEach((s) => {
    s.abundance = Math.round((s.abundance / totalAbundance) * 100);
  });

  // Sort by confidence (highest first)
  species.sort((a, b) => b.confidence - a.confidence);

  const endTime = Date.now();
  const processingTime = Math.floor((endTime - startTime) / 1000);

  return {
    totalClusters,
    knownSpecies: knownSpeciesCount,
    novelCandidates: novelCandidatesCount,
    processingTime: processingTime || 1,
    species,
  };
};
