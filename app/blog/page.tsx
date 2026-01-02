import type { Metadata } from "next"
import { getDb } from "@/lib/db"
import { LumeNavigation } from "@/components/landing/lume-navigation"
import { LumeFooter } from "@/components/landing/lume-footer"
import { BlogGrid } from "@/components/blog/blog-grid"

export const metadata: Metadata = {
    title: "Blog | Explore Amazing Stories",
    description: "Discover insights, tutorials, and stories from our community of writers.",
}

async function getPublishedPosts() {
    const sql = getDb()
    try {
        const posts = await sql`
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.banner_image,
        p.published_at, p.view_count, p.status, p.created_at,
        (
          SELECT c.name 
          FROM categories c 
          JOIN post_categories pc ON pc.category_id = c.id 
          WHERE pc.post_id = p.id 
          LIMIT 1
        ) as category,
        COALESCE(u.name, 'Anonymous') as author_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.status = 'PUBLISHED'
      ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC
    `
        // Serialize dates for client component
        return posts.map((post: any) => ({
            ...post,
            published_at: post.published_at ? new Date(post.published_at).toISOString() : new Date(post.created_at).toISOString(),
            created_at: new Date(post.created_at).toISOString()
        }))
    } catch (error) {
        console.error("Failed to fetch posts:", error)
        return []
    }
}

export default async function BlogPage() {
    const posts = await getPublishedPosts()

    return (
        <div className="antialiased selection:bg-zinc-900 selection:text-white font-sans text-zinc-900 bg-white min-h-screen flex flex-col">
            <LumeNavigation />

            <main className="flex-1 pt-32 pb-24 relative">
                <div className="absolute inset-0 hero-gradient pointer-events-none opacity-50 h-[800px]"></div>
                <div className="absolute inset-0 bg-grid pointer-events-none -z-10 h-[800px] opacity-40"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 hover:border-zinc-300 transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs font-medium text-zinc-600">Community & Stories</span>
                        </div>

                        <h1 className="animate-fade-up delay-100 text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-zinc-900 mb-8 leading-[1.1]">
                            Explore ideas that <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 animate-shimmer bg-[length:200%_100%]">inspire and educate.</span>
                        </h1>

                        <p className="animate-fade-up delay-200 text-lg md:text-xl text-zinc-500 font-normal leading-relaxed">
                            A collection of thoughts, tutorials, and insights from creators around the world.
                        </p>
                    </div>

                    <div className="animate-fade-up delay-300">
                        <BlogGrid initialPosts={posts} />
                    </div>
                </div>
            </main>

            <LumeFooter />
        </div>
    )
}
