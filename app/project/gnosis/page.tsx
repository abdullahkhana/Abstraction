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
  Atom,
  Eye,
  Lock,
  BookOpen,
  Puzzle,
  Key,
  Layers,
  Hexagon,
} from "lucide-react"
import Link from "next/link"

export default function GnosisLogoDesignPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Logo categories with detailed explanations
  const logoCategories = [
    {
      id: "alchemists-antithesis",
      name: "Alchemist's Antithesis",
      symbol: "⚗️",
      color: "#C9A876", // Warm gold from the image
      description: "The triangle within a circle represents the fundamental opposition to traditional alchemy",
      deepDive: "This symbol challenges the ancient pursuit of transforming base metals into gold. In our context, it represents the transformation of basic knowledge into scientific understanding. The triangle symbolizes stability and foundation, while the circle represents infinity and completion. The interplay suggests that true knowledge comes not from mystical transformation, but from rigorous scientific method.",
      electronConfig: "1s²",
      philosophy: "Rational inquiry over mystical pursuit",
      application: "Critical thinking workshops and scientific methodology sessions"
    },
    {
      id: "hippocrates-haven",
      name: "Hippocrates' Haven",
      symbol: "🏥",
      color: "#8B9B8E", // Muted sage from the image
      description: "Intertwining serpents representing the healing arts and medical ethics",
      deepDive: "Named after the father of modern medicine, this symbol embodies the oath of 'First, do no harm.' The serpentine pattern represents DNA, healing, and the continuous cycle of medical advancement. Each twist symbolizes the complexity of biological systems and the careful balance required in medical practice.",
      electronConfig: "1s² 2s²",
      philosophy: "Ethical responsibility in scientific advancement",
      application: "Biomedical engineering and healthcare innovation tracks"
    },
    {
      id: "oppenheimers-occult",
      name: "Oppenheimer's Occult",
      symbol: "☢️",
      color: "#7A8471", // Deep sage from the image
      description: "The atomic symbol representing both creation and destruction",
      deepDive: "This powerful symbol acknowledges the dual nature of scientific discovery. Like Oppenheimer's reflection on becoming 'destroyer of worlds,' it reminds us that knowledge carries responsibility. The orbital paths represent electrons, but also the far-reaching consequences of our discoveries. The split circle suggests both nuclear fission and the moral divisions that scientific power can create.",
      electronConfig: "1s² 2s² 2p²",
      philosophy: "Power requires responsibility and ethical consideration",
      application: "Nuclear physics, energy solutions, and ethics in science discussions"
    },
    {
      id: "exhibitions",
      name: "Exhibitions",
      symbol: "🎭",
      color: "#A8957A", // Warm beige from the image
      description: "Gallery frames representing the presentation and sharing of knowledge",
      deepDive: "Science becomes meaningful only when shared. These interlocking frames represent different perspectives, disciplines, and audiences. Each frame is a window into discovery, and their overlap shows how interdisciplinary collaboration creates fuller understanding. The minimalist design reflects clarity in communication.",
      electronConfig: "1s² 2s² 2p⁴",
      philosophy: "Knowledge shared is knowledge multiplied",
      application: "Science communication, public engagement, and interdisciplinary showcases"
    },
    {
      id: "gnosis-core",
      name: "Gnosis Core",
      symbol: "⚛️",
      color: "#6B8E7F", // Central teal from the image
      description: "The atomic nucleus surrounded by electron shells - the heart of all matter",
      deepDive: "At the center of our logo system sits the fundamental building block of reality. This isn't just an atom - it's gnosis itself, the Greek word for knowledge through experience. The nucleus represents core understanding, while the electron shells show how knowledge orbits and energizes around fundamental truths. The Greek key border honors the philosophical traditions that began this journey of inquiry.",
      electronConfig: "1s² 2s² 2p⁶ (Noble gas configuration)",
      philosophy: "True knowledge comes from understanding fundamental principles",
      application: "Core curriculum, foundational sciences, and philosophical inquiry"
    },
    {
      id: "daedalus-deceit",
      name: "Daedalus' Deceit",
      symbol: "🪶",
      color: "#9B8F7A", // Muted brown from the image
      description: "Wings of innovation bound by the threads of consequence",
      deepDive: "The myth of Icarus warns against hubris, but Daedalus himself represents the engineer's dilemma. This Celtic-inspired knotwork forms wings that are both beautiful and constraining. Each thread represents the interconnected nature of innovation - every breakthrough is bound to its consequences. The symmetry suggests balance between ambition and wisdom.",
      electronConfig: "1s² 2s² 2p⁶ 3s²",
      philosophy: "Innovation must be tempered with wisdom and foresight",
      application: "Engineering ethics, sustainable design, and responsible innovation"
    },
    {
      id: "omniscience",
      name: "Omniscience",
      symbol: "🧩",
      color: "#8A9080", // Deeper sage from the image
      description: "Puzzle pieces representing the interconnected nature of all knowledge",
      deepDive: "No field of study exists in isolation. These interlocking pieces represent how chemistry connects to biology, how physics underlies engineering, how mathematics describes natural patterns. The irregular edges show that knowledge doesn't fit neat categories - real understanding comes from seeing connections across disciplines.",
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p²",
      philosophy: "All knowledge is interconnected; wisdom comes from seeing the whole",
      application: "Interdisciplinary research, systems thinking, and holistic problem-solving"
    },
    {
      id: "kratos-kryptography",
      name: "Kratos' Kryptography",
      symbol: "🔐",
      color: "#7F8B78", // Muted olive from the image
      description: "Labyrinthine paths representing the power and complexity of hidden knowledge",
      deepDive: "Named for the Greek god of strength and power, this maze-like symbol represents both the protection and the peril of encrypted knowledge. In our digital age, information security is paramount. The angular paths suggest algorithmic thinking, while the enclosed nature reminds us that some knowledge must be carefully guarded and responsibly shared.",
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁴",
      philosophy: "Knowledge is power, and power must be wielded responsibly",
      application: "Cybersecurity, data privacy, cryptography, and information ethics"
    },
    {
      id: "euclids-expansion",
      name: "Euclid's Expansion",
      symbol: "📐",
      color: "#A4967E", // Warm tan from the image
      description: "Geometric expansion representing the infinite growth of mathematical understanding",
      deepDive: "This icosahedral form represents the platonic solid of ultimate complexity and beauty. Euclid's geometry gave us the tools to understand space itself. Each face represents a different mathematical discipline, each edge a connection between concepts. As we rotate this form, new relationships become visible - just as mathematical understanding reveals new dimensions of reality.",
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ (Complete outer shell)",
      philosophy: "Mathematics is the language through which the universe speaks",
      application: "Pure mathematics, theoretical physics, computational modeling, and abstract reasoning"
    }
  ]

  // Design process stages
  const designProcess = [
    {
      stage: "Research & Discovery",
      description: "Deep dive into Greek philosophy, atomic theory, and STEM education",
      details: "We spent weeks studying ancient Greek concepts of knowledge (gnosis), modern atomic theory, and the psychological aspects of learning. Each symbol needed to bridge ancient wisdom with cutting-edge science."
    },
    {
      stage: "Conceptual Framework",
      description: "Developing the 8-electron shell metaphor for knowledge organization",
      details: "Just as electrons occupy specific energy levels around an atom's nucleus, we organized knowledge domains into 8 fundamental categories, each representing a different aspect of scientific inquiry and responsibility."
    },
    {
      stage: "Visual Language Creation",
      description: "Establishing the color palette and symbolic vocabulary",
      details: "The weathered, ancient appearance suggests timeless wisdom, while the specific color choices reflect different aspects of knowledge - from the gold of transformed understanding to the deep greens of natural philosophy."
    },
    {
      stage: "Symbol Design & Refinement",
      description: "Crafting each individual symbol with precise meaning and visual balance",
      details: "Every line, curve, and intersection was carefully considered. The symbols needed to work both individually and as a cohesive system, representing the interconnected nature of all knowledge."
    }
  ]

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, #2C3E3A 0%, #3D4B47 25%, #4A5652 50%, #3D4B47 75%, #2C3E3A 100%)`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(44, 62, 58, 0.8)' }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <AdvancedButton variant="ghost" size="md" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              Back to Projects
            </AdvancedButton>
          </Link>
          <div className="flex space-x-4">
            <AdvancedButton variant="secondary" size="sm" icon={<Share2 className="w-4 h-4" />}>
              Share Case Study
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
          className="absolute inset-0 opacity-10"
          style={{ y: parallaxY }}
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #C9A876 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, #6B8E7F 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="text-center z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span style={{ color: '#C9A876' }} className="text-lg font-semibold">Logo Design Case Study</span>
            <h1 className="text-6xl md:text-8xl font-bold mt-4 mb-6 leading-none">
              Gnosis 
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-none">
              <span style={{ color: '#C9A876' }}>Olympus Edition</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              An in-depth exploration of how ancient Greek philosophy, atomic theory, and modern design principles 
              converged to create a logo system that embodies the essence of scientific knowledge and responsibility.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-sm text-white/60">Project Type</div>
              <div className="text-lg font-semibold">Logo System Design</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Client</div>
              <div className="text-lg font-semibold">STEM Student Event</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Symbols Created</div>
              <div className="text-lg font-semibold">9 Interconnected Icons</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/60">Philosophy</div>
              <div className="text-lg font-semibold">Knowledge as Atomic Structure</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Atomic Knowledge Theory</h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto">
              Just as electrons occupy specific energy shells around an atomic nucleus, we organized human knowledge 
              into 8 fundamental domains, each representing a different aspect of scientific understanding and ethical responsibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="glass">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Atom className="w-8 h-8 mr-4" style={{ color: '#6B8E7F' }} />
                    <h3 className="text-2xl font-bold">The Nuclear Core</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">
                    At the center sits Gnosis itself - the Greek concept of knowledge gained through experience. 
                    This central atom represents fundamental scientific principles that energize all other domains of learning.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: '#6B8E7F' }}></div>
                      <span className="text-white/70">Core scientific principles</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: '#6B8E7F' }}></div>
                      <span className="text-white/70">Experiential learning foundation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: '#6B8E7F' }}></div>
                      <span className="text-white/70">Philosophical inquiry methods</span>
                    </div>
                  </div>
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
                  <div className="flex items-center mb-6">
                    <Layers className="w-8 h-8 mr-4" style={{ color: '#C9A876' }} />
                    <h3 className="text-2xl font-bold">The Eight Shells</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Each knowledge domain occupies its own "electron shell," representing different energy levels 
                    of understanding. Like electrons, these domains can jump between levels, creating new compounds of knowledge.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#C9A876' }}></div>
                      <span>Alchemy → Chemistry</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#8B9B8E' }}></div>
                      <span>Medicine → Ethics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#7A8471' }}></div>
                      <span>Physics → Responsibility</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#A8957A' }}></div>
                      <span>Communication</span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Logo Categories */}
      <section className="py-20 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Nine Sacred Symbols</h2>
            <p className="text-xl text-white/80">Click any symbol to explore its deep meaning and design philosophy</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {logoCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <ModernCard variant="neon">
                  <div 
                    className="p-6 text-center transition-all duration-300"
                    style={{ 
                      borderColor: selectedCategory === category.id ? category.color : 'transparent',
                      borderWidth: '2px'
                    }}
                  >
                    <div 
                      className="text-4xl mb-4 text-center flex justify-center items-center w-16 h-16 mx-auto rounded-full"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      {category.symbol}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: category.color }}>
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">{category.description}</p>
                    <div className="text-xs text-white/50 mb-2">Electron Config: {category.electronConfig}</div>
                    <div className="text-xs" style={{ color: category.color }}>
                      {category.philosophy}
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8"
            >
              {logoCategories
                .filter(cat => cat.id === selectedCategory)
                .map(category => (
                  <ModernCard key={category.id} variant="glass">
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <div className="flex items-center mb-6">
                            <div 
                              className="text-6xl mr-6 flex justify-center items-center w-20 h-20 rounded-full"
                              style={{ backgroundColor: `${category.color}20`, color: category.color }}
                            >
                              {category.symbol}
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold mb-2" style={{ color: category.color }}>
                                {category.name}
                              </h3>
                              <p className="text-white/60">{category.electronConfig}</p>
                            </div>
                          </div>
                          <p className="text-white/80 leading-relaxed text-lg">
                            {category.deepDive}
                          </p>
                        </div>
                        <div>
                          <div className="mb-6">
                            <h4 className="text-xl font-bold mb-3" style={{ color: category.color }}>
                              Design Philosophy
                            </h4>
                            <p className="text-white/70 italic">"{category.philosophy}"</p>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: category.color }}>
                              Practical Application
                            </h4>
                            <p className="text-white/70">{category.application}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Design Process</h2>
            <p className="text-xl text-white/80">How ancient wisdom and modern science informed every design decision</p>
          </motion.div>

          <div className="space-y-12">
            {designProcess.map((process, index) => (
              <motion.div
                key={process.stage}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/3">
                  <ModernCard variant="minimal">
                    <div className="p-6 text-center">
                      <div 
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
                        style={{ backgroundColor: '#C9A876', color: '#2C3E3A' }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#C9A876' }}>
                        {process.stage}
                      </h3>
                    </div>
                  </ModernCard>
                </div>
                <div className="lg:w-2/3">
                  <ModernCard variant="glass">
                    <div className="p-8">
                      <h4 className="text-2xl font-bold mb-4 text-white">{process.description}</h4>
                      <p className="text-white/80 leading-relaxed text-lg">{process.details}</p>
                    </div>
                  </ModernCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Psychology Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Color Psychology & Meaning</h2>
            <p className="text-xl text-white/80">Why each color was chosen for its specific psychological and symbolic impact</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                color: '#C9A876',
                name: 'Alchemical Gold',
                meaning: 'Transformation, wisdom, enlightenment',
                psychology: 'Stimulates mental clarity and higher thinking'
              },
              {
                color: '#6B8E7F',
                name: 'Gnosis Teal',
                meaning: 'Balance, stability, core knowledge',
                psychology: 'Promotes focus and deep contemplation'
              },
              {
                color: '#8B9B8E',
                name: 'Healing Sage',
                meaning: 'Growth, harmony, natural wisdom',
                psychology: 'Calms the mind while encouraging learning'
              },
              {
                color: '#7A8471',
                name: 'Atomic Olive',
                meaning: 'Power, responsibility, gravitas',
                psychology: 'Conveys seriousness and ethical weight'
              },
              {
                color: '#A8957A',
                name: 'Knowledge Beige',
                meaning: 'Foundation, reliability, timelessness',
                psychology: 'Creates sense of established trust'
              },
              {
                color: '#9B8F7A',
                name: 'Innovation Brown',
                meaning: 'Earthiness, craft, creation',
                psychology: 'Grounds creative thinking in practical reality'
              }
            ].map((colorInfo, index) => (
              <motion.div
                key={colorInfo.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="minimal">
                  <div className="p-6">
                    <div 
                      className="w-full h-24 rounded-lg mb-4"
                      style={{ backgroundColor: colorInfo.color }}
                    ></div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: colorInfo.color }}>
                      {colorInfo.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">{colorInfo.meaning}</p>
                    <p className="text-white/60 text-xs italic">{colorInfo.psychology}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create <span style={{ color: '#C9A876' }}>Meaningful</span> Design?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Let's craft a visual identity that carries deep meaning and connects with your audience on multiple levels.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AdvancedButton variant="gradient" size="xl" icon={<Calendar className="w-5 h-5" />}>
              Start Your Logo Project
            </AdvancedButton>
            <AdvancedButton variant="secondary" size="xl" icon={<Download className="w-5 h-5" />}>
              Download Full Case Study
            </AdvancedButton>
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section className="py-20 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Impact & Recognition</h2>
            <p className="text-xl text-white/80">How the logo system elevated the entire STEM event experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                metric: "Brand Recognition",
                value: "340%",
                description: "increase in event recognition",
                icon: <Eye className="w-6 h-6" />,
                color: '#C9A876'
              },
              {
                metric: "Engagement Rate",
                value: "85%",
                description: "of participants could identify symbols",
                icon: <Heart className="w-6 h-6" />,
                color: '#6B8E7F'
              },
              {
                metric: "Educational Impact",
                value: "92%",
                description: "reported deeper understanding",
                icon: <BookOpen className="w-6 h-6" />,
                color: '#8B9B8E'
              },
              {
                metric: "Design Awards",
                value: "3",
                description: "student design competitions won",
                icon: <Hexagon className="w-6 h-6" />,
                color: '#A8957A'
              }
            ].map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="gradient">
                  <div className="p-8 text-center">
                    <div className="mb-4 flex justify-center" style={{ color: result.color }}>
                      {result.icon}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{result.value}</div>
                    <div className="text-lg font-semibold text-white/90 mb-2">{result.metric}</div>
                    <div className="text-sm text-white/60">{result.description}</div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="glass">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: '#C9A876', color: '#2C3E3A' }}
                    >
                      DR
                    </div>
                    <div>
                      <div className="font-bold text-white">Dr. Sarah Chen</div>
                      <div className="text-white/60 text-sm">Event Director, Gnosis STEM Foundation</div>
                    </div>
                  </div>
                  <p className="text-white/80 italic leading-relaxed">
                    "The logo system didn't just represent our event - it became a teaching tool itself. Students were 
                    fascinated by the deeper meanings and started creating their own interpretations. It elevated our 
                    entire educational approach."
                  </p>
                </div>
              </ModernCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="glass">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: '#6B8E7F', color: 'white' }}
                    >
                      MJ
                    </div>
                    <div>
                      <div className="font-bold text-white">Marcus Johnson</div>
                      <div className="text-white/60 text-sm">Student Participant & Team Leader</div>
                    </div>
                  </div>
                  <p className="text-white/80 italic leading-relaxed">
                    "I never thought a logo could make me think so deeply about science and responsibility. Each symbol 
                    told a story that connected to what we were learning. It made the whole experience feel more 
                    meaningful and memorable."
                  </p>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Specifications</h2>
            <p className="text-xl text-white/80">Detailed breakdown of design elements and usage guidelines</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="minimal">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#C9A876' }}>Typography & Layout</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white font-semibold mb-2">Primary Typeface</div>
                      <div className="text-white/70">Custom serif with Greek influence</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Symbol Grid System</div>
                      <div className="text-white/70">8x8 unit grid for perfect alignment</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Minimum Size</div>
                      <div className="text-white/70">24px for digital, 0.5" for print</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Safe Area</div>
                      <div className="text-white/70">2x symbol height on all sides</div>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="minimal">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#6B8E7F' }}>Usage Applications</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white font-semibold mb-2">Event Materials</div>
                      <div className="text-white/70">Banners, programs, certificates, merchandise</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Digital Platforms</div>
                      <div className="text-white/70">Website, social media, email signatures</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Educational Materials</div>
                      <div className="text-white/70">Workbooks, presentations, infographics</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Architectural Elements</div>
                      <div className="text-white/70">Signage, exhibition displays, stage design</div>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Reflection */}
      <section className="py-20 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Design as Philosophy</h2>
            <blockquote className="text-2xl text-white/90 italic leading-relaxed mb-8">
              "Just as the ancient Greeks sought to understand the fundamental nature of reality through logos - the 
              underlying order of the universe - we sought to create a visual language that reveals the underlying 
              connections between all forms of knowledge."
            </blockquote>
            <div className="text-white/60 mb-12">
              — Design Philosophy Statement
            </div>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              The Gnosis Olympus Edition logo system represents more than corporate identity - it's a philosophical 
              statement about the nature of knowledge itself. Each symbol carries the weight of centuries of human 
              inquiry, from ancient Greek philosophy to cutting-edge quantum physics.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              By organizing knowledge into atomic-like structures, we've created a visual metaphor that helps students 
              understand not just what they're learning, but how different fields of study relate to each other at 
              the most fundamental level.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}