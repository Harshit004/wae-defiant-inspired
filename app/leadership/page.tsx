"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Footer from "@/components/footer"
import Link from "next/link"

// Shared container class for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

// Dummy leadership data
const leadershipItems = [
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
  { image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e60fab3-2c8e-40db-ae2c-a158c26a9d00/public", title: "VP Sales", name: "Cristina Lasagni" },
]

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
      setCurrentTime(new Date().toLocaleTimeString("en-US", options))
    }
    updateIndiaTime()
    const interval = setInterval(updateIndiaTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Tagline lines (split into words)
  const taglineLine1 = "To lead the way in sustainability"
  const taglineLine2 = "ahead of the rest."
  const taglineWords1 = taglineLine1.split(" ")
  const taglineWords2 = taglineLine2.split(" ")

  // Arrays for menu items with hrefs
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ]
  const lineCount = Math.min(productsItems.length, blueprintItems.length)

  return (
    <main className="relative pb-[40px]">
      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header ref={headerRef} className="w-full relative z-10 mb-0">
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <div>IDENTITY</div>
              <div>ORIGIN</div>
              <div>OBJECTIVE</div>
              <div>INSIDE WAE</div>
              <div>ETCETERA</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Tagline and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}

<div className="flex flex-col justify-center">

  <Link href="/homepage3" passHref>

    <Image

      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"

      alt="WAE Logo"

      width={78}

      height={82}

      style={{ cursor: 'pointer' }}

    />

  </Link>

</div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "100%",
                  color: "#000000",
                }}
              >
                20.5937° N
                <br />
                78.9629° E
              </div>

              {/* Tagline */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "100%",
                  color: "#000000",
                }}
              >
                To lead the way in<br />sustainability ahead of the<br />rest
              </div>

              {/* Inside WAE Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* Use 'contents' to allow styling of the parent */}
                      <div className="c--anim-btn">
                        <div className="text-container">
                          <span className="c-anim-btn">{item.text}</span>
                          <span className="block">{item.text}</span>
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
                    </Link>
                  </div>
                ))}
              </div>

              {/* ETCETERA Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* Use 'contents' here as well */}
                      <div className="c--anim-btn">
                        <div className="text-container">
                          <span className="c-anim-btn">{item.text}</span>
                          <span className="block">{item.text}</span>
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
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* SCROLL CONTAINER SECTION */}
      <div className="mx-[140px] relative">
        {/* Fixed Center Logo Overlay */}
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

        {/* "About WAE" Section */}
        <div
          className="flex items-center justify-center"
          style={{
            position: "absolute",
            top: "31%",
            width: "100%",
            zIndex: 2,
          }}
        >
          <div style={{ width: "1160px", height: "115px" }} className="flex justify-between items-start">
            <h2 className="mt-auto" //pushes the text to the bottom
              style={{
                width: "104px",
                height: "12px",
                color: "#00000099",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: "100%",
                verticalAlign: "bottom",
                letterSpacing: "0%",
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
        <div className="mt-[20%] flex items-end justify-center" style={{ position: "relative" }}>
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

      {/* Horizontal Rule below Scroll Container */}
      <hr className="mx-[140px] my-8" />

      {/* Managing Director Section */}
      <div className={containerClass}>
        <div className="flex flex-row justify-between gap-[82px] mb-[120px]">
          {/* Title Column */}
          <div className="flex-1 max-w-[14.65%]">
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "48px",
                lineHeight: "100%",
                letterSpacing: "0%",
                verticalAlign: "middle",
              }}
            >
              Managing Director
            </h2>
          </div>

          {/* MD Details and Description Group */}
          <div className="flex flex-row flex-1 gap-[5.7%]">
            {/* MD Details Column */}
            <div className="flex flex-col items-start">
              {/* MD Image */}
              <div style={{ height: "327px", display: "flex" }}>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/feb7894d-303b-45bb-df3f-31062bb67d00/public"
                  alt="Managing Director"
                  style={{
                    height: "327px",
                    maxWidth: "263px",
                    width: "auto",
                    filter: "grayscale(100%)",
                    transition: "filter 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                  width={263}
                  height={327}
                />
              </div>
              {/* MD Name */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "13.5px",
                  lineHeight: "16.2px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  marginTop: "10px",
                }}
              >
                A. Vikram Joshe
              </p>
              {/* Horizontal rule equal to image width */}
              <hr style={{ width: "263px", margin: "10px 0" }} />
            </div>

            {/* MD Description Column */}
            <div className="flex-1 max-w-[32%]">
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                What drives a future-forward organization isn’t just innovation, but the people whose thinking, values, and courage transform ambition into reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Rule below Managing Director Section */}
      <hr className="mx-[140px] my-8" />

      {/* Leadership Section */}
      <div className={containerClass}>
        <div className="flex flex-row items-start gap-[37px]">
          {/* Leadership Heading Column */}
          <div className="flex-shrink-0">
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "48px",
                lineHeight: "50.4px",
                letterSpacing: "0%",
                verticalAlign: "middle",
              }}
            >
              Leadership
            </h2>
          </div>
          {/* Leadership Grid Column */}
          <div className="flex-1">
            <div
              className="grid grid-cols-4 gap-x-[37px] gap-y-[60px]"
              style={{ justifyContent: "center" }}
            >
              {leadershipItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: "189.25341796875px",
                    height: "305px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "left",
                  }}
                >
                  {/* Leader Image */}
                  <Image
                    src={item.image}
                    alt={`Leader ${index + 1}`}
                    style={{
                        filter: "grayscale(100%)",
                        transition: "filter 0.5s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                    width={189}
                    height={230}
                  />
                  {/* Leader Title */}
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "10.5px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "#00000099",
                      textAlign: "left",
                    }}
                  >
                    {item.title}
                  </p>
                  {/* Leader Name */}
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "13.5px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      textAlign: "left",
                    }}
                  >
                    {item.name}
                  </p>
                  <hr style={{ width: "189.25341796875px", margin: "10px 0" }} />
                </div>
              ))}
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
    </main>
  )
}