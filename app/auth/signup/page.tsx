// Signup page
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { register } from "@/lib/api-client"
import { Aperture, ArrowRight, Check } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
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
      await register(name, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-8 animate-fade-up">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-200">
              <Aperture size={16} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">LUME</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Create your account</h1>
            <p className="text-zinc-500">Start publishing your ideas to the world today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">{error}</div>}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-700">Full Name</label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
              />
            </div>

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
              <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
              />
              <p className="text-[10px] text-zinc-500">Must be at least 8 characters long.</p>
            </div>

            <Button type="submit" className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-500/20 transition-all hover:scale-[1.02] mt-2" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Get Started"}
            </Button>

            <p className="text-sm text-center text-zinc-500 bg-white">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-zinc-900 font-medium hover:underline inline-flex items-center gap-1 group">
                Sign in
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Feature Showcase (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-lg animate-fade-up delay-100">
          <div className="mb-12 relative mx-auto w-full max-w-md">
            {/* Abstract Card UI */}
            <div className="bg-zinc-800/50 backdrop-blur-xl border border-zinc-700 p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50 text-sm font-mono">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">writer</span> = <span className="text-orange-400">new</span> Writer();
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm font-mono pl-4">
                  writer.<span className="text-yellow-400">publish</span>(<span className="text-green-400">"My First Post"</span>);
                </div>
              </div>
            </div>
            {/* Floating Element */}
            <div className="absolute -right-8 -bottom-8 bg-white p-4 rounded-xl shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium">Status</p>
                  <p className="text-sm font-bold text-zinc-900">Published</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Code. Write. Ship.</h2>
            <p className="text-zinc-400 leading-relaxed text-lg">
              The essential toolkit for developers who blog. Syntax highlighting, Markdown support, and zero config.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
