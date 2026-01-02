"use client"

import { Card } from "@/components/ui/card"

interface SEOPreviewProps {
  title: string
  description: string
  url: string
  image?: string
}

export function SEOPreview({ title, description, url, image }: SEOPreviewProps) {
  const displayUrl = new URL(url, "https://example.com").pathname

  return (
    <Card className="p-4 bg-muted/50">
      <div className="space-y-3">
        {image && <img src={image || "/placeholder.svg"} alt="Preview" className="w-full h-32 object-cover rounded" />}

        <div>
          <h3 className="text-sm font-semibold text-primary line-clamp-1">{title || "Your page title"}</h3>
          <p className="text-xs text-muted-foreground">{displayUrl}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description || "Your meta description appears here"}
          </p>
        </div>

        <div className="text-xs space-y-1">
          <div>
            <span className="text-muted-foreground">Title: </span>
            <span className={title.length > 60 ? "text-red-500" : "text-green-500"}>{title.length}/60</span>
          </div>
          <div>
            <span className="text-muted-foreground">Description: </span>
            <span
              className={
                description.length > 160
                  ? "text-red-500"
                  : description.length < 120
                    ? "text-yellow-500"
                    : "text-green-500"
              }
            >
              {description.length}/160
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
