"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, animate, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"
import ContactSectionDark from "@/components/contact-section-dark"
import dynamic from "next/dynamic"

const WaterCanvas = dynamic(() => import('@/components/WaterCanvas'), { ssr: false })

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

/**
 * Animated counter component
 */
const Counter: FC<{ value: number; suffix?: string; trigger?: boolean }> = ({ value, suffix = "", trigger = true }) => {
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
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: '40px',
        lineHeight: '200%',
        color: '#FFFFFF',
        textTransform: 'uppercase'
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
        gap: "0.55vw", padding: "0.69vw 1.11vw",
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

  return (
    <main className="relative">
      <Header transparentBg />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full h-screen relative flex items-center justify-center bg-[#0D0D0D] overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Background Image (Placed below the header visually) */}
        <div
          className="absolute inset-0 w-full h-full flex items-start justify-center z-0 opacity-60 overflow-hidden"
          style={{ paddingTop: `calc(${headerHeight}px)` }}
        >
          <div
            className="relative w-full min-w-[800px]"
            style={{ aspectRatio: '1440 / 691', flexShrink: 0 }}
          >
            <WaterCanvas imgUrl="/67d43fa901c289cffedaedebb0d286fff70b5c53.png" />
          </div>
        </div>

        {/* 4. Hero Content Text (Topmost) */}
        <div className="absolute top-0 left-0 w-full h-full z-[3] pointer-events-none flex items-center pt-[65px]">
          <div className={`${containerClass} pointer-events-auto`}>
            <div
              style={{
                width: "clamp(280px, 34.79vw, 600px)",
                color: "#FFFFFF",
                fontFamily: "'Inter Tight', sans-serif",
              }}
            >
              <h1
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(36px, 5.9vw, 85px)",
                  lineHeight: "105%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  margin: 0,
                }}
              >
                We're here<br />to disrupt the<br />status quo!
              </h1>
              <div style={{ height: "clamp(12px, 1.5vw, 22px)" }} />
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "30px",
                  lineHeight: "115%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#AEAEAE",
                  margin: 0,
                }}
              >
                Our Green is Blue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose, Philisophy & Principle Section */}
      <section className="relative bg-black text-white w-full">
        <div className="w-full h-[576px]">
          <div className="grid grid-cols-3 h-full border-b border-[#FFFFFF4D]">
            {/* Column 1: Purpose */}
            <div className="flex flex-col h-full items-center justify-center border-r border-white px-12 lg:px-24 hover:bg-[#004063] cursor-pointer group">
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
                <Link href="/this-is-us" className="contents">
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

            {/* Column 2: Philisophy */}
            <div className="flex flex-col h-full items-center justify-center border-r border-white px-12 lg:px-24 hover:bg-[#004063] cursor-pointer group">
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
                  Philosphy
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
            <div className="flex flex-col h-full items-center justify-center px-12 lg:px-24 hover:bg-[#004063] cursor-pointer group">
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
        </div>
      </section>

      {/* Our Products Section */}
      <section
        className="bg-black text-white border-b border-[#FFFFFF4D]"
        style={{
          paddingBottom: '124px',
          paddingLeft: '2.5vw',
          paddingRight: '2.5vw'
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

          <div className="grid grid-cols-4 w-full" style={{ height: '506px' }}>
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
            <Link href="/our-portfolio" className="bg-[#004063] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#00304a]">
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
      </section>

      {/* Carbon Neutral Section */}
      <section
        className="bg-black text-white border-b border-[#FFFFFF4D]"
        style={{
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw'
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
            Sustainability
          </h3>
          <div style={{ height: '26px' }} />
        </div>
        <div className="flex justify-between items-stretch w-full">

          {/* Left Column */}
          <div style={{ width: '44.93vw' }} className="flex flex-col">
            <div>
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '40px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}
              >
                Positive Hydration for a Net<br />Zero Future
              </h2>
              <div style={{ height: '32px' }} />
              <p
                className="leading-normal"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#AEAEAE'
                }}
              >
                Carbon neutrality isn't an afterthought at WAE.<br />It is built into every stage.
              </p>
            </div>

            {/* Image pinned to bottom */}
            <div className="mt-auto pt-8">
              <motion.div
                initial={{ filter: 'grayscale(100%)' }}
                whileHover={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 0.8 }}
                className="w-full h-auto cursor-pointer"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fd6e76cf-b35a-46af-de19-8caa2b168300/public"
                  alt="Carbon Neutral Illustration"
                  width={645}
                  height={362}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ width: '34.93vw' }}>

            {/* 1. Carbon Neutrality by Design */}
            <div className="flex flex-col">
              <h4
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}
              >
                1. Carbon Neutrality by Design
              </h4>
              <div style={{ height: '12px' }} />
              <p
                className="leading-normal"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#AEAEAE'
                }}
              >
                WAE engineers carbon neutrality across stages. From ZED Gold manufacturing to optimised distribution and point-of-use purification. Each verifiable installation helps reduce Scope 3 emissions by eliminating packaged water.
              </p>
              <div style={{ height: '22px' }} />
              <div className="w-full h-px bg-[#FFFFFF4D]" />
            </div>

            <div style={{ height: '48px' }} />

            {/* 2. ESG Performance & Reporting */}
            <div className="flex flex-col">
              <h4
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}
              >
                2. ESG Performance & Reporting
              </h4>
              <div style={{ height: '12px' }} />
              <p
                className="leading-normal"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#AEAEAE'
                }}
              >
                WAE solutions deliver measurable outcomes across ESG. They reduce plastic and carbon, enable hydration, and meet GRIHA, CE, and IWQA standards. With 20,000+ installations, WAE gives sustainability teams reportable data.
              </p>
              <div style={{ height: '22px' }} />
              <div className="w-full h-px bg-[#FFFFFF4D]" />
            </div>

            <div style={{ height: '48px' }} />

            {/* 3. Water Stewardship */}
            <div className="flex flex-col">
              <h4
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}
              >
                3. Water Stewardship
              </h4>
              <div style={{ height: '12px' }} />
              <p
                className="leading-normal"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#AEAEAE'
                }}
              >
                WAE manages the full water lifecycle. From multi-stage RO purification to IoT-monitored point-of-use dispensing. Every installation enables traceability, accountability, zero waste, and water stewardship.
              </p>
              <div style={{ height: '22px' }} />
              <div className="w-full h-px bg-[#FFFFFF4D]" />
            </div>

            <div style={{ height: '48px' }} />

            {/* 4. Net Zero Alignment */}
            <div className="flex flex-col">
              <h4
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}
              >
                4. Net Zero Alignment
              </h4>
              <div style={{ height: '12px' }} />
              <p
                className="leading-normal"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#AEAEAE'
                }}
              >
                WAE eliminates the emission chain of single-use plastic water. From production and transport to refrigeration and disposal. Each active system removes an estimated 20,000–30,000 bottles per year. It supports verified Scope 3 reductions aligned with SBTi and net zero goals.
              </p>
              <div style={{ height: '22px' }} />
              <div className="w-full h-px bg-white/20" />
            </div>

          </div>
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section
        ref={sectionRef}
        className="relative text-white"
        style={{
          background: 'linear-gradient(146.59deg, #004063 4.52%, #000000 49.04%)',
          paddingTop: '124px',
          paddingBottom: '124px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw',
          overflow: 'hidden'
        }}
      >
        {/* Background Image (Buildings) */}
        <div className="absolute top-0 right-0 h-full w-auto opacity-80 pointer-events-none select-none z-0">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e9ec5b38-f695-4ed8-3ef9-ce1a6da6e600/public"
            alt="Impact Background"
            width={1000}
            height={1000}
            className="h-full w-auto object-cover object-right"
          />
        </div>

        {/* Animated Overlay Image */}
        <motion.div
          className="absolute top-0 right-0 h-full w-auto pointer-events-none select-none z-0"
          animate={{
            opacity: [0, 1, 0, 0]
          }}
          transition={{
            duration: 4.0,
            times: [0, 0.0375, 0.075, 1], // Flash occurs over 0.3s, then 3.7s delay before next cycle
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/image 570 (1).png"
            alt="Impact Overlay"
            width={1000}
            height={1000}
            className="h-full w-auto object-cover object-right"
          />
        </motion.div>

        <div className="relative z-10 flex flex-col justify-between h-full">
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
                    // textTransform: 'uppercase'
                  }}
                >
                  Tonnes CO₂ emissions saved
                </p>
              </div>

              <div className="p-8">
                {/* Empty space in grid? Screenshot shows 3 stats in a 2x2 grid structure but only 3 filled */}
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
                    // textTransform: 'uppercase'
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
                    // textTransform: 'uppercase'
                  }}
                >
                  Tonnes plastic removed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-black">
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* BLOGS SECTION */}
      <section
        className="bg-black text-white"
        style={{
          paddingTop: '123px',
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw'
        }}
      >
        <div className="w-full">
          <div className="flex justify-between items-start w-full" style={{ paddingLeft: '32px', paddingRight: '48px' }}>
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
              <HoverButton href="/blogs" theme="transparent-white-black-hover">
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

          <div className="grid grid-cols-3 gap-x-0">
            {blogsLoading ? (
              // Skeleton placeholders
              [0, 1, 2].map((i) => (
                <div key={i} className="border-l border-white/20 pl-8 pr-12">
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
                const blogUrl = `/blogs/${categorySlug}/${blog.id}`
                return (
                  <Link key={blog.id} href={blogUrl} className="contents">
                    <div className="group cursor-pointer border-l border-white/20 pl-8 pr-12">
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

      {/* MEDIA & UPDATES SECTION */}
      <section
        className="bg-black text-white"
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
          <div className="flex justify-between items-start w-full" style={{ paddingRight: '48px' }}>
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

      {/* CONTACT SECTION */}
      <section
        className="bg-black text-white"
        style={{
          paddingTop: '123px',
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw',
          borderTop: '1px solid #FFFFFF4D'
        }}
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
          /* scroll-behavior: smooth; *//* Commented out as per previous discussion */
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