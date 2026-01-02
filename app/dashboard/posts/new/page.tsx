// Create new post page
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdvancedBlogForm } from "@/components/editor/advanced-blog-form"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BlogFormSkeleton } from "@/components/ui/enhanced-loading"

export default function NewPostPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  async function handleSave(data: any) {
    setIsSaving(true)
    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to save post")
      alert("Post saved as draft!")
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handlePublish(data: any) {
    setIsSaving(true)
    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to publish post")
      const post = await response.json()
      router.push(`/blog/${post.slug}`)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  function handlePreview(data: any) {
    // Open preview in new tab or modal
    const previewWindow = window.open('', '_blank')
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Preview: ${data.title}</title>
          <style>
            body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            .meta { color: #666; margin-bottom: 20px; }
            .content { line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>${data.title}</h1>
          <div class="meta">
            Category: ${data.category || 'Uncategorized'} | 
            Tags: ${data.tags?.join(', ') || 'None'} | 
            Reading time: ${data.reading_time} min
          </div>
          <div class="content">
            ${data.excerpt}
          </div>
          <hr>
          <div class="content">
            ${data.content}
          </div>
        </body>
        </html>
      `)
      previewWindow.document.close()
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout
        title="Create New Post"
        subtitle="Write and publish your amazing content"
      >
        <BlogFormSkeleton />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Create New Post"
      subtitle="Write and publish your amazing content"
      actions={
        <div className="flex gap-2">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      }
    >
      <AdvancedBlogForm
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={handlePreview}
        isSaving={isSaving}
      />
    </DashboardLayout>
  )
}
