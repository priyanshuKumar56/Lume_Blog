import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/auth"
import { validateImageSEO } from "@/lib/image-utils"
import { neon } from "@neondatabase/serverless"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const user = await validateToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { url, altText, title, caption, width, height } = body

    const validation = validateImageSEO({
      url,
      altText,
      title,
      caption,
      width,
      height,
    })

    if (!validation.valid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Store image metadata
    const result = await sql`
      INSERT INTO images (url, alt_text, title, caption, width, height, uploaded_by)
      VALUES (${url}, ${altText}, ${title}, ${caption}, ${width}, ${height}, ${user.id})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Image upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
