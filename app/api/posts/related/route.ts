import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")
    const limit = Number.parseInt(searchParams.get("limit") || "5")

    if (!postId) {
      return NextResponse.json({ error: "postId required" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Get current post's categories and tags
    const currentPost = await sql`
      SELECT category_id FROM post_categories WHERE post_id = ${postId}
    `

    if (currentPost.length === 0) {
      return NextResponse.json({ posts: [] })
    }

    const categoryIds = currentPost.map((row) => row.category_id)

    // Find related posts in same categories
    const relatedPosts = await sql`
      SELECT DISTINCT
        p.id, p.title, p.slug, p.excerpt, p.banner_image,
        p.published_at, p.view_count,
        u.name as author_name,
        LOWER(REPLACE(u.name, ' ', '-')) as author_slug,
        COUNT(DISTINCT pc.category_id) as category_matches
      FROM posts p
      INNER JOIN users u ON p.author_id = u.id
      INNER JOIN post_categories pc ON p.id = pc.post_id
      WHERE p.id != ${postId}
        AND p.status = 'PUBLISHED'
        AND pc.category_id = ANY(${categoryIds})
      GROUP BY p.id, p.title, p.slug, p.excerpt, p.banner_image, p.published_at, p.view_count, u.name
      ORDER BY category_matches DESC, p.published_at DESC
      LIMIT ${limit}
    `

    return NextResponse.json({ posts: relatedPosts })
  } catch (error) {
    console.error("[v0] Related posts error:", error)
    return NextResponse.json({ error: "Failed to fetch related posts" }, { status: 500 })
  }
}
