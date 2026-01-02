// Admin post management
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const token = await getTokenFromCookies()
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let posts
    if (status && (status === "DRAFT" || status === "PUBLISHED")) {
      posts = await sql`
        SELECT p.id, p.title, p.slug, p.status, p.view_count, p.published_at, p.created_at,
               u.name as author_name
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.status = ${status}
        ORDER BY p.created_at DESC
      `
    } else {
      posts = await sql`
        SELECT p.id, p.title, p.slug, p.status, p.view_count, p.published_at, p.created_at,
               u.name as author_name
        FROM posts p
        JOIN users u ON p.author_id = u.id
        ORDER BY p.created_at DESC
      `
    }

    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error("[v0] Admin posts fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
