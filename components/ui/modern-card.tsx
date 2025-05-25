"use client"

import { motion } from "framer-motion"
import type React from "react"
import { memo } from "react"

interface ModernCardProps {
  children: React.ReactNode
  className?: string
  variant?: "glass" | "gradient" | "neon" | "minimal"
  hover?: boolean
}

export const ModernCard = memo(function ModernCard({
  children,
  className = "",
  variant = "glass",
  hover = true,
}: ModernCardProps) {
  const variants = {
    glass: "glass-effect shadow-lg",
    gradient: "bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl border border-primary/20 shadow-xl",
    neon: "bg-card/40 backdrop-blur-xl border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
    minimal: "bg-card/30 backdrop-blur-sm border border-border/50 shadow-lg",
  }

  const hoverEffects = hover
    ? {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }
    : {}

  return (
    <motion.div
      className={`${variants[variant]} rounded-2xl overflow-hidden relative group ${className}`}
      whileHover={hoverEffects}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
    </motion.div>
  )
})
