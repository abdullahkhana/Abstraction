"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowLeft,
  ArrowRight,
  Palette,
  Globe,
  Video,
  Zap,
  Megaphone,
  Eye,
  Sparkles,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const services = [
    {
      title: "Brand Identity Design",
      description: "Crafting distinctive visual identities that resonate with your audience and stand the test of time",
      icon: <Palette className="w-12 h-12" />,
      features: [
        "Logo Design & Brand Mark Creation",
        "Comprehensive Brand Guidelines",
        "Visual Identity Systems",
        "Brand Strategy & Positioning",
        "Color Palette & Typography",
        "Brand Application Design",
      ],
      process: ["Discovery & Research", "Concept Development", "Design Refinement", "Brand Guidelines Creation"],
      deliverables: "Logo files, brand guidelines, style guide, application examples",
      timeline: "2-4 weeks",
      startingPrice: "$5,000",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "UI/UX & Web Design",
      description: "Creating intuitive digital experiences that convert visitors into loyal customers",
      icon: <Globe className="w-12 h-12" />,
      features: [
        "User Experience Research",
        "Wireframing & Prototyping",
        "Responsive Web Design",
        "E-commerce Development",
        "CMS Integration",
        "Performance Optimization",
      ],
      process: [
        "User Research & Analysis",
        "Information Architecture",
        "Design & Prototyping",
        "Development & Testing",
      ],
      deliverables: "Fully responsive website, CMS setup, analytics integration",
      timeline: "4-8 weeks",
      startingPrice: "$10,000",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Video Production",
      description: "Cinematic storytelling that brings your brand narrative to life with stunning visuals",
      icon: <Video className="w-12 h-12" />,
      features: [
        "Commercial Video Production",
        "Motion Graphics & Animation",
        "3D Visualization",
        "Post-Production & Editing",
        "Sound Design & Music",
        "Multi-Platform Optimization",
      ],
      process: [
        "Concept & Storyboarding",
        "Pre-Production Planning",
        "Filming & Production",
        "Post-Production & Delivery",
      ],
      deliverables: "Final video files, raw footage, motion graphics assets",
      timeline: "3-6 weeks",
      startingPrice: "$8,000",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Creative Campaigns",
      description: "Strategic creative solutions that drive engagement and deliver measurable results",
      icon: <Zap className="w-12 h-12" />,
      features: [
        "Campaign Strategy Development",
        "Creative Direction",
        "Multi-Channel Execution",
        "Performance Tracking",
        "A/B Testing & Optimization",
        "ROI Analysis & Reporting",
      ],
      process: ["Strategy & Planning", "Creative Development", "Campaign Launch", "Optimization & Reporting"],
      deliverables: "Campaign assets, performance reports, optimization recommendations",
      timeline: "2-12 weeks",
      startingPrice: "$15,000",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Social Media & Digital Marketing",
      description: "Engaging content that amplifies your brand voice across all digital platforms",
      icon: <Megaphone className="w-12 h-12" />,
      features: [
        "Social Media Strategy",
        "Content Creation & Curation",
        "Community Management",
        "Paid Advertising Campaigns",
        "Influencer Partnerships",
        "Analytics & Reporting",
      ],
      process: ["Audit & Strategy", "Content Planning", "Execution & Management", "Analysis & Optimization"],
      deliverables: "Content calendar, social media assets, performance reports",
      timeline: "Ongoing",
      startingPrice: "$3,000/month",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "E-commerce & App Development",
      description: "Building scalable digital products from initial concept to successful launch",
      icon: <Eye className="w-12 h-12" />,
      features: [
        "E-commerce Platform Development",
        "Mobile App Design & Development",
        "User Testing & Optimization",
        "Payment Gateway Integration",
        "Inventory Management Systems",
        "Analytics & Conversion Tracking",
      ],
      process: ["Requirements Analysis", "Design & Prototyping", "Development & Testing", "Launch & Support"],
      deliverables: "Fully functional platform/app, admin panel, documentation",
      timeline: "6-12 weeks",
      startingPrice: "$20,000",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We dive deep into your business, goals, and target audience to understand your unique needs.",
    },
    {
      step: "02",
      title: "Strategy",
      description: "We develop a comprehensive strategy that aligns with your objectives and market positioning.",
    },
    {
      step: "03",
      title: "Creation",
      description: "Our team brings the strategy to life with exceptional design and development work.",
    },
    {
      step: "04",
      title: "Delivery",
      description: "We deliver polished results on time and provide ongoing support for your success.",
    },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">
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
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, hsl(var(--primary)) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              From concept to execution, we deliver comprehensive creative solutions that push boundaries and drive
              results. Explore our full range of services designed to transform your vision into reality.
            </p>
            <AdvancedButton variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Start Your Project
            </AdvancedButton>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="gradient" className="h-full">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="text-primary">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="aspect-video relative rounded-xl overflow-hidden mb-6">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/20 rounded-xl">
                      <div>
                        <div className="text-sm text-muted-foreground">Timeline</div>
                        <div className="font-semibold">{service.timeline}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Starting at</div>
                        <div className="font-semibold text-primary">{service.startingPrice}</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex space-x-3">
                      <AdvancedButton variant="primary" size="sm" className="flex-1">
                        Get Quote
                      </AdvancedButton>
                      <AdvancedButton variant="ghost" size="sm" className="flex-1">
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

      {/* Process Section */}
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
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures exceptional results, on time and within budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="glass" className="text-center h-full">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-primary">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
                Why Choose <span className="text-primary">Us</span>?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Star className="w-6 h-6" />,
                    title: "Award-Winning Excellence",
                    description:
                      "Recognized by industry leaders with 50+ awards for creative excellence and innovation.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "Proven Results",
                    description: "98% client satisfaction rate with measurable improvements in brand performance.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Cutting-Edge Innovation",
                    description: "We stay ahead of trends and leverage the latest technologies for maximum impact.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="text-primary mt-1">{benefit.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
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
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Why Choose Us"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </ModernCard>
            </motion.div>
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
              Ready to Get <span className="text-primary">Started</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's discuss your project and create something extraordinary together. Get a free consultation and
              detailed proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <AdvancedButton variant="gradient" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                  Start Your Project
                </AdvancedButton>
              </Link>
              <AdvancedButton variant="secondary" size="xl" icon={<Star className="w-5 h-5" />}>
                View Our Work
              </AdvancedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
