export interface ImageSEO {
  url: string
  altText: string
  title?: string
  caption?: string
  width?: number
  height?: number
  format?: "webp" | "avif" | "jpg" | "png"
  focalPoint?: { x: number; y: number }
}

export function generateCloudinaryUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: string
    quality?: string
    format?: string
  } = {},
): string {
  const baseUrl = "https://res.cloudinary.com"
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo"
  const transformations: string[] = []

  if (options.width || options.height) {
    transformations.push(`w_${options.width || "auto"},h_${options.height || "auto"}`)
  }

  if (options.crop) {
    transformations.push(`c_${options.crop}`)
  }

  if (options.quality) {
    transformations.push(`q_${options.quality}`)
  }

  if (options.format) {
    transformations.push(`f_${options.format}`)
  }

  // Auto WebP/AVIF for modern browsers
  transformations.push("f_auto")

  const transformString = transformations.length > 0 ? `/${transformations.join(",")}` : ""
  return `${baseUrl}/${cloudName}/image/upload${transformString}/v1/${publicId}`
}

export function generateResponsiveImageSrcSet(publicId: string, maxWidth = 1200): string {
  const widths = [320, 640, 960, 1280, 1920]
  return widths
    .filter((w) => w <= maxWidth)
    .map((w) => `${generateCloudinaryUrl(publicId, { width: w, quality: "auto" })} ${w}w`)
    .join(", ")
}

export function calculateImageCLS(naturalWidth: number, naturalHeight: number, displayWidth: number): number {
  const aspectRatio = naturalWidth / naturalHeight
  return displayWidth / aspectRatio
}

// Validate SEO fields
export function validateImageSEO(image: ImageSEO): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!image.url) errors.push("Image URL is required")
  if (!image.altText || image.altText.length < 5) errors.push("Alt text is required (min 5 characters)")
  if (image.altText && image.altText.length > 125) errors.push("Alt text too long (max 125 characters)")

  return {
    valid: errors.length === 0,
    errors,
  }
}
