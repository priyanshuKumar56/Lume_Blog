// Dashboard home page
"use client"
import useSWR from "swr"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Eye, FileText, ArrowRight, PenLine, Clock, MoreVertical } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  DashboardStatsSkeleton,
  RecentPostsSkeleton,
} from "@/components/ui/enhanced-loading"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useSWR("/api/user/profile", (url) => fetch(url).then((res) => res.json()))
  const { data: postsData, isLoading: postsLoading } = useSWR("/api/user/posts", (url) => fetch(url).then((res) => res.json()))
  const { data: statsData, isLoading: statsLoading } = useSWR("/api/user/stats", (url) => fetch(url).then((res) => res.json()))

  const user = profile?.user
  const posts = postsData?.posts || []
  const stats = statsData?.stats || { published: 0, drafts: 0, totalViews: 0, totalPosts: 0 }
  const recentPosts = posts.slice(0, 5) // Show top 5 recent posts
  const isLoading = profileLoading || postsLoading || statsLoading

  return (
    <DashboardLayout title="Overview" subtitle="Welcome back to your studio.">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-12">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Good morning, {user?.name?.split(' ')[0] || 'Creator'}</h2>
            <p className="text-sm text-zinc-500">Here's what's happening with your content today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog">
              <Button variant="outline" className="border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50">
                View Live Site
              </Button>
            </Link>
            <Link href="/dashboard/posts/new">
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/10">
                <PenLine className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        {statsLoading ? (
          // Custom minimal skeleton for stats
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl border border-zinc-100 bg-white p-6 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-xl border border-zinc-100 bg-white hover:border-zinc-200 transition-colors">
              <div className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Total Views
              </div>
              <div className="text-3xl font-semibold text-zinc-900 tracking-tight">{stats.totalViews.toLocaleString()}</div>
            </div>

            <div className="p-6 rounded-xl border border-zinc-100 bg-white hover:border-zinc-200 transition-colors">
              <div className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Published
              </div>
              <div className="text-3xl font-semibold text-zinc-900 tracking-tight">{stats.published}</div>
            </div>

            <div className="p-6 rounded-xl border border-zinc-100 bg-white hover:border-zinc-200 transition-colors">
              <div className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
                <PenLine className="w-4 h-4" /> Drafts
              </div>
              <div className="text-3xl font-semibold text-zinc-900 tracking-tight">{stats.drafts}</div>
            </div>

            <div className="p-6 rounded-xl border border-zinc-100 bg-white hover:border-zinc-200 transition-colors">
              <div className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Avg. Views
              </div>
              <div className="text-3xl font-semibold text-zinc-900 tracking-tight">
                {stats.totalPosts > 0 ? Math.round(stats.totalViews / stats.totalPosts) : 0}
              </div>
            </div>
          </div>
        )}

        {/* Recent Posts List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900">Recent Posts</h3>
            <Link href="/dashboard/posts" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
            {postsLoading ? (
              <RecentPostsSkeleton />
            ) : recentPosts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <PenLine size={20} />
                </div>
                <h3 className="text-zinc-900 font-medium mb-1">No posts created</h3>
                <p className="text-sm text-zinc-500 mb-6">Write your first article to see it here.</p>
                <Link href="/dashboard/posts/new">
                  <Button variant="outline">Write Post</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {recentPosts.map((post: any) => (
                  <div key={post.id} className="group flex items-center gap-4 p-4 hover:bg-zinc-50/50 transition-colors">
                    {/* Minimal Status Dot */}
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      post.status === 'PUBLISHED' ? "bg-emerald-500" : "bg-amber-400"
                    )} />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-900 truncate mb-1 group-hover:text-indigo-600 transition-colors">
                        <Link href={`/dashboard/posts/${post.id}`}>{post.title}</Link>
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {post.view_count || 0} views
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/posts/${post.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 text-xs font-medium">Edit</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

