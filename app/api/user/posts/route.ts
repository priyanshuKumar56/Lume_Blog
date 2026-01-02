// Get user's posts
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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || ""

    const sql = getDb()

    let posts
    
    if (status && (status === "DRAFT" || status === "PUBLISHED")) {
       posts = await sql`
        SELECT id, title, slug, status, view_count, published_at, created_at, banner_image
        FROM posts 
        WHERE author_id = ${payload.userId} 
        AND status = ${status}
        ORDER BY created_at DESC
      `
    } else {
      posts = await sql`
        SELECT id, title, slug, status, view_count, published_at, created_at, banner_image
        FROM posts 
        WHERE author_id = ${payload.userId}
        ORDER BY created_at DESC
      `
    }

    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error("[v0] User posts fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
