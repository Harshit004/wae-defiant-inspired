"use client"

import type { FC } from "react"
import { useState, Suspense } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PRODUCTS } from "@/data/products"
import EnquireNowPopup from "@/components/EnquireNowPopup"

// Shared container class for consistent margins and max-width using relative dimensions
const containerClass = "mx-auto w-[85%] max-w-[1440px] px-[2vw]"

// High-fidelity images for Hot, Cold, and Ambient options
const HotIcon = () => (
    <img
        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/494ad209-e33f-4eeb-a538-a2d3a09c6200/public"
        alt="Hot"
        className="w-full h-full object-contain"
    />
)

const ColdIcon = () => (
    <img
        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/691e766e-420a-4f9f-ac94-135788fcd900/public"
        alt="Cold"
        className="w-full h-full object-contain"
    />
)

const AmbientIcon = () => (
    <img
        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c2d10166-e1f7-48e6-2a71-5c20d8251f00/public"
        alt="Ambient"
        className="w-full h-full object-contain"
    />
)

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V16M12 16L7 11M12 16L17 11M4 21H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)


function ProductDescriptionPageContent() {
    const searchParams = useSearchParams()
    const productId = searchParams.get("product") || "assistflow"
    const currentProduct = PRODUCTS[productId] || PRODUCTS.assistflow

    const heroImage = currentProduct.heroImage || "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c69c6e9-f765-4d92-a80d-ef0688cd6600/public"
    const heroSubtext = currentProduct.heroSubtext || "Experience on-demand"
    const heroTagline = currentProduct.heroTagline || "Plastic is passe, Landfilling is zero.\nSustainability is the future."
    const taglineLines = heroTagline.replace(/<br\s*\/?>/gi, '\n').split('\n')
    const heroCtaText = currentProduct.heroCtaText || "Contact Us"
    const heroCtaLink = currentProduct.heroCtaLink || "#"
    const showcaseCtaText = currentProduct.showcaseCtaText || "Enquire Now"
    const showcaseCtaLink = currentProduct.showcaseCtaLink || "#"
    const brochureLink = currentProduct.brochurePdf || "#"
    const isBrochureDead = brochureLink === "#"

    const showHot = currentProduct.variants ? currentProduct.variants.hot : true
    const showCold = currentProduct.variants ? currentProduct.variants.cold : true
    const showAmbient = currentProduct.variants ? currentProduct.variants.ambient : true
    const activeVariantsCount = [showHot, showCold, showAmbient].filter(Boolean).length

    // State for image gallery slider
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Gallery images
    const productImages = currentProduct.images

    // Handler for slider navigation
    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % productImages.length)
    }

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
    }

    // State for accordions
    const [openAccordion, setOpenAccordion] = useState<"features" | "specs" | null>(null)

    // Quick inquiry form state
    const [isInquired, setIsInquired] = useState(false)
    const [isEnquirePopupOpen, setIsEnquirePopupOpen] = useState(false)

    const handleHeroCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (heroCtaLink.startsWith("#")) {
            e.preventDefault()
            const targetId = heroCtaLink.slice(1)
            const element = targetId ? document.getElementById(targetId) : null
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            } else if (heroCtaLink === "#") {
                document.getElementById("product-showcase")?.scrollIntoView({ behavior: "smooth" })
            }
        }
    }

    return (
        <main className="relative bg-[#000000] text-white min-h-screen overflow-x-hidden selection:bg-[#004063] selection:text-white">
            {/* HEADER */}
            <Header />

            {/* HERO SECTION */}
            <section
                className="relative w-full h-[100vh] flex flex-col justify-between bg-black z-10"
                style={{
                    backgroundImage: `url('${heroImage}')`,
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
                    <div className="max-w-[65vw] text-left" style={{ marginBottom: "141px" }}>
                        <p
                            className="mb-0"
                            style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: "20px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#AEAEAE"
                            }}
                        >
                            {heroSubtext}
                        </p>

                        {/* 23px relative equivalent (approx 1.4rem) */}
                        <div style={{ height: "1.438rem" }} />

                        <h1
                            className="mb-0"
                            style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontSize: "44px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#FFFFFF"
                            }}
                        >
                            {taglineLines.map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    {idx < taglineLines.length - 1 && <br />}
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* Hero Navigation / Subbar */}
                    <div className="w-full h-px bg-white/20 mb-[3vh]" />
                    <div className="flex justify-between items-center text-[0.625rem] uppercase tracking-[0.15em] text-[#AEAEAE] font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        <div 
                            style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontSize: "10px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#FFFFFF99",
                                textTransform: "none"
                            }}
                        >
                            Scroll for more ⤵︎
                        </div>
                        <div>
                            <Link
                                href={heroCtaLink}
                                onClick={handleHeroCtaClick}
                                className="bg-white text-black px-6 py-3 rounded-none hover:bg-white/90 transition-all duration-300 cursor-pointer flex items-center justify-center"
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "10px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle"
                                }}
                            >
                                {heroCtaText} <span style={{ marginLeft: "10px" }}>↗</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT SHOWCASE SECTION */}
            <section id="product-showcase" className="relative w-full bg-[#090909] pt-[12vh]" style={{ paddingBottom: "138px" }}>
                <div className={`${containerClass} grid grid-cols-1 lg:grid-cols-2 gap-[6vw] items-center`}>

                    {/* Left Column: Interactive Product Image Gallery */}
                    <div className="flex flex-col w-full items-start">
                        {/* Carousel Container aligned at 515x646 aspect ratio in responsive vw */}
                        <div
                            className="relative w-full lg:w-[35.7638vw] lg:h-[44.8611vw] overflow-hidden flex items-center justify-center group"
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
                                        className="object-cover h-full w-auto"
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
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={productImages[activeImageIndex]}
                                        alt={`${currentProduct.name} dispenser view ${activeImageIndex + 1}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 35vw"
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Slider Controls */}
                        <div className="flex justify-between items-center w-full lg:w-[35.7638vw] mt-[1.5rem] text-[0.7rem] font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", minWidth: "320px" }}>
                            {/* Dots / Page indicator */}
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

                            {/* Arrow navigation buttons */}
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
                    <div className="flex flex-col w-full text-left">
                        <span 
                            className="uppercase" 
                            style={{ 
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "normal",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#FFFFFF",
                                marginBottom: "26px"
                            }}
                        >
                            {currentProduct.categoryName}
                        </span>
                        <h2
                            className="text-white"
                            style={{ 
                                fontFamily: "'Inter Tight', sans-serif", 
                                fontWeight: 400,
                                fontSize: "32px",
                                lineHeight: "100%",
                                letterSpacing: "-2%",
                                verticalAlign: "middle",
                                marginBottom: "40px"
                            }}
                        >
                            {currentProduct.name}
                        </h2>
                        {/* Structured Features Listing */}
                        <div className="space-y-[1.5rem] mb-0">
                            {currentProduct.featuresList
                                .filter(feat => feat.title.toLowerCase() !== "water options" && feat.isDisplayed)
                                .map((feat, fIdx) => (
                                    <div key={fIdx}>
                                        <h3 
                                            className="text-white mb-[0.5rem]" 
                                            style={{ 
                                                fontFamily: "'Inter Tight', sans-serif",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "normal",
                                                letterSpacing: "0%",
                                                verticalAlign: "middle"
                                            }}
                                        >
                                            {feat.title}
                                        </h3>
                                        <p 
                                            style={{ 
                                                fontFamily: "'Manrope', sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                lineHeight: "normal",
                                                letterSpacing: "0%",
                                                verticalAlign: "middle",
                                                color: "#FFFFFF80"
                                            }}
                                        >
                                            {feat.description}
                                        </p>
                                    </div>
                                ))}
                        </div>

                        {/* Temperature Icons Row */}
                        <div className="flex gap-[2.5rem] text-[0.6875rem] uppercase tracking-wider text-white/80 font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", marginTop: "42.5px", marginBottom: "60px" }}>
                            {showHot && (
                                <div className="flex flex-col items-center gap-[0.5rem]">
                                    <div className="w-[1.5rem] h-[1.5rem]">
                                        <HotIcon />
                                    </div>
                                    <span className="text-[#AEAEAE]">Hot</span>
                                </div>
                            )}
                            {showCold && (
                                <div className="flex flex-col items-center gap-[0.5rem]">
                                    <div className="w-[1.5rem] h-[1.5rem]">
                                        <ColdIcon />
                                    </div>
                                    <span className="text-[#AEAEAE]">Cold</span>
                                </div>
                            )}
                            {showAmbient && (
                                <div className="flex flex-col items-center gap-[0.5rem]">
                                    <div className="w-[1.5rem] h-[1.5rem]">
                                        <AmbientIcon />
                                    </div>
                                    <span className="text-[#AEAEAE]">Ambient</span>
                                </div>
                            )}
                        </div>

                        {/* CTA Action button */}
                        {showcaseCtaLink && showcaseCtaLink !== "#" ? (
                            <Link
                                href={showcaseCtaLink}
                                className="w-full border border-white/40 bg-transparent py-[1rem] text-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer flex items-center justify-center"
                                style={{ 
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "10px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    textTransform: "none"
                                }}
                            >
                                {showcaseCtaText} <span style={{ marginLeft: "10px" }}>↗</span>
                            </Link>
                        ) : (
                            <button
                                onClick={() => setIsEnquirePopupOpen(true)}
                                className="w-full border border-white/40 bg-transparent py-[1rem] text-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer flex items-center justify-center"
                                style={{ 
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "10px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    textTransform: "none"
                                }}
                            >
                                {showcaseCtaText} <span style={{ marginLeft: "10px" }}>↗</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* TECHNICAL DETAILS / ACCORDION SECTION */}
            <section className="bg-[#090909] pb-[8vh]">
                <div className={containerClass}>
                    {/* Expanded to full containerClass width to align with left/right showcase columns */}
                    <div className="w-full text-left" style={{ borderTop: "1px solid #FFFFFF4D" }}>

                        {/* Accordion 1: FEATURES */}
                        <div style={{ borderBottom: "1px solid #FFFFFF4D" }}>
                            <button
                                onClick={() => setOpenAccordion(openAccordion === "features" ? null : "features")}
                                className="w-full py-[2rem] flex justify-between items-center text-left text-white transition-colors duration-300 cursor-pointer"
                            >
                                <span style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    textTransform: "uppercase"
                                }}>FEATURES</span>
                                <span className="w-[33px] h-[33px] flex items-center justify-center">
                                    <Image
                                        src={openAccordion === "features" ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/595e0004-b077-45cc-2fa8-3cd96cd2de00/public" : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/452710c0-2114-441d-1220-296341388a00/public"}
                                        alt={openAccordion === "features" ? "Collapse" : "Expand"}
                                        width={33}
                                        height={33}
                                    />
                                </span>
                            </button>

                            <AnimatePresence>
                                {openAccordion === "features" && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-[2rem]" style={{ paddingTop: "61px" }}>
                                            {currentProduct.featuresList.map((feat, fIdx) => (
                                                <div key={fIdx} style={{ marginBottom: "38px" }}>
                                                    <h4 style={{
                                                        fontFamily: "'Inter Tight', sans-serif",
                                                        fontWeight: 400,
                                                        fontSize: "16px",
                                                        lineHeight: "100%",
                                                        letterSpacing: "0%",
                                                        verticalAlign: "middle",
                                                        textTransform: feat.title.toLowerCase() === "water options" ? "capitalize" : "none",
                                                        color: "#FFFFFF",
                                                        marginBottom: "8px"
                                                    }}>{feat.title}</h4>
                                                    
                                                    {feat.title.toLowerCase() === "water options" ? (
                                                        <div className="flex text-[12px] font-normal" style={{ fontFamily: "'Inter Tight', sans-serif", marginTop: "24px", gap: "35px" }}>
                                                            {showHot && (
                                                                <div className="flex flex-col items-center gap-[0.5rem]">
                                                                    <div style={{ width: "26.83px", height: "26.83px" }}><HotIcon /></div>
                                                                    <span className="text-[#AEAEAE]">Hot</span>
                                                                </div>
                                                            )}
                                                            {showCold && (
                                                                <div className="flex flex-col items-center gap-[0.5rem]">
                                                                    <div style={{ width: "23.34px", height: "26.72px" }}><ColdIcon /></div>
                                                                    <span className="text-[#AEAEAE]">Cold</span>
                                                                </div>
                                                            )}
                                                            {showAmbient && (
                                                                <div className="flex flex-col items-center gap-[0.5rem]">
                                                                    <div style={{ width: "23.64px", height: "20.61px" }}><AmbientIcon /></div>
                                                                    <span className="text-[#AEAEAE]">Ambient</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p style={{
                                                            fontFamily: "'Inter Tight', sans-serif",
                                                            fontWeight: 400,
                                                            fontSize: "14px",
                                                            lineHeight: "normal",
                                                            letterSpacing: "0%",
                                                            verticalAlign: "middle",
                                                            color: "#FFFFFF80",
                                                            whiteSpace: "pre-line"
                                                        }}>
                                                            {feat.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Accordion 2: TECHNICAL SPECS */}
                        <div style={{ borderBottom: "1px solid #FFFFFF4D" }}>
                            <button
                                onClick={() => setOpenAccordion(openAccordion === "specs" ? null : "specs")}
                                className="w-full py-[2rem] flex justify-between items-center text-left text-white transition-colors duration-300 cursor-pointer"
                            >
                                <span style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    textTransform: "uppercase"
                                }}>TECHNICAL SPECS</span>
                                <span className="w-[33px] h-[33px] flex items-center justify-center">
                                    <Image
                                        src={openAccordion === "specs" ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/595e0004-b077-45cc-2fa8-3cd96cd2de00/public" : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/452710c0-2114-441d-1220-296341388a00/public"}
                                        alt={openAccordion === "specs" ? "Collapse" : "Expand"}
                                        width={33}
                                        height={33}
                                    />
                                </span>
                            </button>

                            <AnimatePresence>
                                {openAccordion === "specs" && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-[2rem]" style={{ paddingTop: "66.5px" }}>
                                            {/* Storage Capacity Variant Table */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <table className="w-auto text-left border-collapse text-white" style={{ fontFamily: "'Inter Tight', sans-serif", width: "auto" }}>
                                                    <thead>
                                                        <tr>
                                                            <th className="pr-8" rowSpan={2} style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "16px",
                                                                lineHeight: "100%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                width: "160px"
                                                            }}>Variant</th>
                                                            <th className="text-center" colSpan={activeVariantsCount || 1} style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "16px",
                                                                lineHeight: "100%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                width: `${(activeVariantsCount || 1) * 80}px`,
                                                                paddingBottom: "31px"
                                                            }}>Storage Capacity (L )</th>
                                                        </tr>
                                                        <tr>
                                                            {showHot && (
                                                                <th className="font-normal text-center" style={{ width: "80px", paddingBottom: "24px" }}>
                                                                    <div className="flex flex-col items-center gap-1">
                                                                        <div className="w-[1.25rem] h-[1.25rem]"><HotIcon /></div>
                                                                        <span className="text-[#AEAEAE]" style={{
                                                                            fontFamily: "'Inter Tight', sans-serif",
                                                                            fontWeight: 400,
                                                                            fontSize: "11px",
                                                                            lineHeight: "100%",
                                                                            letterSpacing: "0%",
                                                                            verticalAlign: "middle"
                                                                        }}>Hot</span>
                                                                    </div>
                                                                </th>
                                                            )}
                                                            {showCold && (
                                                                <th className="font-normal text-center" style={{ width: "80px", paddingBottom: "24px" }}>
                                                                    <div className="flex flex-col items-center gap-1">
                                                                        <div className="w-[1.25rem] h-[1.25rem]"><ColdIcon /></div>
                                                                        <span className="text-[#AEAEAE]" style={{
                                                                            fontFamily: "'Inter Tight', sans-serif",
                                                                            fontWeight: 400,
                                                                            fontSize: "11px",
                                                                            lineHeight: "100%",
                                                                            letterSpacing: "0%",
                                                                            verticalAlign: "middle"
                                                                        }}>Cold</span>
                                                                    </div>
                                                                </th>
                                                            )}
                                                            {showAmbient && (
                                                                <th className="font-normal text-center" style={{ width: "80px", paddingBottom: "24px" }}>
                                                                    <div className="flex flex-col items-center gap-1">
                                                                        <div className="w-[1.25rem] h-[1.25rem]"><AmbientIcon /></div>
                                                                        <span className="text-[#AEAEAE]" style={{
                                                                            fontFamily: "'Inter Tight', sans-serif",
                                                                            fontWeight: 400,
                                                                            fontSize: "11px",
                                                                            lineHeight: "100%",
                                                                            letterSpacing: "0%",
                                                                            verticalAlign: "middle"
                                                                        }}>Ambient</span>
                                                                    </div>
                                                                </th>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentProduct.specifications.storageCapacity.map((row, rIdx) => {
                                                            const isLast = rIdx === currentProduct.specifications.storageCapacity.length - 1;
                                                            return (
                                                                <tr key={rIdx} className="text-[#AEAEAE]">
                                                                    <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="pr-8">{row.variant}</td>
                                                                    {showHot && <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.hot}</td>}
                                                                    {showCold && <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.cold}</td>}
                                                                    {showAmbient && <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.ambient}</td>}
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Water Temp */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "lowercase",
                                                    color: "#FFFFFF",
                                                    marginBottom: "38px"
                                                }}>water temp.</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "normal",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "8px"
                                                }}>{currentProduct.specifications.waterTemp.cold}</p>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "normal",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.waterTemp.hot}</p>
                                            </div>

                                            {/* Green Certification */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "capitalize",
                                                    color: "#FFFFFF",
                                                    marginBottom: "8px"
                                                }}>Green certification</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.greenCertification}</p>
                                            </div>

                                            {/* Drip tray capacity */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "capitalize",
                                                    color: "#FFFFFF",
                                                    marginBottom: "8px"
                                                }}>Drip tray capacity</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.dripTray}</p>
                                            </div>

                                            {/* Refrigerant */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "capitalize",
                                                    color: "#FFFFFF",
                                                    marginBottom: "8px"
                                                }}>Refrigerant</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.refrigerant}</p>
                                            </div>

                                            {/* Dimensions Table */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <table className="w-auto text-left border-collapse text-white" style={{ fontFamily: "'Inter Tight', sans-serif", width: "auto" }}>
                                                    <thead>
                                                        <tr>
                                                            <th className="pr-8" rowSpan={2} style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "16px",
                                                                lineHeight: "100%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                width: "160px"
                                                            }}>Variant</th>
                                                            <th className="text-center" style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "16px",
                                                                lineHeight: "100%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                width: "100px",
                                                                paddingBottom: "31px"
                                                            }}>Weight</th>
                                                            <th className="text-center" colSpan={3} style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "16px",
                                                                lineHeight: "100%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                width: "240px",
                                                                paddingBottom: "31px"
                                                            }}>Dimensions</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-center" style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "12px",
                                                                lineHeight: "140%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                color: "#AEAEAE",
                                                                width: "100px",
                                                                paddingBottom: "21px"
                                                            }}>Kg</th>
                                                            <th className="text-center" style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "12px",
                                                                lineHeight: "140%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                color: "#AEAEAE",
                                                                width: "80px",
                                                                paddingBottom: "21px"
                                                            }}>Height (Mm)</th>
                                                            <th className="text-center" style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "12px",
                                                                lineHeight: "140%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                color: "#AEAEAE",
                                                                width: "80px",
                                                                paddingBottom: "21px"
                                                            }}>Width (Mm)</th>
                                                            <th className="text-center" style={{
                                                                fontFamily: "'Inter Tight', sans-serif",
                                                                fontWeight: 400,
                                                                fontSize: "12px",
                                                                lineHeight: "140%",
                                                                letterSpacing: "0%",
                                                                verticalAlign: 'middle',
                                                                color: "#AEAEAE",
                                                                width: "80px",
                                                                paddingBottom: "21px"
                                                            }}>Depth (Mm)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentProduct.specifications.dimensions.map((row, rIdx) => {
                                                            const isLast = rIdx === currentProduct.specifications.dimensions.length - 1;
                                                            return (
                                                                <tr key={rIdx} className="text-[#AEAEAE]">
                                                                    <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="pr-8">{row.variant}</td>
                                                                    <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.weight}</td>
                                                                    <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.height}</td>
                                                                    <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.width}</td>
                                                                    <td style={{
                                                                        fontFamily: "'Inter Tight', sans-serif",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "normal",
                                                                        letterSpacing: "0%",
                                                                        verticalAlign: "middle",
                                                                        paddingTop: "0px",
                                                                        paddingBottom: isLast ? "0px" : "24px"
                                                                    }} className="text-center">{row.depth}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Power requirement */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "capitalize",
                                                    color: "#FFFFFF",
                                                    marginBottom: "8px"
                                                }}>Power requirement</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.powerRequirement}</p>
                                            </div>

                                            {/* Purification & sterilization system */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "capitalize",
                                                    color: "#FFFFFF",
                                                    marginBottom: "8px"
                                                }}>Purification & sterilization system</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.purificationSystem}</p>
                                            </div>

                                            {/* Point of use sterilization system(optional) */}
                                            <div style={{ marginBottom: "38px" }}>
                                                <h4 style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    textTransform: "capitalize",
                                                    color: "#FFFFFF",
                                                    marginBottom: "8px"
                                                }}>Point of use sterilization system(optional)</h4>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "100%",
                                                    letterSpacing: "0%",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    marginBottom: "0px"
                                                }}>{currentProduct.specifications.pointOfUseSterilization}</p>
                                            </div>

                                            {/* Bottom Footer Notes inside Specs */}
                                            <div className="text-right pt-4 flex flex-col items-end" style={{ gap: "8px" }}>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "normal",
                                                    letterSpacing: "0%",
                                                    textAlign: "right",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    margin: 0
                                                }}>*Water Purification Products Complies with NGT Requirements</p>
                                                <p style={{
                                                    fontFamily: "'Inter Tight', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "normal",
                                                    letterSpacing: "0%",
                                                    textAlign: "right",
                                                    verticalAlign: "middle",
                                                    color: "#FFFFFF80",
                                                    margin: 0
                                                }}>*Specifications are subject to change.</p>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Document Download Buttons with responsive viewport layouts */}
                        <div className="flex mt-[3rem]" style={{ gap: "2.361vw" }}>
                            <a
                                href={brochureLink}
                                target={isBrochureDead ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    if (isBrochureDead) {
                                        e.preventDefault()
                                    }
                                }}
                                className={`group border border-white bg-transparent text-center text-white transition-all duration-300 flex items-center justify-center gap-[0.5rem] ${
                                    isBrochureDead ? "opacity-40 cursor-not-allowed" : "hover:bg-white hover:text-black cursor-pointer"
                                }`}
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    width: "14.722vw",
                                    height: "3.403vw",
                                    minWidth: "212px",
                                    minHeight: "49px"
                                }}
                            >
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle"
                                }}>Product Brochure</span>
                                <span className="w-[1.1rem] h-[1.1rem] flex items-center justify-center">
                                    <DownloadIcon />
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
                        className="text-white mb-[4rem] text-left"
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 400,
                            fontSize: "40px",
                            lineHeight: "105%",
                            letterSpacing: "0%",
                            verticalAlign: "middle"
                        }}
                    >
                        What else you might discover?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5vw]">
                        {Object.values(PRODUCTS).filter(p => p.id !== currentProduct.id && p.categoryName === currentProduct.categoryName).slice(0, 3).map((item, index) => (
                            <Link
                                href={`/product-description-page?product=${item.id}`}
                                key={index}
                                className="group flex flex-col text-left cursor-pointer transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Dispenser Image inside recommendation card — 381×322 ratio */}
                                <div className="relative w-full overflow-hidden flex items-center justify-center rounded-none" style={{ aspectRatio: "381 / 322", marginBottom: "50px" }}>
                                    <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                                        <Image
                                            src={item.images[item.displayImageIndex !== undefined ? item.displayImageIndex : 0] || item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Product title */}
                                <div className="flex items-center justify-between text-white" style={{ marginBottom: "20px" }}>
                                    <span style={{
                                        fontFamily: "'Inter Tight', sans-serif",
                                        fontWeight: 400,
                                        fontSize: "18px",
                                        lineHeight: "105%",
                                        letterSpacing: "0%",
                                    }}>{item.name}</span>
                                    <span className="text-[0.875rem] text-white/80 font-normal">&gt;</span>
                                </div>

                                {/* Description */}
                                <p style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "110%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    color: "#808080",
                                    margin: 0
                                }}>
                                    Information regarding WAE series drinking water dispensers and advanced purification modules.
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />

            {/* ENQUIRE NOW POPUP */}
            <EnquireNowPopup 
                isOpen={isEnquirePopupOpen} 
                onClose={() => setIsEnquirePopupOpen(false)} 
                pageLink={typeof window !== 'undefined' ? window.location.href : ''}
            />

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

export default function ProductDescriptionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <ProductDescriptionPageContent />
        </Suspense>
    )
}