// Manage categories
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { CategorySchema } from "@/lib/validations"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const categories = await sql`SELECT * FROM categories ORDER BY name`

    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error("[v0] Categories fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookies()
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = CategorySchema.parse(body)

    const sql = getDb()
    const result = await sql`
      INSERT INTO categories (name, slug) 
      VALUES (${validatedData.name}, ${validatedData.slug}) 
      RETURNING *
    `

    return NextResponse.json({ category: result[0] }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Category creation error:", error.message)
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 400 })
  }
}
