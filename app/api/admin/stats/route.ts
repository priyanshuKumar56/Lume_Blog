// Admin statistics endpoint
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

    // Get stats
    const [usersCount, publishedCount, draftCount, viewsCount] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM users`,
      sql`SELECT COUNT(*) as count FROM posts WHERE status = 'PUBLISHED'`,
      sql`SELECT COUNT(*) as count FROM posts WHERE status = 'DRAFT'`,
      sql`SELECT SUM(view_count) as total FROM posts`,
    ])

    return NextResponse.json({
      stats: {
        totalUsers: usersCount[0].count,
        publishedPosts: publishedCount[0].count,
        draftPosts: draftCount[0].count,
        totalViews: viewsCount[0].total || 0,
      },
    })
  } catch (error: any) {
    console.error("[v0] Stats fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
