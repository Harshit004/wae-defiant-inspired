"use client"

import type React, { FC } from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion" // motion is still needed for the icon animation in the HoverButton definition itself
import { useInView } from "react-intersection-observer"
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
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/afe31ab4-047a-42d2-84b5-5aad6f2cef00/public"
            alt="Water reuse"
             width={1440} // Adjusted width for better fit if max-width is 1440px
             height={656} // Height from original image usage
            className="object-cover w-full h-full" // Use h-full to fill the 100vh section
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
            Water Reuse
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
        {/* This section will appear after the hero (thanks to hero's mb-[140px]) */}
        {/* The grid is applied to the inner div */}
        <div className={`${containerClass} mb-[140px]`}> {/* Container for consistent horizontal padding and bottom margin */}

           {/* Single Grid Container for all rows */}
           {/* Defined columns for Heading and Description, and row gap */}
           <div style={{
               display: 'grid',
               gridTemplateColumns: '31.8% 27.78%', // Define column widths for heading and description
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
                   Why Does Water Reuse Matters?
               </div>
               {/* Description 1 */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400, // Changed fontWeight to 400
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: '#00000099', // Applied color
                    // Add any unique styles for this description here
               }}>
                    Water reuse reduces the strain on freshwater sources, lowers environmental impact, and ensures a sustainable water future. WAE provides cutting-edge, reliable, and efficient solutions for grey water, sewage water, and effluent treatment to help industries, cities, and communities thrive sustainably.
               </div>

                {/* Row 2 Elements */}
               {/* Heading 2 */}
               <div style={{
                   fontFamily: "'Inter Tight', sans-serif",
                   fontWeight: 500,
                   fontSize: "40px",
                   lineHeight: "110%",
                   letterSpacing: "0%",
               }}>
                   Grey Water Reuse
               </div>
               {/* Description 2 - Complex Structure */}
               <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400, // Changed fontWeight to 400
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: '#00000099', // Applied color
                    // Add any unique styles for this description here
               }}>
                   {/* Paragraph 1 */}
                   <p style={{ margin: 0 }}>Our approach integrates advanced technology with ecological principles, focusing on resource efficiency and circular systems.</p>
                   {/* Paragraph 2 */}
                   <p style={{ marginTop: '1em' }}>We tailor solutions to local needs, ensuring both environmental benefits and economic viability for our partners.</p>
                   {/* Key Benefits Heading */}
                   <div style={{
                       fontFamily: "'Inter Tight', sans-serif",
                       fontWeight: 700, // Bold fontWeight
                       fontSize: "12px", // Same size as description text
                       lineHeight: "100%",
                       letterSpacing: "0%",
                       color: '#00000099', // Using black for the heading as per request
                       marginTop: '20px' // Space above heading
                    }}>
                       Key Benefits:
                   </div>
                   {/* Bullet Points */}
                   <ul style={{
                       listStyleType: 'disc',
                       marginLeft: '20px', // Indent list
                       marginTop: '10px', // Space above list
                       padding: 0 // Remove default ul padding if any
                       }}>
                       <li style={{ marginBottom: '5px' }}>Reduced strain on freshwater sources</li> {/* Placeholder content */}
                       <li style={{ marginBottom: '5px' }}>Lower environmental impact</li> {/* Placeholder content */}
                       <li style={{ marginBottom: '5px' }}>Enhanced water security</li> {/* Placeholder content */}
                       <li>Support for sustainable urban development</li> {/* Placeholder content */}
                   </ul>
                   {/* 60px Gap */}
                   <div style={{ marginBottom: '60px' }}></div>
                   {/* Know More Button - REMOVED as requested */}
                   {/* <HoverButton href="#"> */}
                   {/* {(hovered) => ( */}
                   {/* <> */}
                   {/* Know More */}
                   {/* <div className="relative inline-block w-4 h-4"> */}
                   {/* <Image */}
                   {/* src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public" */}
                   {/* alt="icon default" */}
                   {/* width={16} */}
                   {/* height={16} */}
                   {/* /> */}
                   {/* <motion.div */}
                   {/* initial={{ opacity: 0 }} */}
                   {/* animate={{ opacity: hovered ? 1 : 0 }} */}
                   {/* transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }} */}
                   {/* className="absolute top-0 left-0" */}
                   {/* > */}
                   {/* <Image */}
                   {/* src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public" */}
                   {/* alt="icon hover" */}
                   {/* width={16} */}
                   {/* height={16} */}
                   {/* /> */}
                   {/* </motion.div> */}
                   {/* </div> */}
                   {/* </> */}
                   {/* )} */}
                   {/* </HoverButton> */}
               </div>

               {/* Row 3 Elements */}
               {/* Heading 3 */}
                <div style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                }}>
                    Sewage Water Reuse
                </div>
               {/* Description 3 - Complex Structure */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "100%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    {/* Paragraph 1 */}
                    <p style={{ margin: 0 }}>We leverage state-of-the-art filtration, biological treatment, and monitoring systems.</p>
                    {/* Paragraph 2 */}
                    <p style={{ marginTop: '1em' }}>Our proprietary processes ensure high water recovery rates and pollutant removal, setting new benchmarks in water treatment efficiency.</p>
                     {/* Key Benefits Heading */}
                    <div style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 700, // Bold fontWeight
                        fontSize: "12px", // Same size as description text
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: '#00000099', // Using black for the heading
                        marginTop: '20px' // Space above heading
                     }}>
                        Key Benefits:
                    </div>
                    {/* Bullet Points */}
                    <ul style={{
                        listStyleType: 'disc',
                        marginLeft: '20px', // Indent list
                        marginTop: '10px', // Space above list
                        padding: 0 // Remove default ul padding if any
                        }}>
                        <li style={{ marginBottom: '5px' }}>Advanced pollutant removal</li> {/* Placeholder content */}
                        <li style={{ marginBottom: '5px' }}>High water recovery rates</li> {/* Placeholder content */}
                        <li style={{ marginBottom: '5px' }}>Compliance with strict standards</li> {/* Placeholder content */}
                        <li>Reduced reliance on external water sources</li> {/* Placeholder content */}
                    </ul>
                    {/* 60px Gap */}
                    <div style={{ marginBottom: '60px' }}></div>
                    {/* Know More Button - REMOVED as requested */}
                    {/* <HoverButton href="#"> */}
                    {/* {(hovered) => ( */}
                    {/* <> */}
                    {/* Know More */}
                    {/* <div className="relative inline-block w-4 h-4"> */}
                    {/* <Image */}
                    {/* src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public" */}
                    {/* alt="icon default" */}
                    {/* width={16} */}
                    {/* height={16} */}
                    {/* /> */}
                    {/* <motion.div */}
                    {/* initial={{ opacity: 0 }} */}
                    {/* animate={{ opacity: hovered ? 1 : 0 }} */}
                    {/* transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }} */}
                    {/* className="absolute top-0 left-0" */}
                    {/* > */}
                    {/* <Image */}
                    {/* src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public" */}
                    {/* alt="icon hover" */}
                    {/* width={16} */}
                    {/* height={16} */}
                    {/* /> */}
                    {/* </motion.div> */}
                    {/* </div> */}
                    {/* </> */}
                    {/* )} */}
                    {/* </HoverButton> */}
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
                    Effluent Treatment Services
                </div>
               {/* Description 4 - Complex Structure */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "100%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    {/* Paragraph 1 */}
                    <p style={{ margin: 0 }}>Beyond industrial applications, we work with municipalities and communities.</p>
                    {/* Paragraph 2 */}
                    <p style={{ marginTop: '1em' }}>To implement accessible and affordable water reuse systems, promoting public health and water security for all.</p>
                     {/* Key Benefits Heading */}
                    <div style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 700, // Bold fontWeight
                        fontSize: "12px", // Same size as description text
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: '#00000099', // Using black for the heading
                        marginTop: '20px' // Space above heading
                     }}>
                        Key Benefits:
                    </div>
                    {/* Bullet Points */}
                    <ul style={{
                        listStyleType: 'disc',
                        marginLeft: '20px', // Indent list
                        marginTop: '10px', // Space above list
                        padding: 0 // Remove default ul padding if any
                        }}>
                        <li style={{ marginBottom: '5px' }}>Customized solutions for industries</li> {/* Placeholder content */}
                        <li style={{ marginBottom: '5px' }}>Compliance with environmental regulations</li> {/* Placeholder content */}
                        <li style={{ marginBottom: '5px' }}>Cost-effective treatment processes</li> {/* Placeholder content */}
                        <li>Support for circular economy principles</li> {/* Placeholder content */}
                    </ul>
                    {/* 60px Gap */}
                    <div style={{ marginBottom: '60px' }}></div>
                     {/* Know More Button - REMOVED as requested */}
                    {/* <HoverButton href="#"> */}
                    {/* {(hovered) => ( */}
                    {/* <> */}
                    {/* Know More */}
                    {/* <div className="relative inline-block w-4 h-4"> */}
                    {/* <Image */}
                    {/* src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public" */}
                    {/* alt="icon default" */}
                    {/* width={16} */}
                    {/* height={16} */}
                    {/* /> */}
                    {/* <motion.div */}
                    {/* initial={{ opacity: 0 }} */}
                    {/* animate={{ opacity: hovered ? 1 : 0 }} */}
                    {/* transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }} */}
                    {/* className="absolute top-0 left-0" */}
                    {/* > */}
                    {/* <Image */}
                    {/* src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public" */}
                    {/* alt="icon hover" */}
                    {/* width={16} */}
                    {/* height={16} */}
                    {/* /> */}
                    {/* </motion.div> */}
                    {/* </div> */}
                    {/* </> */}
                    {/* )} */}
                    {/* </HoverButton> */}
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
                    Connect With Us
                </div>
               {/* Description 5 */}
                <div style={{
                     fontFamily: "'Inter Tight', sans-serif",
                     fontWeight: 400, // Changed fontWeight to 400
                     fontSize: "12px",
                     lineHeight: "100%",
                     letterSpacing: "0%",
                     color: '#00000099', // Applied color
                     // Add any unique styles for this description here
                 }}>
                    Whether you're looking to implement grey water reuse, treat sewage, or manage industrial effluents. WAE's expert team is ready to guide you. Fill out the form below, and let's build a sustainable water future together.
                </div>

           </div> {/* End Single Grid Container */}

        </div>

        {/* CONNECT WITH US FORM */}
        <section className=" px-[9.72%] pb-0">
            <ConnectWithUs />
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