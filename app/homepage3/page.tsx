"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RelatedCard from "@/components/related-card";
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

const Home: FC = () => {
  // State and refs
  const [activeSection, setActiveSection] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [taglineVisible, setTaglineVisible] = useState<boolean>(true);
  const prevScrollY = useRef<number>(0);
  const [headerHeroScale, setHeaderHeroScale] = useState<number>(1);
  const headerHeroRef = useRef<HTMLDivElement>(null);

  const sections = ["hero"]; // Extendable for additional sections

  // Update tagline visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTaglineVisible(currentScrollY < prevScrollY.current);
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update current time (India Time) every minute
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

  // Set active section when hero is in view
  useEffect(() => {
    if (heroInView) setActiveSection(0);
  }, [heroInView]);

  // Measure header height to offset hero section
  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  // Scroll-driven header/hero scaling effect
  useEffect(() => {
    const handleScroll = () => {
      if (!headerHeroRef.current) return;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = viewportHeight * 0.8;
      const minScale = 0;

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

  // Framer Motion scroll-driven animations
  const { scrollYProgress } = useScroll();
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]);
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const finalPurposeOpacity = useTransform(
    [purposeOpacity, purposeVanish],
    ([pO, pV]) => pO * pV
  );
  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]);
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
  const finalIndiaOpacity = useTransform(
    [indiaOpacity, indiaVanish],
    ([iO, iV]) => iO * iV
  );

  // Menu items arrays
  const productsItems = [
    { text: "This Is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/reimagine-work" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blog" },
  ];
  const lineCount = Math.min(productsItems.length, blueprintItems.length);

  // Tagline words split for animation
  const taglineLine1 = "To lead the way in sustainability";
  const taglineLine2 = "ahead of the rest";
  const taglineWords1 = taglineLine1.split(" ");
  const taglineWords2 = taglineLine2.split(" ");

  // Framer Motion animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, ease: "easeInOut" },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
  };

  return (
    <main className="relative">
      {/* HEADER AND HERO SECTION */}
      <div ref={headerHeroRef} className="fixed top-0 left-0 w-full h-screen z-0">
        <header ref={headerRef} className="w-full bg-white relative z-10 mb-0">
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
              <div>
                <Link href="#">IDENTITY</Link>
              </div>
              <div>
                <Link href="#">ORIGIN</Link>
              </div>
              <div>
                <Link href="#">OBJECTIVE</Link>
              </div>
              <div>
                <Link href="#">INSIDE WAE</Link>
              </div>
              <div>
                <Link href="#">ETCETERA</Link>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Tagline and Menu Items */}
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
                      fontSize: "12px",
                      lineHeight: "100%",
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

        {/* HERO SECTION */}
        <section
          id="hero"
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
          style={{ marginTop: `-${headerHeight}px` }}
        >
          <video
            src="/93af6227858930534ba0ecad01b7f3f02b655c7d.mp4"
            autoPlay
            // loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute uppercase"
            style={{
              top: "558px",
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
            Scroll for more ⤵︎
          </div>
        </section>
      </div>

      {/* SCROLL-DRIVEN CONTAINER */}
      <motion.div
        className="min-h-[300vh] relative bg-[#F2F2F2] mt-screen"
        style={{ marginTop: "100vh" }}
      >
        {/* Sticky Logo Overlay */}
        <motion.div
          style={{ position: "sticky", top: "5%", zIndex: 1100, opacity: logoOpacity }}
          className="pointer-events-none flex justify-center pt-[180px]"
        >
          <div className="max-w-[19.375rem] max-h-[19.375rem]">
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
        <section className="h-screen/2 flex items-end justify-center relative mb-[180px]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight">
                Purpose
              </h2>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Being sustainable -The Underlying natural order
                  of the universe - circular continuity of the
                  natural world. Undifferentiated, endlessly self-
                  replenishing, immensely powerful and
                  impassively generous.
                </p>
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Our purpose brings together the company,
                  employees, clients and our stakeholders and
                  reconciles economic performance witha
                  positive impact on people and the planet.
                </p>
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
            </div>
          </motion.div>
        </section>

        {/* About WAE Section */}
        <section className="h-screen/2 flex items-end justify-center relative mb-[180px]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight">
                About WAE
              </h2>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  WAE captures the heart of Indian innovation by seamlessly blending time-honoured ideals with the latest technology.
                  We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations,
                  strengthening community resilience and showcasing India's intellectual capital on the world stage.
                </p>
                <Link href="/about-wae" className="contents">
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

        {/* Products and Solutions Section */}
        <div className="relative bg-white flex items-center justify-center py-[140px]" style={{ zIndex: 1200 }}>
          <table className="product-grid">
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap">
                Products &amp; Solutions
              </td>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110">
                <Link href="/products-solutions/drinking-water-stations" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">DRINKING WATER<br />STATIONS</span>
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
              <td className="product-cell">
                <Image
                  href="/products-solutions/drinking-water-stations"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/27917d14-ea56-4a80-93b9-c66ba9642400/public"
                  alt="Drinking Water Station"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell !bg-white"></td>
            </tr>
            <tr>
              <td className="product-cell">
                <Image
                  href="/products-solutions/drinking-water-faucets"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/685750d6-ec8e-491b-a214-24f13cfcb600/public"
                  alt="Water Faucet"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER FAUCETS with left and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110">
                <Link href="/products-solutions/drinking-water-faucets" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">DRINKING WATER<br />FAUCETS</span>
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
              <td className="product-cell">
                <Image
                  href="/products-solutions/drinking-water-dispensers"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b05d64d-0248-4aaf-b8c3-e8d7afccea00/public"
                  alt="Water Dispenser"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER DISPENSERS with left and right arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110">
                <Link href="/products-solutions/drinking-water-dispensers" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">DRINKING WATER<br />DISPENSERS</span>
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
              <td className="product-cell">
                <Image
                  href="/products-solutions/drinking-water-dispensers"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c4a14e-2e09-4da6-c363-84bae0088400/public"
                  alt="Water Dispenser"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
            </tr>
            <tr>
              <td className="product-cell !bg-white"></td>
              <td className="product-cell">
                <Image
                  href="/products-solutions/water-coolers-fountains"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf2a2e6e-9e0b-464a-c2ff-1a16cb1f9900/public"
                  alt="Water Cooler"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              {/* WATER COOLERS & FOUNTAINS with right and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110">
                <Link href="/products-solutions/water-coolers-fountains" className="contents">
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
              <td className="product-cell">
                <Image
                  href="/products-solutions/water-coolers-fountains"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d9688872-6e63-4d68-26e9-aec6cf1f3a00/public"
                  alt="Water Fountain"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell !bg-white"></td>
            </tr>
            <tr>
              <td className="product-cell">
                <Image
                  href="/products-solutions/public-utility-systems"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/54ccac68-6261-4097-e41c-cfa35c992100/public"
                  alt="Public Utility"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              {/* PUBLIC UTILITY SYSTEMS with left arrow */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110">
                <Link href="/products-solutions/public-utility-systems" className="contents">
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
              <td className="product-cell">
                <Image
                  href="/products-solutions/commercial-industrial-plants"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1de8f36-85d7-4958-a678-0702ece63a00/public"
                  alt="Commercial Plant"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
              {/* COMMERCIAL/INDUSTRIAL PLANTS with right arrow */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110">
                <Link href="/products-solutions/commercial-industrial-plants" className="contents">
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
              <td className="product-cell">
                <Image
                  href="/products-solutions/commercial-industrial-plants"
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a0490312-e31b-44b0-2272-8645b0d0ef00/public"
                  alt="Industrial Plant"
                  className="placeholder-img"
                  width={232}
                  height={232}
                />
              </td>
            </tr>
          </table>
        </div>


        {/* Make in INDIA Section */}
        <section className="h-screen/2 flex items-end justify-center relative pt-[180px] mb-[360px] px-[9.72%]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col gap-5 items-start">
                <h2 className="inline-block font-[Inter Tight] font-medium text-[58px] leading-[1.1] w-[23.5%] whitespace-nowrap">
                  Make in INDIA
                </h2>
                <div className="relative" style={{ zIndex: 1200 }}>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65e95d19-5da4-472d-67c7-755dd69be700/public"
                    alt="Make In India"
                    width={432}
                    height={229}
                    className="pl-[-2.875%] pr-[9.725%] pb-[25px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  The underlying natural order of the universe – circular continuity of the natural world.
                  Undifferentiated, endlessly self-replenishing, immensely powerful, and impassively generous.
                </p>
                <Link href="/make-in-india" className="contents">
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
        <section className="h-screen/2 flex items-end justify-center relative mb-[180px] px-[9.72%]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl flex flex-col lg:flex-row justify-between"
          >
            <h2
              className="inline-block"
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
        <section
          className="max-w-full px-[8.75rem] py-[120px] bg-white"
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
          <h2 className="font-helvetica text-[3.625rem] leading-[110%] mb-[2.5rem] font-normal">
            Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <Link href="/blogs/water-conservation" className="contents">
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
                title="Water Conservation"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={272}
                height={270}
              />
            </Link>
            <Link href="/blogs/policy" className="contents">
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
                title="Policy"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={272}
                height={270}
              />
            </Link>
            <Link href="/blogs/climate-change-water" className="contents">
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
                title="Climate Change & Water"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={272}
                height={270}
              />
            </Link>
            <Link href="/blogs/industry-impact-solutions" className="contents">
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
                title="Industry Impact & Solutions"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={272}
                height={270}
              />
            </Link>
          </div>
        </section>

        {/* FOOTER SECTION */}
        <div style={{ position: "relative", zIndex: 1200 }}>
          <Footer />
        </div>
      </motion.div>

      {/* INLINE STYLES */}
      <style jsx>{`
        .product-grid {
          width: 1160px;
          height: 928px;
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
          width: calc(232px * 2);
          height: 232px;
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
          background-color: #f2f2f2;
          width: 232px;
          height: 232px;
          padding: 0px;
          box-sizing: border-box;
        }
        .placeholder-img {
          object-fit: cover;
        }
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
  );
};

export default Home;