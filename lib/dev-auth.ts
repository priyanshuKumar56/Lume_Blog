// Development authentication helper
import { JWTPayload } from "./auth"

// Development user for testing without proper authentication
export function getDevelopmentUser(): JWTPayload {
  return {
    id: "550e8400-e29b-41d4-a716-446655440000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    email: "author@test.com",
    role: "AUTHOR"
  }
}

// Check if we're in development mode and bypass authentication
export function shouldBypassAuth(): boolean {
  return process.env.NODE_ENV === "development" || !process.env.JWT_SECRET
}
