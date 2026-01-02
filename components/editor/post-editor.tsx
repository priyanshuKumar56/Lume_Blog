// Rich post editor component
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PostEditorProps {
  initialData?: {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    banner_image?: string
    status: "DRAFT" | "PUBLISHED"
    seo_title?: string
    seo_description?: string
  }
  onSave: (data: any) => Promise<void>
  onPublish: (data: any) => Promise<void>
  isSaving?: boolean
}

export function PostEditor({ initialData, onSave, onPublish, isSaving = false }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [bannerImage, setBannerImage] = useState(initialData?.banner_image || "")
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "")
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "")

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!slug) {
      setSlug(generateSlug(e.target.value))
    }
  }

  const handleSaveDraft = async () => {
    await onSave({
      title,
      slug,
      excerpt,
      content,
      banner_image: bannerImage,
      status: "DRAFT",
      seo_title: seoTitle,
      seo_description: seoDescription,
    })
  }

  const handlePublish = async () => {
    await onPublish({
      title,
      slug,
      excerpt,
      content,
      banner_image: bannerImage,
      status: "PUBLISHED",
      seo_title: seoTitle,
      seo_description: seoDescription,
    })
  }

  return (
    <div className="space-y-6">
      {/* Content Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Post Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={handleTitleChange} placeholder="Post title..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-slug" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              rows={12}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Banner Image URL</label>
            <Input value={bannerImage} onChange={(e) => setBannerImage(e.target.value)} placeholder="https://..." />
          </div>
        </CardContent>
      </Card>

      {/* SEO Section */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Optimize for search engines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">SEO Title</label>
            <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Optimized title..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Description</label>
            <Textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Meta description (160 chars)..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        <Button onClick={handlePublish} disabled={isSaving}>
          {isSaving ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  )
}
