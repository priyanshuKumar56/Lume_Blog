import type { Metadata } from "next"

export interface SEOMetadata {
  title: string
  description: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterCreator?: string
  keywords?: string[]
  author?: string
  publishedAt?: Date
  updatedAt?: Date
}

export function generateMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(", "),
    authors: seo.author ? [{ name: seo.author }] : undefined,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      type: (seo.ogType as any) || "article",
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      publishedTime: seo.publishedAt?.toISOString(),
      modifiedTime: seo.updatedAt?.toISOString(),
    },
    twitter: {
      card: (seo.twitterCard as any) || "summary_large_image",
      creator: seo.twitterCreator,
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  }
}

export function generateArticleSchema(data: {
  title: string
  description: string
  image?: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  url: string
  content?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.title,
    description: data.description,
    image: data.image,
    author: {
      "@type": "Person",
      name: data.author,
    },
    datePublished: data.publishedAt.toISOString(),
    dateModified: data.updatedAt?.toISOString() || data.publishedAt.toISOString(),
    articleBody: data.content,
    url: data.url,
  }
}

export function generateAuthorSchema(data: { name: string; bio?: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    description: data.bio,
    url: data.url,
  }
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
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

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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
