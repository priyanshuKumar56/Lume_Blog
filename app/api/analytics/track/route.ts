import { type NextRequest, NextResponse } from "next/server"
import { hashIp } from "@/lib/analytics"
import { neon } from "@neondatabase/serverless"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, readTime, referrer } = body

    if (!postId) {
      return NextResponse.json({ error: "postId required" }, { status: 400 })
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown"
    const ipHash = hashIp(ip)
    const userAgent = request.headers.get("user-agent") || ""

    const sql = neon(process.env.DATABASE_URL!)

    // Log page view
    await sql`
      INSERT INTO page_views (post_id, ip_hash, user_agent, referrer, read_time)
      VALUES (${postId}, ${ipHash}, ${userAgent}, ${referrer}, ${readTime || 0})
      ON CONFLICT (post_id, ip_hash, DATE(created_at))
      DO UPDATE SET
        view_count = view_count + 1,
        read_time = GREATEST(read_time, ${readTime || 0}),
        updated_at = NOW()
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Analytics tracking error:", error)
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 })
  }
}
