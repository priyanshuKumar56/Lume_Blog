"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { type ContentBlock, type PostContent, addBlock, updateBlock, deleteBlock } from "@/lib/content-types"
import { BlockEditor } from "./block-editor"

interface RichEditorProps {
  initialContent: PostContent
  onChange: (content: PostContent) => void
}

export function RichEditor({ initialContent, onChange }: RichEditorProps) {
  const [content, setContent] = useState<PostContent>(initialContent)

  const handleBlockUpdate = useCallback(
    (blockId: string, updates: Partial<ContentBlock>) => {
      const newContent = updateBlock(content, blockId, updates)
      setContent(newContent)
      onChange(newContent)
    },
    [content, onChange],
  )

  const handleAddBlock = useCallback(
    (type: any, position?: number) => {
      const newContent = addBlock(content, type, position)
      setContent(newContent)
      onChange(newContent)
    },
    [content, onChange],
  )

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      if (content.blocks.length === 1) {
        alert("Cannot delete the last block")
        return
      }
      const newContent = deleteBlock(content, blockId)
      setContent(newContent)
      onChange(newContent)
    },
    [content, onChange],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 sticky top-0 bg-background/95 backdrop-blur p-2 rounded-lg border">
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("heading1")}>
          H1
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("heading2")}>
          H2
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("paragraph")}>
          Paragraph
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("bulleted-list")}>
          Bullet List
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("numbered-list")}>
          Numbered List
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("quote")}>
          Quote
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("code")}>
          Code
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("image")}>
          Image
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("video")}>
          Video
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddBlock("table")}>
          Table
        </Button>
      </div>

      <div className="space-y-3 border rounded-lg p-4 bg-card min-h-96">
        {content.blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            block={block}
            onUpdate={(updates) => handleBlockUpdate(block.id, updates)}
            onDelete={() => handleDeleteBlock(block.id)}
            onAddAfter={() => handleAddBlock("paragraph", index + 1)}
          />
        ))}
      </div>
    </div>
  )
}
