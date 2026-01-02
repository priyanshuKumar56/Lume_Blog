// JWT authentication utilities
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key"

export interface JWTPayload {
  id: string
  userId: string
  email: string
  role: "ADMIN" | "EDITOR" | "AUTHOR" | "READER"
}

// Generate access token (short-lived)
export function generateAccessToken(payload: JWTPayload): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set")
  }
  return jwt.sign(payload, secret, { expiresIn: "15m" })
}

// Generate refresh token (long-lived)
export function generateRefreshToken(userId: string): string {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET environment variable is not set")
  }
  return jwt.sign({ userId }, secret, { expiresIn: "7d" })
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      return null
    }
    return jwt.verify(token, secret) as JWTPayload
  } catch (error) {
    return null
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    const secret = process.env.JWT_REFRESH_SECRET
    if (!secret) {
      return null
    }
    return jwt.verify(token, secret) as { userId: string }
  } catch (error) {
    return null
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Get token from cookies
export async function getTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value
}

// Get refresh token from cookies
export async function getRefreshTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get("refreshToken")?.value
}

// Set auth cookies
export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60, // 15 minutes
  })
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

// Clear auth cookies
export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
}

// Validate token for API route authorization
export async function validateToken(authHeader?: string | null): Promise<JWTPayload | null> {
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)
    return verifyAccessToken(token)
  } catch {
    return null
  }
}
