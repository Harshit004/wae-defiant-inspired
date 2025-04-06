"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion" // Re-added for tagline animation
import { useInView } from "react-intersection-observer"
import RelatedCard from "@/components/related-card"
import Footer from "@/components/footer"

/**
 * Main Home component.
 * Contains the Header, Scroll Container with static sections,
 * MD< LEadership and Footer.
 */
export default function Home() {
  // State variables
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)


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

  // Tagline lines (split into words)
  const taglineLine1 = "Light out for the territory"
  const taglineLine2 = "ahead of the rest."
  const taglineWords1 = taglineLine1.split(" ")
  const taglineWords2 = taglineLine2.split(" ")

  // Arrays for menu items
  const productsItems = [
    "Products & Solutions A",
    "Products & Solutions B",
    "Products & Solutions C",
    "Products & Solutions D",
  ]
  const blueprintItems = ["Blueprint 1", "Blueprint 2", "Blueprint 3"]
  const lineCount = Math.min(productsItems.length, blueprintItems.length)

  return (
    <main className="relative pb-[40px]">
      {/* HEADER */}
      <div
        // ref={headerHeroRef}
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

            {/* Bottom Row: Logo, Animated Tagline, and Menu Items */}
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

              {/* Column 3: Tagline (Animated using framer-motion) */}
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
      <div className="min-h-[300vh] mx-[140px]">
        {/* Fixed Center Logo Overlay (Static version with constant opacity) */}
        <div
          style={{
            position: "sticky",
            top: "15%",
            opacity: 1,
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
        </div>

        {/* "About WAE" Section converted to a normal div */}
        <div
          className="flex items-center justify-center mb-[220px]"
          style={{
            position: "absolute",
            top: "480px", // Adjust this value if needed
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            zIndex: 2,
          }}
        >
          <div style={{ width: "1160px", height: "115px" }} className="flex justify-between items-start">
            <h2
              style={{
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

        {/* People Section */}
        <div className="flex items-end justify-center" style={{ position: "relative" }}>
          <div className="mb-20">
            <div style={{ width: "1160px" }} className="flex justify-between">
              <div
                style={{
                  width: "260px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
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
                  People
                </h2>
                <div
                  style={{
                    width: "260px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "21px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                    }}
                  >
                    "Coming together is a beginning; keeping together is progress."
                  </h2>
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 300,
                      fontSize: "21px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                    }}
                  >
                    – Henry Ford
                  </h2>
                </div>
              </div>
              <div 
                style={{
                  width: "260px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#000000",
                  }}
                >
                  Behind every bold move and breakthrough at WAE is a collective of minds that power the momentum.
                  These are the thinkers, builders, and catalysts who bring our vision to life. They work with
                  curiosity, commitment, and a shared drive to create meaningful impact. Quietly confident, relentlessly
                  capable, they are the energy behind the scenes, and the reason we move forward with purpose every day.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#000000",
                  }}
                >
                  Their strength lies not only in expertise but in collaboration across disciplines, cultures, and perspectives.
                  At WAE, we believe that progress happens when diverse voices are heard and empowered. It’s this unity in
                  diversity that fuels our resilience, sharpens our thinking, and shapes the future we’re building together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
