// Advanced Blog Form with TipTap Editor
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TipTapEditor } from "./tiptap-editor"
import {
  Save,
  Send,
  Eye,
  FileText,
  Settings,
  Image as ImageIcon,
  Search,
  Hash,
  Clock,
  Zap
} from "lucide-react"

interface AdvancedBlogFormProps {
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
    category?: string
    tags?: string[]
    featured?: boolean
    reading_time?: number
  }
  onSave: (data: any) => Promise<void>
  onPublish: (data: any) => Promise<void>
  onPreview?: (data: any) => void
  isSaving?: boolean
}

export function AdvancedBlogForm({
  initialData,
  onSave,
  onPublish,
  onPreview,
  isSaving = false
}: AdvancedBlogFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [bannerImage, setBannerImage] = useState(initialData?.banner_image || "")
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "")
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [autoGenerateExcerpt, setAutoGenerateExcerpt] = useState(true)
  const [readingTime, setReadingTime] = useState(0)

  const { data: categoriesData } = useSWR("/api/categories", (url) => fetch(url).then((res) => res.json()))
  const categories = categoriesData?.categories || []

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  // Calculate reading time
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  // Auto-generate excerpt from content
  const generateExcerpt = (content: string) => {
    const textContent = content.replace(/<[^>]*>/g, '').trim()
    return textContent.length > 160 ? textContent.substring(0, 160) + '...' : textContent
  }

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!slug) {
      setSlug(generateSlug(newTitle))
    }
    if (!seoTitle) {
      setSeoTitle(newTitle)
    }
  }

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setReadingTime(calculateReadingTime(newContent.replace(/<[^>]*>/g, '')))

    if (autoGenerateExcerpt && !excerpt) {
      setExcerpt(generateExcerpt(newContent))
    }
  }

  // Handle tag input
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
        setTagInput("")
      }
    }
  }

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Save draft
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
      category,
      tags,
      featured,
      reading_time: readingTime
    })
  }

  // Publish post
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
      category,
      tags,
      featured,
      reading_time: readingTime
    })
  }

  // Preview post
  const handlePreview = () => {
    if (onPreview) {
      onPreview({
        title,
        slug,
        excerpt,
        content,
        banner_image: bannerImage,
        status: "PUBLISHED",
        seo_title: seoTitle,
        seo_description: seoDescription,
        category,
        tags,
        featured,
        reading_time: readingTime
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {initialData?.id ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-muted-foreground">
            Write and publish your amazing content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={handlePublish} disabled={isSaving}>
            <Send className="w-4 h-4 mr-2" />
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter your post title..."
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                      {categories.length === 0 && (
                        <SelectItem value="uncategorized" disabled>
                          No categories found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <div className="flex items-center gap-2 mb-2">
                  <Switch
                    checked={autoGenerateExcerpt}
                    onCheckedChange={setAutoGenerateExcerpt}
                  />
                  <Label className="text-sm text-muted-foreground">
                    Auto-generate from content
                  </Label>
                </div>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your post..."
                  rows={3}
                  disabled={autoGenerateExcerpt}
                />
                <p className="text-xs text-muted-foreground">
                  {excerpt.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Content Editor
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TipTapEditor
                content={content}
                onChange={handleContentChange}
                placeholder="Start writing your amazing content..."
              />
            </CardContent>
          </Card>

          {/* Banner Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Banner Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bannerImage">Image URL</Label>
                <Input
                  id="bannerImage"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {bannerImage && (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={bannerImage}
                    alt="Banner preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add tags..."
              />
              <p className="text-xs text-muted-foreground">
                Press Enter or comma to add tags
              </p>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Optimized title for search engines..."
                />
                <p className="text-xs text-muted-foreground">
                  {seoTitle.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Meta description for search engines..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Publishing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Post</Label>
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
