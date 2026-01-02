// Individual blog post page
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { neon } from "@neondatabase/serverless"
import { CommentsSection } from "@/components/comments/comments-section"
import { LumeNavigation } from "@/components/landing/lume-navigation"
import { LumeFooter } from "@/components/landing/lume-footer"
import { RelatedPosts } from "@/components/blog/related-posts"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { ViewTracker } from "@/components/blog/view-tracker"
import { JsonLd } from "@/components/schema/json-ld"
import { TipTapContentRenderer } from "@/components/editor/tiptap-content-renderer"
import { buildArticleSchema, buildBreadcrumbSchema, extractTextFromContent, countWords } from "@/lib/schema-builders"
import type { PostContent } from "@/lib/content-types"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const sql = neon(process.env.DATABASE_URL!)

  const posts = await sql`
    SELECT 
      title, seo_description, seo_title, banner_image, published_at, canonical_url
    FROM posts 
    WHERE slug = ${slug} AND status = 'PUBLISHED'
  `

  if (!posts.length) return {}

  const post = posts[0]
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"

  return {
    title: post.seo_title || post.title,
    description: post.seo_description,
    metadataBase: new URL(appUrl),
    alternates: {
      canonical: post.canonical_url || `/blog/${slug}`,
    },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description,
      type: "article",
      url: `${appUrl}/blog/${slug}`,
      publishedTime: post.published_at,
      images: post.banner_image ? [`${appUrl}/images/${post.banner_image}`] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description,
      images: post.banner_image ? [`${appUrl}/images/${post.banner_image}`] : undefined,
    },
  }
}

async function getPost(slug: string) {
  const sql = neon(process.env.DATABASE_URL!)
  const posts = await sql`
    SELECT 
      p.*, u.id as author_id, u.name as author_name, u.bio, u.profile_image
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.slug = ${slug} AND p.status = 'PUBLISHED'
  `

  return posts[0] || null
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  let content: PostContent
  try {
    if (!post.content) {
      content = { blocks: [], version: "1.0" }
    } else if (typeof post.content === "string") {
      const trimmed = post.content.trim()
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        content = JSON.parse(trimmed)
      } else {
        content = {
          blocks: [{
            id: 'text-block',
            type: 'paragraph',
            content: post.content
          }],
          version: "1.0"
        }
      }
    } else {
      content = post.content
    }
  } catch (error) {
    console.error("Failed to parse post content:", error, "Content was:", post.content)
    content = { blocks: [], version: "1.0" }
  }
  const textContent = extractTextFromContent(content)
  const wordCount = countWords(textContent)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"
  const postUrl = `${appUrl}/blog/${slug}`

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.seo_description || post.excerpt,
    content: textContent,
    image: post.banner_image,
    author: {
      name: post.author_name,
      slug: post.author_name.toLowerCase().replace(/\s+/g, '-'),
    },
    publishedAt: new Date(post.published_at),
    updatedAt: post.updated_at ? new Date(post.updated_at) : undefined,
    url: postUrl,
    wordCount,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: appUrl },
    { name: "Blog", url: `${appUrl}/blog` },
    { name: post.title, url: postUrl },
  ])

  return (
    <div className="antialiased selection:bg-zinc-900 selection:text-white font-sans text-zinc-900 bg-white min-h-screen flex flex-col">
      <LumeNavigation />

      <main className="flex-1 pt-32 pb-24 relative">
        <article className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <Link href="/blog" className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Back to Blog
            </Link>

            <div className="flex items-center justify-center gap-4 text-xs font-medium text-zinc-500 mb-6 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.published_at).toLocaleDateString()}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {Math.ceil(wordCount / 200)} min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-3">
              {post.profile_image ? (
                <img src={post.profile_image} alt={post.author_name} className="w-10 h-10 rounded-full border border-zinc-100" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-500">
                  <User size={16} />
                </div>
              )}
              <div className="text-left">
                <div className="text-sm font-semibold text-zinc-900">{post.author_name}</div>
                <div className="text-xs text-zinc-500">Author</div>
              </div>
            </div>
          </div>

          {/* Banner */}
          {post.banner_image && (
            <div className="mb-16 -mx-6 md:-mx-12 lg:-mx-24 relative rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-zinc-100 aspect-[2/1]">
              <img
                src={post.banner_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content using Global Prose Styles */}
          <div className="prose prose-lg max-w-none">
            {typeof post.content === 'string' && post.content.includes('<') ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <TipTapContentRenderer content={content} />
            )}
          </div>

          {/* Footer of Article */}
          <div className="mt-24 pt-12 border-t border-zinc-100">
            <RelatedPosts postId={post.id} />
            <div className="mt-16">
              <CommentsSection postId={post.id} />
            </div>
          </div>
        </article>
      </main>

      <LumeFooter />

      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ViewTracker postId={post.id} />
    </div>
  )
}
