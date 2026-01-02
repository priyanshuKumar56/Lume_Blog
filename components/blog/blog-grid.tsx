"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight, User } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  banner_image?: string
  published_at: string
  view_count: number
  author_name: string
  category?: string
}

interface BlogGridProps {
  initialPosts: BlogPost[]
}

export function BlogGrid({ initialPosts }: BlogGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = initialPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-16">
      {/* Search Section */}
      <div className="relative max-w-xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-full text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 shadow-sm transition-all"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 mb-6 relative">
                {post.banner_image ? (
                  <img
                    src={post.banner_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-300">
                    <span className="text-4xl font-light">Aa</span>
                  </div>
                )}
                {post.category && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-zinc-900 border border-zinc-200">
                    {post.category}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 border border-zinc-200">
                      <User size={12} />
                    </div>
                    <span className="font-medium text-zinc-700">{post.author_name}</span>
                  </div>
                  <span className="w-0.5 h-0.5 rounded-full bg-zinc-300"></span>
                  <time>{new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>

                <h3 className="text-xl font-semibold text-zinc-900 mb-3 leading-tight group-hover:text-zinc-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-xs font-semibold text-zinc-900 mt-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Read Article <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300">
              <Search size={24} />
            </div>
            <h3 className="text-zinc-900 font-medium mb-1">No articles found</h3>
            <p className="text-sm text-zinc-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
