"use client"

import React, { FC, useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link" // Import the Link component

// Shared container for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

interface SelectButtonProps {
  children: React.ReactNode
  selected: boolean
  onClick: () => void
}

/**
 * Reusable button component with selected state.
 */
const SelectButton: FC<SelectButtonProps> = ({ children, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="transition-all duration-300 ease-in-out flex-1"
    style={{
      padding: '14px 8px',
      border: '1px solid #000',
      backgroundColor: selected ? '#000' : 'transparent',
      color: selected ? '#fff' : '#000',
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '12px',
      textAlign: 'center',
      textTransform: 'uppercase',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

export default function Home() {
  // --- HERO CAROUSEL DATA & STATE ---
  const heroSlides = [
    {
      imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/64dcf049-c0f4-4796-e838-023963936100/public',
      subtitle: 'WAE LTD.',
      title: 'From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet’s Future',
      description:
        "In the quiet halls of Kyoto in 1997, something monumental began  a collective awakening of the world’s conscience towards the mounting crisis of climate change. What followed was a turbulent yet determined journey, a series of historic global agreements that would shape the planet’s climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline   it's the story of how humanity has tried, failed, and continued to try again in its battle against a warming world.",
    },

  ]
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    const iv = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length),
      5000
    )
    return () => clearInterval(iv)
  }, [heroSlides.length])

  // --- HEADER TAGLINE & LOGO SCROLL STATE ---
  const headerRef = useRef<HTMLDivElement>(null)
  const [logoSize, setLogoSize] = useState({ width: 78, height: 82 }) // Initial logo size
  const [taglineVisible, setTaglineVisible] = useState(true)
  const [coordinatesVisible, setCoordinatesVisible] = useState(true)
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false) // State to control menu collapse
  const prevY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      if (y > prevY.current) {
        // Scrolling down: shrink logo, fade out tagline, coordinates, and Inside WAE menu; fade in Menu+
        setLogoSize({ width: 19, height: 20 })
        setTaglineVisible(false)
        setCoordinatesVisible(false)
        setIsMenuCollapsed(true)
      } else {
        // Scrolling up: expand logo, fade in tagline, coordinates, and Inside WAE menu; fade out Menu+
        setLogoSize({ width: 78, height: 82 })
        setTaglineVisible(true)
        setCoordinatesVisible(true)
        setIsMenuCollapsed(false)
      }
      prevY.current = y
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed)
  }

  // --- BUTTONS SECTION STATE ---
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // --- STATIC DATA ---
  const tagline1 = "To lead the way in sustainability".split(" ")
  const tagline2 = "ahead of the rest.".split(" ")
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
  const buttonLabels = [
    "Water conservation",
    "Policy",
    "Climate Change & Water",
    "Industry Impact and Solutions",
    "Technology",
  ]
  const blogPosts = [
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public",
      imageSrcHover:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf4fc4f5-cfc3-4eb9-ac32-bac46f834a00/public",
      title: "From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future",
      description: "In the quiet halls of Kyoto in 1997, something monumental began   a collective awakening of the world's conscience towards the mounting crisis of climate change. ",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public",
      imageSrcHover:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4addca72-6f79-4c23-9c24-c400cd9b6a00/public",
      title: "Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective",
      description: "The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public",
      imageSrcHover:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c3eb242-b13a-443c-da32-a78bce6e7a00/public",
      title: "The Ozone Crisis: A Success Story in Environmental Cooperation",
      description: "It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth. This protective shield—the ozone layer—sits between 10 to 50 kilometres above the surface and has for millions of years absorbed nearly 97–99% of the Sun's harmful ultraviolet-B (UV-B) radiation. ",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcd53b1-c103-4faf-bd00-29a04ff0ee00/public",
      imageSrcHover:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13245178-9299-4091-ebca-89c63b972600/public",
      title: "Industrial Revolution to the Carbon Age: How We Got There",
      description: "The story begins in the smoky heart of 18th-century England. Coal dust filled the air as the first every corner of the globe. What started as the Industrial Revolution an era of machines and mechanization quickly became something far more consequential: the dawn of the Carbon Age.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/acf3be78-0a74-4315-e8c7-92a9c5d8d900/public",
      imageSrcHover:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/acf3be78-0a74-4315-e8c7-92a9c5d8d900/public",
      title: "The link between climate change and water scarcity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/947c8083-4964-492f-a8bd-df9f8a972200/public",
      imageSrcHover:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/947c8083-4964-492f-a8bd-df9f8a972200/public",
      title: "Melting Glacier -Rising Risk : Climate change and fresh water supplies",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.",
    },
  ]

  return (
    <main className="relative">

      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header ref={headerRef} className="w-full relative z-10">
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
                <Link href="/" passHref>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                    alt="WAE Logo"
                    width={logoSize.width}
                    height={logoSize.height}
                    style={{ cursor: 'pointer', transition: 'width 1s ease-in-out, height 1s ease-in-out' }}
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
                  color: coordinatesVisible ? "#000000" : "transparent",
                  opacity: coordinatesVisible ? 1 : 0,
                  transition: 'color 1s ease-in-out, opacity 1s ease-in-out'
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
                  color: taglineVisible ? "#000000" : "transparent",
                  opacity: taglineVisible ? 1 : 0,
                  transition: 'color 1s ease-in-out, opacity 1s ease-in-out'
                }}
              >
                To lead the way in<br />sustainability ahead of the<br />rest
              </div>

              {/* Inside WAE Menu Items / Collapsed Menu */}
              <div className="flex flex-col justify-center" style={{ transition: 'opacity 1s ease-in-out' }}>
                {isMenuCollapsed ? (
                  <div
                    onClick={toggleMenu}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                      color: '#000',
                      opacity: 1,
                      transition: 'opacity 1s ease-in-out',
                    }}
                  >
                    Menu
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                ) : (
                  <div
                    className="flex flex-col justify-center space-y-2"
                    style={{
                      opacity: taglineVisible ? 1 : 0,
                      transition: 'opacity 1s ease-in-out',
                    }}
                  >
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
                        <Link href={item.href}>
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
                                <polyline points="12 5 19 12 19" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ETCETERA Menu Items */}
              <div className="flex flex-col justify-center space-y-2" style={{ transition: 'opacity 1s ease-in-out' }}>
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                      opacity: taglineVisible ? 1 : 0,
                      transition: 'color 1s ease-in-out, opacity 1s ease-in-out'
                    }}
                  >
                    <Link href={item.href}>
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
                            <polyline points="12 5 19 12 19" />
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

      {/* ================= HERO SECTION ================= */}
      <section
        className={`${containerClass} flex justify-between items-start mt-5 mb-20`}
      >
        {/* Video (38.19% width & height) */}
        <div style={{ width: "38.19%"}}>
          <video
            src="/Blog_Video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full"
          />
        </div>

        {/* Text overview (38.19% width) */}
        <div style={{ width: "50%" }}>
          <h4
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "130%",
              textDecoration: "underline",
            }}
          >
            {heroSlides[currentSlide].subtitle}
          </h4>
          <div style={{ height: "40px" }} />
          <h1
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "40px",
              lineHeight: "120%",
              letterSpacing: "0%",
            }}
          >
            {heroSlides[currentSlide].title}
          </h1>
          <div style={{ height: "40px" }} />
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "130%",
            }}
          >
            {heroSlides[currentSlide].description}
          </p>
          <a 
            href="/climate-change-&-water-v3" 
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "130%",
              letterSpacing: "0%",
              textDecoration: "underline",
              display: "inline-block"
            }}
          >
            Read more
          </a>
        </div>
      </section>

      {/* ================= BUTTONS SECTION ================= */}
      <section className="mb-20">
        <div className={containerClass}>
          <div className="flex space-x-4">
            {buttonLabels.map((label, idx) => (
              <SelectButton
                key={idx}
                selected={selectedIndex === idx}
                onClick={() => setSelectedIndex(idx)}
              >
                {label}
              </SelectButton>
            ))}
          </div>
          <div className="h-4" />
          <hr className="w-full h-[1px] bg-[#00000088]" />
        </div>
      </section>

      {/* ================= BLOG CARDS SECTION ================= */}
      <section>
        <div className={containerClass}>
          <div className="mb-[140px] grid grid-cols-3 gap-x-[4.166%] gap-y-[140px]">
            {blogPosts.map((post, idx) => (
              <div 
                key={idx} 
                className="group relative"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative">
                  {/* Base image */}
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    width={347}
                    height={300}
                    className="rounded-lg w-full h-auto"
                  />
                  {/* Hover image */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-700 ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`}
                    style={{ zIndex: 10 }}
                  >
                    <Image
                      src={post.imageSrcHover}
                      alt={post.title}
                      width={347}
                      height={300}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
                <div style={{ height: '60px' }} />
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '140%',
                  }}
                >
                  {post.title}
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '24px',
                  }}
                >
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Writers SECTION */}
      <section className="mb-20">
        <div className={containerClass}>
          <h2 
            className="mb-16"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "48px",
              lineHeight: "110%",
              letterSpacing: "0%",
            }}
          >
            Our Writers
          </h2>
          
          <div className="grid grid-cols-3 gap-x-[4.166%]">
            {/* Writer 1 - ADITI SHARMA */}
            <div className="text-left">
              <div className="relative w-[347px] h-[346px] mb-8">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/471bde63-5514-44fd-67a7-d06a24417100/public"
                  alt="Aditi Sharma"
                  width={347}
                  height={346}
                  className="rounded-full object-cover grayscale"
                />
              </div>
              <h3 
                className="uppercase mb-2"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                }}
              >
                ADITI SHARMA
              </h3>
              <p 
                className="mb-4"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "130%",
                }}
              >
                Climate Change and Water
              </p>
              <p 
                className="mb-6"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "130%",
                  color: "#666",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
              </p>
              <span
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "130%",
                }}
              >
                <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
              </span>
            </div>

            {/* Writer 2 - REHNUMA ANSARI */}
            <div className="text-left">
              <div className="relative w-[347px] h-[346px] mb-8">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9f13e92f-a500-4052-dd61-2bd0951c1900/public"
                  alt="Rehnam Ansari"
                  width={347}
                  height={346}
                  className="rounded-full object-cover grayscale"
                />
              </div>
              <h3 
                className="uppercase mb-2"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                }}
              >
                REHNUMA ANSARI
              </h3>
              <p 
                className="mb-4"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "130%",
                }}
              >
                Climate Change and Water
              </p>
              <p 
                className="mb-6"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "130%",
                  color: "#666",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
              </p>
              <span
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "130%",
                }}
              >
                <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
              </span>
            </div>

            {/* Writer 3 - SHAMBHAVI */}
            <div className="text-left">
              <div className="relative w-[347px] h-[346px] mb-8">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/756f0c58-33ea-496a-5c76-f485ccb09800/public"
                  alt="Shamishavi"
                  width={347}
                  height={346}
                  className="rounded-full object-cover grayscale"
                />
              </div>
              <h3 
                className="uppercase mb-2"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                }}
              >
                SHAMBHAVI
              </h3>
              <p 
                className="mb-4"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "130%",
                }}
              >
                Climate Change and Water
              </p>
              <p 
                className="mb-6"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "130%",
                  color: "#666",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
              </p>
              <span
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "130%",
                }}
              >
                <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />


      {/* Inline CSS for custom animations */}
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
        .menu-arrow,
        .blueprint-arrow {
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