// Tags management page
"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnimatedSkeleton } from "@/components/ui/enhanced-loading"
import { Hash, Plus, Edit, Trash2, Search } from "lucide-react"

export default function TagsPage() {
  const { data, isLoading, mutate } = useSWR("/api/tags", (url) => fetch(url).then((res) => res.json()))
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<any>(null)
  const [formData, setFormData] = useState({ name: "", slug: "" })

  const tags = data?.tags || []
  
  const filteredTags = tags.filter((tag: any) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const url = editingTag ? `/api/tags/${editingTag.id}` : "/api/tags"
      const method = editingTag ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save tag")
      
      mutate()
      setIsCreateDialogOpen(false)
      setEditingTag(null)
      setFormData({ name: "", slug: "" })
    } catch (error: any) {
      alert(error.message || "Failed to save tag")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this tag?")) return
    
    try {
      const response = await fetch(`/api/tags/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete tag")
      mutate()
    } catch (error: any) {
      alert(error.message || "Failed to delete tag")
    }
  }

  function handleEdit(tag: any) {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug
    })
    setIsCreateDialogOpen(true)
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Tags" subtitle="Manage your blog tags">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <AnimatedSkeleton className="w-64 h-6" />
            <AnimatedSkeleton className="w-32 h-10" />
          </div>
          <div className="flex gap-4">
            <AnimatedSkeleton className="w-96 h-10" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <AnimatedSkeleton className="w-24 h-5" />
                </CardHeader>
                <CardContent>
                  <AnimatedSkeleton className="w-32 h-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Tags"
      subtitle="Organize your content with tags"
      actions={
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTag ? "Edit Tag" : "Create New Tag"}
              </DialogTitle>
              <DialogDescription>
                {editingTag ? "Update the tag details." : "Add a new tag to categorize your posts."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tag name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="tag-slug"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTag ? "Update" : "Create"} Tag
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="p-8 space-y-6">
        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tags Grid */}
        {filteredTags.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Hash className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? "No tags found" : "No tags yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Create your first tag to categorize your content"
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tag
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTags.map((tag: any) => (
              <Card key={tag.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        {tag.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        /{tag.slug}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(tag)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(tag.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {tag.post_count || 0} posts
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(tag.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
