"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { ContentBlock } from "@/lib/content-types"
import { Trash2, Plus } from "lucide-react"

interface BlockEditorProps {
  block: ContentBlock
  onUpdate: (updates: Partial<ContentBlock>) => void
  onDelete: () => void
  onAddAfter: () => void
}

export function BlockEditor({ block, onUpdate, onDelete, onAddAfter }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-background space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{block.type}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onAddAfter}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {block.type === "image" ? (
        <div className="space-y-2">
          <Input
            placeholder="Image URL"
            value={block.metadata?.imageUrl || ""}
            onChange={(e) =>
              onUpdate({
                metadata: { ...block.metadata, imageUrl: e.target.value },
              })
            }
          />
          <Input
            placeholder="Alt text (for SEO)"
            value={block.metadata?.altText || ""}
            onChange={(e) =>
              onUpdate({
                metadata: { ...block.metadata, altText: e.target.value },
              })
            }
          />
          <Input
            placeholder="Caption"
            value={block.metadata?.caption || ""}
            onChange={(e) =>
              onUpdate({
                metadata: { ...block.metadata, caption: e.target.value },
              })
            }
          />
        </div>
      ) : block.type === "video" ? (
        <Input
          placeholder="YouTube/Vimeo embed URL"
          value={block.metadata?.videoUrl || ""}
          onChange={(e) =>
            onUpdate({
              metadata: { ...block.metadata, videoUrl: e.target.value },
            })
          }
        />
      ) : (
        <Textarea
          value={block.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder={`Enter ${block.type} content...`}
          className="min-h-24"
        />
      )}
    </div>
  )
}
