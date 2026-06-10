"use client";

import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import RelatedCard from "@/components/related-card";
import Link from "next/link"; // Import the Link component
import ContactSection from "@/components/contact-section";
import { motion } from "framer-motion";

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  invertedColors?: boolean;
  className?: string; // Allow passing custom classes
}

/**
 * Reusable hover button component.
 */
const HoverButton: FC<HoverButtonProps> = ({ children, href, invertedColors, className }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  // The button component now accepts a className prop to allow for customization.
  // If no className is provided, it defaults to 'w-fit'.
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`px-4 py-3 transition-all duration-650 ease ${className || 'w-fit'}`}
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center", // Center content within the button
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "100%",
        backgroundColor: hovered
          ? (invertedColors ? "#f2f2f2" : "#000")
          : (invertedColors ? "#000" : "#f2f2f2"),
        border: "1px solid #00000066",
        cursor: "pointer",
        color: hovered
          ? (invertedColors ? "#000" : "#fff")
          : (invertedColors ? "#fff" : "#000"),
      }}
    >
      {children(hovered)}
    </button>
  );
};

// --- MOBILE HEADER COMPONENT (Copied from homepage3) ---
interface MobileHeaderProps {
  productsItems: { text: string; href: string }[];
  blueprintItems: { text: string; href: string }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ productsItems, blueprintItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fixed Mobile Header Bar (Visible only on small screens) */}
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-transparent md:hidden">
        {/* Mobile Logo */}
        <Link href="/">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
            alt="WAE Logo Mobile"
            width={40}
            height={40}
          />
        </Link>
        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 relative z-50 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {/* Top bar */}
          <span
            className={`block absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)' }}
          ></span>
          {/* Bottom bar */}
          <span
            className={`block absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)' }}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay (Slides in from right) */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-[80px] px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: '#000' }}
      >
        <div className="w-full h-px bg-black/10 mt[8px] mb-[30px]" />
        {/* ORIGIN & OBJECTIVE ROW */}
        <div className="grid mb-4" style={{ gridTemplateColumns: '40% 60%' }}>
          <div>
            <div style={{ fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 12 }}>ORIGIN</div>
            <div style={{ fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 14, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle', color: '#00000066' }}>
              20.5937° N<br />78.9629° E
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 12 }}>OBJECTIVE</div>
            <div style={{ fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 14, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle', color: '#00000066' }}>
              To lead the way in sustainability<br />ahead of the next
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-black/10 mb-2" />

        {/* INSIDE WAE SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{ fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase' }}>INSIDE WAE</div>
          </div>
          <div className="flex flex-col">
            {productsItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-normal py-2" style={{ fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 16, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle' }}>
                  {item.text}
                </Link>
                <div className="w-full h-px bg-black/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-black/10 mt-[12px] mb-2" />

        {/* ETCETERA SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{ fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase' }}>ETCETERA</div>
          </div>
          <div className="flex flex-col">
            {blueprintItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-normal py-2" style={{ fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 16, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle' }}>
                  {item.text}
                </Link>
                <div className="w-full h-px bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
// --- END MOBILE HEADER COMPONENT ---

const Home: FC = () => {
  const [showMountingDropdown, setShowMountingDropdown] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleDownload = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Email is valid, proceed with download
    setEmailError("");
    setShowThankYou(true);
  };

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);
  const productImages = [
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61bed0a3-d40d-46ec-2edd-a3fb53abe400/public", // Main image
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6cbe11d1-d684-43fd-b674-e948d745eb00/public", // Carousel image 1
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/875719ac-2f9e-456b-662f-d437c10dca00/public", // Carousel image 2
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : productImages.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < productImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Common button style based on the typography instructions.
  const buttonStyle: React.CSSProperties = {
    padding: "16px",
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "12px",
    letterSpacing: "0%",
    textAlign: "center",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Arrays for menu items
  const productsItems = [
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers3" },
  ];
  const blueprintItems = [
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Resources", href: "/resource-listing" },
    { text: "Blog", href: "/blogs2" },
  ];

  const featuresData = [
    {
      headline: "Built to last",
      subtext: "Crafted with premium Stainless Steel (SS-304) and corrosion-resistant Galvanized\nIron (GI), ensuring durability and safety with food-grade materials.",
    },
    {
      headline: "Touch-free convenience",
      subtext: "Experience the ease of sensor-based dispensing, delivering clean and safe water without the need for touch.",
    },
    {
      headline: "Powerful led uv-c intank sterilization",
      subtext: "Seamlessly connects with carbonated beverage dispensers\nand coffee/tea vending machines for a versatile, all-in-one solution.",
    },
    {
      headline: "Effortless integration",
      subtext: "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
    },
    {
      headline: "American disabilities act",
      subtext: "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
    },
    {
      headline: "Designed for everyone",
      subtext: "Thoughtfully engineered to be accessible for seniors, kids, and\nthose with special needs, making hydration easy for all.",
    },
    {
      headline: "Water enrichments (optional)",
      subtext: "Mineralization Alkaline",
    },
  ];

  const specificationsData = [
    { subtext1: "Variant", heading: "FS", subtext2: "VAR 150/ 100/ 50" },
    { subtext1: "Drip Try Capacity", heading: "1000ml", subtext2: "Milli Ltires" },
    { subtext1: "Hot Temperature", heading: "30°C- 80°C", subtext2: "Default 50°C" },
    { subtext1: "Cold Temperature", heading: "5°C- 24°C", subtext2: "Default 8°C" },
    { subtext1: "Compressor", heading: "220V/50 HZ", subtext2: "RZ 134a1/8 HP" },
  ];

  // --- Mobile Products Carousel logic (from homepage4) ---
  const productsCarouselRef = useRef<HTMLDivElement>(null);
  const [showProductsLeftArrow, setShowProductsLeftArrow] = useState(false);
  const [showProductsRightArrow, setShowProductsRightArrow] = useState(true);

  const handleProductsScroll = useCallback(() => {
    if (productsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productsCarouselRef.current;
      const scrollThreshold = 5;
      setShowProductsLeftArrow(scrollLeft > scrollThreshold);
      setShowProductsRightArrow(scrollLeft + clientWidth < scrollWidth - scrollThreshold);
    }
  }, []);

  const scrollProductsCarousel = (direction: 'left' | 'right') => {
    if (productsCarouselRef.current) {
      const slideWidth = productsCarouselRef.current.clientWidth;
      const scrollAmount = direction === 'right' ? slideWidth : -slideWidth;
      productsCarouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const carousel = productsCarouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleProductsScroll);
      handleProductsScroll();
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleProductsScroll);
      }
    };
  }, [handleProductsScroll]);

  return (
    <main>
      {/* RENDER MOBILE HEADER COMPONENT HERE (only on small screens) */}
      <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />
      {/* DESKTOP HEADER (Hidden on small screens) */}
      <header className="w-full bg-[#f2f2f2] relative z-10 mb-0 hidden md:block">
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
            <div><Link href="#">IDENTITY</Link></div>
            <div><Link href="#">ORIGIN</Link></div>
            <div><Link href="#">OBJECTIVE</Link></div>
            <div><Link href="#">INSIDE WAE</Link></div>
            <div><Link href="#">ETCETERA</Link></div>
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
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "11px",
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
                fontSize: "11px",
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

      {/* Product Display Section */}
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[140px]">
        {/* 80px gap after header on mobile */}
        <div className="block md:hidden" style={{ height: '80px' }} />
        <section className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0 pt-0 md:pt-[20px]">

          {/* Reduce gap after buttons before carousel to 16px */}
          <div className="block md:hidden" style={{ height: '16px' }} />

          {/* Mobile Carousel (homepage4 style) */}
          <div className="md:hidden w-full max-w-sm mx-auto relative">
            <div
              className="flex overflow-x-scroll snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
              ref={productsCarouselRef}
            >
              {productImages.map((img, idx) => (
                <div key={idx} className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] rounded-lg p-4">
                  <div className="relative w-full h-[224px]">
                    <Image
                      src={img}
                      alt={`Product Image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Arrows */}
            {showProductsLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 ml-[6%] bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollProductsCarousel('left')}
                aria-label="Previous slide"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65c77dc9-8867-4c14-2e26-180c14b84e00/public"
                  alt="Left Arrow"
                  width={40}
                  height={40}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </button>
            )}
            {showProductsRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 mr-[6%] bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollProductsCarousel('right')}
                aria-label="Next slide"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/58b7fb95-62e5-4cc5-5dc1-d798af2bdf00/public"
                  alt="Right Arrow"
                  width={40}
                  height={40}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </button>
            )}
          </div>

          {/* Desktop Carousel (existing) */}
          <div className="hidden md:flex relative w-full max-w-[550px] mb-6 md:mb-0 items-center justify-center mx-auto md:mx-0">
            {/* Previous Arrow */}
            {productImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute w-[32px] h-[32px] rounded-[8px] border border-black bg-transparent flex items-center justify-center cursor-pointer left-[-40px] top-1/2 -translate-y-1/2 z-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <div className="relative w-full h-[300px] md:h-[448px] overflow-hidden">
              <motion.div
                key={productImages[currentImageIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image
                  src={productImages[currentImageIndex]}
                  alt={`Product Image ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
            </div>
            {/* Next Arrow */}
            {productImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute w-[32px] h-[32px] rounded-[8px] border border-black bg-transparent flex items-center justify-center cursor-pointer right-[-40px] top-1/2 -translate-y-1/2 z-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Horizontal Carousel and Product Information (desktop only) */}
          <div className="hidden md:block w-full md:ml-[8.33%] flex flex-col justify-start">
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "34.13px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                marginBottom: "16px",
              }}
            >
              DRINKING WATER STATION - BLUWAE Series
            </h3>
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "48px",
                lineHeight: "100%",
                letterSpacing: "-2%",
                verticalAlign: "middle",
                marginBottom: "40px",
              }}
            >ASSISTFLOW

            </h2>
            <div className="mt-4 md:mt-0 w-full md:w-[37.7%] space-y-5 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="shrink-0 lg:flex-1 xl:w-[500px]">
                <div className="mb-5 flex flex-row justify-center gap-4 text-lg md:mb-8 md:justify-start md:gap-9 xl:mb-5">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/494ad209-e33f-4eeb-a538-a2d3a09c6200/public" alt="Hot" style={{ width: '27px', height: '27px', objectFit: 'contain' }} />
                    <h6 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'Regular',
                      fontSize: '12px',
                      lineHeight: '140%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                    }}>Hot</h6>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/691e766e-420a-4f9f-ac94-135788fcd900/public" alt="Cold" style={{ width: '27px', height: '27px', objectFit: 'contain' }} />
                    <h6 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'Regular',
                      fontSize: '12px',
                      lineHeight: '140%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                    }}>Cold</h6>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c2d10166-e1f7-48e6-2a71-5c20d8251f00/public" alt="Ambient" style={{ width: '27px', height: '27px', objectFit: 'contain' }} />
                    <h6 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'Regular',
                      fontSize: '12px',
                      lineHeight: '140%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                    }}>Ambient</h6>
                  </div>
                </div>
                <ul className="flex flex-col items-center text-center md:items-start md:text-left">
                  {featuresData.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 justify-center md:justify-start"
                      style={{
                        marginBottom: index === featuresData.length - 1 ? '0' : '0',
                      }}
                    >
                      <div className="w-2 h-2 bg-black rounded-full mt-[5px] flex-shrink-0 mx-auto md:mx-0"></div>
                      <div className="flex flex-col">
                        <h4
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 400,
                            fontStyle: 'Regular',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            verticalAlign: 'middle',
                            textTransform: 'none',
                            marginBottom: '8px',
                          }}
                          className="mx-auto md:mx-0 md:text-left"
                        >
                          {feature.headline}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 400,
                            fontStyle: 'Regular',
                            fontSize: '14px',
                            lineHeight: '24px',
                            letterSpacing: '0%',
                            verticalAlign: 'middle',
                            marginBottom: index === featuresData.length - 1 ? '0' : '20px',
                            whiteSpace: 'pre-line',
                          }}
                          className="mx-auto md:mx-0 md:text-left"
                        >
                          {feature.subtext}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Specification images SECTION */}
      <section className="max-w-full px-4 md:px-[8.75rem] py-10 md:py-[6.25rem] flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="w-full flex justify-center relative group">
          <img
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/185f2ec8-7ef2-40c2-be9d-bc5945c95f00/public"
            alt="Specification 1"
            className="rounded-lg object-contain transition-all duration-[700ms]"
            style={{ width: "38.5416vw", height: "auto" }}
          />
          <div
            className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms]"
            style={{
              background: '#00000033',
              backdropFilter: 'blur(4px)'
            }}
          />
          {/* Hover Button */}
          <button
            className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-auto px-6 py-3 border border-black"
            style={{
              fontFamily: 'Inter Tight',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '100%',
              transition: 'all 500ms ease',
              cursor: 'pointer',
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
            }}
            onClick={() => setIsPopupOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'black'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = 'black'
              const svgPath = e.currentTarget.querySelector('.button-arrow path') as SVGPathElement
              if (svgPath) {
                svgPath.style.transition = 'stroke 900ms ease'
                svgPath.style.stroke = 'white'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.color = 'black'
              e.currentTarget.style.borderColor = 'black'
              const svgPath = e.currentTarget.querySelector('.button-arrow path') as SVGPathElement
              if (svgPath) {
                svgPath.style.stroke = 'black'
              }
            }}
          >
            <span style={{ transition: 'color 500ms ease' }}>Download JPEG </span>
            <span className="ml-2 button-arrow" style={{ transition: 'stroke 900ms ease', display: 'inline-flex', alignItems: 'center' }}>
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Interface / Download">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
        <div className="w-full flex justify-center relative group">
          <img
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8487f223-98c8-4e3b-d17b-6b760b747000/public"
            alt="Specification 2"
            className="rounded-lg object-contain transition-all duration-[1000ms]"
            style={{ width: "38.5416vw", height: "auto" }}
          />
          <div
            className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms]"
            style={{
              background: '#00000033',
              backdropFilter: 'blur(4px)'
            }}
          />
          {/* Hover Button */}
          <button
            className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-auto px-6 py-3 border border-black"
            style={{
              fontFamily: 'Inter Tight',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '100%',
              transition: 'all 500ms ease',
              cursor: 'pointer',
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
            }}
            onClick={() => setIsPopupOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'black'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = 'black'
              const svgPath = e.currentTarget.querySelector('.button-arrow path') as SVGPathElement
              if (svgPath) {
                svgPath.style.transition = 'stroke 900ms ease'
                svgPath.style.stroke = 'white'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.color = 'black'
              e.currentTarget.style.borderColor = 'black'
              const svgPath = e.currentTarget.querySelector('.button-arrow path') as SVGPathElement
              if (svgPath) {
                svgPath.style.stroke = 'black'
              }
            }}
          >
            <span style={{ transition: 'color 500ms ease' }}>Download JPEG </span>
            <span className="ml-2 button-arrow" style={{ transition: 'stroke 900ms ease', display: 'inline-flex', alignItems: 'center' }}>
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Interface / Download">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Explore Other Products SECTION */}

      <section
        className="max-w-full px-4 md:px-[8.75rem] py-10 md:py-[6.25rem] bg-white"
        style={{
          position: "relative",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <h2
          className="mb-6 md:mb-[2.5rem] text-center md:text-left"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "32px",
            lineHeight: "120%",
            letterSpacing: "0%",
            verticalAlign: "middle",
          }}
        >
          Explore Other Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[40px] flex justify-between">

          {/* Card 1 - Using <a> tag */}
          <a href="/product-category/drinking-water-stations" key="drinking-water-stations"> {/* Corrected path */}
            <div className="w-full"> {/* Make card full width on mobile */}
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public" // Ensure image URLs are correct
                title="Drinking Water Station - BLUWAE Series"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={432}
                height={363}
              />
            </div>
          </a>

          {/* Card 2 - Using <a> tag */}
          <a href="/product-category/drinking-water-stations" key="drinking-water-stations"> {/* Corrected path */}
            <div className="w-full"> {/* Make card full width on mobile */}
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public" // Ensure image URLs are correct
                title="Drinking Water Station - BLUWAE Series"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={432}
                height={363}
              />
            </div>
          </a>

          {/* Card 3 - Using <a> tag */}
          <a href="/product-category/drinking-water-stations" key="drinking-water-stations"> {/* Corrected path */}
            <div className="w-full"> {/* Make card full width on mobile */}
              <RelatedCard
                image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public" // Ensure image URLs are correct
                title="Drinking Water Station - BLUWAE Series"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                width={432}
                height={363}
              />
            </div>
          </a>

        </div>
      </section>

      {/* Contact Form */}
      {/* <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[140px]"> */}
      <section className="pt-16 md:py-[100px] px-[9.72%]">
        <ContactSection />
      </section>
      {/* </div> */}

      {/* POPUP MODAL */}
      {isPopupOpen && (
        <>
          {/* Blurred Background Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setIsPopupOpen(false)}
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Popup Modal */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50"
            style={{
              width: '800px',
              // height: 'auto',
              padding: '32px 60px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button (X) */}
            <button
              onClick={() => {
                setIsPopupOpen(false)
                setShowThankYou(false)
                setEmail("")
                setEmailError("")
              }}
              className="absolute top-4 right-4 text-black hover:text-gray-600"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '24px',
                lineHeight: '1',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: '4px 8px',
              }}
              aria-label="Close popup"
            >
              ×
            </button>

            {!showThankYou ? (
              <>
                {/* "Download Now" Title */}
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '40px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    marginBottom: '12px',
                  }}
                >
                  Download Now
                </h2>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '18px',
                    lineHeight: '110.00000000000001%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    color: '#C5C5C5',
                    marginBottom: '24px',
                  }}
                >
                  Enter your email address to get the downloaded files.
                </p>

                {/* Email Input Field */}
                <div style={{ marginBottom: emailError ? '8px' : '40px' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleDownload()
                      }
                    }}
                    onBlur={() => {
                      if (email.trim() && !validateEmail(email.trim())) {
                        setEmailError("Please enter a valid email address")
                      }
                    }}
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'Regular',
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '4%',
                      textAlign: 'left',
                      color: '#00000066',
                      width: '100%',
                      padding: '24px 16px',
                      border: 'none',
                      borderBottom: emailError ? '1px solid #ff0000' : '1px solid #00000033',
                      outline: 'none',
                    }}
                  />
                  {emailError && (
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '100%',
                        color: '#ff0000',
                        marginTop: '8px',
                        textAlign: 'left',
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Download Now Button */}
                <div className="flex justify-center">
                  <button
                    className="px-6 py-3 bg-black text-white border border-black"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontStyle: 'Medium',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      width: '244px',
                      transition: 'all 500ms ease',
                      cursor: 'pointer',
                    }}
                    onClick={handleDownload}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'black'
                      e.currentTarget.style.borderColor = 'black'
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      if (arrow) {
                        arrow.style.transition = 'color 900ms ease'
                        arrow.style.color = 'black'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'black'
                      e.currentTarget.style.color = 'white'
                      e.currentTarget.style.borderColor = 'black'
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      if (arrow) {
                        arrow.style.color = 'white'
                      }
                    }}
                  >
                    <span style={{ transition: 'color 500ms ease' }}>Download Now </span>
                    <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease' }}>↗</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* "Thank You!" Title */}
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '40px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    marginBottom: '12px',
                  }}
                >
                  Thank You!
                </h2>

                {/* Thank You Message */}
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '18px',
                    lineHeight: '110.00000000000001%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    color: '#C5C5C5',
                  }}
                >
                  Please check your inbox for the downloaded files.
                </p>
              </>
            )}
          </div>
        </>
      )}

      {/* Footer Section */}
      <Footer />

      {/* Custom styles for RelatedCard titles and descriptions */}
      <style jsx>{`
        .related-card-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 120%;
          letter-spacing: 0%;
          vertical-align: middle;
        }
        .related-card-description {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 110%;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #808080;
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
          margin-top: 0;
          transition: margin-top 0.5s;
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
        .menu-arrow,
        .blueprint-arrow {
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
