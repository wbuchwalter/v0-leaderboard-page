import { Header } from "@/components/header"
import { LeaderboardContent } from "@/components/leaderboard-content"
import { PerformanceComparison } from "@/components/performance-comparison"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <LeaderboardContent />
          </div>
          <div className="lg:col-span-1">
            <PerformanceComparison />
          </div>
        </div>
      </main>
    </div>
  )
}
