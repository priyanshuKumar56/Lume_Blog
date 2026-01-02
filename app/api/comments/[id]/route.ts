// Delete and update comments
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

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

    // Verify ownership or admin
    const comments = await sql`SELECT author_id FROM comments WHERE id = ${id}`
    if (comments.length === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 })
    }

    if (comments[0].author_id !== payload.userId && payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await sql`DELETE FROM comments WHERE id = ${id}`

    return NextResponse.json({ message: "Comment deleted" })
  } catch (error: any) {
    console.error("[v0] Comment deletion error:", error.message)
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
  }
}
