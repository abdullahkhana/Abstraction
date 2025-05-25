"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { AdvancedButton } from "@/components/ui/advanced-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Calendar, Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["hello@abstractionstudios.com", "projects@abstractionstudios.com"],
      action: "Send Email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+44 20 7123 4567"],
      action: "Call Now",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Offices",
      details: ["New York, USA", "London, UK", "Dubai, UAE"],
      action: "Get Directions",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      action: "Schedule Call",
    },
  ]

  const projectTypes = [
    "Brand Identity Design",
    "Web Development",
    "Video Production",
    "Social Media Management",
    "E-commerce Development",
    "Mobile App Design",
    "Digital Marketing",
    "Other",
  ]

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
    "Let's Discuss",
  ]

  const timelines = ["ASAP", "1-2 weeks", "1 month", "2-3 months", "3+ months", "Flexible"]

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
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              Ready to transform your vision into reality? Let's start a conversation that could change everything.
              We're here to listen, understand, and create something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="gradient" className="h-full">
                  <div className="p-6 text-center">
                    <div className="text-primary mb-4 flex justify-center">{info.icon}</div>
                    <h3 className="text-lg font-bold mb-4">{info.title}</h3>
                    <div className="space-y-2 mb-6">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <AdvancedButton variant="ghost" size="sm" className="w-full">
                      {info.action}
                    </AdvancedButton>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ModernCard variant="glass">
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-8">Start Your Project</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name *</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="bg-background/50 border-border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="bg-background/50 border-border"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="bg-background/50 border-border"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Project Type *</label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            required
                            className="w-full h-12 px-3 bg-background/50 border border-border rounded-xl focus:border-primary transition-colors"
                          >
                            <option value="">Select project type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Budget Range</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full h-12 px-3 bg-background/50 border border-border rounded-xl focus:border-primary transition-colors"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full h-12 px-3 bg-background/50 border border-border rounded-xl focus:border-primary transition-colors"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Project Details *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                          rows={6}
                          required
                          className="bg-background/50 border-border resize-none"
                        />
                      </div>

                      <AdvancedButton
                        variant="gradient"
                        size="lg"
                        className="w-full"
                        icon={<Send className="w-4 h-4" />}
                        type="submit"
                      >
                        Send Message
                      </AdvancedButton>
                    </form>
                  )}
                </div>
              </ModernCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Let's Talk</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Whether you have a specific project in mind or just want to explore possibilities, we're here to help.
                  Our team of experts is ready to discuss your vision and provide insights on how we can bring it to
                  life.
                </p>
              </div>

              <ModernCard variant="neon">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                    Quick Response Guarantee
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We understand that timing is crucial for your projects. That's why we guarantee a response within 24
                    hours for all inquiries.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Initial response within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Detailed proposal within 48 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Free consultation call available</span>
                    </div>
                  </div>
                </div>
              </ModernCard>

              <ModernCard variant="gradient">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4">Prefer to Schedule a Call?</h3>
                  <p className="text-muted-foreground mb-6">
                    Sometimes it's easier to discuss your project over a call. Book a free 30-minute consultation with
                    our team.
                  </p>
                  <AdvancedButton
                    variant="secondary"
                    size="md"
                    icon={<Calendar className="w-4 h-4" />}
                    className="w-full"
                  >
                    Schedule Free Consultation
                  </AdvancedButton>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our process and services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What's your typical project timeline?",
                answer:
                  "Project timelines vary based on scope and complexity. Simple projects like logo design can take 1-2 weeks, while comprehensive brand identities or web development projects typically take 4-8 weeks. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you work with international clients?",
                answer:
                  "We work with clients worldwide and have experience managing projects across different time zones. Our team is distributed globally, allowing us to provide support and communication that works for your schedule.",
              },
              {
                question: "What's included in your project proposals?",
                answer:
                  "Our proposals include detailed project scope, timeline, deliverables, pricing breakdown, and terms. We believe in transparency and ensure you understand exactly what you're getting before we start working together.",
              },
              {
                question: "Can you work within our existing brand guidelines?",
                answer:
                  "Yes, we can work within existing brand guidelines or help evolve them as needed. We're experienced in both creating new brand identities and enhancing existing ones while maintaining brand consistency.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ModernCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
