// Modern Dashboard Layout Component
"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/modern-sidebar"
import { PageLoading } from "@/components/ui/enhanced-loading"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  isLoading?: boolean
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
  isLoading = false
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarLoading, setIsSidebarLoading] = useState(true)

  // Simulate sidebar loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSidebarLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:transform-none shadow-xl lg:shadow-none",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <DashboardSidebar isLoading={isSidebarLoading} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-zinc-500 hover:text-zinc-900"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>

              {/* Page Title */}
              <div className="hidden lg:block">
                {title && (
                  <div>
                    <h1 className="text-sm font-semibold text-zinc-900">{title}</h1>
                    {subtitle && (
                      <p className="text-xs text-zinc-500">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-zinc-300 transition-colors">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-xs w-48 lg:w-64 placeholder:text-zinc-400"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="h-8 w-8 relative text-zinc-400 hover:text-zinc-900">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-white" />
              </Button>

              {/* Actions */}
              {actions && <div className="hidden lg:block pl-4 border-l border-zinc-200">{actions}</div>}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50/30">
          {/* Mobile Page Title */}
          {(title || subtitle) && (
            <div className="lg:hidden px-4 py-6 border-b border-zinc-100 bg-white">
              {title && <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>}
              {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
              {actions && <div className="mt-4">{actions}</div>}
            </div>
          )}

          {/* Page Content Area */}
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
