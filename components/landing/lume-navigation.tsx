"use client"

import Link from "next/link"
import { Aperture } from "lucide-react"

export function LumeNavigation() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 glass-nav transition-all duration-300 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-200">
                        <Aperture size={16} />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-zinc-900">LUME</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-500">
                    <Link href="/#features" className="hover:text-zinc-900 transition-colors">Features</Link>
                    <Link href="/#showcase" className="hover:text-zinc-900 transition-colors">Showcase</Link>
                    <Link href="/#pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
                    <Link href="/blog" className="text-zinc-900 transition-colors">Blog</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/auth/login" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">Sign in</Link>
                    <Link href="/auth/signup">
                        <button className="bg-zinc-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-zinc-800 transition-all hover:scale-105 shadow-lg shadow-zinc-500/20">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
