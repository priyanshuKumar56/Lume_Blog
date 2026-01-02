"use client"

import Link from "next/link"
import {
  Aperture,
  ArrowRight,
  Layout,
  PenLine,
  Image as ImageIcon,
  BarChart2,
  Settings,
  Bold,
  Italic,
  Link as LinkIcon,
  Code,
  Hexagon,
  Triangle,
  Command,
  Figma,
  Layers,
  Search,
  CheckCircle,
  Globe,
  Sparkles,
  FileText, // For Markdown
  Zap,
  User,
  Building2,
  Code2,
  TrendingUp,
  Check,
  Twitter,
  Github,
  Linkedin
} from "lucide-react"

export default function LumeLandingPage() {
  return (
    <div className="antialiased selection:bg-zinc-900 selection:text-white font-sans text-zinc-900 bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-200">
              <Aperture size={16} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">LUME</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-500">
            <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-zinc-900 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Resources</a>
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

      {/* Hero Section */}
      <main className="relative pt-32 pb-24 overflow-hidden flex-1">
        <div className="absolute inset-0 hero-gradient pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 cursor-pointer hover:border-zinc-300 transition-all group">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">New: SEO Autopilot is live</span>
            <ArrowRight size={12} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-zinc-900 mb-8 leading-[1.1] md:leading-[1]">
            Create, Publish, and<br className="hidden md:block" />
            Scale Your Blog — <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 animate-shimmer bg-[length:200%_100%]">Effortlessly.</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            The modern publishing platform for creators and teams. Blazing fast performance, built-in SEO tools, and a distraction-free writing experience.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/auth/signup">
              <button className="w-full sm:w-auto bg-zinc-900 text-white h-12 px-8 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10 hover:shadow-2xl hover:shadow-zinc-900/20 flex items-center justify-center gap-2 group">
                Start Writing Free
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/blog">
              <button className="w-full sm:w-auto bg-white border border-zinc-200 text-zinc-600 h-12 px-8 rounded-full text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm flex items-center justify-center gap-2">
                View Demo Blog
              </button>
            </Link>
          </div>

          {/* Enhanced Dashboard Visualization (Blog Editor) */}
          <div className="animate-fade-up delay-400 relative max-w-5xl mx-auto perspective-1000">
            <div className="rounded-xl border border-zinc-200 bg-white shadow-2xl shadow-indigo-500/10 overflow-hidden ring-1 ring-zinc-900/5 animate-float transform transition-transform hover:scale-[1.01] duration-500">
              {/* App Header */}
              <div className="h-10 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                </div>
                <div className="text-[10px] font-medium text-zinc-400 flex items-center gap-1">
                  <Layout size={12} /> studio.lume.app
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400">Saving...</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex h-[550px] bg-white text-left">
                {/* Sidebar */}
                <div className="w-56 border-r border-zinc-100 hidden md:flex flex-col p-3 bg-zinc-50/30">
                  <div className="mb-6 flex items-center gap-2 px-2 py-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded shadow-inner"></div>
                    <span className="text-xs font-semibold text-zinc-900">DesignDaily</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="px-2 py-1.5 bg-white border border-zinc-200 rounded-md shadow-sm flex items-center gap-2 text-xs font-medium text-zinc-900">
                      <PenLine className="text-indigo-500" size={14} /> Posts
                    </div>
                    <div className="px-2 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer">
                      <ImageIcon size={14} /> Media Library
                    </div>
                    <div className="px-2 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer">
                      <BarChart2 size={14} /> Analytics
                    </div>
                    <div className="px-2 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer">
                      <Settings size={14} /> Settings
                    </div>
                  </div>

                  <div className="mt-8 px-2">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Collections</div>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span> Tech
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Tutorials
                    </div>
                  </div>
                </div>

                {/* Editor */}
                <div className="flex-1 overflow-hidden relative flex flex-col">
                  {/* Editor Toolbar */}
                  <div className="h-12 border-b border-zinc-50 flex items-center justify-between px-8 bg-white/50 backdrop-blur z-10">
                    <div className="flex items-center gap-4 text-zinc-400">
                      <Bold className="hover:text-zinc-900 cursor-pointer" size={16} />
                      <Italic className="hover:text-zinc-900 cursor-pointer" size={16} />
                      <LinkIcon className="hover:text-zinc-900 cursor-pointer" size={16} />
                      <div className="w-px h-4 bg-zinc-200"></div>
                      <ImageIcon className="hover:text-zinc-900 cursor-pointer" size={16} />
                      <Code className="hover:text-zinc-900 cursor-pointer" size={16} />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wide font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> SEO Good
                      </div>
                      <button className="bg-black text-white text-[10px] font-medium px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors">Publish</button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-12">
                    <div className="max-w-2xl mx-auto">
                      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-4 outline-none" contentEditable suppressContentEditableWarning>The Future of Digital Typography</h1>
                      <p className="text-lg text-zinc-500 mb-8 outline-none font-light" contentEditable suppressContentEditableWarning>How variable fonts and AI are reshaping the way we read on the web.</p>

                      <div className="relative group mb-8">
                        <img src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2000&auto=format&fit=crop" className="w-full h-64 object-cover rounded-lg shadow-sm border border-zinc-100" alt="Typography code" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Featured Image</div>
                      </div>

                      <div className="space-y-4 text-zinc-800 leading-relaxed text-sm">
                        <p>Typography on the web has always been a balance between creativity and performance. With the advent of variable fonts, we are entering a new era...</p>
                        <p>Consider the impact on load times. A single file can now contain multiple weights and styles.</p>

                        <div className="my-6 pl-4 border-l-2 border-indigo-500 italic text-zinc-500">
                          &quot;Good design is as little design as possible.&quot; — Dieter Rams
                        </div>

                        <p>We are building tools that understand this nuance.</p>
                        <div className="h-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof */}
      <section className="border-y border-zinc-100 py-12 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-medium text-zinc-500 mb-8 uppercase tracking-wider">Trusted by 10,000+ writers and teams</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-zinc-800 font-semibold text-lg"><Hexagon size={20} /> Acme Corp</div>
            <div className="flex items-center gap-2 text-zinc-800 font-semibold text-lg"><Triangle size={20} /> Vercel</div>
            <div className="flex items-center gap-2 text-zinc-800 font-semibold text-lg"><Command size={20} /> Linear</div>
            <div className="flex items-center gap-2 text-zinc-800 font-semibold text-lg"><Figma size={20} /> Figma</div>
            <div className="flex items-center gap-2 text-zinc-800 font-semibold text-lg"><Layers size={20} /> Raycast</div>
          </div>
        </div>
      </section>

      {/* Core Features (Bento Grid) */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">Everything needed to scale.</h2>
            <p className="text-zinc-500 text-lg">Focus on your content while we handle the distribution, analytics, and infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 md:h-[600px]">
            {/* SEO Feature */}
            <div className="md:col-span-2 row-span-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-indigo-600">
                  <Search size={20} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Built-in SEO Intelligence</h3>
                <p className="text-sm text-zinc-500 max-w-sm mb-8">Automatic meta tags, sitemap generation, and real-time readability scores. Rank higher without the plugin bloat.</p>

                {/* Visual */}
                <div className="mt-auto w-full bg-white rounded-xl border border-zinc-200 shadow-sm p-5 flex flex-col gap-3 transform group-hover:translate-y-[-5px] transition-transform duration-500">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <span className="text-xs font-semibold text-zinc-700">SEO Score</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">98/100</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <CheckCircle className="text-green-500" size={12} /> Meta description length optimized
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <CheckCircle className="text-green-500" size={12} /> Keyword density optimal
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <CheckCircle className="text-green-500" size={12} /> OpenGraph images generated
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Domains */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col justify-between group hover:border-zinc-300 hover:shadow-md transition-all">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-50 flex items-center justify-center border border-zinc-100 text-zinc-900 mb-4">
                  <Globe size={16} />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">Custom Domains</h3>
                <p className="text-sm text-zinc-500">Map your own domain with zero-config SSL.</p>
              </div>
            </div>

            {/* Analytics */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col justify-between group hover:border-zinc-300 hover:shadow-md transition-all">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-50 flex items-center justify-center border border-zinc-100 text-zinc-900 mb-4">
                  <BarChart2 size={16} />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">Privacy-first Analytics</h3>
                <p className="text-sm text-zinc-500">Track views and reads without cookies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor Showcase */}
      <section id="showcase" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-indigo-300 mb-6 border border-zinc-700">
              <Sparkles size={12} />
              Distraction-free Writing
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Focus on the words. Not the code.</h2>
            <div className="space-y-6 text-zinc-400 text-lg">
              <div className="flex gap-4">
                <div className="mt-1 bg-zinc-800 p-2 rounded-lg h-fit border border-zinc-700"><FileText className="text-white" size={20} /></div>
                <div>
                  <h3 className="text-white font-medium mb-1">Markdown Support</h3>
                  <p className="text-sm leading-relaxed">Write using familiar shortcuts. We handle the formatting instantly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-zinc-800 p-2 rounded-lg h-fit border border-zinc-700"><Zap className="text-white" size={20} /></div>
                <div>
                  <h3 className="text-white font-medium mb-1">Live Preview</h3>
                  <p className="text-sm leading-relaxed">See exactly how your post will look on mobile and desktop as you type.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-zinc-800 p-2 rounded-lg h-fit border border-zinc-700"><ImageIcon className="text-white" size={20} /></div>
                <div>
                  <h3 className="text-white font-medium mb-1">Drag & Drop Media</h3>
                  <p className="text-sm leading-relaxed">Upload images and videos effortlessly. We optimize and serve them from the edge.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30"></div>
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-6 md:p-8">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              </div>
              <div className="font-mono text-sm text-zinc-500 space-y-2">
                <div className="flex"><span className="w-6 text-zinc-700">1</span> <span className="text-purple-400"># The Art of Code</span></div>
                <div className="flex"><span className="w-6 text-zinc-700">2</span> </div>
                <div className="flex"><span className="w-6 text-zinc-700">3</span> <span className="text-zinc-300">Writing code is like writing poetry.</span></div>
                <div className="flex"><span className="w-6 text-zinc-700">4</span> <span className="text-zinc-300">It requires structure, rhythm, and clarity.</span></div>
                <div className="flex"><span className="w-6 text-zinc-700">5</span> </div>
                <div className="flex"><span className="w-6 text-zinc-700">6</span> <span className="text-indigo-400">## Why Minimalism Matters</span></div>
                <div className="flex"><span className="w-6 text-zinc-700">7</span> </div>
                <div className="flex"><span className="w-6 text-zinc-700">8</span> <span className="text-zinc-300">When we strip away the unnecessary, we find</span></div>
                <div className="flex"><span className="w-6 text-zinc-700">9</span> <span className="text-zinc-300">the essence of the problem.</span><span className="animate-pulse w-2 h-5 bg-indigo-500 ml-1"></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Built for every creator</h2>
            <p className="text-zinc-500 mt-4">Whether you're a solo dev or a marketing team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4"><User size={20} /></div>
              <h3 className="font-semibold text-zinc-900 mb-2">Personal Blogs</h3>
              <p className="text-xs text-zinc-500">Share your thoughts, stories, and ideas with a beautiful portfolio.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4"><Building2 size={20} /></div>
              <h3 className="font-semibold text-zinc-900 mb-2">Company Blogs</h3>
              <p className="text-xs text-zinc-500">Announce updates, share culture, and improve brand authority.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4"><Code2 size={20} /></div>
              <h3 className="font-semibold text-zinc-900 mb-2">Documentation</h3>
              <p className="text-xs text-zinc-500">Clean technical writing with code syntax highlighting.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4"><TrendingUp size={20} /></div>
              <h3 className="font-semibold text-zinc-900 mb-2">SEO Content</h3>
              <p className="text-xs text-zinc-500">High-performance pages designed to rank on Google.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 text-center mb-12">Why Lume?</h2>
          <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 w-1/3">Feature</th>
                  <th className="px-6 py-4 w-1/3 text-zinc-900 font-bold">Lume</th>
                  <th className="px-6 py-4 w-1/3 text-zinc-400">Wordpress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-6 py-4 text-zinc-600">Setup Time</td>
                  <td className="px-6 py-4 text-zinc-900 font-medium">Instant</td>
                  <td className="px-6 py-4 text-zinc-400">Hours</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-zinc-600">Performance (Lighthouse)</td>
                  <td className="px-6 py-4 text-green-600 font-medium">100/100</td>
                  <td className="px-6 py-4 text-zinc-400">Variable</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-zinc-600">Security</td>
                  <td className="px-6 py-4 text-zinc-900 font-medium">Managed & Auto SSL</td>
                  <td className="px-6 py-4 text-zinc-400">Self-managed</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-zinc-600">Editor</td>
                  <td className="px-6 py-4 text-zinc-900 font-medium">Modern Block/Markdown</td>
                  <td className="px-6 py-4 text-zinc-400">Classic/Gutenberg</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-zinc-600">Maintenance</td>
                  <td className="px-6 py-4 text-zinc-900 font-medium">Zero</td>
                  <td className="px-6 py-4 text-zinc-400">Plugins & Updates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">Simple, transparent pricing.</h2>
            <p className="text-zinc-500">Start for free, scale as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">Hobby</h3>
                <p className="text-sm text-zinc-500 mt-1">For personal blogs and side projects.</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-zinc-900">$0</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <button className="w-full py-2.5 rounded-lg border border-zinc-200 text-zinc-900 text-sm font-medium hover:bg-zinc-50 transition-colors mb-8">Start for Free</button>
              <ul className="space-y-3 text-sm text-zinc-600 flex-1">
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Up to 10 posts</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Lume.app subdomain</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Basic Analytics</li>
              </ul>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-white p-8 rounded-2xl border border-indigo-600 shadow-xl ring-4 ring-indigo-500/10 flex flex-col relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">Most Popular</div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">Pro</h3>
                <p className="text-sm text-zinc-500 mt-1">For serious writers and creators.</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-zinc-900">$12</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <button className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors mb-8 shadow-lg shadow-zinc-900/20">Get Started</button>
              <ul className="space-y-3 text-sm text-zinc-600 flex-1">
                <li className="flex items-center gap-2"><Check className="text-indigo-500" size={16} /> Unlimited posts</li>
                <li className="flex items-center gap-2"><Check className="text-indigo-500" size={16} /> Custom Domain (SSL)</li>
                <li className="flex items-center gap-2"><Check className="text-indigo-500" size={16} /> Advanced SEO Tools</li>
                <li className="flex items-center gap-2"><Check className="text-indigo-500" size={16} /> Newsletter Integration</li>
                <li className="flex items-center gap-2"><Check className="text-indigo-500" size={16} /> No Branding</li>
              </ul>
            </div>

            {/* Team Plan */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">Team</h3>
                <p className="text-sm text-zinc-500 mt-1">For startups and agencies.</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-zinc-900">$49</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <button className="w-full py-2.5 rounded-lg border border-zinc-200 text-zinc-900 text-sm font-medium hover:bg-zinc-50 transition-colors mb-8">Contact Sales</button>
              <ul className="space-y-3 text-sm text-zinc-600 flex-1">
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Everything in Pro</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> 5 Team Members</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Collaboration Tools</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Priority Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Large CTA */}
      <section className="py-32 text-center px-6 relative overflow-hidden bg-white">
        {/* Decorative bg elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100 to-pink-100 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-zinc-900 mb-6">Start your blog in minutes.</h2>
          <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto">Join the platform where ideas turn into influence.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-medium rounded-full hover:scale-105 transition-transform duration-200 shadow-xl shadow-zinc-900/20">
                Start Writing Free
              </button>
            </Link>
            <Link href="/blog">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 font-medium rounded-full hover:bg-zinc-50 border border-zinc-200 transition-colors">
                View Demo Blog
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  )
}
