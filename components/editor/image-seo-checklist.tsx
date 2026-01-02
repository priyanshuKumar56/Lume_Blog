"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"
import type { ImageSEO } from "@/lib/image-utils"

interface ImageSEOChecklistProps {
  image: ImageSEO
}

export function ImageSEOChecklist({ image }: ImageSEOChecklistProps) {
  const checks = [
    {
      title: "Alt Text",
      passed: image.altText && image.altText.length >= 5,
      description: image.altText ? `${image.altText.length} characters` : "Add descriptive alt text",
    },
    {
      title: "Image Title",
      passed: !!image.title,
      description: image.title || "Optional but recommended",
    },
    {
      title: "Caption",
      passed: !!image.caption,
      description: image.caption || "Optional context for users",
    },
    {
      title: "Dimensions",
      passed: image.width && image.height,
      description: image.width && image.height ? `${image.width}x${image.height}` : "Add width/height to prevent CLS",
    },
    {
      title: "Format",
      passed: image.format === "webp" || image.format === "avif",
      description: image.format || "Use WebP/AVIF for best performance",
    },
  ]

  const passedCount = checks.filter((c) => c.passed).length

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Image SEO Checklist</h3>
          <span className="text-sm text-muted-foreground">
            {passedCount}/{checks.length}
          </span>
        </div>

        <div className="space-y-2">
          {checks.map((check) => (
            <div key={check.title} className="flex items-start gap-2">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="font-sm font-medium">{check.title}</p>
                <p className="text-xs text-muted-foreground">{check.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
