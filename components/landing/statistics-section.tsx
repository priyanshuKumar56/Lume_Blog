"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Active Writers",
    value: "10,000+",
    description: "Creating daily",
  },
  {
    icon: BookOpen,
    label: "Articles Published",
    value: "50,000+",
    description: "And growing",
  },
  {
    icon: Users,
    label: "Monthly Readers",
    value: "1M+",
    description: "Discovering content",
  },
  {
    icon: TrendingUp,
    label: "Content Categories",
    value: "100+",
    description: "Diverse topics",
  },
]

export function StatisticsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Writers Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a vibrant community built for creators and readers alike
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="p-6 rounded-xl bg-card border border-border text-center transition-all duration-300"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                    <Icon className="text-blue-600 dark:text-blue-400" size={28} />
                  </div>
                </motion.div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
