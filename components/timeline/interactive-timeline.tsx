"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { useState, useRef } from "react"
import { Award, Users, Rocket, Sparkles, Globe, Zap } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  details: string
  icon: React.ReactNode
  color: string
  achievements: string[]
  stats?: {
    label: string
    value: string
  }[]
}

const timelineData: TimelineEvent[] = [
  {
    year: "2019",
    title: "The Genesis",
    description: "Three visionaries unite to revolutionize creative design",
    details:
      "Abdullah Mastoor, Zaid Sheikh, and Abdullah Khan founded Abstraction Studios with a shared vision of pushing creative boundaries. Starting from a small studio apartment, they began crafting unique digital experiences.",
    icon: <Rocket className="w-6 h-6" />,
    color: "#D84628",
    achievements: [
      "Founded with $10K initial investment",
      "First client: Local tech startup",
      "Developed core design philosophy",
      "Established brand identity",
    ],
    stats: [
      { label: "Team Size", value: "3" },
      { label: "Projects", value: "5" },
    ],
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Pivoting to remote-first and expanding digital capabilities",
    details:
      "The pandemic challenged us to innovate. We embraced remote collaboration, developed new digital workflows, and expanded our service offerings to include comprehensive digital transformation solutions.",
    icon: <Globe className="w-6 h-6" />,
    color: "#FF6B47",
    achievements: [
      "Transitioned to fully remote operations",
      "Launched digital transformation services",
      "Developed proprietary design system",
      "First international client acquired",
    ],
    stats: [
      { label: "Team Size", value: "8" },
      { label: "Projects", value: "25" },
    ],
  },
  {
    year: "2021",
    title: "Creative Renaissance",
    description: "Award-winning campaigns and industry recognition",
    details:
      "Our breakthrough year with multiple award-winning campaigns. We established ourselves as thought leaders in the creative industry and began speaking at international design conferences.",
    icon: <Award className="w-6 h-6" />,
    color: "#FFD700",
    achievements: [
      "Won 'Best Digital Campaign' at Creative Awards",
      "Featured in Design Magazine's Top 50",
      "Spoke at 5 international conferences",
      "Launched mentorship program",
    ],
    stats: [
      { label: "Team Size", value: "15" },
      { label: "Projects", value: "60" },
      { label: "Awards", value: "8" },
    ],
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Opening international offices and scaling operations",
    details:
      "With growing demand, we expanded globally with offices in London and Dubai. Our team grew to include specialists from around the world, bringing diverse perspectives to our creative process.",
    icon: <Users className="w-6 h-6" />,
    color: "#00D4FF",
    achievements: [
      "Opened London office",
      "Established Dubai hub",
      "Launched Abstraction Academy",
      "Reached $2M annual revenue",
    ],
    stats: [
      { label: "Team Size", value: "35" },
      { label: "Projects", value: "120" },
      { label: "Offices", value: "3" },
    ],
  },
  {
    year: "2023",
    title: "Innovation Lab",
    description: "Pioneering AI-assisted design and immersive experiences",
    details:
      "We launched our Innovation Lab, exploring cutting-edge technologies like AI-assisted design, AR/VR experiences, and blockchain integration. This positioned us at the forefront of creative technology.",
    icon: <Zap className="w-6 h-6" />,
    color: "#9D4EDD",
    achievements: [
      "Launched AI Design Assistant",
      "Created first VR brand experience",
      "Developed blockchain art platform",
      "Filed 3 technology patents",
    ],
    stats: [
      { label: "Team Size", value: "50" },
      { label: "Projects", value: "200" },
      { label: "Patents", value: "3" },
    ],
  },
  {
    year: "2024",
    title: "Future Forward",
    description: "Shaping the next decade of creative innovation",
    details:
      "Today, we continue to push boundaries with sustainable design practices, AI integration, and immersive digital experiences. Our mission remains unchanged: to transform visions into extraordinary realities.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "#D84628",
    achievements: [
      "Achieved carbon-neutral operations",
      "Launched sustainability initiative",
      "Reached 150+ completed projects",
      "Established creative scholarship fund",
    ],
    stats: [
      { label: "Team Size", value: "65" },
      { label: "Projects", value: "300+" },
      { label: "Impact", value: "Global" },
    ],
  },
]

export function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10">
        <motion.div className="w-full bg-gradient-to-b from-[#D84628] to-[#FF6B47]" style={{ height: lineProgress }} />
      </div>

      {/* Timeline Events */}
      <div className="space-y-32">
        {timelineData.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Content */}
            <div className={`w-5/12 ${index % 2 === 0 ? "pr-16" : "pl-16"}`}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveEvent(index)} className="cursor-pointer">
                <ModernCard variant={activeEvent === index ? "neon" : "glass"}>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${event.color}20`, border: `2px solid ${event.color}` }}
                      >
                        <div style={{ color: event.color }}>{event.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        <p className="text-white/60">{event.description}</p>
                      </div>
                    </div>

                    <p className="text-white/80 mb-6 leading-relaxed">{event.details}</p>

                    {/* Stats */}
                    {event.stats && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {event.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-2xl font-bold" style={{ color: event.color }}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/60">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Achievements */}
                    <div className="space-y-2">
                      {event.achievements.map((achievement, achIndex) => (
                        <motion.div
                          key={achIndex}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: achIndex * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: event.color }} />
                          <span className="text-white/70 text-sm">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            </div>

            {/* Year Marker */}
            <div className="relative z-10">
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white/20 backdrop-blur-sm"
                style={{
                  backgroundColor: activeEvent === index ? event.color : "rgba(24, 23, 23, 0.8)",
                  borderColor: event.color,
                }}
                whileHover={{ scale: 1.1 }}
                animate={{
                  scale: activeEvent === index ? 1.1 : 1,
                  boxShadow: activeEvent === index ? `0 0 30px ${event.color}50` : "none",
                }}
              >
                <span className="text-white font-bold text-lg">{event.year}</span>
              </motion.div>
            </div>

            {/* Empty space for alternating layout */}
            <div className="w-5/12" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
