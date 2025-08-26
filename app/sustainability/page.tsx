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
    { text: "Reimagine Work", href: "/careers" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ]
  const lineCount = Math.min(productsItems.length, blueprintItems.length) // Note: lineCount is calculated but not used

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

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative w-full overflow-hidden h-screen pt-[70px] md:pt-[160px] mb-[140px]"
      >
        {/* Desktop: Background video (cover, aspect ratio maintained) */}
        <video
          className="hidden md:block absolute inset-0 w-screen object-contain z-0"
          style={{objectFit: 'contain' }}
          src="/Sustainability.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

        {/* NEW SECTION: Hardcoded Rows in a Single Grid */}
        {/* The grid is applied to the inner div */}
        <div className={`${containerClass} `}> {/* Container for consistent horizontal padding and bottom margin */}

            {/* Fixed Center Logo Overlay */}
        <motion.div
          style={{
            position: "sticky",
            top: "9.72%",
            zIndex: 1100,
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
        </motion.div>

           {/* Single Grid Container for all rows */}
           {/* Defined columns for Heading and Description, and row gap */}
           <div style={{
               display: 'grid',
               gridTemplateColumns: '39.4% 25.86%', // Define column widths for heading and description
               justifyContent: 'space-between', // Puts space between the two columns
               rowGap: '250px', // Vertical space between rows
               alignItems: 'start', // Align items to the start of their grid area (top)
           }}>

               {/* Row 1 Elements */}
               {/* Heading 1 */}
               <div style={{
                   fontFamily: "'Inter Tight', sans-serif",
                   fontWeight: 500,
                   fontSize: "40px",
                   lineHeight: "110%",
                   letterSpacing: "0%",
               }}>
                   WE LIVE AND BREATH WATER
               </div>
               {/* Description 1 */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400, // Changed fontWeight to 400
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    color: '#00000099', // Applied color
                    // Add any unique styles for this description here
               }}>
                    <p className="mb-5">
                        At WAE, our dedication to safeguarding natural water resources is at the core of everything we do. For us, sustainability is not merely a target—it is a necessity and a shared duty. That’s why we engineer advanced solutions that maximize water utilization, minimize consumption, reduce emissions, and cut maintenance costs. It’s about leading the charge for transformative change and creating a better tomorrow.
                    </p>
                    <p className="mb-5">
                        For over a decade, WAE has been a trailblazer in sustainable water management. From concept and design to construction and management, we have pioneered every stage of development with a focus on water conservation. Our innovative approach enables us to stay ahead of the curve, adapting our solutions to meet the challenges of the future.
                    </p>
                    <p className="mb-5">
                        Our award-winning initiatives have empowered organizations in India and beyond to embrace sustainable alternatives, transitioning from plastic water jars to safe, efficient water solutions that comply with BIS 10500:2012 standards for drinking water.
                    </p>
               </div>

               {/* Row 2 Elements */}
               {/* Heading 1 */}
               <div className="mt-[-125px]" style={{
                   fontFamily: "'Inter Tight', sans-serif",
                   fontWeight: 500,
                   fontSize: "40px",
                   lineHeight: "110%",
                   letterSpacing: "0%",
               }}>
                   INNOVATIVE SOLUTIONS
               </div>
               {/* Description 1 */}
               <div className="mt-[-125px]" style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400, // Changed fontWeight to 400
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    color: '#00000099', // Applied color
                    // Add any unique styles for this description here
               }}>
                    <p className="mb-5">
                        WAE Drinking Water Stations, equipped with cutting-edge purification, chilling, and dispensing systems, deliver a seamless and sustainable hydration experience. They are the ultimate sustainable alternative to plastic water jars for corporates and institutions, offering unmatched reliability and eco-efficiency.
                    </p>
               </div>

               {/* Row 3 Elements */}
               {/* Heading 1 */}
               <div style={{
                   fontFamily: "'Inter Tight', sans-serif",
                   fontWeight: 500,
                   fontSize: "40px",
                   lineHeight: "110%",
                   letterSpacing: "0%",
               }}>
                   SUSTAINABILITY AT ITS CORE
               </div>
               {/* Description 1 */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400, // Changed fontWeight to 400
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    color: '#00000099', // Applied color
                    // Add any unique styles for this description here
               }}>
                    <p className="mb-5">
                        Eliminating plastic water jars not only curtails direct carbon emissions from production and disposal but also significantly reduces the carbon footprint from transportation and delivery logistics, making a significant environmental impact.
                    </p>
               </div>
               

                {/* Row 4 Elements */}
               {/* Heading 4 */}
               <div style={{
                   fontFamily: "'Inter Tight', sans-serif",
                   fontWeight: 500,
                   fontSize: "40px",
                   lineHeight: "110%",
                   letterSpacing: "0%",
               }}>
                   UNCOMPROMISED COMPLIANCE
               </div>
               {/* Description 4 - Complex Structure */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400, // Changed fontWeight to 400
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    color: '#00000099', // Applied color
                    // Add any unique styles for this description here
               }}>
                   {/* Paragraph 1 */}
                   <p style={{ margin: 0 }}>WAE Drinking Water Stations are engineered to meet the highest standards, adhering to NSF/ANSI 42, NSF/ANSI 53, NSF/ANSI 55, NSF/ANSI 58, NSF P231, and Article 9 of European Regulation (EC) 852/2004. This ensures our solutions deliver not just sustainability, but also top-tier quality and safety.</p>
               </div>

               {/* Row 5 Elements */}
               {/* Heading 5 */}
                <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                }}>
                    CHAMPIONING WATER STEWARDSHIP
                </div>
               {/* Description 5 - Complex Structure */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "110%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    {/* Paragraph 1 */}
                    <p>
                        In a world facing unprecedented resource challenges, WAE is dedicated to responsible water stewardship. Our innovative solutions are designed to harmonize with the principles of the circular economy, enabling us to play a vital role in the ongoing resource revolution. We believe that protecting and optimizing water resources is not just a business priority but a collective responsibility.
                    </p>
                </div>

               {/* Row 6 Elements */}
               {/* Heading 6 */}
                <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                }}>
                    ACHIEVING WATER NEUTRALITY
                </div>
               {/* Description 6 */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "100%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    Despite a worsening water crisis, more companies are drawing excessive amounts of water from natural sources. WAE is driving a movement towards water neutrality by helping organizations replace bottled water with sustainable hydration systems. This transition enables them to become water-positive, drastically reducing their water footprint and supporting global sustainability efforts.
                </div>

                {/* Row 7 Elements */}
               {/* Heading 7 */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                }}>
                    LEADING WATER RESTORATION EFFORTS
                </div>
               {/* Description 7 */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "100%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    By 2025, it is anticipated that around 2 billion people will face severe water scarcity, with over half of the global population living under conditions of water stress. WAE’s Water Restoration Program equips businesses with innovative and sustainable solutions designed to mitigate their water impact. Through forward-thinking practices, we work to restore equilibrium to vital water resources and build resilience for the future.
                </div>

                {/* Row 8 Elements */}
               {/* Heading 8 */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                }}>
                    EMBRACING SUSTAINABLE RESPONSIBILITY
                </div>
               {/* Description 8 */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "100%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    The future demands that businesses and institutions step up to the challenge of sustainable growth. WAE embraces this responsibility by aligning our efforts with the Sustainable Development Goals (SDGs), fostering a leadership mindset that integrates economic growth with long-term water management solutions.
                </div>

           </div> {/* End Single Grid Container */}

        </div>

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