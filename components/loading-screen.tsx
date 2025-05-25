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
            <motion.div
              className="relative mb-12 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 1 }}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0px 0px #D84628",
                    "0 0 32px 8px #D84628",
                    "0 0 0px 0px #D84628"
                  ]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-24 h-24 rounded-full border-4 border-[#D84628] opacity-80" />
              </motion.div>
              <div className="w-16 h-16 mx-auto mb-6 relative z-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Image src="/logo.png" alt="Abstraction Studios" fill className="object-contain rounded-xl" />
              </div>
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-white tracking-wide mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Abstraction Studios
            </motion.h1>
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
