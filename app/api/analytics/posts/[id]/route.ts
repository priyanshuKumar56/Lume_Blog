import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sql = neon(process.env.DATABASE_URL!)

    // Get post views
    const viewsResult = await sql`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT ip_hash) as unique_views,
        AVG(read_time) as avg_read_time,
        COUNT(CASE WHEN read_time < 30 THEN 1 END)::FLOAT / COUNT(*) as bounce_rate
      FROM page_views
      WHERE post_id = ${id} AND created_at > NOW() - INTERVAL '90 days'
    `

    // Get referrer breakdown
    const referrerResult = await sql`
      SELECT referrer, COUNT(*) as count
      FROM page_views
      WHERE post_id = ${id} AND referrer IS NOT NULL AND created_at > NOW() - INTERVAL '90 days'
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT 10
    `

    const views = viewsResult[0] || {}
    const sourceBreakdown = referrerResult.reduce(
      (acc, row) => {
        acc[row.referrer] = row.count
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      postId: id,
      totalViews: Number.parseInt(views.total_views) || 0,
      uniqueViews: Number.parseInt(views.unique_views) || 0,
      avgReadTime: Math.round(Number.parseFloat(views.avg_read_time) || 0),
      bounceRate: Number.parseFloat(views.bounce_rate) || 0,
      sourceBreakdown,
    })
  } catch (error) {
    console.error("[v0] Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
