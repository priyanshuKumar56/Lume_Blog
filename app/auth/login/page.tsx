// Login page
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/lib/api-client"
import { Aperture, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-8 animate-fade-up">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-200">
              <Aperture size={16} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">LUME</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome back</h1>
            <p className="text-zinc-500">Sign in to your account to continue writing.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">{error}</div>}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
                <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
              />
            </div>

            <Button type="submit" className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-500/20 transition-all hover:scale-[1.02]" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-sm text-center text-zinc-500 pt-2 bg-white">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-zinc-900 font-medium hover:underline inline-flex items-center gap-1 group">
                Create one now
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Feature Showcase (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-50 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-grid opacity-[0.4] pointer-events-none"></div>
        <div className="absolute inset-0 hero-gradient opacity-60 pointer-events-none"></div>

        <div className="relative z-10 max-w-lg text-center animate-fade-up delay-100">
          <div className="mb-8 relative mx-auto w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-900/5 rotate-3 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Abstract Art"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-left">
              <p className="text-white/80 text-xs uppercase tracking-wider font-medium mb-1">Featured Writer</p>
              <h3 className="text-white text-xl font-bold">"Lume changed how I publish."</h3>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Focus on your story.</h2>
          <p className="text-zinc-500 leading-relaxed">
            Join thousands of writers who rely on Lume for a clean, distraction-free publishing experience.
          </p>
        </div>
      </div>
    </div>
  )
}
