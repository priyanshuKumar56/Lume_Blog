// Admin user management
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
    const role = searchParams.get("role")

    let users
    if (role && ["ADMIN", "EDITOR", "AUTHOR", "READER"].includes(role)) {
      users = await sql`SELECT id, name, email, role, created_at FROM users WHERE role = ${role} ORDER BY created_at DESC`
    } else {
      users = await sql`SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`
    }

    return NextResponse.json({ users })
  } catch (error: any) {
    console.error("[v0] Admin users fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
