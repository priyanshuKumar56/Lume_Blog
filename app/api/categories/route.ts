// Get all categories
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()

    const categories = await sql`
      SELECT c.*, COUNT(pc.post_id) as post_count
      FROM categories c
      LEFT JOIN post_categories pc ON c.id = pc.category_id
      LEFT JOIN posts p ON pc.post_id = p.id AND p.status = 'PUBLISHED'
      GROUP BY c.id
      ORDER BY post_count DESC
    `

    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error("[v0] Categories fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    const sql = getDb()

    const result = await sql`
      INSERT INTO categories (name, slug, description)
      VALUES (${name}, ${slug}, ${description || null})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error: any) {
    console.error("[v0] Category creation error:", error.message)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
