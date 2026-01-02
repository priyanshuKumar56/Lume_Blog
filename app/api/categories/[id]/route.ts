import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sql = getDb()

    // Try to find by ID first, then by slug
    const isUuid = id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    
    const result = isUuid 
       ? await sql`SELECT * FROM categories WHERE id = ${id}`
       : await sql`SELECT * FROM categories WHERE slug = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error: any) {
    console.error("[v0] Category fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, slug, description } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    const sql = getDb()

    const result = await sql`
      UPDATE categories
      SET name = ${name}, slug = ${slug}, description = ${description || null}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error: any) {
    console.error("[v0] Category update error:", error.message)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sql = getDb()

    await sql`DELETE FROM categories WHERE id = ${id}`

    return NextResponse.json({ message: "Category deleted" })
  } catch (error: any) {
    console.error("[v0] Category deletion error:", error.message)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
