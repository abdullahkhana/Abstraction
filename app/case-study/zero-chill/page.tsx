"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
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
  Palette,
  Type,
  Layers,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ZeroChillCaseStudy() {
  const [isLiked, setIsLiked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const colorPalette = [
    { hex: "#000000", name: "Midnight Black", description: "Primary brand color" },
    { hex: "#00FF9D", name: "Neon Mint", description: "Accent color" },
    { hex: "#FFFFFF", name: "Pure White", description: "Background and contrast" },
  ]

  const deliverables = [
    {
      title: "Primary Logo",
      description: "Main brand mark with typography",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Horizontal Banner",
      description: "Social media and website header",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Brand Guidelines",
      description: "Comprehensive usage documentation",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

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
            <span className="text-primary text-lg font-semibold">Brand Identity Design</span>
            <h1 className="text-6xl md:text-8xl font-bold mt-4 mb-6 leading-none">
              Zero <span className="text-primary">Chill</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A bold and modern brand identity that captures the essence of cool, clean design while maintaining
              versatility across digital and physical applications.
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
              <div className="text-lg font-semibold">ZeroChill</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="text-lg font-semibold">3 weeks</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Services</div>
              <div className="text-lg font-semibold">Logo & Banner Design</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Tools</div>
              <div className="text-lg font-semibold">Adobe Creative Suite</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AdvancedButton variant="primary" size="lg" icon={<Download className="w-5 h-5" />}>
              Download Case Study
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="lg" icon={<Calendar className="w-5 h-5" />}>
              Start Your Project
            </AdvancedButton>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6">
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
                  <h3 className="text-3xl font-bold mb-6 text-primary">Project Overview</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    ZeroChill approached us with a vision to create a brand identity that embodies their name—cool,
                    bold, and unforgettable. The goal was to craft a logo and banner that would resonate with their
                    target audience while setting a strong foundation for future brand recognition.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Palette className="w-5 h-5 text-primary" />
                      <span>Clean, Iconic Logo Design</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Type className="w-5 h-5 text-primary" />
                      <span>Bold Typography</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Layers className="w-5 h-5 text-primary" />
                      <span>Versatile Applications</span>
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
                  <h3 className="text-3xl font-bold mb-6 text-primary">Design Approach</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We began with a collaborative discovery phase, understanding ZeroChill's aesthetic preferences,
                    competitive landscape, and core values. After several iterations, we landed on a design direction
                    that fused minimalism with bold typography and cool-toned palettes—a perfect visual metaphor for
                    the brand's name.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-primary" />
                      <span>Market Research</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>Competitive Analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Audience Insights</span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Color Palette</h2>
            <p className="text-xl text-muted-foreground">A carefully curated selection of colors that define the brand's personality</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12">
            {colorPalette.map((color, idx) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-32 h-32 rounded-full mb-4 border-2 border-muted shadow-lg"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="font-mono text-sm mb-1">{color.hex}</div>
                <div className="font-semibold text-lg">{color.name}</div>
                <div className="text-sm text-muted-foreground text-center max-w-[200px]">{color.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Deliverables</h2>
            <p className="text-xl text-muted-foreground">Key brand assets created for ZeroChill</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliverables.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="glass" className="h-full">
                  <div className="aspect-video relative mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Your <span className="text-primary">Brand Identity</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Let's craft a visual identity that captures your brand's essence and resonates with your audience.
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