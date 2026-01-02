// Media management page
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnimatedSkeleton } from "@/components/ui/enhanced-loading"
import { Image as ImageIcon, Upload, Search, Download, Trash2, Calendar } from "lucide-react"

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const isLoading = false

  // Mock media data
  const mediaItems = [
    {
      id: "1",
      name: "blog-hero-1.jpg",
      url: "https://picsum.photos/400/300?random=1",
      size: "245 KB",
      type: "image/jpeg",
      uploaded: "2024-01-15",
      dimensions: "1920x1080"
    },
    {
      id: "2", 
      name: "thumbnail-2.png",
      url: "https://picsum.photos/400/300?random=2",
      size: "128 KB",
      type: "image/png",
      uploaded: "2024-01-14",
      dimensions: "800x600"
    },
    {
      id: "3",
      name: "feature-image-3.jpg",
      url: "https://picsum.photos/400/300?random=3",
      size: "512 KB",
      type: "image/jpeg",
      uploaded: "2024-01-13",
      dimensions: "1200x800"
    }
  ]

  const filteredMedia = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <DashboardLayout title="Media" subtitle="Manage your images and files">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <AnimatedSkeleton className="w-64 h-6" />
            <AnimatedSkeleton className="w-32 h-10" />
          </div>
          <div className="flex gap-4">
            <AnimatedSkeleton className="w-96 h-10" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <div className="aspect-video bg-muted">
                  <AnimatedSkeleton className="w-full h-full" />
                </div>
                <CardContent className="p-4">
                  <AnimatedSkeleton className="w-32 h-4 mb-2" />
                  <AnimatedSkeleton className="w-24 h-3" />
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
      title="Media Library"
      subtitle="Manage your images and files"
      actions={
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      }
    >
      <div className="p-8 space-y-6">
        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? "No media found" : "No media files yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Upload your first images to use in your blog posts"
                }
              </p>
              {!searchTerm && (
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm truncate mb-2">{item.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.size}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.type.split('/')[1].toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.dimensions}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.uploaded}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Area */}
        <Card className="border-dashed border-2">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload More Files</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your images here, or click to browse
              </p>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
