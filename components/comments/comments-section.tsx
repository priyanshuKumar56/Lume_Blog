// Comments section component
"use client"

import type React from "react"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface CommentsSectionProps {
  postId: string
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { data, mutate } = useSWR(`/api/comments?postId=${postId}`, (url) => fetch(url).then((res) => res.json()))

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, postId }),
      })

      if (!response.ok) throw new Error("Failed to add comment")
      setContent("")
      mutate()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteComment(commentId: string) {
    if (!confirm("Delete this comment?")) return

    try {
      const response = await fetch(`/api/comments/${commentId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete comment")
      mutate()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const comments = data?.comments || []

  return (
    <section className="space-y-8 pt-8 border-t border-border">
      <div>
        <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>

        {/* Comment form */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleAddComment} className="space-y-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
              />
              <Button type="submit" disabled={isLoading || !content.trim()}>
                {isLoading ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Comments list */}
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment: any) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {comment.profile_image && (
                      <img
                        src={comment.profile_image || "/placeholder.svg"}
                        alt={comment.author_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{comment.author_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
