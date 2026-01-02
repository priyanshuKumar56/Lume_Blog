// Specialized Post management dashboard
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { AdvancedBlogForm } from "@/components/editor/advanced-blog-form"
import {
  ArrowLeft,
  Settings,
  FileText,
  Globe,
  Eye,
  Clock,
  Calendar,
  Edit,
  Save,
  X,
  ExternalLink,
  Trash2,
  Tag as TagIcon,
  Layout as LayoutIcon,
  ChevronRight
} from "lucide-react"

type EditingSection = 'content' | 'seo' | 'metadata' | null

export default function PostManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string>("")
  const [editingSection, setEditingSection] = useState<EditingSection>(null)
  const [isSaving, setIsSaving] = useState(false)

  params.then((p) => {
    if (!id) setId(p.id)
  })

  const { data: post, isLoading, mutate } = useSWR(id ? `/api/posts/${id}` : null, (url) =>
    fetch(url).then((res) => res.json()),
  )

  async function handleUpdate(data: any) {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/posts/${id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, ...data }), // Merge with existing post
      })

      if (!response.ok) throw new Error("Update failed")
      await mutate()
      setEditingSection(null)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure? This is permanent.")) return
    try {
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Delete failed")
      router.push("/dashboard/posts")
    } catch (e: any) { alert(e.message) }
  }

  if (isLoading) return <DashboardLayout title="Loading..."><div className="p-8 space-y-4"><Skeleton className="h-64 w-full" /></div></DashboardLayout>
  if (!post || post.error) return <DashboardLayout title="Error">Post not found</DashboardLayout>

  return (
    <DashboardLayout
      title="Post Dashboard"
      subtitle={post.title}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/posts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Posts
          </Button>
          <Button variant="ghost" size="sm" onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Live View
          </Button>
        </div>
      }
    >
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

        {/* Status Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className={cn("w-3 h-3 rounded-full", post.status === 'PUBLISHED' ? 'bg-green-500 animate-pulse' : 'bg-amber-400')} />
            <div>
              <h2 className="text-xl font-bold text-zinc-900 leading-tight">{post.title}</h2>
              <p className="text-zinc-500 text-sm">
                Status: <span className="font-medium text-zinc-900">{post.status}</span> •
                Last updated {new Date(post.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 bg-zinc-50 border-zinc-200 text-zinc-600 font-medium">
              {post.view_count || 0} Views
            </Badge>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {editingSection === 'content' ? (
          <Card className="border-zinc-900/10 shadow-xl overflow-hidden">
            <CardHeader className="bg-zinc-50 border-b border-zinc-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Edit Content</CardTitle>
                <CardDescription>Update the main body and title of your post.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditingSection(null)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <AdvancedBlogForm
                initialData={post}
                onSave={handleUpdate}
                onPublish={handleUpdate}
                isSaving={isSaving}
              // We pass limited fields or just use the full form but styled for this context
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Information Sections */}
            <Card className="md:col-span-2 border-zinc-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <CardTitle className="text-lg">Content Summary</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditingSection('content')}>
                  <Edit className="w-3.5 h-3.5 mr-2" />
                  Edit Full Post
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {post.banner_image && (
                  <div className="aspect-video relative rounded-xl overflow-hidden border border-zinc-100">
                    <img src={post.banner_image} className="object-cover w-full h-full" alt="" />
                  </div>
                )}
                <div className="space-y-2">
                  <h4 className="font-semibold text-zinc-900">{post.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{post.excerpt || "No excerpt set."}</p>
                </div>
                <div className="pt-4 border-t border-zinc-100 flex items-center gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    ~{Math.ceil((post.content?.split(' ').length || 0) / 200)} min read
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Created {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* SEO Section */}
              <Card className="border-zinc-200">
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle className="text-md flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    SEO & Slug
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setEditingSection('seo')}>
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === 'seo' ? (
                    <form className="space-y-3" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      handleUpdate({
                        seo_title: formData.get('seo_title'),
                        seo_description: formData.get('seo_description'),
                        slug: formData.get('slug')
                      });
                    }}>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">SEO Title</label>
                        <Input name="seo_title" defaultValue={post.seo_title} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Slug</label>
                        <Input name="slug" defaultValue={post.slug} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">SEO Description</label>
                        <Textarea name="seo_description" defaultValue={post.seo_description} className="text-sm" rows={2} />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 h-8" type="submit" disabled={isSaving}>Save</Button>
                        <Button size="sm" variant="ghost" className="h-8" onClick={() => setEditingSection(null)}>Cancel</Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-zinc-400">URL Slug</p>
                        <p className="text-sm font-mono text-zinc-600 truncate">/blog/{post.slug}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-zinc-400">Search Result Title</p>
                        <p className="text-sm text-zinc-800">{post.seo_title || post.title}</p>
                      </div>
                      <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1">Google Preview</p>
                        <p className="text-[#1a0dab] text-lg hover:underline cursor-pointer truncate">{post.seo_title || post.title}</p>
                        <p className="text-[#006621] text-xs truncate">https://lume.blog/{post.slug}</p>
                        <p className="text-[#545454] text-xs line-clamp-2 mt-1">{post.seo_description || "Update description to improve search results..."}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Metadata Section */}
              <Card className="border-zinc-200">
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle className="text-md flex items-center gap-2">
                    <LayoutIcon className="w-4 h-4 text-purple-600" />
                    Taxonomy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase text-zinc-400">Category</p>
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                      {post.category_ids?.[0] || 'Uncategorized'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase text-zinc-400">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.map((t: string) => (
                        <span key={t} className="text-xs text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <TagIcon className="w-3 h-3" />
                          {t}
                        </span>
                      )) || <span className="text-xs text-zinc-400 italic">No tags</span>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full text-zinc-500 hover:text-zinc-900" onClick={() => setEditingSection('content')}>
                    Change Taxonomy
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
