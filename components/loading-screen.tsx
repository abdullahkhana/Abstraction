"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10 + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShow(false)
            setTimeout(onComplete, 600)
          }, 600)
          return 100
        }
        return newProgress
      })
    }, 150)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181717]"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="text-center">
            {/* Animated Glowing Ring */}

            {/* Progress Bar with shimmer */}
            <div className="w-64 mx-auto mt-8">
              <div className="h-2 bg-[#232222] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#D84628] rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60 rounded-full"
                    initial={{ x: -48 }}
                    animate={{ x: 256 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              <motion.p
                className="text-sm text-[#FFFFFF] mt-4 tracking-widest font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
