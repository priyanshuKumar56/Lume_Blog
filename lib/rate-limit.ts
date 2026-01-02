interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

export function rateLimit(identifier: string, limit = 60, windowMs: number = 60 * 1000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (entry.count < limit) {
    entry.count++
    return true
  }

  return false
}

export function getRateLimitInfo(identifier: string) {
  const entry = rateLimitMap.get(identifier)
  if (!entry) return null

  const now = Date.now()
  const remaining = Math.max(0, 60 - entry.count)
  const resetTime = entry.resetTime

  return {
    limit: 60,
    remaining,
    reset: resetTime,
    retryAfter: Math.ceil((resetTime - now) / 1000),
  }
}
