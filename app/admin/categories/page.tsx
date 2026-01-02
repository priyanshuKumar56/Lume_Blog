// Admin categories management
"use client"

import type React from "react"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminCategoriesPage() {
  const { data, isLoading, mutate } = useSWR("/api/admin/categories", (url) => fetch(url).then((res) => res.json()))
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAdding(true)

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      })

      if (!response.ok) throw new Error("Failed to add category")
      setName("")
      setSlug("")
      mutate()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  const categories = data?.categories || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Category Management</h1>
        <p className="text-muted-foreground">Manage blog categories</p>
      </div>

      {/* Add Category Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Technology" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="technology" required />
              </div>
            </div>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No categories yet</p>
          ) : (
            <div className="space-y-2">
              {categories.map((category: any) => (
                <div
                  key={category.id}
                  className="p-4 border rounded flex items-center justify-between hover:bg-muted/50"
                >
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-muted-foreground">/{category.slug}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
