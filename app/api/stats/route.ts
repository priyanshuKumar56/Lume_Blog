import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const user = await validateToken(authHeader)

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Get statistics
    const [totalUsers, totalPosts, totalComments, totalViews] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM users`,
      sql`SELECT COUNT(*) as count FROM posts WHERE status = 'PUBLISHED'`,
      sql`SELECT COUNT(*) as count FROM comments WHERE status = 'PUBLISHED'`,
      sql`SELECT COUNT(*) as count FROM page_views`,
    ])

    // Get recent activity
    const recentPosts = await sql`SELECT title, published_at FROM posts WHERE status = 'PUBLISHED' ORDER BY published_at DESC LIMIT 5`

    const topPosts = await sql`
       SELECT p.title, COUNT(DISTINCT pv.ip_hash) as views 
       FROM posts p 
       LEFT JOIN page_views pv ON p.id = pv.post_id 
       WHERE p.status = 'PUBLISHED'
       GROUP BY p.id, p.title
       ORDER BY views DESC LIMIT 5
    `

    return NextResponse.json({
      summary: {
        totalUsers: totalUsers[0]?.count || 0,
        totalPosts: totalPosts[0]?.count || 0,
        totalComments: totalComments[0]?.count || 0,
        totalViews: totalViews[0]?.count || 0,
      },
      recentPosts,
      topPosts,
    })
  } catch (error) {
    console.error("[v0] Stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
