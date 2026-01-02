// Categories management page
"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnimatedSkeleton } from "@/components/ui/enhanced-loading"
import { FolderOpen, Plus, Edit, Trash2, Search } from "lucide-react"

export default function CategoriesPage() {
  const { data, isLoading, mutate } = useSWR("/api/categories", (url) => fetch(url).then((res) => res.json()))
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" })

  const categories = data?.categories || []
  
  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories"
      const method = editingCategory ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save category")
      
      mutate()
      setIsCreateDialogOpen(false)
      setEditingCategory(null)
      setFormData({ name: "", slug: "", description: "" })
    } catch (error: any) {
      alert(error.message || "Failed to save category")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return
    
    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete category")
      mutate()
    } catch (error: any) {
      alert(error.message || "Failed to delete category")
    }
  }

  function handleEdit(category: any) {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ""
    })
    setIsCreateDialogOpen(true)
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Categories" subtitle="Manage your blog categories">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <AnimatedSkeleton className="w-64 h-6" />
            <AnimatedSkeleton className="w-32 h-10" />
          </div>
          <div className="flex gap-4">
            <AnimatedSkeleton className="w-96 h-10" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <AnimatedSkeleton className="w-32 h-5" />
                  <AnimatedSkeleton className="w-48 h-4" />
                </CardHeader>
                <CardContent>
                  <AnimatedSkeleton className="w-24 h-4" />
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
      title="Categories"
      subtitle="Organize your content with categories"
      actions={
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory ? "Update the category details." : "Add a new category to organize your posts."}
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
                    placeholder="Category name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="category-slug"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Category description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCategory ? "Update" : "Create"} Category
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? "No categories found" : "No categories yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Create your first category to organize your content"
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Category
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category: any) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription className="mt-1">
                        /{category.slug}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {category.post_count || 0} posts
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Created {new Date(category.created_at).toLocaleDateString()}
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
