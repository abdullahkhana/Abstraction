"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10 + 5

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800)
          return 100
        }
        return newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="text-center">
          {/* Logo */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <Image src="/logo.png" alt="Abstraction Studios" fill className="object-contain rounded-xl" />
            </div>
            <motion.h1
              className="text-2xl font-bold text-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Abstraction Studios
            </motion.h1>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="text-sm text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
