// User registration endpoint
import { type NextRequest, NextResponse } from "next/server"
import { SignUpSchema } from "@/lib/validations"
import { hashPassword, setAuthCookies, generateAccessToken, generateRefreshToken } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = SignUpSchema.parse(body)

    const sql = getDb()

    // Check if user already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const result = await sql`
      INSERT INTO users (name, email, password_hash, role) 
      VALUES (${name}, ${email}, ${passwordHash}, ${"READER"}) 
      RETURNING id, email, role, name
    `

    const user = result[0]

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      id: user.id
    })
    const refreshToken = generateRefreshToken(user.id)

    // Set cookies
    await setAuthCookies(accessToken, refreshToken)

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Registration error:", error.message)
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 400 })
  }
}
