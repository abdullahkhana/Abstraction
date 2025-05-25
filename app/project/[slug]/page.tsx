"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { GestureHandler } from "@/components/mobile/gesture-handler"
import { SceneWrapper } from "@/components/three/scene-wrapper"
import { InteractiveSphere } from "@/components/three/interactive-sphere"
import { ArrowLeft, ExternalLink, Calendar, Share2, Heart, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock project data - in real app this would come from API/CMS
const projectData = {
  nexus: {
    title: "Nexus Brand Identity",
    category: "Branding",
    client: "TechFlow Inc.",
    year: "2024",
    duration: "3 months",
    description:
      "A complete brand transformation for a cutting-edge tech startup, featuring a revolutionary visual identity system that bridges the gap between human intuition and artificial intelligence.",
    challenge:
      "TechFlow needed a brand identity that would position them as leaders in the AI space while maintaining approachability for enterprise clients. The challenge was creating something that felt both futuristic and trustworthy.",
    solution:
      "We developed a dynamic identity system based on neural network patterns, with a logo that adapts and evolves across different touchpoints. The color palette draws from data visualization aesthetics while maintaining corporate sophistication.",
    results: [
      { metric: "Brand Recognition", value: "340%", description: "increase in brand awareness" },
      { metric: "Lead Generation", value: "250%", description: "boost in qualified leads" },
      { metric: "Market Position", value: "#1", description: "in industry rankings" },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    tags: ["Brand Identity", "Logo Design", "Visual System", "Guidelines", "AI/Tech"],
    testimonial: {
      quote:
        "Abstraction Studios didn't just design a logo—they created an entire visual language that perfectly captures our vision for the future of AI.",
      author: "Sarah Chen",
      role: "CEO, TechFlow Inc.",
    },
  },
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const project = projectData.nexus // In real app, fetch based on params.slug

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div ref={containerRef} className="bg-[#181717] text-white min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl bg-[#181717]/20"
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
        <div className="absolute inset-0 z-0">
          <SceneWrapper>
            <InteractiveSphere />
          </SceneWrapper>
        </div>

        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y: parallaxY, scale: scaleProgress }}
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #D84628 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, #D84628 0%, transparent 50%)",
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
            <span className="text-[#D84628] text-lg font-semibold">{project.category}</span>
            <h1 className="text-6xl md:text-8xl font-bold mt-4 mb-6 leading-none">{project.title}</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{project.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="text-center">
              <div className="text-sm text-white/60">Client</div>
              <div className="text-lg font-semibold">{project.client}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Year</div>
              <div className="text-lg font-semibold">{project.year}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Duration</div>
              <div className="text-lg font-semibold">{project.duration}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AdvancedButton variant="primary" size="lg" icon={<ExternalLink className="w-5 h-5" />}>
              View Live Project
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="lg" icon={<Calendar className="w-5 h-5" />}>
              Book Similar Project
            </AdvancedButton>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <GestureHandler onSwipeLeft={nextImage} onSwipeRight={prevImage}>
            <ModernCard variant="glass" className="overflow-hidden">
              <div className="aspect-[16/10] relative">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={project.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Image Navigation */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {project.images.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-[#D84628]" : "bg-white/30"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>

                {/* Swipe indicators for mobile */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 md:hidden">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </ModernCard>
          </GestureHandler>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenge & Solution */}
            <div className="space-y-12">
              <ModernCard variant="gradient">
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-[#D84628]">The Challenge</h3>
                  <p className="text-white/80 leading-relaxed text-lg">{project.challenge}</p>
                </div>
              </ModernCard>

              <ModernCard variant="neon">
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-[#D84628]">Our Solution</h3>
                  <p className="text-white/80 leading-relaxed text-lg">{project.solution}</p>
                </div>
              </ModernCard>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-3xl font-bold mb-8">Results & Impact</h3>
              <div className="space-y-6">
                {project.results.map((result, index) => (
                  <motion.div
                    key={result.metric}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ModernCard variant="minimal" hover={false}>
                      <div className="p-6 flex items-center space-x-6">
                        <div className="text-4xl font-bold text-[#D84628]">{result.value}</div>
                        <div>
                          <div className="font-semibold text-lg">{result.metric}</div>
                          <div className="text-white/60">{result.description}</div>
                        </div>
                      </div>
                    </ModernCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-[#D84628]/20 border border-[#D84628]/30 rounded-full text-sm font-medium backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <ModernCard variant="glass">
            <div className="p-12">
              <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                "{project.testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-semibold text-lg text-[#D84628]">{project.testimonial.author}</div>
                <div className="text-white/60">{project.testimonial.role}</div>
              </div>
            </div>
          </ModernCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-[#D84628]">Project</span>?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Let's create something extraordinary together. Book a consultation to discuss your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AdvancedButton variant="gradient" size="xl" icon={<Calendar className="w-5 h-5" />}>
              Book Free Consultation
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="xl" icon={<Download className="w-5 h-5" />}>
              Download Case Study
            </AdvancedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
