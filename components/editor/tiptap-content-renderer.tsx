// Enhanced Content Renderer for Blog Posts - TipTap Compatible
interface TipTapContentProps {
  content: any
  className?: string
}

export function TipTapContentRenderer({ content, className = "" }: TipTapContentProps) {
  if (!content) {
    return <p className={className}>No content available</p>
  }

  // If content is a string, try to parse it as JSON first
  let contentObj = content
  if (typeof content === "string") {
    try {
      contentObj = JSON.parse(content)
    } catch {
      // If it's not valid JSON, treat as plain HTML/text
      return <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`} dangerouslySetInnerHTML={{ __html: content }} />
    }
  }

  // Handle blocks format (your current data structure)
  if (contentObj.blocks && Array.isArray(contentObj.blocks)) {
    try {
      // Enhanced blocks to HTML conversion
      let html = ""
      for (const block of contentObj.blocks) {
        html += renderBlock(block)
      }
      
      return (
        <div 
          className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    } catch (error) {
      console.error("Blocks HTML generation error:", error)
      return <div className={className}>Error rendering content</div>
    }
  }

  // If it's TipTap JSON structure with content array
  if (contentObj.content && Array.isArray(contentObj.content)) {
    try {
      // Enhanced TipTap to HTML conversion with better styling
      let html = ""
      for (const node of contentObj.content) {
        html += renderTipTapNode(node)
      }
      
      return (
        <div 
          className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    } catch (error) {
      console.error("TipTap HTML generation error:", error)
      return <div className={className}>Error rendering content</div>
    }
  }

  // Fallback for other content structures
  if (typeof contentObj === "object") {
    const text = contentObj.text || JSON.stringify(contentObj)
    return <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>{text}</div>
  }

  // Final fallback
  return <div className={className}>Invalid content format</div>
}

// Enhanced block renderer for your current data structure
function renderBlock(block: any): string {
  if (!block || typeof block !== "object") {
    return ""
  }

  switch (block.type) {
    case "paragraph":
      // If content contains HTML, render it directly
      if (typeof block.content === "string" && block.content.includes("<")) {
        return `<p class="mb-4 leading-7">${block.content}</p>`
      }
      // Otherwise treat as plain text
      return `<p class="mb-4 leading-7">${escapeHtml(block.content || "")}</p>`
      
    case "heading":
      // Extract heading level from content or use default
      let level = 1
      if (typeof block.content === "string") {
        const match = block.content.match(/<h(\d)/)
        if (match) level = parseInt(match[1])
      }
      const headingClass = getHeadingClass(level)
      return `<${headingClass} class="${getHeadingStyles(level)}">${block.content}</${headingClass}>`
      
    case "bulletList":
      return `<ul class="list-disc list-inside mb-4 space-y-1">${block.content}</ul>`
      
    case "numberedList":
      return `<ol class="list-decimal list-inside mb-4 space-y-1">${block.content}</ol>`
      
    case "listItem":
      return `<li class="mb-1">${block.content}</li>`
      
    case "blockquote":
      return `<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/50 p-4 rounded-r-lg">${block.content}</blockquote>`
      
    case "code":
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border border-border"><code class="font-mono text-sm">${escapeHtml(block.content || "")}</code></pre>`
      
    case "image":
      return `
        <figure class="my-6">
          <img 
            src="${block.src || "/placeholder.svg"}" 
            alt="${block.alt || "Image"}"
            class="w-full rounded-lg shadow-md"
            loading="lazy"
          />
          ${block.caption ? `<figcaption class="text-sm text-muted-foreground text-center mt-2">${block.caption}</figcaption>` : ""}
        </figure>
      `
      
    default:
      return escapeHtml(block.content || "")
  }
}

// Enhanced TipTap node renderer with better styling
function renderTipTapNode(node: any): string {
  if (!node || typeof node !== "object") {
    return ""
  }

  switch (node.type) {
    case "text":
      return escapeHtml(node.text || "")
      
    case "paragraph":
      return `<p class="mb-4 leading-7">${renderNodeContent(node.content || [])}</p>`
      
    case "heading":
      const level = node.attrs?.level || 1
      const headingClass = getHeadingClass(level)
      return `<${headingClass} class="${getHeadingStyles(level)}">${renderNodeContent(node.content || [])}</${headingClass}>`
      
    case "bulletList":
      return `<ul class="list-disc list-inside mb-4 space-y-1">${renderNodeContent(node.content || [])}</ul>`
      
    case "orderedList":
      return `<ol class="list-decimal list-inside mb-4 space-y-1">${renderNodeContent(node.content || [])}</ol>`
      
    case "listItem":
      return `<li class="mb-1">${renderNodeContent(node.content || [])}</li>`
      
    case "blockquote":
      return `<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/50 p-4 rounded-r-lg">${renderNodeContent(node.content || [])}</blockquote>`
      
    case "codeBlock":
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border border-border"><code class="font-mono text-sm">${escapeHtml(node.content || "")}</code></pre>`
      
    case "code":
      return `<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">${escapeHtml(node.text || "")}</code>`
      
    case "bold":
      return `<strong class="font-semibold">${renderNodeContent(node.content || [])}</strong>`
      
    case "italic":
      return `<em class="italic">${renderNodeContent(node.content || [])}</em>`
      
    case "underline":
      return `<u class="underline">${renderNodeContent(node.content || [])}</u>`
      
    case "strike":
      return `<s class="line-through">${renderNodeContent(node.content || [])}</s>`
      
    case "hardBreak":
      return "<br>"
      
    case "horizontalRule":
      return "<hr class=\"my-6 border-border\">"
      
    case "image":
      const src = node.attrs?.src || "/placeholder.svg"
      const alt = node.attrs?.alt || "Image"
      const title = node.attrs?.title || ""
      return `
        <figure class="my-6">
          <img 
            src="${src}" 
            alt="${alt}" 
            title="${title}"
            class="w-full rounded-lg shadow-md"
            loading="lazy"
          />
          ${title ? `<figcaption class="text-sm text-muted-foreground text-center mt-2">${title}</figcaption>` : ""}
        </figure>
      `
      
    case "link":
      const href = node.attrs?.href || "#"
      const target = node.attrs?.target || "_self"
      return `<a href="${href}" target="${target}" class="text-primary hover:underline font-medium">${renderNodeContent(node.content || [])}</a>`
      
    case "table":
      const rows = node.content || []
      return `
        <div class="overflow-x-auto my-6 border border-border rounded-lg">
          <table class="w-full border-collapse border border-border">
            <tbody>
              ${rows.map((row: any) => `
                <tr class="${row === rows[0] ? "bg-muted" : ""}">
                  ${(row.content || []).map((cell: any) => `
                    <td class="border border-border px-4 py-2">${cell}</td>
                  `).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `
      
    default:
      return renderNodeContent(node.content || [])
  }
}

// Helper function to render nested content
function renderNodeContent(content: any[]): string {
  if (!Array.isArray(content)) return ""
  
  return content.map(node => renderTipTapNode(node)).join("")
}

// Helper function to get heading tag
function getHeadingClass(level: number): string {
  const tags = ["h1", "h2", "h3", "h4", "h5", "h6"]
  return tags[Math.min(level - 1, 5)] || "h1"
}

// Helper function to get heading styles
function getHeadingStyles(level: number): string {
  const styles = [
    "text-4xl font-bold mb-6 mt-8",      // h1
    "text-3xl font-bold mb-4 mt-6",      // h2  
    "text-2xl font-bold mb-3 mt-5",      // h3
    "text-xl font-bold mb-2 mt-4",       // h4
    "text-lg font-bold mb-2 mt-3",        // h5
    "text-base font-bold mb-2 mt-2"        // h6
  ]
  return styles[Math.min(level - 1, 5)] || styles[0]
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
