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
  Instagram,
  Target,
  Sparkles,
  Trophy,
  Brain,
  Microscope,
  Code2,
  Calculator,
  BookOpen,
  Presentation,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Greek Key SVG Border
const GreekKey = () => (
  <svg viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-3">
    <rect y="0" width="120" height="12" fill="#f5f1e0" />
    <path d="M0 6h6V0h6v12h6V6h6v6h6V0h6v12h6V6h6v6h6V0h6v12h6V6h6v6h6V0h6v12h6V6h6v6h6V0h6v12h6V6h6v6h6V0h6v12" stroke="#455b64" strokeWidth="1.5"/>
  </svg>
)

const colorPalette = [
  { hex: "#455b64", name: "Olympian Blue-Gray", description: "Primary brand color" },
  { hex: "#f5f1e0", name: "Parchment Cream", description: "Background & highlight" },
  { hex: "#FFD700", name: "Tech Gold", description: "Accent color" },
]

const deliverables = [
  {
    title: "Main Logo",
    description: "Olympus Edition logomark",
    image: "/projects/gnosis/logo.webp",
  },
  {
    title: "Title Cover",
    description: "Hero event artwork",
    image: "/projects/gnosis/titlecover.png",
  },
  {
    title: "Category Logos",
    description: "All event category marks",
    image: "/projects/gnosis/color pallet.png",
  },
]

const categoryLogos = [
  {
    title: "Omniscience",
    description: "Mixed STEM Category",
    image: "/projects/gnosis/omnisciene no bg.webp",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: "The Exhibition",
    description: "Physical Project Category",
    image: "/projects/gnosis/Exibition no bg.webp",
    icon: <Presentation className="w-6 h-6" />,
  },
  {
    title: "Oppenheimer's Occult",
    description: "Physics Category",
    image: "/projects/gnosis/physics no bg.webp",
    icon: <Microscope className="w-6 h-6" />,
  },
  {
    title: "Kratos Kryptography",
    description: "Computer Science Category",
    image: "/projects/gnosis/cs no bg.webp",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: "Alchemists' Antithesis",
    description: "Chemistry Category",
    image: "/projects/gnosis/chemsitry no logo.webp",
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    title: "Euclid's Expansion",
    description: "Mathematics Category",
    image: "/projects/gnosis/maths no bg.webp",
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    title: "Hippocrates' Haven",
    description: "Biology Category",
    image: "/projects/gnosis/bio no bg.webp",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Daedalus' Deceit",
    description: "Mystery Category",
    image: "/projects/gnosis/Deadalus Deciet no bg.webp",
    icon: <Calculator className="w-6 h-6" />,
  },
]

const results = [
  {
    metric: "Average Views",
    value: "30K",
    description: "per post",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    metric: "Total Reach",
    value: "2M+",
    description: "accounts reached",
    icon: <Users className="w-6 h-6" />,
  },
  {
    metric: "Viral Content",
    value: "5.2M",
    description: "most viewed reel",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    metric: "Engagement",
    value: "500K+",
    description: "total interactions",
    icon: <Heart className="w-6 h-6" />,
  },
]

export default function GnosisCaseStudy() {
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % deliverables.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + deliverables.length) % deliverables.length)
  }

  return (
    <div ref={containerRef} className="bg-[#455b64] text-[#f5f1e0] min-h-screen">
      {/* Fixed Background Image with overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/projects/gnosis/background main.webp"
          alt="Gnosis Background"
          fill
          priority
          className="object-cover w-full h-full"
          style={{ zIndex: -10 }}
        />
        {/* Overlay for readability */}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl bg-[#455b64]/80"
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
              icon={<Heart className={`w-4 h-4 ${isLiked ? "fill-[#FFD700]" : ""}`} />}
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? "Liked" : "Like"}
            </AdvancedButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/projects/gnosis/titlecover.png"
            alt="Gnosis Olympus Edition Hero"
            fill
            priority
            className="object-cover opacity-30"
          />
        </div>
        <div className="text-center z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="text-[#FFD700] text-lg font-semibold">Brand Identity Design</span>
            <h1 className="text-6xl md:text-8xl font-bold mt-4 mb-6 leading-none">
              GNOSIS <span className="text-[#FFD700]">Olympus Edition</span>
            </h1>
            <p className="text-xl text-[#f5f1e0]/80 max-w-3xl mx-auto">
              A mythological, competitive, and futuristic brand identity for Beaconhouse's premier student-led STEM event.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="text-center">
              <div className="text-sm text-[#FFD700]/80">Event Type</div>
              <div className="text-lg font-semibold">STEM Competition</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[#FFD700]/80">Location</div>
              <div className="text-lg font-semibold">Beaconhouse JT</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[#FFD700]/80">Duration</div>
              <div className="text-lg font-semibold">3 Months</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[#FFD700]/80">Tools</div>
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
              <ModernCard variant="glass" className="bg-[#f5f1e0] text-[#455b64]">
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-[#FFD700]">Project Overview</h3>
                  <p className="text-[#455b64]/80 leading-relaxed mb-6">
                    Gnosis: Olympus Edition is a student-led STEM competition that brings together young minds to showcase their scientific prowess. The brand identity needed to reflect both the competitive spirit and the mythological grandeur of the event.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-[#FFD700]" />
                      <span>Student-Led Competition</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-[#FFD700]" />
                      <span>STEM Innovation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-[#FFD700]" />
                      <span>Academic Excellence</span>
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
              <ModernCard variant="gradient" className="bg-gradient-to-br from-[#f5f1e0] to-[#FFD700]/20 text-[#455b64]">
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-[#FFD700]">Design Strategy</h3>
                  <p className="text-[#455b64]/80 leading-relaxed mb-6">
                    We fused ancient Greek mythology with modern tech aesthetics to create a unique visual language that resonates with both students and educators. The design system incorporates futuristic elements while maintaining the timeless appeal of classical motifs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Palette className="w-5 h-5 text-[#FFD700]" />
                      <span>Mythological Elements</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Type className="w-5 h-5 text-[#FFD700]" />
                      <span>Tech-Inspired Typography</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Layers className="w-5 h-5 text-[#FFD700]" />
                      <span>Futuristic Patterns</span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deliverables Section (Image Showcase) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Brand Showcase</h2>
            <p className="text-xl text-[#f5f1e0]/80">Key brand assets created for Gnosis: Olympus Edition</p>
          </motion.div>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl aspect-video mb-8">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image
                  src={deliverables[currentImageIndex].image}
                  alt={deliverables[currentImageIndex].title}
                  fill
                  className="object-contain rounded-xl border-4 border-[#FFD700] bg-[#f5f1e0]"
                />
              </motion.div>
              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {deliverables.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full border-2 ${index === currentImageIndex ? "bg-[#FFD700] border-[#FFD700]" : "bg-[#f5f1e0] border-[#FFD700]"}`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <AdvancedButton variant="secondary" size="sm" onClick={prevImage}>
                Previous
              </AdvancedButton>
              <AdvancedButton variant="primary" size="sm" onClick={nextImage}>
                Next
              </AdvancedButton>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{deliverables[currentImageIndex].title}</h3>
              <p className="text-[#f5f1e0]/80">{deliverables[currentImageIndex].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Logos Section */}
      <section className="py-20 px-6 bg-[#f5f1e0]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Category Logos</h2>
            <p className="text-xl text-[#f5f1e0]/80">Each category embodies a unique fusion of mythology and science</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryLogos.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.07, boxShadow: '0 0 24px #FFD700' }}
              >
                <ModernCard variant="glass" className="bg-[#f5f1e0] text-[#455b64] border-[#FFD700] shadow-lg h-full transition-transform duration-300">
                  <div className="p-6">
                    <div className="aspect-square relative mb-4">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[#FFD700]">{category.icon}</span>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <p className="text-sm text-[#455b64]/80">{category.description}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Color Palette</h2>
            <p className="text-xl text-[#f5f1e0]/80">A carefully curated selection of colors that define the brand's personality</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-12">
            {colorPalette.map((color, idx) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 24px #FFD700' }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-32 h-32 rounded-full mb-4 border-2 border-[#FFD700] shadow-lg"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="font-mono text-sm mb-1 text-[#455b64]">{color.hex}</div>
                <div className="font-semibold text-lg text-[#455b64]">{color.name}</div>
                <div className="text-sm text-center max-w-[200px] text-[#455b64]/80">{color.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-[#f5f1e0]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Results & Impact</h2>
            <p className="text-xl text-[#f5f1e0]/80">The numbers speak for themselves</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, idx) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.07, boxShadow: '0 0 24px #FFD700' }}
              >
                <ModernCard variant="gradient" className="bg-gradient-to-br from-[#f5f1e0] to-[#FFD700]/20 text-[#455b64] border-[#FFD700] shadow-lg h-full transition-transform duration-300">
                  <div className="p-8 text-center">
                    <div className="mb-4 flex justify-center text-[#FFD700]">{result.icon}</div>
                    <div className="text-4xl font-bold mb-2 text-[#455b64]">{result.value}</div>
                    <div className="text-lg font-semibold mb-2 text-[#455b64]">{result.metric}</div>
                    <div className="text-sm text-[#455b64]/80">{result.description}</div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Integration */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Social Media Presence</h2>
            <p className="text-xl text-[#f5f1e0]/80 mb-8">Follow our journey on Instagram</p>
            <a
              href="https://www.instagram.com/gnosis.bcpjt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-[#FFD700] hover:text-[#455b64] transition-colors text-xl font-bold"
            >
              <Instagram className="w-6 h-6" />
              <span>@gnosis.bcpjt</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">
            Ready to Create Your <span className="text-[#455b64]">Epic</span> Brand?
          </h2>
          <p className="text-xl text-[#f5f1e0]/80 mb-12">
            Let's craft a visual identity that combines tradition with innovation.
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