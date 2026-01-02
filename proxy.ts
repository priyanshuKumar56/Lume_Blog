// Authentication and request middleware
import { type NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/dashboard", "/admin"]
const publicRoutes = ["/auth/login", "/auth/signup"]

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get("accessToken")?.value

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Allow the request to pass through - full JWT verification happens in API routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}
