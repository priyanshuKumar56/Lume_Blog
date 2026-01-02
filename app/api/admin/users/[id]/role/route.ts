// Update user role
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
    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { role } = body

    if (!["ADMIN", "EDITOR", "AUTHOR", "READER"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const sql = getDb()
    const result = await sql`UPDATE users SET role = ${role}, updated_at = NOW() WHERE id = ${id} RETURNING *`

    return NextResponse.json({ user: result[0] })
  } catch (error: any) {
    console.error("[v0] Role update error:", error.message)
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }
}
