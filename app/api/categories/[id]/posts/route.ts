// Get posts by category (using ID or Slug as the parameter named 'id')
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const sql = getDb()

    // We check if it's a UUID or a slug to be flexible
    const isUuid = id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)

    const posts = await sql`
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.banner_image, 
        p.published_at, p.view_count,
        u.id as author_id, u.name as author_name, u.slug as author_slug
      FROM posts p
      JOIN users u ON p.author_id = u.id
      JOIN post_categories pc ON p.id = pc.post_id
      JOIN categories c ON pc.category_id = c.id
      WHERE ${isUuid ? sql`c.id = ${id}` : sql`c.slug = ${id}`} AND p.status = 'PUBLISHED'
      ORDER BY p.published_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    const total = await sql`
      SELECT COUNT(DISTINCT p.id) as count FROM posts p
      JOIN post_categories pc ON p.id = pc.post_id
      JOIN categories c ON pc.category_id = c.id
      WHERE ${isUuid ? sql`c.id = ${id}` : sql`c.slug = ${id}`} AND p.status = 'PUBLISHED'
    `

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
    console.error("[v0] Category posts fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
