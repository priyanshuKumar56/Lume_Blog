// User logout endpoint
import { type NextRequest, NextResponse } from "next/server"
import { clearAuthCookies } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await clearAuthCookies()
    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 400 })
  }
}
