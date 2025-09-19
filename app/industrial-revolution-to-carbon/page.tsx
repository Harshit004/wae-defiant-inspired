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
      <header ref={headerRef} className={`w-full bg-white relative z-10 hidden md:block`}>
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
                className="relative w-full overflow-hidden pt-0 md:mb-[140px]"
              >
                {/* Desktop: Background video (full width, natural height) */}
                <div className="w-full">
                  <video
                    src="/Industrial Revolution to the carbon age  2 (1).mp4"
                    className="hidden md:block w-full h-auto z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>

        {/* Article Section */}
<section className="w-full mb-[140px] px-[9.72%]">
  <div className="mx-auto">
    {/* Title spanning full width */}
    <h1 className="text-[40px] font-medium mb-6 leading-[120%] mb-[44px]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
    Industrial Revolution to the carbon age, how we got there?
    </h1>
    
    {/* Three column layout for content */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* First Column */}
      <div className="space-y-6 text-sm leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
        <div className="text-sm font-bold mb-[24px] leading-[130%] underline text-[#80808099]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          Aditi Sharma
        </div>
        
        <p>
        The story begins in the smoky heart of 18th-century England. Coal dust filled the air as the first every corner of the globe. What started as the Industrial Revolution an era of machines and mechanization quickly became something far more consequential: the dawn of the Carbon Age.
        </p>
        
        <p>
        In the early 1700s, the world relied on wood, water wheels, and manual labour. But by the mid-18th century, coal became the fuel of progress. In Britain alone, coal production rose from 3 million tons in 1750 to over 290 million tons by 1913. It powered factories, locomotives, steamships, and cities. By 1800, James Watt’s steam engine had revolutionized industry, allowing humans to extract and burn fossil fuels on an unprecedented scale.
        </p>
        
        <p>
        Yet, this technological leap came with an invisible cost one we wouldn’t fully grasp for nearly two centuries. Carbon dioxide (CO₂), a natural component of Earth’s atmosphere, began to accumulate. At the time, it was imperceptible. There were no satellites, no climate models, no atmospheric measurements. But the chemistry of coal combustion ensured that every ton burned was releasing CO₂ into the sky a silent alchemy with planetary consequences.
        </p>
        
        <p>
        The Second Industrial Revolution of the late 19th and early 20th centuries accelerated this trend. Oil and natural gas entered the scene. In 1900, global CO₂ emissions from fossil fuels were around 2 billion metric tons. By the 1950s, this had tripled. And then came the “Great Acceleration.” Between 1950 and 2020, humanity emitted more carbon than in all previous history combined. In 2022 alone, fossil fuel emissions reached an all-time high of 36.6 billion metric tons, according to the Global Carbon Project.
        </p>
      </div>
      
      {/* Second Column */}
      <div className="space-y-6 text-sm mt-[24px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
        
        <p>
        As energy systems globalized, so too did their impacts. The Keeling Curve—a simple graph of atmospheric CO₂ concentrations started in 1958 offered the first clear warning. From 315 parts per million (ppm) then, we now stand at 423 ppm in 2024, a level not seen in at least 800,000 years, confirmed through Antarctic ice core data. These numbers are not just abstract science. They translate into rising global temperatures, sea level rise, and ecological shifts.
        </p>

        <p>
        The Earth, once in equilibrium, is now in flux.
        </p>
        
        <p>
        Global average surface temperatures have increased by 1.2°C since pre-industrial levels, and if current emission trends continue, we are on track for 2.4–2.8°C of warming by 2100, well beyond the Paris Agreement's target of 1.5°C. Sea levels have risen by 23 cm since 1880, and satellite data show a current rate of about 3.3 mm per year, with acceleration expected as polar ice continues to melt.
        </p>
        
        <p>
        The consequences are visible across continents. The Arctic is warming four times faster than the rest of the world. Greenland alone is losing 270 billion tons of ice annually, contributing significantly to sea level rise. Glaciers are retreating from the Alps to the Andes. Wildfires have intensified: 2023 saw Canada experience its worst wildfire season on record, burning more than 18.5 million hectares. Meanwhile, floods in Pakistan in 2022 displaced over 33 million people, illustrating how climate events are growing in both frequency and ferocity.
        </p>
        
        <p>
        Climate is no longer a future concern it is a lived reality.
        </p>

        <p>
        But history doesn’t end in despair. Humanity is beginning to respond.
        </p>
        
      </div>
      
      {/* Third Column */}
      <div className="space-y-6 text-sm mt-[24px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
        <p>
        Renewable energy is scaling faster than ever before. Solar PV and wind together accounted for 12% of global electricity generation in 2023, with solar capacity alone growing by over 24% year-on-year. According to the International Energy Agency (IEA), renewables could supply almost 50% of global electricity by 2030 if current momentum continues. Electric vehicles (EVs) crossed the milestone of over 14 million global sales in 2023, nearly 20% of total car sales.
        </p>
        
        <p>
        Policies are shifting too. Over 90 countries have net-zero commitments. The EU’s Green Deal, India’s push for solar under the International Solar Alliance, and China’s carbon neutrality target by 2060 all signal a geopolitical reorientation toward sustainability.
        </p>
        
        <p>
        This era is a reckoning but also an opportunity.
        </p>

        <p>
        The same industrial engine that powered human progress now demands a reimagination. From grey infrastructure to green resilience, from extractive growth to circular economies, from fossil dependence to regenerative design this is the pivot point.
        </p>

        <p>
        We arrived here over centuries, powered by coal, oil, and ambition. But now, in this decisive decade, the path forward will depend on collective will, technological innovation, and ecological consciousness. Because while the Carbon Age has shaped the past 250 years, the next chapter will be written not in emissions but in solutions.
        </p>

        <p>
        And that story is just beginning.
        </p>
      </div>
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
            <div className="w-full md:w-[346px] mb-8 md:mb-0">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/471bde63-5514-44fd-67a7-d06a24417100/public"
                alt="Aditi Sharma"
                width={346}
                height={346}
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
              <div className="overflow-hidden mb-4 relative">
                <Image
                                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public"
                                  alt="From Kyoto to COP28"
                                  width={347}
                                  height={300}
                                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                />
                                <Image
                                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf4fc4f5-cfc3-4eb9-ac32-bac46f834a00/public"
                                  alt="From Kyoto to COP28 - Hover"
                                  width={347}
                                  height={300}
                                  className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change.
              </p>
            </div>
            
            {/* Article 2 */}
            <div className="group">
              <div className="overflow-hidden mb-4 relative">
                <Image
                                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public"
                                  alt="Climate Change in the Indian Subcontinent"
                                  width={347}
                                  height={300}
                                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                />
                                <Image
                                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4addca72-6f79-4c23-9c24-c400cd9b6a00/public"
                                  alt="Climate Change in the Indian Subcontinent - Hover"
                                  width={347}
                                  height={300}
                                  className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
              </p>
            </div>
            
            {/* Article 3 */}
            <div className="group">
              <div className="overflow-hidden mb-4 relative">
              <Image
                                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcd53b1-c103-4faf-bd00-29a04ff0ee00/public"
                                  alt="The Ozone Crisis: A Success Story in Environmental Cooperation"
                                  width={347}
                                  height={300}
                                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                />
                                <Image
                                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13245178-9299-4091-ebca-89c63b972600/public"
                                  alt="The Ozone Crisis: A Success Story in Environmental Cooperation - Hover"
                                  width={347}
                                  height={300}
                                  className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                The Ozone Crisis: A Success Story in Environmental Cooperation
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth.
              </p>
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