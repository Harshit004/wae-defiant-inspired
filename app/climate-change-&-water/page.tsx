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
                className="relative w-full overflow-hidden h-[713px] pt-[70px] md:pt-[160px] mb-[140px]"
              >
                {/* Desktop: Background video (cover, aspect ratio maintained) */}
                <img
                  src="/office_VAR_Lineart (1) 1.png"
                  alt="Climate Change & Water"
                  className="hidden md:block absolute inset-0 w-full h-full object-contain z-0"
                  style={{ objectFit: 'contain' }}
                />
              </section>

        {/* Article Section */}
        <section className="w-full mb-[140px] px-[9.72%]">
          <div className="mx-auto">
            <h1 className="text-[40px] font-medium mb-6 leading-[120%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
              From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
            </h1>
            
            <div className="text-sm font-bold mb-[44px] leading-[130%] text-decoration: underline text-[#80808099]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Aditi Sharma
            </div>
            
            <div className="space-y-6 text-sm leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
              <p>
                In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change. What followed was a turbulent yet determined journey, a series of historic global agreements that would shape the planet's climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline—it's the story of how humanity has tried, failed, and continued to try again in its battle against a warming world.
              </p>
              
              <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                The Dawn: Kyoto Protocol—the First Global Climate Commitment
              </h2>
              
              <p>
                The Kyoto Protocol, adopted in December 1997 and entered into force in 2005, was the first legally binding climate treaty. It asked industrialized nations—primarily responsible for historical emissions—to reduce greenhouse gases by an average of 5% below 1990 levels between 2008 and 2012. It was revolutionary. It introduced market-based mechanisms like the Clean Development Mechanism (CDM) and carbon trading—trying to make sustainability economically viable.
              </p>
              
              <p className="mt-3">
                But Kyoto had its flaws. While the EU and Japan took it seriously, the U.S.—one of the largest emitters—never ratified it. And developing countries, including China and India, had no binding targets, sparking criticism and limiting its global effectiveness. Still, Kyoto was a vital first step. It created a legal architecture and introduced the concept of accountability in climate policy.
              </p>
              
              <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Transition & Tension: From Kyoto to Paris
              </h2>
              
              <p>
                Post-Kyoto, the world grew more complex. Global emissions soared. China became the world's largest emitter. The global financial crisis diverted attention. Yet, scientific consensus deepened—IPCC reports warned of rising sea levels, glacial melt, extreme weather.
              </p>
              
              <p className="mt-3">
                Copenhagen's COP15 in 2009 was a diplomatic heartbreak. Expectations were sky-high, but no binding treaty emerged. However, it sowed seeds for future frameworks, like voluntary commitments and climate finance.
              </p>
              
              <p className="mt-3">
                Finally, in 2015, the Paris Agreement was born at COP21. Unlike Kyoto, it brought both developed and developing nations under a single framework, aiming to limit global warming to "well below 2°C"—ideally 1.5°C. The Paris Agreement wasn't legally binding in terms of emission targets, but it required countries to submit Nationally Determined Contributions (NDCs), which would be reviewed every five years for ambition and progress.
              </p>
              
              <p className="mt-3">
                It was less about enforcement, more about transparency and global peer pressure.
              </p>
              
              <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                The Present Storm: COP28 and the Crossroads of Climate Policy
              </h2>
              
              <p>
                Enter COP28, held in Dubai, UAE in 2023—a moment heavy with contradictions and expectations. Hosted by an oil-producing nation, led by Sultan Al Jaber, the summit faced scepticism but turned heads with a historic milestone: the first ever mention of "transitioning away from fossil fuels" in an official agreement.
              </p>
              
              <p className="mt-3">
                COP28 brought the first Global Stocktake—a comprehensive review of where the world stands since Paris. The results? Stark.
              </p>
              
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>The world is not on track to meet 1.5°C.</li>
                <li>Emissions must peak before 2025 and fall by 43% by 2030 to stay on course.</li>
                <li>Adaptation financing is lagging, and loss-and-damage funding is still too slow.</li>
              </ul>

              <p className="mt-3">
              Key agreements included:
              </p>
              
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>A Loss and Damage Fund finally operationalized, with pledges of over $700 million to support vulnerable countries.</li>
                <li>A push for tripling renewable energy capacity by 2030.</li>
                <li>Recognition of the need to phase out unabated fossil fuels   although language remained ambiguous under pressure from oil-rich nations.</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Scientific Backdrop & Climate Reality
              </h2>
              
              <p>
              Let’s not forget the data.
              </p>
              
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>The planet has already warmed by about 1.1°C since pre-industrial times.</li>
                <li>The 2020s are set to be the hottest decade on record, with 2023 likely becoming the hottest year.</li>
                <li>The Arctic is warming nearly four times faster than the global average.</li>
                <li>Sea levels have risen by about 21–24 cm since 1880.</li>
                <li>Climate-related disasters have increased fivefold over the past 50 years, according to WMO.</li>
              </ul>

              <p className="mt-3">
              The science is unrelenting. We are running out of time, and the carbon budget for 1.5°C could be exhausted before 2030 if current trends continue.
              </p>

            </div>
          </div>
        </section>
    
      {/* Know Our Writer SECTION */}
      <section className="w-full mb-[140px] px-[9.72%]">
        <div className="mx-auto">
          <h2 className="mb-12" style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '110.00000000000001%',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}>
            Know Our Writer
          </h2>
          
          <div className="flex flex-col justify-between md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-[16.458%] mb-8 md:mb-0">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e4057d23-d562-4bdd-267f-2f1239d56200/public"
                alt="Aditi Sharma"
                width={236}
                height={236}
                className="w-full h-auto grayscale"
              />
            </div>
            
            {/* Right side - Content */}
            <div className="w-full md:w-[70%] md:ml-[60px]">
              <h3 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '140%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Aditi Sharma
              </h3>
              
              <p  style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '120%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                marginBottom: '40px',
              }}>
                Climate Change and Water
              </p>
              
              <p className="mt-[40px] text-[#00000099]" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '17px',
                lineHeight: '120%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                margin: 0
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
              </p>
              
              <a href="#" className="inline-block mt-[40px]" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '120%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline',
                color: 'inherit'
              }}>
                View Profile ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles SECTION */}
      <section className="w-full mb-[140px] px-[9.72%]">
        <div className="mx-auto">
          <h2 className="mb-12" style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '110.00000000000001%',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}>
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public"
                  alt="From Kyoto to COP28"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change.
              </p>
              <a href="/climate-change-&-water" className="text-sm font-medium underline" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Read more</a>
            </div>
            
            {/* Article 2 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public"
                  alt="Climate Change in the Indian Subcontinent"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
              </p>
              <a href="#" className="text-sm font-medium underline" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Read more</a>
            </div>
            
            {/* Article 3 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public"
                  alt="The Ozone Crisis"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                The Ozone Crisis: A Success Story in Environmental Cooperation
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth.
              </p>
              <a href="#" className="text-sm font-medium underline" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Read more</a>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories SECTION */}
      <section className="w-full mb-[140px] px-[9.72%]">
        <div className="mx-auto">
          <h2 className="mb-12" style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '110.00000000000001%',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}>
            Explore Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/abe4e4d0-cb21-4428-8d27-62ac59c62800/public"
                  alt="Water Conservation"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-5" style={{ height: '60px' }}></div>
              <p className="mb-5" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline'
              }}>
                Aditi Sharma
              </p>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                WATER CONSERVATION
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.</p>
            </div>
            
            {/* Category 2 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3082e23f-7ee0-47d0-338d-9d63943d0800/public"
                  alt="Policy"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-5" style={{ height: '60px' }}></div>
              <p className="mb-5" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline'
              }}>
                Aditi Sharma
              </p>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                POLICY
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.</p>
            </div>
            
            {/* Category 3 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/676e5a42-3d4b-4a29-facb-900980415000/public"
                  alt="Climate Change And Water"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-5" style={{ height: '60px' }}></div>
              <p className="mb-5" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline'
              }}>
                Aditi Sharma
              </p>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                CLIMATE CHANGE AND WATER
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.</p>
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