"use client"

import type React from "react"
import type { FC } from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion" // motion is still needed for the icon animation in the HoverButton definition itself
import { useInView } from "react-intersection-observer"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full px-[9.72%]"

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
        fontWeight: 500, // This fontWeight is for the button text itself (like "Know More")
        fontSize: "10px",
        lineHeight: "100%",
        textTransform: "uppercase",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
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

   // Measure header height (Note: This height is calculated but not used in the current JSX)
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []); // Dependency array is empty, runs once on mount and cleanup


  // Tagline lines (split into words)
  const taglineLine1 = "To lead the way in sustainability"
  const taglineLine2 = "ahead of the rest."
  const taglineWords1 = taglineLine1.split(" ")
  const taglineWords2 = taglineLine2.split(" ")

  // Arrays for menu items with hrefs
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers3" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ]
  const lineCount = Math.min(productsItems.length, blueprintItems.length) // Note: lineCount is calculated but not used

  interface Metric {
    value: string;
    label: string;
  }
  
  interface StatRow {
    imageSrc: string;
    imageAlt: string;
    company: string;
    description: string; // Added field for first paragraph
    impact: string;     // Added field for second paragraph (after metrics)
    metrics: Metric[]; 
  }
  
  const statsData: StatRow[] = [
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3d684e16-3b2b-4cd9-1f6c-4abc0fc22400/public",
      imageAlt: "Citibank Logo",
      company: "Citibank: Banking on a Greener Tomorrow",
      description: "Citibank has deployed 105 water-refill stations across its Indian offices, turning everyday hydration into an act of environmental stewardship.",
      impact: "An equivalent of planting thousands of trees.",
      metrics: [
        { value: "14,173 kg", label: "Plastic waste Removed" },
        { value: "16.5M L",  label: "Water saved annually" },
        { value: "90,000 KG",  label: "CO2 emissions reduced" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/46a81604-4115-4667-9587-e16da4c8e100/public",
      imageAlt: "Credit Suisse Logo",
      company: "Credit Suisse: A Fresh Start for a Sustainable Future",
      description: "Credit Suisse has integrated 70 refill stations in Pune, Gurgaon, and Mumbai, making clean, green hydration accessible to its workforce.",
      impact: "Credit Suisse is proving that big financial institutions can make big environmental impacts.",
      metrics: [
        { value: "98,000 KG", label: "CO2 Reduced" },
        { value: "17M L",  label: "Water saved annually" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21a38e4f-d5f1-4d20-5566-b31e949a1600/public",
      imageAlt: "Deutsche Logo",
      company: "Deutsche Bank: Banking on Blue",
      description: "Deutsche Bank’s 73 refill stations are reducing reliance on bottled water across India.",
      impact: "Deutsche Bank is setting a powerful example of sustainability in action.",
      metrics: [
        { value: "1,32,000 KG", label: "CO2 emissions reduced" },
        { value: "23M L",  label: "Water saved annually" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/edaf1eaf-99cb-420a-d360-618f789f2c00/public",
      imageAlt: "Ericsson Logo",
      company: "Ericsson: Connecting the Dots to a Greener Future",
      description: "Ericsson’s installation of 138 water-refill stations across India showcases their commitment to sustainable practices",
      impact: "Ericsson’s initiative is like removing the equivalent of two medium-sized SUVs from the roads each month.",
      metrics: [
        { value: "3,15,000 KG", label: "CO2 emission Reduced" },
        { value: "55M L",  label: "Water saved annually" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fa2192f3-0ed6-43fa-248b-3b741acf6400/public",
      imageAlt: "ICICI Logo",
      company: "ICICI Bank: A Ripple of Change",
      description: "ICICI Bank leads the pack with 624 water-refill stations across India.",
      impact: "Turning everyday hydration into a force for good.",
      metrics: [
        { value: "53M L",  label: "Water saved annually" },
        { value: "2,99,000 KG", label: "CO2 emissions reduced" },
        { value: "94,000 KG", label: "CO2 emissions reduced" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/659c55c6-14a0-4c61-f51c-b9bb2c64d600/public",
      imageAlt: "J.P. Morgan Logo",
      company: "J.P. Morgan: Investing in a Greener Tomorrow",
      description: "J.P. Morgan has turned 241 locations into green spaces with their water-refill stations.",
      impact: "J.P. Morgan is redefining the meaning of “investment” by investing in the planet.",
      metrics: [
        { value: "90,288 KG", label: "CO2 emission reduced" },
        { value: "105M L",  label: "Water saved annually" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/09bc88d3-2806-4258-1e5e-46192a2ddc00/public",
      imageAlt: "Max Life Logo",
      company: "Max Life: Securing a Greener Future",
      description: "Max Life has installed 323 refill stations, securing their commitment to sustainability.",
      impact: "Max Life’s initiative underscores the power of green practices in everyday operations.",
      metrics: [
        { value: "2,83,000 KG", label: "CO2 emissions reduced" },
        { value: "50M L",  label: "Water saved annually" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/25f2d9de-235b-443d-27b5-7c800c94a100/public",
      imageAlt: "Morgan Stanley Logo",
      company: "Morgan Stanley: Reimagining Impact",
      description: "Morgan Stanley’s 47 refill stations in Mumbai and Bangalore are more than water sources—they’re symbols of change.",
      impact: "Morgan Stanley’s commitment to sustainability is evident in every sip.",
      metrics: [
        { value: "2,83,000 KG", label: "CO2 emissions reduced" },
        { value: "50M L",  label: "Water saved annually" },
      ],
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/df18fbae-1da6-4806-bd55-527925802e00/public",
      imageAlt: "RBS Logo",
      company: "RBS (Royal Bank of Scotland): A Fresh Take on Finance",
      description: "RBS has implemented 127 refill stations across major Indian cities, championing a fresh approach to hydration.",
      impact: "An equivalent of planting thousands of trees.",
      metrics: [
        { value: "103,000 KG", label: "CO2 emissions reduced" },
        { value: "18M L",  label: "Water saved annually" },
      ],
    },
    {
        imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/af20eab2-011d-43e3-aad9-dac272a6cb00/public",
        imageAlt: "Sapient Logo",
        company: "Sapient: Redefining Smart Solutions",
        description: "Sapient’s 103 refill stations in Gurgaon are helping redefine what it means to be a smart, sustainable business.",
        impact: "Sapient’s actions speak louder than words, showing that smart solutions are sustainable solutions.",
        metrics: [
          { value: "1,54,000 KG", label: "CO2 emissions reduced" },
          { value: "27M L",  label: "Water saved annually" },
        ],
      },
  ];
  

  return (
    <main className="relative pb-[40px]">
      {/* HEADER (Not Fixed in this version) */}
      {/* The div with inline styles here seems unnecessary if not fixed */}
      <div> {/* Consider removing this outer div or making it relative/static */}
        <header ref={headerRef} className={`w-full relative z-10 mb-5`}> {/* Apply containerClass inside header content div */}
          <div className={containerClass}> {/* Use containerClass for consistent padding */}
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
                <Link href="/">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                    alt="WAE Logo"
                    width={78}
                    height={82}
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

      {/* Hero section (Not Fixed in this version) */}
      <section
                id="hero"
                className="relative w-full overflow-hidden h-[550px] pt-[70px] md:pt-[160px] mb-[140px]"
              >
                {/* Desktop: Background video (cover, aspect ratio maintained) */}
                <video
                  className="hidden md:block absolute inset-0 w-screen  object-contain z-0"
                  style={{objectFit: 'contain' }}
                  src="/Success Story_BFSI.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </section>

        {/* Transforming Hydration Section */}
        <section className={`${containerClass} flex justify-between items-start mb-[140px]`}>
            {/* Left: Heading */}
            <div className="w-[31.8%]"
                style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "45px",
                lineHeight: "110%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                }}
            >
                Transforming Hydration in the BFSI Sector
            </div>

            {/* Right: Description + Button */}
            <div className="flex flex-col w-[33%] text-black/60"
                style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "5%",
                    verticalAlign: "middle",
                    }}
            >
                <p className="mb-4">
                    Explore how BFSI leaders are not just crunching numbers but making every drop count in their journey towards a sustainable future.
                </p>
                <p className="mb-[60px]">
                    In an era where every drop counts, the BFSI (Banking, Financial Services, and Insurance) sector is taking bold steps toward sustainability. Through partnerships with WAE, leading financial institutions are replacing traditional bottled water with state-of-the-art, point-of-use water purification systems that not only ensure pure hydration but also dramatically reduce environmental footprints. These initiatives are helping to eliminate mountains of plastic waste, save millions of liters of water, and cut carbon emissions, all while setting a new standard for corporate responsibility.
                </p>

                {/* Download Button */}
                <HoverButton href="/download-success-stories">
                {(hovered) => (
                    <>
                    <span>DOWNLOAD SUCCESS STORIES</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={hovered ? '#fff' : '#000'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                    </>
                )}
                </HoverButton>
            </div>
        </section>

        {/* company grid */}
        <section className={`${containerClass} flex flex-col gap-y-[140px] mb-[140px]`}>
        {statsData.map((row, idx) => {
            const isOdd = idx % 2 === 1;
            return (
            <div
                key={idx}
                className="flex justify-between items-start gap-x-[40px]"
            >
                {/* Image */}
                <div className={isOdd ? 'order-2' : 'order-1'}>
                <div className="group overflow-hidden w-[320px] h-[320px]">
                    <Image
                    src={row.imageSrc}
                    alt={row.imageAlt}
                    width={320}
                    height={320}
                    className="object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    />
                </div>
                </div>

                {/* Description */}
                <div
                className={`${isOdd ? 'order-1' : 'order-2'} flex flex-col`}
                style={{ width: '35%' }}
                >
                {/* Company Name */}
                <div
                    style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '140%',
                    textTransform: 'uppercase',
                    verticalAlign: 'middle',
                    }}
                >
                    {row.company}
                </div>

                {/* 12px vertical gap */}
                <div className="h-[12px]" />
                
                {/* Description paragraph */}
                <p
                    style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    }}
                >
                    {row.description}
                </p>

                {/* 40px vertical gap */}
                <div className="h-[40px]" />

                {/* Metrics */}
                <div className="flex gap-[35px]">
                    {row.metrics.map((m, i) => (
                    <div key={i} className="flex flex-col items-start">
                        <div
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 700,
                            fontSize: '17px',
                            lineHeight: '140%',
                            textTransform: 'uppercase',
                            verticalAlign: 'middle',
                        }}
                        >
                        {m.value}
                        </div>
                        <div className="h-[12px]" />
                        <div
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '130%',
                            verticalAlign: 'middle',
                        }}
                        >
                        {m.label}
                        </div>
                    </div>
                    ))}
                </div>

                {/* 40px vertical gap */}
                <div className="h-[40px]" />
                
                {/* Impact paragraph */}
                <p
                    style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    }}
                >
                    {row.impact}
                </p>
                </div>
            </div>
            );
        })}
        </section>

        {/* Achieve your goals Section */}
        <section className={`${containerClass} flex justify-between items-start mb-[140px]`}>
            {/* Left: Heading */}
            <div className="w-[31.8%]"
                style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "45px",
                lineHeight: "110%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                }}
            >
                Achieve Your Sustainability Goals with WAE
            </div>

            {/* Right: Description + Button */}
            <div className="flex flex-col w-[33%] text-black/60"
                style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "5%",
                    verticalAlign: "middle",
                    }}
            >
                <p className="mb-4">
                    At WAE, we empower organizations to turn environmental responsibility into measurable action. Our water reuse and treatment solutions are designed not just to optimize operations, but to directly support your sustainability goals, reduce freshwater dependency, and lower ecological impact.
                </p>
            </div>
        </section>

        {/* CONNECT WITH US FORM */}
        <section className=" px-[9.72%] pb-0">
            <ConnectWithUs introText = "Want to know how"/>
        </section>

      {/* FOOTER SECTION */}
      {/* This div now appears after the section container (which has margin) */}
      <div style={{ position: "relative", zIndex: 10 }}> {/* zIndex 10 here is fine as it's not overlapping a fixed element */}
        <Footer />
      </div>

      {/* INLINE CSS for hover and arrow animations */}
      <style jsx>{`
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