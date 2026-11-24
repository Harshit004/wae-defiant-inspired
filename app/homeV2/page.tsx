"use client"

import type { FC } from "react"
import React, { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, animate, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import StatusQuoPopup from "@/components/StatusQuoPopup"
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
      className="w-fit "
      style={{
        transition: "background-color 0.65s ease, color 0.65s ease, border-color 0.65s ease",
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55vw",
        padding: "10.5px 16px",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
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

// ── PILLARS (IDENTICAL TO MAIN HOMEPAGE) ──

const pillars = [
  {
    title: "Purpose",
    subtitle: "Being Sustainable",
    desc1:
      "The underlying natural order of the universe – circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.",
    desc2:
      "All life depends on water. Nature functions continuously and abundantly, and sustainability is its inherent property.",
    href: "/sustainability",
  },
  {
    title: "Philosophy",
    subtitle: "Doing Sustainability",
    desc1:
      "To be and do good. Selfless giving, helping others with pure, truthful intention. Giving back to water, community, and the planet.",
    desc2:
      "Doing is the true measure of being. At WAE, every action is driven by a deep commitment to preserving our planet's most vital resource.",
    href: "/activism",
  },
  {
    title: "Principles",
    subtitle: "Science, Design & Engineering",
    desc1:
      "Living honestly, working passionately, and continuously learning. Our commitment to transparent, ethically driven engineering and science.",
    desc2:
      "We design products that are durable, beautiful, and sustainable—ensuring our business remains a force for positive environmental change.",
    href: "/portfolio",
  },
]

// ── PRODUCTS (FIGMA NODE 12767:11081) ──

const figmaProducts = [
  {
    id: "trublu",
    category: "Dispensing Systems",
    name: "Trublu",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/462f5160-0083-4cbe-d589-efe921b19200/public",
    href: "/portfolio/trublu",
  },
  {
    id: "watermatic",
    category: "Drinking Water Faucets",
    name: "WATERMATIC",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/44d78286-f6ee-43a3-4b07-0107e6796400/public",
    href: "/portfolio/trublu/alfa-100",
  },
  {
    id: "quantm",
    category: "Glass Bottling Plants",
    name: "Quantm",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/317c1fa3-5c94-48a7-c76a-f451944afa00/public",
    href: "/portfolio/glass-bottling",
  },
  {
    id: "aquasmith",
    category: "Air to Water Generators",
    name: "Aquasmith",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ae63033b-d3bd-4cb4-0b76-8d9029d3b400/public",
    href: "/portfolio/aquasmith",
  },
  {
    id: "bluwae",
    category: "Hydration Systems",
    name: "Bluwae",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/aff0b296-99ba-4ed0-4bd4-919c3e20b200/public",
    href: "/portfolio/bluwae",
  },
  {
    id: "zvr",
    category: "Public Utility Systems",
    name: "ZVR",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8b279fd6-4db8-4ae9-67f3-b87880c53600/public",
    href: "/portfolio/zvr",
  },
  {
    id: "hydroscience",
    category: "Filters & Membrane",
    name: "Hydroscience",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/10e0c9db-97fd-4c60-7506-53a46620a700/public",
    href: "/portfolio/hydroscience",
  },
]

// ── SOLUTIONS (FIGMA NODE 12768:11338 / 12907:14247, 14279, 14289, 14300) ──

const figmaSolutions = [
  {
    id: "wastewater",
    number: "01",
    title: "Wastewater,\nRecovery & Reuse",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4deb62dc-41a4-4381-4b4e-a4a3eb9c9200/public",
    href: "/portfolio",
  },
  {
    id: "water-treatment",
    number: "02",
    title: "Water Treatment\n& Process Water",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f41f4550-1462-4c80-91f3-6e6de1851a00/public",
    href: "/portfolio",
  },
  {
    id: "membrane-separation",
    number: "03",
    title: "Membrane\n& Separation Technologies",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/22594f18-48bf-45ab-8999-25f5bffd4200/public",
    href: "/portfolio",
  },
  {
    id: "heat-pump",
    number: "04",
    title: "Heat-Pump\nWater Heating Systems",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6aa9acc7-c143-4e67-878c-29e696fbf300/public",
    href: "/portfolio",
  },
]

// ── SECTORS WE SERVE (FIGMA NODE 12854:13637) ──

const figmaSectors = [
  {
    id: "workplaces",
    title: "Workplaces",
    description: "Safe everyday hydration for Modern work places",
    icon: "/icons/sectors/workplaces.svg",
  },
  {
    id: "horeca",
    title: "HoReCa",
    description: "Safe and conditioned water for hydration and luxury",
    icon: "/icons/sectors/horeca.svg",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Potable , conditioned utility  and process water",
    icon: "/icons/sectors/manufacturing.svg",
  },
  {
    id: "health",
    title: "Health & Wellness",
    description: "Potable and ultra pure water for laboratory & specialised procedures",
    icon: "/icons/sectors/health.svg",
  },
  {
    id: "education",
    title: "Education & Institutions",
    description: "Potable water for campus hydration and ultrapure for laboratories.",
    icon: "/icons/sectors/education.svg",
  },
  {
    id: "aviation",
    title: "Aviation & Urban Mobility",
    description: "WAE integrates water treatment, membrane ",
    icon: "/icons/sectors/aviation.svg",
  },
  {
    id: "utilities",
    title: "Public Utilities & Infra",
    description: "Safe drinking water  public hydration and conditioned water for utilities",
    icon: "/icons/sectors/utilities.svg",
  },
]

// ── THE COMPANY WE KEEP (FOOTPRINT PARTNERS) ──

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

// ── HERO CAROUSEL SLIDES ──
interface HeroBannerSlide {
  id: number
  isFirst?: boolean
  image?: string
}

const HERO_SLIDES: HeroBannerSlide[] = [
  {
    id: 1,
    isFirst: true,
  },
  {
    id: 2,
    image: "/hero/hero-slide-2.webp",
  },
  {
    id: 3,
    image: "/hero/hero-slide-3.webp",
  },
  {
    id: 4,
    image: "/hero/hero-slide-4.webp",
  },
]

// ── MAIN COMPONENT ──

export default function HomeV2() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroTouchStartX = useRef<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
  // Purpose Carousel State (Identical to app/page.tsx)
  const [pillarActiveIndex, setPillarActiveIndex] = useState(0)
  const pillarContainerRef = useRef<HTMLDivElement>(null)

  const handlePillarScroll = () => {
    if (!pillarContainerRef.current) return
    const scrollLeft = pillarContainerRef.current.scrollLeft
    const width = pillarContainerRef.current.offsetWidth
    setPillarActiveIndex(Math.round(scrollLeft / width))
  }

  // Sustainability Earth Video position measurement (Identical to app/page.tsx)
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

  // Product Carousel State & Navigation
  const productScrollRef = useRef<HTMLDivElement>(null)
  const [productCanScrollLeft, setProductCanScrollLeft] = useState(false)
  const [productCanScrollRight, setProductCanScrollRight] = useState(true)

  const checkProductScroll = useCallback(() => {
    if (!productScrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = productScrollRef.current
    setProductCanScrollLeft(scrollLeft > 10)
    setProductCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }, [])

  const handleProductScrollNav = (direction: "left" | "right") => {
    if (!productScrollRef.current) return
    const scrollAmount = 343
    productScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
    setTimeout(checkProductScroll, 350)
  }

  // Solution Carousel State & Navigation
  const solutionScrollRef = useRef<HTMLDivElement>(null)
  const [solutionCanScrollLeft, setSolutionCanScrollLeft] = useState(false)
  const [solutionCanScrollRight, setSolutionCanScrollRight] = useState(true)

  const checkSolutionScroll = useCallback(() => {
    if (!solutionScrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = solutionScrollRef.current
    setSolutionCanScrollLeft(scrollLeft > 10)
    setSolutionCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }, [])

  const handleSolutionScrollNav = (direction: "left" | "right") => {
    if (!solutionScrollRef.current) return
    const scrollAmount = 440
    solutionScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
    setTimeout(checkSolutionScroll, 350)
  }

  useEffect(() => {
    checkProductScroll()
    checkSolutionScroll()
    const prodEl = productScrollRef.current
    const solEl = solutionScrollRef.current
    if (prodEl) {
      prodEl.addEventListener("scroll", checkProductScroll, { passive: true })
    }
    if (solEl) {
      solEl.addEventListener("scroll", checkSolutionScroll, { passive: true })
    }
    window.addEventListener("resize", checkProductScroll)
    window.addEventListener("resize", checkSolutionScroll)
    return () => {
      if (prodEl) prodEl.removeEventListener("scroll", checkProductScroll)
      if (solEl) solEl.removeEventListener("scroll", checkSolutionScroll)
      window.removeEventListener("resize", checkProductScroll)
      window.removeEventListener("resize", checkSolutionScroll)
    }
  }, [checkProductScroll, checkSolutionScroll])

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

  return (
    <main className="relative bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* ── HEADER ── */}
      <Header transparentBg />

      {/* ── HERO SECTION (CAROUSEL BANNER) ── */}
      <section
        id="hero"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full relative h-[100svh] md:h-auto md:aspect-[1440/872] flex flex-col overflow-hidden"
        style={{
          backgroundColor: currentSlide === 0 ? "#0D0D0D" : "#000000",
          transition: "background-color 0.5s ease",
        }}
      >
        {/* Banner Viewport */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                backgroundColor: currentSlide === 0 ? "#0D0D0D" : "#000000",
              }}
            >
              {currentSlide === 0 ? (
                <>
                  {/* Mobile Background */}
                  <div className="md:hidden absolute top-[119px] bottom-0 left-0 right-0 w-full opacity-95">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531d62fc-56b7-4172-cc36-79a46cada200/public"
                      alt="Landing Hero Banner"
                      fill
                      priority
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Desktop Background */}
                  <div className="hidden md:block absolute top-[130px] left-0 right-0 w-full aspect-[1440/691] opacity-95">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5de3d44a-e3d5-415c-eed0-41108c90c900/public"
                      alt="Landing Hero Banner"
                      fill
                      priority
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Hero Content Text */}
                  <div className="absolute inset-0 w-full h-full z-[3] pointer-events-none flex flex-col justify-center pt-[100px] md:pt-[30px] pb-[30px]">
                    <div className={`${containerClass} flex-1 flex flex-col justify-center`}>
                      <div
                        className="w-[85vw] md:w-[clamp(280px,34.79vw,600px)]"
                        style={{
                          color: "#FFFFFF",
                          fontFamily: "'Inter Tight', sans-serif",
                        }}
                      >
                        <h1
                          className="text-[12.5vw] md:text-[clamp(36px,5.9vw,85px)] leading-[105%] font-medium"
                          style={{
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            margin: 0,
                          }}
                        >
                          We&apos;re here <br />to disrupt the <br />status quo!
                        </h1>
                        <div className="h-[2vw] md:h-[clamp(12px,1.5vw,22px)]" />
                        <p
                          className="text-[6vw] md:text-[30px] leading-[115%] font-normal text-[#AEAEAE]"
                          style={{
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            margin: 0,
                            fontFamily: "'Inter Tight', sans-serif",
                          }}
                        >
                          Our Green is Blue
                        </p>
                      </div>
                    </div>

                    {/* Mobile divider at the bottom of the hero section */}
                    <div className="md:hidden absolute bottom-0 left-0 right-0 border-b border-[#FFFFFF4D] z-[5]" />
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <Image
                    src={HERO_SLIDES[currentSlide].image!}
                    alt={`Hero Banner ${currentSlide + 1}`}
                    fill
                    priority
                    unoptimized
                    className="object-contain md:object-cover object-top"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 z-[10] flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 md:w-10 bg-white" : "w-2 md:w-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Status Quo Announcement Popup */}
        <StatusQuoPopup />
      </section>

      {/* ── PURPOSE, PHILOSOPHY & PRINCIPLE SECTION (IDENTICAL TO MAIN HOMEPAGE) ── */}
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
                className={`min-w-full md:min-w-0 snap-center snap-always flex flex-col py-[21.1vw] md:py-0 md:h-full items-center justify-center px-[18.06vw] md:px-12 lg:px-24 ${idx < 2 ? "md:border-r md:border-[#FFFFFF4D]" : ""
                  } hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group transition-all duration-500`}
              >
                <div className="flex flex-col w-full max-w-[320px]">
                  <h2
                    className="text-[7.12vw] md:text-[40px] leading-[110%] font-normal text-white"
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

          {/* Mobile Carousel Indicator Dots */}
          <div className="w-full md:hidden border-b border-[#FFFFFF4D] py-6 flex justify-center items-center gap-[6px]">
            {pillars.map((_, i) => (
              <div
                key={i}
                className={`h-[6px] rounded-full transition-all duration-300 bg-[#D9D9D9] ${i === pillarActiveIndex ? "w-[24px]" : "w-[6px] opacity-30"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SECTION (FIGMA NODE 12767:11081 / FRAME 1000008542) ── */}
      <section className="bg-[#0F0F0F] text-white border-b border-[#FFFFFF33] pt-[112px] pb-[79px] overflow-hidden">
        {/* Header Content inside Page Container */}
        <div className={containerClass}>
          {/* Top row: Left & Right Sections */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-[92px]">
            {/* Left Section */}
            <div className="max-w-[700px]">
              <h3
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "115%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
              >
                Product
              </h3>

              <div style={{ height: "32px" }} />

              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "40px",
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: "105%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
              >
                Water
                <br />
                Engineered at the Point of Use.
              </h2>

              <div style={{ height: "58px" }} />

              <div>
                <Link href="/portfolio" className="contents">
                  <HoverButton theme="transparent-white">
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4 ml-2">
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
            </div>

            {/* Right Section */}
            <div className="max-w-[480px]">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#AEAEAE",
                }}
              >
                WAE’s portfolio brings together in-situ purification, water conditioning, thermal management, carbonation and hygienic dispensing to deliver application-specific potable water—mineralised or alkaline – Still or sparkling—in conformity with BIS IS 10500 standards.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                >
                  Explore the Product Architecture......
                </span>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1 hover:underline underline-offset-4 transition-colors"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Read more</span>
                  <div className="relative inline-block w-3.5 h-3.5">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                      alt="icon"
                      width={14}
                      height={14}
                      className="brightness-0 invert"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Carousel Row (339x506 clamped, overlay #000000B2) */}
        <div
          ref={productScrollRef}
          className="w-full flex gap-4 sm:gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory pt-2 pl-[6.1vw] md:pl-[max(7.5vw,calc((100vw-1440px)/2+108px))] pr-[6.1vw] md:pr-[max(7.5vw,calc((100vw-1440px)/2+108px))] scroll-pl-[6.1vw] md:scroll-pl-[max(7.5vw,calc((100vw-1440px)/2+108px))]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {figmaProducts.map((prod) => (
            <Link
              key={prod.id}
              href={prod.href}
              className="group flex-shrink-0 w-[clamp(260px,23.54vw,339px)] snap-start block"
            >
              <div className="flex flex-col">
                {/* Image container: 339x506 clamped with #000000B2 overlay */}
                <div className="relative w-[clamp(260px,23.54vw,339px)] h-[clamp(388px,35.14vw,506px)] bg-[#0B141E] rounded-sm overflow-hidden flex items-center justify-center border border-white/5">
                  <Image
                    src={prod.image}
                    alt={`${prod.category} - ${prod.name}`}
                    fill
                    className="object-cover z-0"
                  />
                  {/* Overlay #000000B2 (completely disappears on hover) */}
                  <div
                    className="absolute inset-0 bg-[#000000B2] pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-0"
                  />
                </div>

                {/* Product Label */}
                <div className="mt-[22px]">
                  <h3
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "110%",
                        letterSpacing: "0px",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                        color: "#AEAEAE",
                      }}
                    >
                      {prod.category} -&nbsp;
                    </span>
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "110%",
                        letterSpacing: "0px",
                        verticalAlign: "middle",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                      }}
                    >
                      {prod.name}
                    </span>
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Buttons: 50px below the carousel */}
        <div className={containerClass}>
          <div className="flex items-center gap-3 mt-[50px]">
            <button
              type="button"
              onClick={() => handleProductScrollNav("left")}
              disabled={!productCanScrollLeft}
              className={`w-[41px] h-[41px] rounded-full border flex items-center justify-center transition-colors ${
                !productCanScrollLeft
                  ? "border-white/20 text-white/20 cursor-not-allowed"
                  : "border-white text-white hover:bg-white hover:text-black cursor-pointer"
              }`}
              aria-label="Previous products"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleProductScrollNav("right")}
              disabled={!productCanScrollRight}
              className={`w-[41px] h-[41px] rounded-full border flex items-center justify-center transition-colors ${
                !productCanScrollRight
                  ? "border-white/20 text-white/20 cursor-not-allowed"
                  : "border-white text-white hover:bg-white hover:text-black cursor-pointer"
              }`}
              aria-label="Next products"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS SECTION (FIGMA NODE 12768:11338) ── */}
      <section className="bg-[#0F0F0F] text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)] overflow-hidden">
        <div className={containerClass}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Solution Manifesto & Navigation (x=-4738 to -4165, ~492px width) */}
            <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
              <div>
                {/* Eyebrow */}
                <span
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "24px",
                    lineHeight: "115%",
                    color: "#FFFFFF",
                    marginBottom: "32px",
                  }}
                  className="font-normal block"
                >
                  Solution
                </span>

                {/* Heading */}
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "40px",
                    fontWeight: 400,
                    fontStyle: "normal",
                    lineHeight: "105%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                    marginBottom: "58px",
                  }}
                >
                  Water
                  <br />
                  Engineered as One System.
                </h2>

                {/* Know More Button */}
                <div className="mb-8">
                  <Link href="/portfolio" className="contents">
                    <HoverButton theme="transparent-white">
                      {(hovered) => (
                        <>
                          Know More
                          <div className="relative inline-block w-4 h-4 ml-2">
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
              </div>

              {/* Bottom Block: Manifesto Text 58px above the nav arrows */}
              <div className="mt-8 lg:mt-0">
                {/* Description Copy */}
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "130%",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                  className="mb-4"
                >
                  WAE integrates water treatment, membrane separation, wastewater recovery, reuse and low-carbon thermal infrastructure within a unified engineering architecture.{" "}
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "130%",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                    }}
                  >
                    From turnkey EPC and retrofit to digital monitoring, O&M and Water-as-a-Service
                  </span>
                  , our systems are engineered for higher recovery, lower resource intensity, lifecycle efficiency and measurable decarbonisation.
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "130%",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#AEAEAE",
                    }}
                  >
                    Explore the Product Architecture......
                  </span>
                  <Link
                    href="https://wae-ltd-git-preview-wcgs-projects-1d1036ec.vercel.app/portfolio"
                    className="inline-flex items-center transition-colors"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "130%",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#FFFFFF",
                    }}
                  >
                    <span>Read more</span>
                  </Link>
                </div>

                {/* 58px above the nav arrows */}
                <div style={{ height: "58px" }} />

                {/* Prev / Next circular controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSolutionScrollNav("left")}
                    disabled={!solutionCanScrollLeft}
                    className={`w-[41px] h-[41px] rounded-full border flex items-center justify-center transition-colors ${
                      !solutionCanScrollLeft
                        ? "border-white/20 text-white/20 cursor-not-allowed"
                        : "border-white text-white hover:bg-white hover:text-black cursor-pointer"
                    }`}
                    aria-label="Previous solutions"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSolutionScrollNav("right")}
                    disabled={!solutionCanScrollRight}
                    className={`w-[41px] h-[41px] rounded-full border flex items-center justify-center transition-colors ${
                      !solutionCanScrollRight
                        ? "border-white/20 text-white/20 cursor-not-allowed"
                        : "border-white text-white hover:bg-white hover:text-black cursor-pointer"
                    }`}
                    aria-label="Next solutions"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Solution Cards (Group 8439: 428x690 each) - Starts at column, bleeds outside screen, ends with margin */}
            <div className="lg:col-span-7 -mr-[6.1vw] md:-mr-[max(7.5vw,calc((100vw-1440px)/2+108px))]">
              <div
                ref={solutionScrollRef}
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory pr-[6.1vw] md:pr-[max(7.5vw,calc((100vw-1440px)/2+108px))] scroll-pr-[6.1vw] md:scroll-pr-[max(7.5vw,calc((100vw-1440px)/2+108px))]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {figmaSolutions.map((sol) => (
                  <Link
                    key={sol.id}
                    href={sol.href}
                    className="group flex-shrink-0 w-[280px] sm:w-[380px] lg:w-[428px] h-[480px] sm:h-[600px] lg:h-[690px] snap-start relative rounded-sm overflow-hidden block"
                  >
                    {/* Background Photography */}
                    <Image
                      src={sol.image}
                      alt={sol.title}
                      fill
                      className="object-cover"
                    />

                    {/* Gradient Overlay subtly spreading from bottom to 93% of the top - disappears on hover */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[93%] pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                      }}
                    />

                    {/* Card Content at bottom: Title and chevron-right arrow - disappears on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex justify-between items-end z-10 transition-opacity duration-300 group-hover:opacity-0">
                      <h3
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "20px",
                          lineHeight: "125%",
                          fontWeight: 400,
                          fontStyle: "normal",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          color: "#FFFFFF",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {sol.title}
                      </h3>

                      <div className="flex items-center text-white pb-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTORS WE SERVE SECTION (FIGMA NODE 12854:13637) ── */}
      <section className="bg-[#0F0F0F] text-white border-b border-[#FFFFFF33] py-[clamp(60px,7.5vw,108px)]">
        <div className={containerClass}>
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-[100px]">
            <div>
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "40px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  fontStyle: "normal",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
              >
                Sectors we serve
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "14px",
                  lineHeight: "19.1px",
                  color: "#AEAEAE",
                  marginTop: "32px",
                }}
              >
                Water engineered for the way each sector works.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link href="/portfolio" className="contents">
                <HoverButton theme="transparent-white">
                  {(hovered) => (
                    <>
                      Know More
                      <div className="relative inline-block w-4 h-4 ml-2">
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
          </div>

          {/* 7 Sectors Grid: 4 Columns x 2 Rows with internal divider lines only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ...figmaSectors,
              {
                id: "empty-slot",
                title: "",
                description: "",
                icon: "",
                isEmpty: true,
              },
            ].map((sec, idx) => {
              if (sec.isEmpty) {
                return (
                  <div
                    key="empty-slot"
                    className="hidden sm:block lg:block sm:pt-8 sm:pl-6 sm:pr-0 lg:pt-10 lg:pl-8 lg:pr-0"
                  />
                )
              }

              // Desktop (lg: 4 cols x 2 rows):
              // Col 0: pl-0 pr-8 border-r
              // Col 1, 2: px-8 border-r
              // Col 3: pl-8 pr-0 (no border-r)
              const lgColClass =
                idx % 4 === 0
                  ? "lg:pl-0 lg:pr-8 lg:border-r"
                  : idx % 4 === 3
                  ? "lg:pl-8 lg:pr-0 lg:border-r-0"
                  : "lg:px-8 lg:border-r"

              // Desktop Row:
              // Row 1 (idx 0..3): pt-0 pb-10 border-b
              // Row 2 (idx 4..7): pt-10 pb-0 border-b-0
              const lgRowClass = idx < 4 ? "lg:pt-0 lg:pb-10 lg:border-b" : "lg:pt-10 lg:pb-0 lg:border-b-0"

              // Tablet (sm: 2 cols x 4 rows):
              // Col 0: pl-0 pr-6 border-r
              // Col 1: pl-6 pr-0 border-r-0
              const smColClass = idx % 2 === 0 ? "sm:pl-0 sm:pr-6 sm:border-r" : "sm:pl-6 sm:pr-0 sm:border-r-0"

              // Tablet Row:
              // Top row: pt-0
              // Subsequent rows: pt-8
              // Bottom row: pb-0 border-b-0
              // Rows 1-3: pb-8 border-b
              const smRowClass = `${idx < 2 ? "sm:pt-0" : "sm:pt-8"} ${idx < 6 ? "sm:pb-8 sm:border-b" : "sm:pb-0 sm:border-b-0"}`

              // Mobile (1 col):
              // idx 0: pt-0 pb-6 border-b
              // idx 1..5: py-6 border-b
              // idx 6: pt-6 pb-0 border-b-0
              const mobileClass = `${idx === 0 ? "pt-0 pb-6" : idx === 6 ? "pt-6 pb-0" : "py-6"} ${idx < 6 ? "border-b" : "border-b-0"}`

              return (
                <div
                  key={sec.id}
                  className={`flex flex-col justify-start border-[#FFFFFF26] ${mobileClass} ${smColClass} ${smRowClass} ${lgColClass} ${lgRowClass}`}
                >
                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <div className="w-[30px] h-[30px] relative flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={sec.icon}
                          alt={sec.title}
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] object-contain"
                        />
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "20px",
                          lineHeight: "120%",
                          fontWeight: 400,
                          color: "#FFFFFF",
                        }}
                      >
                        {sec.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "14px",
                        lineHeight: "19.1px",
                        color: "#AEAEAE",
                      }}
                    >
                      {sec.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY SECTION ── */}
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
            <div style={{ height: "32px" }} />
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
                  fontSize: "40px",
                  lineHeight: "110%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
              >
                Earth, Our Only<br />Shareholder
              </h2>
              <div style={{ height: "32px" }} />
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
              <div style={{ height: "82px" }} />
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

            {/* Right Column - Horizontal Line & Two Text Columns + Statement (Bottom aligned 70px above video bottom) */}
            <div style={{ maxWidth: "650px" }} className="relative z-10 flex flex-col justify-between flex-1 min-w-0 self-stretch pb-[70px]">
              <div>
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
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "#AEAEAE",
                    }}
                  >
                    <p>
                      It does not attend AGMs. It signs no term sheets. It cannot vote against us. But before there were contracts, there was Earth. Before there were compliance frameworks, there was water. And before there were boards and balance sheets, there was a responsibility to protect what sustains life. For us, this recognition is not philosophical. It is operational.
                    </p>
                  </div>

                  {/* Sub-column 2 */}
                  <div
                    className="relative z-10 flex flex-col space-y-4"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "#AEAEAE",
                    }}
                  >
                    <p>
                      Our manifesto begins with a simple, unwavering premise: The environment is not a stakeholder in our business. It is the context within which our business is allowed to exist. In this view, sustainability is not an initiative layered onto business strategy. It is the condition that determines whether that strategy is viable at all.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Statement: aligned with 30px above the video bottom */}
              <div className="mt-8 lg:mt-12">
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "22px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                >
                  This is our account of stewardship to the only shareholder that was always there - Earth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="w-full md:hidden flex flex-col pt-[108px] pb-[68px] px-[6.1vw] border-b border-[#FFFFFF4D]">
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "4.58vw", lineHeight: "115%" }}>
            Sustainability
          </h3>
          <div style={{ height: "32px" }} />
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "7.12vw", lineHeight: "105%" }}>
            Earth, Our Only Shareholder
          </h2>
          <div style={{ height: "32px" }} />
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "3.05vw", lineHeight: "120%", color: "#AEAEAE" }}>
            A ledger of people, planet, and profit and the water that connects them all.
          </p>
          <div style={{ height: "82px" }} />

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
            className="flex flex-col space-y-4"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "120%",
              color: "#AEAEAE",
            }}
          >
            <p>
              It does not attend AGMs. It signs no term sheets. It cannot vote against us. But before there were contracts, there was Earth. Before there were compliance frameworks, there was water. And before there were boards and balance sheets, there was a responsibility to protect what sustains life. For us, this recognition is not philosophical. It is operational.
            </p>
            <p>
              Our manifesto begins with a simple, unwavering premise: The environment is not a stakeholder in our business. It is the context within which our business is allowed to exist. In this view, sustainability is not an initiative layered onto business strategy. It is the condition that determines whether that strategy is viable at all.
            </p>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "120%",
                color: "#AEAEAE",
                paddingTop: "12px",
              }}
            >
              This is our account of stewardship to the only shareholder that was always there - Earth.
            </p>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY IMPACT SECTION (EXACTLY AS HOMEPAGE) ── */}
      <section
        ref={impactRef}
        className="relative text-white w-full"
        style={{
          background: "linear-gradient(146.59deg, #004063 4.52%, #000000 49.04%)",
          overflow: "hidden",
        }}
      >
        {/* Background SVG with gradient mask for smooth blending */}
        <img
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374f4710-d942-4059-e39c-b5fc24283700/public"
          alt="Impact Background"
          className="absolute md:top-0 top-1/2 md:right-0 -right-[12.72vw] md:translate-y-0 -translate-y-1/2 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)",
            maskImage: "linear-gradient(to right, transparent, black 15%)",
          }}
        />

        {/* Desktop Layout */}
        <div
          className="w-full hidden md:block relative z-10"
          style={{ paddingTop: "124px", paddingBottom: "124px", paddingLeft: "7.5vw", paddingRight: "7.5vw" }}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="max-w-[600px]">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "40px",
                  lineHeight: "110%",
                  color: "#FFFFFF",
                }}
              >
                Impact
              </h2>
              <div style={{ height: "10px" }} />
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "110%",
                  color: "#FFFFFF",
                }}
              >
                Real numbers. Real results.
              </p>
              <div style={{ height: "32px" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "130%",
                  color: "#AEAEAE",
                  maxWidth: "32.91vw",
                }}
              >
                Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
              </p>
              <div style={{ height: "46px" }} />
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

            <div className="mt-[150px]">
              <div className="grid grid-cols-2" style={{ maxWidth: "45.55vw", maxHeight: "267px" }}>
                {/* Tonnes CO₂ emissions saved */}
                <div className="border-r border-white/20 p-8 pl-0">
                  <Counter value={1012120.45} suffix="+" trigger={isImpactInView} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "100%",
                      color: "#AEAEAE",
                    }}
                  >
                    Tonnes CO₂ emissions saved
                  </p>
                </div>

                <div className="p-8"></div>

                {/* Million gallons of water saved */}
                <div className="border-r border-t border-white/20 p-8 pl-0">
                  <Counter value={12185.45} suffix="+" trigger={isImpactInView} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "100%",
                      color: "#AEAEAE",
                    }}
                  >
                    Million gallons of water saved
                  </p>
                </div>

                {/* Tonnes plastic removed */}
                <div className="border-t border-white/20 p-8">
                  <Counter value={22253.65} suffix="+" trigger={isImpactInView} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "100%",
                      color: "#AEAEAE",
                    }}
                  >
                    Tonnes plastic removed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="w-full md:hidden flex flex-col relative z-10 py-[13.74vw] px-[6.1vw]">
          <h2
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "7.12vw",
              lineHeight: "110%",
              color: "#FFFFFF",
            }}
          >
            Impact
          </h2>
          <div style={{ height: "2.54vw" }} />
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "3.56vw",
              lineHeight: "110%",
              color: "#FFFFFF",
            }}
          >
            Real numbers. Real results.
          </p>
          <div style={{ height: "6.1vw" }} />
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "3.05vw",
              lineHeight: "100%",
              color: "#AEAEAE",
              maxWidth: "59.29vw",
            }}
          >
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>
          <div style={{ height: "12.21vw" }} />

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

          <div style={{ height: "45.03vw" }} />

          {/* Grid of stats */}
          <div className="grid grid-cols-2 w-full mt-auto">
            {/* Tonnes CO₂ emissions saved */}
            <div className="border-r border-b border-white/20 pb-[5vw] pr-[2vw]">
              <Counter
                value={1012120.45}
                suffix="+"
                trigger={isImpactInView}
                style={{ fontSize: "6vw", lineHeight: "100%", marginBottom: "2vw", fontWeight: 400 }}
              />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "2.5vw",
                  lineHeight: "110%",
                  color: "#AEAEAE",
                }}
              >
                Tonnes CO₂ emissions saved
              </p>
            </div>

            {/* Empty space in grid */}
            <div className="border-b border-white/20 pb-[5vw] pl-[2vw]"></div>

            {/* Million gallons of water saved */}
            <div className="border-r border-white/20 pt-[5vw] pr-[2vw]">
              <Counter
                value={12185.45}
                suffix="+"
                trigger={isImpactInView}
                style={{ fontSize: "6vw", lineHeight: "100%", marginBottom: "2vw", fontWeight: 400 }}
              />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "2.5vw",
                  lineHeight: "110%",
                  color: "#AEAEAE",
                }}
              >
                Million Gallons Of Water Saved
              </p>
            </div>

            {/* Tonnes plastic removed */}
            <div className="pt-[5vw] pl-[4vw]">
              <Counter
                value={22253.65}
                suffix="+"
                trigger={isImpactInView}
                style={{ fontSize: "6vw", lineHeight: "100%", marginBottom: "2vw", fontWeight: 400 }}
              />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "2.5vw",
                  lineHeight: "110%",
                  color: "#AEAEAE",
                }}
              >
                Tonnes Plastic Removed
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-black">
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* ── PERSPECTIVES SECTION ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[112px]">
        <div className={containerClass}>
          <div className="flex justify-between items-start w-full mb-12">
            <div className="flex-1">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "40px",
                  lineHeight: "110%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
                className="mb-3"
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
                WAE publishes perspectives on climate, water, and sustainability — because good water companies think beyond the tap.
              </p>
            </div>

            <div className="flex-shrink-0">
              <HoverButton href="/perspectives" theme="transparent-white-black-hover">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4">
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
                const titleSlug = blog.title
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")

                  return (
                    <Link
                      key={blog.id}
                      href={`/perspectives/${categorySlug}/${titleSlug}`}
                      className="group block border-l border-white/20 pl-6 hover:border-white transition-colors"
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden mb-5 rounded-sm bg-white/5">
                        <Image
                          src={blog.heroImage}
                          alt={blog.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <span className="text-[11px] font-[Manrope] text-[#AEAEAE] tracking-wide block mb-2 uppercase">
                        {blog.category} · {blog.readTime || "4 min read"}
                      </span>
                      <h3 className="font-[Inter_Tight] text-[18px] md:text-[20px] font-medium text-white mb-2 group-hover:text-white transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      <p className="font-[Manrope] text-[13px] text-[#AEAEAE] line-clamp-2 leading-relaxed">
                        {blog.description}
                      </p>
                    </Link>
                  )
                })}
          </div>
        </div>
      </section>

      {/* ── MENTIONED / NEWS & MEDIA SECTION ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[112px]">
        <div className={containerClass}>
          <div className="flex justify-between items-start w-full mb-12">
            <div className="flex-1">
              <span
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
                className="block mb-2"
              >
                Mentioned
              </span>
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "40px",
                  lineHeight: "110%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                  maxWidth: "800px",
                }}
                className="font-normal"
              >
                Stay informed with our latest media coverage and announcements
              </h2>
            </div>

            <div className="flex-shrink-0">
              <HoverButton href="/news-and-updates" theme="transparent-white-black-hover">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4">
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

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group cursor-pointer">
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
                  <h3 className="font-[Inter_Tight] text-[18px] text-white mb-2 group-hover:text-white transition-colors">
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

            <div className="group cursor-pointer">
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
                  <h3 className="font-[Inter_Tight] text-[18px] text-white mb-2 group-hover:text-white transition-colors">
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
            <div className="flex flex-col gap-5 justify-between">
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
                    <h4 className="font-[Inter_Tight] text-[14px] text-white font-medium line-clamp-2 group-hover:text-white transition-colors mb-1">
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

      {/* ── THE TERRITORY AHEAD ── */}
      <section className="bg-black text-white border-b border-[#FFFFFF33] py-[112px]">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Heading and JOIN US CTA */}
            <div className="flex flex-col justify-start items-start">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "40px",
                  lineHeight: "110%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#FFFFFF",
                }}
              >
                The Territory
                <br />
                Ahead
              </h2>

              <div style={{ height: "58px" }} />

              <div>
                <Link href="/join-wae" className="contents">
                  <HoverButton theme="transparent-white">
                    {(hovered) => (
                      <>
                        <span className="uppercase tracking-wider">JOIN US</span>
                        <div className="relative inline-block w-4 h-4 ml-2">
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
            </div>

            {/* Middle Column: Do / Disrupt/Change the status quo. Or become it. and --Mark Shayler */}
            <div className="flex flex-col justify-between">
              <div>
                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "26px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                  }}
                  className="mb-1"
                >
                  Do/
                </div>

                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(30px, 2.78vw, 44px)",
                    lineHeight: "105%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#6E6E6E",
                  }}
                >
                  Disrupt/Change
                </div>

                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(30px, 2.78vw, 44px)",
                    lineHeight: "105%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                  }}
                  className="mb-2"
                >
                  the status quo.
                </div>

                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "26px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                  }}
                >
                  Or become it.
                </div>
              </div>

              <div className="mt-[68px]">
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                >
                  - Mark Shayler
                </p>
              </div>
            </div>

            {/* Right Column: 3 Paragraphs of Manifest */}
            <div className="flex flex-col justify-between gap-6">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#AEAEAE",
                }}
              >
                Greed has an excellent publicist. It calls depletion “growth,” disposability “convenience,” and someone else’s environmental bill “profit.”
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#AEAEAE",
                }}
              >
                At WAE, we challenge the logic that legitimises the commodification of nature and engineer a better way. We use science, technology and independent thinking to make wasteful conventions obsolete, beginning with how water is treated, consumed and reused.
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#AEAEAE",
                }}
              >
                We seek minds that challenge accepted answers and hands capable of building better ones. If your ambition extends beyond climbing the established order to changing how it works, chose a place where your potential has as much room as your ambition .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section
        className="bg-black text-white px-[6.1vw] pt-[16.53vw] pb-[21.11vw] md:px-[7.5vw] md:py-[123px] border-t border-[#FFFFFF4D]"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <ContactSectionDark
            titleStyle={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "50px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

      {/* INLINE CSS for hover and arrow animations */}
      <style jsx>{`
        /* Custom filter for #004063 blue color - global selector to bypass styled-jsx scoping on Image tag */
        :global(.filter-wae-blue) {
          filter: invert(16%) sepia(93%) saturate(1599%) hue-rotate(180deg) brightness(96%) contrast(105%) !important;
        }

        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-container {
          height: 12px;
          overflow: hidden;
        }
        .c-anim-btn {
          display: block;
          margin-top: 0;
          transition: margin-top 0.5s;
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-10px);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0);
          opacity: 1;
        }
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px);
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }

        /* Marquee Animations */
        @keyframes marqueeScrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeScrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeScrollLeft 60s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeScrollRight 60s linear infinite;
          will-change: transform;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Global Styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
