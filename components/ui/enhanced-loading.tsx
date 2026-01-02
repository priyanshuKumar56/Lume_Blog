// Enhanced Loading Components with Animations
"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Animated Pulse Skeleton
export function AnimatedSkeleton({ className, ...props }: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn(
        "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  )
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute top-0 right-0 w-20 h-20 bg-muted/20 rounded-full -mr-10 -mt-10 animate-pulse" />
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AnimatedSkeleton className="w-4 h-4 rounded" />
              <AnimatedSkeleton className="w-24 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <AnimatedSkeleton className="w-16 h-8 mb-2" />
            <AnimatedSkeleton className="w-20 h-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Recent Posts Skeleton
export function RecentPostsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 animate-pulse">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <AnimatedSkeleton className="w-32 h-5" />
              <AnimatedSkeleton className="w-16 h-5 rounded-full" />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <AnimatedSkeleton className="w-4 h-4 rounded" />
                <AnimatedSkeleton className="w-20 h-3" />
              </div>
              <div className="flex items-center gap-2">
                <AnimatedSkeleton className="w-4 h-4 rounded" />
                <AnimatedSkeleton className="w-12 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AnimatedSkeleton className="w-16 h-8 rounded" />
              <AnimatedSkeleton className="w-16 h-8 rounded" />
            </div>
          </div>
          <AnimatedSkeleton className="w-8 h-8 rounded" />
        </div>
      ))}
    </div>
  )
}

// Posts List Skeleton
export function PostsListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="border-0 shadow-md animate-pulse">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <AnimatedSkeleton className="w-48 h-6" />
                  <AnimatedSkeleton className="w-20 h-5 rounded-full" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <AnimatedSkeleton className="w-4 h-4 rounded" />
                    <AnimatedSkeleton className="w-24 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <AnimatedSkeleton className="w-4 h-4 rounded" />
                    <AnimatedSkeleton className="w-16 h-3" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <AnimatedSkeleton className="w-12 h-8 rounded" />
                  <AnimatedSkeleton className="w-12 h-8 rounded" />
                  <AnimatedSkeleton className="w-12 h-8 rounded" />
                </div>
              </div>
              
              <div className="flex gap-2 flex-shrink-0">
                <AnimatedSkeleton className="w-8 h-8 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Blog Form Skeleton
export function BlogFormSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <AnimatedSkeleton className="w-48 h-9" />
          <AnimatedSkeleton className="w-96 h-5" />
        </div>
        <div className="flex gap-2">
          <AnimatedSkeleton className="w-20 h-9 rounded" />
          <AnimatedSkeleton className="w-24 h-9 rounded" />
          <AnimatedSkeleton className="w-20 h-9 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedSkeleton className="w-5 h-5 rounded" />
                <AnimatedSkeleton className="w-32 h-6" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <AnimatedSkeleton className="w-16 h-4" />
                <AnimatedSkeleton className="w-full h-10 rounded" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <AnimatedSkeleton className="w-12 h-4" />
                  <AnimatedSkeleton className="w-full h-10 rounded" />
                </div>
                <div className="space-y-2">
                  <AnimatedSkeleton className="w-16 h-4" />
                  <AnimatedSkeleton className="w-full h-10 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <AnimatedSkeleton className="w-12 h-4" />
                <AnimatedSkeleton className="w-full h-24 rounded" />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedSkeleton className="w-5 h-5 rounded" />
                  <AnimatedSkeleton className="w-40 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedSkeleton className="w-4 h-4 rounded" />
                  <AnimatedSkeleton className="w-16 h-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Editor Toolbar */}
              <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1 mb-4">
                {[...Array(15)].map((_, i) => (
                  <AnimatedSkeleton key={i} className="w-8 h-8 rounded" />
                ))}
              </div>
              {/* Editor Content */}
              <div className="min-h-[400px] space-y-2">
                {[...Array(8)].map((_, i) => (
                  <AnimatedSkeleton 
                    key={i} 
                    className={cn(
                      "h-4",
                      i === 0 && "w-3/4",
                      i === 1 && "w-full",
                      i === 2 && "w-5/6",
                      i === 3 && "w-2/3",
                      i === 4 && "w-full",
                      i === 5 && "w-4/5",
                      i === 6 && "w-3/4",
                      i === 7 && "w-2/3"
                    )} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedSkeleton className="w-5 h-5 rounded" />
                <AnimatedSkeleton className="w-12 h-6" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <AnimatedSkeleton key={i} className="w-16 h-6 rounded-full" />
                ))}
              </div>
              <AnimatedSkeleton className="w-full h-10 rounded" />
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedSkeleton className="w-5 h-5 rounded" />
                <AnimatedSkeleton className="w-24 h-6" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <AnimatedSkeleton className="w-16 h-4" />
                <AnimatedSkeleton className="w-full h-10 rounded" />
                <AnimatedSkeleton className="w-20 h-3" />
              </div>
              <div className="space-y-2">
                <AnimatedSkeleton className="w-32 h-4" />
                <AnimatedSkeleton className="w-full h-20 rounded" />
                <AnimatedSkeleton className="w-20 h-3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Blog Post Card Skeleton
export function BlogPostCardSkeleton() {
  return (
    <div className="group flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card animate-pulse">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <AnimatedSkeleton className="w-full h-full" />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <AnimatedSkeleton className="w-20 h-4" />
          <AnimatedSkeleton className="w-1 h-4 rounded-full" />
          <AnimatedSkeleton className="w-24 h-4" />
        </div>
        
        <div className="space-y-2 mb-4">
          <AnimatedSkeleton className="w-3/4 h-6" />
          <AnimatedSkeleton className="w-full h-4" />
          <AnimatedSkeleton className="w-5/6 h-4" />
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
          <AnimatedSkeleton className="w-16 h-4" />
          <AnimatedSkeleton className="w-20 h-4" />
        </div>
      </div>
    </div>
  )
}

// Loading Spinner Component
export function LoadingSpinner({ size = "sm", className }: { size?: "sm" | "md" | "lg", className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-current border-t-transparent",
      sizeClasses[size],
      className
    )} />
  )
}

// Page Loading Component
export function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" className="text-primary" />
        <div className="space-y-2 text-center">
          <AnimatedSkeleton className="w-32 h-4 mx-auto" />
          <AnimatedSkeleton className="w-48 h-3 mx-auto" />
        </div>
      </div>
    </div>
  )
}

// Add shimmer animation to global styles
export const shimmerAnimation = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
`
