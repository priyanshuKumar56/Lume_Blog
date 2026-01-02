// Get and create comments
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { CommentSchema } from "@/lib/validations"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")

    if (!postId) {
      return NextResponse.json({ error: "postId is required" }, { status: 400 })
    }

    const sql = getDb()

    const comments = await sql`
      SELECT 
        c.id, c.content, c.created_at,
        u.id as author_id, u.name as author_name, u.profile_image
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = ${postId} AND c.status = 'PUBLISHED'
      ORDER BY c.created_at DESC
    `

    return NextResponse.json({ comments })
  } catch (error: any) {
    console.error("[v0] Comments fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookies()
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { content, postId } = body
    const validatedData = CommentSchema.parse({ content })

    const sql = getDb()

    // Verify post exists
    const posts = await sql`SELECT id FROM posts WHERE id = ${postId}`
    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Create comment
    const result = await sql`
      INSERT INTO comments (post_id, author_id, content, status)
      VALUES (${postId}, ${payload.userId}, ${validatedData.content}, 'PUBLISHED')
      RETURNING id, content, created_at
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error: any) {
    console.error("[v0] Comment creation error:", error.message)
    return NextResponse.json({ error: error.message || "Failed to create comment" }, { status: 400 })
  }
}
