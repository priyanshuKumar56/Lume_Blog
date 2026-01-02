export type ContentBlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "bulleted-list"
  | "numbered-list"
  | "quote"
  | "code"
  | "image"
  | "table"
  | "video"

export interface TextMark {
  type: "bold" | "italic" | "underline" | "code"
  offset: number
  length: number
}

export interface ContentBlock {
  id: string
  type: ContentBlockType
  content: string
  marks?: TextMark[]
  metadata?: {
    language?: string // for code blocks
    altText?: string // for images
    caption?: string // for images
    imageUrl?: string // for images
    videoUrl?: string // for videos
    rows?: Array<string[]> // for tables
    level?: number // for list items
  }
}

export interface PostContent {
  blocks: ContentBlock[]
  version: "1.0"
}

export function createEmptyPostContent(): PostContent {
  return {
    version: "1.0",
    blocks: [{ id: "1", type: "paragraph", content: "" }],
  }
}

export function addBlock(content: PostContent, type: ContentBlockType, position?: number): PostContent {
  const block: ContentBlock = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    content: "",
  }

  if (position !== undefined) {
    content.blocks.splice(position, 0, block)
  } else {
    content.blocks.push(block)
  }

  return content
}

export function updateBlock(content: PostContent, blockId: string, updates: Partial<ContentBlock>): PostContent {
  const index = content.blocks.findIndex((b) => b.id === blockId)
  if (index !== -1) {
    content.blocks[index] = { ...content.blocks[index], ...updates }
  }
  return content
}

export function deleteBlock(content: PostContent, blockId: string): PostContent {
  content.blocks = content.blocks.filter((b) => b.id !== blockId)
  return content
}
