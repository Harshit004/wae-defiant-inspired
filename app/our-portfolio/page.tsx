"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"

// --- NEW MOBILE HEADER COMPONENT ---
interface MobileHeaderProps {
  productsItems: { text: string; href: string }[];
  blueprintItems: { text: string; href: string; }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ productsItems, blueprintItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fixed Mobile Header Bar (Visible only on small screens) */}
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-black/10 md:hidden ">
        {/* Mobile Logo */}
        <Link href="/">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce113ad4-0a6b-43dd-066c-26769520d000/public"
            alt="WAE Logo Mobile"
            width={40}
            height={40}
          />
        </Link>
        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-around w-6 h-5 relative z-50 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {/* Hamburger lines - always black for visibility on white background */}
          <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
          {/* <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span> */}
          <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay (Slides in from right) */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-start pt-[80px] pb-5 px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* Menu Items - THIS IS THE CHANGE */}
        {/* Changed flex-col to flex-row and added flex-wrap for multiple rows if needed */}
        {/* Also adjusted spacing and alignment for a horizontal layout */}
        <div className="flex flex-row flex-wrap justify-start items-center gap-x-6 gap-y-4 w-full mb-8">
          <h3 className="text-white text-xs font-semibold uppercase mb-2 font-['Inter Tight', sans-serif] w-full">Inside WAE</h3>
          {productsItems.map((item, i) => (
            <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium font-['Inter Tight', sans-serif] leading-[110%]">
              {item.text}
            </Link>
          ))}
        </div>
        <div className="w-full h-px bg-[#D9D9DC] mb-8" /> {/* Divider */}
        <div className="flex flex-row flex-wrap justify-start items-center gap-x-6 gap-y-4 w-full">
          <h3 className="text-white text-xs font-semibold uppercase mb-2 font-['Inter Tight', sans-serif] w-full">Etcetera</h3>
          {blueprintItems.map((item, i) => (
            <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium font-['Inter Tight', sans-serif] leading-[110%]">
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
// --- END NEW MOBILE HEADER COMPONENT ---


// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-[140px]";

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

  return href ? (
      href.startsWith('#') ? (
        <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
      ) : (
        <Link href={href} className="contents">{buttonContent}</Link>
      )
    ) : buttonContent;
};


export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

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

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

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
      {/* RENDER MOBILE HEADER COMPONENT HERE (only on small screens) */}
      <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />

      {/* DESKTOP HEADER (Hidden on small screens) */}
      {/* Removed mb-5 to allow hero to start immediately after it */}
      <header ref={headerRef} className={`w-full bg-white relative z-10 hidden md:block md:pb-[20px]`}>
        <div className={containerClass}>
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
                  <Link href={item.href} className="contents">
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
                  <Link href={item.href} className="contents">
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

      {/* Hero section */}
              <section
                id="hero"
                className="relative w-full overflow-hidden h-[550px] pt-[70px] md:pt-[160px] mb-[140px]"
              >
                {/* Desktop: Background video (cover, aspect ratio maintained) */}
                <video
                  className="hidden md:block absolute inset-0 w-screen  object-contain z-0"
                  style={{objectFit: 'contain' }}
                  src="/Our_portfolio.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </section>

        {/* NEW SECTION: Responsive Grid Layout */}
        <div className={`${containerClass} mb-[80px] md:mb-[140px] mt-[60px]`}>
          <div className="grid grid-cols-1 gap-y-[80px] md:gap-y-[280px] md:grid-cols-2 md:gap-x-[10%]">
            
            {/* Section 1: Our Green Is Blue */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-[10%] md:items-center">
              {/* Left Column Text (Title) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="md:hidden"
              >
                Our Green Is Blue
              </div>
              {/* Left Column Text (Title) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "40px",
                  lineHeight: "110.00000000000001%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="hidden md:block md:px-0"
              >
                Our Green Is Blue
              </div>

              {/* Right Column Text (Paragraphs) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                }}
                className="md:hidden"
              >
                <p className="mb-4">
                  At WAE, sustainability is not a feature - it's our foundation. Guided by our core belief that Our Green is Blue, we engineer purpose-led products and intelligent solutions that address the world's most pressing water challenges. From eliminating single-use plastics to enabling water reuse at scale, our portfolio empowers organizations to operate cleaner, smarter, and more responsibly.
                </p>
                <p>
                  Explore how our offerings are creating meaningful environmental and operational impact for businesses, institutions, and communities alike.
                </p>
              </div>
              {/* Right Column Text (Paragraphs) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                  width: "85%",
                }}
                className="hidden md:block md:px-0"
              >
                <p className="mb-4">
                  At WAE, sustainability is not a feature - it's our foundation. Guided by our core belief that Our Green is Blue, we engineer purpose-led products and intelligent solutions that address the world's most pressing water challenges. From eliminating single-use plastics to enabling water reuse at scale, our portfolio empowers organizations to operate cleaner, smarter, and more responsibly.
                </p>
                <p>
                  Explore how our offerings are creating meaningful environmental and operational impact for businesses, institutions, and communities alike.
                </p>
              </div>
            </div>

            {/* Section 2: Our Products */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-[10%] md:items-start">
              {/* Left Column Text (Title) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="md:hidden"
              >
                Our Products
              </div>
              {/* Left Column Text (Title) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "40px",
                  lineHeight: "110.00000000000001%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="hidden md:block md:px-0"
              >
                Our Products
              </div>

              {/* Right Column Text (Paragraphs and List) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                }}
                className="md:hidden"
              >
                <p style={{ margin: 0, marginBottom: '10px' }}>
                  WAE's hydration systems are designed for modern, high-footfall environments - offices, airports, institutions, and public spaces. Crafted from stainless steel and built to eliminate plastic bottle dependency, our products contribute directly to zero-landfill goals while ensuring high-performance water dispensing.
                </p>
                
                <ul style={{
                  listStyleType: 'disc',
                  marginLeft: '20px',
                  marginTop: '10px',
                  marginBottom: '20px',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '5px' }}>Plastic-free hydration infrastructure</li>
                  <li style={{ marginBottom: '5px' }}>Zero-landfill stainless steel construction</li>
                  <li>IoT-enabled for real-time monitoring and usage optimization</li>
                </ul>
                
                <div className="mt-6">
                  <a href="/our-products2" className="w-[40%] md:w-fit">
                    <HoverButton>
                      {(hovered) => (
                        <>
                          <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                          }} className="md:text-[10px] md:font-medium md:uppercase">
                            Explore Our Products
                          </span>
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
                  </a>
                </div>
              </div>
              {/* Right Column Text (Paragraphs and List) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                  width: "85%",
                }}
                className="hidden md:block md:px-0"
              >
                <p style={{ margin: 0, marginBottom: '10px' }}>
                  WAE's hydration systems are designed for modern, high-footfall environments - offices, airports, institutions, and public spaces. Crafted from stainless steel and built to eliminate plastic bottle dependency, our products contribute directly to zero-landfill goals while ensuring high-performance water dispensing.
                </p>
                
                <ul style={{
                  listStyleType: 'disc',
                  marginLeft: '20px',
                  marginTop: '10px',
                  marginBottom: '20px',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '5px' }}>Plastic-free hydration infrastructure</li>
                  <li style={{ marginBottom: '5px' }}>Zero-landfill stainless steel construction</li>
                  <li>IoT-enabled for real-time monitoring and usage optimization</li>
                </ul>
                
                <div className="mt-6">
                  <a href="/our-products2" className="w-[40%] md:w-fit">
                    <HoverButton>
                      {(hovered) => (
                        <>
                          <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                          }} className="md:text-[10px] md:font-medium md:uppercase">
                            Explore Our Products
                          </span>
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
                  </a>
                </div>
              </div>
            </div>

            {/* Section 3: Our Solutions */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-[10%] md:items-start">
              {/* Left Column Text (Title) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="md:hidden"
              >
                Our Solutions
              </div>
              {/* Left Column Text (Title) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "40px",
                  lineHeight: "110.00000000000001%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="hidden md:block md:px-0"
              >
                Our Solutions
              </div>

              {/* Right Column Text (Paragraphs and List) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                }}
                className="md:hidden"
              >
                <p style={{ margin: 0, marginBottom: '10px' }}>
                  WAE's water treatment and reuse solutions are designed for long-term sustainability and compliance. From greywater reuse and effluent treatment to modular STPs and rainwater harvesting systems, our solutions help institutions close the water loop—reducing waste, conserving resources and achieving sustainability mandates.
                </p>
                
                <ul style={{
                  listStyleType: 'disc',
                  marginLeft: '20px',
                  marginTop: '10px',
                  marginBottom: '20px',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '5px' }}>Custom-built water reuse and recycling systems</li>
                  <li style={{ marginBottom: '5px' }}>Energy-efficient and space-optimized designs</li>
                  <li>Aligned with SDG 6 and ESG compliance frameworks</li>
                </ul>
                
                <div className="mt-6">
                  <a href="/our-solutions" className="w-[40%] md:w-fit">
                    <HoverButton>
                      {(hovered) => (
                        <>
                          <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                          }} className="md:text-[10px] md:font-medium md:uppercase">
                            Explore Our Solutions
                          </span>
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
                  </a>
                </div>
              </div>
              {/* Right Column Text (Paragraphs and List) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                  width: "85%",
                }}
                className="hidden md:block md:px-0"
              >
                <p style={{ margin: 0, marginBottom: '10px' }}>
                  WAE's water treatment and reuse solutions are designed for long-term sustainability and compliance. From greywater reuse and effluent treatment to modular STPs and rainwater harvesting systems, our solutions help institutions close the water loop—reducing waste, conserving resources and achieving sustainability mandates.
                </p>
                
                <ul style={{
                  listStyleType: 'disc',
                  marginLeft: '20px',
                  marginTop: '10px',
                  marginBottom: '20px',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '5px' }}>Custom-built water reuse and recycling systems</li>
                  <li style={{ marginBottom: '5px' }}>Energy-efficient and space-optimized designs</li>
                  <li>Aligned with SDG 6 and ESG compliance frameworks</li>
                </ul>
                
                <div className="mt-6">
                  <a href="/our-solutions" className="w-[40%] md:w-fit">
                    <HoverButton>
                      {(hovered) => (
                        <>
                          <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                          }} className="md:text-[10px] md:font-medium md:uppercase">
                            Explore Our Solutions
                          </span>
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
                  </a>
                </div>
              </div>
            </div>

            {/* Section 4: We are disrupting the status quo */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-[10%] md:items-start">
              {/* Left Column Text (Title) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="md:hidden"
              >
                We are disrupting the status quo
              </div>
              {/* Left Column Text (Title) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "40px",
                  lineHeight: "110.00000000000001%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                className="hidden md:block md:px-0"
              >
                We are disrupting the status quo
              </div>

              {/* Right Column Text (Paragraphs) - Mobile Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                }}
                className="md:hidden"
              >
                <p className="mb-5">
                  We're not here to tweak old systems, we're here to transform them. Every product we build and every solution we implement is designed to challenge outdated practices and replace them with smarter, cleaner, and more sustainable alternatives.
                </p>
                <p>
                  This isn't evolution. It's disruption - rooted in purpose, engineered for impact, and driven by the belief that better water solutions can create a better world.
                </p>
              </div>
              {/* Right Column Text (Paragraphs) - Desktop Version */}
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: '#00000099',
                  width: "85%",
                }}
                className="hidden md:block md:px-0"
              >
                <p className="mb-5">
                  We're not here to tweak old systems, we're here to transform them. Every product we build and every solution we implement is designed to challenge outdated practices and replace them with smarter, cleaner, and more sustainable alternatives.
                </p>
                <p>
                  This isn't evolution. It's disruption - rooted in purpose, engineered for impact, and driven by the belief that better water solutions can create a better world.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CONNECT WITH US FORM */}
        <section className="hidden md:block px-[9.72%] pb-0">
            <ConnectWithUs introText="Explore how WAE can help your business or community turn wastewater into a resource." />
        </section>

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

       {/* Global Styles */}
      <style jsx global>{`
        html {
        }
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
    </main>
  )
}