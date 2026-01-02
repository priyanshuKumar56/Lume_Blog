// Get post by ID for editing
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = await getTokenFromCookies()

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const sql = getDb()

    const posts = await sql`
      SELECT p.*, 
        ARRAY_AGG(DISTINCT pc.category_id) as category_ids,
        ARRAY_AGG(DISTINCT t.name) as tags
      FROM posts p
      LEFT JOIN post_categories pc ON p.id = pc.post_id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.id = ${id}
      GROUP BY p.id`

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const post = posts[0]

    // Check ownership
    if (post.author_id !== payload.userId && payload.role !== "ADMIN" && payload.role !== "EDITOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("[v0] Post fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = await getTokenFromCookies()

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const sql = getDb()

    // Verify ownership
    const posts = await sql`SELECT author_id FROM posts WHERE id = ${id}`
    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (posts[0].author_id !== payload.userId && payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete post (cascade will handle related records)
    await sql`DELETE FROM posts WHERE id = ${id}`

    return NextResponse.json({ message: "Post deleted" })
  } catch (error: any) {
    console.error("[v0] Post deletion error:", error.message)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
