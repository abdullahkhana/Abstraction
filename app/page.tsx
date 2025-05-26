"use client"

import { useEffect, useRef, useState, Suspense, lazy, memo, useCallback, useMemo } from "react"
import { motion, useScroll, useInView, useTransform } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { LoadingScreen } from "@/components/loading-screen"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  Play,
  Star,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Send,
  Globe,
  Zap,
  Eye,
  Palette,
  Video,
  Megaphone,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Camera,
  Brush,
  Clock,
  Users,
  Handshake,
  Linkedin,
  Twitter,
  Github,
  Behance,
  Instagram,
  Dribbble,
  Pinterest,
  TikTok,
  Snapchat,
  Telegram,
  Heart,
  HeartHandshake,
  MessageCircle,
  Code,
  Brain,
  
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createPortal } from "react-dom"
import { VideoCard, BrandingCard, SocialCard, WebsiteCard, GraphicsCard, DefaultCard } from "@/components/projects/category-cards"

// Lazy load heavy components for better performance
const SceneWrapper = lazy(() => import("@/components/three/scene-wrapper").then((m) => ({ default: m.SceneWrapper })))
const AbstractGeometry = lazy(() =>
  import("@/components/three/abstract-geometry").then((m) => ({ default: m.AbstractGeometry })),
)
const FloatingElements = lazy(() =>
  import("@/components/three/floating-elements").then((m) => ({ default: m.FloatingElements })),
)
const InteractiveSphere = lazy(() =>
  import("@/components/three/interactive-sphere").then((m) => ({ default: m.InteractiveSphere })),
)
const ParticleField = lazy(() =>
  import("@/components/three/particle-field").then((m) => ({ default: m.ParticleField })),
)
const MorphingGeometry = lazy(() =>
  import("@/components/three/morphing-geometry").then((m) => ({ default: m.MorphingGeometry })),
)
const ScrollTriggered3D = lazy(() =>
  import("@/components/three/scroll-triggered-3d").then((m) => ({ default: m.ScrollTriggered3D })),
)
const TeamCard = lazy(() => import("@/components/team/team-card").then((m) => ({ default: m.TeamCard })))
const InteractiveTimeline = lazy(() =>
  import("@/components/timeline/interactive-timeline").then((m) => ({ default: m.InteractiveTimeline })),
)

// Memoize the category buttons component
const CategoryButton = memo(({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: { id: string; label: string; icon: React.ReactNode }; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {category.icon}
    <span className="text-sm font-medium">{category.label}</span>
  </motion.button>
))

// Add a performance optimization hook
function usePerformanceOptimization() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  
  useEffect(() => {
    // Check if device is mobile or has low performance
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768
      const isLowEnd = navigator.hardwareConcurrency <= 4
      setIsLowPerformance(isMobile || isLowEnd)
    }

    checkPerformance()
    window.addEventListener('resize', checkPerformance)
    
    return () => window.removeEventListener('resize', checkPerformance)
  }, [])

  return isLowPerformance
}

// Update the HeroSection component with proper types and optimizations
function HeroSection({ 
  isLowPerformance, 
  scrollProgress,
  setIsHovering 
}: { 
  isLowPerformance: boolean;
  scrollProgress: any;
  setIsHovering: (value: boolean) => void;
}) {
  // Move useTransform hooks to the top level
  const backgroundY = useTransform(scrollProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollProgress, [0, 1], ["0%", "200%"])

  // Memoize static values
  const backgroundAnimation = useMemo(() => ({
    background: [
      "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)",
      "radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)",
      "radial-gradient(circle at 50% 20%, hsl(var(--primary)) 0%, transparent 50%)",
      "radial-gradient(circle at 50% 80%, hsl(var(--primary)) 0%, transparent 50%)",
    ],
  }), [])

  const backgroundTransition = useMemo(() => ({
    duration: isLowPerformance ? 20 : 12,
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear"
  }), [isLowPerformance])

  // Memoize the hover handler
  const handleHoverStart = useCallback(() => {
    if (!isLowPerformance) {
      setIsHovering(true)
    }
  }, [isLowPerformance, setIsHovering])

  return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background - Optimized for performance */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />}>
            <SceneWrapper>
            {!isLowPerformance && <ParticleField />}
              <FloatingElements />
            <motion.group>
              <ScrollTriggered3D scrollProgress={scrollProgress} />
            </motion.group>
            </SceneWrapper>
          </Suspense>
        </div>

        {/* Animated Background Gradients */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        animate={backgroundAnimation}
        transition={backgroundTransition}
        />

        <div className="text-center z-10 max-w-6xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <Suspense fallback={<div className="w-full h-full bg-primary/20 rounded-full" />}>
                <SceneWrapper>
                  <AbstractGeometry />
                </SceneWrapper>
              </Suspense>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ y: textY }}
            className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-none"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              ABSTRACTION
            </motion.span>
            <motion.span
              className="block text-primary relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              STUDIOS
            {!isLowPerformance && (
                <motion.div
                  className="absolute -inset-2 bg-primary/20 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We transform <span className="text-primary font-semibold">visions</span> into immersive digital experiences
            that transcend the ordinary and redefine what's possible
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <AdvancedButton
              variant="gradient"
            size={isLowPerformance ? "lg" : "xl"}
              icon={<ArrowRight className="w-5 h-5" />}
            onClick={handleHoverStart}
            >
              Explore Our Universe
            </AdvancedButton>
            <AdvancedButton
              variant="secondary"
            size={isLowPerformance ? "lg" : "xl"}
              icon={<Play className="w-5 h-5" />}
              iconPosition="left"
            onClick={handleHoverStart}
            >
            Lets Make It Happen
            </AdvancedButton>
          </motion.div>
        </div>

      {!isLowPerformance && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-6 h-12 border-2 border-muted-foreground/30 rounded-full flex justify-center relative">
              <motion.div
                className="w-1 h-4 bg-primary rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        )}
      </section>
  )
}

// Update the Services Section with optimized 3D rendering
function ServicesSection({ scrollProgress, isLowPerformance }: { scrollProgress: any; isLowPerformance: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const y = useTransform(scrollProgress, [0.2, 0.5], [100, -100])

  const services = [
    {
      title: "Brand Identity Design",
      description: "Crafting distinctive visual identities that resonate with your audience and stand the test of time",
      icon: <Palette className="w-8 h-8" />,
      color: "hsl(var(--primary))",
      features: ["Logo Design", "Brand Guidelines", "Visual Systems", "Brand Strategy"],
    },
    {
      title: "UI/UX & Web Design",
      description: "Creating intuitive digital experiences that convert visitors into loyal customers",
      icon: <Globe className="w-8 h-8" />,
      color: "hsl(var(--foreground))",
      features: ["User Research", "Wireframing", "Prototyping", "Responsive Design"],
    },
    {
      title: "Video Production",
      description: "Cinematic storytelling that brings your brand narrative to life with stunning visuals",
      icon: <Video className="w-8 h-8" />,
      color: "hsl(var(--primary))",
      features: ["Commercial Videos", "Motion Graphics", "3D Animation", "Post-Production"],
    },
    {
      title: "Creative Campaigns",
      description: "Strategic creative solutions that drive engagement and deliver measurable results",
      icon: <Zap className="w-8 h-8" />,
      color: "hsl(var(--foreground))",
      features: ["Campaign Strategy", "Creative Direction", "Multi-Channel", "Performance Tracking"],
    },
    {
      title: "Social Media & Digital Ads",
      description: "Engaging content that amplifies your brand voice across all digital platforms",
      icon: <Megaphone className="w-8 h-8" />,
      color: "hsl(var(--primary))",
      features: ["Content Creation", "Ad Design", "Social Strategy", "Community Management"],
    },
    {
      title: "E-commerce & Prototyping",
      description: "Building scalable digital products from initial concept to successful launch",
      icon: <Eye className="w-8 h-8" />,
      color: "hsl(var(--foreground))",
      features: ["E-commerce Design", "App Prototyping", "User Testing", "Development"],
    },
  ]

  return (
    <section id="services" ref={ref} className="py-32 px-6 relative">
      {/* 3D Background Element - Optimized */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Suspense fallback={null}>
          <SceneWrapper>
            {!isLowPerformance && (
            <motion.group style={{ y }}>
              <InteractiveSphere />
            </motion.group>
            )}
          </SceneWrapper>
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Our{" "}
            <span className="text-primary relative">
              Services
              <motion.div
                className="absolute -inset-4 bg-primary/10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to execution, we deliver comprehensive creative solutions that push boundaries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group perspective-1000"
            >
              <ModernCard variant="gradient" className="h-full">
                <div className="p-8 h-full flex flex-col">
                  <motion.div
                    className="mb-6 text-primary"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <AdvancedButton variant="ghost" size="sm" className="w-full">
                      Learn More
                    </AdvancedButton>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CurrentProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentProjects = [
    {
      title: "Scareed",
      description: "A psychological thriller short film exploring the depths of human fear and resilience",
      category: "Short Film",
      status: "In Planning  ",
      progress: 65,
      image: "/placeholder.svg?height=300&width=500",
      details: [
        "Pre-production completed",
        "Principal photography 65% done",
        "Post-production scheduled for Q2 2024",
        "Film festival submissions planned",
      ],
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Current <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exciting projects currently in development that showcase our expanding creative horizons
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ModernCard variant="gradient" className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-video lg:aspect-square relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{project.description}</p>

                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm text-primary font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="gradient-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${project.progress}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="space-y-3">
                      {project.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.7 + detailIndex * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-muted-foreground text-sm">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <AdvancedButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                        Follow Progress
                      </AdvancedButton>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      "quote": "Had the most flawless experience with Abstraction Studios. It was as if they understood our vision through telepathy and incorporated it in their art.",
      "author": "Muhammad Ahmad",
      "company": "Takhayyul Productions",
      "role": "Founder/CEO",
      "avatar": "/placeholder.svg?height=80&width=80",
      "rating": 5
    },
    {
      "quote": "Working with Abstraction Studios was like having a crystal ball into the future of digital experiences. They brought our wildest dreams to life with stunning precision.",
      "author": "Sameer Bhai",
      "company": "Future Dynamics",
      "role": "Head of Marketing",
      "avatar": "/placeholder.svg?height=80&width=80",
      "rating": 5
    },
    {
      quote:
        "Working with Abstraction Studios was like having a crystal ball into the future of digital experiences. They brought our wildest dreams to life with stunning precision.",
      author: "Emily Watson",
      company: "Future Dynamics",
      role: "Head of Marketing",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Client <span className="text-primary">Love</span>
          </h2>
          <p className="text-xl text-muted-foreground">What our partners say about their transformation journey</p>
        </motion.div>

        <ModernCard variant="gradient" className="max-w-4xl mx-auto">
          <div className="p-12">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: 45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -45 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Star className="w-6 h-6 text-primary fill-current mx-1" />
                  </motion.div>
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
                  "{testimonials[currentIndex].quote}"
                </motion.span>
              </blockquote>
              <motion.div
                className="flex items-center justify-center space-x-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg text-primary">{testimonials[currentIndex].author}</div>
                  <div className="text-foreground">{testimonials[currentIndex].role}</div>
                  <div className="text-muted-foreground text-sm">{testimonials[currentIndex].company}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </ModernCard>

        <div className="flex justify-center space-x-4 mt-12">
          <AdvancedButton
            variant="ghost"
            size="sm"
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={prevTestimonial}
          >
            Previous
          </AdvancedButton>
          <AdvancedButton
            variant="ghost"
            size="sm"
            icon={<ChevronRight className="w-4 h-4" />}
            onClick={nextTestimonial}
          >
            Next
          </AdvancedButton>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const stats = [
    { number: "150+", label: "Projects", icon: <Rocket className="w-5 h-5" /> },
    { number: "98%", label: "Satisfaction", icon: <Target className="w-5 h-5" /> },
    { number: "50+", label: "Awards", icon: <Star className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <Sparkles className="w-5 h-5" /> },
  ]

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Creative{" "}
              <span className="text-primary">Philosophy</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe in the power of <span className="text-primary font-medium">abstraction</span> to reveal
              deeper truths. Our approach combines strategic thinking with creativity to produce work that 
              looks extraordinary and drives real results.
            </p>
            <p className="text-base text-muted-foreground mb-8">
              Every project is an opportunity to push boundaries and create something unique. 
              We don't just follow trends—we set them.
            </p>
            <AdvancedButton variant="gradient" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Our Story
            </AdvancedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <ModernCard variant="minimal" className="overflow-hidden mb-6">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="About Abstraction Studios"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </ModernCard>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <ModernCard variant="minimal" hover={false}>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center mb-1 text-primary">{stat.icon}</div>
                      <div className="text-lg font-bold mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const teamMembers = [
    {
      name: "Abdullah Mastoor",
      role: "Creative Director",
      tags: ["Design Strategy", "Brand Identity", "Creative Vision"],
      image: "/images/mastoor.png?height=400&width=400",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "bg-purple-500",
      quote: "Design is not just what it looks like—it's how it works and how it makes you feel.",
      experience: "5+ Years"
    },
    {
      name: "Abdullah Khan",
      role: "Lead Developer",
      tags: ["Full-Stack Development", "System Architecture", "Performance"],
      image: "/images/abdullah.png?height=400&width=400",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "bg-blue-500",
      quote: "Code is poetry written in logic, crafted to solve real human problems.",
      experience: "6+ Years"
    },
    {
      name: "Muhammad Zaid",
      role: "UX/UI Designer",
      tags: ["User Experience", "Interface Design", "Prototyping"],
      image: "/images/zaid.png?height=400&width=400",
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "bg-emerald-500",
      quote: "Great design is invisible—it just feels right and works beautifully.",
      experience: "4+ Years"
    },
    {
      name: "Musa Kazmi",
      role: "Marketing Strategist",
      tags: ["Digital Marketing", "Growth Strategy", "Brand Management"],
      image: "/placeholder.svg?height=400&width=400",
      color: "from-orange-500/20 to-red-500/20",
      accent: "bg-orange-500",
      quote: "Every brand has a story—I help them tell it in ways that matter.",
      experience: "5+ Years"
    }
  ]

  return (
    <section id="team" ref={ref} className="py-20 px-6 bg-gradient-to-br from-background via-muted/5 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Interactive Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Meet The Creators
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Our Creative
            <br />
            <span className="text-primary">Collective</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four minds, one vision. We blend creativity, technology, and strategy to craft 
            digital experiences that don't just look amazing—they <em>feel</em> extraordinary.
          </p>
        </motion.div>

        {/* Interactive Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="relative group"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
            >
              <ModernCard 
                variant="gradient" 
                className={`overflow-hidden h-full cursor-pointer transition-all duration-500 ${
                  hoveredMember === index 
                    ? 'scale-105 shadow-2xl' 
                    : hoveredMember !== null 
                      ? 'scale-95 opacity-75' 
                      : 'scale-100'
                }`}
              >
                <div className="relative p-6">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Profile Section */}
                  <div className="relative z-10">
                    <div className="relative mb-6">
                      <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Floating Icons */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            {index === 0 && <Palette className="w-8 h-8 text-white" />}
                            {index === 1 && <Code className="w-8 h-8 text-white" />}
                            {index === 2 && <Brush className="w-8 h-8 text-white" />}
                            {index === 3 && <TrendingUp className="w-8 h-8 text-white" />}
                          </div>
                        </div>
                      </div>
                      
                      {/* Status & Experience Badge */}
                      <div className="absolute -bottom-2 -right-2 flex items-center gap-1">
                        <div className={`w-3 h-3 ${member.accent} rounded-full animate-pulse`}></div>
                        <span className="text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full font-medium">
                          {member.experience}
                        </span>
                      </div>
                    </div>
                    
                    {/* Member Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-4 opacity-80">
                        {member.role}
                      </p>
                      
                      {/* Animated Tags */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: (index * 0.2) + (tagIndex * 0.1) + 0.5 }}
                            className="px-2 py-1 text-xs bg-muted/50 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Quote */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredMember === index ? 1 : 0,
                      y: hoveredMember === index ? 0 : 20
                    }}
                    className="absolute inset-x-4 bottom-4 z-20"
                  >
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                      <p className="text-xs italic text-muted-foreground">
                        "{member.quote}"
                      </p>
                    </div>
                  </motion.div>
                </div>
              </ModernCard>

              {/* Interactive Connections */}
              {hoveredMember === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -inset-4 border-2 border-primary/30 rounded-3xl pointer-events-none"
                ></motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dynamic Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { number: "20+", label: "Years Combined", icon: <Clock className="w-6 h-6" /> },
              { number: "200+", label: "Projects Delivered", icon: <Rocket className="w-6 h-6" /> },
              { number: "4", label: "Creative Minds", icon: <Brain className="w-6 h-6" /> },
              { number: "∞", label: "Possibilities", icon: <Sparkles className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-center p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-center"
          >
            <AdvancedButton 
              variant="gradient" 
              size="lg" 
              icon={<ArrowRight className="w-5 h-5" />}
              className="group"
            >
              <span className="group-hover:mr-2 transition-all">Ready to Create Magic?</span>
            </AdvancedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Let's Create{" "}
            <span className="text-primary relative">
              Together
              <motion.div
                className="absolute -inset-4 bg-primary/10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your vision into reality? Let's start a conversation that could change everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ModernCard variant="glass">
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
                <div className="space-y-8">
                  <motion.div
                    className="flex items-center space-x-4 group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                      <Send className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">hello@abstractionstudios.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Schedule a Call</h4>
                      <p className="text-muted-foreground">Book a free 30-minute consultation</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Office</h4>
                      <p className="text-muted-foreground">
                        123 Creative District
                        <br />
                        Innovation City, IC 12345
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ModernCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ModernCard variant="gradient">
              <div className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Input
                        placeholder="Your Name"
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-12 focus:border-primary transition-colors"
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-12 focus:border-primary transition-colors"
                      />
                    </motion.div>
                  </div>
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Input
                      placeholder="Project Type"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-12 focus:border-primary transition-colors"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Textarea
                      placeholder="Tell us about your project vision..."
                      rows={6}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors resize-none"
                    />
                  </motion.div>
                  <AdvancedButton variant="gradient" size="lg" className="w-full" icon={<Send className="w-4 h-4" />}>
                    Send Message
                  </AdvancedButton>
                </form>
              </div>
            </ModernCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Add these type definitions before the PortfolioSection component
interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
  stats: {
    views: string;
    engagement: string;
  };
  duration?: string;
  videoId?: string;
}

// Add the projects array definition
const projects: Project[] = [
  // Social Media Projects
  {
    title: "Gnosis Olympus Edition",
    category: "social",
    description: "Viral social media campaign achieving 5M+ peak views",
    image: "/projects/gnosis/2.webp?height=400&width=600",
    tags: ["Social Media", "Viral Marketing", "STEM"],
    slug: "gnosis",
    stats: { views: "5M+", engagement: "12.8%" },
  },
  {
    title: "Muhaarib",
    category: "social",
    description: "Islamic fitness community social media growth",
    image: "/projects/gnosis/1.webp?height=400&width=600",
    tags: ["Fitness", "Community", "Islamic"],
    slug: "muhaarib",
    stats: { views: "2.3M", engagement: "15.2%" },
  },
  // Brand Identity Projects
  {
    title: "Misaal Brand Identity",
    category: "branding",
    description: "Complete brand identity design and guidelines",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Branding", "Logo Design", "Visual Identity"],
    slug: "misaal-brand-identity",
    stats: { views: "1.5M", engagement: "8.5%" },
  },
  {
    title: "Zerochill Brand Identity",
    category: "branding",
    description: "Modern logo designs and brand systems",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Branding", "Visual Identity", "Design Systems"],
    slug: "zerochill",
    stats: { views: "2.1M", engagement: "9.8%" },
  },
  // Website Projects
  {
    title: "GradusPP Website",
    category: "web",
    description: "Modern corporate website with interactive elements",
    image: "projects/websites/graduss.webp?height=400&width=600",
    tags: ["Web Design", "Development", "UI/UX"],
    slug: "graduspp",
    stats: { views: "3.2M", engagement: "10.2%" },
  },
  {
    title: "Abstraction Website",
    category: "web",
    description: "Comprehensive digital interface designs",
    image: "projects/websites/abstraction.webp?height=400&width=600",
    tags: ["UI/UX", "Design Systems", "Digital"],
    slug: "abstraction",
    stats: { views: "1.8M", engagement: "11.5%" },
  },
  {
    title: "Misaal Website",
    category: "web",
    description: "Comprehensive digital interface designs",
    image: "projects/websites/misaal.webp?height=400&width=600",
    tags: ["UI/UX", "Design Systems", "Digital"],
    slug: "misaalbcpjt",
    stats: { views: "1.8M", engagement: "11.5%" },
  },

  // Video Production Projects
  {
    title: "Gnosis Trailer",
    category: "video",
    description: "Promotional trailer showcasing innovation and discovery",
    image: "/placeholder.svg?height=400&width=600",
    videoId: "1087566254",
    tags: ["Video Production", "Event Promotion", "STEM"],
    slug: "gnosis-trailer",
    stats: { views: "1.2M", engagement: "9.5%" },
    duration: "2:30",
  },
  {
    title: "Misaal Trailer",
    category: "video",
    description: "Professional conference trailer highlighting diplomatic excellence",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Video Production", "Conference", "Diplomacy"],
    videoId: "1087622157",
    slug: "misaal-trailer",
    stats: { views: "620K", engagement: "8.2%" },
    duration: "2:15",
  },
  {
    title: "BCPMUN Trailer",
    category: "video",
    description: "Professional conference trailer highlighting diplomatic excellence",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Video Production", "Conference", "Diplomacy"],
    slug: "bcpmun",
    videoId: "1087622639",
    stats: { views: "620K", engagement: "8.2%" },
    duration: "2:15",
  },

  // Graphics & Print Projects
];

// Update the PortfolioSection component to use the Project type
function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 2

  // Memoize categories
  const categories = useMemo(() => [
    { id: "all", label: "All Work", icon: <Sparkles className="w-4 h-4" /> },
    { id: "branding", label: "Brand Identity", icon: <Palette className="w-4 h-4" /> },
    { id: "social", label: "Social Media", icon: <Megaphone className="w-4 h-4" /> },
    { id: "web", label: "Websites", icon: <Globe className="w-4 h-4" /> },
    { id: "video", label: "Video Production", icon: <Video className="w-4 h-4" /> },
    { id: "graphics", label: "Graphics & Print", icon: <Brush className="w-4 h-4" /> },
    { id: "misc", label: "Misc", icon: <Zap className="w-4 h-4" /> },
  ], [])

  // Memoize filtered projects with proper typing
  const filteredProjects = useMemo(() => 
    activeCategory === "all" 
      ? projects 
      : projects.filter((project: Project) => project.category === activeCategory),
    [activeCategory]
  )

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const currentProjects = useMemo(() => 
    filteredProjects.slice(
      (currentPage - 1) * projectsPerPage,
      currentPage * projectsPerPage
    ),
    [filteredProjects, currentPage, projectsPerPage]
  )

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  // Memoize category change handler
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
  }, [])

  // Memoize page change handlers
  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const renderProjectCard = useCallback((project: Project, index: number) => {
    const key = `${project.category}-${project.slug}-${index}`
    switch (project.category) {
      case "video":
        return <VideoCard key={key} project={project} index={index} isInView={isInView} />
      case "branding":
        return <BrandingCard key={key} project={project} index={index} isInView={isInView} />
      case "social":
        return <SocialCard key={key} project={project} index={index} isInView={isInView} />
      case "web":
        return <WebsiteCard key={key} project={project} index={index} isInView={isInView} />
      case "graphics":
        return <GraphicsCard key={key} project={project} index={index} isInView={isInView} />
      default:
        return <DefaultCard key={key} project={project} index={index} isInView={isInView} />
    }
  }, [isInView])

  return (
    <section id="work" ref={ref} className="py-32 px-6 bg-muted/10 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our latest creative endeavors and digital innovations that have redefined industries
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {currentProjects.map((project, index) => renderProjectCard(project, index))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
            <AdvancedButton
              variant="ghost"
              size="sm"
              icon={<ChevronLeft className="w-4 h-4" />}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </AdvancedButton>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <AdvancedButton
              variant="ghost"
              size="sm"
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </AdvancedButton>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <AdvancedButton variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            View All Projects
          </AdvancedButton>
        </motion.div>
      </div>
    </section>
  )
}

// Add this custom hook for optimized cursor movement
function useOptimizedCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number>()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          setCursorPosition({ x: e.clientX, y: e.clientY })
        })
      }
    }
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }
    return () => {
      window.removeEventListener("resize", checkMobile)
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isMobile])
  return { cursorPosition, isHovering, setIsHovering, isMobile }
}

// Add this nav config at the top of the file:
const navItems = [
  { id: "work", label: "Work", icon: <Sparkles className="w-5 h-5" /> },
  { id: "services", label: "Services", icon: <Palette className="w-5 h-5" /> },
  { id: "about", label: "About", icon: <Users className="w-5 h-5" /> },
  { id: "contact", label: "Contact", icon: <Send className="w-5 h-5" /> },
]

// Update the HomePage component to use the optimized cursor
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const { cursorPosition, isHovering, setIsHovering, isMobile } = useOptimizedCursor()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const isLowPerformance = usePerformanceOptimization()

  // Navigation state and handler (must be inside component)
  const [activeNav, setActiveNav] = useState("work")
  const handleNavClick = (id: string) => {
    setActiveNav(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Render custom cursor and ripples at the root (outside main content)
  // Render custom cursor and ripples at the root (outside main content)
  const cursorPortal = !isMobile && typeof window !== "undefined"
    ? createPortal(
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50"
          animate={{
            x: cursorPosition.x - 12,
            y: cursorPosition.y - 12,
            scale: isHovering ? 1.4 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{ borderRadius: "50%", background: "#D84628", boxShadow: "0 2px 12px 0 #D8462840" }}
        />,
        document.body
      )
    : null

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden relative">
      {cursorPortal}
      {/* Navigation */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          className="flex gap-2 px-6 py-3 rounded-full shadow-xl backdrop-blur-lg bg-white/70 dark:bg-[#181717]/80 border border-white/30 dark:border-[#232222]/60"
          style={{ minWidth: 320 }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative flex flex-col items-center px-4 py-1 group transition-all duration-200 ${activeNav === item.id ? "text-[#D84628]" : "text-muted-foreground"}`}
              style={{ outline: "none" }}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-xs font-medium mt-1">{item.label}</span>
              {activeNav === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#D84628]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Hero Section with optimized 3D */}
      <HeroSection 
        isLowPerformance={isLowPerformance} 
        scrollProgress={scrollYProgress}
        setIsHovering={setIsHovering}
      />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Services Section with optimized 3D */}
      <ServicesSection 
        scrollProgress={scrollYProgress} 
        isLowPerformance={isLowPerformance} 
      />

      {/* Rest of the sections */}
      <CurrentProjectsSection />
      <TestimonialsSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </div>
  )
}
