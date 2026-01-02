// Update blog post
import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyAccessToken } from "@/lib/auth"
import { PostSchema } from "@/lib/validations"
import { getDb } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = await getTokenFromCookies()
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const sql = getDb()

    // Verify ownership
    const posts = await sql`SELECT author_id FROM posts WHERE id = ${id}`
    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (posts[0].author_id !== payload.userId && payload.role !== "ADMIN" && payload.role !== "EDITOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = PostSchema.parse(body)

    // Update post
    const result = await sql`
      UPDATE posts SET 
        title = ${validatedData.title}, 
        slug = ${validatedData.slug}, 
        excerpt = ${validatedData.excerpt}, 
        content = ${JSON.stringify(validatedData.content)}, 
        banner_image = ${validatedData.banner_image}, 
        status = ${validatedData.status}, 
        seo_title = ${validatedData.seo_title}, 
        seo_description = ${validatedData.seo_description}, 
        updated_at = NOW(),
        published_at = CASE WHEN ${validatedData.status} = 'PUBLISHED' THEN COALESCE(published_at, NOW()) ELSE published_at END
      WHERE id = ${id}
      RETURNING *
    `

    const post = result[0]

    // Update categories
    // If 'category' (single ID) is provided, use it. 
    // If 'category_ids' is provided, use that.
    // Prioritize 'category' if both (since form uses single select)
    let categoryIdsToSave: string[] = []
    if (validatedData.category) {
        categoryIdsToSave = [validatedData.category]
    } else if (validatedData.category_ids) {
        categoryIdsToSave = validatedData.category_ids
    }

    if (categoryIdsToSave.length > 0) {
      await sql`DELETE FROM post_categories WHERE post_id = ${id}`
      for (const categoryId of categoryIdsToSave) {
        // Simple check if uuid to avoid crashing
        if (categoryId.length > 10) { 
             await sql`INSERT INTO post_categories (post_id, category_id) VALUES (${id}, ${categoryId})`
        }
      }
    }

    // Update tags
    // Support 'tags' (names) mainly. 
    if (validatedData.tags) {
      await sql`DELETE FROM post_tags WHERE post_id = ${id}`
      
      for (const tagName of validatedData.tags) {
        const slug = tagName.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        
        // Find or create tag
        let tagRows = await sql`SELECT id FROM tags WHERE slug = ${slug}`
        let tagId
        
        if (tagRows.length > 0) {
            tagId = tagRows[0].id
        } else {
            const newTag = await sql`
                INSERT INTO tags (name, slug) 
                VALUES (${tagName}, ${slug}) 
                RETURNING id
            `
            tagId = newTag[0].id
        }
        
        await sql`INSERT INTO post_tags (post_id, tag_id) VALUES (${id}, ${tagId})`
      }
    } else if (validatedData.tag_ids) {
        // Fallback to IDs if provided
        await sql`DELETE FROM post_tags WHERE post_id = ${id}`
        for (const tagId of validatedData.tag_ids) {
             await sql`INSERT INTO post_tags (post_id, tag_id) VALUES (${id}, ${tagId})`
        }
    }

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("[v0] Post update error:", error.message)
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 400 })
  }
}
