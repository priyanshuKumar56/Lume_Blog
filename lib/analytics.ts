export interface PageView {
  postId: string
  userId?: string
  referrer?: string
  userAgent?: string
  ipHash: string
  timestamp: Date
}

export interface PostAnalytics {
  postId: string
  totalViews: number
  uniqueViews: number
  avgReadTime: number
  bounceRate: number
  sourceBreakdown: Record<string, number>
}

// Simple IP hashing for privacy
export function hashIp(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}
