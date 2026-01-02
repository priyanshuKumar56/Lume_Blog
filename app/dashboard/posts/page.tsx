// User's posts list
"use client"

import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  MoreHorizontal,
  Plus,
  FileText,
  TrendingUp,
  Globe
} from "lucide-react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout" // Using wrapper
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PostsListSkeleton } from "@/components/ui/enhanced-loading"
import { cn } from "@/lib/utils"

export default function PostsPage() {
  const { data, isLoading, mutate } = useSWR("/api/user/posts", (url) => fetch(url).then((res) => res.json()))
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  async function handleDelete(postId: string) {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) return

    try {
      const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Delete failed")
      mutate() // Refresh list
    } catch (error) {
      alert("Failed to delete post")
    }
  }

  const posts = data?.posts || []

  // Filter posts
  const filteredPosts = posts.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: posts.length,
    published: posts.filter((p: any) => p.status === "PUBLISHED").length,
    drafts: posts.filter((p: any) => p.status === "DRAFT").length,
    totalViews: posts.reduce((sum: number, p: any) => sum + (p.view_count || 0), 0)
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Posts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your blog content and track performance
            </p>
          </div>
          <Button asChild className="shadow-lg hover:shadow-xl transition-all">
            <Link href="/dashboard/posts/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Post
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <h3 className="text-2xl font-bold">{stats.total}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <h3 className="text-2xl font-bold">{stats.published}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <Edit3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  <h3 className="text-2xl font-bold">{stats.drafts}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <h3 className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl shadow-sm border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-muted bg-muted/50 focus:bg-background transition-colors"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 border-muted bg-muted/50 focus:bg-background">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <PostsListSkeleton />
        ) : filteredPosts.length === 0 ? (
          <Card className="border-dashed border-2 shadow-none bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm || statusFilter !== "all"
                  ? "No matching posts found"
                  : "No posts yet"}
              </h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "Start sharing your story with the world. Create your first blog post today."}
              </p>
              <Button asChild>
                <Link href="/dashboard/posts/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post: any) => (
              <Card key={post.id} className="group flex flex-col overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                {/* Card Header / Image Placeholder */}
                <div className="h-48 bg-muted relative overflow-hidden">
                  {/* Banner Image or Gradient Fallback */}
                  {post.banner_image ? (
                    <img
                      src={post.banner_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      post.status === 'PUBLISHED' ? "from-blue-500/10 to-purple-500/10" : "from-orange-500/10 to-yellow-500/10"
                    )} />
                  )}

                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge
                      variant={post.status === "PUBLISHED" ? "default" : "secondary"}
                      className={cn(
                        "shadow-sm",
                        post.status === "PUBLISHED"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      )}
                    >
                      {post.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="flex-1 p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium text-foreground">{post.view_count || 0}</span> views
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 bg-muted/30 flex items-center justify-between">
                  <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href={`/dashboard/posts/${post.id}`}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="w-4 h-4 mr-2" />
                          View Live
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/posts/${post.id}`}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Post
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

