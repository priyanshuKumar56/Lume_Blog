// Token refresh endpoint
import { type NextRequest, NextResponse } from "next/server"
import {
  getRefreshTokenFromCookies,
  verifyRefreshToken,
  setAuthCookies,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const refreshToken = await getRefreshTokenFromCookies()
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 })
    }

    const payload = verifyRefreshToken(refreshToken)
    if (!payload) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
    }

    const sql = getDb()
    const users = await sql`SELECT id, email, role FROM users WHERE id = ${payload.userId}`
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const user = users[0]

    // Generate new tokens
    const newAccessToken = generateAccessToken({
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
    })
    const newRefreshToken = generateRefreshToken(user.id)

    // Set cookies
    await setAuthCookies(newAccessToken, newRefreshToken)

    return NextResponse.json({ message: "Token refreshed" })
  } catch (error) {
    return NextResponse.json({ error: "Token refresh failed" }, { status: 400 })
  }
}
