"use client"

import type { FC } from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Shared container class for consistent margins and max-width using relative dimensions
const containerClass = "mx-auto w-[85%] max-w-[1440px] px-[2vw]"

// High-fidelity SVGs for Hot, Cold, and Ambient options
const HotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="#D35400" strokeWidth="2"/>
    <line x1="12" y1="1" x2="12" y2="4" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="20" x2="12" y2="23" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="1" y1="12" x2="4" y2="12" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="12" x2="23" y2="12" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="#D35400" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const ColdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="2" x2="12" y2="22" stroke="#3498DB" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#3498DB" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#3498DB" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" stroke="#3498DB" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 5l3-3M12 5l-3-3M12 19l3 3M12 19l-3 3M5 12l-3-3M5 12l-3 3M19 12l3-3M19 12l3 3" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const AmbientIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6c3.5-3 6.5-3 10 0s6.5 3 10 0" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 12c3.5-3 6.5-3 10 0s6.5 3 10 0" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 18c3.5-3 6.5-3 10 0s6.5 3 10 0" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function ProductDescriptionPage() {
  // State for image gallery slider
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Gallery images (using 6 unique WAE dispenser images to align with the 6 dots exactly)
  const productImages = [
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public", // Front view
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", // Angle 1
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public", // Angle 2
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public", // Detail view 1
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", // Detail view 2
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public"  // Detailed setup
  ]

  // Handler for slider navigation
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  // State for accordions
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [specsOpen, setSpecsOpen] = useState(false)

  // Quick inquiry form state
  const [isInquired, setIsInquired] = useState(false)

  return (
    <main className="relative bg-[#000000] text-white min-h-screen overflow-x-hidden selection:bg-[#004063] selection:text-white">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section 
        className="relative w-full h-[100vh] flex flex-col justify-between bg-black z-10"
        style={{
          backgroundImage: "url('https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c69c6e9-f765-4d92-a80d-ef0688cd6600/public')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Solid #00000080 Overlay between background image and text */}
        <div className="absolute inset-0 bg-[#000000]/50 pointer-events-none z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
        
        {/* Top Spacer to push content down past Header */}
        <div className="h-[25vh] z-20" />

        {/* Hero Central Text */}
        <div className={`${containerClass} z-20 flex-grow flex flex-col justify-end pb-[5vh]`}>
          <div className="max-w-[65vw] mb-[4vh] text-left">
            <p 
              className="mb-0" 
              style={{ 
                fontFamily: "'Manrope', sans-serif", 
                fontWeight: 400, 
                fontSize: "1.25rem", 
                lineHeight: "100%", 
                letterSpacing: "0%", 
                verticalAlign: "middle",
                color: "#AEAEAE"
              }}
            >
              Experience on-demand
            </p>
            
            {/* 23px relative equivalent (approx 1.4rem) */}
            <div style={{ height: "1.438rem" }} />
            
            <h1 
              className="mb-[3vh]"
              style={{ 
                fontFamily: "'Inter Tight', sans-serif", 
                fontWeight: 500, 
                fontSize: "2.75rem", 
                lineHeight: "100%", 
                letterSpacing: "0%", 
                verticalAlign: "middle",
                color: "#FFFFFF"
              }}
            >
              Plastic is passe, Landfilling is zero.<br />
              Sustainability is the future.
            </h1>
          </div>

          {/* Hero Navigation / Subbar */}
          <div className="w-full h-px bg-white/20 mb-[3vh]" />
          <div className="flex justify-between items-center text-[0.625rem] uppercase tracking-[0.15em] text-[#AEAEAE] font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            <div className="flex items-center gap-1">
              SCROLL FOR MORE 
              <span className="inline-block translate-y-[1px]">↴</span>
            </div>
            <div>
              <button 
                onClick={() => {
                  const element = document.getElementById("product-showcase");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition-all duration-300 cursor-pointer flex items-center gap-2"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Contact Us ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE SECTION */}
      <section id="product-showcase" className="relative w-full bg-[#090909] pt-[12vh] pb-[8vh] border-b border-white/10">
        <div className={`${containerClass} grid grid-cols-1 lg:grid-cols-2 gap-[6vw] items-start`}>
          
          {/* Left Column: Interactive Product Image Gallery */}
          <div className="flex flex-col w-full items-start">
            {/* Carousel Container aligned at 515x646 aspect ratio in responsive vw */}
            <div 
              className="relative w-full lg:w-[35.764vw] aspect-[515/646] bg-[#0c0c0c] border border-white/5 overflow-hidden flex items-center justify-center group"
              style={{ minWidth: "320px" }}
            >
              
              {/* Expand icon in top-right corner using the requested image link */}
              <button 
                onClick={() => setIsFullscreen(true)}
                className="absolute top-[4%] right-[4%] z-20 w-[2.5rem] h-[2.5rem] bg-transparent border-0 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
                aria-label="Expand image"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9042ba9b-be65-45f2-7287-06fccd284900/public"
                    alt="Expand button"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-[75%] h-[85%]"
                >
                  <Image
                    src={productImages[activeImageIndex]}
                    alt={`ASSISTFLOW dispenser view ${activeImageIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-between items-center w-full lg:w-[35.764vw] mt-[1.5rem] text-[0.7rem] font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", minWidth: "320px" }}>
              {/* Dots / Page indicator: Current dot is big (0.5rem), others are small (0.25rem) */}
              <div className="flex items-center gap-[0.75rem]">
                {productImages.map((_, index) => {
                  const isActive = activeImageIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`rounded-full transition-all duration-300 ${isActive ? "w-[0.5rem] h-[0.5rem] bg-white" : "w-[0.25rem] h-[0.25rem] bg-white/30 hover:bg-white"}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  );
                })}
              </div>
              
              {/* Arrow navigation buttons - styled using requested custom images */}
              <div className="flex gap-[0.5rem]">
                <button 
                  onClick={prevImage}
                  className="w-[2.2rem] h-[2.2rem] border-0 bg-transparent flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
                  aria-label="Previous image"
                >
                  <Image 
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/23774ae4-4474-4209-6b7d-7b25ea8db300/public"
                    alt="Left Arrow"
                    width={35}
                    height={35}
                  />
                </button>
                <button 
                  onClick={nextImage}
                  className="w-[2.2rem] h-[2.2rem] border-0 bg-transparent flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
                  aria-label="Next image"
                >
                  <Image 
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d99053fd-043e-4c0b-62c4-19e360388000/public"
                    alt="Right Arrow"
                    width={35}
                    height={35}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product Spec and Information */}
          <div className="flex flex-col w-full text-left pt-[1%]">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-[#AEAEAE] font-medium mb-[0.75rem]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Drinking water station - BLUWAE series
            </span>
            <h2 
              className="text-[2.5rem] md:text-[3rem] font-bold text-white mb-[2rem]"
              style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: "-0.01em" }}
            >
              ASSISTFLOW
            </h2>

            {/* Structured Features Listing */}
            <div className="space-y-[1.5rem] mb-[2rem]">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white mb-[0.5rem]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Powerful LED powerful LED sterilization
                </h3>
                <p className="text-[12px] leading-[1.6] text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white mb-[0.5rem]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Built tough, made to last
                </h3>
                <p className="text-[12px] leading-[1.6] text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Crafted from premium Stainless Steel (SS-304) and corrosion -resistant GI, this unit is food-grade approved and built for enduring performance.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white mb-[0.5rem]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Built tough, made to last
                </h3>
                <p className="text-[12px] leading-[1.6] text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Lorem Ipsum dolor
                </p>
              </div>
            </div>

            {/* Temperature Icons Row - borders removed */}
            <div className="flex gap-[2.5rem] py-[1rem] mb-[2rem] text-[0.6875rem] uppercase tracking-wider text-white/80 font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              <div className="flex flex-col items-center gap-[0.5rem]">
                <div className="w-[1.5rem] h-[1.5rem]">
                  <HotIcon />
                </div>
                <span className="text-[#AEAEAE]">Hot</span>
              </div>
              <div className="flex flex-col items-center gap-[0.5rem]">
                <div className="w-[1.5rem] h-[1.5rem]">
                  <ColdIcon />
                </div>
                <span className="text-[#AEAEAE]">Cold</span>
              </div>
              <div className="flex flex-col items-center gap-[0.5rem]">
                <div className="w-[1.5rem] h-[1.5rem]">
                  <AmbientIcon />
                </div>
                <span className="text-[#AEAEAE]">Ambient</span>
              </div>
            </div>

            {/* CTA Action button */}
            <button 
              onClick={() => {
                setIsInquired(true)
                setTimeout(() => setIsInquired(false), 3000)
              }}
              className="w-full border border-white/40 bg-transparent py-[1rem] text-white text-[0.75rem] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              {isInquired ? "Inquiry Sent ✓" : "Enquire Now ↗"}
            </button>
          </div>
        </div>
      </section>

      {/* TECHNICAL DETAILS / ACCORDION SECTION */}
      <section className="bg-[#090909] pb-[8vh]">
        <div className={containerClass}>
          {/* Expanded to full containerClass width to align with left/right showcase columns */}
          <div className="w-full border-t border-white/10 text-left">
            
            {/* Accordion 1: FEATURES */}
            <div className="border-b border-white/10">
              <button 
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full py-[2rem] flex justify-between items-center text-left text-white hover:text-[#0081C9] transition-colors duration-300 cursor-pointer"
              >
                <span className="text-[0.875rem] uppercase tracking-widest font-bold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>FEATURES</span>
                <span className="w-[2rem] h-[2rem] flex items-center justify-center">
                  <Image 
                    src={featuresOpen ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/595e0004-b077-45cc-2fa8-3cd96cd2de00/public" : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/452710c0-2114-441d-1220-296341388a00/public"}
                    alt={featuresOpen ? "Collapse" : "Expand"}
                    width={32}
                    height={32}
                  />
                </span>
              </button>
              
              <AnimatePresence>
                {featuresOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-[2rem] text-[0.75rem] leading-relaxed space-y-[1.5rem]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      
                      {/* Water Options */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white/95 mb-[0.75rem]">Water Options</h4>
                        <div className="flex gap-[2rem] text-[0.625rem] uppercase tracking-wider text-white/80 font-medium">
                          <div className="flex flex-col items-center gap-[0.35rem]">
                            <div className="w-[1.25rem] h-[1.25rem]"><HotIcon /></div>
                            <span className="text-[#AEAEAE]">Hot</span>
                          </div>
                          <div className="flex flex-col items-center gap-[0.35rem]">
                            <div className="w-[1.25rem] h-[1.25rem]"><ColdIcon /></div>
                            <span className="text-[#AEAEAE]">Cold</span>
                          </div>
                          <div className="flex flex-col items-center gap-[0.35rem]">
                            <div className="w-[1.25rem] h-[1.25rem]"><AmbientIcon /></div>
                            <span className="text-[#AEAEAE]">Ambient</span>
                          </div>
                        </div>
                      </div>

                      {/* Built to last */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Built to last</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Crafted with premium Stainless Steel (SS-304) and corrosion-resistant Galvanized Iron (GI), ensuring durability and safety with food-grade materials.
                        </p>
                      </div>

                      {/* Touch-free convenience */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Touch-free convenience</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Experience the ease of sensor-based dispensing, delivering clean and safe water without the need for touch.
                        </p>
                      </div>

                      {/* Powerful led uv-c intank sterilization */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Powerful led uv-c intank sterilization</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.
                        </p>
                      </div>

                      {/* Effortless integration */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Effortless integration</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration
                        </p>
                      </div>

                      {/* American disabilities act */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">American disabilities act</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.
                        </p>
                      </div>

                      {/* Designed for everyone */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Designed for everyone</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Thoughtfully engineered to be accessible for seniors, kids, and those with special needs, making hydration easy for all.
                        </p>
                      </div>

                      {/* Water enrichments (optional) */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Water enrichments (optional)</h4>
                        <p className="text-[#AEAEAE] font-light">
                          Mineralization Alkaline
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: TECHNICAL SPECS */}
            <div className="border-b border-white/10">
              <button 
                onClick={() => setSpecsOpen(!specsOpen)}
                className="w-full py-[2rem] flex justify-between items-center text-left text-white hover:text-[#0081C9] transition-colors duration-300 cursor-pointer"
              >
                <span className="text-[0.875rem] uppercase tracking-widest font-bold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>TECHNICAL SPECS</span>
                <span className="w-[2rem] h-[2rem] flex items-center justify-center">
                  <Image 
                    src={specsOpen ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/595e0004-b077-45cc-2fa8-3cd96cd2de00/public" : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/452710c0-2114-441d-1220-296341388a00/public"}
                    alt={specsOpen ? "Collapse" : "Expand"}
                    width={32}
                    height={32}
                  />
                </span>
              </button>
              
              <AnimatePresence>
                {specsOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-[2rem] text-[0.75rem] text-[#AEAEAE] space-y-[1.5rem]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      
                      {/* Storage Capacity Variant Table */}
                      <div>
                        <div className="grid grid-cols-4 pb-2 border-b border-white/10 font-semibold text-white/90">
                          <div>Variant</div>
                          <div className="col-span-3 grid grid-cols-3 text-center">
                            <div className="col-span-3 text-left pb-2">Storage Capacity (L )</div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-[1.25rem] h-[1.25rem]"><HotIcon /></div>
                              <span className="text-[10px] text-white/60">Hot</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-[1.25rem] h-[1.25rem]"><ColdIcon /></div>
                              <span className="text-[10px] text-white/60">Cold</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-[1.25rem] h-[1.25rem]"><AmbientIcon /></div>
                              <span className="text-[10px] text-white/60">Ambient</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 py-2 border-b border-white/5 text-white/80">
                          <div>Assistflow 100</div>
                          <div className="col-span-3 grid grid-cols-3 text-center items-center">
                            <div>3</div>
                            <div>40</div>
                            <div>15</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 py-2 border-b border-white/5 text-white/80">
                          <div>Assistflow 50</div>
                          <div className="col-span-3 grid grid-cols-3 text-center items-center">
                            <div>3</div>
                            <div>40</div>
                            <div>15</div>
                          </div>
                        </div>
                      </div>

                      {/* Water Temp */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">water temp.</h4>
                        <p className="text-[#AEAEAE] font-light">Cold: 5°C - 20° C (default 8°C)</p>
                        <p className="text-[#AEAEAE] font-light">Hot: 30°C - 65° C (default 55°C)</p>
                      </div>

                      {/* Green Certification */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Green certification</h4>
                        <p className="text-[#AEAEAE] font-light">Confirms to green product certification, low discharge faucets : 1.5 LPM</p>
                      </div>

                      {/* Drip tray capacity */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Drip tray capacity</h4>
                        <p className="text-[#AEAEAE] font-light">1300 ml</p>
                      </div>

                      {/* Refrigerant */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Refrigerant</h4>
                        <p className="text-[#AEAEAE] font-light">R-134a</p>
                      </div>

                      {/* Dimensions Table */}
                      <div>
                        <div className="grid grid-cols-4 pb-2 border-b border-white/10 font-semibold text-white/90">
                          <div>Variant</div>
                          <div>Weight (Kg)</div>
                          <div className="col-span-2 grid grid-cols-3 text-center">
                            <div className="col-span-3 text-left pb-2">Dimensions (Mm)</div>
                            <div>Height</div>
                            <div>Width</div>
                            <div>Depth</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 py-2 border-b border-white/5 text-white/80">
                          <div>Assistflow 100</div>
                          <div className="text-left">-</div>
                          <div className="col-span-2 grid grid-cols-3 text-center items-center">
                            <div>1631</div>
                            <div>535</div>
                            <div>654</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 py-2 border-b border-white/5 text-white/80">
                          <div>Assistflow 51</div>
                          <div className="text-left">-</div>
                          <div className="col-span-2 grid grid-cols-3 text-center items-center">
                            <div>1631</div>
                            <div>535</div>
                            <div>654</div>
                          </div>
                        </div>
                      </div>

                      {/* Power requirement */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Power requirement</h4>
                        <p className="text-[#AEAEAE] font-light">Hertz 50/Volts 230-240</p>
                      </div>

                      {/* Purification & sterilization system */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Purification & sterilization system</h4>
                        <p className="text-[#AEAEAE] font-light">Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)</p>
                      </div>

                      {/* Point of use sterilization system(optional) */}
                      <div>
                        <h4 className="text-[0.8125rem] font-bold text-white mb-[0.25rem]">Point of use sterilization system(optional)</h4>
                        <p className="text-[#AEAEAE] font-light">Germ GuardianTM</p>
                      </div>

                      {/* Bottom Footer Notes inside Specs */}
                      <div className="text-right text-[10px] text-white/40 space-y-1 pt-4">
                        <p>*water purification products complies with ngt requirements</p>
                        <p>*Specifications are subject to change.</p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Document Download Buttons with responsive viewport layouts */}
            <div className="flex mt-[3rem]" style={{ gap: "2.361vw" }}>
              <a 
                href="/brochure-download.pdf"
                onClick={(e) => {
                  e.preventDefault()
                  alert("Product Brochure download started successfully.")
                }}
                className="border border-white/35 hover:border-white bg-transparent text-center text-white text-[0.6875rem] uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-[0.5rem]"
                style={{ 
                  fontFamily: "'Inter Tight', sans-serif",
                  width: "14.722vw",
                  height: "3.403vw",
                  minWidth: "212px",
                  minHeight: "49px"
                }}
              >
                <span>Product Brochure</span>
                <span className="relative w-[0.875rem] h-[0.875rem] inline-block">
                  <Image 
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/359ce7e1-0757-4c07-b9f1-d38ce36cf100/public"
                    alt="Download Icon"
                    fill
                    className="object-contain"
                  />
                </span>
              </a>
              <a 
                href="/datasheet-download.pdf"
                onClick={(e) => {
                  e.preventDefault()
                  alert("Technical datasheet download started successfully.")
                }}
                className="border border-white/35 hover:border-white bg-transparent text-center text-white text-[0.6875rem] uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-[0.5rem]"
                style={{ 
                  fontFamily: "'Inter Tight', sans-serif",
                  width: "16.042vw",
                  height: "3.403vw",
                  minWidth: "231px",
                  minHeight: "49px"
                }}
              >
                <span>Technical data sheet</span>
                <span className="relative w-[0.875rem] h-[0.875rem] inline-block">
                  <Image 
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/359ce7e1-0757-4c07-b9f1-d38ce36cf100/public"
                    alt="Download Icon"
                    fill
                    className="object-contain"
                  />
                </span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* DISCOVER MORE RECOMMENDATIONS */}
      <section className="relative w-full py-[12vh] border-t border-white/10" style={{
        background: "radial-gradient(circle at 10% 20%, rgba(0, 64, 99, 0.4) 0%, rgba(0, 0, 0, 1) 90%)"
      }}>
        <div className={containerClass}>
          <h2 
            className="text-[2rem] sm:text-[2.5rem] font-light text-white mb-[4rem] text-left"
            style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: "-0.01em", fontWeight: 300 }}
          >
            What else you might discover?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5vw]">
            {[1, 2, 3].map((item, index) => (
              <div 
                key={index} 
                className="group flex flex-col text-left cursor-pointer transition-all duration-500 hover:-translate-y-1"
              >
                {/* Dispenser Image inside recommendation card - styled with solid grey background */}
                <div className="relative w-full aspect-[4/3] bg-[#898989] mb-[1.5rem] overflow-hidden flex items-center justify-center rounded-none">
                  <div className="relative w-[60%] h-[80%] transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public"
                      alt="BLUWAE ENKI Series"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                {/* Text and chevron matching the mockup exactly */}
                <div className="flex items-center justify-between text-white font-medium text-[0.875rem] mt-[0.5rem] mb-[0.5rem] hover:text-[#0081C9] transition-colors" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <span>BLUWAE ENKI Series</span>
                  <span className="text-[0.875rem] text-white/80 font-normal">&gt;</span>
                </div>

                <p className="text-[0.6875rem] leading-relaxed text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Information regarding awards received by the Hitachi Group in various fields and related announcements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* FULLSCREEN LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-[1.5rem]"
            >
              ×
            </button>
            <div className="relative w-[85vw] h-[85vh]">
              <Image 
                src={productImages[activeImageIndex]} 
                alt="Product Fullscreen View" 
                fill 
                className="object-contain" 
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS Style */}
      <style jsx global>{`
        body {
          background-color: #000000;
        }
      `}</style>
    </main>
  )
}