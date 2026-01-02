// Modern Dashboard Sidebar Component
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Layout,
  FileText,
  Settings,
  Image as ImageIcon,
  Tags,
  BarChart2,
  Plus,
  Bell,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Folder,
  PenLine
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  description?: string
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Layout,
        description: "Overview and stats"
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart2,
        description: "View statistics"
      }
    ]
  },
  {
    title: "Content",
    items: [
      {
        title: "Posts",
        href: "/dashboard/posts",
        icon: PenLine,
        description: "Manage your posts",
      },
      {
        title: "Media",
        href: "/dashboard/media",
        icon: ImageIcon,
        description: "Images and files"
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: Folder,
        description: "Organize content"
      },

    ]
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: Settings,
        description: "Your profile"
      }
    ]
  }
]

interface DashboardSidebarProps {
  className?: string
  isLoading?: boolean
}

export function DashboardSidebar({ className, isLoading = false }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (isLoading) {
    return <SidebarSkeleton isCollapsed={isCollapsed} />
  }

  return (
    <div className={cn(
      "flex flex-col h-full bg-zinc-50/50 border-r border-zinc-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-zinc-200/50 bg-white/50 backdrop-blur">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center text-white">
              <Layout size={12} />
            </div>
            <span className="text-xs font-semibold tracking-tight text-zinc-900">studio.lume</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("text-zinc-400 hover:text-zinc-900 ml-auto", isCollapsed ? "mx-auto" : "")}
        >
          {isCollapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-8 px-3">
          <div className="mb-6">
            <Link href="/dashboard/posts/new">
              <button className={cn(
                "w-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center gap-2 rounded-lg font-medium text-xs h-9",
                isCollapsed ? "px-0" : "px-3"
              )}>
                <Plus size={14} />
                {!isCollapsed && "New Post"}
              </button>
            </Link>
          </div>

          {sidebarSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "group flex items-center gap-2.5 px-3 py-2 rounded-md transition-all duration-200 text-xs font-medium",
                        isActive
                          ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
                          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
                      {!isCollapsed && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate">{item.title}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-zinc-100 text-zinc-600">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-14 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {item.title}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-200/50 bg-white/50 space-y-1">
        {!isCollapsed && (
          <>
            <Link href="/dashboard/notifications">
              <Button variant="ghost" className="w-full justify-start h-8 text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
                <Bell className="w-3.5 h-3.5 mr-2" />
                Notifications
              </Button>
            </Link>
            <Link href="/auth/logout">
              <Button variant="ghost" className="w-full justify-start h-8 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="w-3.5 h-3.5 mr-2" />
                Logout
              </Button>
            </Link>
          </>
        )}
        {isCollapsed && (
          <div className="flex flex-col gap-1 items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900">
              <Bell size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50">
              <LogOut size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Sidebar Skeleton Component
function SidebarSkeleton({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={cn(
      "flex flex-col h-full bg-zinc-50/50 border-r border-zinc-200",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header Skeleton */}
      <div className="h-16 flex items-center px-4 border-b border-zinc-200/50">
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>

      {/* Navigation Skeleton */}
      <div className="flex-1 py-6 px-3 space-y-6">
        <Skeleton className="w-full h-9 rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-16 h-3 opacity-50 mb-2" />
            <Skeleton className="w-full h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
