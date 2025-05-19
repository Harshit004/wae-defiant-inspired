"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
// Removed: import { useInView } from "react-intersection-observer";
// Removed: import gsap from "gsap";
import Footer from "@/components/footer";
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
};

// Data for the additional sections
const extraSections = [
  { number: '01', title: 'Apprenticeship', description: 'Kickstart your career with hands-on learning at WAE. Our apprenticeship programs offer real-world experience, mentorship from industry leaders, and the chance to contribute to sustainable innovation. Join us to build skills that shape a better future for you and the planet.' },
  { number: '02', title: 'Full-Time Positions', description: 'We’re looking for passionate professionals ready to innovate, collaborate, and make a meaningful impact. Join our team full-time to shape sustainable solutions and contribute to a future where technology and responsibility go hand in hand.' },
  { number: '03', title: 'Internships', description: 'Gain real-world experience and make a difference with an internship at WAE. Work alongside industry experts, contribute to sustainable projects, and grow your skills in an environment that values curiosity, innovation, and impact.' },
  { number: '04', title: 'Short Term Projects', description: 'Collaborate on high-impact, short-term projects at WAE. Whether you are a student, freelancer, or specialist, bring your expertise to meaningful assignments that drive sustainability and innovation.' }
];

const Home: FC = () => {
  // State and refs - Removed unused and section-related ones
  const [currentTime, setCurrentTime] = useState<string>("");
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [taglineVisible, setTaglineVisible] = useState<boolean>(true); // State is calculated but not used in UI
  const headerHeroRef = useRef<HTMLDivElement>(null); // Still used in an unused effect
  const prevScrollY = useRef<number>(0);
  const [scrollingDown, setScrollingDown] = useState<boolean>(false); // Still calculated, but not used for logo movement anymore

  // Effect to force scroll position to the top on component mount
  useEffect(() => {
    // Ensure the scroll position is at the very top when the component mounts
    // Use 'instant' behavior to prevent a visible scroll animation if one was happening
    window.scroll({ top: 0, left: 0, behavior: 'instant' });
  }, []); // Empty dependency array means this effect runs only once after the initial render


  // Update tagline visibility and track scroll direction on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTaglineVisible(currentScrollY < prevScrollY.current); // taglineVisible state is unused
      setScrollingDown(currentScrollY > prevScrollY.current); // Determine if scrolling down - not used for logo anymore
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update current time (India Time) every minute - Still unused state
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

  // Measure header height to offset hero section - Still needed
  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  // Scroll-driven header/hero scaling effect - Still unused state/effect, but kept ref for now
  useEffect(() => {
    const handleScroll = () => {
      if (!headerHeroRef.current) return;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = viewportHeight * 0.8;
      const minScale = 0;

      if (scrollPosition <= 100) {
        // setHeaderHeroScale(1); // Unused state
      } else if (scrollPosition >= maxScroll) {
        // setHeaderHeroScale(minScale); // Unused state
      } else {
        const scrollRange = maxScroll - 100;
        const scrollProgress = (scrollPosition - 100) / scrollRange;
        // setHeaderHeroScale(1 - scrollProgress); // Unused state
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion scroll-driven animations - Keep for logo opacity if desired
  const { scrollYProgress } = useScroll();
  // Opacity for the sticky logo based on scroll (still using Framer Motion for this)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // Currently maps to constant 1
  // Other Framer Motion transforms appear unused in the current JSX - Still unused
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]); // Unused
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]); // Unused
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]); // Unused
  const finalPurposeOpacity = useTransform( // Unused
    [purposeOpacity, purposeVanish],
    ([pO, pV]) => pO * pV
  );
  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]); // Unused
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]); // Unused
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]); // Unused
  const finalIndiaOpacity = useTransform( // Unused
    [indiaOpacity, indiaVanish],
    ([iO, iV]) => iO * iV
  );

  // Arrays for menu items - Keep
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];
  // lineCount is calculated but not used - Still unused
  const lineCount = Math.min(productsItems.length, blueprintItems.length);

  // Tagline words split for animation - Still unused for animation
  const taglineLine1 = "To lead the way in sustainability";
  const taglineLine2 = "ahead of the rest";
  const taglineWords1 = taglineLine1.split(" "); // Unused for animation
  const taglineWords2 = taglineLine2.split(" "); // Unused for animation

   // Framer Motion animation variants - Still unused
  const containerVariants = { // Unused
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, ease: "easeInOut" },
    },
  };
  const childVariants = { // Unused
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeInOut", duration: 1 },
    },
  };


  return (
    <main className="relative">
      {/* HEADER AND HERO SECTION */}
      {/* headerHeroRef is used in an unused effect */}
      <div ref={headerHeroRef} className="fixed top-0 left-0 w-full h-screen z-0">
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
                {/* Changed <a> to <Link> for client-side navigation */}
                <Link href="/homepage3">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                    alt="WAE Logo"
                    width={78}
                    height={82}
                    style={{ cursor: 'pointer' }}
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

              {/* Tagline Animation (Rendered statically) */}
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
                    <Link href={item.href}>
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
                    <Link href={item.href}>
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

{/* Hero section (Not Fixed in this version - it's inside a fixed parent) */}
<section
          id="hero"
          className="relative h-screen w-full overflow-hidden mb-[140px]" // Hero has margin-bottom
        >
           {/* Reverted to Image as in the provided code */}
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3de3e5b8-ad6d-49f2-c1f5-1e926fa29400/public"
            alt="careers hero"
             width={1440} // Adjusted width for better fit if max-width is 1440px
             height={656} // Height from original image usage
            className="object-cover w-full max-h-[656px]" // Use h-full to fill the 100vh section
          />

          {/* Text and image overlays remain absolute within the hero */}
          <div
            className="absolute"
            style={{
              bottom: "35%",
              right: "calc(3.473%)", // Adjust right position based on container padding
              width: "393px",
              height: "159px",
            }}
          >
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e650125-8541-4682-a4e4-82d7eac54200/public"
              alt="careers overlay image"
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
            Careers
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
      </div>

      {/* SCROLL-DRIVEN CONTAINER */}
       {/* Added initial/animate opacity to address the pop-up */}
       {/* Increased delay on the transition - Note: The scroll-to-top effect might make this less noticeable/necessary */}
      <motion.div
        className="relative bg-[#F2F2F2]"
        style={{ marginTop: "100vh" }}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Sticky Logo Overlay */}
         <motion.div
          // KEEP flex justify-center class here
          className="sticky-logo pointer-events-none flex justify-center pt-[180px]"
          style={{
            position: "sticky", // Keep sticky
            top: "5%", // Keep sticky top
            zIndex: 1100, // Keep z-index
            opacity: logoOpacity, // Keep Framer Motion opacity
            // Removed transform and transition based on logoOnLeft as that logic is removed
          }}
        >
          {/* Inner div (flex item, centered by parent) */}
          <div
             className="max-w-[19.375rem] max-h-[19.375rem]"
          >
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
              alt="Center Logo"
              width={250}
              height={250}
              className="opacity-80"
            />
          </div>
        </motion.div>

        {/* Why WAE Section */}
        <div>
          <section className="h-screen/2 flex items-end justify-center relative mb-[180px]">
            {/* whileInView will still work on this motion.div using its own internal observer */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
            >
              <div className="flex flex-col lg:flex-col gap-y-[40px] items-start justify-between">
                <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight">
                  Why WAE
                </h2>
                <div className="flex flex-col gap-5 w-64">
                  <p className="w-[270px] font-[Inter Tight] text-[14px] leading-[100%] text-black/70">
                  Life at WAE is vibrant and inspiring. Our culture is a tapestry of collaboration, inclusivity, and continuous learning. Here, your professional growth is as important as your personal well-being. Enjoy a work environment that fosters creativity, supports balance, and celebrates every success. At WAE, your journey is our story.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Current Openings Section */}
        <section className="h-screen/2 flex items-end justify-center relative">
           {/* whileInView will still work on this motion.div using its own internal observer */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36"
          >
            <div className="flex flex-col lg:flex-col gap-y-[40px] items-end justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight">
                Current
                <br />
                Openings
              </h2>
              <div className="flex flex-col gap-5">
                <p className="w-[270px] font-[Inter Tight] text-[14px] leading-[110%] text-black/70">
                Discover career opportunities where innovation meets impact. At WAE, we're building a sustainable future powered by technology and driven by purpose. Explore our current openings and become part of a team that values creativity, collaboration, and real-world change.
                </p>
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
              </div>
            </div>
          </motion.div>
        </section>

        {/* 358px gap */}
        <div style={{ height: '358px' }} />

        {/* New Items-Right Sections */}
        <div className="flex flex-col items-end justify-between px-[9.72%]" style={{ gap: '358px' }}>
          {extraSections.map((sec, idx) => (
            <section key={idx} className="w-[25%]">
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: '21px',
                  lineHeight: '110%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#00000066'
                }}
              >
                {sec.number}
              </div>
              <div style={{ height: '18px' }} />
              <hr style={{ border: '0.5px solid #D9D9DC' }} />
              <div style={{ height: '18px' }} />
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: '21px',
                  lineHeight: '110%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle'
                }}
              >
                {sec.title}
              </div>
              <div style={{ height: '60px' }} />
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#00000099'
                }}
              >
                {sec.description}
              </div>
              <div style={{ height: '20px' }} />
              <HoverButton>
                  {(hovered) => (
                    <>
                      Apply Now
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
            </section>
          ))}
        </div>

        {/* FOOTER SECTION */}
        <div style={{ position: "relative", zIndex: 1200 }}>
          <Footer />
        </div>
      </motion.div>

      {/* INLINE STYLES */}
      <style jsx>{`
        .product-grid { /* Appears unused in the current JSX */
          width: 1160px;
          height: 928px;
          border-collapse: collapse;
        }
        .product-title { /* Appears unused in the current JSX */
          font-family: "Inter Tight", sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 110%;
          letter-spacing: 0px;
          vertical-align: middle;
          text-align: center;
          width: calc(232px * 2);
          height: 232px;
          box-sizing: border-box;
        }
        .product-cell { /* Appears unused in the current JSX */
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 0px;
          text-align: center;
          vertical-align: middle;
          text-transform: uppercase;
          color: #1e1e1e;
          background-color: #f2f2f2;
          width: 232px;
          height: 232px;
          padding: 0px;
          box-sizing: border-box;
        }
        .placeholder-img { /* Appears unused in the current JSX */
          object-fit: cover;
        }
        /* Styles for the custom menu hover effect */
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          /* Add transition for smoothness if needed, but text-container handles main anim */
        }
        .text-container {
          height: 12px; /* Must match line-height of the spans */
          overflow: hidden; /* Hides the second span initially */
        }
        .c-anim-btn {
          display: block;
          transition: margin-top 0.5s; /* Smooth slide animation */
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px; /* Moves the first span up, showing the second */
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-10px); /* Start off-screen */
          transition: transform 0.5s ease, opacity 0.5s ease; /* Smooth animation */
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0); /* Slide in */
          opacity: 1; /* Fade in */
        }
        .blueprint-arrow { /* Specific style for Blueprint arrow */
          transform: rotate(-45deg) translateX(-10px); /* Start rotated and off-screen */
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0); /* Slide in and maintain rotation */
          opacity: 1;
        }
      `}</style>
    </main>
  );
};

export default Home;