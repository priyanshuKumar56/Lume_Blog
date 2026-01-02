"use client"

import { useEffect, useRef } from "react"

interface ViewTrackerProps {
  postId: string
}

export function ViewTracker({ postId }: ViewTrackerProps) {
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const trackView = () => {
      const readTime = Math.round((Date.now() - startTimeRef.current) / 1000)
      const referrer = document.referrer

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          readTime,
          referrer: referrer || "direct",
        }),
      }).catch(console.error)
    }

    // Track when user leaves the page
    window.addEventListener("beforeunload", trackView)
    return () => window.removeEventListener("beforeunload", trackView)
  }, [postId])

  return null
}
