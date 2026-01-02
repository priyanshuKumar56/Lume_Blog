// Blog post card component
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export interface PostCardProps {
  id: string
  title: string
  slug: string
  excerpt: string
  banner_image?: string
  published_at: string
  view_count: number
  author_name: string
  author_slug: string
}

export function PostCard({
  title,
  slug,
  excerpt,
  banner_image,
  published_at,
  view_count,
  author_name,
  author_slug,
}: PostCardProps) {
  return (
    <article className="group flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
      {banner_image && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={banner_image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 flex-1 px-4 pb-4">
        <Link href={`/blog/${slug}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">{title}</h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-auto">
          <Link href={`/author/${author_slug}`} className="hover:text-primary">
            {author_name}
          </Link>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(published_at), { addSuffix: true })}</span>
          <span>•</span>
          <span>{view_count} views</span>
        </div>
      </div>
    </article>
  )
}
