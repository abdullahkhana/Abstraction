"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Share2,
  Heart,
  Download,
  TrendingUp,
  Users,
  Eye,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function GnosisProjectPage() {
  const [isLiked, setIsLiked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const socialMetrics = [
    { platform: "Instagram", followers: "45K+", engagement: "8.5%", reach: "2.3M" },
    { platform: "LinkedIn", followers: "12K+", engagement: "12.3%", reach: "850K" },
    { platform: "Twitter", followers: "8K+", engagement: "6.8%", reach: "420K" },
    { platform: "TikTok", followers: "25K+", engagement: "15.2%", reach: "1.8M" },
  ]

  const campaignResults = [
    {
      metric: "Average Views",
      value: "30K",
      description: "per post across all platforms",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      metric: "Peak Views",
      value: "5M+",
      description: "highest performing content",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      metric: "Engagement Rate",
      value: "12.8%",
      description: "average across campaigns",
      icon: <Users className="w-6 h-6" />,
    },
    {
      metric: "Event Attendance",
      value: "2,500+",
      description: "participants registered",
      icon: <BarChart3 className="w-6 h-6" />,
    },
  ]

  return (
    <div ref={containerRef} className="bg-[#181717] text-white min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl bg-[#181717]/20"
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
              "radial-gradient(circle at 30% 40%, #D84628 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, #D84628 0%, transparent 50%)",
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
            <span className="text-[#D84628] text-lg font-semibold">Social Media Management</span>
            <h1 className="text-6xl md:text-8xl font-bold mt-4 mb-6 leading-none">
              Gnosis <span className="text-[#D84628]">STEM Event</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Transforming a local STEM event into a viral sensation with strategic social media management, achieving
              unprecedented engagement and reach across multiple platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="text-center">
              <div className="text-sm text-white/60">Client</div>
              <div className="text-lg font-semibold">Gnosis STEM Foundation</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Duration</div>
              <div className="text-lg font-semibold">6 months</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Platforms</div>
              <div className="text-lg font-semibold">4 Social Channels</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AdvancedButton variant="primary" size="lg" icon={<ExternalLink className="w-5 h-5" />}>
              View Campaign
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="lg" icon={<Download className="w-5 h-5" />}>
              Download Case Study
            </AdvancedButton>
          </motion.div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Campaign Results</h2>
            <p className="text-xl text-white/80">Unprecedented growth and engagement across all platforms</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campaignResults.map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="gradient">
                  <div className="p-8 text-center">
                    <div className="text-[#D84628] mb-4 flex justify-center">{result.icon}</div>
                    <div className="text-4xl font-bold text-white mb-2">{result.value}</div>
                    <div className="text-lg font-semibold text-white/90 mb-2">{result.metric}</div>
                    <div className="text-sm text-white/60">{result.description}</div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Breakdown */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Platform Performance</h2>
            <p className="text-xl text-white/80">Detailed breakdown of growth across social media channels</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialMetrics.map((platform, index) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="neon">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#D84628] mb-6">{platform.platform}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{platform.followers}</div>
                        <div className="text-sm text-white/60">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{platform.engagement}</div>
                        <div className="text-sm text-white/60">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{platform.reach}</div>
                        <div className="text-sm text-white/60">Reach</div>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy & Approach */}
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
                  <h3 className="text-3xl font-bold mb-6 text-[#D84628]">The Challenge</h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-6">
                    Gnosis STEM Event was a local initiative with limited online presence and minimal social media
                    engagement. The challenge was to transform it into a nationally recognized event that would attract
                    participants, sponsors, and media attention.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#D84628] rounded-full mt-2 mr-3" />
                      <span className="text-white/70">Limited brand awareness and online presence</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#D84628] rounded-full mt-2 mr-3" />
                      <span className="text-white/70">Low engagement rates across existing channels</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#D84628] rounded-full mt-2 mr-3" />
                      <span className="text-white/70">Need to attract diverse STEM community</span>
                    </li>
                  </ul>
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
                  <h3 className="text-3xl font-bold mb-6 text-[#D84628]">Our Strategy</h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-6">
                    We developed a comprehensive social media strategy focused on storytelling, community building, and
                    viral content creation. Our approach combined educational content with behind-the-scenes moments to
                    humanize the STEM experience.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#D84628] rounded-full mt-2 mr-3" />
                      <span className="text-white/70">
                        Multi-platform content strategy with platform-specific optimization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#D84628] rounded-full mt-2 mr-3" />
                      <span className="text-white/70">Influencer partnerships with STEM educators and students</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#D84628] rounded-full mt-2 mr-3" />
                      <span className="text-white/70">Real-time engagement and community management</span>
                    </li>
                  </ul>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Showcase */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Content That Went Viral</h2>
            <p className="text-xl text-white/80">Examples of our most successful content pieces</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "STEM Challenge Series",
                description: "Daily challenges that engaged students nationwide",
                views: "1.2M views",
                engagement: "15.3% engagement rate",
              },
              {
                title: "Behind the Scenes",
                description: "Exclusive content from event preparation",
                views: "850K views",
                engagement: "12.8% engagement rate",
              },
              {
                title: "Student Spotlights",
                description: "Featuring young innovators and their projects",
                views: "2.1M views",
                engagement: "18.7% engagement rate",
              },
            ].map((content, index) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="minimal">
                  <div className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-[#D84628]/20 to-[#FF6B47]/20 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-[#D84628] text-4xl">📱</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{content.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{content.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#D84628]">{content.views}</span>
                      <span className="text-white/60">{content.engagement}</span>
                    </div>
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
            Ready to Go <span className="text-[#D84628]">Viral</span>?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Let's create a social media strategy that transforms your brand into a digital phenomenon.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AdvancedButton variant="gradient" size="xl" icon={<Calendar className="w-5 h-5" />}>
              Start Your Campaign
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="xl" icon={<Download className="w-5 h-5" />}>
              Get Strategy Guide
            </AdvancedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
