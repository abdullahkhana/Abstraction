"use client"

import { motion } from "framer-motion"
import type React from "react"
import { memo } from "react"

interface AdvancedButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "neon" | "gradient"
  size?: "sm" | "md" | "lg" | "xl"
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const AdvancedButton = memo(function AdvancedButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  icon,
  iconPosition = "right",
}: AdvancedButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
    secondary: "bg-secondary text-secondary-foreground border border-border backdrop-blur-sm",
    ghost: "bg-transparent text-foreground border border-border/50",
    neon: "bg-transparent text-primary border border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
    gradient: "gradient-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-12 py-5 text-xl",
  }

  return (
    <motion.button
      className={`${variants[variant]} ${sizes[size]} rounded-xl font-semibold relative overflow-hidden group transition-all duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </motion.button>
  )
})
