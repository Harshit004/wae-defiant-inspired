"use client"

import type React, { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Footer from "@/components/footer"
import Link from "next/link"

// Shared container class for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

/**
 * Reusable hover button component.
 */

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
}

const HoverButton: FC<HoverButtonProps> = ({ children, href }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const buttonContent = (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-4 py-3 transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        textTransform: "uppercase",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
      }}
    >
      {children(hovered)}
    </button>
  );

  return href ? <Link href={href} className="contents">{buttonContent}</Link> : buttonContent;
};

// Placeholder for product category data : copied from blogs section, hence the same variable
const blogPosts = [
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public",
      title: "DRINKING WATER STATION - BLUWAE Series",
      description: "Water dispensers with inbuilt purification —pure, safe water delivered efficiently. Designed to reduce plastic waste and energy consumption, making sustainability easy.",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
      title: "WATER DISPENSER (W/O RO) - TRUBLU Series",
      description: "Stainless steel water dispensers give you fresh, clean water anytime. Compact, energy-efficient, and perfect for spaces where RO water is not readily available.",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
      title: "DRINKING WATER FAUCETS - WATERMATIC Series",
      description: "Drinking water faucets with under the counter storage units to make access to fresh water simple. Precision-engineered for smooth flow, with a focus on reducing waste and energy use.",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/08a355dd-6233-4b12-1cf5-fee8716cca00/public",
      title: "WATER COOLER & FOUNTAINS - ZVR Series",
      description: "Water coolers cum bubblers provide chilled water on demand. Built to be energy-efficient, they’re ideal for public spaces, reducing both costs and plastic waste.",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
      title: "PUBLIC UTILITY SYSTEMS - PUS Series",
      description: "Designed for large public spaces, PUS systems ensure clean, accessible water. Engineered for durability and eco-friendliness, they support sustainable communities.",
    },
    {
        imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public",
        title: "COMMERCIAL/INDUSTRIAL PLANTS",
        description: "Power your facility with our large-scale hydration plants. Scalable and efficient, they offer high-volume water solutions with a commitment to sustainability.",
    },
  ];

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
    { text: "Blog", href: "/blog" },
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
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                  alt="WAE Logo"
                  width={78}
                  height={82}
                />
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "#00000066",
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
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "#00000066",
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
                      fontSize: "12px",
                      lineHeight: "100%",
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
                      fontSize: "12px",
                      lineHeight: "100%",
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

        {/* Our Portfolio Heading */}
      <div className={containerClass} style={{marginTop: "120px"}}>
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "48px",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginBottom: "180px",
          }}
        >
          Our Portfolio
        </h2>

        {/* LOGO */}
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "39.23%",
            opacity: 1,
          }}
          className="pointer-events-none flex justify-center"
        >
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
            alt="Center Logo"
            width={310}
            height={310}
            className="opacity-80"
          />
        </div>

        {/* Product Category Section */}
        <div>
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className={`flex items-start space-x-8 justify-between ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                style={{ marginBottom: index < blogPosts.length - 1 ? '180px' : '0' }}
              >
                {/* Image */}
                <div className="w-[320px] h-[320px] relative overflow-hidden group">
                  {index === 1 ? ( // Check if it's the second blog post (index 1)
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      className="transition-transform duration-700 ease-in-out transform-gpu group-hover:scale-110"
                      width={320}
                      height={320}
                    />
                  ) : (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-700 ease-in-out transform-gpu group-hover:scale-110"
                    />
                  )}
                </div>

                {/* Title, Description, and Button */}
                <div className="flex-1 flex flex-col justify-between" style={{ maxWidth: '320px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        marginBottom: "40px",
                      }}
                    >
                      {post.description}
                    </p>
                  </div>
                  <HoverButton href="/product-category">
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4">
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
                            className="absolute top-0 left-0"
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
            ))}
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