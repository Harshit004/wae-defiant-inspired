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
      className="w-fit px-4 py-[11.5px] transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif", // Note: Inline style for font
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        // textTransform: "uppercase",
        backgroundColor: hovered ? "#000" : "#fff",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
      }}
    >
      {children(hovered)}
    </button>
  );
};

/**
 * Inverted hover button component with flipped colors and borders.
 */
const InvertedHoverButton: FC<HoverButtonProps> = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-4 py-[11.5px] transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        backgroundColor: hovered ? "#fff" : "#000",
        border: "1px solid #fff",
        cursor: "pointer",
        color: hovered ? "#000" : "#fff",
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
        <header ref={headerRef} className="w-full bg-white relative z-10 pb-[5.1px]">
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
      </div>

      {/* HERO SECTION */}
      <div className="relative w-full">
        <img
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c347e0c1-d161-4635-e634-d10e5a8a5000/public"
          alt="Media and Updates Hero"
          className="w-full h-auto"
          style={{ width: "100vw", height: "auto" }}
        />
        
        {/* Text Overlay at 65% from top */}
        <div 
          className="absolute left-0 right-0 flex flex-col items-center justify-center"
          style={{ top: "65%" }}
        >
          <h1 
            style={{
              fontFamily: 'Inter Tight',
              fontWeight: 500,
              fontStyle: 'Medium',
              fontSize: '58px',
              lineHeight: '110.00000000000001%',
              letterSpacing: '0%',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#fff',
              marginBottom: '16px'
            }}
          >
            Latest from WAE
          </h1>
          
          <p 
            style={{
              fontFamily: 'Inter Tight',
              fontWeight: 400,
              fontStyle: 'Regular',
              fontSize: '24px',
              lineHeight: '110.00000000000001%',
              letterSpacing: '0%',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#fff',
              marginBottom: '32px',
              maxWidth: '66.18%'
            }}
          >
            Official announcements, media coverage, awards, and events that define our journey toward sustainable transformation.
          </p>
          
          <HoverButton>
            {(hovered) => (
              <>
                <span style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }} className="md:text-[10px] md:font-medium">
                  Explore All Updates
                </span>
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
      

      {/* NEWS AND UPDATES */}
      <section className="px-[9.72%] py-[100px] bg-black">
        <div>
            <img
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/53ee5bb0-25f9-4a95-21e1-96d62b592e00/public"
            alt="News and Updates"
            className="w-full h-auto mb-4"
            />
            <p className="mb-4"
              style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '14px',
                lineHeight: '24px',
                letterSpacing: '0%',
                textAlign: 'justify',
                color: '#BAB8B8'
              }}
            >
              Press Release
            </p>
            <h3 className="mb-3"
              style={{
                fontFamily: 'Inter Tight',
                fontWeight: 600,
                fontStyle: 'SemiBold',
                fontSize: '24px',
                lineHeight: '40px',
                letterSpacing: '0%',
                color: '#FFFFFF'
              }}
            >
              WAE Receives CII Design Excellence Award 2025 for Sustainable Water Technology
            </h3>
            <p className="mb-4"
              style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '14px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#FFFFFF'
              }}
            >
              In the quiet halls of Kyoto in 1997, something monumental began a collective awakening of the world's conscience towards the mounting crisis of climate change. What followed was a turbulent 
              yet determined journey, a series of historic global agreements that would shape the planet's climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline it's the 
              story of how humanity has tried, failed, and continued to try again in its battle against a warming world.
            </p>
            <div 
              className="flex justify-between items-center"
              style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '14px',
                lineHeight: '24px',
                letterSpacing: '0%',
                textAlign: 'justify',
                color: '#BAB8B8'
              }}
            >
              <span>Nov 04, 2025</span>
              <span>|</span>
              <Link href="#">
                  <span 
                    style={{
                      textDecoration: 'underline',
                      textDecorationStyle: 'solid',
                      textDecorationThickness: '0%',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Read Release
                  </span>
                </Link>
            </div>
            
        </div>
        <div className="flex justify-between gap-x-[40px]">
            <div>
                <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8a9f68e5-d89a-411f-a65e-0190a1f90900/public"
                alt="News and Updates"
                className="w-full h-auto mb-4"
                />
                <p className="mb-4"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0%',
                    textAlign: 'justify',
                    color: '#BAB8B8'
                }}
                >
                Press Release
                </p>
                <h3 className="mb-3"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 600,
                    fontStyle: 'SemiBold',
                    fontSize: '24px',
                    lineHeight: '40px',
                    letterSpacing: '0%',
                    color: '#FFFFFF'
                }}
                >
                WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses
                </h3>
                <p className="mb-4"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '14px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#FFFFFF'
                }}
                >
                In the quiet halls of Kyoto in 1997, something monumental began a collective awakening of 
                the world’s conscience towards the mounting crisis of climate change. What followed was a 
                turbulent yet determined journey, a series of historic global agreements that would shape the 
                planet’s climate policy for decades to come, culminating (for now) in COP28. This is not just a 
                timeline it's the story of how humanity has tried, failed, and continued to try again in its battle 
                against a warming world.  
                </p>
                <div 
                className="flex justify-between items-center"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0%',
                    textAlign: 'justify',
                    color: '#BAB8B8'
                }}
                >
                <span>Nov 04, 2025</span>
                <span>|</span>
                <Link href="#">
                  <span 
                    style={{
                      textDecoration: 'underline',
                      textDecorationStyle: 'solid',
                      textDecorationThickness: '0%',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Read Release
                  </span>
                </Link>
                </div>
                
            </div>
            <div>
                <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cfb2d014-953e-48c6-9ca6-bb0adba70f00/public"
                alt="News and Updates"
                className="w-full h-auto mb-4"
                />
                <p className="mb-4"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0%',
                    textAlign: 'justify',
                    color: '#BAB8B8'
                }}
                >
                Press Release
                </p>
                <h3 className="mb-3"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 600,
                    fontStyle: 'SemiBold',
                    fontSize: '24px',
                    lineHeight: '40px',
                    letterSpacing: '0%',
                    color: '#FFFFFF'
                }}
                >
                WAE Unveils Next-Gen Glass Bottling Plant at IHE Expo 2025
                </h3>
                <p className="mb-4"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '14px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#FFFFFF'
                }}
                >
                In the quiet halls of Kyoto in 1997, something monumental began a collective awakening of 
                the world’s conscience towards the mounting crisis of climate change. What followed was a 
                turbulent yet determined journey, a series of historic global agreements that would shape the 
                planet’s climate policy for decades to come, culminating (for now) in COP28. This is not just a 
                timeline it's the story of how humanity has tried, failed, and continued to try again in its battle 
                against a warming world.  
                </p>
                <div 
                className="flex justify-between items-center"
                style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0%',
                    textAlign: 'justify',
                    color: '#BAB8B8'
                }}
                >
                <span>Nov 04, 2025</span>
                <span>|</span>
                <Link href="#">
                  <span 
                    style={{
                      textDecoration: 'underline',
                      textDecorationStyle: 'solid',
                      textDecorationThickness: '0%',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Read Release
                  </span>
                </Link>
                </div>  
            </div>
        </div>
      </section>

      {/* IN THE NEWS */}
      <section className="px-[9.72%] py-[100px] bg-white">
        <h2 className="mb-10"
            style={{
              fontFamily: 'Inter Tight',
              fontWeight: 500,
              fontStyle: 'Medium',
              fontSize: '40px',
              lineHeight: '110.00000000000001%',
              letterSpacing: '0px',
              verticalAlign: 'middle',
            }}
        >
          In the News
        </h2>
        <div className="flex justify-between gap-x-[24px]">
            <div>
                <img 
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2f5da517-eb84-4ad8-6c55-658fe1e3c300/public" 
                alt="From Activism to Infrastructure: How WAE is Redefining Water Sustainability" 
                className="mb-5"
                />
                <h3 className="mb-[34px]"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                }}
                >
                From Activism to Infrastructure: How WAE is Redefining Water Sustainability
                </h3>
                <p className="mb-[71px]"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '14px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#808080'
                }}
                >
                A deep dive into how WAE is transforming sustainable water access at scale…
                </p>
                <div className="flex justify-between items-center"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '12px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#808080'
                }}
                >
                    <span>12 Nov 2024</span>
                    <span>Read on FNBnews.com</span>
                </div>
            </div>
            <div>
                <img 
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2f5da517-eb84-4ad8-6c55-658fe1e3c300/public" 
                alt="WAE’s ‘Our Green Is Blue’ Philosophy Leads the Circular Economy Movement" 
                className="mb-5"
                />
                <h3 className="mb-[34px]"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                }}
                >
                WAE’s ‘Our Green Is Blue’ Philosophy Leads the Circular Economy Movement
                </h3>
                <p className="mb-[71px]"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '14px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#808080'
                }}
                >
                The philosophy shaping India’s next leap in sustainable water management…
                </p>
                <div className="flex justify-between items-center"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '12px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#808080'
                }}
                >
                    <span>12 Nov 2024</span>
                    <span>Read on FNBnews.com</span>
                </div>
            </div>
            <div>
                <img 
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2f5da517-eb84-4ad8-6c55-658fe1e3c300/public" 
                alt="From Activism to Infrastructure: How WAE is Redefining Water Sustainability" 
                className="mb-5"
                />
                <h3 className="mb-[34px]"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                }}
                >
                From Activism to Infrastructure: How WAE is Redefining Water Sustainability
                </h3>
                <p className="mb-[71px]"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '14px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#808080'
                }}
                >
                A deep dive into how WAE is transforming sustainable water access at scale…
                </p>
                <div className="flex justify-between items-center"
                style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '12px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#808080'
                }}
                >
                    <span>12 Nov 2024</span>
                    <span>Read on FNBnews.com</span>
                </div>
            </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="py-[100px] bg-black relative" style={{ paddingLeft: '9.72%', paddingRight: '9.72%' }}>
        {/* Title and Description - Absolute positioned at left */}
        <div style={{ 
          position: 'absolute',
          top: '100px',
          left: '140px',
          width: '256px'
        }}>
          <h2 className="mb-4 text-white" style={{
            fontFamily: 'Inter Tight',
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '100%',
            letterSpacing: '0px',
          }}>
            Awards & Recognitions
          </h2>
          <p style={{
            fontFamily: 'Inter Tight',
            fontWeight: 300,
            fontSize: '18px',
            lineHeight: '100%',
            letterSpacing: '0px',
            color: '#FFFFFF99'
          }}>
            It is a long established fact that a reader will be 
            distracted by the readable content of a page 
            when looking at its layout. The point of using 
            Lorem Ipsum is that it has a more-or-less normal 
            distribution of letters
          </p>
        </div>

        {/* Container for all images - relative positioning */}
        <div style={{ position: 'relative', height: '1261px' }}>
          {/* Image 1: 568x509 at top: 100px, left: 436px */}
          <div style={{
            position: 'absolute',
            // top: '100px',
            left: '296px', // 436 - 140 (section padding)
            width: '824px', // 568 + 20 + 256
            display: 'flex',
            gap: '40px'
          }}>
            <img 
              src="https://placehold.co/568x509" 
              alt="Award 1"
              style={{ width: '568px', height: '509px', objectFit: 'cover' }}
            />
            {/* Text content for Image 1 */}
            <div>
              <div className="flex justify-between items-start mb-[12px]">
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                }}>
                  12 Nov 2024
                </span>
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                }}>
                  Read on FNBnews.com
                </span>
              </div>
              
              <h3 className="mb-[12px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                color: '#FFFFFF',
              }}>
                CII Design Excellence Award 2025
              </h3>
              
              <p className="mb-[24px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '110%',
                color: '#FFFFFF',
              }}>
                WAE unveils its award-winning design-led<br />bottling system.
              </p>
              
                <InvertedHoverButton>
                    {(hovered) => (
                        <>
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                        }}>
                            View Story
                        </span>
                        <div className="relative inline-block w-4 h-4">
                            <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
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
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                alt="icon hover"
                                width={16}
                                height={16}
                            />
                            </motion.div>
                        </div>
                        </>
                    )}
                </InvertedHoverButton>
            </div>
          </div>

          {/* Image 2: 256x252 at top: 314px, left: 1044px */}
          <div style={{
            position: 'absolute',
            top: '214px',
            left: '904px', // 1044 - 140 (section padding)
            width: '256px',
            height: '252px'
          }}>
            <img 
              src="https://placehold.co/256x252" 
              alt="Award 2"
              className="w-full h-full object-cover"
            />
            
            {/* Text content for Image 2 */}
            <div className="mt-[20px]">
              <div className="flex justify-between items-start mb-[12px]">
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                }}>
                  12 Nov 2024
                </span>
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                }}>
                  Read on FNBnews.com
                </span>
              </div>
              
              <h3 className="mb-[12px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                color: '#FFFFFF',
              }}>
                IHE Expo 2025
              </h3>
              
              <p className="mb-[24px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '110%',
                color: '#FFFFFF',
              }}>
                WAE unveils its award-winning design-led<br />bottling system.
              </p>
              
              <InvertedHoverButton>
                    {(hovered) => (
                        <>
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                        }}>
                            View Story
                        </span>
                        <div className="relative inline-block w-4 h-4">
                            <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
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
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                alt="icon hover"
                                width={16}
                                height={16}
                            />
                            </motion.div>
                        </div>
                        </>
                    )}
                </InvertedHoverButton>
            </div>
          </div>

          {/* Image 3: 522x224 at top: 649px, left: 140px */}
          <div style={{
            position: 'absolute',
            top: '549px',
            left: '0px', // 140 - 140 (section padding)
            width: '778px', // 522 + 20 + 256
            display: 'flex',
            gap: '20px'
          }}>
            <img 
              src="https://placehold.co/522x224" 
              alt="Award 3"
              style={{ width: '522px', height: '224px', objectFit: 'cover' }}
            />
            {/* Text content for Image 3 */}
            <div>
              <div className="flex justify-between items-start mb-[12px]">
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                }}>
                  12 Nov 2024
                </span>
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                }}>
                  Read on FNBnews.com
                </span>
              </div>
              
              <h3 className="mb-[12px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                color: '#FFFFFF',
              }}>
                IHE Expo 2025
              </h3>
              
              <p className="mb-[24px] whitespace-nowrap" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '110%',
                color: '#FFFFFF',
              }}>
                WAE unveils its award-winning design-led<br />bottling system.
              </p>
              
              <InvertedHoverButton>
                    {(hovered) => (
                        <>
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                        }}>
                            View Story
                        </span>
                        <div className="relative inline-block w-4 h-4">
                            <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
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
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                alt="icon hover"
                                width={16}
                                height={16}
                            />
                            </motion.div>
                        </div>
                        </>
                    )}
                </InvertedHoverButton>
            </div>
          </div>

          {/* Image 4: 256x252 at top: 913px, left: 140px */}
          <div style={{
            position: 'absolute',
            top: '813px',
            left: '0px', // 140 - 140 (section padding)
            width: '256px',
            height: '252px'
          }}>
            <img 
              src="https://placehold.co/256x252" 
              alt="Award 4"
              className="w-full h-full object-cover"
            />
            
            {/* Text content for Image 4 */}
            <div className="mt-[20px]">
              <div className="flex justify-between items-start mb-[12px]">
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                }}>
                  12 Nov 2024
                </span>
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                }}>
                  Read on FNBnews.com
                </span>
              </div>
              
              <h3 className="mb-[12px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                color: '#FFFFFF',
              }}>
                IHE Expo 2025
              </h3>
              
              <p className="mb-[24px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '110%',
                color: '#FFFFFF',
              }}>
                WAE unveils its award-winning design-led<br />bottling system.
              </p>
              
              <InvertedHoverButton>
                    {(hovered) => (
                        <>
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                        }}>
                            View Story
                        </span>
                        <div className="relative inline-block w-4 h-4">
                            <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
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
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                alt="icon hover"
                                width={16}
                                height={16}
                            />
                            </motion.div>
                        </div>
                        </>
                    )}
                </InvertedHoverButton>
            </div>
          </div>

          {/* Image 5: 588x348 at top: 913px, left: 436px */}
          <div style={{
            position: 'absolute',
            top: '813px',
            left: '296px', // 436 - 140 (section padding)
            width: '844px', // 588 + 20 + 256
            display: 'flex',
            gap: '20px'
          }}>
            <img 
              src="https://placehold.co/588x348" 
              alt="Award 5"
              style={{ width: '588px', height: '348px', objectFit: 'cover' }}
            />
            
            {/* Text content for Image 5 */}
            <div>
              <div className="flex justify-between items-start mb-[12px]">
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                }}>
                  12 Nov 2024
                </span>
                <span style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                }}>
                  Read on FNBnews.com
                </span>
              </div>
              
              <h3 className="mb-[12px]" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                color: '#FFFFFF',
              }}>
                IHE Expo 2025
              </h3>
              
              <p className="mb-[24px] whitespace-nowrap" style={{
                fontFamily: 'Inter Tight',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '110%',
                color: '#FFFFFF',
              }}>
                WAE unveils its award-winning design-led<br />bottling system.
              </p>
              
              <InvertedHoverButton>
                    {(hovered) => (
                        <>
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                        }}>
                            View Story
                        </span>
                        <div className="relative inline-block w-4 h-4">
                            <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
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
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                alt="icon hover"
                                width={16}
                                height={16}
                            />
                            </motion.div>
                        </div>
                        </>
                    )}
                </InvertedHoverButton>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS & EXHIBITIONS */}
      <section className="px-[7.77%] py-[120px] bg-white" >
        <div className="flex justify-between">
            <div className="max-w-[24.5%] mr-16">
                <h2 className="mb-4"
                style={{
                fontFamily: 'Inter Tight',
                fontWeight: 700,
                fontStyle: 'Bold',
                fontSize: '40px',
                lineHeight: '100%',
                letterSpacing: '0px',
                verticalAlign: 'middle',
                }}>
                Events & Exhibitions
                </h2>
                <p style={{
                fontFamily: 'Inter Tight',
                fontWeight: 300,
                fontStyle: 'Regular',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#808080'
                }}>
                    It is a long established fact that a reader will be 
                    distracted by the readable content of a page 
                    when looking at its layout. The point of using 
                    Lorem Ipsum is that it has a more-or-less normal 
                    distribution of letters
                </p>
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <img className="mb-[10px]" src="https://placehold.co/260x307" alt="Placeholder"/>
                    <div className="flex justify-between items-center mb-4"
                    style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '110.00000000000001%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#C5C5C5'
                    }}
                    >
                        <span>12 Nov 2024</span>
                        <span><u>Read on FNBnews.com</u></span>
                    </div>
                    <div className="mb-3"
                    style={{
                        fontFamily: 'Inter Tight',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '18px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                    }}>
                        IHE Expo 2025
                    </div>
                    <div className="mb-6"
                    style={{
                        fontFamily: 'Inter Tight',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '14px',
                        lineHeight: '110.00000000000001%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                        color: '#C5C5C5'
                    }}>
                        WAE unveils its award-winning design-led<br />bottling system.
                    </div>
                    <HoverButton>
                        {(hovered) => (
                        <>
                            <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            }} className="md:text-[10px] md:font-medium">
                            View Recap
                            </span>
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
                <div className="h-px w-[41px] bg-black mt-[153.5px]"></div>
                <div>
                    <img className="mb-[10px]" src="https://placehold.co/260x307" alt="Placeholder"/>
                    <div className="flex justify-between items-center mb-4"
                    style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '110.00000000000001%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#C5C5C5'
                    }}
                    >
                        <span>12 Nov 2024</span>
                        <span><u>Read on FNBnews.com</u></span>
                    </div>
                    <div className="mb-3"
                    style={{
                        fontFamily: 'Inter Tight',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '18px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                    }}>
                        IHE Expo 2025
                    </div>
                    <div className="mb-6"
                    style={{
                        fontFamily: 'Inter Tight',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '14px',
                        lineHeight: '110.00000000000001%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                        color: '#C5C5C5'
                    }}>
                        WAE unveils its award-winning design-led<br />bottling system.
                    </div>
                    <HoverButton>
                        {(hovered) => (
                        <>
                            <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            }} className="md:text-[10px] md:font-medium">
                            View Recap
                            </span>
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
                <div className="h-px w-[41px] bg-black mt-[153.5px]"></div>
                <div>
                    <img className="mb-[10px]" src="https://placehold.co/260x307" alt="Placeholder"/>
                    <div className="flex justify-between items-center mb-4"
                    style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '110.00000000000001%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#C5C5C5'
                    }}
                    >
                        <span>12 Nov 2024</span>
                        <span><u>Read on FNBnews.com</u></span>
                    </div>
                    <div className="mb-3"
                    style={{
                        fontFamily: 'Inter Tight',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '18px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                    }}>
                        IHE Expo 2025
                    </div>
                    <div className="mb-6"
                    style={{
                        fontFamily: 'Inter Tight',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '14px',
                        lineHeight: '110.00000000000001%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                        color: '#C5C5C5'
                    }}>
                        WAE unveils its award-winning design-led<br />bottling system.
                    </div>
                    <HoverButton>
                        {(hovered) => (
                        <>
                            <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            }} className="md:text-[10px] md:font-medium">
                            View Recap
                            </span>
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