import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/auth"
import { calculateReadabilityScore } from "@/lib/readability"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const user = await validateToken(authHeader)

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, content, slug, image } = body

    const issues: string[] = []
    const warnings: string[] = []

    // Title checks
    if (!title) issues.push("Title is required")
    else if (title.length < 30) warnings.push("Title is too short (min 30 chars)")
    else if (title.length > 60) warnings.push("Title is too long (recommended max 60 chars)")

    // Description checks
    if (!description) issues.push("Meta description is required")
    else if (description.length < 120) warnings.push("Description is too short (min 120 chars)")
    else if (description.length > 160) warnings.push("Description is too long (recommended max 160 chars)")

    // Slug checks
    if (!slug) issues.push("Slug is required")
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) issues.push("Invalid slug format")

    // Image checks
    if (!image) warnings.push("No featured image set")

    // Content checks
    if (content) {
      const readability = calculateReadabilityScore(content)
      const contentIssues = []

      if (readability.wordCount < 300) contentIssues.push("Content is too short (min 300 words)")
      if (!content.includes("#")) contentIssues.push("No headings found in content")

      return NextResponse.json({
        score: 100 - issues.length * 10 - warnings.length * 5,
        issues,
        warnings,
        contentAnalysis: {
          ...readability,
          contentIssues,
        },
      })
    }

    return NextResponse.json({
      score: 100 - issues.length * 10 - warnings.length * 5,
      issues,
      warnings,
    })
  } catch (error) {
    console.error("[v0] SEO audit error:", error)
    return NextResponse.json({ error: "Audit failed" }, { status: 500 })
  }
}
