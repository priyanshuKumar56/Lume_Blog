import { type NextRequest, NextResponse } from "next/server"
import { extractTextFromContent, countWords } from "@/lib/schema-builders"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content || !content.blocks) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 })
    }

    // Extract text
    const text = extractTextFromContent(content)
    const wordCount = countWords(text)

    // Extract keywords (simple approach - common words)
    const words = text
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 4)
    const frequency: Record<string, number> = {}

    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1
    })

    const keywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word)

    // Find headings for table of contents
    const headings = content.blocks
      .filter((block: any) => block.type.startsWith("heading"))
      .map((block: any) => ({
        level: Number.parseInt(block.type.replace("heading", "")),
        text: block.content,
      }))

    return NextResponse.json({
      wordCount,
      keywords,
      headings,
      readingTime: Math.ceil(wordCount / 200),
    })
  } catch (error) {
    console.error("[v0] Content intelligence error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
