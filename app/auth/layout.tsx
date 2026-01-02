import type React from "react"
// Auth layout
export const metadata = {
  title: "Auth",
  description: "Authentication",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
