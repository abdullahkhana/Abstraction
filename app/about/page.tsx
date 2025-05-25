"use client"

import { useRef } from "react"
import { motion, useScroll, useInView, useTransform } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Rocket,
  Target,
  Sparkles,
  Users,
  Globe,
  Award,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const stats = [
    { number: "150+", label: "Projects Delivered", icon: <Rocket className="w-8 h-8" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Target className="w-8 h-8" /> },
    { number: "50+", label: "Awards Won", icon: <Award className="w-8 h-8" /> },
    { number: "24/7", label: "Creative Support", icon: <Sparkles className="w-8 h-8" /> },
  ]

  const values = [
    {
      title: "Innovation First",
      description: "We push boundaries and challenge conventions to create groundbreaking solutions.",
      icon: <Zap className="w-12 h-12" />,
      color: "text-primary",
    },
    {
      title: "Client Partnership",
      description: "Your success is our success. We build lasting relationships based on trust and results.",
      icon: <Heart className="w-12 h-12" />,
      color: "text-red-500",
    },
    {
      title: "Creative Excellence",
      description: "Every pixel, every frame, every interaction is crafted with meticulous attention to detail.",
      icon: <Star className="w-12 h-12" />,
      color: "text-yellow-500",
    },
    {
      title: "Global Impact",
      description: "We create solutions that transcend borders and connect with audiences worldwide.",
      icon: <Globe className="w-12 h-12" />,
      color: "text-blue-500",
    },
  ]

  const milestones = [
    { year: "2019", title: "Founded", description: "Three visionaries unite to revolutionize creative design" },
    { year: "2020", title: "Digital Transformation", description: "Pivoted to remote-first and expanded capabilities" },
    { year: "2021", title: "Award Recognition", description: "Won multiple industry awards and gained recognition" },
    { year: "2022", title: "Global Expansion", description: "Opened international offices and scaled operations" },
    { year: "2023", title: "Innovation Lab", description: "Launched cutting-edge technology research division" },
    { year: "2024", title: "Future Forward", description: "Leading the next decade of creative innovation" },
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
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Abstraction Studios" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold">Abstraction Studios</span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
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
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
              About <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a collective of creative minds, technical innovators, and strategic thinkers united by a shared
              passion for transforming visions into extraordinary digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <AdvancedButton variant="primary" size="lg" icon={<Users className="w-5 h-5" />}>
              Meet Our Team
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="lg" icon={<TrendingUp className="w-5 h-5" />}>
              Our Journey
            </AdvancedButton>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="gradient" className="text-center">
                  <div className="p-8">
                    <div className="text-primary mb-4 flex justify-center">{stat.icon}</div>
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2019 by three visionary creators—Abdullah Mastoor, Zaid Sheikh, and Abdullah Khan—
                  Abstraction Studios emerged from a shared belief that creativity and technology could be seamlessly
                  merged to create extraordinary experiences.
                </p>
                <p>
                  What started as a small studio apartment venture has evolved into a global creative powerhouse,
                  serving clients across continents and industries. Our journey has been marked by continuous
                  innovation, unwavering dedication to excellence, and an insatiable curiosity to push the boundaries of
                  what's possible.
                </p>
                <p>
                  Today, we stand as pioneers in the creative industry, combining cutting-edge technology with artistic
                  vision to deliver solutions that not only meet expectations but redefine them entirely.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="neon" className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src="/placeholder.svg?height=600&width=600" alt="Our Story" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision, every project, and every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="glass" className="h-full">
                  <div className="p-8">
                    <div className={`${value.color} mb-6`}>{value.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones that have shaped our evolution and defined our mission.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <ModernCard variant="gradient">
                      <div className="p-6">
                        <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </ModernCard>
                  </div>

                  {/* Timeline marker */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>

                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create <span className="text-primary">Together</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's transform your vision into reality with our expertise and passion for innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <AdvancedButton variant="gradient" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                  Start Your Project
                </AdvancedButton>
              </Link>
              <Link href="/#work">
                <AdvancedButton variant="secondary" size="xl" icon={<Star className="w-5 h-5" />}>
                  View Our Work
                </AdvancedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
