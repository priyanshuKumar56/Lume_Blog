interface JsonLdProps {
  schema: Record<string, any>
  type?: "article" | "author" | "organization" | "breadcrumb" | "faq"
}

export function JsonLd({ schema }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
