"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useState, useCallback, useEffect } from "react"
import { Upload, Loader2, ChevronDown, ChevronRight } from "lucide-react"

interface TACScore {
  name: string
  score: number
}

interface ModelResult {
  rank: number
  name: string
  score: number
  color: string
  tacScores: TACScore[]
}

const colors = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-yellow-500",
  "bg-emerald-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-orange-400",
  "bg-pink-400",
  "bg-cyan-400",
  "bg-yellow-400",
  "bg-red-400",
]

export function PerformanceComparison() {
  const [modelResults, setModelResults] = useState<ModelResult[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set())

  const parseYAML = useCallback((yamlText: string): ModelResult[] => {
    const results: { name: string; score: number; tacScores: TACScore[] }[] = []

    const lines = yamlText.split("\n")
    let currentModel = ""
    let currentScore = 0
    let currentTACScores: TACScore[] = []
    let inScoresSection = false
    let inModelSection = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmedLine = line.trim()

      if (trimmedLine === "model:") {
        // Save previous model if it exists
        if (currentModel && !isNaN(currentScore)) {
          results.push({
            name: currentModel,
            score: currentScore,
            tacScores: [...currentTACScores],
          })
        }

        // Reset for new model
        currentModel = ""
        currentScore = 0
        currentTACScores = []
        inScoresSection = false
        inModelSection = true
      } else if (inModelSection && trimmedLine.startsWith("name:")) {
        currentModel = trimmedLine.replace("name:", "").trim()
      } else if (inModelSection && trimmedLine.startsWith("average_score:")) {
        currentScore = Number.parseFloat(trimmedLine.replace("average_score:", "").trim())
      } else if (inModelSection && trimmedLine.startsWith("scores:")) {
        inScoresSection = true
      } else if (inScoresSection && trimmedLine.startsWith("- TAC-")) {
        const tacMatch = trimmedLine.match(/- (TAC-\d+):\s*([0-9.]+)/)
        if (tacMatch) {
          currentTACScores.push({
            name: tacMatch[1],
            score: Number.parseFloat(tacMatch[2]),
          })
        }
      } else if (trimmedLine === "" && inModelSection) {
        // End of current model section
        inModelSection = false
        inScoresSection = false
      }
    }

    // Don't forget the last model
    if (currentModel && !isNaN(currentScore)) {
      results.push({
        name: currentModel,
        score: currentScore,
        tacScores: [...currentTACScores],
      })
    }

    results.sort((a, b) => b.score - a.score)

    return results.map((result, index) => ({
      rank: index + 1,
      name: result.name,
      score: result.score,
      color: colors[index % colors.length],
      tacScores: result.tacScores,
    }))
  }, [])

  const toggleModelExpansion = useCallback((modelName: string) => {
    setExpandedModels((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(modelName)) {
        newSet.delete(modelName)
      } else {
        newSet.add(modelName)
      }
      return newSet
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const timestamp = new Date().getTime()
        const response = await fetch(
          `https://raw.githubusercontent.com/wbuchwalter/v0-leaderboard-page/refs/heads/main/latest_scores.yaml?t=${timestamp}`,
          {
            cache: "no-cache",
          },
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const yamlText = await response.text()
        const parsedResults = parseYAML(yamlText)
        setModelResults(parsedResults)
        setHasData(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [parseYAML])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const yamlFile = files.find(
        (file) =>
          file.type === "text/yaml" ||
          file.type === "application/x-yaml" ||
          file.name.endsWith(".yaml") ||
          file.name.endsWith(".yml"),
      )

      if (yamlFile) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const yamlText = event.target?.result as string
          const parsedResults = parseYAML(yamlText)
          setModelResults(parsedResults)
          setHasData(true)
        }
        reader.readAsText(yamlFile)
      }
    },
    [parseYAML],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (
        file &&
        (file.type === "text/yaml" ||
          file.type === "application/x-yaml" ||
          file.name.endsWith(".yaml") ||
          file.name.endsWith(".yml"))
      ) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const yamlText = event.target?.result as string
          const parsedResults = parseYAML(yamlText)
          setModelResults(parsedResults)
          setHasData(true)
        }
        reader.readAsText(file)
      }
    },
    [parseYAML],
  )

  const resetData = useCallback(() => {
    setModelResults([])
    setHasData(false)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-8 bg-card border-border">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Fetching latest scores...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="p-8 bg-card border-border">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="text-center">
              <p className="text-red-400 font-medium">Error loading data</p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (!hasData) {
    return (
      <div className="space-y-6">
        <Card className="p-8 bg-card border-border">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Drop your YAML file here</h3>
                <p className="text-sm text-muted-foreground">Or click to browse files</p>
              </div>
              <input
                type="file"
                accept=".yaml,.yml,text/yaml,application/x-yaml"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        <div className="text-xs text-muted-foreground space-y-2">
          <p>
            <strong>YAML Format:</strong> Each model should have a name and average_score
          </p>
          <p>
            <strong>Example:</strong>
          </p>
          <pre className="text-xs bg-muted p-2 rounded mt-1">
            {`model: claude-sonnet-4-20250514
average_score: 43.06
scores:
  - TAC-522: 0.15
  - TAC-505: 1.0

model: claude-opus-4-20250514
average_score: 21.06
scores:
  - TAC-522: 0.15
  - TAC-505: 1.0`}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {modelResults.map((model) => {
          const isExpanded = expandedModels.has(model.name)
          return (
            <div key={model.rank} className="bg-card/50 rounded-lg border border-border overflow-hidden">
              <div
                className="flex items-center space-x-4 p-4 cursor-pointer hover:bg-card/70 transition-colors"
                onClick={() => toggleModelExpansion(model.name)}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">{model.rank}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground font-medium truncate">{model.name}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-foreground font-mono text-sm ml-4">{model.score.toFixed(2)}</span>
                  </div>

                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${model.color} transition-all duration-500`}
                      style={{
                        width: `${Math.min((model.score / Math.max(...modelResults.map((r) => r.score))) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border/50">
                  <div className="pt-4 space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Individual TAC Scores</h4>
                    {model.tacScores.map((tac) => (
                      <div key={tac.name} className="flex items-center space-x-3">
                        <div className="w-20 flex-shrink-0">
                          <span className="text-xs font-mono text-muted-foreground">{tac.name}</span>
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${model.color} transition-all duration-300`}
                              style={{
                                width: `${Math.min(tac.score * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-12 flex-shrink-0 text-right">
                          <span className="text-xs font-mono text-foreground">{tac.score.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-xs text-muted-foreground space-y-2">
        <p>
          <strong>Rankings</strong> are based on average scores from ChemBench-Discovery, sorted from highest to lowest.
        </p>
        <p>
          <strong>Progress bars</strong> are scaled relative to the highest score in the dataset.
        </p>
        <p>
          <strong>Click on any model</strong> to expand and view individual TAC test scores.
        </p>
      </div>
    </div>
  )
}
