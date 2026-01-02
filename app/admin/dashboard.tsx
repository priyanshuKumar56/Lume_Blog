"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Stats {
  summary: {
    totalUsers: number
    totalPosts: number
    totalComments: number
    totalViews: number
  }
  recentPosts: Array<{ title: string; published_at: string }>
  topPosts: Array<{ title: string; views: number }>
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading dashboard...</div>
  if (!stats) return <div>Failed to load dashboard</div>

  const chartData = stats.topPosts.map((post) => ({
    name: post.title.substring(0, 30),
    views: post.views,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-3xl font-bold">{stats.summary.totalUsers}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Published Posts</p>
          <p className="text-3xl font-bold">{stats.summary.totalPosts}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Comments</p>
          <p className="text-3xl font-bold">{stats.summary.totalComments}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Views</p>
          <p className="text-3xl font-bold">{stats.summary.totalViews}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Posts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
