"use client"

import { useEffect, useState } from "react"

interface PopularPostsProps {
  period?: "7days" | "30days" | "alltime"
  limit?: number
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  author_name: string
  view_count: number
  avg_read_time: number
}

export function PopularPosts({ period = "7days", limit = 5 }: PopularPostsProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/popular?period=${period}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [period, limit])

  if (loading) return <div>Loading popular posts...</div>
  if (posts.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Trending Now</h3>
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-3 hover:bg-muted transition-colors cursor-pointer">
            <h4 className="font-semibold text-sm line-clamp-2">{post.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{post.view_count} views</p>
          </div>
        ))}
      </div>
    </div>
  )
}
