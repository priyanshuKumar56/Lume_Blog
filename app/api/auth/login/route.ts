// User login endpoint
import { type NextRequest, NextResponse } from "next/server"
import { LoginSchema } from "@/lib/validations"
import { comparePassword, setAuthCookies, generateAccessToken, generateRefreshToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    const sql = getDb()

    // Find user by email
    const users = await sql`SELECT id, password_hash, role, name FROM users WHERE email = ${email}`
    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const user = users[0]

    // Compare passwords
    const passwordMatch = await comparePassword(password, user.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: email,
      role: user.role,
      id: user.id
    })
    const refreshToken = generateRefreshToken(user.id)

    // Set cookies
    await setAuthCookies(accessToken, refreshToken)

    return NextResponse.json({
      user: {
        id: user.id,
        email: email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error("[v0] Login error:", error.message)
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 400 })
  }
}
