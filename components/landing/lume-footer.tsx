"use client"

import { Aperture, Github, Linkedin, Twitter } from "lucide-react"

export function LumeFooter() {
    return (
        <footer className="border-t border-zinc-200 py-16 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center text-white">
                            <Aperture size={14} />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-zinc-900">LUME</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                        Empowering the next generation of writers, thinkers, and creators with tools that vanish so your ideas can shine.
                    </p>
                    <div className="flex gap-4 text-zinc-400">
                        <Twitter className="hover:text-zinc-900 cursor-pointer transition-colors" size={18} />
                        <Github className="hover:text-zinc-900 cursor-pointer transition-colors" size={18} />
                        <Linkedin className="hover:text-zinc-900 cursor-pointer transition-colors" size={18} />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full md:w-auto">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Product</span>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Features</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Themes</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Pricing</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Changelog</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Resources</span>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Documentation</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">API</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Community</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Help Center</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Company</span>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">About</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Blog</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Careers</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Legal</span>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Privacy</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Terms</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-400">© 2024 Lume Inc. All rights reserved.</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-zinc-500">Systems Operational</span>
                </div>
            </div>
        </footer>
    )
}
