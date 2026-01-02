"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, CheckCircle } from "lucide-react"

const features = [
  "AI-powered content recommendations",
  "Advanced SEO optimization tools",
  "Built-in analytics dashboard",
  "Community moderation system",
  "Multiple monetization options",
]

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-card border border-border p-12 text-center space-y-8"
        >
          {/* Icon */}
          <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-xl">
              <Zap className="text-blue-600 dark:text-blue-400" size={40} />
            </div>
          </motion.div>

          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">Ready to share your voice?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who are building audiences and sharing their expertise with the world.
            </p>
          </div>

          {/* Features */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-14 px-8"
              >
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 bg-transparent">
                <Link href="/blog">Browse All Articles</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
