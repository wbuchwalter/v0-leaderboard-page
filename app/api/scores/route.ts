import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://pub-d29d89e1f30d4e34be99a6673b3ec29a.r2.dev/latest_scores.yaml", {
      cache: "no-cache",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }

    const yamlText = await response.text()

    return new NextResponse(yamlText, {
      status: 200,
      headers: {
        "Content-Type": "text/yaml",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching scores:", error)
    return NextResponse.json({ error: "Failed to fetch scores" }, { status: 500 })
  }
}
