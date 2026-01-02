// Approve and publish post
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = await getTokenFromCookies()

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const sql = getDb()
    const result = await sql`
      UPDATE posts 
      SET status = 'PUBLISHED', published_at = NOW(), updated_at = NOW() 
      WHERE id = ${id} 
      RETURNING *
    `

    return NextResponse.json({ post: result[0] })
  } catch (error: any) {
    console.error("[v0] Publish error:", error.message)
    return NextResponse.json({ error: "Failed to publish post" }, { status: 500 })
  }
}
