"use client"

import { Header } from "@/components/header"
import { LeaderboardContent } from "@/components/leaderboard-content"
import { PerformanceComparison } from "@/components/performance-comparison"
import { DEFAULT_PROJECT_ID, getProjectById } from "@/lib/projects-config"
import { useState } from "react"

export default function HomePage() {
  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID)
  const selectedProject = getProjectById(selectedProjectId)

  if (!selectedProject) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header selectedProject={selectedProjectId} onProjectChange={setSelectedProjectId} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <LeaderboardContent project={selectedProject} />
          </div>
          <div className="lg:col-span-1">
            <PerformanceComparison dataUrl={selectedProject.dataUrl} />
          </div>
        </div>
      </main>
    </div>
  )
}
