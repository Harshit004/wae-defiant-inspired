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
                  fontSize: "12px",
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
                      fontSize: "12px",
                      lineHeight: "100%",
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
          className="relative h-screen w-full overflow-hidden mb-[140px]" // Hero has margin-bottom
        >
           {/* Reverted to Image as in the provided code */}
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f20bec4f-1a7e-4f0d-64d0-715b99d6ed00/public"
            alt="The Activist Co."
             width={1440} // Adjusted width for better fit if max-width is 1440px
             height={656} // Height from original image usage
            className="object-cover w-full max-h-[656px]" // Use h-full to fill the 100vh section
          />

          {/* Text and image overlays remain absolute within the hero */}
          <div
            className="absolute"
            style={{
              bottom: "30%",
              right: "calc(3.473%)", // Adjust right position based on container padding
              width: "393px",
              height: "159px",
            }}
          >
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
              alt="Innovation meets design"
              width={393}
              height={159}
              className="object-contain"
            />
          </div>
          <div
            className="absolute"
            style={{
              bottom: "33%",
              left: "calc(4.16666%)", // Adjust left position based on container padding
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "48px",
              lineHeight: "110%",
              color: "#fff",
            }}
          >
            The Activist Co.
          </div>
          <div
            className="absolute uppercase"
            style={{
              bottom: "30%",
              left: "calc(4.16666%)", // Adjust left position based on container padding
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

        {/* NEW SECTION: Hardcoded Rows in a Single Grid */}
        {/* The grid is applied to the inner div */}
        <div className={`${containerClass} mb-[140px]`}> {/* Container for consistent horizontal padding and bottom margin */}

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
               gridTemplateColumns: '31.8% 32%', // Define column widths for heading and description
               justifyContent: 'space-between', // Puts space between the two columns
               rowGap: '280px', // Vertical space between rows
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
                   WAE: The Activist That Purifies Water… and Purpose
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
                      WAE is more than a water solutions company - it’s an activist in action. 
                      Every drop we treat, every system we build, is driven by a commitment to a 
                      sustainable future. We help organizations do more than just comply; we help 
                      them contribute. Through smart water reuse and advanced treatment 
                      technologies, WAE enables businesses to make measurable progress on 
                      their environmental goals and become champions of the planet they 
                      operate on.
                    </p>
               </div>

               {/* Row 2 Elements */}
               {/* Heading 1 */}
               <div style={{
                   fontFamily: "'Inter Tight', sans-serif",
                   fontWeight: 500,
                   fontSize: "40px",
                   lineHeight: "110%",
                   letterSpacing: "0%",
               }}>
                   The Activist Outcomes of WAE
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
                    At WAE, activism isn’t a statement — it’s a system. 
                    We’ve eliminated over <b className="text-black">5.7 million kilograms of CO₂e emissions,</b> kept 
                    900,000 plastic water jars out of circulation, and conserved more than <b className="text-black">92 
                    million litres of water.</b> Not in theory. In buildings, campuses, and industries 
                    that chose action over applause.
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
                   Sustainability that’s Backed by the Best
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
                    Organizations like <b className="text-black">Google, Microsoft, ICICI, and Morgan Stanley</b> didn’t hire 
                    WAE for a slogan. They partnered with us to engineer measurable change. 
                    Across BFSI, IT, and tech sectors, our systems turn infrastructure into 
                    advocacy — proving that when sustainability is built in, impact follows 
                    naturally.
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
                   Banking on a Better Tomorrow: Impact in the BFSI Sector
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
                   <p style={{ margin: 0 }}>In banking, trust is currency — and sustainability is the new gold standard. 
                    WAE has helped leading BFSI institutions like <b className="text-black">ICICI and Morgan Stanley </b> 
                    replace single-use systems with long-term water solutions. From corporate 
                    campuses to data centers, we’ve enabled banks to meet ESG goals, reduce 
                    operational waste, and lead by clean example.</p>
                   
                   {/* 60px Gap */}
                   <div style={{ marginBottom: '60px' }}></div>
                   {/* Know More Button */}
                   <a href="/sustainability-bfsi" style={{ textDecoration: 'none' }}>
                    <HoverButton>
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
                   </a>
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
                    Smart Water for Smart Tech: Impact in the IT Sector
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
                    <p>In the tech world, efficiency is everything. That includes water. 
                        WAE works with giants like <b className="text-black">Google and Microsoft</b> to install intelligent reuse 
                        and treatment systems that support sprawling campuses while slashing 
                        resource consumption. In a sector where scale matters, WAE ensures that 
                        growth and green can go hand in hand.
                    </p>
                    {/* 60px Gap */}
                    <div style={{ marginBottom: '60px' }}></div>
                    {/* Know More Button */}
                    <a href="/sustainability-it" style={{ textDecoration: 'none' }}>
                    <HoverButton>
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
                   </a>
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
                    Achieve your sustainable goals!
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
                    At WAE, we don’t just build water solutions. We build proof of impact, of intention, of leadership. Whether you're in finance, technology, infrastructure, or beyond, our systems are designed to help you eliminate waste, conserve water, and achieve your sustainability goals in ways the world can measure.
                </div>

           </div> {/* End Single Grid Container */}

        </div>

        {/* CONNECT WITH US FORM */}
        <section className=" px-[9.72%] pb-0">
            <ConnectWithUs introText="Explore how WAE can help your business or community turn wastewater into a resource." />
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