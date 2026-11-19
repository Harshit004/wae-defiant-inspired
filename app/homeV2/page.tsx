"use client"

import type { FC } from "react"
import React, { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, animate, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import LightweightRipple from "@/components/LightweightRipple"
import { BLOGS } from "@/data/blogs"
import { toast } from "sonner"

// ── DATA & CONSTANTS ──

const defaultHomepageBlogs = Object.values(BLOGS)
  .filter((b) => b.featuredOnHomepage === true && b.status === "Live")
  .slice(0, 3)
  .map((b) => ({
    id: b.id,
    title: b.title,
    description: b.description,
    heroImage: b.heroImage,
    category: b.category,
    readTime: b.readTime,
  }))

// Responsive container class with max-width clamping and fluid gutters
const containerClass = "mx-auto w-full max-w-[1440px] px-[6.1vw] md:px-[7.5vw]"

// 4 Hero Carousel Slides derived from Figma Node 6709:8319
interface HeroSlide {
  id: number
  headline: string
  subhead?: string
  bodyCopy?: string
  tagline?: string
  badge?: string
  bgImage: string
  isRipple?: boolean
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    headline: "We're here to disrupt the status quo!",
    subhead: "Our Dream is Blue.",
    bgImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5de3d44a-e3d5-415c-eed0-41108c90c900/public",
    isRipple: true,
  },
  {
    id: 2,
    headline: "Carbon neutral water",
    subhead: "Water is our planet's life support system, and carbon emissions are a concern.",
    bodyCopy: "In a world facing climate change, WAE leads by commitment.",
    tagline: "From water intake to water reuse.",
    badge: "Circular Hydrology",
    bgImage: "/hero/hero-slide-2.png",
  },
  {
    id: 3,
    headline: "1% for water",
    subhead: "1% of Net Sales. 100% of Commitment.",
    bodyCopy: "For water resilience, restoration, and access for all.",
    badge: "Global Commitment",
    bgImage: "/hero/hero-slide-3.png",
  },
  {
    id: 4,
    headline: "Blugrids",
    subhead: "One Intelligent Platform - Infinite Water Intelligence",
    bodyCopy: "Next-generation IoT hydration monitoring, real-time purity tracking, and proactive telemetry.",
    badge: "IoT Telemetry",
    bgImage: "/hero/hero-slide-4.png",
  },
]

// Animated Counter
const Counter: FC<{
  value: number
  suffix?: string
  trigger?: boolean
  className?: string
  style?: React.CSSProperties
}> = ({ value, suffix = "", trigger = true, className, style }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!trigger) return
    const controls = animate(0, value, {
      duration: 2,
      onUpdate(v) {
        setCount(v)
      },
    })
    return () => controls.stop()
  }, [value, trigger])

  return (
    <h3
      ref={nodeRef}
      className={className}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(28px, 2.78vw, 44px)",
        lineHeight: "150%",
        color: "#FFFFFF",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {count.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      {suffix}
    </h3>
  )
}

// Reusable Hover Button
interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode
  href?: string
  theme?: "light" | "dark" | "transparent-white" | "transparent-white-black-hover"
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, theme = "light" }) => {
  const [hovered, setHovered] = useState<boolean>(false)

  const buttonContent = (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit"
      style={{
        transition: "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease",
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "clamp(8px, 0.73vw, 12px) clamp(12px, 1.1vw, 20px)",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "clamp(11px, 0.7vw, 13px)",
        lineHeight: "100%",
        textTransform: "none",
        backgroundColor:
          theme === "transparent-white"
            ? hovered
              ? "#fff"
              : "transparent"
            : theme === "transparent-white-black-hover"
            ? hovered
              ? "#fff"
              : "transparent"
            : theme === "dark"
            ? "#000"
            : hovered
            ? "#000"
            : "#fff",
        border:
          theme === "transparent-white" || theme === "transparent-white-black-hover"
            ? "1px solid #fff"
            : theme === "dark"
            ? "1px solid #fff"
            : "1px solid #000",
        cursor: "pointer",
        color:
          theme === "transparent-white"
            ? hovered
              ? "#004063"
              : "#fff"
            : theme === "transparent-white-black-hover"
            ? hovered
              ? "#000"
              : "#fff"
            : theme === "dark"
            ? "#fff"
            : hovered
            ? "#fff"
            : "#000",
      }}
    >
      {children(hovered)}
    </button>
  )

  return href ? (
    href.startsWith("#") ? (
      <a href={href} className="contents" style={{ textDecoration: "none", color: "inherit" }}>
        {buttonContent}
      </a>
    ) : (
      <Link href={href} className="contents">
        {buttonContent}
      </Link>
    )
  ) : (
    buttonContent
  )
}

// ── PILLARS ──

const pillars = [
  {
    title: "Purpose",
    subtitle: "Being Sustainable",
    desc1:
      "The underlying natural order of the universe – circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.",
    desc2:
      "WAE's mission is to lead the industry by offering science and technology driven water purification and reuse solutions.",
    href: "/profile",
  },
  {
    title: "Philosophy",
    subtitle: "Our Green Is Blue",
    desc1:
      "It is where sustainability takes its truest form, not in what is made, but in how it lives on.",
    desc2:
      "At WAE, we do not just treat water but architect a scientific reality where consumption and conservation coexist effortlessly.",
    href: "/sustainability",
  },
  {
    title: "Principle",
    subtitle: "People First",
    desc1:
      "People are the natural rhythm of WAE — endlessly evolving, quietly powerful, shaping the future with every idea they breathe into life.",
    desc2:
      "In their curiosity and courage, the company finds its true flow, turning purpose into action and innovation into enduring impact.",
    href: "/careers",
  },
]

// ── PRODUCT PORTFOLIO ITEMS ──

const productPortfolioItems = [
  {
    id: "assistflow",
    title: "Assistflow",
    category: "Drinking Water Station",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c549c9bc-8af7-41f6-03d5-8c0078e9dd00/public",
    href: "/portfolio/bluwae/assistflow",
  },
  {
    id: "enki",
    title: "Enki",
    category: "Dispenser",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/969cf7aa-9a0c-4e02-c897-8ec75b1b5a00/public",
    href: "/portfolio/bluwae/enki",
  },
  {
    id: "alfa",
    title: "Alfa",
    category: "Drinking Water Faucet",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/800b2aca-19da-4043-42e8-8d5ad223fb00/public",
    href: "/portfolio/trublu/alfa-100",
  },
]

// ── SUSTAINABILITY 4 STEPS (FIGMA SPEC) ──

const sustainabilitySteps = [
  {
    number: "01",
    title: "Water Intake",
    description:
      "Raw water ingress engineered for zero environmental disturbance and dynamic filtration intake balancing natural aquifers.",
  },
  {
    number: "02",
    title: "Purification & Disinfection",
    description:
      "Precision multi-stage nanofiltration and chemical-free UV-C point-of-dispense sterilization preserving essential natural minerals.",
  },
  {
    number: "03",
    title: "Low Carbon Footprint",
    description:
      "Eliminating the manufacturing, packaging, and logistical carbon overhead of single-use bottled water supply chains.",
  },
  {
    number: "04",
    title: "Circular Reuse & Intelligence",
    description:
      "Closed-loop greywater reclamation paired with live Blugrids IoT telemetry for autonomous diagnostics and net-positive impact.",
  },
]

// ── MAIN COMPONENT ──

export default function HomeV2() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroTouchStartX = useRef<number | null>(null)

  // Carousel Autoplay (7 seconds)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    heroTouchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (heroTouchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = heroTouchStartX.current - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
    heroTouchStartX.current = null
  }

  // Impact Section Ref
  const impactRef = useRef<HTMLElement>(null)
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 })

  // Dynamic Blogs & News
  interface HomepageBlog {
    id: string
    title: string
    description: string
    heroImage: string
    category: string
    readTime: string
  }
  const [homepageBlogs, setHomepageBlogs] = useState<HomepageBlog[]>(defaultHomepageBlogs)
  const [blogsLoading, setBlogsLoading] = useState(false)
  const [homepageNews, setHomepageNews] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/homepage-blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setHomepageBlogs(data.blogs)
        }
      })
      .catch(console.error)
      .finally(() => setBlogsLoading(false))

    fetch("/api/news-events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const featured = data.data.items
            .filter((i: any) => i.displayOnHomepage)
            .sort((a: any, b: any) => a.rank - b.rank)
          setHomepageNews(featured)
        }
      })
      .catch(console.error)
  }, [])

  // Contact Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email) {
      toast.error("Please enter your name and email.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          source: "homeV2 - For More Info",
          type: "general",
        }),
      })
      if (res.ok) {
        toast.success("Thank you! We'll get in touch with you soon.")
        setFormState({ name: "", email: "", phone: "", company: "", message: "" })
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (err) {
      toast.error("Failed to submit form. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const activeSlideData = HERO_SLIDES[currentSlide]

  return (
    <main className="relative bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* ── HEADER ── */}
      <Header transparentBg />

      {/* ── HERO CAROUSEL SECTION ── */}
      <section
        id="hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full relative bg-[#0D0D0D] h-[100svh] min-h-[640px] md:min-h-[720px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden"
      >
        {/* Background Slide Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlideData.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          >
            {activeSlideData.isRipple ? (
              <div className="absolute inset-0 w-full h-full opacity-95">
                <LightweightRipple imageUrl={activeSlideData.bgImage} />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={activeSlideData.bgImage}
                  alt={activeSlideData.headline}
                  fill
                  priority
                  className="object-cover object-center md:object-right opacity-85"
                />
                {/* Dark Vignette Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.7) 45%, rgba(13,13,13,0.3) 100%)",
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Top Gradient for Header Contrast */}
        <div
          className="absolute top-0 left-0 right-0 h-[160px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, transparent 100%)",
          }}
        />

        {/* Slide Content Layer */}
        <div className="relative z-[3] flex-1 flex flex-col justify-center pt-[120px] pb-[90px]">
          <div className={containerClass}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlideData.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="max-w-[760px]"
              >
                {activeSlideData.badge && (
                  <span
                    className="inline-block text-[#0081C9] tracking-widest text-[11px] md:text-[13px] uppercase font-semibold mb-3 font-[Inter_Tight]"
                    style={{ letterSpacing: "1.5px" }}
                  >
                    {activeSlideData.badge}
                  </span>
                )}

                <h1
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "clamp(32px, 5.2vw, 76px)",
                    lineHeight: "105%",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                  className="text-white mb-4"
                >
                  {activeSlideData.headline}
                </h1>

                {activeSlideData.subhead && (
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "clamp(16px, 1.8vw, 24px)",
                      lineHeight: "130%",
                      fontWeight: 400,
                      color: "#E0E0E0",
                    }}
                    className="mb-4"
                  >
                    {activeSlideData.subhead}
                  </p>
                )}

                {activeSlideData.bodyCopy && (
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "clamp(13px, 1.05vw, 16px)",
                      lineHeight: "150%",
                      fontWeight: 400,
                      color: "#AEAEAE",
                      maxWidth: "580px",
                    }}
                    className="mb-6"
                  >
                    {activeSlideData.bodyCopy}
                  </p>
                )}

                {activeSlideData.tagline && (
                  <div className="flex items-center gap-2 pt-2 text-[#0081C9] font-medium text-[13px] md:text-[15px]">
                    <span className="w-2 h-2 rounded-full bg-[#0081C9] animate-pulse" />
                    <span>{activeSlideData.tagline}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Pagination & Cues (Bottom Bar) */}
        <div className="relative z-[4] w-full pb-8 md:pb-10 pointer-events-auto">
          <div className={`${containerClass} flex items-center justify-between`}>
            {/* Slide Index Indicators (Pill + Dots matching Figma) */}
            <div className="flex items-center gap-2.5">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-[6px] rounded-full transition-all duration-500 cursor-pointer ${
                      isActive ? "w-[36px] bg-white" : "w-[8px] bg-white/40 hover:bg-white/70"
                    }`}
                  />
                )
              })}
            </div>

            {/* Slide Controls & Water Ripple Cue */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all text-xs"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all text-xs"
              >
                →
              </button>

              {/* Water Wave Indicator Cue from Figma */}
              <div
                title="Interactive Water Ripple"
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <div className="w-3 h-3 rounded-full border border-[#0081C9] animate-ping opacity-60" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0081C9] -ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS SECTION (PURPOSE, PHILOSOPHY, PRINCIPLE) ── */}
      <section className="relative bg-black text-white w-full border-b border-[#FFFFFF33]">
        <div className={containerClass}>
          {/* Desktop 3-Column Layout with 1px dividers */}
          <div className="hidden md:grid grid-cols-3 divide-x divide-[#FFFFFF33] py-[clamp(48px,6vw,84px)]">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between px-8 first:pl-0 last:pr-0 transition-colors duration-500 hover:bg-gradient-to-b hover:from-[#002B49]/30 hover:to-transparent rounded-sm py-4"
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "clamp(22px, 1.8vw, 30px)",
                      lineHeight: "115%",
                      fontWeight: 500,
                    }}
                    className="text-white mb-2"
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "clamp(12px, 0.9vw, 15px)",
                      color: "#0081C9",
                    }}
                    className="mb-6 font-medium"
                  >
                    {pillar.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "clamp(12px, 0.85vw, 14px)",
                      lineHeight: "150%",
                      color: "#AEAEAE",
                    }}
                    className="mb-4"
                  >
                    {pillar.desc1}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "clamp(12px, 0.85vw, 14px)",
                      lineHeight: "150%",
                      color: "#AEAEAE",
                    }}
                    className="mb-8"
                  >
                    {pillar.desc2}
                  </p>
                </div>

                <div>
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 text-white text-[13px] font-[Inter_Tight] hover:text-[#0081C9] transition-colors group-hover:underline underline-offset-4"
                  >
                    <span>Read More</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Stack Layout */}
          <div className="md:hidden py-10 divide-y divide-[#FFFFFF33]">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="py-8 first:pt-0 last:pb-0">
                <h3 className="font-[Inter_Tight] text-[22px] font-medium text-white mb-1">
                  {pillar.title}
                </h3>
                <p className="font-[Inter_Tight] text-[13px] text-[#0081C9] font-medium mb-3">
                  {pillar.subtitle}
                </p>
                <p className="font-[Manrope] text-[13px] text-[#AEAEAE] leading-relaxed mb-3">
                  {pillar.desc1}
                </p>
                <p className="font-[Manrope] text-[13px] text-[#AEAEAE] leading-relaxed mb-4">
                  {pillar.desc2}
                </p>
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-2 text-white text-[13px] underline underline-offset-4 font-[Inter_Tight]"
                >
                  <span>Read More</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT PORTFOLIO SECTION (MATCHING FIGMA NODE 6709:8319) ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)]">
        <div className={containerClass}>
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="text-[#0081C9] tracking-[2px] text-[11px] md:text-[12px] uppercase font-semibold font-[Inter_Tight] block mb-3">
                Product Portfolio
              </span>
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(24px, 2.78vw, 42px)",
                  lineHeight: "115%",
                  color: "#FFFFFF",
                }}
                className="max-w-[720px] font-normal"
              >
                Every product is designed to replace plastic and reduce operational carbon footprint.
              </h2>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#0081C9] transition-colors text-[13px] font-[Inter_Tight] underline underline-offset-4"
              >
                <span>View All Products</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 4 Cards Grid matching Figma layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productPortfolioItems.map((prod) => (
              <Link key={prod.id} href={prod.href} className="group block h-full">
                <div className="h-full bg-[#111111] border border-white/10 group-hover:border-[#0081C9]/60 rounded-sm p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,129,201,0.15)] relative overflow-hidden">
                  {/* Subtle Top-right corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

                  {/* Product Image Stage */}
                  <div className="relative w-full aspect-[4/5] mb-6 flex items-center justify-center bg-black/40 rounded-sm p-4 overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Radial backlight under product */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-[#0081C9]/20 blur-xl pointer-events-none rounded-full" />
                  </div>

                  {/* Product Metadata */}
                  <div>
                    <span className="text-[11px] font-[Manrope] text-[#AEAEAE] tracking-wide block mb-1">
                      {prod.category}
                    </span>
                    <h3 className="font-[Inter_Tight] text-[20px] font-medium text-white group-hover:text-[#0081C9] transition-colors mb-3">
                      {prod.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 text-white/60 group-hover:text-white text-[12px] font-[Inter_Tight] transition-colors">
                      <span>Know More</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* 4th Card: Solid Blue View All Action Card */}
            <Link href="/portfolio" className="group block h-full">
              <div
                className="h-full rounded-sm p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #003B64 0%, #001A2C 100%)",
                  border: "1px solid rgba(0, 129, 201, 0.4)",
                }}
              >
                <div className="w-24 h-24 rounded-full border border-white/40 group-hover:border-white group-hover:scale-110 flex items-center justify-center mb-6 transition-all duration-500">
                  <span className="font-[Inter_Tight] text-[13px] tracking-widest text-white uppercase font-semibold">
                    View All
                  </span>
                </div>
                <h4 className="font-[Inter_Tight] text-[18px] text-white font-medium mb-2">
                  Complete Portfolio
                </h4>
                <p className="font-[Manrope] text-[12px] text-white/70 max-w-[200px]">
                  Explore all commercial, industrial & office water solutions
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY SECTION (FIGMA SPEC: AERIAL RIVER DELTA & 4 STEPS) ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)]">
        <div className={containerClass}>
          {/* Header */}
          <div className="mb-12">
            <span className="text-[#0081C9] tracking-[2px] text-[11px] md:text-[12px] uppercase font-semibold font-[Inter_Tight] block mb-3">
              Sustainability
            </span>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(28px, 3.2vw, 46px)",
                  lineHeight: "110%",
                  color: "#FFFFFF",
                }}
                className="max-w-[700px] font-normal"
              >
                Carbon Neutral water
                <br />
                from water intake to water reuse
              </h2>
              <div className="flex-shrink-0">
                <Link href="/sustainability" className="contents">
                  <HoverButton theme="transparent-white">
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4 ml-1">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon"
                            width={16}
                            height={16}
                            className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                          />
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>

          {/* Grid Layout: Aerial River Map on Left, 4 Process Steps on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: River Map Artwork */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-[#111111]">
              <Image
                src="/hero/sustainability-river.png"
                alt="Hydrological River Delta Topography"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-[Manrope] text-[#AEAEAE]">
                Continuous Hydrological Cycle — Engineered Zero Landfill
              </div>
            </div>

            {/* Right: 4 Structured Steps */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 divide-white/10">
              {sustainabilitySteps.map((step) => (
                <div key={step.number} className="pt-4 sm:pt-0">
                  <div className="text-[#0081C9] font-[Inter_Tight] text-[16px] font-semibold mb-2">
                    {step.number}
                  </div>
                  <h3 className="font-[Inter_Tight] text-[18px] text-white font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="font-[Manrope] text-[13px] text-[#AEAEAE] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT SECTION (METRICS & SKYLINE SILHOUETTE) ── */}
      <section
        ref={impactRef}
        className="relative text-white w-full border-b border-[#FFFFFF33] overflow-hidden"
        style={{
          background: "linear-gradient(146.59deg, #004063 4.52%, #000000 49.04%)",
        }}
      >
        {/* Background SVG / Skyline silhouette */}
        <img
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374f4710-d942-4059-e39c-b5fc24283700/public"
          alt="Impact Silhouette"
          className="absolute md:top-0 top-1/2 md:right-0 -right-[12.72vw] md:translate-y-0 -translate-y-1/2 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)",
            maskImage: "linear-gradient(to right, transparent, black 15%)",
          }}
        />

        <div className={`relative z-10 py-[clamp(80px,8.6vw,124px)] ${containerClass}`}>
          <div className="max-w-[600px] mb-12">
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(32px, 2.78vw, 42px)",
                lineHeight: "110%",
                color: "#FFFFFF",
              }}
              className="mb-2 font-normal"
            >
              Impact
            </h2>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(16px, 1.38vw, 20px)",
                lineHeight: "110%",
                color: "#FFFFFF",
              }}
              className="mb-4"
            >
              Real numbers. Real results.
            </p>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(12px, 0.97vw, 14px)",
                lineHeight: "140%",
                color: "#AEAEAE",
                maxWidth: "460px",
              }}
              className="mb-8"
            >
              Measured outcomes that demonstrate how our systems reduce environmental footprint at
              scale.
            </p>
            <Link href="/sustainability" className="contents">
              <HoverButton theme="transparent-white">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4 ml-1">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        alt="icon"
                        width={16}
                        height={16}
                        className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                      />
                    </div>
                  </>
                )}
              </HoverButton>
            </Link>
          </div>

          {/* Counters Grid with 1px dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20 pt-4">
            <div className="sm:pr-6 pt-4 sm:pt-0">
              <Counter value={1012120.45} suffix="+" trigger={isImpactInView} />
              <p className="font-[Manrope] text-[14px] text-[#AEAEAE] mt-2">
                Tonnes CO₂ emissions saved
              </p>
            </div>

            <div className="sm:px-6 pt-6 sm:pt-0">
              <Counter value={12185.45} suffix="+" trigger={isImpactInView} />
              <p className="font-[Manrope] text-[14px] text-[#AEAEAE] mt-2">
                Million gallons of water saved
              </p>
            </div>

            <div className="sm:pl-6 pt-6 sm:pt-0">
              <Counter value={22253.65} suffix="+" trigger={isImpactInView} />
              <p className="font-[Manrope] text-[14px] text-[#AEAEAE] mt-2">
                Tonnes plastic removed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSPECTIVES SECTION ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)]">
        <div className={containerClass}>
          <div className="flex justify-between items-start w-full mb-12">
            <div className="flex-1">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(28px, 2.78vw, 40px)",
                  lineHeight: "110%",
                  color: "#FFFFFF",
                }}
                className="mb-3 font-normal"
              >
                Perspectives
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "140%",
                  color: "#AEAEAE",
                  maxWidth: "460px",
                }}
              >
                WAE publishes perspectives on climate, water, and sustainability — because good water
                companies think beyond the tap.
              </p>
            </div>

            <div className="flex-shrink-0">
              <HoverButton href="/perspectives" theme="transparent-white-black-hover">
                {(hovered) => (
                  <>
                    View All
                    <div className="relative inline-block w-4 h-4 ml-2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        alt="icon"
                        width={16}
                        height={16}
                        className={hovered ? "brightness-0" : "brightness-0 invert"}
                      />
                    </div>
                  </>
                )}
              </HoverButton>
            </div>
          </div>

          {/* 3-Column Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {blogsLoading
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="border-l border-white/20 pl-6">
                    <div className="relative w-full aspect-square overflow-hidden mb-6 bg-white/5 animate-pulse rounded" />
                    <div className="h-5 bg-white/5 animate-pulse mb-2 w-3/4 rounded" />
                    <div className="h-4 bg-white/5 animate-pulse mb-1 w-full rounded" />
                  </div>
                ))
              : homepageBlogs.map((blog) => {
                  const categorySlug = blog.category
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
                  const blogUrl = `/perspectives/${categorySlug}/${blog.id}`
                  return (
                    <Link key={blog.id} href={blogUrl} className="contents">
                      <div className="group cursor-pointer border-l border-white/20 pl-6 lg:pl-8">
                        <div className="relative w-full aspect-square overflow-hidden mb-6 rounded-sm bg-white/5">
                          {blog.heroImage ? (
                            <Image
                              src={blog.heroImage}
                              alt={blog.title}
                              fill
                              className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#AEAEAE] text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="min-h-[64px] mb-3">
                          <h3
                            style={{
                              fontFamily: "'Inter Tight', sans-serif",
                              fontSize: "clamp(16px, 1.25vw, 18px)",
                              lineHeight: "130%",
                              color: "#FFFFFF",
                            }}
                            className="group-hover:text-[#0081C9] transition-colors"
                          >
                            {blog.title}
                          </h3>
                        </div>
                        <p
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "clamp(11px, 0.83vw, 13px)",
                            lineHeight: "140%",
                            color: "#AEAEAE",
                          }}
                          className="mb-6 line-clamp-3"
                        >
                          {blog.description}
                        </p>
                        <div className="flex items-center gap-2 text-white group-hover:text-[#0081C9] transition-colors">
                          <span
                            style={{
                              fontFamily: "'Inter Tight', sans-serif",
                              fontSize: "12px",
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            Read Article
                          </span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  )
                })}
          </div>
        </div>
      </section>

      {/* ── MENTIONED SECTION ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)]">
        <div className={containerClass}>
          <div className="w-full mb-10">
            <span className="text-[#0081C9] tracking-[2px] text-[11px] md:text-[12px] uppercase font-semibold font-[Inter_Tight] block mb-2">
              Mentioned
            </span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(24px, 2.78vw, 40px)",
                  lineHeight: "115%",
                  color: "#FFFFFF",
                  maxWidth: "760px",
                }}
                className="font-normal"
              >
                Stay informed with our latest media coverage and announcements | Mentioned
              </h2>
              <div className="flex-shrink-0">
                <HoverButton href="/news-and-updates" theme="transparent-white-black-hover">
                  {(hovered) => (
                    <>
                      View All
                      <div className="relative inline-block w-4 h-4 ml-2">
                        <Image
                          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                          alt="icon"
                          width={16}
                          height={16}
                          className={hovered ? "brightness-0" : "brightness-0 invert"}
                        />
                      </div>
                    </>
                  )}
                </HoverButton>
              </div>
            </div>
          </div>

          {/* 12-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Feature 1 */}
            <div className="md:col-span-4 group cursor-pointer">
              {homepageNews[0] ? (
                <Link href={homepageNews[0].link} className="block">
                  <div className="relative w-full aspect-[1.8/1] overflow-hidden mb-5 rounded-sm bg-white/5">
                    <Image
                      src={homepageNews[0].imageUrl}
                      alt={homepageNews[0].title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="font-[Inter_Tight] text-[18px] text-white mb-2 group-hover:text-[#0081C9] transition-colors">
                    {homepageNews[0].title}
                  </h3>
                  <p className="font-[Manrope] text-[13px] text-[#AEAEAE] line-clamp-3">
                    {homepageNews[0].description}
                  </p>
                </Link>
              ) : (
                <div className="w-full aspect-[1.8/1] bg-white/5 animate-pulse rounded" />
              )}
            </div>

            {/* Feature 2 */}
            <div className="md:col-span-4 group cursor-pointer">
              {homepageNews[1] ? (
                <Link href={homepageNews[1].link} className="block">
                  <div className="relative w-full aspect-[1.8/1] overflow-hidden mb-5 rounded-sm bg-white/5">
                    <Image
                      src={homepageNews[1].imageUrl}
                      alt={homepageNews[1].title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="font-[Inter_Tight] text-[18px] text-white mb-2 group-hover:text-[#0081C9] transition-colors">
                    {homepageNews[1].title}
                  </h3>
                  <p className="font-[Manrope] text-[13px] text-[#AEAEAE] line-clamp-3">
                    {homepageNews[1].description}
                  </p>
                </Link>
              ) : (
                <div className="w-full aspect-[1.8/1] bg-white/5 animate-pulse rounded" />
              )}
            </div>

            {/* Sidebar list */}
            <div className="md:col-span-4 flex flex-col gap-5 justify-between">
              {homepageNews.slice(2, 5).map((item) => (
                <Link href={item.link} key={item.id} className="flex gap-4 items-start group cursor-pointer">
                  <div className="relative w-[110px] aspect-[1.4/1] flex-shrink-0 rounded-sm overflow-hidden bg-white/5">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-[Inter_Tight] text-[14px] text-white font-medium line-clamp-2 group-hover:text-[#0081C9] transition-colors mb-1">
                      {item.title}
                    </h4>
                    <p className="font-[Manrope] text-[11px] text-[#AEAEAE] line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
              {homepageNews.slice(2, 5).length === 0 && (
                <div className="w-full h-32 bg-white/5 animate-pulse rounded" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR MORE INFO (DIRECT LEAD CONTACT FORM MATCHING FIGMA) ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)]">
        <div className={containerClass}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Coordinates */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[#0081C9] tracking-[2px] text-[11px] md:text-[12px] uppercase font-semibold font-[Inter_Tight] block mb-3">
                  Contact
                </span>
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "clamp(32px, 3.6vw, 52px)",
                    lineHeight: "105%",
                    color: "#FFFFFF",
                  }}
                  className="mb-8 font-normal"
                >
                  For More Info
                </h2>
                <div className="space-y-6 text-[#AEAEAE] font-[Manrope] text-[14px]">
                  <div>
                    <h4 className="text-white font-[Inter_Tight] text-[15px] font-medium mb-1">
                      Corporate Headquarters
                    </h4>
                    <p>H-18, Sector 63, Noida, Uttar Pradesh, India, 201301</p>
                  </div>
                  <div>
                    <h4 className="text-white font-[Inter_Tight] text-[15px] font-medium mb-1">
                      Direct Telephone
                    </h4>
                    <a href="tel:+911204069800" className="hover:text-white transition-colors">
                      +91 120 4069800
                    </a>
                  </div>
                  <div>
                    <h4 className="text-white font-[Inter_Tight] text-[15px] font-medium mb-1">
                      Inquiries & Dialogues
                    </h4>
                    <a href="mailto:contact@waecorp.com" className="hover:text-white transition-colors">
                      contact@waecorp.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <span className="text-[12px] text-[#AEAEAE] font-[Inter_Tight] block">
                  ISO 9001, ISO 14001, ISO 45001 Certified Hydration Architecture
                </span>
              </div>
            </div>

            {/* Right: Direct Form */}
            <div className="lg:col-span-7 bg-[#111111]/60 border border-white/10 rounded-sm p-8 lg:p-10">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-[Inter_Tight] uppercase text-[#AEAEAE] tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-black/50 border border-white/20 focus:border-[#0081C9] outline-none text-white px-4 py-3 text-[14px] font-[Manrope] rounded-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-[Inter_Tight] uppercase text-[#AEAEAE] tracking-wider mb-2">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-black/50 border border-white/20 focus:border-[#0081C9] outline-none text-white px-4 py-3 text-[14px] font-[Manrope] rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-[Inter_Tight] uppercase text-[#AEAEAE] tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/50 border border-white/20 focus:border-[#0081C9] outline-none text-white px-4 py-3 text-[14px] font-[Manrope] rounded-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-[Inter_Tight] uppercase text-[#AEAEAE] tracking-wider mb-2">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="Acme Enterprises"
                      className="w-full bg-black/50 border border-white/20 focus:border-[#0081C9] outline-none text-white px-4 py-3 text-[14px] font-[Manrope] rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-[Inter_Tight] uppercase text-[#AEAEAE] tracking-wider mb-2">
                    Message / Hydration Needs
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your workplace requirements or hydration goals..."
                    className="w-full bg-black/50 border border-white/20 focus:border-[#0081C9] outline-none text-white px-4 py-3 text-[14px] font-[Manrope] rounded-sm transition-colors resize-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-[Manrope] text-[13px] font-semibold tracking-wide uppercase rounded-sm hover:bg-[#0081C9] hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  )
}
