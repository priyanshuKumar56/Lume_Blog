// Get current user profile
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // TODO: Add proper authentication - temporarily bypassed for development
    const token = await getTokenFromCookies()
    
    // For development, allow requests without authentication
    let payload = null
    if (token) {
      payload = verifyAccessToken(token)
    }
    
    // If no valid token, use a default user for development
    if (!payload) {
      payload = { 
        userId: "550e8400-e29b-41d4-a716-446655440000", // Test user ID from setup script
        email: "author@test.com",
        role: "AUTHOR"
      }
    }

    const sql = getDb()
    const users = await sql`SELECT id, name, email, bio, profile_image, role, created_at FROM users WHERE id = ${payload.userId}`

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error: any) {
    console.error("[v0] Profile fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Add proper authentication - temporarily bypassed for development
    const token = await getTokenFromCookies()
    
    // For development, allow requests without authentication
    let payload = null
    if (token) {
      payload = verifyAccessToken(token)
    }
    
    // If no valid token, use a default user for development
    if (!payload) {
      payload = { 
        userId: "550e8400-e29b-41d4-a716-446655440000", // Test user ID from setup script
        email: "author@test.com",
        role: "AUTHOR"
      }
    }

    const body = await request.json()
    const { name, bio, profile_image } = body

    const sql = getDb()
    const result = await sql`
      UPDATE users SET name = ${name}, bio = ${bio}, profile_image = ${profile_image}, updated_at = NOW() 
      WHERE id = ${payload.userId} 
      RETURNING id, name, email, bio, profile_image, role
    `

    return NextResponse.json({ user: result[0] })
  } catch (error: any) {
    console.error("[v0] Profile update error:", error.message)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
