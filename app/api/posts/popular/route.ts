import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "7days" // 7days, 30days, alltime
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const sql = neon(process.env.DATABASE_URL!)

    const dateMap: Record<string, number> = {
        "7days": 7,
        "30days": 30,
        "alltime": 365
    }
    const days = dateMap[period] || 7
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    const popularPosts = await sql`
      SELECT
        p.id, p.title, p.slug, p.excerpt, p.banner_image,
        u.name as author_name, u.slug as author_slug,
        COUNT(DISTINCT pv.ip_hash) as view_count,
        AVG(pv.read_time) as avg_read_time
      FROM posts p
      INNER JOIN users u ON p.author_id = u.id
      LEFT JOIN page_views pv ON p.id = pv.post_id AND pv.created_at > ${cutoffDate}
      WHERE p.status = 'PUBLISHED'
      GROUP BY p.id, p.title, p.slug, p.excerpt, p.banner_image, u.name, u.slug
      ORDER BY view_count DESC
      LIMIT ${limit}
    `

    return NextResponse.json({ posts: popularPosts })
  } catch (error) {
    console.error("[v0] Popular posts error:", error)
    return NextResponse.json({ error: "Failed to fetch popular posts" }, { status: 500 })
  }
}
