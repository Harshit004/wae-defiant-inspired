"use client"

import type { FC } from "react"
import React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, animate, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"
import ContactSectionDark from "@/components/contact-section-dark"
import dynamic from "next/dynamic"
// import LightweightRipple from "@/components/LightweightRipple"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

/**
 * Animated counter component
 */
const Counter: FC<{ value: number; suffix?: string; trigger?: boolean; className?: string; style?: React.CSSProperties }> = ({ value, suffix = "", trigger = true, className, style }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!trigger) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 2,
      onUpdate(value) {
        setCount(value);
      },
    });

    return () => controls.stop();
  }, [value, trigger]);

  return (
    <h3
      ref={nodeRef}
      className={className}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: '40px',
        lineHeight: '200%',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        ...style
      }}
    >
      {count.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      {suffix}
    </h3>
  );
};

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  theme?: "light" | "dark" | "transparent-white" | "transparent-white-black-hover";
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, theme = "light" }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const buttonContent = (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit "
      style={{
        transition: 'background-color 0.65s ease, color 0.65s ease, border-color 0.65s ease',
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55vw", padding: "10.5px 16px",
        fontFamily: "\'Manrope\', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        textTransform: "none",
        backgroundColor:
          theme === "transparent-white" ? (hovered ? "#fff" : "transparent") :
            theme === "transparent-white-black-hover" ? (hovered ? "#fff" : "transparent") :
              theme === "dark" ? "#000" : (hovered ? "#000" : "#fff"),
        border:
          theme === "transparent-white" || theme === "transparent-white-black-hover" ? "1px solid #fff" :
            theme === "dark" ? "1px solid #fff" : "1px solid #000",
        cursor: "pointer",
        color:
          theme === "transparent-white" ? (hovered ? "#004063" : "#fff") :
            theme === "transparent-white-black-hover" ? (hovered ? "#000" : "#fff") :
              theme === "dark" ? "#fff" : (hovered ? "#fff" : "#000"),
      }}

    >
      {children(hovered)} {/* This is where the error happens if children is not a function */}
    </button>
  );

  // Use a simple anchor tag if it's an internal page link, Link component for Next.js routes
  return href ? (
    href.startsWith('#') ? ( // Check if it's an anchor link
      <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
    ) : ( // Assume it's a Next.js route link
      <Link href={href} className="contents">{buttonContent}</Link>
    )
  ) : buttonContent;
};



const MobileCarousel = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const width = containerRef.current.offsetWidth
    setActiveIndex(Math.round(scrollLeft / width))
  }

  const numItems = React.Children.count(children)

  return (
    <div className="w-full md:hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, child => (
          <div className="min-w-[100vw] snap-center snap-always box-border">
            {child}
          </div>
        ))}
      </div>
      <div className="w-full border-t border-[#FFFFFF4D] py-6 flex justify-center items-center gap-[6px]">
        {Array.from({ length: numItems }).map((_, i) => (
          <div key={i} className={`h-[6px] rounded-full transition-all duration-300 bg-[#D9D9D9] ${i === activeIndex ? 'w-[24px]' : 'w-[6px] opacity-30'}`} />
        ))}
      </div>
    </div>
  )
}


const MobileProductCarousel = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const item = containerRef.current.children[0] as HTMLElement
    if(item) {
      const width = item.offsetWidth + window.innerWidth * 0.0101
      setActiveIndex(Math.round(scrollLeft / width))
    }
  }

  const numItems = React.Children.count(children)

  return (
    <div className="w-full md:hidden flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[6.1vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: '1.01vw' }}
      >
        {React.Children.map(children, child => (
          <div className="min-w-[86.25vw] w-[86.25vw] snap-center snap-always box-border">
            {child}
          </div>
        ))}
      </div>
      <div style={{ height: '5.59vw' }} />
      <div className="w-full flex justify-center items-center gap-[6px]">
        {Array.from({ length: numItems }).map((_, i) => (
          <div key={i} className={`h-[6px] rounded-full transition-all duration-300 bg-[#D9D9D9] ${i === activeIndex ? 'w-[24px]' : 'w-[6px] opacity-30'}`} />
        ))}
      </div>
      
    </div>
  )
}

export default function Home() {
  // State variables
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [activeGovernanceCard, setActiveGovernanceCard] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  // Homepage featured blogs (CMS-controlled)
  interface HomepageBlog {
    id: string;
    title: string;
    description: string;
    heroImage: string;
    category: string;
    readTime: string;
  }
  const [homepageBlogs, setHomepageBlogs] = useState<HomepageBlog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)

  // Homepage news/events
  const [homepageNews, setHomepageNews] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/homepage-blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHomepageBlogs(data.blogs || [])
        }
      })
      .catch(console.error)
      .finally(() => setBlogsLoading(false))

    fetch('/api/news-events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const featured = data.data.items.filter((i: any) => i.displayOnHomepage).sort((a: any, b: any) => a.rank - b.rank);
          setHomepageNews(featured)
        }
      })
      .catch(console.error)
  }, [])

  // State for controlling tagline visibility on scroll
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  // Variants for staggered animations using framer-motion (used only for tagline)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        ease: "easeInOut",
      },
    },
  }
  const childVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
  }

  // Update tagline visibility based on scroll direction
  // Note: This state is calculated but not applied in the current JSX
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    // Using passive: true for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.querySelector("header")
      if (headerEl) {
        setHeaderHeight(headerEl.getBoundingClientRect().height)
      }
    }
    // Set initial height
    updateHeaderHeight()
    // Update height on window resize
    window.addEventListener("resize", updateHeaderHeight)
    return () => window.removeEventListener("resize", updateHeaderHeight)
  }, [])

  // Update current time (India Time) every minute
  useEffect(() => {
    const updateIndiaTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }
      setCurrentTime(new Date().toLocaleTimeString("en-US", options))
    }
    updateIndiaTime()
    const interval = setInterval(updateIndiaTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Halloween Sound State & Toggle
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userMutedAudioRef = useRef(false)

  useEffect(() => {
    const audio = new Audio("/halloween-sound.mp3")
    audio.loop = true
    audio.preload = "auto"
    audioRef.current = audio

    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true)
        })
        .catch(() => {
          setIsAudioPlaying(false)
        })
    }

    // Attempt autoplay immediately
    playAudio()

    // Handle browsers blocking unmuted autoplay until user gesture
    const handleFirstGesture = () => {
      if (!userMutedAudioRef.current && audioRef.current && audioRef.current.paused) {
        playAudio()
      }
      removeGestureListeners()
    }

    const removeGestureListeners = () => {
      window.removeEventListener("click", handleFirstGesture)
      window.removeEventListener("scroll", handleFirstGesture)
      window.removeEventListener("touchstart", handleFirstGesture)
      window.removeEventListener("keydown", handleFirstGesture)
    }

    window.addEventListener("click", handleFirstGesture)
    window.addEventListener("scroll", handleFirstGesture)
    window.addEventListener("touchstart", handleFirstGesture)
    window.addEventListener("keydown", handleFirstGesture)

    return () => {
      removeGestureListeners()
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggleHalloweenSound = () => {
    if (!audioRef.current) return
    if (isAudioPlaying) {
      audioRef.current.pause()
      setIsAudioPlaying(false)
      userMutedAudioRef.current = true
    } else {
      userMutedAudioRef.current = false
      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => {})
    }
  }

  return (
    <main className="relative">
      <Header transparentBg />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative bg-black h-screen h-[100svh] flex flex-col overflow-hidden"
      >
        {/* Background Image (fits screen perfectly without overflow, keeping dimension ratio intact) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cc3b1b73-75a4-479b-2161-92fed5778500/public"
            alt="Hero background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Hero Content Text (Topmost) */}
        <div className="absolute inset-0 w-full h-full z-[3] pointer-events-none flex flex-col justify-center pt-[100px] md:pt-[130px] pb-[30px]">
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
                We're here<br />to disrupt the<br />status quo!
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

        {/* Halloween Sound Toggle Switch */}
        <button
          type="button"
          onClick={toggleHalloweenSound}
          aria-label={isAudioPlaying ? "Mute halloween sound" : "Play halloween sound"}
          title={isAudioPlaying ? "Mute sound" : "Play sound"}
          className={`absolute z-20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
            isAudioPlaying ? "opacity-100" : "opacity-40 hover:opacity-80"
          }`}
          style={{
            right: "max(20px, calc(69 / 1440 * 100vw))",
            bottom: "max(20px, calc(97 / 1440 * 100vw))",
          }}
        >
          <div className="relative w-[24px] h-[24px] flex items-center justify-center">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/04a97efe-a544-4dfe-86ad-e4c66b5c4200/public"
              alt="Halloween sound toggle"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain select-none pointer-events-none"
            />
            {!isAudioPlaying && (
              <span
                className="absolute w-[24px] h-[2px] bg-red-500 rotate-45 pointer-events-none rounded-full"
                style={{ boxShadow: "0 0 3px rgba(0,0,0,0.9)" }}
              />
            )}
          </div>
        </button>
      </section>

      {/* Purpose, Philisophy & Principle Section */}
      <section className="relative bg-black text-white w-full">
        <div className="w-full h-[576px]">
          <div className="hidden md:grid grid-cols-3 h-full border-b border-[#FFFFFF4D]">
            {/* Column 1: Purpose */}
            <div className="flex flex-col h-full items-center justify-center border-r border-[#FFFFFF4D] px-12 lg:px-24 hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group">
              <div className="flex flex-col w-full max-w-[320px]">
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                  }}
                >
                  Purpose
                </h2>
                <div style={{ height: '32px' }} />
                <h3
                  className="text-white group-hover:text-white"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '100%',
                  }}
                >
                  Being Sustainable
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  className="text-white/60 group-hover:text-white"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                  }}
                >
                  The underlying natural order of the universe – circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.
                </p>
                <div style={{ height: '12px' }} />
                <p
                  className="text-white/60 group-hover:text-white"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                  }}
                >
                  WAE's mission is to lead the industry by 2030 offering science and technology driven water purification and reuse solutions.
                </p>
                <div style={{ height: '32px' }} />
                <Link href="/profile" className="contents">
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
            </div>

            {/* Column 2: Philosophy */}
            <div className="flex flex-col h-full items-center justify-center border-r border-[#FFFFFF4D] px-12 lg:px-24 hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group">
              <div className="flex flex-col w-full max-w-[320px]">
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                  }}
                >
                  Philosophy
                </h2>
                <div style={{ height: '32px' }} />
                <h3
                  className="text-white group-hover:text-white"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '100%',
                  }}
                >
                  Our Green Is Blue
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  className="text-white/60 group-hover:text-white"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                  }}
                >
                  It is where sustainability takes its truest form, not in what we take, but in what we give back. In every drop we preserve, nature finds its balance again — pure, circular, and endlessly alive.
                </p>
                <div style={{ height: '12px' }} />
                <p
                  className="text-white/60 group-hover:text-white"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                  }}
                >
                  At WAE, we do not just treat water but architect a scientifically governed, sustainability-positive water continuum.
                </p>
                <div style={{ height: '32px' }} />
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
            </div>

            {/* Column 3: Principle */}
            <div className="flex flex-col h-full items-center justify-center px-12 lg:px-24 hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group">
              <div className="flex flex-col w-full max-w-[320px]">
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                  }}
                >
                  Principle
                </h2>
                <div style={{ height: '32px' }} />
                <h3
                  className="text-white group-hover:text-white"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '100%',
                  }}
                >
                  People First
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  className="text-white/60 group-hover:text-white"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                  }}
                >
                  People are the natural rhythm of WAE — endlessly evolving, quietly resilient, and profoundly capable of renewal. They are the pulse that keeps our purpose alive, the continuity between what we imagine and what we achieve.
                </p>
                <div style={{ height: '12px' }} />
                <p
                  className="text-white/60 group-hover:text-white"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                  }}
                >
                  In their curiosity and courage, the company finds its true flow — powerful, generous, and human at its core.
                </p>
                <div style={{ height: '32px' }} />
                <Link href="/careers" className="contents">
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
            </div>
          </div>

          <MobileCarousel>
              {/* Column 1: Purpose */}
              <div className="flex flex-col py-[21.1vw] items-center justify-center  px-[18.06vw] lg:px-24 hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group">
                <div className="flex flex-col w-full max-w-[320px]">
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: '7.12vw',
                      lineHeight: '110%',
                      letterSpacing: '0%',
                    }}
                  >
                    Purpose
                  </h2>
                  <div style={{ height: '6.1vw' }} />
                  <h3
                    className="text-white group-hover:text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 700,
                      fontSize: '3.05vw',
                      lineHeight: '100%',
                    }}
                  >
                    Being Sustainable
                  </h3>
                  <div style={{ height: '3.05vw' }} />
                  <p
                    className="text-white/60 group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.05vw',
                      lineHeight: '120%',
                    }}
                  >
                    The underlying natural order of the universe – circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.
                  </p>
                  <div style={{ height: '3.05vw' }} />
                  <p
                    className="text-white/60 group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.05vw',
                      lineHeight: '120%',
                    }}
                  >
                    WAE's mission is to lead the industry by 2030 offering science and technology driven water purification and reuse solutions.
                  </p>
                  <div style={{ height: '12.21vw' }} />
                  <Link href="/profile" className="contents">
                    <HoverButton theme="transparent-white">
                      {(hovered) => (
                        <>
                          <span style={{ fontSize: '2.54vw', lineHeight: '100%', fontWeight: 500 }}>Know More</span>
                          <div className="relative inline-block w-[4.07vw] h-[4.07vw]">
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


              {/* Column 2: Philosophy */}
              <div className="flex flex-col py-[21.1vw] items-center justify-center  px-[18.06vw] lg:px-24 hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group">
                <div className="flex flex-col w-full max-w-[320px]">
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: '7.12vw',
                      lineHeight: '110%',
                      letterSpacing: '0%',
                    }}
                  >
                    Philosophy
                  </h2>
                  <div style={{ height: '6.1vw' }} />
                  <h3
                    className="text-white group-hover:text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 700,
                      fontSize: '3.05vw',
                      lineHeight: '100%',
                    }}
                  >
                    Our Green Is Blue
                  </h3>
                  <div style={{ height: '3.05vw' }} />
                  <p
                    className="text-white/60 group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.05vw',
                      lineHeight: '120%',
                    }}
                  >
                    It is where sustainability takes its truest form, not in what we take, but in what we give back. In every drop we preserve, nature finds its balance again — pure, circular, and endlessly alive.
                  </p>
                  <div style={{ height: '3.05vw' }} />
                  <p
                    className="text-white/60 group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.05vw',
                      lineHeight: '120%',
                    }}
                  >
                    At WAE, we do not just treat water but architect a scientifically governed, sustainability-positive water continuum.
                  </p>
                  <div style={{ height: '12.21vw' }} />
                  <Link href="/sustainability" className="contents">
                    <HoverButton theme="transparent-white">
                      {(hovered) => (
                        <>
                          <span style={{ fontSize: '2.54vw', lineHeight: '100%', fontWeight: 500 }}>Know More</span>
                          <div className="relative inline-block w-[4.07vw] h-[4.07vw]">
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


              {/* Column 3: Principle */}
              <div className="flex flex-col py-[21.1vw] items-center justify-center px-[18.06vw] lg:px-24 hover:bg-[linear-gradient(146.59deg,#004063_4.52%,#000000_49.04%)] cursor-pointer group">
                <div className="flex flex-col w-full max-w-[320px]">
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: '7.12vw',
                      lineHeight: '110%',
                      letterSpacing: '0%',
                    }}
                  >
                    Principle
                  </h2>
                  <div style={{ height: '6.1vw' }} />
                  <h3
                    className="text-white group-hover:text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 700,
                      fontSize: '3.05vw',
                      lineHeight: '100%',
                    }}
                  >
                    People First
                  </h3>
                  <div style={{ height: '3.05vw' }} />
                  <p
                    className="text-white/60 group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.05vw',
                      lineHeight: '120%',
                    }}
                  >
                    People are the natural rhythm of WAE — endlessly evolving, quietly resilient, and profoundly capable of renewal. They are the pulse that keeps our purpose alive, the continuity between what we imagine and what we achieve.
                  </p>
                  <div style={{ height: '3.05vw' }} />
                  <p
                    className="text-white/60 group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.05vw',
                      lineHeight: '120%',
                    }}
                  >
                    In their curiosity and courage, the company finds its true flow — powerful, generous, and human at its core.
                  </p>
                  <div style={{ height: '12.21vw' }} />
                  <Link href="/careers" className="contents">
                    <HoverButton theme="transparent-white">
                      {(hovered) => (
                        <>
                          <span style={{ fontSize: '2.54vw', lineHeight: '100%', fontWeight: 500 }}>Know More</span>
                          <div className="relative inline-block w-[4.07vw] h-[4.07vw]">
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

            </MobileCarousel>
        </div>
      </section>

      <section id="products" className="bg-black text-white border-b border-[#FFFFFF4D] md:border-b-0">

        <div className="w-full hidden md:block border-b border-[#FFFFFF4D]" style={{ paddingBottom: '124px', paddingLeft: '2.5vw', paddingRight: '2.5vw' }}>
          <div style={{ height: '123px' }} />
          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '24px',
              lineHeight: '115%',
              letterSpacing: '0%',
              verticalAlign: 'middle',
              color: '#FFFFFF',
              marginLeft: '5vw'
            }}
          >
            Product Portfolio
          </h3>
          <div style={{ height: '26px' }} />
          <h2
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "60px",
              lineHeight: '105%',
              letterSpacing: '0%',
              color: '#FFFFFF',
              marginLeft: '5vw',
              maxWidth: '1300px'
            }}
          >
            Every product is designed to replace plastic and reduce operational carbon footprint.
          </h2>

          <div style={{ height: '124px' }} />

          <div className="flex justify-end items-start">
            <p
              className="leading-normal"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                letterSpacing: '0px',
                color: '#FFFFFF',
                maxWidth: '34.72vw',
                textAlign: 'right'
              }}
            >
              WAE's range of water systems is engineered for every environment - commercial, institutional, and industrial.
            </p>
          </div>

          <div style={{ height: '18px' }} />

          <div className="hidden md:grid grid-cols-4 w-full" style={{ height: '506px' }}>
            {/* Aurela */}
            <Link href="/product-description-page?product=aurela" className="relative group cursor-pointer h-full overflow-hidden block">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/317e8eb4-d823-462a-c1d3-54cd0664ea00/public"
                alt="Aurela"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-0">
                <div
                  className="rounded-full border border-white flex items-center justify-center"
                  style={{
                    width: '150px',
                    height: '150px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '110%',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  AURELA
                </div>
              </div>
            </Link>

            {/* Reva */}
            <Link href="/product-description-page?product=reva" className="relative group cursor-pointer h-full overflow-hidden block">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/62a8a1c0-fffe-44c2-5ae2-ed461e445600/public"
                alt="Reva"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-0">
                <div
                  className="rounded-full border border-white flex items-center justify-center"
                  style={{
                    width: '150px',
                    height: '150px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '110%',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  REVA
                </div>
              </div>
            </Link>

            {/* Venus */}
            <Link href="/product-description-page?product=venus" className="relative group cursor-pointer h-full overflow-hidden block">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3ed4ddbf-f8ce-4cdb-f703-41fa25cbf400/public"
                alt="Venus"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-0">
                <div
                  className="rounded-full border border-white flex items-center justify-center"
                  style={{
                    width: '150px',
                    height: '150px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '110%',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  VENUS
                </div>
              </div>
            </Link>

            {/* View All */}
            <Link href="/portfolio" className="bg-[#004063] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#00304a]">
              <div
                className="rounded-full border border-white flex items-center justify-center"
                style={{
                  width: '150px',
                  height: '150px',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '110%',
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}
              >
                VIEW ALL
              </div>
            </Link>
          </div>
        </div>

            
        {/* Mobile Layout */}
        <div className="w-full md:hidden flex flex-col py-[15.77vw]">
          <div className="px-[6.1vw]">
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '4.58vw',
                lineHeight: '115%',
              }}
            >
              Product Portfolio
            </h3>
            <div style={{ height: '8.14vw' }} />
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: '9.16vw',
                lineHeight: '105%',
              }}
            >
              Every product is designed to replace plastic and reduce operational carbon footprint.
            </h2>
            <div style={{ height: '16.79vw' }} />
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: '3.05vw',
                lineHeight: '100%',
              }}
            >
              WAE's range of water systems is engineered for every environment - commercial, institutional, and industrial.
            </p>
            <div style={{ height: '7.12vw' }} />
          </div>

          <MobileProductCarousel>
              {/* Aurela */}
              <Link href="/product-description-page?product=aurela" className="relative group cursor-pointer h-[128.75vw] overflow-hidden block">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/317e8eb4-d823-462a-c1d3-54cd0664ea00/public"
                  alt="Aurela"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-0">
                  <div
                    className="rounded-full border border-white flex items-center justify-center"
                    style={{
                      width: '38.16vw',
                      height: '38.16vw',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                      fontSize: '4.58vw',
                      lineHeight: '110%',
                      textTransform: 'uppercase',
                      textAlign: 'center'
                    }}
                  >
                    AURELA
                  </div>
                </div>
              </Link>


              {/* Reva */}
              <Link href="/product-description-page?product=reva" className="relative group cursor-pointer h-[128.75vw] overflow-hidden block">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/62a8a1c0-fffe-44c2-5ae2-ed461e445600/public"
                  alt="Reva"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-0">
                  <div
                    className="rounded-full border border-white flex items-center justify-center"
                    style={{
                      width: '38.16vw',
                      height: '38.16vw',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                      fontSize: '4.58vw',
                      lineHeight: '110%',
                      textTransform: 'uppercase',
                      textAlign: 'center'
                    }}
                  >
                    REVA
                  </div>
                </div>
              </Link>


              {/* Venus */}
              <Link href="/product-description-page?product=venus" className="relative group cursor-pointer h-[128.75vw] overflow-hidden block">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3ed4ddbf-f8ce-4cdb-f703-41fa25cbf400/public"
                  alt="Venus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-0">
                  <div
                    className="rounded-full border border-white flex items-center justify-center"
                    style={{
                      width: '38.16vw',
                      height: '38.16vw',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                      fontSize: '4.58vw',
                      lineHeight: '110%',
                      textTransform: 'uppercase',
                      textAlign: 'center'
                    }}
                  >
                    VENUS
                  </div>
                </div>
              </Link>


              {/* View All */}
              <Link href="/portfolio" className="h-[128.75vw] bg-[#004063] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#00304a]">
                <div
                  className="rounded-full border border-white flex items-center justify-center"
                  style={{
                    width: '38.16vw',
                    height: '38.16vw',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: '4.58vw',
                    lineHeight: '110%',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  VIEW ALL
                </div>
              </Link>

            </MobileProductCarousel>
        </div>
      </section>

      {/* Carbon Neutral / Sustainability Section */}
      <section className="bg-black text-white md:border-b-0">
        {/* Desktop Layout */}
        <div className="w-full hidden md:block border-b border-[#FFFFFF4D]" style={{ paddingBottom: '123px', paddingLeft: '7.5vw', paddingRight: '7.5vw' }}>
          
          <div className="w-full">
            <div style={{ height: '123px' }} />
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '24px',
                lineHeight: '110%',
                letterSpacing: '0px',
                verticalAlign: 'middle',
                color: '#FFFFFF'
              }}
            >
              Sustainability
            </h3>
            <div style={{ height: '26px' }} />
          </div>

          {/* Top Row: Heading on left, Quote on right */}
          <div className="flex justify-between items-stretch w-full">
            {/* Left Column - Heading & Subtitle */}
            <div style={{ width: '44.93vw', maxWidth: '645px' }} className="flex flex-col">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '60px',
                  lineHeight: '110%',
                  letterSpacing: '0px',
                  verticalAlign: 'middle',
                  color: '#FFFFFF'
                }}
              >
                Earth, Our Only<br />Shareholder
              </h2>
              <div style={{ height: '31px' }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#AEAEAE'
                }}
              >
                A ledger of people, planet, and profit and the water that connects them all.
              </p>
              <div style={{ height: '60px' }} />
            </div>

            {/* Right Column - Quote & Author */}
            <div style={{ width: '42vw', maxWidth: '610px' }} className="flex flex-col justify-between">
              <div>
                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '44px',
                    lineHeight: '105%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#AEAEAE',
                  }}
                >
                  “He who knows that <span style={{ color: '#FFFFFF' }}>enough</span><br />
                  is <span style={{ color: '#FFFFFF' }}>enough</span> will always have<br />
                  <span style={{ color: '#FFFFFF' }}>enough.</span> ”
                </h3>

                <div style={{ height: '35px' }} />

                <div className="w-full flex justify-end">
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '105%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      color: '#FFFFFF',
                    }}
                  >
                    - Lao Tzu
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Button & Earth Video on left aligned with Horizontal Line & Text Columns on right */}
          <div className="flex justify-between items-start w-full">
            {/* Left Column - Button & Earth Video */}
            <div style={{ width: '44.93vw', maxWidth: '645px' }} className="w-full flex flex-col">
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

              <div style={{ height: '20px' }} />

              {/* Earth video 392x336 aligned with right of left column */}
              <div className="w-full flex justify-end">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: '392px',
                    maxWidth: '100%',
                    height: '336px',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                    <iframe
                      src="https://customer-nqls4utgv1ytiyat.cloudflarestream.com/d504f9762d02a41de4b5b5010d52e126/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nqls4utgv1ytiyat.cloudflarestream.com%2Fd504f9762d02a41de4b5b5010d52e126%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                      style={{
                        border: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                      }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Horizontal Line & Two Text Columns */}
            <div style={{ width: '42vw', maxWidth: '610px' }} className="flex flex-col">
              {/* Horizontal line aligned with button top */}
              <div className="w-full h-px bg-[#FFFFFF4D]" />

              <div style={{ height: '48px' }} />

              {/* Two sub-columns */}
              <div className="grid grid-cols-2 gap-8 lg:gap-12">
                {/* Sub-column 1 */}
                <div
                  className="flex flex-col space-y-4"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '135%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#AEAEAE',
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
                  className="flex flex-col space-y-4"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '135%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#AEAEAE',
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
                    This is our account of stewardship to the only shareholder that was always there In place of Place of progress report as in above para
                  </p>
                </div>
              </div>
            </div>
          </div>
      
        </div>

        {/* Mobile Layout */}
        <div className="w-full md:hidden flex flex-col py-[20.35vw] px-[6.1vw] border-b border-[#FFFFFF4D]">
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.58vw', lineHeight: '115%' }}>
            Sustainability
          </h3>
          <div style={{ height: '7.12vw' }} />
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '7.12vw', lineHeight: '105%' }}>
            Earth, Our Only Shareholder
          </h2>
          <div style={{ height: '3.5vw' }} />
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '120%', color: '#AEAEAE' }}>
            A ledger of people, planet, and profit and the water that connects them all.
          </p>
          <div style={{ height: '6vw' }} />

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

          <div style={{ height: '6vw' }} />
          
          {/* Earth Video */}
          <div className="w-full flex justify-center">
            <div
              className="relative overflow-hidden w-full max-w-[392px]"
              style={{ height: 'clamp(240px, 70vw, 336px)' }}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                <iframe
                  src="https://customer-nqls4utgv1ytiyat.cloudflarestream.com/d504f9762d02a41de4b5b5010d52e126/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nqls4utgv1ytiyat.cloudflarestream.com%2Fd504f9762d02a41de4b5b5010d52e126%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                  style={{
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen={true}
                />
              </div>
            </div>
          </div>

          <div style={{ height: '10vw' }} />

          {/* Quote */}
          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: '8vw',
              lineHeight: '105%',
              color: '#AEAEAE',
            }}
          >
            “He who knows that <span style={{ color: '#FFFFFF' }}>enough</span><br />
            is <span style={{ color: '#FFFFFF' }}>enough</span> will always have<br />
            <span style={{ color: '#FFFFFF' }}>enough.</span> ”
          </h3>

          <div style={{ height: '17px' }} />

          <div className="w-full flex justify-end">
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '105%',
                color: '#FFFFFF',
              }}
            >
              - Lao Tzu
            </span>
          </div>

          <div style={{ height: '31px' }} />
          <div className="w-full h-px bg-[#FFFFFF4D]" />
          <div style={{ height: '35px' }} />

          {/* Text paragraphs */}
          <div
            className="flex flex-col space-y-4"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '135%',
              color: '#AEAEAE',
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
              This is our account of stewardship to the only shareholder that was always there In place of Place of progress report as in above para
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section
        ref={sectionRef}
        className="relative text-white w-full"
        style={{
          background: 'linear-gradient(146.59deg, #004063 4.52%, #000000 49.04%)',
          overflow: 'hidden'
        }}
      >
        {/* Background SVG with gradient mask for smooth blending */}
        <img
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374f4710-d942-4059-e39c-b5fc24283700/public"
          alt="Impact Background"
          className="absolute md:top-0 top-1/2 md:right-0 -right-[12.72vw] md:translate-y-0 -translate-y-1/2 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)',
            maskImage: 'linear-gradient(to right, transparent, black 15%)',
          }}
        />

        {/* Desktop Layout */}
        <div className="w-full hidden md:block relative z-10" style={{ paddingTop: '124px', paddingBottom: '124px', paddingLeft: '7.5vw', paddingRight: '7.5vw' }}>
          <div className="flex flex-col justify-between h-full">
            <div className="max-w-[600px]">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '40px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}
              >
                Impact
              </h2>
              <div style={{ height: '10px' }} />
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}
              >
                Real numbers. Real results.
              </p>
              <div style={{ height: '32px' }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '130%',
                  color: '#AEAEAE',
                  maxWidth: '32.91vw'
                }}
              >
                Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
              </p>
              <div style={{ height: '46px' }} />
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
              <div className="grid grid-cols-2" style={{ maxWidth: '45.55vw', maxHeight: '267px' }}>
                {/* Tonnes CO₂ emissions saved */}
                <div className="border-r border-white/20 p-8 pl-0">
                  <Counter value={1012120.45} suffix="+" trigger={isInView} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      color: '#AEAEAE',
                    }}
                  >
                    Tonnes CO₂ emissions saved
                  </p>
                </div>

                <div className="p-8">
                </div>

                {/* Million gallons of water saved */}
                <div className="border-r border-t border-white/20 p-8 pl-0">
                  <Counter value={12185.45} suffix="+" trigger={isInView} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      color: '#AEAEAE',
                    }}
                  >
                    Million gallons of water saved
                  </p>
                </div>

                {/* Tonnes plastic removed */}
                <div className="border-t border-white/20 p-8">
                  <Counter value={22253.65} suffix="+" trigger={isInView} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      color: '#AEAEAE',
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
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '7.12vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Impact
          </h2>
          <div style={{ height: '2.54vw' }} />
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>
          <div style={{ height: '6.1vw' }} />
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE', maxWidth: '59.29vw' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>
          <div style={{ height: '12.21vw' }} />
          
          <Link href="/sustainability" className="contents">
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

          <div style={{ height: '45.03vw' }} />

          {/* Grid of stats */}
          <div className="grid grid-cols-2 w-full mt-auto">
            {/* Tonnes CO₂ emissions saved */}
            <div className="border-r border-b border-white/20 pb-[5vw] pr-[2vw]">
              <Counter value={1012120.45} suffix="+" trigger={isInView} style={{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw', fontWeight: 400 }} />
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '2.5vw', lineHeight: '110%', color: '#AEAEAE' }}>
                Tonnes CO₂ emissions saved
              </p>
            </div>

            {/* Empty space in grid */}
            <div className="border-b border-white/20 pb-[5vw] pl-[2vw]">
            </div>

            {/* Million gallons of water saved */}
            <div className="border-r border-white/20 pt-[5vw] pr-[2vw]">
              <Counter value={12185.45} suffix="+" trigger={isInView} style={{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw', fontWeight: 400 }} />
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '2.5vw', lineHeight: '110%', color: '#AEAEAE' }}>
                Million Gallons Of Water Saved
              </p>
            </div>

            {/* Tonnes plastic removed */}
            <div className="pt-[5vw] pl-[4vw]">
              <Counter value={22253.65} suffix="+" trigger={isInView} style={{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw', fontWeight: 400 }} />
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '2.5vw', lineHeight: '110%', color: '#AEAEAE' }}>
                Tonnes Plastic Removed
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-black">
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* BLOGS SECTION */}
      {/* DESKTOP LAYOUT */}
      <section
        className="bg-black text-white hidden md:block"
        style={{
          paddingTop: '123px',
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw'
        }}
      >
        <div className="w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex-1">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '40px',
                lineHeight: '110%',
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                Perspectives
              </h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#AEAEAE',
                maxWidth: '450px',
                marginBottom: '60px'
              }}>
                WAE publishes perspectives on climate, water, and sustainability — because good water companies think beyond the tap.
              </p>
            </div>
            <div className="flex-shrink-0">
              <HoverButton href="/perspectives" theme="transparent-white-black-hover">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4 ml-2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        alt="icon default"
                        width={16}
                        height={16}
                        className={hovered ? "brightness-0" : "brightness-0 invert"}
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
                          className={hovered ? "brightness-0" : "brightness-0 invert"}
                        />
                      </motion.div>
                    </div>
                  </>
                )}
              </HoverButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-12">
            {blogsLoading ? (
              // Skeleton placeholders
              [0, 1, 2].map((i) => (
                <div key={i} className="border-l border-white/20 pl-8">
                  <div className="relative w-full aspect-square overflow-hidden mb-6 bg-white/5 animate-pulse" />
                  <div className="h-5 bg-white/5 animate-pulse mb-2 w-3/4" />
                  <div className="h-4 bg-white/5 animate-pulse mb-1 w-full" />
                  <div className="h-4 bg-white/5 animate-pulse mb-6 w-2/3" />
                  <div className="h-3 bg-white/5 animate-pulse w-24" />
                </div>
              ))
            ) : homepageBlogs.length > 0 ? (
              homepageBlogs.map((blog) => {
                const categorySlug = blog.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                const blogUrl = `/perspectives/${categorySlug}/${blog.id}`
                return (
                  <Link key={blog.id} href={blogUrl} className="contents">
                    <div className="group cursor-pointer border-l border-white/20 pl-8">
                      <div className="relative w-full aspect-square overflow-hidden mb-6">
                        {blog.heroImage ? (
                          <Image
                            src={blog.heroImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span style={{ color: '#AEAEAE', fontSize: '11px' }}>No Image</span>
                          </div>
                        )}
                      </div>
                      <div style={{ minHeight: '80px', marginBottom: '16px' }}>
                        <h3 style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '130%',
                          color: '#FFFFFF'
                        }}>
                          {blog.title}
                        </h3>
                      </div>
                      <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '140%',
                        color: '#AEAEAE',
                        marginBottom: '32px'
                      }}>
                        {blog.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 400,
                          fontSize: '12px',
                          color: '#FFFFFF',
                          textDecoration: 'underline',
                          textUnderlineOffset: '4px'
                        }}>Read Article</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              // No featured blogs yet — subtle empty state
              <div className="col-span-3 py-16 text-center border-l border-white/20 pl-8">
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  color: '#AEAEAE'
                }}>
                  No blogs featured yet. Select up to 3 in the CMS to display them here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE LAYOUT */}
      <section className="bg-black text-white md:hidden px-[6.1vw] py-[12.72vw]">
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: '7.12vw',
          lineHeight: '110%',
          color: '#FFFFFF'
        }}>
          Perspectives
        </h2>
        
        <div style={{ height: '4.32vw' }} />
        
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: '3.05vw',
          lineHeight: '100%',
          color: '#AEAEAE'
        }}>
          WAE publishes perspectives on climate, water, and sustainability — because good water companies think beyond the tap.
        </p>
        
        <div style={{ height: '12.21vw' }} />

        <div className="flex justify-start">
          <Link href="/perspectives" className="contents">
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

        <div style={{ height: '19.84vw' }} />

        <div className="flex flex-col">
          {blogsLoading ? (
            [0, 1, 2].map((i) => (
              <div key={i} className="mb-10 w-full">
                <div className="relative w-full aspect-video overflow-hidden mb-6 bg-white/5 animate-pulse" />
                <div className="h-5 bg-white/5 animate-pulse mb-2 w-3/4" />
                <div className="h-4 bg-white/5 animate-pulse mb-1 w-full" />
              </div>
            ))
          ) : homepageBlogs.length > 0 ? (
            homepageBlogs.map((blog, index) => {
              const categorySlug = blog.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              const blogUrl = `/perspectives/${categorySlug}/${blog.id}`
              return (
                <div key={blog.id} className="w-full flex flex-col">
                  <Link href={blogUrl} className="contents">
                    <div className="group cursor-pointer">
                      <div className="relative w-full h-[68.7vw] overflow-hidden">
                        {blog.heroImage ? (
                          <Image
                            src={blog.heroImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span style={{ color: '#AEAEAE', fontSize: '11px' }}>No Image</span>
                          </div>
                        )}
                      </div>
                      
                      <div style={{ height: '5.08vw' }} />
                      
                      <h3 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: '4.07vw',
                        lineHeight: '100%',
                        color: '#FFFFFF'
                      }}>
                        {blog.title}
                      </h3>
                      
                      <div style={{ height: '3.05vw' }} />
                      
                      <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '3.05vw',
                        lineHeight: '100%',
                        color: '#AEAEAE'
                      }}>
                        {blog.description}
                      </p>
                      
                      <div style={{ height: '13.23vw' }} />
                      
                      <span style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '3.05vw',
                        lineHeight: '110%',
                        color: '#FFFFFF',
                        textDecoration: 'underline',
                        textUnderlineOffset: '0%',
                        textDecorationThickness: '1px',
                        textDecorationSkipInk: 'auto'
                      }}>
                        Read Article
                      </span>
                    </div>
                  </Link>

                  {index !== homepageBlogs.length - 1 && (
                    <div className="w-full relative mt-[14.5vw] mb-[10.43vw]">
                      <div className="absolute left-[-6.1vw] right-[-6.1vw] border-b border-[#FFFFFF4D]" />
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="py-8 text-center">
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '3.56vw', color: '#AEAEAE' }}>
                No blogs featured yet.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* MEDIA & UPDATES SECTION */}
      <section
        className="bg-black text-white hidden md:block"
        style={{
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw',
          borderTop: '1px solid #FFFFFF4D'
        }}
      >
        <div className="w-full">
          <div style={{ height: '123px' }} />
          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '24px',
              lineHeight: '110%',
              letterSpacing: '0px',
              verticalAlign: 'middle',
              color: '#FFFFFF'
            }}
          >
            Mentioned
          </h3>
          <div style={{ height: '26px' }} />
          <div className="flex justify-between items-start w-full">
            <h2 style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: '40px',
              lineHeight: '110%',
              color: '#FFFFFF',
              marginBottom: '80px',
              maxWidth: '800px'
            }}>
              Stay informed with our latest media coverage and announcements
            </h2>
            <div className="flex-shrink-0">
              <HoverButton href="/news-and-updates" theme="transparent-white-black-hover">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        alt="icon default"
                        width={16}
                        height={16}
                        className={hovered ? "brightness-0" : "brightness-0 invert"}
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
                          className={hovered ? "brightness-0" : "brightness-0 invert"}
                        />
                      </motion.div>
                    </div>
                  </>
                )}
              </HoverButton>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main News Column */}
            <div className="col-span-4 group cursor-pointer">
              {homepageNews[0] ? (
                <Link href={homepageNews[0].link} className="block">
                  <div className="relative w-full aspect-[1.8/1] overflow-hidden mb-6">
                    <Image
                      src={homepageNews[0].imageUrl}
                      alt={homepageNews[0].title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '130%',
                    color: '#FFFFFF',
                    marginBottom: '18px'
                  }}>
                    {homepageNews[0].title}
                  </h3>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '130%',
                    color: '#AEAEAE'
                  }}>
                    {homepageNews[0].description}
                  </p>
                </Link>
              ) : (
                <div className="w-full aspect-[1.8/1] bg-white/5 animate-pulse rounded"></div>
              )}
            </div>

            {/* Middle News Column */}
            <div className="col-span-4 group cursor-pointer">
              {homepageNews[1] ? (
                <Link href={homepageNews[1].link} className="block">
                  <div className="relative w-full aspect-[1.8/1] overflow-hidden mb-6">
                    <Image
                      src={homepageNews[1].imageUrl}
                      alt={homepageNews[1].title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '130%',
                    color: '#FFFFFF',
                    marginBottom: '18px'
                  }}>
                    {homepageNews[1].title}
                  </h3>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '130%',
                    color: '#AEAEAE'
                  }}>
                    {homepageNews[1].description}
                  </p>
                </Link>
              ) : (
                <div className="w-full aspect-[1.8/1] bg-white/5 animate-pulse rounded"></div>
              )}
            </div>

            {/* Sidebar News Column */}
            <div className="col-span-4 flex flex-col gap-6 justify-between">
              {homepageNews.slice(2, 5).map((item, i) => (
                <Link href={item.link} key={item.id} className="flex gap-6 items-start group cursor-pointer">
                  <div className="relative w-[140px] aspect-[1.4/1] flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '130%',
                      color: '#FFFFFF'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '140%',
                      color: '#AEAEAE'
                    }} className="line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
              {homepageNews.slice(2, 5).length === 0 && (
                <div className="w-full h-full bg-white/5 animate-pulse rounded"></div>
              )}
            </div>
          </div>
        </div>
      </section>

      
      {/* MOBILE MEDIA & UPDATES SECTION */}
      <section className="bg-black text-white md:hidden px-[6.1vw] py-[12.72vw] border-t border-[#FFFFFF4D]">
        <h3 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: '3.56vw',
          lineHeight: '110%',
          color: '#FFFFFF'
        }}>
          Mentioned
        </h3>
        
        <div style={{ height: '4.32vw' }} />
        
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: '7.12vw',
          lineHeight: '110%',
          color: '#FFFFFF'
        }}>
          Stay informed with our latest media coverage and announcements mentioned
        </h2>
        
        <div style={{ height: '12.21vw' }} />

        <div className="flex justify-start">
          <Link href="/news-and-updates" className="contents">
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

        <div style={{ height: '19.84vw' }} />

        <div className="flex flex-col">
          {homepageNews.slice(0, 2).map((item, index) => (
            <div key={item.id} className="w-full flex flex-col">
              <Link href={item.link} className="contents">
                <div className="group cursor-pointer">
                  <div className="relative w-full h-[68.7vw] overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span style={{ color: '#AEAEAE', fontSize: '11px' }}>No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div style={{ height: '5.08vw' }} />
                  
                  <h3 style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '4.07vw',
                    lineHeight: '100%',
                    color: '#FFFFFF'
                  }}>
                    {item.title}
                  </h3>
                  
                  <div style={{ height: '3.05vw' }} />
                  
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '3.05vw',
                    lineHeight: '130%',
                    color: '#AEAEAE'
                  }}>
                    {item.description}
                  </p>
                </div>
              </Link>
              
              <div style={{ height: '12vw' }} />
            </div>
          ))}
          
          <div className="flex flex-col gap-6">
            {homepageNews.slice(2, 5).map((item, index) => (
              <div key={item.id} className="w-full">
                <Link href={item.link} className="flex gap-4 items-center group cursor-pointer">
                  <div className="relative w-[29.2vw] aspect-[115/90] overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span style={{ color: '#AEAEAE', fontSize: '9px' }}>No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.56vw',
                      lineHeight: '120%',
                      color: '#FFFFFF'
                    }} className="line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '2.54vw',
                      lineHeight: '130%',
                      color: '#AEAEAE'
                    }} className="line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        className="bg-black text-white px-[6.1vw] pt-[16.53vw] pb-[21.11vw] md:px-[7.5vw] md:py-[123px] border-t border-[#FFFFFF4D]"
      >
        <ContactSectionDark />
      </section>
      <Footer />

      {/* INLINE CSS for hover and arrow animations */}
      <style jsx>{`
        /* Custom filter for #004063 blue color - global selector to bypass styled-jsx scoping on Image tag */
        :global(.filter-wae-blue) {
          filter: invert(16%) sepia(93%) saturate(1599%) hue-rotate(180deg) brightness(96%) contrast(105%) !important;
        }

        /* Removed unused styles like product-grid, product-title, product-cell, placeholder-img */

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
      `}</style>

      {/* Global Styles */}
      {/* Note: If you re-introduce smooth scrolling, be mindful of conflicts with custom JS */}
      <style jsx global>{`
        html {
          /* scroll-behavior: smooth; */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        }
         /* Ensure body doesn't have extra margins/padding */
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
    </main>
  )
}