// Get all tags
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()

    const tags = await sql`
      SELECT t.*, COUNT(pt.post_id) as post_count
      FROM tags t
      LEFT JOIN post_tags pt ON t.id = pt.tag_id
      LEFT JOIN posts p ON pt.post_id = p.id AND p.status = 'PUBLISHED'
      GROUP BY t.id
      ORDER BY post_count DESC
    `

    return NextResponse.json({ tags })
  } catch (error: any) {
    // If table doesn't exist, return empty array instead of 500 in dev
    if (error.code === '42P01') { // undefined_table
        return NextResponse.json({ tags: [] })
    }
    console.error("[v0] Tags fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}
