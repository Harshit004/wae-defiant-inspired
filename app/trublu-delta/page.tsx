"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import RelatedCard from "@/components/related-card";
import Link from "next/link"; // Import the Link component
import ContactSection from "@/components/contact-section";
import { motion } from "framer-motion";

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
        fontSize: "12px",
        lineHeight: "100%",
        backgroundColor: hovered ? "#f2f2f2" : "#000",
        border: "1px solid #00000066",
        cursor: "pointer",
        color: hovered ? "#000" : "#fff",
      }}
    >
      {children(hovered)}
    </button>
  );
};

const Home: FC = () => {
  const [showMountingDropdown, setShowMountingDropdown] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = [
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/267d6f4b-afd7-42d1-c948-02c0cc588b00/public", // Main image
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/30dcf033-c808-4aba-1f0c-fa72e4022300/public", // Carousel image 1
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/774bf3ad-1dc7-4ad2-5779-ab2d15f20700/public", // Carousel image 2
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
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];

  const featuresData = [
    {
      headline: "Pure Water flow",
      subtext: "Lead-free, bacteria-resistant tubings for safe, clean water.",
    },
    {
      headline: "Energy Efficient",
      subtext: "Uses 25% less power, saving on energy costs.",
    },
    {
      headline: "fast TOUCHLESS DISPENSING",
      subtext: "Delivers ice-cold and hot water twice as fast.",
    },
    {
      headline: "Powerful LED UV-C Intank Sterilization",
      subtext: "Eliminates bacteria, viruses and pathogens, ensuring water is puried upto 99.99% for sterilized hydration",
    },
    {
      headline: "Seamless Integration",
      subtext: "Connects easily with coffee, tea, and beverage machines.",
    },
    {
        headline: "Easy Maintenance",
        subtext: "Spill-resistant, dishwasher-safe drip tray for hassle-free upkeep.",
    },
  ];

  const specificationsData = [
    { subtext1: "Variant", heading: "FS", subtext2: "GAMMA" },
    { subtext1: "Drip Try Capacity", heading: "750ml", subtext2: "Milli Ltires" },
    { subtext1: "Hot Temperature", heading: "30°C- 80°C", subtext2: "Default 50°C" },
    { subtext1: "Cold Temperature", heading: "5°C- 24°C", subtext2: "Default 8°C" },
    { subtext1: "Compressor", heading: "220V/50 HZ", subtext2: "RZ 134a 1/8 HP" },
  ];

  return (
    <main>
      {/* Normal Header */}
      <header className={`w-full relative z-10 mb-5 px-[9.72%]`}> 
          <div> 
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
                  fontFamily: "'Inter Tight', sans-serif",
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
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
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
                      fontSize: "12px",
                      lineHeight: "100%",
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

      {/* Product Display Section */}
      <section className="mx-[9.72%] mb-[9.72%] flex items-start justify-between">
        {/* Main Image */}
        <div className="relative w-[508px] h-[448px] mr-[9px] flex items-center justify-center overflow-hidden">
          <motion.div
            key={productImages[currentImageIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <Image
              src={productImages[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
            />
          </motion.div>
          {/* Previous Arrow */}
          {productImages.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute w-[32px] h-[32px] rounded-[8px] border border-black bg-transparent flex items-center justify-center cursor-pointer left-4 top-[calc(50% - 16px)] z-20"
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
          {/* Next Arrow */}
          {productImages.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute w-[32px] h-[32px] rounded-[8px] border border-black bg-transparent flex items-center justify-center cursor-pointer right-4 top-[calc(50% - 16px)] z-20"
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

        {/* Horizontal Carousel and Product Information */}
        <div className="ml-[8.33%] flex flex-col justify-start">
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
            WATER DISPENSER (W/O RO) - TRUBLU Series
          </h3>
          <h2
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "48px",
              lineHeight: "100%",
              letterSpacing: "-2%",
              verticalAlign: "middle",
              marginBottom: "32px", // Assuming 16px gap between heading and buttons
            }}
          >
            TRUBLU DELTA
          </h2>
          <div className="flex gap-4 mb-[57px]">
            <HoverButton href="/product-category">
              {(hovered) => (
                <>
                  FREE STANDING
                </>
              )}
            </HoverButton>
            {/* <HoverButton href="/product-category">
              {(hovered) => (
                <>
                  COUNTER TOP
                </>
              )}
            </HoverButton> */}
          </div>

          {/* Smaller Images Carousel */}
          <div className="flex gap-[20px]">
            {productImages.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative w-[194px] h-[202px] cursor-pointer overflow-hidden rounded-md"
                onClick={() => setCurrentImageIndex(index + 1)} // Update main image on click
              >
                <Image
                  src={image}
                  alt={`Carousel Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights SECTION */}
      <section className="mx-[9.72%] mb-[9.72%] flex md:justify-between items-start">
        {/* Left Side - Heading */}
        <div className="md:w-[31.8%]">
          <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
            KEY HIGHLIGHTS
          </h2>
        </div>

        {/* Right Side - Feature Details */}
        <div className="mt-8 md:mt-0 md:w-[37.7%] space-y-5">
            <div className="shrink-0 lg:flex-1 xl:w-[500px]">
                <div className="mb-5 flex items-center gap-4 text-lg md:mb-8 lg:gap-9 xl:mb-10">
                <div className="flex flex-col items-center justify-center gap-3">
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill: '#FF470D' }}>
                    <path d="M13.4167 20.3955C9.56553 20.3955 6.43457 17.2645 6.43457 13.4133C6.43457 9.56211 9.56553 6.43115 13.4167 6.43115C17.2679 6.43115 20.3989 9.56211 20.3989 13.4133C20.3989 17.2645 17.2679 20.3955 13.4167 20.3955ZM13.4167 7.74663C10.2917 7.74663 7.75005 10.2883 7.75005 13.4133C7.75005 16.5383 10.2917 19.08 13.4167 19.08C16.5417 19.08 19.0834 16.5383 19.0834 13.4133C19.0834 10.2883 16.5417 7.74663 13.4167 7.74663Z" fill="#FF470D"></path>
                    <path d="M13.4165 4.90029C13.0534 4.90029 12.7617 4.60863 12.7617 4.24553V0.656232C12.7617 0.293136 13.0534 0.00146484 13.4165 0.00146484C13.7796 0.00146484 14.0712 0.293136 14.0712 0.656232V4.24553C14.0712 4.60863 13.7796 4.90029 13.4165 4.90029Z" fill="#FF470D"></path>
                    <path d="M13.4165 26.8339C13.0534 26.8339 12.7617 26.5422 12.7617 26.1791V22.5898C12.7617 22.2267 13.0534 21.9351 13.4165 21.9351C13.7796 21.9351 14.0712 22.2267 14.0712 22.5898V26.1791C14.0712 26.5422 13.7796 26.8339 13.4165 26.8339Z" fill="#FF470D"></path>
                    <path d="M26.1786 14.0766H22.5893C22.2262 14.0766 21.9346 13.7849 21.9346 13.4218C21.9346 13.0588 22.2262 12.7671 22.5893 12.7671H26.1786C26.5417 12.7671 26.8334 13.0588 26.8334 13.4218C26.8334 13.7849 26.5417 14.0766 26.1786 14.0766Z" fill="#FF470D"></path>
                    <path d="M4.24406 14.0766H0.654764C0.291668 14.0766 0 13.7849 0 13.4218C0 13.0588 0.291668 12.7671 0.654764 12.7671H4.24406C4.60716 12.7671 4.89883 13.0588 4.89883 13.4218C4.89883 13.7849 4.60716 14.0766 4.24406 14.0766Z" fill="#FF470D"></path>
                    <path d="M22.4405 23.0943C22.2738 23.0943 22.1012 23.0288 21.9762 22.9038L19.4405 20.3681C19.1845 20.1121 19.1845 19.6955 19.4405 19.4395C19.6965 19.1836 20.1131 19.1836 20.3691 19.4395L22.9048 21.9752C23.1607 22.2312 23.1607 22.6479 22.9048 22.9038C22.7738 23.0348 22.6072 23.0943 22.4405 23.0943Z" fill="#FF470D"></path>
                    <path d="M6.93465 7.58258C6.76798 7.58258 6.59536 7.5171 6.47036 7.3921L3.93464 4.85638C3.67869 4.60042 3.67869 4.18376 3.93464 3.9278C4.19059 3.67185 4.60726 3.67185 4.86322 3.9278L7.39894 6.46352C7.65489 6.71948 7.65489 7.13614 7.39894 7.3921C7.26799 7.52305 7.10132 7.58258 6.93465 7.58258Z" fill="#FF470D"></path>
                    <path d="M4.39307 23.0943C4.2264 23.0943 4.05378 23.0288 3.92878 22.9038C3.67283 22.6479 3.67283 22.2312 3.92878 21.9752L6.4645 19.4395C6.72046 19.1836 7.13713 19.1836 7.39308 19.4395C7.64903 19.6955 7.64903 20.1121 7.39308 20.3681L4.85736 22.9038C4.7264 23.0348 4.55974 23.0943 4.39307 23.0943Z" fill="#FF470D"></path>
                    <path d="M19.9048 7.58258C19.7381 7.58258 19.5655 7.5171 19.4405 7.3921C19.1845 7.13614 19.1845 6.71948 19.4405 6.46352L21.9762 3.9278C22.2322 3.67185 22.6488 3.67185 22.9048 3.9278C23.1607 4.18376 23.1607 4.60042 22.9048 4.85638L20.3691 7.3921C20.2381 7.52305 20.0715 7.58258 19.9048 7.58258Z" fill="#FF470D"></path>
                    </svg>
                    <h6 className="text-[12px]">Hot</h6>
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                    <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'blue' }}>
                    <path d="M12.5 14.0731C12.1369 14.0731 11.8452 13.7814 11.8452 13.4183V0.709943C11.8452 0.346847 12.1369 0.0551758 12.5 0.0551758C12.8631 0.0551758 13.1547 0.346847 13.1547 0.709943V13.4183C13.1547 13.7814 12.8631 14.0731 12.5 14.0731Z" fill="#63CAFF"></path>
                    <path d="M12.4998 6.78175C12.3332 6.78175 12.1606 6.71628 12.0356 6.59128L8.82722 3.38293C8.57127 3.12698 8.57127 2.7103 8.82722 2.45435C9.08317 2.1984 9.49984 2.1984 9.75579 2.45435L12.4939 5.19246L15.2439 2.44245C15.4999 2.1865 15.9165 2.1865 16.1725 2.44245C16.4284 2.69841 16.4284 3.11507 16.1725 3.37103L12.9582 6.58532C12.8272 6.71627 12.6606 6.7758 12.4939 6.7758L12.4998 6.78175Z" fill="#63CAFF"></path>
                    <path d="M12.5002 14.0727C12.3871 14.0727 12.274 14.0429 12.1729 13.9834L1.16687 7.62622C0.851388 7.44169 0.744244 7.04289 0.928768 6.72741C1.10734 6.41193 1.5121 6.30479 1.82758 6.48932L12.8336 12.8465C13.149 13.031 13.2562 13.4298 13.0717 13.7453C12.9526 13.9536 12.7264 14.0727 12.5002 14.0727Z" fill="#63CAFF"></path>
                    <path d="M1.80988 11.5956C1.51821 11.5956 1.25631 11.3991 1.17297 11.1075C1.07774 10.7563 1.28607 10.3932 1.63726 10.3039L5.38132 9.29794L4.37536 5.54197C4.28013 5.19078 4.48846 4.83364 4.83965 4.7384C5.19084 4.64317 5.54799 4.8515 5.64323 5.20269L6.8218 9.59556C6.91704 9.94675 6.70871 10.3039 6.35751 10.3991L1.97655 11.5718C1.91702 11.5896 1.86345 11.5956 1.80393 11.5956H1.80988Z" fill="#63CAFF"></path>
                    <path d="M1.49401 20.4229C1.26782 20.4229 1.04758 20.3039 0.922582 20.0956C0.738058 19.7801 0.85115 19.3813 1.16067 19.1967L12.1667 12.8396C12.4821 12.6551 12.8809 12.7681 13.0655 13.0777C13.25 13.3931 13.1369 13.792 12.8274 13.9765L1.82139 20.3336C1.7202 20.3932 1.60711 20.4229 1.49401 20.4229Z" fill="#63CAFF"></path>
                    <path d="M5.01783 22.0954C4.96426 22.0954 4.90473 22.0894 4.84521 22.0716C4.49402 21.9763 4.28568 21.6192 4.38092 21.268L5.38688 17.5239L1.63091 16.518C1.27972 16.4227 1.07139 16.0656 1.16663 15.7144C1.26186 15.3632 1.62496 15.1549 1.9702 15.2501L6.36307 16.4287C6.52974 16.4763 6.6726 16.5835 6.76188 16.7323C6.85117 16.8811 6.87498 17.0656 6.82736 17.2323L5.65474 21.6132C5.57736 21.9049 5.3095 22.1013 5.01783 22.1013V22.0954Z" fill="#63CAFF"></path>
                    <path d="M12.5 26.7801C12.1369 26.7801 11.8452 26.4884 11.8452 26.1253V13.417C11.8452 13.0539 12.1369 12.7622 12.5 12.7622C12.8631 12.7622 13.1547 13.0539 13.1547 13.417V26.1253C13.1547 26.4884 12.8631 26.7801 12.5 26.7801Z" fill="#63CAFF"></path>
                    <path d="M9.28565 24.5727C9.11898 24.5727 8.94636 24.5072 8.82136 24.3822C8.56541 24.1262 8.56541 23.7096 8.82136 23.4536L12.0357 20.2393C12.2916 19.9834 12.7083 19.9834 12.9642 20.2393L16.1726 23.4477C16.4285 23.7036 16.4285 24.1203 16.1726 24.3762C15.9166 24.6322 15.5 24.6322 15.244 24.3762L12.4999 21.6381L9.74993 24.3882C9.61898 24.5191 9.45231 24.5786 9.28565 24.5786V24.5727Z" fill="#63CAFF"></path>
                    <path d="M23.512 20.4242C23.3989 20.4242 23.2858 20.3945 23.1846 20.3349L12.1786 13.9778C11.8631 13.7933 11.756 13.3944 11.9405 13.079C12.125 12.7635 12.5238 12.6564 12.8393 12.8409L23.8453 19.198C24.1608 19.3826 24.2679 19.7814 24.0834 20.0969C23.9643 20.3052 23.7381 20.4242 23.512 20.4242Z" fill="#63CAFF"></path>
                    <path d="M19.9938 22.1112C19.7021 22.1112 19.4402 21.9148 19.3569 21.6231L18.1783 17.2302C18.1307 17.0636 18.1545 16.885 18.2438 16.7302C18.3331 16.5814 18.476 16.4683 18.6426 16.4267L23.0236 15.254C23.3748 15.1588 23.7319 15.3671 23.8272 15.7183C23.9224 16.0695 23.7141 16.4326 23.3629 16.5219L19.6188 17.5278L20.6248 21.2838C20.72 21.635 20.5117 21.9981 20.1605 22.0874C20.101 22.1052 20.0474 22.1112 19.9879 22.1112H19.9938Z" fill="#63CAFF"></path>
                    <path d="M12.4999 14.0726C12.2737 14.0726 12.0534 13.9536 11.9284 13.7452C11.7439 13.4298 11.857 13.031 12.1665 12.8464L23.1725 6.48927C23.488 6.3107 23.8868 6.41784 24.0713 6.72737C24.2559 7.04284 24.1428 7.44165 23.8332 7.62618L12.8273 13.9833C12.7261 14.0429 12.613 14.0726 12.4999 14.0726Z" fill="#63CAFF"></path>
                    <path d="M23.2081 11.6013C23.1545 11.6013 23.095 11.5954 23.0355 11.5775L18.6426 10.399C18.476 10.3513 18.3331 10.2442 18.2438 10.0954C18.1545 9.94657 18.1307 9.76204 18.1783 9.59538L19.351 5.21442C19.4462 4.86323 19.8093 4.65488 20.1545 4.75012C20.5057 4.84536 20.7141 5.20251 20.6188 5.5537L19.6129 9.29776L23.3688 10.3037C23.72 10.399 23.9284 10.7561 23.8331 11.1073C23.7557 11.399 23.4879 11.5954 23.1962 11.5954L23.2081 11.6013Z" fill="#63CAFF"></path>
                    </svg>
                    <h6 className="text-[12px]">Chilled</h6>
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                    <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill: '#FFBC3A' }}>
                    <path d="M14.037 23.0027C13.8108 23.0027 13.5905 22.8836 13.4655 22.6753C13.281 22.3598 13.3941 21.961 13.7037 21.7765C15.2751 20.8717 16.3584 19.33 16.6799 17.5562C16.7453 17.1991 17.0846 16.961 17.4418 17.0265C17.7989 17.0919 18.037 17.4312 17.9715 17.7884C17.5787 19.9431 16.2632 21.8122 14.3644 22.9134C14.2632 22.9729 14.1501 23.0027 14.037 23.0027Z" fill="#FFBC3A"></path>
                    <path d="M10.8941 26.8349C4.98337 26.8349 0.173828 22.0254 0.173828 16.1146C0.173828 9.03129 10.0489 0.513394 10.4715 0.15625C10.7155 -0.0520835 11.0786 -0.0520835 11.3286 0.15625C11.7512 0.513394 21.6263 9.03129 21.6263 16.1146C21.6263 22.0254 16.8167 26.8349 10.906 26.8349H10.8941ZM10.8941 1.53126C9.00124 3.24555 1.48931 10.4182 1.48931 16.1087C1.48931 21.2932 5.70957 25.5135 10.8941 25.5135C16.0786 25.5135 20.2989 21.2932 20.2989 16.1087C20.2989 10.4182 12.781 3.24555 10.8941 1.53126Z" fill="#FFBC3A"></path>
                    <path d="M17.3643 16.1192C17.7456 16.1192 18.0548 15.8101 18.0548 15.4288C18.0548 15.0474 17.7456 14.7383 17.3643 14.7383C16.983 14.7383 16.6738 15.0474 16.6738 15.4288C16.6738 15.8101 16.983 16.1192 17.3643 16.1192Z" fill="#FFBC3A"></path>
                    </svg>
                    <h6 className="text-[12px]">Ambient</h6>
                </div>
                </div>
                <div className="mb-4 text-sm uppercase xl:mb-6 xl:max-w-[90%]">
                A Floor-standing model designed for convenient placement on the ground.
                </div>
                <ul className="">
                <li className="mb-3 flex items-center gap-3 text-[12px] uppercase last:mb-0">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    Modern and Compact Design.
                </li>
                <li className="mb-3 flex items-center gap-3 text-[12px] uppercase last:mb-0">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    Advanced 3 stage purification (UV, UF & LED-UVC)
                </li>
                <li className="flex items-center gap-3 text-[12px] uppercase last:mb-0">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    Touchless/Sensor-based operation
                </li>
                </ul>
            </div>
            </div>
      </section>

      {/* Features SECTION */}
      <section className="mx-[9.72%] mb-[9.72%] flex md:justify-between items-start">
        {/* Left Side - Heading */}
        <div className="md:w-[31.8%]">
          <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
            FEATURES
          </h2>
        </div>

        {/* Right Side - Feature Details */}
        <div className="mt-8 md:mt-0 md:w-[37.7%] space-y-5">
          {featuresData.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <h3
                  className="font-inter-tight font-normal text-sm leading-none tracking-normal align-middle uppercase"
                >
                  {feature.headline}
                </h3>
              </div>
              <p className="font-inter-tight font-normal text-xs leading-[24px] tracking-normal align-middle">
                {feature.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications SECTION */}
      <section className="mx-[9.72%] mb-[9.72%] flex md:justify-between items-start">
        {/* Left Side - Heading */}
        <div className="md:w-[31.8%]">
          <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
            SPECIFICATIONS
          </h2>
        </div>

        {/* Right Side - SPECIFICATIONS Details */}
        <div className="mt-8 md:mt-0 md:w-[37.7%] grid grid-cols-2 gap-x-[20px] gap-y-[20px]">
          {specificationsData.map((spec, index) => (
            <React.Fragment key={index}>
              <div>
                <p className="font-inter-tight font-normal text-sm leading-[21px] tracking-normal align-middle">
                  {spec.subtext1}
                </p>
                <div className="mb-[20px]" />
                <h3 className="font-inter-tight font-light text-[32px] leading-[140%] tracking-normal align-middle">
                  {spec.heading}
                </h3>
                <div className="mb-[20px]" />
                <p className="font-inter-tight font-normal text-sm leading-[21px] tracking-normal align-middle">
                  {spec.subtext2}
                </p>
              </div>
              {/* Render horizontal rule after the 2nd and 4th items */}
              {(index === 1 || index === 3) && (
                <div className="col-span-2">
                  <hr className="border-bottom-[1px] border-solid border-[#D9D9DC]" style={{ width: 'calc(50%)' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Downloads SECTION */}
      <section className="mx-[9.72%] mb-[9.72%] flex md:justify-between items-start">
        {/* Left Side - Heading */}
        <div className="md:w-[31.8%]">
          <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
            DOWNLOADS
          </h2>
        </div>

        {/* Right Side - Downloads Button */}
        <div className="mt-8 md:mt-0 md:w-[37.7%] grid grid-cols-2 gap-x-[20px] gap-y-[20px]">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Download Brochure
                        <div className="relative inline-block w-4 h-4">
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Interface / Download">
                                    <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>  
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hovered ? 1 : 0 }}
                                transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                                className="absolute top-0 left-0"
                            >
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Interface / Download">
                                    <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>  
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
        </div>
      </section>


      {/* Explore Other Products SECTION */}
      <section
      className="max-w-full px-[8.75rem] py-[7.5rem] bg-white"
      style={{
          position: "relative",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
      }}
      >
      <h2 className="font-helvetica text-[3.63rem] leading-[110%] tracking-[0%] align-middle font-normal uppercase md:whitespace-nowrap mb-[2.5rem]">
          Explore Other Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

          {/* Card 1 - Using <a> tag */}
          <a href="/product-category/drinking-water-stations" key="drinking-water-stations"> {/* Corrected path */}
          <div> {/* Keep the div if needed for styling */}
              <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public" // Ensure image URLs are correct
              title="Drinking Water Station - BLUWAE Series"
              description="Water dispensers with inbuilt purification —pure, safe water delivered efficiently. Designed to reduce plastic waste and energy consumption, making sustainability easy."
              width={272}
              height={270}
              />
          </div>
          </a>

          {/* Card 2 - Using <a> tag */}
          <a href="/product-category/water-dispenser" key="water-dispenser"> {/* Corrected path */}
          <div> {/* Keep the div if needed for styling */}
              <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public" // Ensure image URLs are correct
              title="Water Dispenser (W/O RO) - TRUBLU Series"
              description="Stainless steel water dispensers give you fresh, clean water anytime. Compact, energy-efficient, and perfect for spaces where RO water is not readily available."
              width={272}
              height={270}
              />
          </div>
          </a>

          {/* Card 3 - Using <a> tag */}
          <a href="/product-category/drinking-water-faucets" key="drinking-water-faucets"> {/* Corrected path */}
          <div> {/* Keep the div if needed for styling */}
              <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public" // Ensure image URLs are correct
              title="Drinking Water Faucets - WATERMATIC Series"
              description="Drinking water faucets with under the counter storage units to make access to fresh water simple. Precision-engineered for smooth flow, with a focus on reducing waste and energy use."
              width={272}
              height={270}
              />
          </div>
          </a>

          {/* Card 4 - Using <a> tag */}
          <a href="/product-category/water-cooler" key="water-cooler"> {/* Corrected path */}
          <div> {/* Keep the div if needed for styling */}
              <RelatedCard
              image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/08a355dd-6233-4b12-1cf5-fee8716cca00/public" // Ensure image URLs are correct
              title="Water Cooler & Fountains - ZVR Series"
              description="Water coolers cum bubblers provide chilled water on demand. Built to be energy-efficient, they're ideal for public spaces, reducing both costs and plastic waste."
              width={272}
              height={270}
              />
          </div>
          </a>

          {/* Add other hardcoded cards here following the same pattern */}

      </div>
      </section>

      {/* Contact Form */}
      <section className="pt-[140px] px-[9.72%] pb-0">
        <ContactSection />
      </section>

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