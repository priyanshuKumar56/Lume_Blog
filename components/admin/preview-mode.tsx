"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface PreviewModeProps {
  children: React.ReactNode
  isDraft?: boolean
}

export function PreviewMode({ children, isDraft = false }: PreviewModeProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={showPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="gap-2"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
        {isDraft && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Draft</span>}
      </div>

      {showPreview && <div className="border rounded-lg p-6 bg-background">{children}</div>}
    </div>
  )
}
