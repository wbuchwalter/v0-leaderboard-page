export interface ProjectConfig {
  id: string
  name: string
  dataUrl: string
  title: string
  subtitle: string
  description: string[]
}

export const PROJECTS: ProjectConfig[] = [
  {
    id: "chembench-discovery",
    name: "ChemBench-Discovery",
    dataUrl:
      "https://pub-d29d89e1f30d4e34be99a6673b3ec29a.r2.dev/latest_scores_6cee432e-60a6-4cf2-a7f3-229b30be01a9.yaml",
    title: "ChemBench-Discovery",
    subtitle: "Updated September 2025",
    description: [
      'We present results from our evaluation on the "ChemBench-Discovery" dataset, a comprehensive benchmark designed to assess AI systems\' capabilities in pharmaceutical research and drug discovery. Current models show substantial gaps in the specialized reasoning required for medicinal chemistry applications.',
      "Our benchmark evaluates AI performance across the full spectrum of drug discovery workflows, from molecular design to clinical development. The dataset contains expert-crafted questions that test structure-activity relationship (SAR) analysis, pharmacokinetic prediction, chemical synthesis planning, and therapeutic strategy design. Questions are sourced from real pharmaceutical research scenarios and require the integration of chemistry, biology, pharmacology, and clinical knowledge that practicing medicinal chemists use daily.",
      "The benchmark reveals significant challenges for current AI systems in handling the multi-disciplinary reasoning, domain-specific knowledge, and quantitative analysis required for pharmaceutical innovation. Performance on ChemBench-Discovery serves as an indicator of readiness for AI-assisted drug discovery applications.",
    ],
  },
  {
    id: "antibody-engineering",
    name: "Antibody Engineering",
    dataUrl:
      "https://pub-d29d89e1f30d4e34be99a6673b3ec29a.r2.dev/latest_scores_f8e450e7-03e5-4aa7-a722-024d7f873758.yaml",
    title: "Antibody Engineering",
    subtitle: "",
    description: [],
  },
]

export function getProjectById(id: string): ProjectConfig | undefined {
  return PROJECTS.find((project) => project.id === id)
}

export const DEFAULT_PROJECT_ID = PROJECTS[0].id
