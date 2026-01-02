// Admin layout
import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Admin Panel | Blog Platform",
  description: "Manage blog platform",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-bold text-primary">
            Admin Panel
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Admin Nav */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
          <Button asChild variant="ghost">
            <Link href="/admin">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admin/users">Users</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admin/posts">Posts</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admin/categories">Categories</Link>
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-8">{children}</main>
    </div>
  )
}
