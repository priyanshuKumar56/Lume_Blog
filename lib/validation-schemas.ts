import { z } from "zod"

// Auth schemas
export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Post schemas
export const createPostSchema = z.object({
  title: z.string().min(5).max(200),
  excerpt: z.string().min(10).max(300),
  content: z.any(), // PostContent
  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
  banner_image_id: z.string().uuid().optional(),
  category_ids: z.array(z.string().uuid()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
})

export const updatePostSchema = createPostSchema.partial()

// Comment schemas
export const createCommentSchema = z.object({
  post_id: z.string().uuid(),
  content: z.string().min(1).max(2000),
  parent_id: z.string().uuid().optional(),
})

// User profile schema
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  profile_image: z.string().url().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
