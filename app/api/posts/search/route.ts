import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    if (!query || query.length < 2) {
      return NextResponse.json({ error: "Query too short" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    const queryPattern = `%${query}%`
    const results = await sql`
      SELECT
        p.id, p.title, p.slug, p.excerpt, p.banner_image,
        u.name as author_name, u.slug as author_slug,
        ts_rank(to_tsvector(p.title || ' ' || p.excerpt), plainto_tsquery(${query})) as relevance
      FROM posts p
      INNER JOIN users u ON p.author_id = u.id
      WHERE p.status = 'PUBLISHED'
        AND (
          to_tsvector(p.title || ' ' || p.excerpt) @@ plainto_tsquery(${query})
          OR p.title ILIKE ${queryPattern}
          OR p.excerpt ILIKE ${queryPattern}
        )
      ORDER BY relevance DESC, p.published_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    return NextResponse.json({ results })
  } catch (error) {
    console.error("[v0] Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
