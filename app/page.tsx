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
    { text: "Reimagine Work", href: "/careers" },
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
      <div ref={headerHeroRef} className="fixed top-0 left-0 w-full h-screen z-0"> {/* Note: z-index 0 on a fixed element might cause issues */}
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

      {/* SCROLL-DRIVEN CONTAINER */}
      {/* This container provides the main scrollable content below the initial fixed header/hero.
          NOTE: scroll-snap-type for this effect is applied to the html/body element in global CSS.
          snap-y snap-mandatory classes are removed from this div. */}
      {/* The min-height should accommodate the total height of all content */}
      <motion.div
        className="min-h-[400vh] relative bg-[#F2F2F2] mt-screen" // Increased min-height to better accommodate full-screen sections + other content
        style={{ marginTop: "100vh" }} // Explicitly pushing content down by viewport height
      >
        {/* Sticky Logo Overlay */}
        {/* This element is positioned sticky inside the scrollable container. */}
        {/* snap-start class is REMOVED */}
        {/* NOTE: If you want the logo div itself to be a snap point, add snap-center here */}
        <motion.div
          style={{ position: "sticky", top: "5%", zIndex: 1100, opacity: logoOpacity }} // Framer Motion opacity + CSS Sticky
          className="pointer-events-none flex justify-center pt-[180px]" // snap-start removed
        >
          <div className="max-w-[19.375rem] max-h-[19.375rem]"> {/* Fixed size container for the logo */}
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
              alt="Center Logo"
              width={250}
              height={250}
              className="opacity-80"
            />
          </div>
        </motion.div>

        {/* Purpose & About WAE Combined Section */}
        <section className="h-screen flex items-center justify-center relative snap-center">
          <motion.div className="w-full max-w-screen-xl mx-8 lg:mx-36">
            <div className="flex flex-col lg:flex-row justify-between w-full gap-12">
              {/* Purpose (left on desktop) */}
              <div className="flex-1 flex flex-col max-w-[251px] mx-auto lg:mx-0">
                <h2
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: 0,
                    verticalAlign: 'middle',
                    color: '#000',
                    marginBottom: '30px',
                  }}
                >
                  Brand
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: 0,
                    verticalAlign: 'middle',
                    color: '#00000099',
                    marginBottom: '20px',
                  }}
                >
                  Being sustainable -The Underlying natural order
                  of the universe - circular continuity of the
                  natural world. Undifferentiated, endlessly self-
                  replenishing, immensely powerful and
                  impassively generous.
                </p>
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: 0,
                    verticalAlign: 'middle',
                    color: '#00000099',
                    marginBottom: '20px',
                  }}
                >
                  Our purpose brings together the company,
                  employees, clients and our stakeholders and
                  reconciles economic performance witha
                  positive impact on people and the planet.
                </p>
                <div style={{ marginBottom: '20px' }} />
                {/* <Link href="/purpose" className="contents">
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
                </Link> */}
              </div>
              {/* About WAE (right on desktop) */}
              <div className="flex-1 flex flex-col max-w-[251px] mx-auto lg:mx-0">
                <h2
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: 0,
                    verticalAlign: 'middle',
                    color: '#000',
                    marginBottom: '30px',
                  }}
                >
                  Purpose
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: 0,
                    verticalAlign: 'middle',
                    color: '#00000099',
                    marginBottom: '20px',
                  }}
                >
                  Being sustainable -The Underlying natural order
                  of the universe - circular continuity of the
                  natural world. Undifferentiated, endlessly self-
                  replenishing, immensely powerful and
                  impassively generous.
                </p>
                <p
                  style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: 0,
                    verticalAlign: 'middle',
                    color: '#00000099',
                    marginBottom: '20px',
                  }}
                >
                  Our purpose brings together the company,
                  employees, clients and our stakeholders and
                  reconciles economic performance witha
                  positive impact on people and the planet.
                </p>
                <div style={{ marginBottom: '20px' }} />
                {/* <Link href="/about-wae" className="contents">
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
                </Link> */}
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
                    <div className="absolute inset-0 flex items-center justify-center">
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
                    <div className="absolute inset-0 flex items-center justify-center">
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
                    <div className="absolute inset-0 flex items-center justify-center">
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
                    <div className="absolute inset-0 flex items-center justify-center">
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
                    <div className="absolute inset-0 flex items-center justify-center">
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
          </table>
        </div>

        {/* Solution Section */}
        {/* This section has a white background and higher z-index */}
        {/* NOTE: If you want this section to be a scroll-snap point, add snap-center here */}
        <div className="relative bg-white flex items-center justify-center py-[140px]" style={{ zIndex: 1200 }}>
          {/* Uses a table for layout, with fixed sizes defined in custom CSS */}
          <table className="solutions-grid"> {/* Custom CSS class */}
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap"> {/* Custom CSS class */}
                Solutions
              </td>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/water-reuse" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER REUSE</span>
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
                {/* Image wrapped in Link - not ideal, Link should wrap Image */}
                <Image
                  // href="/products-solutions/drinking-water-stations" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8c357479-5a25-4527-7fde-a434fa498b00/public"
                  alt="WATER REUSE"
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
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c399819d-976c-49aa-332f-02a9db708200/public"
                  alt="WATER TREATMENT LEFT"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER FAUCETS with left and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/water-treatment" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER TREATMENT</span>
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
                    {/* Down Arrow flush at bottom */}
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
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/16ca1b89-cf24-442f-0a41-3e3ad0c6cf00/public"
                  alt="WATER AS A SERVICE LEFT"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER DISPENSERS with left and right arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/water-as-a-service" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER AS A SERVICE</span>
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
                  // href="/products-solutions/drinking-water-dispensers" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1374b15c-0e9d-4dbf-6524-c4b6ff10f900/public"
                  alt="WATER AS A SERVICE RIGHT "
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
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f492758-88ca-4c25-4a00-1a122cd22200/public"
                  alt="WATER TREATMENT DOWN"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              {/* empty white box */}
              <td className="bg-white"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-coolers-fountains" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category"></span>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                 {/* Image wrapped in Link - not ideal */}
                <Image
                  // href="/products-solutions/water-coolers-fountains" // href attribute is not valid on Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e9e2498-7134-4994-642f-e95e90e1aa00/public"
                  alt="WATER AS A SERVICE DOWN"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500" // Custom CSS class + Tailwind filters/transitions
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell !bg-white"></td> {/* Custom CSS class + Tailwind override */}
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
        <section className="h-screen flex items-center justify-center relative snap-center px-[9.72%]"> {/* Changed height, removed padding, changed flex alignment */}
          <motion.div
            // Removed initial and whileInView animation props
            // initial={{ y: "100%", opacity: 0 }}
            // whileInView={{ y: 0, opacity: 1 }}
            // transition={{ duration: 0.8 }}
            // viewport={{ once: true }}
            className="w-full max-w-screen-xl" // Removed mb-20
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col gap-5 items-start">
                <h2 className="inline-block font-[Inter Tight] font-medium text-[58px] leading-[1.1] w-[23.5%] whitespace-nowrap"> {/* Arbitrary values */}
                  Make in INDIA
                </h2>
                <div className="relative" style={{ zIndex: 1200 }}>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65e95d19-5da4-472d-67c7-755dd69be700/public"
                    alt="Make In India"
                    width={432}
                    height={229}
                    className="pl-[-2.875%] pr-[9.725%] pb-[25px]" // Negative padding/margins via arbitrary values
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-64"> {/* Fixed width text container */}
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70"> {/* Fixed width + arbitrary font style */}
                  WAE captures the heart of Indian innovation by 
                  seamlessly blending the time-honoured ideals 
                  with the latest technology. We are driven by the 
                  mission to build a brand that not only saves the 
                  planet but also creates a potent impact on 
                  future generations for the country's 
                  advancements, integrity & innovation. Our 
                  approach strengthens community resilience 
                  while showcasing India's intellectual capital on 
                  the world stage.
                </p>

              </div>
            </div>
          </motion.div>
        </section>

        {/* Sustainability Section */}
        <section className="h-screen flex items-center justify-center relative snap-center px-[9.72%]">
          <motion.div
            className="w-full max-w-screen-xl flex flex-col items-start justify-center relative"
          >
            {/* Heading on top */}
            <h2
              className="mb-20 text-left"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "58px",
                lineHeight: "110%",
                color: "#000",
              }}
            >
              Sustainability
            </h2>
            {/* Metrics row below heading */}
            <div className="flex flex-row gap-32 w-full">
              <div className="flex flex-col items-start min-w-[220px]">
                <p className="text-5xl font-semibold text-black leading-snug">
                  1,012,120.25
                </p>
                <div className="h-px w-full bg-[#D9D9DC] my-2" />
                <p className="text-sm font-normal text-black/70 tracking-wide mt-2">
                  Tonnes CO2 Emissions Saved
                </p>
              </div>
              <div className="flex flex-col items-start min-w-[220px]">
                <p className="text-5xl font-semibold text-black leading-snug">
                  12,185.43
                </p>
                <div className="h-px w-full bg-[#D9D9DC] my-2" />
                <p className="text-sm font-normal text-black/70 tracking-wide mt-2">
                  Million Gallons Water Saved
                </p>
              </div>
              <div className="flex flex-col items-start min-w-[220px]">
                <p className="text-5xl font-semibold text-black leading-snug">
                  22,253.65
                </p>
                <div className="h-px w-full bg-[#D9D9DC] my-2" />
                <p className="text-sm font-normal text-black/70 tracking-wide mt-2">
                  Tonnes Plastic Removed
                </p>
              </div>
            </div>
          </motion.div>
        </section>
        </div>

        {/* RELATED INFORMATION SECTION */}
        <section
          className="max-w-full px-[8.75rem] py-[120px] bg-white"
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
          <h2 className="font-helvetica text-[3.625rem] leading-[110%] mb-[2.5rem] font-normal">
            Blogs
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[272px] h-[272px]">
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
                <h3 className="text-lg line-height-[120%] font-medium mb-2">From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future</h3>
                <p className="text-sm text-gray-600">
                  In the quiet halls of Kyoto in 1997, something monumental began   a collective awakening of the world's conscience towards the mounting crisis of climate change.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[272px] h-[272px]">
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
                <h3 className="text-lg font-medium line-height-[120%] mb-2">Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective</h3>
                <p className="text-sm text-gray-600">
                  The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[272px] h-[272px]">
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
                <h3 className="text-lg font-medium line-height-[120%] mb-2">The Ozone Crisis: A Success Story in Environmental Cooperation</h3>
                <p className="text-sm text-gray-600">
                  It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth. This protective shield—the ozone layer—sits between 10 to 50 kilometres above the surface and has for millions of years absorbed nearly 97–99% of the Sun's harmful ultraviolet-B (UV-B) radiation.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="relative w-[272px] h-[272px]">
                {/* Base image - full opacity */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcd53b1-c103-4faf-bd00-29a04ff0ee00/public"
                  alt="Industrial Revolution to the Carbon Age"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: 1 }}
                />
                {/* Hover image - initially transparent */}
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13245178-9299-4091-ebca-89c63b972600/public"
                  alt="Industrial Revolution to the Carbon Age Hover"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 hover:opacity-100"
                  style={{ zIndex: 10 }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium line-height-[120%] mb-2">Industrial Revolution to the Carbon Age: How We Got There</h3>
                <p className="text-sm text-gray-600">
                  The story begins in the smoky heart of 18th-century England. Coal dust filled the air as the first every corner of the globe. What started as the Industrial Revolution an era of machines and mechanization quickly became something far more consequential: the dawn of the Carbon Age.
                </p>
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
      </motion.div>

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