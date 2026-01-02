// Get author profile
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const sql = getDb()

    // Get author
    const authors = await sql`SELECT id, name, bio, profile_image, created_at FROM users WHERE slug = ${slug}`

    if (authors.length === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    const author = authors[0]

    // Get author's posts
    const posts = await sql`
      SELECT id, title, slug, excerpt, banner_image, published_at, view_count
      FROM posts
      WHERE author_id = ${author.id} AND status = 'PUBLISHED'
      ORDER BY published_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    // Get total posts
    const total = await sql`SELECT COUNT(*) as count FROM posts WHERE author_id = ${author.id} AND status = 'PUBLISHED'`

    return NextResponse.json({
      author,
      posts,
      pagination: {
        page,
        limit,
        total: total[0].count,
        pages: Math.ceil(total[0].count / limit),
      },
    })
  } catch (error: any) {
    console.error("[v0] Author fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch author" }, { status: 500 })
  }
}
