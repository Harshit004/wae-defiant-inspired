"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Still used for Hero InView
import RelatedCard from "@/components/related-card"; // Assuming this component exists
import Footer from "@/components/footer"; // Assuming this component exists
import Link from "next/link";

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
}

/**
 * Reusable hover button component.
 */
const HoverButton: FC<HoverButtonProps> = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
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
        fontFamily: "'Inter Tight', sans-serif", // Note: Inline style for font
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
};

const Home: FC = () => {
  // State and refs
  const [activeSection, setActiveSection] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>(""); // State is declared but not used in the provided snippets
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [taglineVisible, setTaglineVisible] = useState<boolean>(true); // State is declared but not used for conditional rendering in provided snippets
  const prevScrollY = useRef<number>(0); // Used for tagline visibility logic
  const [headerHeroScale, setHeaderHeroScale] = useState<number>(1); // State is declared and updated, but not applied to an element's style/transform in provided snippets
  const headerHeroRef = useRef<HTMLDivElement>(null); // Ref for the fixed header/hero container

  // Ref for the Sustainability section wrapper for scroll animation - REMOVED as parallax is discarded
  // const sustainabilityScrollRef = useRef<HTMLDivElement>(null);


  const sections = ["hero"]; // Extendable for additional sections - used only to set active section based on heroInView

  const containerRef = useRef<HTMLDivElement>(null); // Ref is declared but not applied to an element

   // --- ADDED: Explicitly scroll to top on mount ---
   useEffect(() => {
       requestAnimationFrame(() => {
           window.scrollTo(0, 0);
       });
   }, []);
   // --- END ADDED CODE ---


  // Update tagline visibility on scroll (logic present, but taglineVisible state not used)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTaglineVisible(currentScrollY < prevScrollY.current);
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update current time (India Time) every minute (logic present, but currentTime state not used)
  useEffect(() => {
    const updateIndiaTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateIndiaTime();
    const interval = setInterval(updateIndiaTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Set active section when hero is in view (logic present, but activeSection state not used)
  useEffect(() => {
    if (heroInView) setActiveSection(0);
  }, [heroInView]);

  // Measure header height to offset hero section (logic present, headerHeight state used)
  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  // Scroll-driven header/hero scaling effect (logic present, headerHeroScale state updated, but state not applied)
  useEffect(() => {
    const handleScroll = () => {
      if (!headerHeroRef.current) return;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = viewportHeight * 0.8;
      const minScale = 0; // Scaling down to 0 might make it disappear abruptly

      if (scrollPosition <= 100) {
        setHeaderHeroScale(1);
      } else if (scrollPosition >= maxScroll) {
        setHeaderHeroScale(minScale);
      } else {
        const scrollRange = maxScroll - 100;
        const scrollProgress = (scrollPosition - 100) / scrollRange;
        setHeaderHeroScale(1 - scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion scroll-driven animations (Keeping logo opacity as it seems unrelated to section snap)
  const { scrollYProgress } = useScroll(); // Tracks scroll progress of the window by default
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // Logo opacity linked to scroll

  // Scroll-linked animation for Sustainability section's y position - REMOVED as parallax is discarded
  // const { scrollYProgress: sustainabilityScrollProgress } = useScroll({
  //   target: sustainabilityScrollRef,
  //   offset: ["start end", "end start"],
  // });
  // Map scroll progress (0 to 1) to a y translation - REMOVED as parallax is discarded
  // const sustainabilityY = useTransform(
  //   sustainabilityScrollProgress,
  //   [0, 1],
  //   [360, 0]
  // );


  // --- POTENTIAL TROUBLESHOOTING AREA (Declared but not used/Incorrect Syntax) ---
  // These useTransform calls have incorrect syntax and are not used in the provided code structure.
  // They were potentially intended for scroll animations now replaced by scroll-snap.
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]);
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const finalPurposeOpacity = useTransform(
    [purposeOpacity, purposeVanish] as any,
    ([pO, pV]: any) => pO * pV
  );

  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]);
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
  const finalIndiaOpacity = useTransform(
    [indiaOpacity, indiaVanish] as any,
    ([iO, iV]: any) => iO * iV
  );
  // --- END POTENTIAL TROUBLESHOOTING AREA ---


  // Menu items arrays - INSIDE WAE section
  const productsItems = [
    { text: "This Is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers3" },
  ];
  
  // ETCETERA section
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];
  const lineCount = Math.min(productsItems.length, blueprintItems.length); // Declared but not used

  // Tagline words split for animation (logic present, but taglineWords1/2 not used for animation in provided code)
  const taglineLine1 = "To lead the way in sustainability"; // Declared but not used
  const taglineLine2 = "ahead of the rest"; // Declared but not used
  const taglineWords1 = taglineLine1.split(" "); // Declared but not used
  const taglineWords2 = taglineLine2.split(" "); // Declared but not used

  // Framer Motion animation variants (declared but not applied in provided code)
  const containerVariants = { // Declared but not used
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, ease: "easeInOut" },
    },
  };
  const childVariants = { // Declared but not used
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
  };

  return (
    <main className="relative">
      {/* HEADER AND HERO SECTION */}
      {/* This div is fixed and covers the initial viewport height.
          The scroll-driven container below is pushed down by 100vh using margin-top. */}
      <div ref={headerHeroRef} className="w-full z-0"> {/* Changed from fixed to normal flow */}
        <header ref={headerRef} className="w-full bg-white relative z-10 mb-0">
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif", // Inline style
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <div>
                <Link href="/identity">IDENTITY</Link>
              </div>
              <div>
                <Link href="/origin">ORIGIN</Link>
              </div>
              <div>
                <Link href="/objective">OBJECTIVE</Link>
              </div>
              <div>
                <Link href="/inside-wae">INSIDE WAE</Link>
              </div>
              <div>
                <Link href="/etcetera">ETCETERA</Link>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Coordinates, Tagline, Menu Items */}
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
                  fontFamily: "'Inter Tight', sans-serif", // Inline style
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
                  fontFamily: "'Inter Tight', sans-serif", // Inline style
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
                      fontFamily: "'Inter Tight', sans-serif", // Inline style
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* className="contents" might affect layout/hover */}
                      <div className="c--anim-btn"> {/* Custom CSS class for hover animation */}
                        <div className="text-container"> {/* Custom CSS class */}
                          <span className="c-anim-btn">{item.text}</span> {/* Custom CSS class */}
                          <span className="block">{item.text}</span>
                        </div>
                        <span className="menu-arrow"> {/* Custom CSS class for arrow animation */}
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
                      fontFamily: "'Inter Tight', sans-serif", // Inline style
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* className="contents" might affect layout/hover */}
                      <div className="c--anim-btn"> {/* Custom CSS class for hover animation */}
                        <div className="text-container"> {/* Custom CSS class */}
                          <span className="c-anim-btn">{item.text}</span> {/* Custom CSS class */}
                          <span className="block">{item.text}</span>
                        </div>
                        <span className="menu-arrow blueprint-arrow"> {/* Custom CSS class for arrow animation + rotation */}
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

        {/* HERO SECTION */}
        {/* NOTE: If you want the Hero to be a scroll-snap point, add snap-center here as well */}
        <section
          id="hero"
          ref={heroRef}
          className="w-full flex items-center justify-center bg-white"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
          <div className="w-screen flex items-center justify-center">
            <video
              src="/new-banner-homepage-7.mp4"
              autoPlay
              muted
              playsInline
              className="w-fit h-fit object-cover rounded-none"
            />
          </div>
          <div
            className="absolute uppercase"
            style={{
              bottom: "6%",
              left: "9.72%",
              width: "104px",
              height: "12px",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              lineHeight: "100%",
              color: "#00000099",
            }}
          >
            Scroll for more ⤵︎ {/* Static text */}
          </div>
        </section>
      </div>

      {/* NORMAL SECTIONS AFTER HERO */}
      
        {/* Brand, Purpose & People Section */}
        <section className="h-screen flex items-center justify-center relative bg-[#F2F2F2]">
          <motion.div className="w-full max-w-screen-xl mx-8 lg:mx-36">
            <div className="flex flex-col lg:flex-row justify-between w-full gap-8">
              {/* Column 1: Brand */}
              <div className="flex flex-col max-w-[22%]">
                <h2
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle'
                  }}
                >
                  Brand
                </h2>
                <div style={{ height: '32px' }} />
                <h3
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 700,
                    fontStyle: 'Bold',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  Being Sustainable
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  The underlying natural order of the universe – circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.
                </p>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  WAE's mission is to lead the industry by 2030 offering science and technology driven water purification and reuse solutions.
                </p>
                <div style={{ height: '20px' }} />
                <Link href="/brand" className="contents">
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
                </Link>
              </div>

              {/* Column 2: Purpose */}
              <div className="flex flex-col max-w-[21%]">
                <h2
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle'
                  }}
                >
                  Purpose
                </h2>
                <div style={{ height: '32px' }} />
                <h3
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 700,
                    fontStyle: 'Bold',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  Our Green Is Blue
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  It is where sustainability takes its truest form, not in what we take, but in what we give back. In every drop we preserve, nature finds its balance again — pure, circular, and endlessly alive.
                </p>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  At WAE, we do not just treat water but architect a scientifically governed, sustainability-positive water continuum.
                </p>
                <div style={{ height: '20px' }} />
                <Link href="/purpose" className="contents">
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
                </Link>
              </div>

              {/* Column 3: People */}
              <div className="flex flex-col max-w-[20%]">
                <h2
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle'
                  }}
                >
                  People
                </h2>
                <div style={{ height: '32px' }} />
                <h3
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 700,
                    fontStyle: 'Bold',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  People First
                </h3>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  People are the natural rhythm of WAE — endlessly evolving, quietly resilient, and profoundly capable of renewal. They are the pulse that keeps our purpose alive, the continuity between what we imagine and what we achieve.
                </p>
                <div style={{ height: '12px' }} />
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                >
                  In their curiosity and courage, the company finds its true flow — powerful, generous, and human at its core.
                </p>
                <div style={{ height: '20px' }} />
                <Link href="/people" className="contents">
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
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products Section */}
        {/* This section has a white background and higher z-index */}
        {/* NOTE: If you want this section to be a scroll-snap point, add snap-center here */}
        <div className="relative bg-white flex items-center justify-center py-[140px]" style={{ zIndex: 1200 }}>
          {/* Uses a table for layout, with fixed sizes defined in custom CSS */}
          <table className="product-grid"> {/* Custom CSS class */}
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap"> {/* Custom CSS class */}
                Products
              </td>
              <td className="product-cell transition  cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/drinking-water-stations" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p
                        style={{
                          fontFamily: 'Inter Tight',
                          fontWeight: 700,
                          fontStyle: 'Bold',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        BLUWAE
                      </p>
                      <span className="product-category">DRINKING WATER<br />STATIONS</span>
                    </div>
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                {/* Image wrapped in Link - not ideal, Link should wrap Image */}
                <Image
                  // href="/products-solutions/drinking-water-stations" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/27917d14-ea56-4a80-93b9-c66ba9642400/public"
                  alt="Drinking Water Station"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell !bg-white"></td> {/* Custom CSS class + Tailwind override */}
            </tr>
            <tr>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/drinking-water-faucets" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/685750d6-ec8e-491b-a214-24f13cfcb600/public"
                  alt="Water Faucet"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER FAUCETS with left and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/drinking-water-faucets" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p
                        style={{
                          fontFamily: 'Inter Tight',
                          fontWeight: 700,
                          fontStyle: 'Bold',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        WATERMATIC
                      </p>
                      <span className="product-category">DRINKING WATER<br />FAUCETS</span>
                    </div>
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1592737-4cb5-4079-b1ea-9073ebbc4500/public"
                        alt="Down arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/drinking-water-dispensers" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b05d64d-0248-4aaf-b8c3-e8d7afccea00/public"
                  alt="Water Dispenser"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER DISPENSERS with left and right arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-dispenser" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p
                        style={{
                          fontFamily: 'Inter Tight',
                          fontWeight: 700,
                          fontStyle: 'Bold',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        TRUBLU
                      </p>
                      <span className="product-category">DRINKING WATER<br />DISPENSERS</span>
                    </div>
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/drinking-water-dispensers" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c4a14e-2e09-4da6-c363-84bae0088400/public"
                  alt="Water Dispenser"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
            </tr>
            <tr>
              <td className="product-cell !bg-white"></td> {/* Custom CSS class + Tailwind override */}
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/water-coolers-fountains" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf2a2e6e-9e0b-464a-c2ff-1a16cb1f9900/public"
                  alt="Water Cooler"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* WATER COOLERS & FOUNTAINS with right and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-cooler" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p
                        style={{
                          fontFamily: 'Inter Tight',
                          fontWeight: 700,
                          fontStyle: 'Bold',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        ZVR
                      </p>
                      <span className="product-category">WATER COOLERS &amp;<br />FOUNTAINS</span>
                    </div>
                    {/* Right Arrow flush at right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/water-coolers-fountains" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d9688872-6e63-4d68-26e9-aec6cf1f3a00/public"
                  alt="Water Fountain"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell !bg-white"></td> {/* Custom CSS class + Tailwind override */}
            </tr>
            <tr>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/public-utility-systems" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/54ccac68-6261-4097-e41c-cfa35c992100/public"
                  alt="Public Utility"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* PUBLIC UTILITY SYSTEMS with left arrow */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/public-utility-systems" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p
                        style={{
                          fontFamily: 'Inter Tight',
                          fontWeight: 700,
                          fontStyle: 'Bold',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        PUS
                      </p>
                      <span className="product-category">PUBLIC UTILITY<br />SYSTEMS</span>
                    </div>
                    {/* Left Arrow flush at left */}
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/commercial-industrial-plants" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1de8f36-85d7-4958-a678-0702ece63a00/public"
                  alt="Commercial Plant"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* COMMERCIAL/INDUSTRIAL PLANTS with right arrow */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/commercial-industrial-plants" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">COMMERCIAL/<br />INDUSTRIAL PLANTS</span>
                    </div>
                    {/* Right Arrow flushat right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/commercial-industrial-plants" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a0490312-e31b-44b0-2272-8645b0d0ef00/public"
                  alt="Industrial Plant"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
            </tr>
            <tr>
              <td className="product-cell !bg-white"></td> {/* Custom CSS class + Tailwind override - Empty cell */}
              <td className="product-cell"> {/* Custom CSS class - Image cell */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/05160299-d316-435c-db6f-5f2a55a55300/public"
                  alt="WAEAU"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell"> {/* Custom CSS class - Text cell */}
                <div className="flex flex-col items-center justify-center h-full">
                  <p
                    style={{
                      fontFamily: 'Inter Tight',
                      fontWeight: 700,
                      fontStyle: 'Bold',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textTransform: 'uppercase'
                    }}
                  >
                    WAEAU
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter Tight',
                      fontWeight: 400,
                      fontStyle: 'Regular',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textTransform: 'uppercase'
                    }}
                  >
                    SMALL RO UNITS
                  </p>
                </div>
              </td>
              <td className="product-cell"> {/* Custom CSS class - Image cell */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1de8f36-85d7-4958-a678-0702ece63a00/public"
                  alt="AUX"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale - Arrow and text cell */}
                <Link href="/auxiliary-equipment" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-center">
                        <p
                          style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 700,
                            fontStyle: 'Bold',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            textTransform: 'uppercase'
                          }}
                        >
                          AUX
                        </p>
                        <p
                          style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 400,
                            fontStyle: 'Regular',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            textTransform: 'uppercase'
                          }}
                        >
                          AUXILIARY EQUIPMENT
                        </p>
                      </div>
                    </div>
                    {/* Left Arrow flush at left */}
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale - Text cell with arrow */}
                <Link href="/glass-bottling-plant" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-center">
                        <p
                          style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 700,
                            fontStyle: 'Bold',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            textTransform: 'uppercase'
                          }}
                        >
                          GBP
                        </p>
                        <p
                          style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 400,
                            fontStyle: 'Regular',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            textTransform: 'uppercase'
                          }}
                        >
                          GLASS BOTTLING PLANT
                        </p>
                      </div>
                    </div>
                    {/* Right Arrow flush at right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td colSpan={3} className="product-cell"> {/* Custom CSS class - Spanning image cell */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b8f04688-16ef-4c40-6161-b9a532be5500/public"
                  alt="Glass Bottling Plant"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500"
                  width={696}
                  height={232}
                />
              </td>
            </tr>
          </table>
        </div>

      {/* wrapping these in a div to get them to overlap the sticky logo */}
        <div className="bg-[#f2f2f2]"
        style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
        {/* Make in INDIA Section */}
        {/* Entrance animations removed for scroll-snap priority */}
        {/* Changed to h-screen and centered content vertically, removed padding */}
        <section className="flex items-center justify-center relative px-[9.72%] bg-[#F2F2F2] my-[100px] py-[100px]"> {/* Changed height, removed padding, changed flex alignment */}
          <motion.div
            // Removed initial and whileInView animation props
            // initial={{ y: "100%", opacity: 0 }}
            // whileInView={{ y: 0, opacity: 1 }}
            // transition={{ duration: 0.8 }}
            // viewport={{ once: true }}
            className="w-full max-w-screen-xl" // Removed mb-20
          >
            <div className="flex flex-col lg:flex-row items-center justify-between h-[115px] gap-8">
              {/* Column 1: Make in India Text */}
              <div className="flex flex-col items-start max-w-[19.8%]">
                <h2 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '0px',
                    verticalAlign: 'middle'
                  }}

                >
                  Make in India
                </h2>
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#00000099'
                  }}
                  className="mt-[10px]"
                >
                  WAE captures the heart of Indian innovation by seamlessly blending the time-honoured ideals with the latest technology.
                </p>
              </div>
              
              {/* Column 2: Lion Image */}
              <div className="relative flex items-center justify-center max-w-[20%]" style={{ zIndex: 1200 }}>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b98b2fe-e201-4ef1-32c7-8040c82d2200/public"
                  alt="Make In India"
                  width={224}
                  height={122}
                  className="pb-[25px]"
                />
              </div>
              
              {/* Column 3: Descriptive Text */}
              <div className="flex flex-col gap-5 max-w-[22%]">
                <p className="font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  To make in India is to make with purpose — 
                  crafted by hands that build with heart. 
                  It is where innovation meets integrity, and 
                  progress learns to walk softly on the earth.
                  At WAE, every product born here carries the 
                  spirit of a nation that creates to conserve.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sustainability Section */}
        <section className="flex items-center justify-center relative px-[9.72%] bg-[#F2F2F2] mb-[100px]">
          <motion.div
            className="w-full max-w-screen-xl flex flex-col items-start justify-center relative"
          >
            {/* Heading on top */}
            <h2
              className="mb-20 text-left"
              style={{
                fontFamily: 'Inter Tight',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: '40px',
                lineHeight: '110%',
                letterSpacing: '0px',
                verticalAlign: 'middle'
              }}
            >
              Sustainability
            </h2>
            {/* Metrics row below heading */}
            <div className="flex flex-row gap-32 w-full">
              <div className="flex flex-col items-start min-w-[220px]">
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 700,
                    fontStyle: 'Bold',
                    fontSize: '40px',
                    lineHeight: '140%',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase'
                  }}
                >
                  1,012,120.25
                </p>
                <div className="h-px w-full bg-[#D9D9DC] my-2" />
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize'
                  }}
                >
                  Tonnes CO2 Emissions Saved
                </p>
              </div>
              <div className="flex flex-col items-start min-w-[220px]">
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 700,
                    fontStyle: 'Bold',
                    fontSize: '40px',
                    lineHeight: '140%',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase'
                  }}
                >
                  12,185.43
                </p>
                <div className="h-px w-full bg-[#D9D9DC] my-2" />
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize'
                  }}
                >
                  Million Gallons Water Saved
                </p>
              </div>
              <div className="flex flex-col items-start min-w-[220px]">
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 700,
                    fontStyle: 'Bold',
                    fontSize: '40px',
                    lineHeight: '140%',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase'
                  }}
                >
                  22,253.65
                </p>
                <div className="h-px w-full bg-[#D9D9DC] my-2" />
                <p 
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize'
                  }}
                >
                  Tonnes Plastic Removed
                </p>
              </div>
            </div>
          </motion.div>
        </section>
        </div>

        {/* BLOGS SECTION */}
        <section
          className="max-w-full px-[8.75rem] py-[120px] bg-white"
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
          <h2 style={{
            fontFamily: 'Inter Tight',
            fontWeight: 500,
            fontStyle: 'Medium',
            fontSize: '40px',
            lineHeight: '110.00000000000001%',
            letterSpacing: '0px',
            verticalAlign: 'middle',
            marginBottom: '2.5rem'
          }}>
            Blogs
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[350px] h-[350px]">
                {/* Base image - full opacity */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public"
                  alt="From Kyoto to COP28"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: 1 }}
                />
                {/* Hover image - initially transparent */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf4fc4f5-cfc3-4eb9-ac32-bac46f834a00/public"
                  alt="From Kyoto to COP28 Hover"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 hover:opacity-100"
                  style={{ zIndex: 10 }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg line-height-[120%] font-medium mb-2" style={{ lineHeight: "120%" }}>From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future</h3>
                <p className="text-sm text-gray-600">
                  In the quiet halls of Kyoto in 1997, something monumental began   a collective awakening of the world's conscience towards the mounting crisis of climate change.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[350px] h-[350px]">
                {/* Base image - full opacity */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public"
                  alt="Climate Change in the Indian Subcontinent"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: 1 }}
                />
                {/* Hover image - initially transparent */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4addca72-6f79-4c23-9c24-c400cd9b6a00/public"
                  alt="Climate Change in the Indian Subcontinent Hover"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 hover:opacity-100"
                  style={{ zIndex: 10 }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium line-height-[120%] mb-2" style={{ lineHeight: "120%" }}>Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective</h3>
                <p className="text-sm text-gray-600">
                  The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[350px] h-[350px]">
                {/* Base image - full opacity */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public"
                  alt="The Ozone Crisis"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: 1 }}
                />
                {/* Hover image - initially transparent */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c3eb242-b13a-443c-da32-a78bce6e7a00/public"
                  alt="The Ozone Crisis Hover"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 hover:opacity-100"
                  style={{ zIndex: 10 }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium line-height-[120%] mb-2" style={{ lineHeight: "120%" }}>The Ozone Crisis: A Success Story in Environmental Cooperation</h3>
                <p className="text-sm text-gray-600">
                  It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth. This protective shield—the ozone layer—sits between 10 to 50 kilometres above the surface and has for millions of years absorbed nearly 97–99% of the Sun's harmful ultraviolet-B (UV-B) radiation.
                </p>
              </div>
            </div>
            
          </div>
        </section>

        {/* NEWS & UPDATES SECTION */}
        <section
          className="max-w-full px-[8.75rem] py-[100px] bg-white"
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
          <h2 style={{
            fontFamily: "Inter Tight",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: "40px",
            lineHeight: "110.00000000000001%",
            letterSpacing: "0px",
            verticalAlign: "middle",
            marginBottom: "40px",
          }}>
            News & Updates
          </h2>
          <div className="flex" style={{ gap: "1.6%" }}>
            {/* Left Column - 60.3% */}
            <div style={{ width: "60.3%" }}>
              <div className="space-y-6">
                {/* News Item 1 */}
                <div>
                  <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b2089e4-37cf-450d-c869-2248d7209700/public"
                    alt="WAE ZED Gold Certification"
                    className="w-full h-auto rounded-lg mb-4"
                    style={{ marginBottom: "16px" }}
                  />
                  <h3 
                    style={{
                      fontFamily: "Inter Tight",
                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "24px",
                      lineHeight: "40px",
                      letterSpacing: "0%",
                      marginBottom: "16px"
                    }}
                  >
                    WAE shines with ZED Gold certification for sustainable excellence
                  </h3>
                  <div 
                    className="flex justify-between items-center"
                    style={{
                      fontFamily: "Inter Tight",
                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "-1.1%",
                      color: "#808080"
                    }}
                  >
                    <span>Staff Writer</span>
                    <span>|</span>
                    <span>Nov 04, 2025</span>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Right Column - 37.58% */}
            <div style={{ width: "37.58%" }}>
              <div className="space-y-8">
                {/* Row 1 */}
                <div>
                  <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/97d880ca-cfa0-4094-52b7-940402225a00/public"
                    alt="Drinking Water Stations"
                    className="w-full h-auto rounded-lg mb-1"
                    style={{ marginBottom: "8px" }}
                  />
                  <h3 
                    style={{
                      fontFamily: "Inter Tight",
                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "18px",
                      lineHeight: "28px",
                      letterSpacing: "0%",
                      marginBottom: "8px"
                    }}
                  >
                    Drinking Water Stations Installed Across 28 Police...
                  </h3>
                  <div 
                    className="flex justify-between items-center"
                    style={{
                      fontFamily: "Inter Tight",
                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "-1.1%",
                      color: "#808080"
                    }}
                  >
                    <span>Hency Thacker</span>
                    <span>|</span>
                    <span>Oct 27, 2025</span>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div>
                  <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f2da7d0f-dbed-45a9-1641-8cee5fc4fe00/public"
                    alt="Sustainability in Hospitality"
                    className="w-full h-auto rounded-lg"
                    style={{ marginBottom: "8px" }}
                  />
                  <h3 
                    style={{
                      fontFamily: "Inter Tight",
                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "18px",
                      lineHeight: "28px",
                      letterSpacing: "0%",
                      marginBottom: "8px"
                    }}
                  >
                    Sustainability in India's hospitality industry
                  </h3>
                  <div 
                    className="flex justify-between items-center"
                    style={{
                      fontFamily: "Inter Tight",
                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "-1.1%",
                      color: "#808080"
                    }}
                  >
                    <span>ETHospitalityWorld</span>
                    <span>|</span>
                    <span>Dec 04, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* FOOTER SECTION */}
        {/* Footer likely appears at the very bottom */}
        {/* NOTE: If you want this section to be a scroll-snap point, add snap-center here */}
        {/* NOTE: Adjust padding/margins if this section's height + content interferes with snapping */}
        <div style={{ position: "relative", zIndex: 1200 }}> {/* z-index to appear above the gray background */}
          {/* Assuming Footer is a valid component */}
          <Footer />
        </div>

      {/* INLINE STYLES */}
      {/* Custom CSS for specific elements and animations */}
      <style jsx>{`
        /* These classes were for a different scroll-snap setup and are likely not needed with global html/body snap */
        /*
        .container {
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          height: 200vh;
        }

        .section {
          scroll-snap-align: start;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        */

        /* Product Grid Table Styles */
        .product-grid {
          width: 1160px; /* Fixed width */
          height: 928px; /* Fixed height */
          border-collapse: collapse;
        }

         /* Solutions Grid Table Styles */
        .solutions-grid {
          width: 1160px; /* Fixed width */
          height: 696px; /* Fixed height */
          border-collapse: collapse;
        }

        .product-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 110%;
          letter-spacing: 0px;
          vertical-align: middle;
          text-align: center;
          width: calc(232px * 2); /* Fixed width based on cell size */
          height: 232px; /* Fixed height */
          box-sizing: border-box;
        }
        .product-cell {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 0px;
          text-align: center;
          vertical-align: middle;
          text-transform: uppercase;
          color: #1e1e1e;
          background-color: #f2f2f2; /* Default background for most cells */
          width: 232px; /* Fixed width */
          height: 232px; /* Fixed height */
          padding: 0px;
          box-sizing: border-box;
        }
         /* Corrected invalid CSS */
         .product-cell.bg-white-override { /* Added a class name */
             background-color: #fff !important;
         }
         /* You would need to update the HTML like:
            <td className="product-cell bg-white-override"></td>
            instead of:
            <td className="product-cell !bg-white"></td>
         */


        .placeholder-img {
          object-fit: cover;
          /* Potential issue: no explicit max-width/height, might overflow fixed cell */
        }

        /* Custom Button Hover Animation Styles */
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-container {
          height: 12px; /* Fixed height */
          overflow: hidden; /* Hides the second text span by default */
        }
        .c-anim-btn {
          display: block;
          transition: margin-top 0.5s; /* Animates the text moving up */
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px; /* Moves the first text span up by its height */
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0; /* Hidden by default */
          transform: translateX(-10px); /* Starts off-position */
          transition: transform 0.5s ease, opacity 0.5s ease; /* Animates movement and fade */
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0); /* Moves arrow into position */
          opacity: 1; /* Fades arrow in */
        }
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px); /* Additional rotation + initial position */
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }
      `}</style>
    </main>
  );
};

export default Home;