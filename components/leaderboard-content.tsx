import type { ProjectConfig } from "@/lib/projects-config"

interface LeaderboardContentProps {
  project: ProjectConfig
}

export function LeaderboardContent({ project }: LeaderboardContentProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-balance">{project.title}</h1>
        {project.subtitle && <p className="text-muted-foreground text-lg leading-relaxed mb-6">{project.subtitle}</p>}
        {project.description.length > 0 && (
          <div className="prose prose-invert max-w-none">
            {project.description.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0 ? "text-foreground leading-relaxed mb-4" : "text-muted-foreground leading-relaxed mb-4"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
