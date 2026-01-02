import type { ContentBlock } from "@/lib/content-types"

interface BlockRendererProps {
  block: ContentBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-base leading-7 mb-4">{block.content}</p>

    case "heading1":
      return <h1 className="text-4xl font-bold mb-6 mt-8">{block.content}</h1>
    case "heading2":
      return <h2 className="text-3xl font-bold mb-4 mt-6">{block.content}</h2>
    case "heading3":
      return <h3 className="text-2xl font-bold mb-3 mt-5">{block.content}</h3>
    case "heading4":
      return <h4 className="text-xl font-bold mb-2 mt-4">{block.content}</h4>
    case "heading5":
      return <h5 className="text-lg font-bold mb-2 mt-3">{block.content}</h5>
    case "heading6":
      return <h6 className="text-base font-bold mb-2 mt-2">{block.content}</h6>

    case "bulleted-list":
      return (
        <ul className="list-disc list-inside mb-4 space-y-1">
          {block.content.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case "numbered-list":
      return (
        <ol className="list-decimal list-inside mb-4 space-y-1">
          {block.content.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
          {block.content}
        </blockquote>
      )

    case "code":
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
          <code className="font-mono text-sm">{block.content}</code>
        </pre>
      )

    case "image":
      return (
        <figure className="my-6">
          <img
            src={block.metadata?.imageUrl || "/placeholder.svg"}
            alt={block.metadata?.altText || "Blog image"}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {block.metadata?.caption && (
            <figcaption className="text-sm text-muted-foreground text-center mt-2">{block.metadata.caption}</figcaption>
          )}
        </figure>
      )

    case "video":
      return (
        <div className="my-6 aspect-video rounded-lg overflow-hidden bg-muted">
          <iframe
            src={block.metadata?.videoUrl}
            title="Embedded video"
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )

    case "table":
      const rows = block.metadata?.rows || []
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-border">
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i === 0 ? "bg-muted" : ""}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-border px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return null
  }
}
