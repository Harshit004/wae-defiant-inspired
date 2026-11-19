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
import ContactSectionDark from "@/components/contact-section-dark"

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

// ── SECTORS ──

const sectorsRow1 = [
  {
    name: "Corporate",
    icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3377d5c7-cc8b-48da-02a8-047ba09d6a00/public",
  },
  {
    name: "Hospitality",
    icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d64e3fde-83e0-43e0-e0d9-625eb4b6bf00/public",
  },
  {
    name: "Education",
    icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4efa005e-5156-4427-6893-5a8b27cde800/public",
  },
]

const sectorsRow2 = [
  {
    name: "Healthcare",
    icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a4022f96-a986-4a49-f5ff-bf6d785f8900/public",
  },
  {
    name: "BFSI",
    icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/836e8835-2b94-45d4-fcdd-8c760d8b6300/public",
  },
  {
    name: "Consultancy",
    icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5226aae0-7c1e-4141-35c7-6adf421a4a00/public",
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



// ── MAIN COMPONENT ──

export default function HomeV2() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroTouchStartX = useRef<number | null>(null)

  // Carousel Autoplay (2 seconds as specified)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 2000)
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

  // Pillar scroll state (same as main homepage)
  const pillarContainerRef = useRef<HTMLDivElement>(null)
  const [pillarActiveIndex, setPillarActiveIndex] = useState(0)

  const handlePillarScroll = () => {
    if (pillarContainerRef.current) {
      const scrollLeft = pillarContainerRef.current.scrollLeft
      const width = pillarContainerRef.current.offsetWidth
      const index = Math.round(scrollLeft / width)
      setPillarActiveIndex(index)
    }
  }

  // Earth video position tracking (same as main homepage)
  const waterWordRef = useRef<HTMLSpanElement>(null)
  const earthContainerRef = useRef<HTMLDivElement>(null)
  const [earthMarginLeft, setEarthMarginLeft] = useState<number>(0)

  useEffect(() => {
    const updateEarthPos = () => {
      if (waterWordRef.current && earthContainerRef.current) {
        const waterRect = waterWordRef.current.getBoundingClientRect()
        const containerRect = earthContainerRef.current.getBoundingClientRect()
        const waterCenter = waterRect.left + waterRect.width / 2

        const vw = typeof window !== "undefined" ? window.innerWidth : 1440
        const desiredVideoWidth = Math.min(412, Math.max(294, (28.58 / 100) * vw))
        const actualVideoWidth = Math.min(containerRect.width, desiredVideoWidth)

        const targetLeft = waterCenter - containerRect.left - actualVideoWidth / 2
        const maxLeft = Math.max(0, containerRect.width - actualVideoWidth)
        const clampedLeft = Math.max(0, Math.min(maxLeft, targetLeft))

        setEarthMarginLeft(clampedLeft)
      }
    }
    updateEarthPos()
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateEarthPos)
    }
    window.addEventListener("resize", updateEarthPos)
    return () => window.removeEventListener("resize", updateEarthPos)
  }, [])

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
        className="w-full relative bg-[#0D0D0D] h-screen h-[100dvh] flex flex-col justify-between overflow-hidden"
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

        {/* Carousel Pagination (Centered, no navigation arrows) */}
        <div className="relative z-[4] w-full pb-8 md:pb-10 pointer-events-auto">
          <div className="w-full flex items-center justify-center">
            {/* Slide Index Indicators (Pill + Dots centered) */}
            <div className="flex items-center justify-center gap-2.5">
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
          </div>
        </div>
      </section>

      {/* ── PURPOSE, PHILOSOPHY & PRINCIPLE SECTION (SAME AS MAIN HOMEPAGE) ── */}
      <section className="relative bg-black text-white w-full">
        <div className="w-full md:h-[576px]">
          <div
            ref={pillarContainerRef}
            onScroll={handlePillarScroll}
            className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:h-full md:overflow-visible border-b border-[#FFFFFF4D]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className={`min-w-full md:min-w-0 snap-center snap-always flex flex-col py-[21.1vw] md:py-0 md:h-full items-center justify-center px-[18.06vw] md:px-12 lg:px-24 ${
                  idx < 2 ? "md:border-r md:border-[#FFFFFF4D]" : ""
                } hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group`}
              >
                <div className="flex flex-col w-full max-w-[320px]">
                  <h2
                    className="text-[7.12vw] md:text-[40px] leading-[110%] font-normal"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      letterSpacing: "0%",
                    }}
                  >
                    {pillar.title}
                  </h2>
                  <div className="h-[6.1vw] md:h-[32px]" />
                  <h3
                    className="text-white group-hover:text-white text-[3.05vw] md:text-[16px] leading-[100%] font-bold"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                    }}
                  >
                    {pillar.subtitle}
                  </h3>
                  <div className="h-[3.05vw] md:h-[16px]" />
                  <p
                    className="text-white/60 group-hover:text-white text-[3.05vw] md:text-[12px] leading-[120%] md:leading-[140%] font-normal"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {pillar.desc1}
                  </p>
                  <div className="h-[3.05vw] md:h-[12px]" />
                  <p
                    className="text-white/60 group-hover:text-white text-[3.05vw] md:text-[12px] leading-[120%] md:leading-[140%] font-normal"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {pillar.desc2}
                  </p>
                  <div className="h-[6.1vw] md:h-[32px]" />
                  <Link href={pillar.href} className="contents">
                    <HoverButton theme="transparent-white">
                      {(hovered) => (
                        <>
                          Know More
                          <div className="relative inline-block w-4 h-4">
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                              alt={`${pillar.title} icon`}
                              width={16}
                              height={16}
                              className={hovered ? "filter-wae-blue" : ""}
                            />
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hovered ? 1 : 0 }}
                              transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                              className="absolute top-0 left-0"
                            >
                              <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                                alt={`${pillar.title} icon hover`}
                                width={16}
                                height={16}
                                className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                              />
                            </motion.div>
                          </div>
                        </>
                      )}
                    </HoverButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile carousel indicator dots */}
          <div className="w-full md:hidden border-b border-[#FFFFFF4D] py-6 flex justify-center items-center gap-[6px]">
            {pillars.map((_, i) => (
              <div
                key={i}
                className={`h-[6px] rounded-full transition-all duration-300 bg-[#D9D9D9] ${
                  i === pillarActiveIndex ? "w-[24px]" : "w-[6px] opacity-30"
                }`}
              />
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

      {/* ── SUSTAINABILITY SECTION (SAME AS MAIN HOMEPAGE) ── */}
      <section className="bg-black text-white md:border-b-0">
        {/* Desktop Layout */}
        <div className="w-full hidden md:block border-b border-[#FFFFFF4D] pt-[108px] pb-[68px]" style={{ paddingLeft: "7.5vw", paddingRight: "7.5vw" }}>

          <div className="w-full">
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "110%",
                letterSpacing: "0px",
                verticalAlign: "middle",
                color: "#FFFFFF",
              }}
            >
              Sustainability
            </h3>
            <div style={{ height: "26px" }} />
          </div>

          {/* Top Row: Heading on left, Quote on right */}
          <div className="flex justify-between items-stretch w-full gap-6 lg:gap-10">
            {/* Left Column - Heading & Subtitle */}
            <div style={{ width: "clamp(320px, 35vw, 490px)" }} className="relative flex flex-col flex-shrink-0">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "52px",
                  lineHeight: "110%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
              >
                Earth, Our Only<br />Shareholder
              </h2>
              <div style={{ height: "31px" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#AEAEAE",
                }}
              >
                A ledger of people, planet, and profit and the <span ref={waterWordRef}>water</span> that connects them all.
              </p>
              <div style={{ height: "60px" }} />
            </div>

            {/* Right Column - Quote & Author */}
            <div style={{ maxWidth: "650px" }} className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "clamp(28px, 2.78vw, 40px)",
                    lineHeight: "105%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                >
                  <span className="whitespace-nowrap">“He who knows that <span style={{ color: "#FFFFFF" }}>enough is </span></span><br />
                  <span className="whitespace-nowrap"><span style={{ color: "#FFFFFF" }}>enough</span> will always have <span style={{ color: "#FFFFFF" }}>enough.</span> ”</span>
                </h3>

                <div style={{ height: "35px" }} />

                <div className="w-full flex justify-end">
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      fontSize: "16px",
                      lineHeight: "105%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "#FFFFFF",
                    }}
                  >
                    - Lao Tzu
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Button & Earth Video on left aligned with Horizontal Line & Text Columns on right */}
          <div className="flex justify-between items-start w-full gap-6 lg:gap-10">
            {/* Left Column - Button & Earth Video */}
            <div style={{ width: "clamp(320px, 35vw, 490px)" }} className="w-full flex flex-col relative flex-shrink-0">
              <div className="relative z-20 flex items-start" style={{ height: "49px" }}>
                <Link href="/sustainability" className="contents">
                  <HoverButton theme="transparent-white">
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                            className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                              className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>

              {/* Earth video (center aligned vertically with the word 'water' in subtext, strictly contained) */}
              <div ref={earthContainerRef} className="w-full relative z-0 overflow-hidden">
                <div
                  className="relative"
                  style={{
                    width: "clamp(294px, 28.58vw, 412px)",
                    height: "clamp(252px, 24.5vw, 353px)",
                    maxWidth: "100%",
                    marginLeft: `${earthMarginLeft}px`,
                    overflow: "hidden",
                    transform: "translateY(-5%) scaleX(-1)",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <iframe
                      src="https://customer-nqls4utgv1ytiyat.cloudflarestream.com/d504f9762d02a41de4b5b5010d52e126/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nqls4utgv1ytiyat.cloudflarestream.com%2Fd504f9762d02a41de4b5b5010d52e126%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                      style={{
                        border: "none",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        pointerEvents: "none",
                      }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Horizontal Line & Two Text Columns */}
            <div style={{ maxWidth: "650px" }} className="relative z-10 flex flex-col flex-1 min-w-0">
              <div style={{ height: "49px" }} className="flex flex-col justify-start">
                {/* Horizontal line aligned with button top */}
                <div className="w-full h-px bg-[#FFFFFF4D]" />
              </div>

              {/* Two sub-columns */}
              <div className="grid grid-cols-2 gap-8 lg:gap-12 relative z-10">
                {/* Sub-column 1 */}
                <div
                  className="relative z-10 flex flex-col space-y-4"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "130%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                >
                  <p>
                    It does not attend AGMs. It signs no term sheets. It cannot vote against us.
                  </p>
                  <p>
                    But before there were contracts, there was Earth. Before there were compliance frameworks, there was water. And before there were boards and balance sheets, there was a responsibility to protect what sustains life.
                  </p>
                  <p>
                    For us, this recognition is not philosophical. It is operational.
                  </p>
                  <p>
                    Our manifesto begins with a simple, unwavering premise: The environment is not a stakeholder in our business.
                  </p>
                </div>

                {/* Sub-column 2 */}
                <div
                  className="relative z-10 flex flex-col space-y-4"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "130%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                >
                  <p>
                    It is the context within which our business is allowed to exist.
                  </p>
                  <p>
                    In this view, sustainability is not an initiative layered onto business strategy.<br />
                    It is the condition that determines whether that strategy is viable at all.
                  </p>
                  <p>
                    This is our account of stewardship to the only shareholder that was always there.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Layout */}
        <div className="w-full md:hidden flex flex-col pt-[108px] pb-[68px] px-[6.1vw] border-b border-[#FFFFFF4D]">
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "4.58vw", lineHeight: "115%" }}>
            Sustainability
          </h3>
          <div style={{ height: "7.12vw" }} />
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "7.12vw", lineHeight: "105%" }}>
            Earth, Our Only Shareholder
          </h2>
          <div style={{ height: "3.5vw" }} />
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "3.05vw", lineHeight: "120%", color: "#AEAEAE" }}>
            A ledger of people, planet, and profit and the water that connects them all.
          </p>
          <div style={{ height: "6vw" }} />

          {/* Button */}
          <div className="flex">
            <Link href="/sustainability" className="contents">
              <HoverButton theme="transparent-white">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        alt="icon default"
                        width={16}
                        height={16}
                        className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                        className="absolute top-0 left-0"
                      >
                        <Image
                          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                          alt="icon hover"
                          width={16}
                          height={16}
                          className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                        />
                      </motion.div>
                    </div>
                  </>
                )}
              </HoverButton>
            </Link>
          </div>

          <div style={{ height: "6vw" }} />

          {/* Earth Video */}
          <div className="w-full flex justify-center relative z-0">
            <div
              className="relative w-full"
              style={{
                maxWidth: "412px",
                aspectRatio: "392 / 336",
                overflow: "hidden",
                transform: "translateY(-5%) scaleX(-1)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <iframe
                  src="https://customer-nqls4utgv1ytiyat.cloudflarestream.com/d504f9762d02a41de4b5b5010d52e126/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nqls4utgv1ytiyat.cloudflarestream.com%2Fd504f9762d02a41de4b5b5010d52e126%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                  style={{
                    border: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen={true}
                />
              </div>
            </div>
          </div>

          <div style={{ height: "10vw" }} />

          {/* Quote */}
          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "5.6vw",
              lineHeight: "105%",
              color: "#AEAEAE",
            }}
          >
            “He who knows that <span style={{ color: "#FFFFFF" }}>enough</span><br />
            is <span style={{ color: "#FFFFFF" }}>enough</span> will always have <span style={{ color: "#FFFFFF" }}>enough.</span> ”
          </h3>

          <div style={{ height: "17px" }} />

          <div className="w-full flex justify-end">
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "105%",
                color: "#FFFFFF",
              }}
            >
              - Lao Tzu
            </span>
          </div>

          <div style={{ height: "31px" }} />
          <div className="w-full h-px bg-[#FFFFFF4D]" />
          <div style={{ height: "35px" }} />

          {/* Text paragraphs */}
          <div
            className="relative z-10 flex flex-col space-y-4"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "130%",
              color: "#AEAEAE",
            }}
          >
            <p>
              It does not attend AGMs. It signs no term sheets. It cannot vote against us.
            </p>
            <p>
              But before there were contracts, there was Earth. Before there were compliance frameworks, there was water. And before there were boards and balance sheets, there was a responsibility to protect what sustains life.
            </p>
            <p>
              For us, this recognition is not philosophical. It is operational.
            </p>
            <p>
              Our manifesto begins with a simple, unwavering premise: The environment is not a stakeholder in our business.
            </p>
            <p>
              It is the context within which our business is allowed to exist.
            </p>
            <p>
              In this view, sustainability is not an initiative layered onto business strategy.<br />
              It is the condition that determines whether that strategy is viable at all.
            </p>
            <p>
              This is our account of stewardship to the only shareholder that was always there.
            </p>
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

      {/* ── THE COMPANY WE KEEP SECTION (FOOTPRINT & PARTNERS) ── */}
      <section className="bg-black text-white overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row justify-between items-stretch">
          {/* Left Column */}
          <div className="w-full lg:w-[48%] max-w-[680px] flex flex-col pl-[6.1vw] pr-[6.1vw] lg:pl-[7.5vw] lg:pr-0 py-[clamp(60px,7vw,102px)]">
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(32px, 3.82vw, 55px)",
                lineHeight: "105%",
                color: "#FFFFFF",
              }}
              className="mb-4"
            >
              The company
              <br />
              we keep
            </h2>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(13px, 1.11vw, 16px)",
                color: "#AEAEAE",
              }}
              className="mb-12"
            >
              Brands we serve. Alliances we value.
            </p>

            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(14px, 1.11vw, 16px)",
                color: "#FFFFFF",
              }}
              className="font-medium mb-6"
            >
              Sectors we serve
            </h3>

            {/* Sectors Grid */}
            <div className="grid grid-cols-3 gap-6">
              {[...sectorsRow1, ...sectorsRow2].map((sector) => (
                <div key={sector.name} className="flex flex-col items-center text-center gap-2">
                  <div className="relative w-10 h-10 flex items-center justify-center rounded bg-white/5 p-2">
                    <img
                      src={sector.icon}
                      alt={sector.name}
                      className="w-full h-full object-contain filter invert opacity-80"
                    />
                  </div>
                  <span className="font-[Manrope] text-[12px] text-[#AEAEAE]">{sector.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Map Visual */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end self-stretch px-[6.1vw] lg:px-0 lg:pr-[7.5vw] py-10 lg:py-0">
            <div className="relative w-full lg:w-auto h-auto lg:h-full flex items-center justify-center lg:justify-end">
              <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f25e4025-739e-475f-13ae-f82e5e153e00/public"
                alt="The company we keep - Brands we serve map"
                className="w-full max-w-[649px] h-auto object-contain py-4 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section
        className="bg-black text-white px-[6.1vw] pt-[16.53vw] pb-[21.11vw] md:px-[7.5vw] md:py-[123px] border-t border-[#FFFFFF4D]"
      >
        <ContactSectionDark />
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  )
}
