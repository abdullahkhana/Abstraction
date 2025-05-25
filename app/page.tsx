"use client"

import { useEffect, useRef, useState, Suspense, lazy } from "react"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!isMobile) {
        const newRipple = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        }
        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
        }, 1000)
      }
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("click", handleClick)
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("click", handleClick)
      }
    }
  }, [isMobile])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden relative">
      {/* Advanced Custom Cursor - Desktop only */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
            scale: isHovering ? 2 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <div className="w-full h-full bg-primary rounded-full relative">
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              animate={{
                scale: isHovering ? [1, 1.5, 1] : 1,
                opacity: isHovering ? [0.8, 0.3, 0.8] : 0.8,
              }}
              transition={{ duration: 0.6, repeat: isHovering ? Number.POSITIVE_INFINITY : 0 }}
            />
          </div>
        </motion.div>
      )}

      {/* Ripple Effects - Desktop only */}
      {!isMobile &&
        ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-12 h-12 border-2 border-primary rounded-full" />
          </motion.div>
        ))}

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 p-6 backdrop-blur-md bg-background/20"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            onHoverStart={() => !isMobile && setIsHovering(true)}
            onHoverEnd={() => !isMobile && setIsHovering(false)}
          >
            <Image src="/logo.png" alt="Abstraction Studios" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Abstraction Studios
            </span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex space-x-8">
              {["Work", "Services", "About", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors relative"
                  whileHover={!isMobile ? { y: -2 } : {}}
                  onHoverStart={() => !isMobile && setIsHovering(true)}
                  onHoverEnd={() => !isMobile && setIsHovering(false)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                    whileHover={!isMobile ? { width: "100%" } : {}}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D Background */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* 3D Background - Reduced complexity on mobile */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />}>
            <SceneWrapper>
              {!isMobile && <ParticleField />}
              <FloatingElements />
              <ScrollTriggered3D scrollProgress={scrollYProgress} />
            </SceneWrapper>
          </Suspense>
        </div>

        {/* Animated Background Gradients */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, hsl(var(--primary)) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: isMobile ? 20 : 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
              CREATIVE
            </motion.span>
            <motion.span
              className="block text-primary relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              ABSTRACTION
              {!isMobile && (
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
              size={isMobile ? "lg" : "xl"}
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => !isMobile && setIsHovering(true)}
            >
              Explore Our Universe
            </AdvancedButton>
            <AdvancedButton
              variant="secondary"
              size={isMobile ? "lg" : "xl"}
              icon={<Play className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => !isMobile && setIsHovering(true)}
            >
              Watch Our Reel
            </AdvancedButton>
          </motion.div>
        </div>

        {!isMobile && (
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

      {/* Update portfolio section to include Zero Chill */}
      <PortfolioSection />

      {/* Rest of the sections... */}
      <ServicesSection scrollProgress={scrollYProgress} />
      <DesignGallerySection />
      <VideographySection />
      <CurrentProjectsSection />
      <TestimonialsSection />
      <AboutSection />
      <TeamSection />
      <TimelineSection />
      <ContactSection />
    </div>
  )
}

// Update PortfolioSection to include Zero Chill
function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: "Zero Chill",
      category: "Video Production",
      description: "Cinematic masterpiece with 2.8M+ views and award-winning cinematography",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Video", "Cinematography", "Awards"],
      slug: "zero-chill",
      stats: { views: "2.8M", engagement: "18.5%" },
    },
    {
      title: "Gnosis STEM Event",
      category: "Social Media Management",
      description: "Viral social media campaign achieving 5M+ peak views",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Social Media", "Viral Marketing", "STEM"],
      slug: "gnosis",
      stats: { views: "5M+", engagement: "12.8%" },
    },
    {
      title: "VR Muhaarib",
      category: "Social Media Management",
      description: "Islamic fitness community social media growth",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Fitness", "Community", "Islamic"],
      slug: "vr-muhaarib",
      stats: { views: "2.3M", engagement: "15.2%" },
    },
    {
      title: "Misaal Multi-Category Event",
      category: "Web Development + Social Media",
      description: "Complete website development and social media management",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Website", "Events", "Full Service"],
      slug: "misaal",
      stats: { views: "1.8M", engagement: "10.5%" },
    },
    {
      title: "Gradus AI Examination",
      category: "Web Development + App Design",
      description: "AI-powered examination platform in development",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["AI", "Education", "Platform"],
      slug: "gradus",
      stats: { status: "In Development", progress: "75%" },
    },
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="group cursor-pointer perspective-1000"
            >
              <Link href={`/project/${project.slug}`}>
                <ModernCard variant="glass" className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Stats overlay */}
                    <div className="absolute top-4 right-4 flex space-x-4">
                      <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs text-white">{project.stats.views || project.stats.status}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs text-white">{project.stats.engagement || project.stats.progress}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <motion.p
                        className="text-primary text-sm font-semibold mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.category}
                      </motion.p>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <motion.p
                        className="text-white/80 text-sm mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {project.description}
                      </motion.p>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </ModernCard>
              </Link>
            </motion.div>
          ))}
        </div>

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

function ServicesSection({ scrollProgress }: { scrollProgress: any }) {
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
      {/* 3D Background Element */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Suspense fallback={null}>
          <SceneWrapper>
            <motion.group style={{ y }}>
              <InteractiveSphere />
            </motion.group>
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

function DesignGallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const designs = [
    {
      title: "Brand Identity Collection",
      description: "Modern logo designs and brand systems",
      category: "Branding",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "UI/UX Design Systems",
      description: "Comprehensive digital interface designs",
      category: "Digital",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Print & Packaging",
      description: "Creative print solutions and packaging design",
      category: "Print",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Social Media Graphics",
      description: "Engaging visual content for social platforms",
      category: "Social",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Motion Graphics",
      description: "Animated designs and visual effects",
      category: "Motion",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Illustration & Art",
      description: "Custom illustrations and artistic creations",
      category: "Art",
      image: "/placeholder.svg?height=300&width=400",
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
            Design <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of our creative designs across various mediums and industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, index) => (
            <motion.div
              key={design.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <ModernCard variant="minimal" className="overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={design.image || "/placeholder.svg"}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground">
                      {design.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-bold text-white mb-1">{design.title}</h3>
                    <p className="text-white/80 text-sm">{design.description}</p>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <AdvancedButton variant="secondary" size="lg" icon={<Brush className="w-5 h-5" />}>
            View Full Gallery
          </AdvancedButton>
        </motion.div>
      </div>
    </section>
  )
}

function VideographySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const trailers = [
    {
      title: "Zero Chill",
      description: "Award-winning cinematic masterpiece with stunning visuals",
      duration: "3:45",
      views: "2.8M",
      category: "Cinematic Production",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Gnosis STEM Event",
      description: "Promotional trailer showcasing innovation and discovery",
      duration: "2:30",
      views: "1.2M",
      category: "Event Promotion",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Misaal XI",
      description: "Dynamic event trailer capturing the energy and excitement",
      duration: "1:45",
      views: "850K",
      category: "Event Trailer",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "BCPMUN",
      description: "Professional conference trailer highlighting diplomatic excellence",
      duration: "2:15",
      views: "620K",
      category: "Conference",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 bg-muted/10 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Video <span className="text-primary">Production</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cinematic trailers and promotional videos that capture attention and drive engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trailers.map((trailer, index) => (
            <motion.div
              key={trailer.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <ModernCard variant="glass" className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={trailer.image || "/placeholder.svg"}
                    alt={trailer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Play button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </motion.div>

                  {/* Video info overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                      {trailer.category}
                    </span>
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white">
                      {trailer.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{trailer.title}</h3>
                    <p className="text-white/80 text-sm mb-2">{trailer.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {trailer.views} views
                      </span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <AdvancedButton variant="secondary" size="lg" icon={<Camera className="w-5 h-5" />}>
            View All Videos
          </AdvancedButton>
        </motion.div>
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
      status: "In Production",
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
      quote:
        "Abstraction Studios didn't just meet our expectations—they completely redefined what we thought was possible. Their creative vision transformed our entire brand ecosystem.",
      author: "Sarah Chen",
      company: "TechFlow Inc.",
      role: "CEO & Founder",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The team's ability to blend cutting-edge technology with artistic vision resulted in a campaign that drove 300% engagement increase and won multiple industry awards.",
      author: "Marcus Rodriguez",
      company: "Innovate Labs",
      role: "Creative Director",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
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
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { number: "150+", label: "Projects Delivered", icon: <Rocket className="w-6 h-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Target className="w-6 h-6" /> },
    { number: "50+", label: "Awards Won", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Creative Support", icon: <Sparkles className="w-6 h-6" /> },
  ]

  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-muted/10 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Suspense fallback={null}>
          <SceneWrapper>
            <MorphingGeometry />
          </SceneWrapper>
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Creative{" "}
              <span className="text-primary relative">
                Philosophy
                <motion.div
                  className="absolute -inset-4 bg-primary/10 blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
              </span>
            </h2>
            <motion.p
              className="text-xl text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              We believe in the power of <span className="text-primary font-semibold">abstraction</span> to reveal
              deeper truths. Our approach combines strategic thinking with boundless creativity to produce work that not
              only looks extraordinary but drives real, measurable results.
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Every project is an opportunity to push boundaries, challenge conventions, and create something that has
              never existed before. We don't just follow trends—we set them, break them, and create entirely new
              paradigms.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <AdvancedButton variant="gradient" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Discover Our Story
              </AdvancedButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative perspective-1000"
          >
            <ModernCard variant="neon" className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="About Abstraction Studios"
                  fill
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </ModernCard>

            {/* Floating stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: 1 + index * 0.1 }}
                >
                  <ModernCard variant="minimal" hover={false}>
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2 text-primary">{stat.icon}</div>
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const teamMembers = [
    {
      name: "Abdullah Mastoor",
      role: "Creative Director & Brand Strategist",
      title: "Creative Visionary",
      bio: "Visionary leader with 8+ years of experience in creative direction and brand strategy. Abdullah's innovative approach to design thinking has shaped the creative landscape for dozens of Fortune 500 companies.",
      image: "/placeholder.svg?height=600&width=400",
      experience: "8+ years in Creative Direction & Brand Strategy",
      location: "New York, USA",
      joinedYear: "2019",
      expertise: ["Creative Direction", "Brand Strategy", "Design Thinking", "Team Leadership", "Client Relations"],
      achievements: [
        "Led creative strategy for 50+ Fortune 500 companies",
        "Winner of 15+ international design awards",
        "Featured speaker at Creative Week NYC 2023",
        "Mentor to 100+ emerging designers",
        "Published thought leader in Design Magazine",
      ],
      social: {
        linkedin: "https://linkedin.com/in/abdullah-mastoor",
        twitter: "https://twitter.com/abdullahmastoor",
        email: "abdullah@abstractionstudios.com",
      },
      stats: {
        projectsLed: 85,
        yearsExperience: 8,
        clientSatisfaction: 98,
      },
    },
    {
      name: "Zaid Sheikh",
      role: "Technical Director & Innovation Lead",
      title: "Technology Pioneer",
      bio: "Technology innovator and full-stack architect with expertise in cutting-edge web technologies, AI integration, and scalable digital solutions. Zaid bridges the gap between creative vision and technical excellence.",
      image: "/placeholder.svg?height=600&width=400",
      experience: "10+ years in Full-Stack Development & Technical Architecture",
      location: "San Francisco, USA",
      joinedYear: "2019",
      expertise: ["Full-Stack Development", "AI Integration", "Cloud Architecture", "DevOps", "Technical Strategy"],
      achievements: [
        "Architected 100+ scalable web applications",
        "Pioneer in AI-assisted design tools",
        "Holds 3 patents in creative technology",
        "Keynote speaker at TechCrunch Disrupt 2023",
        "Contributed to 10+ open-source projects",
      ],
      social: {
        linkedin: "https://linkedin.com/in/zaid-sheikh",
        twitter: "https://twitter.com/zaidsheikh",
        email: "zaid@abstractionstudios.com",
      },
      stats: {
        projectsLed: 120,
        yearsExperience: 10,
        clientSatisfaction: 97,
      },
    },
    {
      name: "Abdullah Khan",
      role: "Strategy Director & Growth Architect",
      title: "Business Strategist",
      bio: "Strategic mastermind with deep expertise in business development, market analysis, and growth strategy. Abdullah ensures every creative decision aligns with measurable business outcomes and sustainable growth.",
      image: "/placeholder.svg?height=600&width=400",
      experience: "7+ years in Business Strategy & Growth Marketing",
      location: "London, UK",
      joinedYear: "2019",
      expertise: ["Business Strategy", "Growth Marketing", "Market Analysis", "Partnership Development", "Operations"],
      achievements: [
        "Scaled company revenue from $0 to $5M+",
        "Established partnerships with 25+ global brands",
        "Led expansion into 3 international markets",
        "MBA from London Business School",
        "Featured in Forbes 30 Under 30 list",
      ],
      social: {
        linkedin: "https://linkedin.com/in/abdullah-khan",
        twitter: "https://twitter.com/abdullahkhan",
        email: "abdullah.khan@abstractionstudios.com",
      },
      stats: {
        projectsLed: 95,
        yearsExperience: 7,
        clientSatisfaction: 99,
      },
    },
    {
      name: "Musa Kazmi",
      role: "Digital Marketing Specialist & Content Creator",
      title: "Digital Innovator",
      bio: "Dynamic digital marketing expert specializing in viral content creation, social media strategy, and performance marketing. Musa's data-driven approach has generated millions of views and unprecedented engagement rates.",
      image: "/placeholder.svg?height=600&width=400",
      experience: "5+ years in Digital Marketing & Content Strategy",
      location: "Dubai, UAE",
      joinedYear: "2021",
      expertise: [
        "Social Media Marketing",
        "Content Creation",
        "Performance Marketing",
        "Analytics",
        "Viral Campaigns",
      ],
      social: {
        linkedin: "https://linkedin.com/in/musa-kazmi",
        twitter: "https://twitter.com/musakazmi",
        email: "musa@abstractionstudios.com",
      },
      stats: {
        projectsLed: 65,
        yearsExperience: 5,
        clientSatisfaction: 96,
      },
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
            Meet Our{" "}
            <span className="text-primary relative">
              Team
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
            The creative minds behind Abstraction Studios, united by a passion for pushing creative boundaries and
            transforming digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Suspense key={member.name} fallback={<div className="h-[600px] bg-muted rounded-2xl animate-pulse" />}>
              <TeamCard member={member} index={index} />
            </Suspense>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20"
        >
          <ModernCard variant="gradient" className="max-w-4xl mx-auto">
            <div className="p-12">
              <h3 className="text-3xl font-bold text-center mb-12">Collective Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">365+</div>
                  <div className="text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <div className="text-muted-foreground">Years Combined Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">75+</div>
                  <div className="text-muted-foreground">Awards Won</div>
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 px-6 bg-muted/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/80 rounded-full blur-3xl" />
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
              Journey
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
            From a small studio apartment to a global creative powerhouse. Explore the milestones that shaped our
            evolution and defined our mission.
          </p>
        </motion.div>

        <Suspense fallback={<div className="h-96 bg-muted rounded-2xl animate-pulse" />}>
          <InteractiveTimeline />
        </Suspense>
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
