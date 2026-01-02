"use client"

import { useEffect, useState } from "react"
import { PostCard } from "./post-card"

interface RelatedPostsProps {
  postId: string
  limit?: number
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  banner_image?: string
  published_at: string
  view_count: number
  author_name: string
  author_slug: string
  category_matches?: number
}

export function RelatedPosts({ postId, limit = 3 }: RelatedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/related?postId=${postId}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch related posts')
        return res.json()
      })
      .then((data) => setPosts(data.posts || []))
      .catch((error) => {
        console.error('Failed to fetch related posts:', error)
        setPosts([])
      })
      .finally(() => setLoading(false))
  }, [postId, limit])

  if (loading) return <div>Loading related posts...</div>
  if (posts.length === 0) return null

  return (
    <div className="mt-16 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            banner_image={post.banner_image}
            published_at={post.published_at}
            view_count={post.view_count}
            author_name={post.author_name}
            author_slug={post.author_slug}
          />
        ))}
      </div>
    </div>
  )
}
