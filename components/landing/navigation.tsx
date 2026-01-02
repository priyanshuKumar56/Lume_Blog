"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          <Link href="/">BlogHub</Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <motion.div whileHover={{ color: "#3b82f6" }} className="text-sm cursor-pointer">
            <Link href="/blog">Browse</Link>
          </motion.div>
          <motion.div whileHover={{ color: "#3b82f6" }} className="text-sm cursor-pointer">
            <Link href="/categories">Categories</Link>
          </motion.div>
          <motion.div whileHover={{ color: "#3b82f6" }} className="text-sm cursor-pointer">
            <Link href="/about">About</Link>
          </motion.div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border p-4 space-y-4"
        >
          <Link href="/blog" className="block text-sm hover:text-blue-600">
            Browse
          </Link>
          <Link href="/categories" className="block text-sm hover:text-blue-600">
            Categories
          </Link>
          <Link href="/about" className="block text-sm hover:text-blue-600">
            About
          </Link>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
