"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Still used for Hero InView
import RelatedCard from "@/components/related-card"; // Assuming this component exists
import Footer from "@/components/footer"; // Assuming this component exists
import Link from "next/link";
import NewsGrid from "@/components/news-grid"

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
        <section
          id="hero"
          ref={heroRef}
          className="w-full flex items-center justify-center bg-white"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
          <div className="w-screen flex items-center justify-center">
            <video
              src="/News_Banner.mp4"
              autoPlay
              muted
              playsInline
              className="w-fit h-fit object-cover rounded-none"
            />
          </div>
          
        </section>
      

      {/* IN THE NEWS */}
      <section className="px-[9.72%] py-[100px]">
        <h2 className="mb-4"
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
          News & Press Release
        </h2>

        <p style={{
          fontFamily: 'Inter Tight',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: '18px',
          lineHeight: '100%',
          letterSpacing: '0px',
          color: '#00000099'
        }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its 
          layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
        </p>

        {/* News flash */}
        <div className="mt-[60px]">
          <NewsGrid />
        </div>

       
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="px-[9.72%] py-[100px]">
        <h2 className="mb-4"
          style={{
            fontFamily: 'Inter Tight',
            fontWeight: 500,
            fontStyle: 'Medium',
            fontSize: '40px',
            lineHeight: '100%',
            letterSpacing: '0px',
          }}
        >
          Awards & Recognitions
        </h2>

        <p className="mb-15" style={{
          fontFamily: 'Inter Tight',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: '18px',
          lineHeight: '100%',
          letterSpacing: '0px',
          color: '#00000099'
        }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its 
          layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
        </p>

        {/* Award Showcase */}
        <div className="mt-12 space-y-10">
          {/* First Row: Bigger then Smaller */}
          <div className="flex gap-8">
            {/* Bigger Image */}
            <div style={{ width: '61.89655%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f91b85c6-cabd-4e8e-af67-d80e0d161a00/public"
                alt="CII Design Excellence Award"
                width={717}
                height={400}
                className="w-full h-[356px]"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#000000'
                }}>
                  CII Design Excellence Award 2025
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#00000099'
                }}>
                  Recognized for breakthrough innovation in water technology.
                </p>
                <button className="px-6 py-3 bg-black text-white border border-black" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '100%',
                  transition: 'all 500ms ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.transition = 'color 900ms ease';
                    arrow.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.color = 'white';
                  }
                }}>
                  <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                  <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease' }}>↗</span>
                </button>
              </div>
            </div>

            {/* Smaller Image */}
            <div style={{ width: '34.65517%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a42c2a56-6e86-4058-f377-6eb119e82600/public"
                alt="CII Design Excellence Award"
                width={402}
                height={400}
                className="w-full h-[356px]"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#000000'
                }}>
                  CII Design Excellence Award 2025
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#00000099'
                }}>
                  Recognized for breakthrough innovation in water technology.
                </p>
                <button className="px-6 py-3 bg-black text-white border border-black" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '100%',
                  transition: 'all 500ms ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.transition = 'color 900ms ease';
                    arrow.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.color = 'white';
                  }
                }}>
                  <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                  <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease' }}>↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* Second Row: Smaller then Bigger */}
          <div className="flex gap-8">
            {/* Smaller Image */}
            <div style={{ width: '34.65517%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a42c2a56-6e86-4058-f377-6eb119e82600/public"
                alt="CII Design Excellence Award"
                width={718}
                height={356}
                className="w-full h-356"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#000000'
                }}>
                  CII Design Excellence Award 2025
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#00000099'
                }}>
                  Recognized for breakthrough innovation in water technology.
                </p>
                <button className="px-6 py-3 bg-black text-white border border-black" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '100%',
                  transition: 'all 500ms ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.transition = 'color 900ms ease';
                    arrow.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.color = 'white';
                  }
                }}>
                  <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                  <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease' }}>↗</span>
                </button>
              </div>
            </div>

            {/* Bigger Image */}
            <div style={{ width: '61.89655%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f91b85c6-cabd-4e8e-af67-d80e0d161a00/public"
                alt="CII Design Excellence Award"
                width={717}
                height={400}
                className="w-full h-[356px]"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#000000'
                }}>
                  CII Design Excellence Award 2025
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#00000099'
                }}>
                  Recognized for breakthrough innovation in water technology.
                </p>
                <button className="px-6 py-3 bg-black text-white border border-black" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '100%',
                  transition: 'all 500ms ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.transition = 'color 900ms ease';
                    arrow.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'black';
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.color = 'white';
                  }
                }}>
                  <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                  <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease' }}>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* FOOTER SECTION */}
        <div style={{ position: "relative", zIndex: 1200 }}>
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