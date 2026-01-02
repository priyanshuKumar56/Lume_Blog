// Like/unlike post
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sql = getDb()

    const result = await sql`SELECT COUNT(*) as count FROM post_likes WHERE post_id = ${id}`

    return NextResponse.json({ likes: result[0].count })
  } catch (error: any) {
    console.error("[v0] Likes fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // Check if already liked
    const existing = await sql`SELECT id FROM post_likes WHERE post_id = ${id} AND user_id = ${payload.userId}`

    if (existing.length > 0) {
      // Unlike
      await sql`DELETE FROM post_likes WHERE post_id = ${id} AND user_id = ${payload.userId}`
      return NextResponse.json({ liked: false })
    } else {
      // Like
      await sql`INSERT INTO post_likes (post_id, user_id) VALUES (${id}, ${payload.userId})`
      return NextResponse.json({ liked: true })
    }
  } catch (error: any) {
    console.error("[v0] Like error:", error.message)
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 })
  }
}
