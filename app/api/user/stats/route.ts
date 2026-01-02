// User stats API endpoint
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

    // Get user stats
    const statsResult = await sql`
      SELECT 
        COUNT(*) as total_posts,
        COUNT(CASE WHEN status = 'PUBLISHED' THEN 1 END) as published_posts,
        COUNT(CASE WHEN status = 'DRAFT' THEN 1 END) as draft_posts,
        COALESCE(SUM(view_count), 0) as total_views
      FROM posts 
      WHERE author_id = ${payload.userId}
    `

    const stats = statsResult[0]

    return NextResponse.json({
      stats: {
        totalPosts: parseInt(stats.total_posts),
        published: parseInt(stats.published_posts),
        drafts: parseInt(stats.draft_posts),
        totalViews: parseInt(stats.total_views)
      }
    })
  } catch (error: any) {
    console.error("User stats fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
