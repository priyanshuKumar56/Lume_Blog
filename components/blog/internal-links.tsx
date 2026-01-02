"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface InternalLink {
  id: string
  title: string
  slug: string
  excerpt: string
}

interface InternalLinksProps {
  currentPostId: string
  keywords: string[]
}

export function InternalLinks({ currentPostId, keywords }: InternalLinksProps) {
  const [links, setLinks] = useState<InternalLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Build internal linking suggestions based on keywords
    const fetchSuggestions = async () => {
      try {
        const keywordQuery = keywords.join(" OR ")
        const res = await fetch(`/api/posts/search?q=${encodeURIComponent(keywordQuery)}&limit=5`)
        const data = await res.json()

        // Filter out current post
        const filtered = data.results?.filter((p: any) => p.id !== currentPostId) || []
        setLinks(filtered.slice(0, 3))
      } catch (error) {
        console.error("Error fetching internal link suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    if (keywords.length > 0) {
      fetchSuggestions()
    }
  }, [currentPostId, keywords])

  if (loading || links.length === 0) return null

  return (
    <div className="border-t pt-8 mt-8">
      <h3 className="font-semibold mb-4">Recommended Reading</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={`/blog/${link.slug}`} className="text-blue-600 hover:underline">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
