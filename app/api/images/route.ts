import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const images = await sql`SELECT * FROM images ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const totalResult = await sql`SELECT COUNT(*) as count FROM images`
    const total = totalResult[0].count

    return NextResponse.json({
      images,
      pagination: { limit, offset, total },
    })
  } catch (error) {
    console.error("[v0] Get images error:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}
