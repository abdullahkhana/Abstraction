"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react"
import { ModernCard } from "./modern-card"

interface VideoPlayerProps {
  videoId: string
  title?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export function VideoPlayer({
  videoId,
  title,
  className = "",
  autoPlay = false,
  loop = false,
  muted = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.Vimeo) {
      playerRef.current = new window.Vimeo.Player(containerRef.current?.querySelector("iframe") as HTMLIFrameElement, {
        id: videoId,
        autoplay: autoPlay,
        loop: loop,
        muted: muted,
        responsive: true,
        dnt: true,
        playsinline: true,
      })

      // Set up event listeners
      playerRef.current.on("play", () => setIsPlaying(true))
      playerRef.current.on("pause", () => setIsPlaying(false))
      playerRef.current.on("ended", () => setIsPlaying(false))
    }
  }, [videoId, autoPlay, loop, muted])

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause()
      } else {
        playerRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.setMuted(!isMuted)
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <ModernCard
      variant="glass"
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={containerRef} className="relative aspect-video">
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?h=0a7a18be8d&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title={title || "Video Player"}
          />
        </div>

        {/* Overlay Controls */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-10 h-10 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play Button Overlay */}
        {!isPlaying && !isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
            >
              <Play className="w-6 h-6 ml-1" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </ModernCard>
  )
} 