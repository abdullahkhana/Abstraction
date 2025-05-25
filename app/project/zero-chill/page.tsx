"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { GestureHandler } from "@/components/mobile/gesture-handler"
import { SceneWrapper } from "@/components/three/scene-wrapper"
import { InteractiveSphere } from "@/components/three/interactive-sphere"
import {
  ArrowLeft,
  Calendar,
  Share2,
  Heart,
  Download,
  TrendingUp,
  Users,
  Eye,
  BarChart3,
  Play,
  Camera,
  Film,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ZeroChillProjectPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const projectImages = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]

  const videoMetrics = [
    {
      metric: "Total Views",
      value: "2.8M",
      description: "across all platforms",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      metric: "Engagement Rate",
      value: "18.5%",
      description: "above industry average",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      metric: "Social Shares",
      value: "45K+",
      description: "organic shares",
      icon: <Users className="w-6 h-6" />,
    },
    {
      metric: "Awards Won",
      value: "3",
      description: "film festival recognitions",
      icon: <Award className="w-6 h-6" />,
    },
  ]

  const productionHighlights = [
    {
      phase: "Pre-Production",
      duration: "2 weeks",
      details: [
        "Concept development and storyboarding",
        "Location scouting in urban environments",
        "Casting and talent coordination",
        "Equipment planning and logistics",
      ],
    },
    {
      phase: "Principal Photography",
      duration: "5 days",
      details: [
        "4K cinema camera setup",
        "Dynamic lighting and cinematography",
        "Multiple location shoots",
        "Drone footage and aerial shots",
      ],
    },
    {
      phase: "Post-Production",
      duration: "3 weeks",
      details: [
        "Color grading and visual enhancement",
        "Sound design and music composition",
        "Motion graphics and title sequences",
        "Final cut and delivery optimization",
      ],
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl bg-background/20"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <AdvancedButton variant="ghost" size="md" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              Back to Home
            </AdvancedButton>
          </Link>
          <div className="flex space-x-4">
            <AdvancedButton variant="secondary" size="sm" icon={<Share2 className="w-4 h-4" />}>
              Share
            </AdvancedButton>
            <AdvancedButton
              variant={isLiked ? "primary" : "ghost"}
              size="sm"
              icon={<Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />}
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? "Liked" : "Like"}
            </AdvancedButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <SceneWrapper>
            <InteractiveSphere />
          </SceneWrapper>
        </div>

        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y: parallaxY }}
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, hsl(var(--primary)) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="text-center z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="text-primary text-lg font-semibold">Video Production</span>
            <h1 className="text-6xl md:text-8xl font-bold mt-4 mb-6 leading-none">
              Zero <span className="text-primary">Chill</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A cinematic masterpiece showcasing urban culture and lifestyle through dynamic storytelling, cutting-edge
              cinematography, and immersive sound design that captivated millions worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Client</div>
              <div className="text-lg font-semibold">Zero Chill Productions</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="text-lg font-semibold">6 weeks</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Format</div>
              <div className="text-lg font-semibold">4K Cinema</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Runtime</div>
              <div className="text-lg font-semibold">3:45</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AdvancedButton variant="primary" size="lg" icon={<Play className="w-5 h-5" />}>
              Watch Full Video
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="lg" icon={<Download className="w-5 h-5" />}>
              Download Case Study
            </AdvancedButton>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <GestureHandler onSwipeLeft={nextImage} onSwipeRight={prevImage}>
            <ModernCard variant="glass" className="overflow-hidden">
              <div className="aspect-video relative">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={projectImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`Zero Chill - Frame ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Play button overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                >
                  <motion.div
                    className="w-20 h-20 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </motion.div>
                </motion.div>

                {/* Image Navigation */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {projectImages.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-muted"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>
              </div>
            </ModernCard>
          </GestureHandler>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Performance & Impact</h2>
            <p className="text-xl text-muted-foreground">Exceptional results that exceeded all expectations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {videoMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="gradient">
                  <div className="p-8 text-center">
                    <div className="text-primary mb-4 flex justify-center">{metric.icon}</div>
                    <div className="text-4xl font-bold mb-2">{metric.value}</div>
                    <div className="text-lg font-semibold mb-2">{metric.metric}</div>
                    <div className="text-sm text-muted-foreground">{metric.description}</div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Production Journey</h2>
            <p className="text-xl text-muted-foreground">From concept to final cut - our meticulous process</p>
          </motion.div>

          <div className="space-y-12">
            {productionHighlights.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <ModernCard variant="neon">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-primary">{phase.phase}</h3>
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                          {phase.duration}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {phase.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: detailIndex * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </ModernCard>
                </div>

                <div className="flex-1">
                  <div className="aspect-video relative rounded-2xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt={`${phase.phase} process`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground">
                        {phase.phase}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="glass">
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-primary">Technical Excellence</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Camera & Equipment</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• RED Komodo 6K Cinema Camera</li>
                        <li>• Zeiss CP.3 Prime Lens Set</li>
                        <li>• DJI Ronin 4D Gimbal System</li>
                        <li>• ARRI SkyPanel LED Lighting</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Post-Production</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• DaVinci Resolve Color Grading</li>
                        <li>• Pro Tools Audio Mixing</li>
                        <li>• After Effects Motion Graphics</li>
                        <li>• Custom Sound Design</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="gradient">
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-primary">Creative Vision</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Zero Chill represents our commitment to pushing creative boundaries in video production. The project
                    demanded a perfect blend of urban aesthetics, dynamic cinematography, and compelling storytelling
                    that would resonate with a global audience.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Camera className="w-5 h-5 text-primary" />
                      <span>Cinematic 4K Production</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Film className="w-5 h-5 text-primary" />
                      <span>Dynamic Color Grading</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span>Data-Driven Optimization</span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Awards & Recognition</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Zero Chill has been recognized by industry leaders and film festivals worldwide
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { award: "Best Cinematography", festival: "Urban Film Festival 2024", medal: "🥇" },
                { award: "Audience Choice", festival: "Digital Arts Awards", medal: "🏆" },
                { award: "Excellence in Production", festival: "Creative Media Summit", medal: "⭐" },
              ].map((recognition, index) => (
                <motion.div
                  key={recognition.award}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ModernCard variant="minimal">
                    <div className="p-6 text-center">
                      <div className="text-4xl mb-4">{recognition.medal}</div>
                      <h3 className="text-lg font-bold mb-2">{recognition.award}</h3>
                      <p className="text-sm text-muted-foreground">{recognition.festival}</p>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Your <span className="text-primary">Masterpiece</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Let's bring your vision to life with cinematic excellence and creative innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AdvancedButton variant="gradient" size="xl" icon={<Calendar className="w-5 h-5" />}>
              Start Your Project
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="xl" icon={<Download className="w-5 h-5" />}>
              Download Portfolio
            </AdvancedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
