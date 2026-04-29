"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  variant?: "default" | "inverted";
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, variant = "default" }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  // Define styles based on variant
  const isDefault = variant === "default";

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
        fontSize: "14px",
        lineHeight: "100%",
        // textTransform: "uppercase",
        backgroundColor: isDefault
          ? (hovered ? "#000" : "#f2f2f2")
          : (hovered ? "#fff" : "transparent"),
        border: isDefault
          ? "1px solid #000"
          : "1px solid #fff",
        cursor: "pointer",
        color: isDefault
          ? (hovered ? "#fff" : "#000")
          : (hovered ? "#000" : "#fff"),
      }}
    >
      {children(hovered)}
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



/**
 * Helping Clients Section: A carousel with hover-to-expand cards
 */
const HelpingClientsSection: FC = () => {
  // First image remains expanded by default
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sharedText = {
    beforeHover: "Advanced filtration systems deliver certified, high-quality drinking water exactly where it’s needed—eliminating dependence on bottled supply chains... ",
    afterHover: "Advanced filtration systems deliver certified, high-quality drinking water exactly where it’s needed—eliminating dependence on bottled supply chains. This ensures consistent quality, reduces operational complexity, and brings control back to the point of consumption."
  };

  const cards = [
    {
      overlayTitle: "Purify at the source of use",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f7825f8c-a05f-4ad0-60e7-e52b3f9b1500/public",
    },
    {
      overlayTitle: "Cut costs by up to 90%",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f7825f8c-a05f-4ad0-60e7-e52b3f9b1500/public",
    },
    {
      overlayTitle: "Embed circular principles",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f7825f8c-a05f-4ad0-60e7-e52b3f9b1500/public",
    },
  ];

  const handleNext = () => {
    if (currentIndex < 1) setCurrentIndex(1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(0);
  };

  return (
    <section
      className="w-full bg-[#f2f2f2] overflow-hidden"
      style={{ padding: "120px 9.72%" }}
    >
      <div className="flex justify-between items-center mb-20">
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: "40px",
          lineHeight: "120%",
          letterSpacing: "0%",
          margin: 0
        }}>
          We are helping clients
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.3 : 1, cursor: currentIndex === 0 ? "default" : "pointer" }}
            className="w-[44px] h-[44px] border border-[#00000033] flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === 1}
            style={{ opacity: currentIndex === 1 ? 0.3 : 1, cursor: currentIndex === 1 ? "default" : "pointer" }}
            className="w-[44px] h-[44px] border border-[#00000033] flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative" style={{ minHeight: "650px" }}>
        <motion.div
          className="flex"
          style={{ gap: "2.77vw" }}
          onMouseLeave={() => setHoveredIndex(0)}
          animate={{ x: `calc(-${currentIndex * (25 + 2.77)}vw)` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className="flex-shrink-0"
                style={{ width: isHovered ? (index === 2 ? "52.79vw" : "45.83vw") : "25vw" }}
                animate={{ width: isHovered ? (index === 2 ? "52.79vw" : "45.83vw") : "25vw" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden group cursor-pointer"
                  style={{ height: "461px" }}
                >
                  <Image
                    src={card.image}
                    alt={card.overlayTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-14 left-10 right-10">
                    <h3 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "32px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#FFFFFF",
                      margin: 0
                    }}>
                      {card.overlayTitle}
                    </h3>
                  </div>
                </div>

                {/* Textbox below */}
                <div style={{ marginTop: "32px", maxWidth: isHovered ? "41.52vw" : "none" }}>
                  <motion.div
                    animate={{ height: isHovered ? "auto" : "80px" }}
                  >
                    <p style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "130%",
                      letterSpacing: "0%",
                      color: "#00000099",
                      margin: 0
                    }}>
                      {isHovered ? (
                        sharedText.afterHover
                      ) : (
                        <>
                          {sharedText.beforeHover}
                          <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "18px",
                            lineHeight: "100%",
                            color: "#00000099"
                          }}>
                            read more
                          </span>
                        </>
                      )}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div style={{ height: "60px" }} />

      <div className="flex">
        <HoverButton href="/this-is-us">
          {(hovered) => (
            <>
              <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
              }}>
                Know More
              </span>
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
                style={{ transform: hovered ? "translate(2px, -2px)" : "none" }}
              >
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </HoverButton>
      </div>
    </section>
  );
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
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers3" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ]
  const lineCount = Math.min(productsItems.length, blueprintItems.length) // Note: lineCount is calculated but not used

  // Brand logos for marquee
  const brandLogos = [
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3f2f7aee-3341-40f0-83b0-9929fed77700/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e2da048e-651a-463e-2689-58d8418b7700/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/acad2e03-7926-494c-2661-e2ad69e80700/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/84053b5e-b615-468f-2117-8b76f26e1d00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9436a14a-faf2-4320-7f65-6f5684bfb600/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76665ccd-981b-4323-13f3-aae079a46500/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d183040a-3d81-43a8-09ff-31cd03319f00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d9eb2793-e98a-45d8-1c96-a3d3985c3c00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2c5a5b3a-4e77-43fb-3735-3e9446a9a500/public"
  ]

  return (
    <main className="relative pb-[40px]">
      {/* HEADER (Not Fixed in this version) */}
      {/* The div with inline styles here seems unnecessary if not fixed */}
      <div> {/* Consider removing this outer div or making it relative/static */}
        <header ref={headerRef} className={`w-full bg-white relative z-10 pb-5`}> {/* Apply containerClass inside header content div */}
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
                  fontSize: "11px",
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

      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-screen relative bg-white overflow-hidden"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        {/* Background video */}
        <video
          src="/sustainability-hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text overlay — 59px above bottom, left margin 9.72% */}
        <div
          className="absolute"
          style={{ bottom: "59px", left: "9.72%" }}
        >
          {/* Headline */}
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "47px",
            lineHeight: "110%",
            letterSpacing: "0%",
            color: "#FFFFFF",
            margin: 0,
            marginBottom: "20px",
          }}>
            OUR PLANET, OUR RESPONSIBILITY
          </p>

          {/* Scroll for more row */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#FFFFFF",
            }}>
              We believe sustainability isn’t a choice, it’s a responsibility. Together, let’s create a future where businesses thrive while actively protecting our planet.
            </span>
          </div>
        </div>
      </section>

      {/* BRAND LOGO MARQUEE SECTION */}
      <section
        className="w-full bg-[#f2f2f2] overflow-hidden"
        style={{ padding: "80px 9.72%" }}
      >
        <div className="marquee-container relative">
          <div className="marquee-content flex items-center" style={{ gap: "6.94vw" }}>
            {[...brandLogos, ...brandLogos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo}
                  alt={`Brand Logo ${index % 9 + 1}`}
                  height={44}
                  width={100} // width will be adjusted by image-rendering and css but we need a baseline for Next.js Image
                  className="h-[44px] w-auto max-w-none grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE ORGANISATION SECTION */}
      <section
        className="w-full bg-white"
        style={{ padding: "120px 9.72%" }}
      >
        <div className="flex justify-between items-start">
          {/* Left Column */}
          <div style={{ width: "20.83vw" }}>
            <h2 style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "uppercase",
              margin: 0
            }}>
              About the organisation
            </h2>
          </div>

          {/* Middle Column */}
          <div style={{ width: "20.83vw" }}>
            <p style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "120%",
              letterSpacing: "0%",
              color: "#00000099",
              margin: 0
            }}>
              We are a sustainability-driven activist firm enabling organisations to reduce their environmental footprint, embed ethical practices, and transition towards regenerative business models.
            </p>
          </div>

          {/* Right Column */}
          <div style={{ width: "20.83vw" }}>
            <p style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "120%",
              letterSpacing: "0%",
              color: "#00000099",
              margin: 0
            }}>
              The world is not running low on water. It is running out of patience for those who waste it.
            </p>
          </div>
        </div>
      </section>

      {/* THIS LEADS TO SECTION */}
      <section
        className="w-full bg-[#f2f2f2]"
        style={{ padding: "120px 9.72%" }}
      >
        {/* Headline */}
        <p style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: "32px",
          lineHeight: "120%",
          letterSpacing: "0%",
          margin: 0
        }}>
          This leads to..
        </p>

        {/* 50px Gap */}
        <div style={{ height: "50px" }} />

        {/* Placeholder Div */}
        <div>
          {/* We will care about this later */}
        </div>

        {/* 67px Gap */}
        <div style={{ height: "67px" }} />

        {/* Impact Description */}
        <p style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "100%",
          letterSpacing: "0%",
          margin: 0
        }}>
          Every bottle procured through your supply chain is a direct contribution to aquifer depletion. <br />
          The exposure is financial, reputational, and regulatory - and it is{" "}
          <span style={{
            fontWeight: 600
          }}>
            growing.
          </span>
        </p>
      </section>

      {/* ENTERPRISE SYSTEMS SECTION */}
      <section
        className="w-full bg-[#000000] text-white"
        style={{ padding: "120px 9.72%" }}
      >
        <div>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "120%",
            letterSpacing: "0%",
            margin: 0
          }}>
            WAE builds enterprise-grade, point-of-use water purification systems that make bottled water redundant - commercially, operationally, and environmentally.
          </p>

          <div style={{ height: "24px" }} />

          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "120%",
            letterSpacing: "0%",
            margin: 0
          }}>
            The model is simple: deliver pure, healthy water at the point of consumption, eliminate the supply chain that causes harm, and do it at one-tenth the cost of bottled water.
          </p>

          <div style={{ height: "60px" }} />

          <HoverButton href="/our-portfolio" variant="inverted">
            {(hovered) => (
              <>
                <span style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                }}>
                  Know More
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </HoverButton>
        </div>
      </section>

      {/* HELPING CLIENTS SECTION */}
      <HelpingClientsSection />

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

        /* Marquee Animation */
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          width: fit-content;
          animation: slide 30s linear infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>

      {/* Global Styles */}
      <style jsx global>{`
        html {
          /* scroll-behavior: smooth; */
        }
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
    </main>
  )
}