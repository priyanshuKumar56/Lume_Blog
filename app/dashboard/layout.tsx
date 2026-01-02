import type React from "react"
// Dashboard layout wrapper

export const metadata = {
  title: "Dashboard | Blog Platform",
  description: "Manage your blog posts and profile",
}

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
