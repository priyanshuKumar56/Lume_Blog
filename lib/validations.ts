// Input validation schemas
import { z } from "zod"

export const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const UserProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  profile_image: z.string().url().optional(),
})

export const CategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
})

export const PostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  banner_image: z.string().url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  category_ids: z.array(z.string()).optional(),
  tag_ids: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(), // Array of tag names
  category: z.string().optional(), // Single category ID
})

export const CommentSchema = z.object({
  content: z.string().min(2, "Comment must be at least 2 characters"),
})
