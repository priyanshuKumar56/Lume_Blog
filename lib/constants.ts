// Application constants
export const APP_NAME = "Blog Platform"
export const APP_DESCRIPTION = "A production-ready blogging platform with SEO optimization"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const ROLES = {
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  AUTHOR: "AUTHOR",
  READER: "READER",
}

export const POST_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
}

export const COMMENT_STATUS = {
  PUBLISHED: "PUBLISHED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
}

export const PAGINATION_LIMIT = 10
