"use client"

import React, { useEffect, useState, useRef } from "react" // Corrected import
import type { FC } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion" // Imported AnimatePresence
import { useInView } from "react-intersection-observer"
import Footer from "@/components/footer"
import Link from "next/link"

// Shared container class for consistent margins
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

  // Use a simple anchor tag if it's an internal page link, Link component for Next.js routes
  return href ? (
      href.startsWith('#') ? ( // Check if it's an anchor link
        <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
      ) : ( // Assume it's a Next.js route link
        <Link href={href} className="contents">{buttonContent}</Link>
      )
    ) : buttonContent;
};


// Data for the main solutions categories, now with sub-sections for accordions
const mainSolutionItems = [
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/16ca1b89-cf24-442f-0a41-3e3ad0c6cf00/public",
      title: "WATER REUSE",
      // main description removed from here based on screenshot
      subSections: [
        { title: "GREY WATER REUSE", content: "WAE's grey water reuse systems capture lightly used water from showers, sinks, and laundry, and treat it for reuse in non-potable applications like toilet flushing, cooling, and landscaping. It's a smart, cost-effective way for organizations to reduce water demand and improve operational sustainability without compromise." },
        { title: "SEWAGE WATER", content: "Dummy content for Sewage Water: Advanced biological and chemical processes are employed to treat sewage, making it safe for industrial applications, agricultural irrigation, or discharge." },
        { title: "EFFLUENT TREATMENT", content: "Dummy content for Effluent Treatment: Our solutions handle industrial and commercial effluent, removing pollutants to meet discharge standards or enable reuse within the facility." },
      ],
      buttonLink: "/solutions/water-reuse-details" // Specific page for this solution
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c399819d-976c-49aa-332f-02a9db708200/public",
      title: "WATER TREATMENT",
      // main description removed from here based on screenshot
      subSections: [
        { title: "PRIMARY TREATMENT", content: "Dummy content for Primary Treatment: Initial physical separation of solids and floating materials from raw water using screens and sedimentation." },
        { title: "SECONDARY TREATMENT", content: "Dummy content for Secondary Treatment: Biological processes to remove dissolved and suspended organic matter, typically involving aeration and microbial activity." },
        { title: "PURIFICATION", content: "Dummy content for Purification: Advanced filtration (e.g., RO, UV) and disinfection steps to ensure water meets specific quality standards for various applications." },
      ],
      buttonLink: "/solutions/water-treatment-details"
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f492758-88ca-4c25-4a00-1a122cd22200/public",
      title: "WATER AS A SERVICE",
      // main description removed from here based on screenshot
      subSections: [ // Reusing the same sub-sections as Water Reuse for dummy purposes as requested
        { title: "ECO-FRIENDLY DISPENSERS", content: "Dummy content for Eco-Friendly Dispensers: Our water dispensers are designed for minimal environmental impact, reducing plastic bottle waste." },
        { title: "INTEGRATED PURIFICATION", content: "Dummy content for Integrated Purification: Each dispenser includes multi-stage purification, ensuring on-demand access to clean and safe drinking water." },
        { title: "SUSTAINABLE SUBSCRIPTIONS", content: "Dummy content for Sustainable Subscriptions: Flexible service plans that simplify access to purified water, promoting long-term sustainability for businesses and homes." },
      ],
      buttonLink: "/solutions/water-as-a-service-details"
    },
  ];


// Data source for the category grid (kept separate as requested)
const solutionCategories = [
  {
    title: "Water Conservation",
    description: "Discover innovative solutions for reducing water consumption and promoting sustainable usage across industries."
  },
  {
    title: "Advanced Filtration",
    description: "Explore our cutting-edge filtration technologies that ensure superior water purity for all applications."
  },
  {
    title: "Smart Water Management",
    description: "Implement intelligent systems for real-time monitoring and optimized control of your water infrastructure."
  },
];


  // Helper function to create a URL-friendly slug from a title
const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

// Modified Accordion Item Component (no content, just title and click handler)
interface AccordionTitleProps {
  title: string;
  isActive: boolean; // Renamed from isOpen to isActive for clarity
  onClick: () => void; // Renamed from setIsOpen to onClick for clarity
}

const AccordionTitle: FC<AccordionTitleProps> = ({ title, isActive, onClick }) => {
  return (
    <>
        <button
            className="w-full text-left py-4"
            onClick={onClick}
            style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700, // Make title bold
                fontSize: "12px",
                lineHeight: "140%",
                letterSpacing: "0%",
                textTransform: "uppercase",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
                color: "#000",
            }}
        >
            {title}
        </button>
        {/* Horizontal rule only if NOT active/expanded */}
        {!isActive && (
            <div style={{ paddingBottom: "12px" }}>
                <hr style={{ border: "none", borderTop: "1px solid #D9D9DC" }} />
            </div>
        )}
    </>
  );
};


export default function Home() {
  // State variables (cleaned up unused ones)
  const [currentTime, setCurrentTime] = useState("")
  const headerRef = useRef<HTMLDivElement>(null)

  // State for controlling tagline visibility on scroll
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  // State to manage which sub-accordion is open for each main solution item
  // Map<mainItemIndex, subItemIndex>
  const [openSubAccordions, setOpenSubAccordions] = useState<Map<number, number>>(new Map());

  // Update tagline visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  return (
    <main className="relative pb-[40px]">
      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header ref={headerRef} className="w-full relative z-10 mb-0">
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
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

        {/* Our SOLUTIONS Heading */}
      <div className={containerClass} style={{marginTop: "120px"}}>
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "48px",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginBottom: "40px",
          }}
        >
          Our Solutions
        </h2>

        {/* Solution Category Grid - Uses solutionCategories */}
        <div className="grid grid-cols-3 gap-x-[80px] gap-y-[60px] mb-[180px]">
          {solutionCategories.map((category, index) => (
            <div key={index}>
                {/* Heading with Link */}
              <a href={`#${slugify(category.title)}`} // Anchor link to the product section
                 style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  textTransform: "uppercase",
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                 }}
              >
                {category.title}
              </a>

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
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main Solutions Category Section - Now matching screenshot layout */}
        <div>
          <div className="space-y-8">
            {mainSolutionItems.map((item, mainIndex) => (
              <div
                key={mainIndex}
                id={slugify(item.title)} // Added ID here for anchor linking
                className={`flex items-start space-x-8 justify-between ${mainIndex % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                style={{ marginBottom: mainIndex < mainSolutionItems.length - 1 ? '180px' : '0' }}
              >
                {/* Main Solution Title (left side) and Image (left side) */}
                <div className="flex flex-col items-start" style={{ width: '320px' }}> {/* Adjusted width */}
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500, // Adjusting weight based on screenshot
                      fontSize: "48px",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      marginBottom: "40px",
                      // Added text wrapping if title is long
                      wordBreak: 'break-word',
                      lineHeight: '1.1',
                    }}
                  >
                    {item.title}
                  </h2>
                  <div className="w-[320px] h-[320px] relative overflow-hidden group">
                    {mainIndex === 1 ? ( // Check if it's the second blog post (index 1) for specific image sizing
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        className="transition-transform duration-700 ease-in-out transform-gpu group-hover:scale-110"
                        width={320}
                        height={320}
                      />
                    ) : (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-700 ease-in-out transform-gpu group-hover:scale-110"
                      />
                    )}
                  </div>
                </div>


                {/* Accordion Sub-sections and "Know More" button (right side) */}
                <div className="flex-1 flex flex-col justify-between" style={{ maxWidth: '320px' }}> {/* Adjusted max-width */}
                  <div>
                    {item.subSections.map((subItem, subIndex) => (
                      <React.Fragment key={subIndex}>
                        <AccordionTitle
                          title={subItem.title}
                          isActive={openSubAccordions.get(mainIndex) === subIndex}
                          onClick={() => {
                            const currentActiveSub = openSubAccordions.get(mainIndex);
                            const newMap = new Map(openSubAccordions);

                            if (currentActiveSub === subIndex) {
                                // If clicked item is already active, close it
                                newMap.delete(mainIndex); // Remove entry for this main section
                            } else {
                                // Set new active item
                                newMap.set(mainIndex, subIndex);
                            }
                            setOpenSubAccordions(newMap);
                          }}
                        />
                        {/* Wrap the conditional content rendering with AnimatePresence */}
                        <AnimatePresence mode="wait">
                          {openSubAccordions.get(mainIndex) === subIndex && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="pb-4 pt-2"
                              style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: "12px",
                                lineHeight: "24px",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#555",
                              }}
                            >
                              {subItem.content}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </div>
                  {/* "Know More" button below all accordions */}
                  <div className="mt-8">
                    <HoverButton href={item.buttonLink}>
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
    </main>
  )
}