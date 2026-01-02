import type { PostContent } from "@/lib/content-types"

export interface PostSchemaData {
  title: string
  description: string
  content: string
  image?: string
  author: {
    name: string
    slug: string
  }
  publishedAt: Date
  updatedAt?: Date
  url: string
  wordCount: number
}

export function buildArticleSchema(data: PostSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.title,
    description: data.description,
    image: data.image,
    datePublished: data.publishedAt.toISOString(),
    dateModified: data.updatedAt?.toISOString() || data.publishedAt.toISOString(),
    author: {
      "@type": "Person",
      name: data.author.name,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/author/${data.author.slug}`,
    },
    articleBody: data.content,
    wordCount: data.wordCount,
    url: data.url,
  }
}

export function buildAuthorSchema(data: {
  name: string
  bio?: string
  image?: string
  slug: string
  postCount: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    description: data.bio,
    image: data.image,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/author/${data.slug}`,
    jobTitle: "Writer",
    publishingPrinciples: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
  }
}

export function buildBreadcrumbSchema(
  breadcrumbs: Array<{
    name: string
    url: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blog Platform",
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    sameAs: ["https://twitter.com/yourblog", "https://linkedin.com/company/yourblog", "https://github.com/yourblog"],
    description: "A production-grade blogging platform with SEO optimization",
  }
}

export function buildFAQSchema(
  faqs: Array<{
    question: string
    answer: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildCollectionPageSchema(data: {
  name: string
  description: string
  url: string
  itemCount: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: data.name,
    description: data.description,
    url: data.url,
    numberOfItems: data.itemCount,
  }
}

export function extractTextFromContent(content: PostContent | any): string {
  // Handle both TipTap content and legacy content format
  const contentArray = content.content || content.blocks || []
  
  if (Array.isArray(contentArray)) {
    return contentArray
      .filter((block: any) => !["image", "video", "table"].includes(block.type))
      .map((block: any) => {
        if (block.type === "text") {
          return block.text || ""
        } else if (block.type === "paragraph") {
          return renderNodeText(block.content || [])
        } else if (block.type === "heading") {
          return renderNodeText(block.content || [])
        }
        return ""
      })
      .join(" ")
      .substring(0, 5000)
  }
  
  // Fallback for legacy format
  return content.blocks
    .filter((block: any) => !["image", "video", "table"].includes(block.type))
    .map((block: any) => block.content)
    .join(" ")
    .substring(0, 5000)
}

// Helper function to render text from nested content
function renderNodeText(content: any[]): string {
  if (!Array.isArray(content)) return ""
  
  return content.map((node: any) => {
    if (node.type === "text") {
      return node.text || ""
    }
    return ""
  }).join("")
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).length
}
