"use client"

import type { FC } from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

export default function ProductDescriptionPage() {
  // State for image gallery slider
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  // Gallery images (using high-quality WAE dispenser product variations/crops)
  const productImages = [
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public"
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

  // Quick inquiry form state / modal trigger (for modern micro-interaction)
  const [isInquired, setIsInquired] = useState(false)

  return (
    <main className="relative bg-[#000000] text-white min-h-screen overflow-x-hidden selection:bg-[#004063] selection:text-white">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section 
        className="relative w-full h-screen flex flex-col justify-between bg-black z-10"
        style={{
          backgroundImage: "url('https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c69c6e9-f765-4d92-a80d-ef0688cd6600/public')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Subtle Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        
        {/* Top Spacer to push content down past Header */}
        <div className="h-[200px]" />

        {/* Hero Central Text */}
        <div className={`${containerClass} z-20 flex-grow flex flex-col justify-end pb-12`}>
          <div className="max-w-[800px] mb-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#AEAEAE] font-medium mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Experience on-demand
            </p>
            <h1 
              className="text-[36px] sm:text-[48px] md:text-[56px] font-medium leading-[1.15] text-white mb-6"
              style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: "-0.02em" }}
            >
              Plastic is passe, Landfilling is zero.<br />
              Sustainability is the future.
            </h1>
          </div>

          {/* Hero Navigation / Subbar */}
          <div className="w-full h-px bg-white/20 mb-6" />
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.15em] text-[#AEAEAE] font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            <div>SCROLL / SWIPE ↴</div>
            <div>
              <button 
                onClick={() => {
                  const element = document.getElementById("product-showcase");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white/30 bg-transparent text-white px-5 py-3 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer flex items-center gap-2"
              >
                Customize ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE SECTION */}
      <section id="product-showcase" className="relative w-full bg-[#090909] pt-28 pb-20 border-b border-white/10">
        <div className={`${containerClass} grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start`}>
          
          {/* Left Column: Interactive Product Image Gallery */}
          <div className="flex flex-col w-full">
            <div className="relative w-full aspect-[4/5] bg-[#111] border border-white/5 overflow-hidden flex items-center justify-center group">
              
              {/* Expand icon in top-right */}
              <button className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                🔍
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-between items-center mt-6 text-[11px] font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {/* Dots / Page indicator */}
              <div className="flex items-center gap-3">
                <span className="text-white/40">●</span>
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`transition-colors duration-300 ${activeImageIndex === index ? "text-white" : "text-white/40 hover:text-white"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {/* Arrow navigation buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={prevImage}
                  className="w-10 h-10 border border-white/20 hover:border-white rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  aria-label="Previous image"
                >
                  ⟨
                </button>
                <button 
                  onClick={nextImage}
                  className="w-10 h-10 border border-white/20 hover:border-white rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  aria-label="Next image"
                >
                  ⟩
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product Spec and Information */}
          <div className="flex flex-col w-full text-left">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#0081C9] font-medium mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Drinking water station • BLUWAE series
            </span>
            <h2 
              className="text-[40px] md:text-[48px] font-bold text-white mb-8"
              style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: "-0.01em" }}
            >
              ASSISTFLOW
            </h2>

            {/* Structured Features Listing */}
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Powerful LED powerful UVC sterilization
                </h3>
                <p className="text-[12px] leading-[1.6] text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Eliminates bacteria, viruses and pathogens, delivering water purified up to 99.999% for point-last hydration.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Built tough, made to last
                </h3>
                <p className="text-[12px] leading-[1.6] text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Crafted from premium Stainless Steel (SS 304) and corrosion-resistant GI, with built-in food-grade approval, critical for enduring performance.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Smart Dispensing Interface
                </h3>
                <p className="text-[12px] leading-[1.6] text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Features sensor-based touchless dispensing, real-time diagnostic indicators, and eco-friendly standby operation mode.
                </p>
              </div>
            </div>

            {/* Temperature Icons Row */}
            <div className="flex gap-10 border-t border-b border-white/10 py-6 mb-8 text-[11px] uppercase tracking-wider text-white/80 font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[#E74C3C] text-lg">☀</span>
                <span>Hot</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[#3498DB] text-lg">❄</span>
                <span>Cold</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[#2ECC71] text-lg">☰</span>
                <span>Ambient</span>
              </div>
            </div>

            {/* CTA Action button */}
            <button 
              onClick={() => {
                setIsInquired(true)
                setTimeout(() => setIsInquired(false), 3000)
              }}
              className="w-full border border-white bg-transparent py-4 text-white text-[12px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              {isInquired ? "Inquiry Sent ✓" : "Inquire Now ↗"}
            </button>
          </div>
        </div>
      </section>

      {/* TECHNICAL DETAILS / ACCORDION SECTION */}
      <section className="bg-[#090909] pb-24">
        <div className={containerClass}>
          <div className="max-w-[900px] mx-auto border-t border-white/20">
            
            {/* Accordion 1: FEATURES */}
            <div className="border-b border-white/10">
              <button 
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full py-8 flex justify-between items-center text-left text-white hover:text-[#0081C9] transition-colors duration-300"
              >
                <span className="text-[14px] uppercase tracking-widest font-bold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Features</span>
                <span className="text-[20px] font-light">{featuresOpen ? "−" : "+"}</span>
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
                    <div className="pb-8 text-[13px] text-[#AEAEAE] leading-relaxed space-y-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      <p>• Point-of-Use water station with intelligent 5-stage filtration.</p>
                      <p>• Auto-cleaning sanitization cycle using custom-built ozone systems.</p>
                      <p>• High-performance compressor cooling with environment-friendly R290 refrigerant.</p>
                      <p>• Stainless steel water reservoir and custom drip tray.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: TECHNICAL SPECS */}
            <div className="border-b border-white/10">
              <button 
                onClick={() => setSpecsOpen(!specsOpen)}
                className="w-full py-8 flex justify-between items-center text-left text-white hover:text-[#0081C9] transition-colors duration-300"
              >
                <span className="text-[14px] uppercase tracking-widest font-bold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Technical Specs</span>
                <span className="text-[20px] font-light">{specsOpen ? "−" : "+"}</span>
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
                    <div className="pb-8 text-[12px] text-[#AEAEAE]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-white/5">
                            <td className="py-3 font-semibold text-white/90">Purification Technology</td>
                            <td className="py-3 text-right">RO + UV + UVC + Mineral Balancer</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 font-semibold text-white/90">Dispensing Capacity</td>
                            <td className="py-3 text-right">60 to 120 L/hr</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 font-semibold text-white/90">Material Quality</td>
                            <td className="py-3 text-right">Premium SS 304 Food Grade</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 font-semibold text-white/90">Refrigerant Type</td>
                            <td className="py-3 text-right">R-134a / R-290 Eco-safe</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-semibold text-white/90">Power Supply</td>
                            <td className="py-3 text-right">220V - 240V / 50Hz</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Document Download Buttons */}
            <div className="flex flex-wrap gap-6 mt-12">
              <a 
                href="/brochure-download.pdf"
                onClick={(e) => {
                  e.preventDefault()
                  alert("Product Brochure download started successfully.")
                }}
                className="flex-1 min-w-[200px] border border-white/30 hover:border-white bg-transparent py-4 text-center text-white text-[11px] uppercase tracking-wider font-semibold transition-all duration-300"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Product Brochure ⤓
              </a>
              <a 
                href="/datasheet-download.pdf"
                onClick={(e) => {
                  e.preventDefault()
                  alert("Technical Datasheet download started successfully.")
                }}
                className="flex-1 min-w-[200px] border border-white/30 hover:border-white bg-transparent py-4 text-center text-white text-[11px] uppercase tracking-wider font-semibold transition-all duration-300"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Technical datasheet ⤓
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* DISCOVER MORE RECOMMENDATIONS */}
      <section className="relative w-full py-24 border-t border-white/10" style={{
        background: "radial-gradient(circle at 10% 20%, rgba(0, 64, 99, 0.4) 0%, rgba(0, 0, 0, 1) 90%)"
      }}>
        <div className={containerClass}>
          <h2 
            className="text-[32px] sm:text-[40px] font-medium text-white mb-16"
            style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: "-0.01em" }}
          >
            What else you might discover?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <div 
                key={index} 
                className="group flex flex-col bg-black/40 border border-white/5 p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#004063]/20"
              >
                {/* Dispenser Image inside recommendation card */}
                <div className="relative w-full aspect-[4/3] bg-[#0d0d0d] mb-6 overflow-hidden flex items-center justify-center">
                  <div className="relative w-[60%] h-[80%] transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public"
                      alt="BLUWAE ENKI Series"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-white font-semibold text-[14px] mb-3 hover:text-[#0081C9] transition-colors" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <span>BLUWAE ENKI Series</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
                </div>

                <p className="text-[11px] leading-relaxed text-[#AEAEAE] font-light" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Information regarding awards received by the WAE Group in various fields and related announcements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* Global CSS Style */}
      <style jsx global>{`
        body {
          background-color: #000000;
        }
      `}</style>
    </main>
  )
}