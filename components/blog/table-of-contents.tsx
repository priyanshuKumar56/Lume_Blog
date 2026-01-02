"use client"

import type { PostContent } from "@/lib/content-types"
import { useEffect, useState } from "react"
import Link from "next/link"

interface TableOfContentsProps {
  content: PostContent | any
}

interface Heading {
  id: string
  level: number
  title: string
}

// Helper function to render nested content
function renderNodeContent(content: any[]): string {
  if (!Array.isArray(content)) return ""
  
  return content.map((node: any) => {
    if (node.type === "text") {
      return node.text || ""
    }
    return ""
  }).join("")
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // Extract headings from content
    const extracted: Heading[] = []
    
    // Handle both TipTap content and legacy content format
    const contentArray = content.content || content.blocks || []
    
    contentArray.forEach((block: any, index: number) => {
      if (typeof block === "object") {
        // TipTap format
        if (block.type === "heading") {
          const level = block.attrs?.level || 1
          extracted.push({
            id: `heading-${index}`,
            level,
            title: block.content ? renderNodeContent(block.content) : ""
          })
        }
      } else if (typeof block === "string" && block.startsWith("heading")) {
        // Legacy format
        const level = Number.parseInt(block.replace("heading", ""))
        extracted.push({
          id: `heading-${index}`,
          level,
          title: (block as any).content || ""
        })
      }
    })
    setHeadings(extracted)
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="border rounded-lg p-4 bg-muted/50">
      <h3 className="font-semibold text-sm mb-3">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <Link href={`#${heading.id}`} className="text-blue-600 hover:underline line-clamp-2">
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
