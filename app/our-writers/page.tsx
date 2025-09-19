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
      <header ref={headerRef} className={`w-full mb-20 relative z-10 hidden md:block`}>
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

      {/* Meet Our Writers Header Section */}
      <section className="mb-25">
        <div className={containerClass}>
          <div className="text-center">
            {/* Main Title */}
            <h1 
              className="mb-10"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "48px",
                lineHeight: "110%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              Meet Our Writers
            </h1>
            
            {/* Description Text */}
            <p 
              className="max-w-4xl mx-auto mb-[100px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "130%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed aliquam nulla. Aliquam tempor eget dolor non mattis. Vestibulum cursus augue sem, eget pellentesque elit volutpat id. Maecenas eu convallis ipsum. Nam ut sapien dapibus urna cursus vulputate in nec diam. Donec massa ante, mattis quis quam et, condimentum luctus diam. Sed finibus posuere urna nec ullamcorper.
            </p>
          </div>
        </div>
      </section>

      {/* Writer's Grid */}
            <section className="mb-20">
              <div className={containerClass}>
                <div className="grid grid-cols-3 gap-x-[4.166%] mb-[100px]">
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
                    <Link href="/aditi-sharma">
                      <span
                        className="cursor-pointer"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "130%",
                        }}
                      >
                        <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
                      </span>
                    </Link>
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
                    <Link href="/rehnuma-ansari">
                      <span
                        className="cursor-pointer"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "130%",
                        }}
                      >
                        <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
                      </span>
                    </Link>
                  </div>
      
                  {/* Writer 3 - SHAMBHAVI */}
                  <div className="text-left">
                    <div className="relative w-[347px] h-[346px] mb-8">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8e2eac37-95f7-42d4-1c31-01daf5d4ab00/public"
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
                    <Link href="/shambhavi">
                      <span
                        className="cursor-pointer"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "130%",
                        }}
                      >
                        <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-[4.166%] mb-[60px]">
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
                    <Link href="/aditi-sharma">
                      <span
                        className="cursor-pointer"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "130%",
                        }}
                      >
                        <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
                      </span>
                    </Link>
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
                    <Link href="/rehnuma-ansari">
                      <span
                        className="cursor-pointer"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "130%",
                        }}
                      >
                        <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
                      </span>
                    </Link>
                  </div>
      
                  {/* Writer 3 - SHAMBHAVI */}
                  <div className="text-left">
                    <div className="relative w-[347px] h-[346px] mb-8">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8e2eac37-95f7-42d4-1c31-01daf5d4ab00/public"
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
                    <Link href="/shambhavi">
                      <span
                        className="cursor-pointer"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "130%",
                        }}
                      >
                        <span style={{ textDecoration: "underline" }}>View Profile</span> ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
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