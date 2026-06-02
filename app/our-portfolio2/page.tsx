"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, animate, useInView } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"
import ContactSectionDark from "@/components/contact-section-dark"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

/**
 * Animated counter component
 */
const Counter: FC<{ value: number; suffix?: string; trigger?: boolean }> = ({ value, suffix = "", trigger = true }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!trigger) return;

        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(0, value, {
            duration: 2,
            onUpdate(value) {
                setCount(value);
            },
        });

        return () => controls.stop();
    }, [value, trigger]);

    return (
        <h3
            ref={nodeRef}
            style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '40px',
                lineHeight: '200%',
                color: '#FFFFFF',
                textTransform: 'uppercase'
            }}
        >
            {count.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            {suffix}
        </h3>
    );
};

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
    children: (hovered: boolean) => React.ReactNode;
    href?: string;
    theme?: "light" | "dark" | "transparent-white" | "transparent-white-black-hover";
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, theme = "light" }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const buttonContent = (
        <button
            type="button"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="w-fit px-4 py-3"
            style={{
                transition: 'background-color 0.65s ease, color 0.65s ease, border-color 0.65s ease',
                pointerEvents: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500, // This fontWeight is for the button text itself (like "Know More")
                fontSize: "10px",
                lineHeight: "100%",
                textTransform: "none",
                backgroundColor:
                    theme === "transparent-white" ? (hovered ? "#fff" : "transparent") :
                        theme === "transparent-white-black-hover" ? (hovered ? "#fff" : "transparent") :
                            theme === "dark" ? "#000" : (hovered ? "#000" : "#fff"),
                border:
                    theme === "transparent-white" || theme === "transparent-white-black-hover" ? "1px solid #fff" :
                        theme === "dark" ? "1px solid #fff" : "1px solid #000",
                cursor: "pointer",
                color:
                    theme === "transparent-white" ? (hovered ? "#004063" : "#fff") :
                        theme === "transparent-white-black-hover" ? (hovered ? "#000" : "#fff") :
                            theme === "dark" ? "#fff" : (hovered ? "#fff" : "#000"),
            }}

        >
            {children(hovered)} {/* This is where the error happens if children is not a function */}
        </button>
    );

    // Use a simple anchor tag if it's an internal page link, Link component for Next.js routes
    return href ? (
        href.startsWith('#') ? ( // Check if it's an anchor link
            <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
        ) : ( // Assume it's a Next.js route link
            <Link href={href} className="contents">{buttonContent}</Link>
        )
    ) : buttonContent;
};


export default function Home() {
    // State variables
    const [activeSection, setActiveSection] = useState(0)
    const [currentTime, setCurrentTime] = useState("")
    const [headerHeight, setHeaderHeight] = useState(0)
    const [activeGovernanceCard, setActiveGovernanceCard] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const headerRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

    // Refs and state for dynamic background image height
    const bgWrapperRef = useRef<HTMLDivElement>(null)
    const bluwaeDescRef = useRef<HTMLParagraphElement>(null)
    const [bgImageHeight, setBgImageHeight] = useState<number>(0)

    // State for controlling tagline visibility on scroll
    const [taglineVisible, setTaglineVisible] = useState(true)
    const prevScrollY = useRef(0)

    // Data for portfolio products categories
    const portfolioProducts = [
        {
            id: "bluwae",
            title: "Drinking water station - BLUWAE",
            subtitle: "Experience on-demand",
            description: "Point-of-Use drinking water stations with in-built 5-stage RO purification, LED UVC protection, and optional Germ Guardian™ hygiene technology.",
            imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public",
            href: "/product-category/drinking-water-stations"
        },
        {
            id: "trublu",
            title: "Water dispenser & cooler - TRUBLU",
            description: "Plumbed-in water dispensers with in-tank LED-UVC protection, optional bottom-loading configuration, and advanced Germ Guardian™ hygiene technology.",
            imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
            href: "/product-category/water-dispenser"
        },
        {
            id: "zvr",
            title: "Drinking water fountain - ZVR",
            description: "Direct-drinking stations with bubbler taps, featuring repository installed purification, chilling, and heating systems concealed seamlessly behind the wall.",
            imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
            href: "/product-category/water-cooler"
        },
        {
            id: "watermatic",
            title: "Drinking water faucets - WATERMATIC",
            description: "Drinking water taps featuring sensor touch or push operation for hygienic dispensing, effortless usability, and seamless modern hydration experiences.",
            imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
            href: "/product-category/drinking-water-faucets"
        },
        {
            id: "pus",
            title: "Compact purification units - WAEAU",
            description: "Robust, research-backed water systems engineered for public infrastructure—ensuring continuous access to safe, purified drinking water in all conditions.",
            imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
            href: "/product-category/public-utility-systems"
        },
        {
            id: "glass-bottling",
            title: "Glass bottling plant",
            description: "Compact modular glass bottling plants enabling sustainable premium in-house bottled water production for hospitality, corporate, and luxury environments.",
            imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public",
            href: "/product-category/blubox"
        }
    ];

    const filterProduct = (product: typeof portfolioProducts[0]) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            (product.subtitle && product.subtitle.toLowerCase().includes(query))
        );
    };

    // Variants for staggered animations using framer-motion (used only for tagline)
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
                ease: "easeInOut",
            },
        },
    }
    const childVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
    }

    // Update tagline visibility based on scroll direction
    // Note: This state is calculated but not applied in the current JSX
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setTaglineVisible(currentScrollY < prevScrollY.current)
            prevScrollY.current = currentScrollY
        }
        // Using passive: true for better scroll performance
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    // Measure background image height: from wrapper top to BLUWAE description bottom
    useEffect(() => {
        const measure = () => {
            if (bgWrapperRef.current && bluwaeDescRef.current) {
                const wrapperTop = bgWrapperRef.current.getBoundingClientRect().top
                const descBottom = bluwaeDescRef.current.getBoundingClientRect().bottom
                setBgImageHeight(descBottom - wrapperTop)
            }
        }
        measure()
        window.addEventListener("resize", measure)
        // Re-measure after fonts/images load
        window.addEventListener("load", measure)
        return () => {
            window.removeEventListener("resize", measure)
            window.removeEventListener("load", measure)
        }
    }, [])

    // Update current time (India Time) every minute
    useEffect(() => {
        const updateIndiaTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Kolkata",
            }
            setCurrentTime(new Date().toLocaleTimeString("en-US", options))
        }
        updateIndiaTime()
        const interval = setInterval(updateIndiaTime, 60000)
        return () => clearInterval(interval)
    }, [])

    // Measure header height (Note: This height is calculated but not used in the current JSX)
    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.clientHeight);
            }
        };
        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []); // Dependency array is empty, runs once on mount and cleanup


    // Tagline lines (split into words)
    const taglineLine1 = "To lead the way in sustainability"
    const taglineLine2 = "ahead of the rest."
    const taglineWords1 = taglineLine1.split(" ")
    const taglineWords2 = taglineLine2.split(" ")

    // Arrays for menu items with hrefs
    const productsItems = [
        { text: "This is Us", href: "/this-is-us" },
        { text: "Our Portfolio", href: "/our-portfolio" },
        { text: "Reimagine Work", href: "/careers3" },
    ]
    const blueprintItems = [
        { text: "Sustainability", href: "/sustainability" },
        { text: "The Activist Co.", href: "/the-activist-co" },
        { text: "Blog", href: "/blogs2" },
    ]
    const lineCount = Math.min(productsItems.length, blueprintItems.length) // Note: lineCount is calculated but not used

    return (
        <main className="relative">
            {/* HEADER (Not Fixed in this version) */}
            {/* The div with inline styles here seems unnecessary if not fixed */}
            <div> {/* Consider removing this outer div or making it relative/static */}
                <header ref={headerRef} className="w-full absolute top-0 left-0 z-50 pb-5 bg-transparent text-white"> {/* Apply containerClass inside header content div */}
                    <div className={containerClass}> {/* Use containerClass for consistent padding */}
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
                            <div style={{ position: "relative", left: "-20px" }}>OBJECTIVE</div>
                            <div>INSIDE WAE</div>
                            <div>ETCETERA</div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white mb-[10px]" />

                        {/* Bottom Row: Logo, Tagline and Menu Items */}
                        <div className="grid grid-cols-5 items-start">
                            {/* Logo */}
                            <div className="flex flex-col justify-center w-[77px] h-[82px]">
                                <Link href="/">
                                    <Image
                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                                        alt="WAE Logo"
                                        width={77}
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
                                    color: "#ffffff",
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
                                    color: "#ffffff",
                                    position: "relative",
                                    left: "-20px",
                                }}
                            >
                                To lead the way in<br />sustainability ahead of the<br />rest
                            </div>

                            {/* Inside WAE Menu Items */}
                            <div className="flex flex-col justify-center space-y-2">
                                {productsItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="pb-2 border-b border-white last:border-0"
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
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
                                        className="pb-2 border-b border-white last:border-0"
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
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
            </div>

            {/* HERO SECTION */}
            <section
                id="hero"
                //   ref={heroRef}
                className="w-full h-screen relative flex items-center justify-center bg-black overflow-hidden"
                style={{ height: "100vh" }}
            >
                {/* 1. Video (Bottommost) */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 cursor-pointer" onClick={(e) => {
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                        video.muted = false;
                        video.play().catch(() => {});
                    }
                }}>
                    <video
                        src="/portfolio-hero.mp4"
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover rounded-none"
                    />
                </div>

                {/* 2. Black Overlay (Above Video) */}
                <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none">
                    <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/08bdc7d2-46d9-4096-5660-2e4400b2fa00/public"
                        alt="Black Overlay"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Volume/Sound Toggle Indicator */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        const video = document.querySelector('video');
                        if (video) {
                            video.muted = !video.muted;
                            // Force play in case browser paused it
                            video.play().catch(() => {});
                            
                            // Visual feedback
                            const btn = e.currentTarget;
                            const text = btn.querySelector('.volume-text');
                            if (text) {
                                text.textContent = video.muted ? "SOUND OFF" : "SOUND ON";
                            }
                        }
                    }}
                    className="absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-300"
                    style={{
                        bottom: "5%",
                        right: "10.8vw",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.05em",
                        fontWeight: 500,
                    }}
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="volume-text">SOUND OFF</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                </button>

                {/* Scroll for more text */}
                <div
                    className="absolute uppercase text-[#ffffff99] z-10"
                    style={{ // Inline styles for positioning and typography
                        bottom: "5%",
                        left: "1rem",
                        marginLeft: "9.2%",
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.625rem", // From previous page's mobile hero (10px)
                        lineHeight: "100%",
                        zIndex: 10,
                    }}
                >
                    Scroll for more ⤵︎ {/* Static text */}
                </div>

            </section>
            <div ref={bgWrapperRef} style={{
                width: "100%",
                margin: 0,
                padding: 0,
                position: "relative",
                backgroundColor: "#0f0f0f",
            }}>
                {/* Background is now the parent's backgroundColor: #0f0f0f */}
                {/* Next Section: Highlight Quote */}
                <section
                    style={{
                        background: "transparent",
                        position: "relative",
                        zIndex: 1,
                        paddingTop: "123px",
                        paddingBottom: "110px",
                        paddingLeft: "7.5vw",
                        paddingRight: "7.5vw",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%" }}>
                        <div
                            style={{
                                // maxWidth: "57.4305vw",
                                width: "100%",
                                textAlign: "right",
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontSize: "36px",
                                lineHeight: "105%",
                                letterSpacing: "0%",
                                color: "#FFFFFF66",
                            }}
                        >
                            WAE’s hydration system<br />
                            <span style={{ color: "#FFFFFF" }}>deliver plastic-free</span> water dispensing for <span style={{ color: "#FFFFFF" }}>high-footfall</span><br />
                            <span style={{ display: "inline-block", marginRight: "1.2em" }}>
                                <span style={{ color: "#FFFFFF" }}>environments</span> while supporting <span style={{ color: "#FFFFFF" }}>zero-landfill goals</span>.
                            </span>
                        </div>

                    </div>
                </section>

                {/* PRODUCT CATEGORY SECTION */}
                <section style={{ background: "transparent", color: "#FFF", paddingBottom: "120px", position: "relative", zIndex: 1 }} className="w-full px-[7.5vw] mb-[1px]">
                    {/* Section Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "24px", letterSpacing: "0%", margin: 0 }}>
                            Our product category
                        </h2>
                        {/* Search Bar */}
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ position: "absolute", left: "16px", color: "rgba(255,255,255,0.4)" }}
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search your product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    background: "transparent",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    color: "#FFF",
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontSize: "14px",
                                    padding: "10px 16px 10px 44px",
                                    outline: "none",
                                    width: "280px",
                                    transition: "border-color 0.3s ease"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#FFF"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
                            />
                        </div>
                    </div>

                    {/* Product Layout Container */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "80px", paddingTop: "80px" }}>
                        {/* 1. Featured Row: BLUWAE (Two Columns) */}
                        {filterProduct(portfolioProducts[0]) && (
                            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                                {/* Image */}
                                <div className="relative overflow-hidden group" style={{ width: "41.18vw", height: "500px" }}>
                                    <Image
                                        src={portfolioProducts[0].imageUrl}
                                        alt={portfolioProducts[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                                {/* Content */}
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "450px", alignItems: "flex-start" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                        <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", color: "#AEAEAE", lineHeight: "100%", letterSpacing: "0%", verticalAlign: "middle", textTransform: "none", marginBottom: "48px" }}>
                                            {portfolioProducts[0].subtitle}
                                        </span>
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "40px", lineHeight: "105%", letterSpacing: "0%", verticalAlign: "middle", margin: 0, marginBottom: "26px", color: "#FFF" }}>
                                            {portfolioProducts[0].title}
                                        </h3>
                                        <p ref={bluwaeDescRef} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", letterSpacing: "0%", verticalAlign: "middle", color: "#AEAEAE", margin: 0, marginBottom: "62px", maxWidth: "480px" }}>
                                            {portfolioProducts[0].description}
                                        </p>
                                    </div>
                                    <HoverButton href={portfolioProducts[0].href} theme="transparent-white-black-hover">
                                        {(hovered) => (
                                            <>
                                                Know More
                                                <div className="relative inline-block w-4 h-4">
                                                    <Image
                                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public" // White default
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
                                                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public" // Black hover
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
                        )}

                        {/* 2. Grid Row 1: TRUBLU and ZVR (Two Columns) */}
                        {(filterProduct(portfolioProducts[1]) || filterProduct(portfolioProducts[2])) && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="grid-cols-1 md:grid-cols-2">
                                {/* Left Column (TRUBLU) */}
                                {filterProduct(portfolioProducts[1]) ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                        <div className="relative overflow-hidden group" style={{ width: "41.18vw", height: "500px", marginBottom: "24px" }}>
                                            <Image
                                                src={portfolioProducts[1].imageUrl}
                                                alt={portfolioProducts[1].title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: "105%", letterSpacing: "0%", verticalAlign: "middle", margin: 0, marginBottom: "26px", color: "#FFF" }}>
                                            {portfolioProducts[1].title}
                                        </h3>
                                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", letterSpacing: "0%", verticalAlign: "middle", color: "#AEAEAE", margin: 0, marginBottom: "62px" }}>
                                            {portfolioProducts[1].description}
                                        </p>
                                        <HoverButton href={portfolioProducts[1].href} theme="transparent-white-black-hover">
                                            {(hovered) => (
                                                <>
                                                    Know More
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
                                        </HoverButton>
                                    </div>
                                ) : <div />}

                                {/* Right Column (ZVR) */}
                                {filterProduct(portfolioProducts[2]) ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                        <div className="relative overflow-hidden group" style={{ width: "41.18vw", height: "500px", marginBottom: "24px" }}>
                                            <Image
                                                src={portfolioProducts[2].imageUrl}
                                                alt={portfolioProducts[2].title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: "105%", letterSpacing: "0%", verticalAlign: "middle", margin: 0, marginBottom: "26px", color: "#FFF" }}>
                                            {portfolioProducts[2].title}
                                        </h3>
                                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", letterSpacing: "0%", verticalAlign: "middle", color: "#AEAEAE", margin: 0, marginBottom: "62px" }}>
                                            {portfolioProducts[2].description}
                                        </p>
                                        <HoverButton href={portfolioProducts[2].href} theme="transparent-white-black-hover">
                                            {(hovered) => (
                                                <>
                                                    Know More
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
                                        </HoverButton>
                                    </div>
                                ) : <div />}
                            </div>
                        )}

                        {/* 3. Grid Row 2: WATERMATIC and PUS (Two Columns) */}
                        {(filterProduct(portfolioProducts[3]) || filterProduct(portfolioProducts[4])) && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="grid-cols-1 md:grid-cols-2">
                                {/* Left Column (WATERMATIC) */}
                                {filterProduct(portfolioProducts[3]) ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                        <div className="relative overflow-hidden group" style={{ width: "41.18vw", height: "500px", marginBottom: "24px" }}>
                                            <Image
                                                src={portfolioProducts[3].imageUrl}
                                                alt={portfolioProducts[3].title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: "105%", letterSpacing: "0%", verticalAlign: "middle", margin: 0, marginBottom: "26px", color: "#FFF" }}>
                                            {portfolioProducts[3].title}
                                        </h3>
                                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", letterSpacing: "0%", verticalAlign: "middle", color: "#AEAEAE", margin: 0, marginBottom: "62px" }}>
                                            {portfolioProducts[3].description}
                                        </p>
                                        <HoverButton href={portfolioProducts[3].href} theme="transparent-white-black-hover">
                                            {(hovered) => (
                                                <>
                                                    Know More
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
                                        </HoverButton>
                                    </div>
                                ) : <div />}

                                {/* Right Column (PUS) */}
                                {filterProduct(portfolioProducts[4]) ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                        <div className="relative overflow-hidden group" style={{ width: "41.18vw", height: "500px", marginBottom: "24px" }}>
                                            <Image
                                                src={portfolioProducts[4].imageUrl}
                                                alt={portfolioProducts[4].title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: "105%", letterSpacing: "0%", verticalAlign: "middle", margin: 0, marginBottom: "26px", color: "#FFF" }}>
                                            {portfolioProducts[4].title}
                                        </h3>
                                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", letterSpacing: "0%", verticalAlign: "middle", color: "#AEAEAE", margin: 0, marginBottom: "62px" }}>
                                            {portfolioProducts[4].description}
                                        </p>
                                        <HoverButton href={portfolioProducts[4].href} theme="transparent-white-black-hover">
                                            {(hovered) => (
                                                <>
                                                    Know More
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
                                        </HoverButton>
                                    </div>
                                ) : <div />}
                            </div>
                        )}

                        {/* 4. Full Width Row: Glass Bottling Plant */}
                        {filterProduct(portfolioProducts[5]) && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0px", paddingBottom: "40px" }}>
                                {/* Image */}
                                <div className="relative overflow-hidden group" style={{ width: "100%", height: "500px", marginBottom: "32px" }}>
                                    <Image
                                        src={portfolioProducts[5].imageUrl}
                                        alt={portfolioProducts[5].title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                                {/* Content */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0px" }}>
                                    <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "36px", lineHeight: "105%", letterSpacing: "0%", verticalAlign: "middle", margin: 0, marginBottom: "26px", color: "#FFF" }}>
                                        {portfolioProducts[5].title}
                                    </h3>
                                    <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", letterSpacing: "0%", verticalAlign: "middle", color: "#AEAEAE", margin: 0, marginBottom: "62px", maxWidth: "600px" }}>
                                        {portfolioProducts[5].description}
                                    </p>
                                    <HoverButton href={portfolioProducts[5].href} theme="transparent-white-black-hover">
                                        {(hovered) => (
                                            <>
                                                Know More
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
                                    </HoverButton>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <Footer />

            {/* INLINE CSS for hover and arrow animations */}
            <style jsx>{`
        /* Custom filter for #004063 blue color - global selector to bypass styled-jsx scoping on Image tag */
        :global(.filter-wae-blue) {
          filter: invert(16%) sepia(93%) saturate(1599%) hue-rotate(180deg) brightness(96%) contrast(105%) !important;
        }

        /* Removed unused styles like product-grid, product-title, product-cell, placeholder-img */

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

            {/* Global Styles */}
            {/* Note: If you re-introduce smooth scrolling, be mindful of conflicts with custom JS */}
            <style jsx global>{`
        html {
          /* scroll-behavior: smooth; *//* Commented out as per previous discussion */
        }
         /* Ensure body doesn't have extra margins/padding */
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
        </main>
    )
}