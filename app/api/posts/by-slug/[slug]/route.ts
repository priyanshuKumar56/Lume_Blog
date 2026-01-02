// Get single post by slug
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const sql = getDb()

    const posts = await sql`
      SELECT 
        p.*, u.id as author_id, u.name as author_name, u.bio, u.profile_image, u.slug as author_slug
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.slug = ${slug} AND p.status = 'PUBLISHED'
    `

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const post = posts[0]

    // Get categories
    const categories = await sql`
      SELECT c.* FROM categories c
      JOIN post_categories pc ON c.id = pc.category_id
      WHERE pc.post_id = ${post.id}
    `

    // Get tags
    const tags = await sql`
      SELECT t.* FROM tags t
      JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ${post.id}
    `

    // Increment view count
    await sql`UPDATE posts SET view_count = view_count + 1 WHERE id = ${post.id}`

    return NextResponse.json({
      ...post,
      categories,
      tags,
    })
  } catch (error: any) {
    console.error("[v0] Post fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
