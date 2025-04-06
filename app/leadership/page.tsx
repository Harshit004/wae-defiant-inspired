"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import RelatedCard from "@/components/related-card"
import Footer from "@/components/footer"

/**
 * Reusable hover button component.
 * Accepts a render prop (children) that receives the current hover state.
 */
function HoverButton({ children }: { children: (hovered: boolean) => React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-[16px] py-[12px]"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        letterSpacing: "0%",
        verticalAlign: "middle",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
        transition: "all 650ms ease",
      }}
    >
      {children(hovered)}
    </button>
  )
}

/**
 * Main Home component.
 * Contains the Header, Hero Section, Scroll Container with animated sections,
 * Related Information, and Footer.
 */
export default function Home() {
  // State variables
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const [heroRef, heroInView] = useInView({ threshold: 0.5 })
  const sections = ["hero"]

  // State for controlling tagline visibility on scroll
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  // State and ref for header/hero scaling
  const [headerHeroScale, setHeaderHeroScale] = useState(1)
  const headerHeroRef = useRef<HTMLDivElement>(null)

  // Update tagline visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
      const indiaTime = new Date().toLocaleTimeString("en-US", options)
      setCurrentTime(indiaTime)
    }
    updateIndiaTime()
    const interval = setInterval(updateIndiaTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Update active section when the hero is in view
  useEffect(() => {
    if (heroInView) setActiveSection(0)
  }, [heroInView])

  // Measure header height for hero offset
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight)
    }
  }, [headerRef])

  // Add scroll animation effect for header and hero
  useEffect(() => {
    const handleScroll = () => {
      if (!headerHeroRef.current) return

      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const maxScroll = viewportHeight * 0.8
      const minScale = 0

      if (scrollPosition <= 100) {
        setHeaderHeroScale(1)
      } else if (scrollPosition >= maxScroll) {
        setHeaderHeroScale(minScale)
      } else {
        const scrollRange = maxScroll - 100
        const scrollProgress = (scrollPosition - 100) / scrollRange
        setHeaderHeroScale(1 - scrollProgress)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll-driven animations from framer-motion
  const { scrollYProgress } = useScroll()
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1])
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"])
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0])
  const finalPurposeOpacity = useTransform([purposeOpacity, purposeVanish], ([pO, pV]) => pO * pV)
  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"])
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0])
  const finalIndiaOpacity = useTransform([indiaOpacity, indiaVanish], ([iO, iV]) => iO * iV)

  // Arrays for menu items
  const productsItems = [
    "Products & Solutions A",
    "Products & Solutions B",
    "Products & Solutions C",
    "Products & Solutions D",
  ]
  const blueprintItems = ["Blueprint 1", "Blueprint 2", "Blueprint 3"]
  const lineCount = Math.min(productsItems.length, blueprintItems.length)

  // Tagline lines to be animated (split into words)
  const taglineLine1 = "Light out for the territory"
  const taglineLine2 = "ahead of the rest."
  const taglineWords1 = taglineLine1.split(" ")
  const taglineWords2 = taglineLine2.split(" ")

  // Variants for staggered animations using framer-motion
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

  return (
    <main className="relative pb-[40px]">
      {/* HEADER AND HERO CONTAINER */}
      <div
        ref={headerHeroRef}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      >
        <header
          ref={headerRef}
          className="w-full"
          style={{ marginBottom: 0, position: "relative", zIndex: 1 }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
            {/* Top Row: Location, Time, and Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                lineHeight: "100%",
                letterSpacing: "0px",
                textTransform: "uppercase",
              }}
            >
              <div style={{ color: "#00000066" }}>NOIDA</div>
              <div style={{ color: "#00000066" }}>INDIA</div>
              <div>{currentTime}</div>
              <div style={{ color: "#00000066" }}>Products & Solutions</div>
              <div style={{ color: "#00000066" }}>News & Updates</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Tagline, and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Column 1: Logo */}
              <div className="flex flex-col justify-center">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                  alt="WAE Logo"
                  width={77.53575134277344}
                  height={82.03529357910156}
                />
              </div>

              {/* Column 2: WAE Text Image */}
              <div className="flex flex-col justify-center">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/45c6555a-9bdb-4f8a-3958-0df6cd00ac00/public"
                  alt="WAE Text"
                  width={44.00027084350586}
                  height={18.93841552734375}
                />
              </div>

              {/* Column 3: Tagline (Animated by splitting into words) */}
              <div className="flex flex-col items-start">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={taglineVisible ? "visible" : "hidden"}
                  style={{ whiteSpace: "nowrap" }}
                  className="flex flex-row justify-center"
                >
                  {taglineWords1.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "125%",
                        letterSpacing: "0px",
                        color: "#00000066",
                        marginRight: "0.2rem",
                        display: "inline-block",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={taglineVisible ? "visible" : "hidden"}
                  style={{ whiteSpace: "nowrap" }}
                  className="flex flex-row justify-center"
                >
                  {taglineWords2.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "125%",
                        letterSpacing: "0px",
                        color: "#00000066",
                        marginRight: "0.2rem",
                        display: "inline-block",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Column 4: Products & Solutions Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "0px",
                      textAlign: "left",
                      borderBottom: i < lineCount ? "1px solid #D9D9DC" : "none",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span style={{ display: "block" }}>{item}</span>
                      </div>
                      <span className="menu-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 5: Blueprint Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "0px",
                      textAlign: "left",
                      borderBottom: i < lineCount ? "1px solid #D9D9DC" : "none",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span style={{ display: "block" }}>{item}</span>
                      </div>
                      <span className="menu-arrow blueprint-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* SCROLL CONTAINER SECTION */}
      <motion.div className="min-h-[300vh]">
        {/* Fixed Center Logo Overlay */}
        <motion.div
          style={{
            position: "sticky",
            top: "15%",
            opacity: logoOpacity,
          }}
          className="pointer-events-none flex justify-center"
        >
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
            alt="Center Logo"
            width={508}
            height={508}
            className="opacity-80"
          />
        </motion.div>

        {/* "About WAE" Section converted to a normal div */}
        <div className=" flex items-end justify-center" style={{ position: "relative" }}>
            <div style={{ width: "1160px", height: "115px" }} className="flex justify-between items-start">
              <h2
                style={{
                  left: "9.72%",
                  width: "104px",
                  height: "12px",
                  color: "#00000099",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                SCROLL FOR MORE ⤵︎
              </h2>

              <div
                style={{
                  width: "251px",
                  height: "115px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    width: "297px",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "32px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#000000",
                  }}
                >
                  What defines us isn’t just what we build, but who we become in building it
                </p>
              </div>
            </div>
          
        </div>

        {/* "Made in India" Section converted to a normal div */}
        <div className="h-screen flex items-end justify-center" style={{ position: "relative" }}>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div style={{ width: "1160px" }} className="flex justify-between">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "3.625rem",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                Made in India
              </h2>
              <div
                style={{
                  width: "251px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#00000099",
                  }}
                >
                  WAE captures the heart of Indian innovation by seamlessly blending the time-honoured ideals with the
                  latest technology. We are driven by the mission to build a brand that not only saves the planet but
                  also creates a potent impact on future generations for the country’s advancements, integrity &
                  innovation. Our approach strengthens community resilience while showcasing India’s Intellectual
                  capital on the world stage.
                </p>
                <HoverButton>
                  {(hovered) => (
                    <>
                      Know More
                      <div style={{ position: "relative", display: "inline-block", width: "16px", height: "16px" }}>
                        <Image
                          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                          alt="icon default"
                          width={16}
                          height={16}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hovered ? 1 : 0 }}
                          transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                          style={{ position: "absolute", top: 0, left: 0 }}
                        >
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                            alt="icon hover"
                            width={16}
                            height={16}
                          />
                        </motion.div>
                      </div>
                    </>
                  )}
                </HoverButton>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* FOOTER SECTION */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>

      {/* INLINE CSS for hover and arrow animations */}
      <style jsx>{`
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        /* Text container with fixed height and overflow hidden */
        .text-container {
          height: 12px;
          overflow: hidden;
        }
        /* Text sliding animation */
        .c-anim-btn {
          display: block;
          margin-top: 0;
          transition: margin-top 0.5s;
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
        /* Arrow sliding and fade-in animation for products */
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
        /* Additional styling for blueprint arrow: rotate to face top right */
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px);
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }
      `}</style>
    </main>
  )
}
