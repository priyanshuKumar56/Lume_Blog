"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"

const featuredPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    excerpt: "Discover how simplicity can create powerful visual communication",
    category: "Design",
    author: "Sarah Chen",
    date: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Web Development Trends 2024",
    excerpt: "Explore the latest frameworks and tools shaping modern web development",
    category: "Technology",
    author: "Alex Kumar",
    date: "Mar 14, 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Building Communities Online",
    excerpt: "Learn strategies for creating engaged and supportive online communities",
    category: "Community",
    author: "Emma Wilson",
    date: "Mar 13, 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    readTime: "10 min read",
  },
]

export function FeaturedPosts() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">Featured Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Curated articles from our top writers on topics that matter
          </p>
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants} whileHover={{ y: -10 }} className="group">
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 bg-muted">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{post.category}</Badge>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-blue-600 group-hover:text-blue-700 transition-colors"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
            <Link href="/blog" className="flex items-center gap-2">
              View All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
