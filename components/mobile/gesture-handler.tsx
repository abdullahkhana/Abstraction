"use client"

import type React from "react"

import { useRef } from "react"
import { motion, type PanInfo, useAnimation } from "framer-motion"

interface GestureHandlerProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  className?: string
}

export function GestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  className = "",
}: GestureHandlerProps) {
  const controls = useAnimation()
  const constraintsRef = useRef(null)

  const handlePanEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info
    const swipeThreshold = 50
    const velocityThreshold = 500

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
      if (offset.x > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    }

    if (Math.abs(offset.y) > swipeThreshold || Math.abs(velocity.y) > velocityThreshold) {
      if (offset.y > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }

    // Reset position
    controls.start({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={constraintsRef}
      className={className}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      onPanEnd={handlePanEnd}
      animate={controls}
      whileDrag={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  )
}
