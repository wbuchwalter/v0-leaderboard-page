"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PROJECTS } from "@/lib/projects-config"

interface HeaderProps {
  selectedProject: string
  onProjectChange: (projectId: string) => void
}

export function Header({ selectedProject, onProjectChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-3 flex-1">
            <img src="https://tacitlabs.co/Tacit%20Logo.png" alt="Tacit Labs" className="w-8 h-8" />
            <span className="font-semibold text-lg text-foreground">Tacit Labs</span>
          </div>

          <div className="flex-1 flex justify-center">
            <Tabs value={selectedProject} onValueChange={onProjectChange}>
              <TabsList className="bg-muted/30 p-1 h-11 border border-border rounded-lg">
                {PROJECTS.map((project) => (
                  <TabsTrigger
                    key={project.id}
                    value={project.id}
                    className="px-6 py-2 cursor-pointer rounded-md transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border hover:bg-muted/50"
                  >
                    {project.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </header>
  )
}
