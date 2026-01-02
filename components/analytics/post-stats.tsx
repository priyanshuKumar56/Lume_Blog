"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Eye, Users, Clock, TrendingUp } from "lucide-react"

interface PostStatsProps {
  postId: string
}

interface Analytics {
  totalViews: number
  uniqueViews: number
  avgReadTime: number
  bounceRate: number
  sourceBreakdown: Record<string, number>
}

export function PostStats({ postId }: PostStatsProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/analytics/posts/${postId}`)
      .then((res) => res.json())
      .then(setAnalytics)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [postId])

  if (loading) return <div>Loading analytics...</div>
  if (!analytics) return <div>No analytics available</div>

  const stats = [
    { icon: Eye, label: "Total Views", value: analytics.totalViews, color: "text-blue-500" },
    { icon: Users, label: "Unique Visitors", value: analytics.uniqueViews, color: "text-green-500" },
    { icon: Clock, label: "Avg Read Time", value: `${analytics.avgReadTime}s`, color: "text-purple-500" },
    {
      icon: TrendingUp,
      label: "Engagement",
      value: `${Math.round((1 - analytics.bounceRate) * 100)}%`,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
              </div>
              <Icon className={`w-8 h-8 ${color}`} />
            </div>
          </Card>
        ))}
      </div>

      {Object.keys(analytics.sourceBreakdown).length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Top Referrers</h3>
          <div className="space-y-2">
            {Object.entries(analytics.sourceBreakdown)
              .slice(0, 5)
              .map(([source, count]) => (
                <div key={source} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{source || "Direct"}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}
