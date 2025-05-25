"use client"

import { useEffect, useState, use } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, TrendingUp, Clock, Users, Target, Star } from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"

// Project data type
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
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    process: string[];
    results: string[];
    technologies: string[];
    team: {
      role: string;
      name: string;
      image: string;
    }[];
    beforeAfter?: {
      before: { image: string; caption: string };
      after: { image: string; caption: string };
    };
    colorPalette?: { hex: string; name: string; description: string }[];
    testimonials?: { quote: string; author: string; role: string }[];
    gallery: {
      caption: string;
      images: { image: string; caption: string }[];
    }[];
  };
}

// Sample project data - In a real app, this would come from an API or CMS
const projects: Record<string, Project> = {
  "graduspp": {
    title: "GradusPP Website",
    category: "web",
    description: "Modern corporate website with interactive elements",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Web Design", "Development", "UI/UX"],
    slug: "graduspp",
    stats: { views: "3.2M", engagement: "10.2%" },
    caseStudy: {
      overview: "GradusPP is a leading educational platform that needed a modern, user-friendly website to showcase their services and engage with potential students.",
      challenge: "The client needed a website that could handle complex course information, student registration, and provide an intuitive user experience across all devices.",
      solution: "We developed a custom WordPress theme with advanced features including course management, student portals, and integrated payment systems.",
      process: [
        "Initial consultation and requirements gathering",
        "User research and persona development",
        "Wireframing and prototyping",
        "Design system development",
        "Frontend development with React",
        "Backend integration with WordPress",
        "Testing and optimization",
        "Launch and monitoring"
      ],
      results: [
        "40% increase in student registrations",
        "60% improvement in user engagement",
        "85% reduction in bounce rate",
        "50% increase in course inquiries"
      ],
      technologies: [
        "React",
        "WordPress",
        "Tailwind CSS",
        "Node.js",
        "MongoDB",
        "AWS"
      ],
      team: [
        {
          role: "Project Lead",
          name: "Abdullah Mastoor",
          image: "/mastoor.png?height=100&width=100"
        },
        {
          role: "Lead Developer",
          name: "Abdullah Khan",
          image: "/abdullah.png?height=100&width=100"
        },
        {
          role: "UI/UX Designer",
          name: "Zaid Sheikh",
          image: "/zaid.png?height=100&width=100"
        }
      ],
      gallery: [
        {
          caption: "Homepage Design",
          images: [
            { image: "/placeholder.svg?height=600&width=800", caption: "Homepage Design" }
          ]
        },
        {
          caption: "Course Listing Page",
          images: [
            { image: "/placeholder.svg?height=600&width=800", caption: "Course Listing Page" }
          ]
        },
        {
          caption: "Student Dashboard",
          images: [
            { image: "/placeholder.svg?height=600&width=800", caption: "Student Dashboard" }
          ]
        }
      ]
    }
  },
  "gnosis-brand-identity": {
    title: "Gnosis Brand Identity",
    category: "branding",
    description: "Complete brand identity design and guidelines for Gnosis, a forward-thinking STEM event organization.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Branding", "Logo Design", "Visual Identity"],
    slug: "gnosis-brand-identity",
    stats: { views: "1.5M", engagement: "8.5%" },
    caseStudy: {
      overview: "Gnosis needed a bold, modern brand identity to reflect its mission of inspiring the next generation of STEM leaders. The goal was to create a visual system that would resonate with students, educators, and sponsors alike.",
      challenge: "The challenge was to design a brand that felt both innovative and trustworthy, appealing to a diverse audience while standing out in a crowded educational space.",
      solution: "We developed a comprehensive brand identity system, including a custom logomark, dynamic color palette, typography, and a suite of visual assets. The identity was designed to be flexible for both digital and print applications, ensuring consistency across all touchpoints.",
      process: [
        "Brand discovery workshops with stakeholders",
        "Competitive analysis and moodboarding",
        "Logo concept sketching and refinement",
        "Typography and color exploration",
        "Creation of brand guidelines and asset library",
        "Rollout across social, web, and event materials"
      ],
      results: [
        "Brand recognition increased by 70% within the first 6 months",
        "Social media engagement doubled after the rebrand",
        "Positive feedback from event attendees and sponsors",
        "Brand assets used seamlessly across all platforms"
      ],
      technologies: [
        "Adobe Illustrator",
        "Figma",
        "Photoshop",
        "Google Fonts"
      ],
      team: [
        {
          role: "Brand Strategist",
          name: "Abdullah Mastoor",
          image: "/images/mastoor.png?height=100&width=100"
        },
        {
          role: "Lead Designer",
          name: "Zaid Sheikh",
          image: "/images/zaid.png?height=100&width=100"
        }
      ],
      beforeAfter: {
        before: {
          image: "/images/gnosis-old-logo.png",
          caption: "Original Gnosis Logo (Before Rebrand)"
        },
        after: {
          image: "/images/gnosis-new-logo.png",
          caption: "New Gnosis Logo (After Rebrand)"
        }
      },
      colorPalette: [
        { hex: "#FFFFFF", name: "White", description: "Clean, modern background" },
        { hex: "#181717", name: "Charcoal Black", description: "Primary text and contrast" },
        { hex: "#D84628", name: "Vibrant Orange", description: "Accent and energy" }
      ],
      testimonials: [
        {
          quote: "The new Gnosis brand identity has completely transformed our presence. We now stand out and feel truly professional.",
          author: "Sarah Chen",
          role: "Gnosis Event Director"
        }
      ],
      gallery: [
        {
          caption: "Logo System",
          images: [
            { image: "/images/gnosis-logo-1.png", caption: "Primary Logo" },
            { image: "/images/gnosis-logo-2.png", caption: "Logomark Variations" }
          ]
        },
        {
          caption: "Brand Guidelines",
          images: [
            { image: "/images/gnosis-guidelines-1.png", caption: "Brand Guidelines Cover" },
            { image: "/images/gnosis-guidelines-2.png", caption: "Typography & Color" }
          ]
        },
        {
          caption: "Collateral & Social Media",
          images: [
            { image: "/images/gnosis-social-1.png", caption: "Instagram Post" },
            { image: "/images/gnosis-social-2.png", caption: "Event Poster" }
          ]
        }
      ]
    }
  },
  // Add more projects here...
}

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { scrollYProgress } = useScroll()
  const [project, setProject] = useState<Project | null>(null)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  
  // Unwrap params using React.use()
  const resolvedParams = use(params)

  useEffect(() => {
    // In a real app, this would be an API call
    setProject(projects[resolvedParams.slug] || null)
  }, [resolvedParams.slug])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {project.description}
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Case Study Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.caseStudy?.overview}
              </p>
            </section>

            {/* Challenge & Solution */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ModernCard variant="glass">
                <h3 className="text-2xl font-bold mb-4">Challenge</h3>
                <p className="text-muted-foreground">
                  {project.caseStudy?.challenge}
                </p>
              </ModernCard>
              <ModernCard variant="glass">
                <h3 className="text-2xl font-bold mb-4">Solution</h3>
                <p className="text-muted-foreground">
                  {project.caseStudy?.solution}
                </p>
              </ModernCard>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Process</h2>
              <div className="space-y-4">
                {project.caseStudy?.process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.caseStudy?.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ModernCard variant="gradient" className="h-full">
                      <div className="p-6">
                        <p className="text-lg font-semibold">{result}</p>
                      </div>
                    </ModernCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Before & After Section */}
            {project.caseStudy?.beforeAfter && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Before & After</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <ModernCard variant="glass">
                      <div className="p-4">
                        <Image src={project.caseStudy.beforeAfter.before.image} alt="Before" width={400} height={300} className="mx-auto rounded-xl mb-4" />
                        <div className="text-muted-foreground text-sm">{project.caseStudy.beforeAfter.before.caption}</div>
                      </div>
                    </ModernCard>
                  </div>
                  <div className="text-center">
                    <ModernCard variant="gradient">
                      <div className="p-4">
                        <Image src={project.caseStudy.beforeAfter.after.image} alt="After" width={400} height={300} className="mx-auto rounded-xl mb-4" />
                        <div className="text-primary text-sm">{project.caseStudy.beforeAfter.after.caption}</div>
                      </div>
                    </ModernCard>
                  </div>
                </div>
              </section>
            )}

            {/* Color Palette Section */}
            {project.caseStudy?.colorPalette && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
                <div className="flex flex-wrap gap-6">
                  {project.caseStudy.colorPalette.map((color, idx) => (
                    <div key={color.hex} className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full mb-2 border-2 border-muted shadow-lg" style={{ background: color.hex }} />
                      <div className="font-mono text-sm mb-1">{color.hex}</div>
                      <div className="font-semibold text-base">{color.name}</div>
                      <div className="text-xs text-muted-foreground text-center max-w-[120px]">{color.description}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials Section */}
            {project.caseStudy?.testimonials && project.caseStudy.testimonials.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Testimonial</h2>
                <ModernCard variant="glass" className="max-w-2xl mx-auto">
                  <div className="p-8 text-center">
                    <blockquote className="text-2xl md:text-3xl font-light mb-6 leading-relaxed">
                      "{project.caseStudy.testimonials[0].quote}"
                    </blockquote>
                    <div className="font-semibold text-lg text-primary">{project.caseStudy.testimonials[0].author}</div>
                    <div className="text-muted-foreground text-sm">{project.caseStudy.testimonials[0].role}</div>
                  </div>
                </ModernCard>
              </section>
            )}

            {/* Enhanced Gallery Section */}
            {project.caseStudy?.gallery && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Gallery</h2>
                <div className="space-y-12">
                  {project.caseStudy.gallery.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-semibold mb-4">{item.caption}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {item.images.map((img, imgIdx) => (
                          <ModernCard key={img.image} variant="glass" className="overflow-hidden">
                            <div className="aspect-video relative">
                              <Image src={img.image} alt={img.caption} fill className="object-cover" />
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-muted-foreground">{img.caption}</p>
                            </div>
                          </ModernCard>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <ModernCard variant="glass">
              <h3 className="text-xl font-bold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy?.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ModernCard>

            {/* Team */}
            <ModernCard variant="glass">
              <h3 className="text-xl font-bold mb-4">Team</h3>
              <div className="space-y-4">
                {project.caseStudy?.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ModernCard>

            {/* Stats */}
            <ModernCard variant="gradient">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-semibold">{project.stats.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className="font-semibold">{project.stats.engagement}</span>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-20 flex justify-between">
          <Link href="/#work">
            <AdvancedButton variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Projects
            </AdvancedButton>
          </Link>
          <AdvancedButton variant="gradient" icon={<ArrowRight className="w-4 h-4" />}>
            View Live Project
          </AdvancedButton>
        </div>
      </div>
    </div>
  )
} 