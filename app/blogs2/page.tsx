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
      subtitle: 'LOREM IPSUM',
      title: 'How to reduce your water foot print: From Shower to shopping',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis, dui nec molestie fringilla, diam velit facilisis ante, non tincidunt velit tortor id est. In tempor, risus eu feugiat tincidunt, justo nunc varius urna, a accumsan nibh justo nec turpis. In vehicula sodales laoreet.',
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

  // --- HEADER TAGLINE SCROLL STATE ---
  const headerRef = useRef<HTMLDivElement>(null)
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setTaglineVisible(y < prevY.current)
      prevY.current = y
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // --- BUTTONS SECTION STATE ---
  const [selectedIndex, setSelectedIndex] = useState(0)

  // --- STATIC DATA ---
  const tagline1 = "To lead the way in sustainability".split(" ")
  const tagline2 = "ahead of the rest.".split(" ")
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "#" },
    { text: "The Activist Co.", href: "#" },
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
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2af7fca1-0f0e-4152-9663-4e4ab29bd700/public",
      title: "How to Reduce Your Water Footprint: From Shower to Shopping",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7cd518f1-b756-48b4-f092-ff201fa8af00/public",
      title: "Why Every Drop Counts: Understanding the Global Crisis",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb8715a4-ecf3-4d71-c660-6ae749ecdd00/public",
      title: "Who Owns Water: Water Rights and Access",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bbd20c7c-81c6-4e56-40fc-e82926f6ba00/public",
      title: "Water Inequality: Making Water a Human Right",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/acf3be78-0a74-4315-e8c7-92a9c5d8d900/public",
      title: "Climate Change and Water Scarcity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imageSrc:
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/947c8083-4964-492f-a8bd-df9f8a972200/public",
      title: "Melting Glaciers: Fresh Water Risks",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]

  return (
    <main className="relative">

      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header ref={headerRef} className="w-full relative z-10 mb-[120px]">
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

              {/* Tagline Animation */}
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

      {/* ================= HERO SECTION ================= */}
      <section
        className={`${containerClass} flex justify-between items-start mb-20`}
      >
        {/* Image (38.19% width & height) */}
        <div style={{ width: "38.19%", height: "38.19%" }}>
          <Image
            src={heroSlides[currentSlide].imageSrc}
            alt={heroSlides[currentSlide].title}
            width={800}
            height={800}
            className="object-cover w-full h-full"
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
              fontSize: "58px",
              lineHeight: "110%",
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
      <section className="mb-40">
        <div className={containerClass}>
          <div className="grid grid-cols-3 gap-x-[4.166%] gap-y-[140px]">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="group">
                <Image
                  src={post.imageSrc}
                  alt={post.title}
                  width={347}
                  height={300}
                  className="grayscale filter transition-filter duration-300 group-hover:grayscale-0 rounded-lg"
                />
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
