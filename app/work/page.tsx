"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Eye, TrendingUp, Filter, Grid, List, Search, ExternalLink, Play, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function WorkPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const categories = ["All", "Branding", "Web Development", "Video Production", "Social Media", "E-commerce"]

  const projects = [
    {
      title: "Zero Chill",
      category: "Video Production",
      description: "Award-winning cinematic masterpiece with 2.8M+ views and stunning cinematography",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Video", "Cinematography", "Awards"],
      slug: "zero-chill",
      stats: { views: "2.8M", engagement: "18.5%" },
      featured: true,
      awards: ["Best Cinematography", "Audience Choice"],
    },
    {
      title: "Gnosis STEM Event",
      category: "Social Media",
      description: "Viral social media campaign achieving 5M+ peak views across multiple platforms",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Social Media", "Viral Marketing", "STEM"],
      slug: "gnosis",
      stats: { views: "5M+", engagement: "12.8%" },
      featured: true,
      awards: [],
    },
    {
      title: "Nexus Brand Identity",
      category: "Branding",
      description: "Complete brand transformation for a cutting-edge tech startup",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Brand Identity", "Logo Design", "Tech"],
      slug: "nexus",
      stats: { views: "1.2M", engagement: "15.3%" },
      featured: false,
      awards: ["Design Excellence"],
    },
    {
      title: "VR Muhaarib",
      category: "Social Media",
      description: "Islamic fitness community social media growth and engagement strategy",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Fitness", "Community", "Islamic"],
      slug: "vr-muhaarib",
      stats: { views: "2.3M", engagement: "15.2%" },
      featured: false,
      awards: [],
    },
    {
      title: "Misaal Multi-Category Event",
      category: "Web Development",
      description: "Complete website development and social media management for major event",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Website", "Events", "Full Service"],
      slug: "misaal",
      stats: { views: "1.8M", engagement: "10.5%" },
      featured: false,
      awards: [],
    },
    {
      title: "Gradus AI Examination",
      category: "Web Development",
      description: "AI-powered examination platform with advanced analytics and user management",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["AI", "Education", "Platform"],
      slug: "gradus",
      stats: { status: "In Development", progress: "75%" },
      featured: false,
      awards: [],
    },
    {
      title: "TechFlow Rebrand",
      category: "Branding",
      description: "Revolutionary visual identity system for AI technology company",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Rebrand", "AI", "Technology"],
      slug: "techflow",
      stats: { views: "950K", engagement: "14.2%" },
      featured: false,
      awards: ["Innovation Award"],
    },
    {
      title: "EcoStore E-commerce",
      category: "E-commerce",
      description: "Sustainable e-commerce platform with custom shopping experience",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["E-commerce", "Sustainability", "UX"],
      slug: "ecostore",
      stats: { views: "1.5M", engagement: "16.8%" },
      featured: false,
      awards: [],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = projects.filter((project) => project.featured)

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
              Our <span className="text-primary">Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              Explore our portfolio of creative projects that have transformed brands, engaged audiences, and delivered
              exceptional results across industries and platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground">Our most impactful and award-winning work</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/project/${project.slug}`}>
                  <ModernCard variant="gradient" className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Awards Badge */}
                      {project.awards.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center space-x-1 bg-yellow-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                            <Award className="w-3 h-3 text-white" />
                            <span className="text-xs font-semibold text-white">Award Winner</span>
                          </div>
                        </div>
                      )}

                      {/* Play Button for Videos */}
                      {project.category === "Video Production" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play className="w-6 h-6 text-primary-foreground ml-1" />
                          </motion.div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <Eye className="w-3 h-3 text-white" />
                          <span className="text-xs text-white">{project.stats.views || project.stats.status}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          <span className="text-xs text-white">
                            {project.stats.engagement || project.stats.progress}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-primary text-sm font-semibold">{project.category}</span>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/80 text-sm mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/project/${project.slug}`}>
                  <ModernCard variant="glass" className={`overflow-hidden ${viewMode === "list" ? "flex" : ""}`}>
                    <div className={`${viewMode === "list" ? "w-1/3" : ""} aspect-video relative`}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground">
                          {project.category}
                        </span>
                      </div>

                      {/* External Link Icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{project.stats.views || project.stats.status}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-primary" />
                            <span>{project.stats.engagement || project.stats.progress}</span>
                          </span>
                        </div>
                        {project.awards.length > 0 && (
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Award className="w-3 h-3" />
                            <span className="text-xs">{project.awards.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </ModernCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No projects found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <AdvancedButton
                variant="secondary"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </AdvancedButton>
            </div>
          )}
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
              Ready to Create Your <span className="text-primary">Success Story</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's discuss how we can help you achieve similar results with a project tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <AdvancedButton variant="gradient" size="xl" icon={<ExternalLink className="w-5 h-5" />}>
                  Start Your Project
                </AdvancedButton>
              </Link>
              <Link href="/services">
                <AdvancedButton variant="secondary" size="xl">
                  View Our Services
                </AdvancedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
