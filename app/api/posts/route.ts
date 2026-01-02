// Get paginated published posts
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const sql = getDb()

    const posts = await sql`
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.banner_image, 
        p.published_at, p.view_count,
        u.id as author_id, u.name as author_name, u.slug as author_slug
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.status = 'PUBLISHED'
      ORDER BY p.published_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    const total = await sql`SELECT COUNT(*) as count FROM posts WHERE status = 'PUBLISHED'`

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: total[0].count,
        pages: Math.ceil(total[0].count / limit),
      },
    })
  } catch (error: any) {
    console.error("[v0] Posts fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
