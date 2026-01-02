// Post like/share actions
"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"

interface PostActionsProps {
  postId: string
  postSlug: string
}

export function PostActions({ postId, postSlug }: PostActionsProps) {
  const { data, mutate } = useSWR(`/api/posts/${postId}/likes`, (url) => fetch(url).then((res) => res.json()))
  const [liked, setLiked] = useState(false)

  async function handleLike() {
    try {
      const response = await fetch(`/api/posts/${postId}/likes`, { method: "POST" })
      if (!response.ok) throw new Error("Failed to like post")
      const result = await response.json()
      setLiked(result.liked)
      mutate()
    } catch (error: any) {
      alert(error.message)
    }
  }

  function handleShare() {
    const url = `${window.location.origin}/blog/${postSlug}`
    navigator.clipboard.writeText(url)
    alert("Link copied to clipboard!")
  }

  const likes = data?.likes || 0

  return (
    <div className="flex gap-2">
      <Button variant={liked ? "default" : "outline"} onClick={handleLike}>
        ❤️ {likes}
      </Button>
      <Button variant="outline" onClick={handleShare}>
        Share
      </Button>
    </div>
  )
}
