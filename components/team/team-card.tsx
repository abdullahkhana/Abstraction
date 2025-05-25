"use client"

import { motion } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { Linkedin, Twitter, Mail, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { useState, memo } from "react"

interface TeamMember {
  name: string
  role: string
  title: string
  bio: string
  image: string
  experience: string
  location: string
  joinedYear: string
  expertise: string[]
  achievements: string[]
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
    email?: string
  }
  stats: {
    projectsLed: number
    yearsExperience: number
    clientSatisfaction: number
  }
}

interface TeamCardProps {
  member: TeamMember
  index: number
}

export const TeamCard = memo(function TeamCard({ member, index }: TeamCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Provide default values to prevent undefined errors
  const safeExpertise = member?.expertise || []
  const safeAchievements = member?.achievements || []
  const safeSocial = member?.social || {}
  const safeStats = member?.stats || { projectsLed: 0, yearsExperience: 0, clientSatisfaction: 0 }

  if (!member) {
    return (
      <div className="h-[600px] bg-muted rounded-2xl animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="perspective-1000 h-[600px]"
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <ModernCard variant="gradient" className="h-full overflow-hidden group">
            <div className="relative h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={member.image || "/placeholder.svg?height=600&width=400"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">{member.title}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-xl text-white/80 mb-4">{member.role}</p>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{safeStats.projectsLed}+</div>
                    <div className="text-xs text-white/60">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{safeStats.yearsExperience}+</div>
                    <div className="text-xs text-white/60">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{safeStats.clientSatisfaction}%</div>
                    <div className="text-xs text-white/60">Satisfaction</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {safeSocial.linkedin && (
                    <motion.a
                      href={safeSocial.linkedin}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                  )}
                  {safeSocial.twitter && (
                    <motion.a
                      href={safeSocial.twitter}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter className="w-4 h-4" />
                    </motion.a>
                  )}
                  {safeSocial.email && (
                    <motion.a
                      href={`mailto:${safeSocial.email}`}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>

                {/* Flip indicator */}
                <div className="absolute top-4 right-4 text-white/50 text-xs">Click to flip</div>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <ModernCard variant="neon" className="h-full">
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <motion.button
                  className="text-white/60 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFlipped(false)
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Detailed Info */}
              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-primary font-semibold mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location & Experience
                  </h4>
                  <p className="text-white/80 text-sm">{member.location}</p>
                  <p className="text-white/80 text-sm">{member.experience}</p>
                  <div className="flex items-center mt-2">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-white/60 text-sm">Joined in {member.joinedYear}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-primary font-semibold mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {safeExpertise.map((skill, skillIndex) => (
                      <span
                        key={`${skill}-${skillIndex}`}
                        className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-primary font-semibold mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {safeAchievements.map((achievement, achIndex) => (
                      <li key={`${achievement}-${achIndex}`} className="text-white/70 text-sm flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <AdvancedButton variant="primary" size="sm" className="w-full" icon={<Mail className="w-4 h-4" />}>
                  Get in Touch
                </AdvancedButton>
              </div>
            </div>
          </ModernCard>
        </div>
      </motion.div>
    </motion.div>
  )
})
