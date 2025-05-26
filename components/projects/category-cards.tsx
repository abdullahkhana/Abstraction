import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ModernCard } from "@/components/ui/modern-card"
import { Play, Globe, Palette, Megaphone, Video, Brush, Zap, Eye, TrendingUp, Award, ExternalLink } from "lucide-react"
import { VideoPlayer } from "@/components/ui/video-player"

interface ProjectCardProps {
  project: any
  index: number
  isInView: boolean
}

// Video Production Card
export const VideoCard = memo(({ project, index, isInView }: ProjectCardProps) => (
  <motion.div
    key={`video-${project.slug}-${index}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className="group"
  >
    <Link href={`/project/${project.slug}`}>
      <ModernCard variant="glass" className="overflow-hidden">
        <div className="aspect-video relative">
          <VideoPlayer
            videoId={project.videoId}
            title={project.title}
            autoPlay={false}
            loop={false}
            muted={true}
          />
          
          {/* Video info overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
              {project.tags[0]}
            </span>
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white">
              {project.duration}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span className="text-sm">{project.stats.views}</span>
              </span>
              <span className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-sm">{project.stats.engagement}</span>
              </span>
            </div>
            {project.awards?.length > 0 && (
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
))

// Brand Identity Card
export const BrandingCard = memo(({ project, index, isInView }: ProjectCardProps) => (
  <motion.div
    key={`branding-${project.slug}-${index}`}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="group"
  >
    <Link href={`/case-study/${project.slug}`}>
      <ModernCard variant="gradient" className="overflow-hidden">
        <div className="aspect-[4/3] relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Color Palette Preview */}
          {project.colorPalette && (
            <div className="absolute top-4 left-4 flex space-x-2">
              {project.colorPalette.slice(0, 3).map((color: any, i: number) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-white/20"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-primary text-sm font-semibold mb-2">{project.category}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
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
))

// Social Media Card
export const SocialCard = memo(({ project, index, isInView }: ProjectCardProps) => (
  <motion.div
    key={`social-${project.slug}-${index}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="group"
  >
    <Link href={`/project/${project.slug}`}>
      <ModernCard variant="neon" className="overflow-hidden">
        <div className="aspect-[16/9] relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Social Stats */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Eye className="w-3 h-3" />
              <span className="text-xs text-white">{project.stats.views}</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-xs text-white">{project.stats.engagement}</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-primary text-sm font-semibold mb-2">{project.category}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
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
))

// Website Card
export const WebsiteCard = memo(({ project, index, isInView }: ProjectCardProps) => (
  <motion.div
    key={`web-${project.slug}-${index}`}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="group"
  >
    <Link href={`/case-study/${project.slug}`}>
      <ModernCard variant="minimal" className="overflow-hidden">
        <div className="aspect-[16/9] relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Website Preview */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs text-white">Live Preview</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-primary text-sm font-semibold mb-2">{project.category}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
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
))

// Graphics & Print Card
export const GraphicsCard = memo(({ project, index, isInView }: ProjectCardProps) => (
  <motion.div
    key={`graphics-${project.slug}-${index}`}
    initial={{ opacity: 0, rotateY: 45 }}
    animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className="group perspective-1000"
  >
    <Link href={`/project/${project.slug}`}>
      <ModernCard variant="glass" className="overflow-hidden">
        <div className="aspect-[4/3] relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Print Preview */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Brush className="w-4 h-4 text-primary" />
            <span className="text-xs text-white">Print Ready</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-primary text-sm font-semibold mb-2">{project.category}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
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
))

// Default Card for Misc category
export const DefaultCard = memo(({ project, index, isInView }: ProjectCardProps) => (
  <motion.div
    key={`default-${project.slug}-${index}`}
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
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
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
)) 