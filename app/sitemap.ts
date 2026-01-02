import type { MetadataRoute } from "next"
import { neon } from "@neondatabase/serverless"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const posts = await sql`SELECT slug, published_at, updated_at FROM posts WHERE status = 'PUBLISHED' ORDER BY published_at DESC LIMIT 50000`
    const categories = await sql`SELECT slug FROM categories LIMIT 1000`
    const authors = await sql`SELECT DISTINCT users.slug FROM users INNER JOIN posts ON posts.author_id = users.id WHERE posts.status = 'PUBLISHED'`

    const entries: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/categories`,
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ]

    // Add posts
    entries.push(
      ...posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    )

    // Add categories
    entries.push(
      ...categories.map((cat: any) => ({
        url: `${baseUrl}/blog/category/${cat.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    )

    // Add author pages
    entries.push(
      ...authors.map((author: any) => ({
        url: `${baseUrl}/blog/author/${author.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    )

    return entries
  } catch {
    return []
  }
}
