// Analytics overview page
"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnimatedSkeleton } from "@/components/ui/enhanced-loading"
import { BarChart3, TrendingUp, Eye, FileText, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
  const { data: statsData, isLoading: statsLoading } = useSWR("/api/user/stats", (url) => fetch(url).then((res) => res.json()))
  const { data: popularData, isLoading: popularLoading } = useSWR("/api/posts/popular?limit=5", (url) => fetch(url).then((res) => res.json()))
  const { data: categoriesData, isLoading: categoriesLoading } = useSWR("/api/categories", (url) => fetch(url).then((res) => res.json()))

  const stats = statsData?.stats || { totalViews: 0, published: 0, drafts: 0, totalPosts: 0 }
  const popularPosts = popularData?.posts || []
  const categories = categoriesData?.categories || []

  // Calculate top performing category
  const topCategory = categories.length > 0 ? categories[0] : null

  if (statsLoading || popularLoading || categoriesLoading) {
    return (
      <DashboardLayout title="Analytics" subtitle="View your blog performance">
        <div className="p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="h-96 bg-zinc-100 rounded-xl animate-pulse" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Analytics" subtitle="View your blog performance">
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-zinc-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-500">
                <Eye className="w-4 h-4" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-zinc-900">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-zinc-500 mt-1">
                Across {stats.published} published posts
              </p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-500">
                <FileText className="w-4 h-4" />
                Avg. Views per Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-zinc-900">
                {stats.published > 0 ? Math.round(stats.totalViews / stats.published).toLocaleString() : 0}
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Engagement metric
              </p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-500">
                <Folder className="w-4 h-4" />
                Top Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-zinc-900 truncate">
                {topCategory ? topCategory.name : "N/A"}
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {topCategory ? `${topCategory.post_count} posts` : "No categories yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Popular Posts */}
          <Card className="lg:col-span-2 border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg text-zinc-900">Most Viewed Posts</CardTitle>
              <CardDescription>Content that is performing well</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-4">
                {popularPosts.length === 0 ? (
                  <div className="p-8 border border-dashed border-zinc-200 rounded-xl text-center text-zinc-500 text-sm">
                    No view data available yet.
                  </div>
                ) : (
                  popularPosts.map((post: any, i: number) => (
                    <div key={post.id} className="group flex items-center gap-4 p-4 rounded-xl border border-zinc-100 bg-white hover:border-zinc-300 transition-all">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-500 text-xs">
                        #{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-900 truncate group-hover:text-indigo-600 transition-colors">
                          {post.title}
                        </div>
                        <div className="text-xs text-zinc-500 truncate">
                          {post.slug}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-zinc-900 whitespace-nowrap">
                        {parseInt(post.view_count).toLocaleString()} <span className="text-zinc-400 font-normal text-xs ml-1">views</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories Stats */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg text-zinc-900">Category Breakdown</CardTitle>
              <CardDescription>Distribution of your content</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-3">
                {categories.map((cat: any) => (
                  <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 text-sm">
                    <span className="font-medium text-zinc-700">{cat.name}</span>
                    <span className="text-zinc-500 bg-white px-2 py-0.5 rounded border border-zinc-100 text-xs">
                      {cat.post_count}
                    </span>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="text-sm text-zinc-500">No categories found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
