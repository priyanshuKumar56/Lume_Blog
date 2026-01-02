"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Github, Twitter, Linkedin } from "lucide-react"

const links = {
  Product: ["Features", "Pricing", "Security", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "Status"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "GDPR"],
}

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              BlogHub
            </h3>
            <p className="text-sm text-muted-foreground">The platform for writers and readers to connect and create.</p>
          </motion.div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={16} className="text-red-500" /> by the BlogHub team
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label={label}
              >
                <Icon size={20} className="text-muted-foreground hover:text-foreground" />
              </motion.a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">© 2025 BlogHub. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
