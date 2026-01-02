// Admin post management table
"use client"

import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function PostTable() {
  const { data, isLoading, mutate } = useSWR("/api/admin/posts", (url) => fetch(url).then((res) => res.json()))

  async function publishPost(postId: string) {
    try {
      const response = await fetch(`/api/admin/posts/${postId}/publish`, { method: "PUT" })
      if (!response.ok) throw new Error("Failed to publish post")
      mutate()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const posts = data?.posts || []

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Title</th>
                <th className="text-left py-2 px-4">Author</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Views</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium truncate">{post.title}</td>
                  <td className="py-3 px-4 text-muted-foreground">{post.author_name}</td>
                  <td className="py-3 px-4">
                    <Badge variant={post.status === "PUBLISHED" ? "default" : "secondary"}>{post.status}</Badge>
                  </td>
                  <td className="py-3 px-4">{post.view_count}</td>
                  <td className="py-3 px-4">
                    {post.status === "DRAFT" && (
                      <Button size="sm" onClick={() => publishPost(post.id)}>
                        Publish
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
