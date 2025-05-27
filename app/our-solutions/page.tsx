"use client"

import React, { useEffect, useState, useRef } from "react"
import type { FC } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"

// --- MOBILE HEADER COMPONENT ---
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
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-transparent md:hidden">
        {/* Mobile Logo */}
        <Link href="/homepage3">
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
          {/* Hamburger lines - always white for visibility on white background */}
          <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay (Slides in from right) */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-start pt-[80px] pb-5 px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* Menu Items */}
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
// --- END MOBILE HEADER COMPONENT ---


// Shared container class for consistent margins (Made responsive like Our Products)
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
      href.startsWith('#') ? ( // Check if it's an anchor link
        <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
      ) : ( // Next.js route link
        <Link href={href} className="contents">{buttonContent}</Link>
      )
    ) : buttonContent;
};


// Data for the main solutions categories, now with sub-sections for accordions
const mainSolutionItems = [
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/16ca1b89-cf24-442f-0a41-3e3ad0c6cf00/public",
      title: "Water Reuse",
      mainDescription: "Innovative solutions for reducing water consumption and promoting sustainable usage across industries.", // Added main description
      subSections: [
        { title: "GREY WATER REUSE", content: "WAE's grey water reuse systems capture lightly used water from showers, sinks, and laundry, and treat it for reuse in non-potable applications like toilet flushing, cooling, and landscaping. It's a smart, cost-effective way for organizations to reduce water demand and improve operational sustainability without compromise." },
        { title: "SEWAGE WATER", content: "With advanced multi-stage treatment, WAE transforms sewage water into a valuable resource, making it safe for industrial cooling, agriculture, or even potable use where required. Our systems help clients tackle high-contamination challenges and turn waste into water security." },
        { title: "EFFLUENT TREATMENT", content: "WAE’s effluent treatment solutions are built to handle the toughest industrial wastewater. Using chemical, biological, and physical processes, we remove harmful pollutants and enable safe discharge or reuse — helping organizations meet regulatory standards while protecting the environment." },
      ],
      buttonLink: "/water-reuse" // Specific page for this solution
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c399819d-976c-49aa-332f-02a9db708200/public",
      title: "Water Treatment",
      mainDescription: "Explore our cutting-edge filtration technologies that ensure superior water purity for all applications.", // Added main description
      subSections: [
        { title: "PRIMARY TREATMENT", content: "WAE’s primary treatment systems are designed to remove large, visible contaminants from raw water using mechanical processes like screening, sedimentation, and skimming. This first stage significantly reduces suspended solids and prepares water for deeper biological or chemical treatment." },
        { title: "SECONDARY TREATMENT", content: "Through biological processes like activated sludge, trickling filters, and SBRs, WAE’s secondary treatment systems break down dissolved organic matter in wastewater. This stage lowers BOD and COD levels, producing much cleaner water suitable for non-potable use or further purification." },
        { title: "PURIFICATION", content: "WAE’s purification technologies including RO, UF, and CDI, deliver the final polish by removing fine contaminants, salts, and pathogens. Whether for drinking water or high-purity industrial needs, our systems ensure safe, reliable, and regulation-ready water output." },
      ],
      buttonLink: "/water-treatment"
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f492758-88ca-4c25-4a00-1a122cd22200/public",
      title: "Water as a Service",
      mainDescription: "Implement intelligent systems for real-time monitoring and optimized control of your water infrastructure.", // Added main description
      subSections: [
        { title: "WATER AS A SERVICE", content: "Water dispensers with inbuilt purification —pure, safe water delivered efficiently. Designed to reduce plastic waste and energy consumption, making sustainability easy." },
      ],
      buttonLink: "/solutions/water-as-a-service"
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
  isActive: boolean;
  onClick: () => void;
  id?: string; // Added id prop for anchor linking
}

const AccordionTitle: FC<AccordionTitleProps> = ({ title, isActive, onClick, id }) => {
  return (
    // The margin-bottom for the 24px gap between titles is now directly on this div
    // It will be 0 if the item is active, allowing content to expand without extra space
    <div style={{ marginBottom: isActive ? 0 : '24px' }}>
      <button
          id={id} // Set the ID here for anchor linking
          className="w-full text-left py-0" // Removed vertical padding from button to control it via parent div
          onClick={onClick}
          style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "14px", // Changed to 14px
              lineHeight: "140%",
              letterSpacing: "0%",
              textTransform: "uppercase",
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
              padding: '10px 0', // Added vertical padding inside button to ensure clickable area
              color: "#000",
              verticalAlign: "middle", // Added based on instructions
          }}
      >
          {title}
      </button>
      {/* Horizontal rule only if ACTIVE/OPEN and with mb-12px */}
      {isActive && (
          <div style={{ paddingBottom: "12px" }}> {/* This handles the 12px margin-bottom for the rule */}
              <hr style={{ border: "none", borderTop: "1px solid #D9D9DC" }} />
          </div>
      )}
    </div>
  );
};


export default function Home() {
  const router = useRouter(); // Initialize useRouter

  // State variables (cleaned up unused ones)
  const [currentTime, setCurrentTime] = useState("")
  const headerRef = useRef<HTMLDivElement>(null)

  // State for controlling tagline visibility on scroll (retained for consistency with other pages)
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  // State to manage which sub-accordion is open for each main solution item
  // Map<mainItemIndex, subItemIndex>
  const [openSubAccordions, setOpenSubAccordions] = useState<Map<number, number>>(() => {
    // Initialize with the first sub-accordion of each main solution open
    const initialMap = new Map<number, number>();
    mainSolutionItems.forEach((mainItem, mainIndex) => {
      if (mainItem.subSections.length > 0) {
        initialMap.set(mainIndex, 0); // Open the first sub-section (index 0)
      }
    });
    return initialMap;
  });

  // Ref to store the height of the accordion content for smooth transitions
  const contentRefs = useRef<(HTMLDivElement | null)[][]>(
    mainSolutionItems.map(item => item.subSections.map(() => null))
  );

  // Function to determine which accordion should be open based on URL hash
  const parseHashAndOpenAccordion = (hash: string) => {
    if (!hash) return;

    const targetId = hash.substring(1); // Remove '#'
    let found = false;

    mainSolutionItems.forEach((mainItem, mainIndex) => {
      mainItem.subSections.forEach((subItem, subIndex) => {
        const expectedId = `${slugify(mainItem.title)}-${slugify(subItem.title)}`;
        if (expectedId === targetId) {
          setOpenSubAccordions(prev => {
            const newMap = new Map(prev);
            newMap.set(mainIndex, subIndex);
            return newMap;
          });
          found = true;
          // Smooth scroll to the element
          setTimeout(() => { // Timeout ensures element is rendered and open
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100); // Small delay to allow accordion to open first
        }
      });
    });

    // If a sub-accordion wasn't found by its full slug, check if it's a main solution title
    if (!found) {
        mainSolutionItems.forEach((mainItem, mainIndex) => {
            if (slugify(mainItem.title) === targetId) {
                // If it's a main solution title, ensure no sub-accordion is open for it initially
                setOpenSubAccordions(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(mainIndex); // Close any open sub-accordion for this main section
                    return newMap;
                });
                 setTimeout(() => { // Timeout to ensure element is rendered
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        });
    }
  };


  // Effect to handle initial hash on load and hash changes
  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      parseHashAndOpenAccordion(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial check on component mount
    parseHashAndOpenAccordion(window.location.hash);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Run only once on mount


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
      {/* RENDER MOBILE HEADER COMPONENT HERE */}
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

        {/* Hero section */}
        <section
            id="hero"
            className="relative w-full overflow-hidden h-screen pt-[70px] md:pt-[160px]"
        >
            {/* Image - positioned absolutely to be behind content */}
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/73c75bcc-aeeb-408e-ad25-dd4ab07f2b00/public" // Updated banner image URL
                alt="Our Solutions Hero"
                fill
                className="object-cover -z-10"
            />

            {/* Text and image overlays */}
            {/* Hide the "innovation meets design" image on mobile */}
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
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public" // Updated overlay image URL
                    alt="innovation meets design"
                    width={393}
                    height={159}
                    className="object-contain"
                />
            </div>

            {/* Our Solutions Text - Mobile Version */}
            <div
                className="absolute uppercase md:hidden"
                style={{
                    bottom: "10%",
                    left: "1rem",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "2rem", // This was already 32px (2rem)
                    lineHeight: "110%", // This was already 110%
                    color: "#fff",
                }}
            >
                Our Solutions
            </div>

            {/* Our Solutions Text - Desktop Version */}
            <div
                className="absolute uppercase hidden md:block"
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
                Our Solutions
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

        {/* Our SOLUTIONS Heading (Main Content Title) */}
      <div className={containerClass} style={{marginTop: "80px"}}> {/* 80px gap for mobile and desktop */}
        <h2
          className={`
            font-inter-tight font-medium tracking-tighter align-middle mb-[40px]
            text-[32px] leading-[110%]
            md:text-[48px] md:leading-[110%]
          `}
        >
          Our Solutions
        </h2>

        {/* Solution Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[80px] gap-y-[60px] mb-[80px] md:mb-[180px]"> {/* 80px gap on mobile, 180px on desktop */}
          {mainSolutionItems.map((mainItem, index) => (
            <div key={index}>
                {/* Main Solution Title for the grid */}
              <a href={`#${slugify(mainItem.title)}`}
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
                {mainItem.title}
              </a>

              {/* Horizontal Rule */}
              <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                <hr style={{ border: "none", borderTop: "1px solid #00000033" }} />
              </div>

              {/* Main Description */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  marginBottom: "20px",
                }}
              >
                {mainItem.mainDescription}
              </p>

              {/* Accordion Titles below description with description typography */}
              {mainItem.subSections.map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href={`#${slugify(mainItem.title)}-${slugify(subItem.title)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`#${slugify(mainItem.title)}-${slugify(subItem.title)}`);
                  }}
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: subIndex < mainItem.subSections.length - 1 ? '10px' : '0',
                    color: "#000",
                    textDecoration: 'none',
                  }}
                >
                    {subItem.title}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Main Solutions Category Section (Detailed Accordions) */}
        <div className="pb-[80px]"> {/* 80px gap before Footer for mobile and desktop */}
          {mainSolutionItems.map((item, mainIndex) => (
            <div
              key={mainIndex}
              id={slugify(item.title)}
              className={`flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8 justify-between ${mainIndex % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              style={{ marginBottom: mainIndex < mainSolutionItems.length - 1 ? '80px' : '0' }} 
            >
              {/* Left Column: Main Solution Title and Image */}
              <div className="flex flex-col items-start w-full md:w-[320px]">
              <h2
                className={`
                  font-inter-tight font-medium tracking-tighter align-middle break-words
                  text-[32px] leading-[110%] normal-case mb-[60px]
                  md:text-[48px] md:leading-[110%] md:uppercase md:mb-[40px]
                `}
              >
                {item.title}
              </h2>
                <div className="w-full md:w-[320px] h-[320px] relative overflow-hidden group">
                  {mainIndex === 1 ? (
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


              {/* Right Column: Accordion Sub-sections and "Know More" button */}
              <div
                className="flex-1 flex flex-col justify-between lg:max-w-[31%]"
                style={{
                  marginTop: '93px'
                }}
              >
                <div>
                  {item.subSections.map((subItem, subIndex) => {
                    const isActive = openSubAccordions.get(mainIndex) === subIndex;
                    return (
                      <React.Fragment key={subIndex}>
                        <AccordionTitle
                          title={subItem.title}
                          isActive={isActive}
                          onClick={() => {
                            const currentActiveSub = openSubAccordions.get(mainIndex);
                            const newMap = new Map(openSubAccordions);

                            if (currentActiveSub === subIndex) {
                                newMap.delete(mainIndex);
                                router.push(`#${slugify(item.title)}`, undefined);
                            } else {
                                newMap.set(mainIndex, subIndex);
                                router.push(`#${slugify(item.title)}-${slugify(subItem.title)}`);
                            }
                            setOpenSubAccordions(newMap);
                          }}
                          id={`${slugify(item.title)}-${slugify(subItem.title)}`}
                        />
                        {/* CSS Transition for content */}
                        <div
                          ref={el => {
                            if (el) {
                              if (!contentRefs.current[mainIndex]) {
                                contentRefs.current[mainIndex] = [];
                              }
                              contentRefs.current[mainIndex][subIndex] = el;
                            }
                          }}
                          className="accordion-content"
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "24px",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            color: "#555",
                            overflow: 'hidden',
                            transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                            height: isActive ? (contentRefs.current[mainIndex]?.[subIndex]?.scrollHeight || 0) + 'px' : '0px',
                            opacity: isActive ? 1 : 0,
                          }}
                        >
                          <p className="pb-4 pt-2">
                            {subItem.content}
                          </p>
                        </div>
                      </React.Fragment>
                    );
                  })}
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
                          <div
                            className={`absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </div>
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

      {/* FOOTER SECTION */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>

      {/* INLINE CSS for hover and arrow animations and accordion transitions */}
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