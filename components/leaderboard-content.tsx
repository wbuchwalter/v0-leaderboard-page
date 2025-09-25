export function LeaderboardContent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-balance">ChemBench-Discovery</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">Updated September 2025</p>
        <div className="prose prose-invert max-w-none">
          <p className="text-foreground leading-relaxed mb-4">
            We present results from our evaluation on the "ChemBench-Discovery" dataset, a comprehensive benchmark
            designed to assess AI systems' capabilities in pharmaceutical research and drug discovery. Current models
            show substantial gaps in the specialized reasoning required for medicinal chemistry applications.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our benchmark evaluates AI performance across the full spectrum of drug discovery workflows, from molecular
            design to clinical development. The dataset contains expert-crafted questions that test structure-activity
            relationship (SAR) analysis, pharmacokinetic prediction, chemical synthesis planning, and therapeutic
            strategy design. Questions are sourced from real pharmaceutical research scenarios and require the
            integration of chemistry, biology, pharmacology, and clinical knowledge that practicing medicinal chemists
            use daily.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The benchmark reveals significant challenges for current AI systems in handling the multi-disciplinary
            reasoning, domain-specific knowledge, and quantitative analysis required for pharmaceutical innovation.
            Performance on ChemBench-Discovery serves as an indicator of readiness for AI-assisted drug discovery
            applications.
          </p>
        </div>
      </div>
    </div>
  )
}
