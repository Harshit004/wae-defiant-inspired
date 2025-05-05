"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

  const sections = ["hero"]; // Extendable for additional sections - used only to set active section based on heroInView

  const containerRef = useRef<HTMLDivElement>(null); // Ref is declared but not applied to an element

   // --- ADDED: Explicitly scroll to top on mount ---
   useEffect(() => {
       // Use requestAnimationFrame to ensure it runs after the browser has potentially
       // restored scroll or completed initial layout
       requestAnimationFrame(() => {
           window.scrollTo(0, 0);
       });
       // Optionally, add a slight delay if immediate scroll is jarring or ineffective
       // const timer = setTimeout(() => {
       //     window.scrollTo(0, 0);
       // }, 100); // Adjust delay as needed
       // return () => clearTimeout(timer); // Cleanup timeout

   }, []); // Empty dependency array ensures it runs only once on mount
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

  // Framer Motion scroll-driven animations (useScroll hook used)
  const { scrollYProgress } = useScroll(); // Tracks scroll progress of the window by default
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // Logo opacity linked to scroll

  // --- POTENTIAL TROUBLESHOOTING AREA ---
  // These useTransform calls have incorrect syntax and are not used in the provided code structure.
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]); // Declared but not used
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]); // Declared but not used
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]); // Declared but not used
  // Incorrect useTransform syntax: expects a MotionValue as the first arg, not an array
  const finalPurposeOpacity = useTransform(
    [purposeOpacity, purposeVanish] as any, // 'as any' to bypass TS error on incorrect usage
    ([pO, pV]: any) => pO * pV
  ); // Declared but not used

  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]); // Declared but not used
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]); // Declared but not used
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]); // Declared but not used
   // Incorrect useTransform syntax: expects a MotionValue as the first arg, not an array
  const finalIndiaOpacity = useTransform(
    [indiaOpacity, indiaVanish] as any, // 'as any' to bypass TS error on incorrect usage
    ([iO, iV]: any) => iO * iV
  ); // Declared but not used
  // --- END POTENTIAL TROUBLESHOOTING AREA ---


  // Menu items arrays
  const productsItems = [
    { text: "This Is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "#" },
    { text: "The Activist Co.", href: "/the-activist-co" }, // Note: href="#"
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
                <Link href="#">IDENTITY</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">ORIGIN</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">OBJECTIVE</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">INSIDE WAE</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">ETCETERA</Link> {/* Note: href="#" */}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Coordinates, Tagline, Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}
              <div className="flex flex-col justify-center">
                <Link href="#"> {/* Note: href="#" */}
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
                  fontSize: "12px",
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
                  fontSize: "12px",
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
                      fontSize: "12px",
                      lineHeight: "100%",
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
                      fontSize: "12px",
                      lineHeight: "100%",
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
        <section
          id="hero"
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
          style={{ marginTop: `-${headerHeight}px` }} // Offset by header height
        >
          <video
            src="/93af6227858930534ba0ecad01b7f3f02b655c7d.mp4" // Local video file
            autoPlay
            // loop // Loop is commented out
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute uppercase"
            style={{ // Inline styles for positioning and typography
              bottom: "10%",
              left: "9.72%", // Specific percentage-based left
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
      {/* This container provides the main scrollable content below the initial fixed header/hero. */}
      {/* scroll-snap-y class is REMOVED */}
      <motion.div
        className="min-h-[300vh] relative bg-[#F2F2F2] mt-screen" // mt-screen is custom tailwind, likely h-screen or 100vh
        style={{ marginTop: "100vh" }} // Explicitly pushing content down by viewport height
      >
        {/* Sticky Logo Overlay */}
        {/* This element is positioned sticky inside the scrollable container. */}
        {/* snap-start class is REMOVED */}
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

        {/* Purpose Section */}
        {/* Uses whileInView for entrance animation */}
        <section className="h-screen/2 flex items-end justify-center relative mb-[180px]"> {/* h-screen/2 is custom tailwind, likely 50vh */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight"> {/* Font style via arbitrary value in JIT mode */}
                Purpose
              </h2>
              <div className="flex flex-col gap-5 w-64"> {/* Fixed width text container */}
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70"> {/* Fixed width + arbitrary font style */}
                  Being sustainable -The Underlying natural order
                  of the universe - circular continuity of the
                  natural world. Undifferentiated, endlessly self-
                  replenishing, immensely powerful and
                  impassively generous.
                </p>
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70"> {/* Fixed width + arbitrary font style */}
                  Our purpose brings together the company,
                  employees, clients and our stakeholders and
                  reconciles economic performance witha
                  positive impact on people and the planet.
                </p>
                <Link href="/purpose" className="contents"> {/* className="contents" again */}
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

        {/* About WAE Section */}
         {/* Uses whileInView for entrance animation */}
        <section className="h-screen/2 flex items-end justify-center relative mb-[180px]"> {/* h-screen/2 is custom tailwind, likely 50vh */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight"> {/* Font style via arbitrary value */}
                About WAE
              </h2>
              <div className="flex flex-col gap-5 w-64"> {/* Fixed width text container */}
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70"> {/* Fixed width + arbitrary font style */}
                  WAE captures the heart of Indian innovation by seamlessly blending time-honoured ideals with the latest technology.
                  We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations,
                  strengthening community resilience and showcasing India's intellectual capital on the world stage.
                </p>
                <Link href="/about-wae" className="contents"> {/* className="contents" again */}
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
        <div className="relative bg-white flex items-center justify-center py-[140px]" style={{ zIndex: 1200 }}>
          {/* Uses a table for layout, with fixed sizes defined in custom CSS */}
          <table className="product-grid"> {/* Custom CSS class */}
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap"> {/* Custom CSS class */}
                Products
              </td>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-cooler" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER COOLERS &amp;<br />FOUNTAINS</span>
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
        <div className="relative bg-white flex items-center justify-center py-[140px]" style={{ zIndex: 1200 }}>
          {/* Uses a table for layout, with fixed sizes defined in custom CSS */}
          <table className="solutions-grid"> {/* Custom CSS class */}
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap"> {/* Custom CSS class */}
                Solutions
              </td>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110"> {/* Custom CSS class + Tailwind hover scale */}
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

        {/* Make in INDIA Section */}
        {/* Uses whileInView for entrance animation */}
        <section className="h-screen/2 flex items-end justify-center relative pt-[180px] mb-[360px] px-[9.72%]"> {/* h-screen/2 is custom tailwind, likely 50vh */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mb-20"
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
                  The underlying natural order of the universe – circular continuity of the natural world.
                  Undifferentiated, endlessly self-replenishing, immensely powerful, and impassively generous.
                </p>
                <Link href="/make-in-india" className="contents"> {/* className="contents" again */}
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

      {/* Sustainability Section */}
       {/* Uses whileInView for entrance animation */}
        <section className="h-screen/2 flex items-end justify-center relative mb-[180px] px-[9.72%]"> {/* h-screen/2 is custom tailwind, likely 50vh */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl flex flex-col lg:flex-row justify-between"
          >
            <h2
              className="inline-block"
              style={{ // Inline styles for typography
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "58px",
                lineHeight: "110%",
                color: "#000",
              }}
            >
              Sustainability
            </h2>
            <div className="flex flex-col gap-20">
              <div className="flex flex-col">
                <p className="text-4xl font-normal text-black leading-snug">
                  1,012,120.25
                </p>
                <p className="text-xs font-normal text-black/70 tracking-wide">
                  TONNES CO2 EMISSIONS SAVED
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-4xl font-normal text-black leading-snug">
                  12,185.4325
                </p>
                <p className="text-xs font-normal text-black/70 tracking-wide">
                  MILLION GALLONS WATER SAVED
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-4xl font-normal text-black leading-snug">
                  22,253.65
                </p>
                <p className="text-xs font-normal text-black/70 tracking-wide">
                  TONNES PLASTIC REMOVED
                </p>
              </div>
              <Link href="/sustainability-overview" className="mt-10">
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
          </motion.div>
        </section>

        {/* RELATED INFORMATION SECTION */}
        {/* This section has a white background and higher z-index */}
        <section
          className="max-w-full px-[8.75rem] py-[120px] bg-white" // Arbitrary padding
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }} // z-index to appear above the gray background
        >
          <h2 className="font-helvetica text-[3.625rem] leading-[110%] mb-[2.5rem] font-normal"> {/* Arbitrary values for font */}
            Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Assuming RelatedCard is a valid component */}
            <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c32e685-fbfe-4edb-0e63-4bbf261b3100/public"
              title="Water Conservative"
              description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
              width={272}
              height={270}
            />
            <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/67063015-a309-4a59-9247-c67c4efea500/public"
              title="Policy"
              description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
              width={272}
              height={162}
            />
            <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/efbc7ed9-3a44-4bea-0cab-e1f7ba555500/public"
              title="Climate Change & Water"
              description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
              width={272}
              height={200}
            />
            <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/afdeb7b4-18e6-4bc2-0ed8-85d97cb6dc00/public"
              title="Industry Impacts and Solutions"
              description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
              width={272}
              height={238}
            />
          </div>
        </section>

        {/* FOOTER SECTION */}
        {/* Footer likely appears at the very bottom */}
        <div style={{ position: "relative", zIndex: 1200 }}> {/* z-index to appear above the gray background */}
          {/* Assuming Footer is a valid component */}
          <Footer />
        </div>
      </motion.div>

      {/* INLINE STYLES */}
      {/* Custom CSS for specific elements and animations */}
      <style jsx>{`
        .container { /* This class is defined but not applied to any element */
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          height: 200vh; /* ADJUST THIS VALUE BASED ON YOUR CONTENT HEIGHT */
        }

        .section { /* This class is defined but not applied to any element */
          scroll-snap-align: start;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

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