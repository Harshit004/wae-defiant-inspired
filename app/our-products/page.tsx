// THIS FILE IS DEPRECATED. Use /our-products2 instead. This file is no longer linked in navigation or routes.
"use client"

import type React from "react"
import type { FC } from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import Footer from "@/components/footer" // Assuming these components exist
import ConnectWithUs from "@/components/connect-with-us" // Assuming this component exists

// --- MOBILE HEADER COMPONENT (Copied from homepage3) ---
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
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fixed Mobile Header Bar (Visible only on small screens) */}
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-transparent md:hidden">
        {/* Mobile Logo */}
        <Link href="/homepage3">
          <Image
            src={isMobileMenuOpen
              ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
              : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce113ad4-0a6b-43dd-066c-26769520d000/public"
            }
            alt="WAE Logo Mobile"
            width={40}
            height={40}
          />
        </Link>
        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 relative z-50 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {/* Top bar */}
          <span
            className={`block absolute h-0.5 w-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-black' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)' }}
          ></span>
          {/* Bottom bar */}
          <span
            className={`block absolute h-0.5 w-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-black' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)' }}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay (Slides in from right) */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-[80px] px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: '#000' }}
      >
        <div className="w-full h-px bg-black/10 mt[8px] mb-[30px]" />
        {/* ORIGIN & OBJECTIVE ROW */}
        <div className="grid mb-4" style={{ gridTemplateColumns: '40% 60%' }}>
          <div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 12}}>ORIGIN</div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 14, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              20.5937° N<br />78.9629° E
            </div>
          </div>
          <div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 12}}>OBJECTIVE</div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 14, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              To lead the way in sustainability<br />ahead of the next
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-black/10 mb-2" />

        {/* INSIDE WAE SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase'}}>INSIDE WAE</div>
          </div>
          <div className="flex flex-col">
          {productsItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-normal py-2" style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 16, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              {item.text}
            </Link>
                <div className="w-full h-px bg-black/10" />
              </div>
          ))}
        </div>
        </div>
        <div className="w-full h-px bg-black/10 mt-[12px] mb-2" />

        {/* ETCETERA SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase'}}>ETCETERA</div>
          </div>
          <div className="flex flex-col">
          {blueprintItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-normal py-2" style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 16, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              {item.text}
            </Link>
                <div className="w-full h-px bg-black/10" />
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};
// --- END MOBILE HEADER COMPONENT ---


// Shared container class for consistent margins and max-width (Made responsive)
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


// Placeholder for product category data
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
      description: "Water coolers cum bubblers provide chilled water on demand. Built to be energy-efficient, they're ideal for public spaces, reducing both costs and plastic waste.",
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

  // Function to convert title to ID format
const titleToId = (title: string) => {
  const idMap: { [key: string]: string } = {
    "DRINKING WATER STATION - BLUWAE Series": "drinking-water-stations",
    "WATER DISPENSER (W/O RO) - TRUBLU Series": "water-dispenser",
    "DRINKING WATER FAUCETS - WATERMATIC Series": "drinking-water-faucets",
    "WATER COOLER & FOUNTAINS - ZVR Series": "water-cooler",
    "PUBLIC UTILITY SYSTEMS - PUS Series": "public-utility-systems",
    "COMMERCIAL/INDUSTRIAL PLANTS": "commercial-industrial-plants"
  };
  return idMap[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

export default function Home() {
  // State variables
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  // State for controlling tagline visibility on scroll (not used for this page's tagline directly)
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  // Variants for staggered animations using framer-motion (not directly used on this page)
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

  // Update tagline visibility based on scroll direction (retained for consistency with other pages)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update current time (India Time) every minute (retained for consistency)
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

  // Update header height on mount and resize (retained for consistency)
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
  const lineCount = Math.min(productsItems.length, blueprintItems.length) // Not directly used but retained

  return (
    <main className="relative pb-[40px]">
      {/* RENDER MOBILE HEADER COMPONENT HERE (only on small screens) */}
      <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />

      {/* DESKTOP HEADER (Hidden on small screens) */}
      <header ref={headerRef} className={`w-full relative z-10 hidden mb-5 md:block`}>
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
              <Link href="/homepage3">
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

        {/* Hero section - now starts directly after header with padding for content */}
        <section
            id="hero"
            className="relative w-full overflow-hidden h-screen pt-[70px] md:pt-[160px]"
        >
            {/* Image - positioned absolutely to be behind content */}
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/de750a02-1047-42f2-d7db-f10e559f4100/public"
                alt="Our Products Hero"
                fill
                className="object-cover -z-10"
            />

            {/* Text and image overlays - position relative to the padded area */}
            <div
                className="absolute hidden md:block"
                style={{
                    bottom: "30%",
                    right: "calc(3.473%)",
                    width: "393px",
                    height: "159px",
                }}
            >
                <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3785262c-3901-44fa-36ed-a4a936c6dc00/public"
                    alt="Sustainable products responsible solutions"
                    width={393}
                    height={159}
                    className="object-contain"
                />
            </div>

            {/* Our Products Text - Mobile Version */}
            <div
                className="absolute md:hidden"
                style={{
                    bottom: "10%",
                    left: "1rem",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "2rem",
                    lineHeight: "110%",
                    color: "#fff",
                }}
            >
                Our Products
            </div>

            {/* Our Products Text - Desktop Version */}
            <div
                className="absolute  hidden md:block"
                style={{
                    bottom: "33%",
                    left: "calc(4.16666%)",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "48px",
                    lineHeight: "110%",
                    color: "#fff",
                }}
            >
                Our Products
            </div>

            {/* Scroll for more Text - Mobile Version */}
            <div
                className="absolute uppercase md:hidden"
                style={{
                    bottom: "5%",
                    left: "1rem",
                    width: "104px",
                    height: "12px",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.625rem",
                    lineHeight: "100%",
                    color: "#fff",
                }}
            >
                Scroll for more ⤵︎
            </div>

            {/* Scroll for more Text - Desktop Version */}
            <div
                className="absolute uppercase hidden md:block"
                style={{
                    bottom: "30%",
                    left: "calc(4.16666%)",
                    width: "104px",
                    height: "12px",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "10px",
                    lineHeight: "100%",
                    color: "#fff",
                }}
            >
                Scroll for more ⤵︎
            </div>
        </section>

        {/* Our Products Heading (Moved below hero and adjusted margin) */}
      <div className={containerClass} style={{marginTop: "80px"}}>
        <h2 className="text-[32px] md:text-[48px] text-center md:text-left"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            // fontSize: "48px",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginBottom: "40px",
          }}
        >
          Our Products
        </h2>

        {/* NEW SECTION: Product Category Grid (Grid 1 after hero) */}
        {/* gap-y-[60px] already applies to mobile for grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[100px] gap-y-[60px] mb-[60px] md:mb-[180px] text-center md:text-left">
          {blogPosts.map((post, index) => (
            <div key={index}>
                {/* Heading with Link */}
              <Link className="text-[14px] md:text-[16px] block"
                href={`#${titleToId(post.title)}`}
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  // fontSize: "16px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  textTransform: "uppercase",
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {post.title}
              </Link>

              {/* Horizontal Rule */}
              <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                <hr style={{ border: "none", borderTop: "1px solid #00000033" }} />
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                {post.description}
              </p>
            </div>
          ))}
        </div>

        {/* Product Category Section (Grid 2 after hero - using Flexbox) */}
        <div>
          {/* IMPORTANT: Removed conflicting inline style and added mb-[60px] for mobile, md:mb-[180px] for desktop */}
          {/* The parent container uses space-y-[60px] to ensure internal children have gap,
              and each mapped item now has a responsive bottom margin for section separation. */}
          <div className="space-y-[60px] mb-20 sm:mb-0">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                id={titleToId(post.title)}
                // **UPDATED:** Added mb-[60px] for mobile, and md:mb-[180px] for desktop
                // The `space-y-[60px]` on the parent still handles the gap *between* the content inside each flex item (image and text block).
                // This `mb` handles the spacing between the *entire* product sections.
                className={`flex flex-col md:flex-row items-start md:space-y-0 md:space-x-8 justify-between
                           mb-[60px] md:mb-[180px]
                           ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}
                           ${index === blogPosts.length - 1 ? 'mb-0 md:mb-0' : ''} `} 
              >
                {/* Image */}
                <div className="w-full md:w-[320px] h-[320px] relative overflow-hidden group">
                  {index === 1 ? (
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
                <div className="flex-1 flex flex-col justify-between lg:max-w-[31%]" >
                  <div>
                    <h3 className="mt-[60px] md:mt-0"
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
                        lineHeight: "120%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        marginBottom: "40px",
                      }}
                    >
                      {post.description}
                    </p>
                  </div>
                  {/* Modified HoverButton href for internal anchor link */}
                   <HoverButton href={`/product-category/${titleToId(post.title)}`}>
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