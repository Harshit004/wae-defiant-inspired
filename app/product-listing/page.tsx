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
import Header from "@/components/header"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

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
    const [activeFilter, setActiveFilter] = useState<"all" | "free-standing" | "counter-top">("all")
    const [productSearchQuery, setProductSearchQuery] = useState("")
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

    // BLUWAE product listing data with filter categories
    const bluwaeProducts = [
        { name: "BLUWAE VAR Series", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public", category: "free-standing" as const },
        { name: "BLUWAE ENKI Series", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", category: "free-standing" as const },
        { name: "BLUWAE POS", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public", category: "counter-top" as const },
        { name: "BLUWAE ROM Grande", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public", category: "free-standing" as const },
        { name: "BLUWAE REVA", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "free-standing" as const },
        { name: "BLUWAE GSP", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public", category: "free-standing" as const },
        { name: "BLUWAE ASSISTFLOW", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public", category: "free-standing" as const },
        { name: "BLUWAE VENUS", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", category: "counter-top" as const },
        { name: "BLUWAE ENO.CT (Part of series)", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public", category: "counter-top" as const },
        { name: "BLUWAE VAR.CT (Part of series)", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public", category: "counter-top" as const },
        { name: "BLUWAE ROM.CT (Part of series)", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "counter-top" as const },
    ];

    // Filter bluwae products by category and search
    const filteredBluwaeProducts = bluwaeProducts.filter(p => {
        const matchesCategory = activeFilter === "all" || p.category === activeFilter;
        const matchesSearch = !productSearchQuery || p.name.toLowerCase().includes(productSearchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
            {/* HEADER */}
            <Header />

            {/* MAIN CONTENT */}
            <div style={{
                width: "100%",
                backgroundColor: "#0f0f0f",
                backgroundImage: "linear-gradient(146.59deg, #004063 4.52%, #0F0F0F 49.04%)",
                backgroundSize: "100% 60.76vw",
                backgroundRepeat: "no-repeat",
                paddingTop: "220px",
            }}>
                {/* Title + Search Row */}
                <div className="w-full px-[7.5vw]" style={{ paddingBottom: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "36px",
                            lineHeight: "100%",
                            color: "#FFFFFF",
                            textTransform: "uppercase",
                            margin: 0,
                        }}>
                            ALL BALWAE <span style={{ color: "#ffffff66", fontSize: "18px", fontWeight: 400 }}>({filteredBluwaeProducts.length})</span>
                        </h1>
                        {/* Search Bar */}
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: "absolute", left: "16px", color: "rgba(255,255,255,0.4)" }}>
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search your product..."
                                value={productSearchQuery}
                                onChange={(e) => setProductSearchQuery(e.target.value)}
                                style={{
                                    background: "transparent",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    color: "#FFF",
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontSize: "14px",
                                    padding: "10px 16px 10px 44px",
                                    outline: "none",
                                    width: "280px",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#FFF"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="w-full px-[7.5vw]" style={{ paddingBottom: "48px" }}>
                    <div style={{ display: "flex", gap: "32px" }}>
                        {([
                            { label: "ALL BLUWAE", value: "all" as const },
                            { label: "FREE STANDING", value: "free-standing" as const },
                            { label: "COUNTER TOP", value: "counter-top" as const },
                        ]).map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveFilter(tab.value)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    borderBottom: activeFilter === tab.value ? "2px solid #fff" : "2px solid transparent",
                                    color: activeFilter === tab.value ? "#fff" : "#ffffff66",
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "100%",
                                    cursor: "pointer",
                                    paddingBottom: "8px",
                                    paddingTop: "0",
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                    textTransform: "uppercase",
                                    transition: "color 0.3s ease, border-color 0.3s ease",
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid - rendered in row groups with dividers */}
                <div className="w-full px-[7.5vw]" style={{ paddingBottom: "80px" }}>
                    {(() => {
                        // Split filtered products into row groups for dividers
                        // Group 1: items 0–4 (featured big + 4 small)
                        // Subsequent groups: 4 items each
                        const groups: typeof filteredBluwaeProducts[] = [];
                        const firstGroupSize = Math.min(5, filteredBluwaeProducts.length);
                        if (firstGroupSize > 0) {
                            groups.push(filteredBluwaeProducts.slice(0, firstGroupSize));
                        }
                        let i = firstGroupSize;
                        while (i < filteredBluwaeProducts.length) {
                            groups.push(filteredBluwaeProducts.slice(i, i + 4));
                            i += 4;
                        }

                        return groups.map((group, groupIndex) => {
                            // Calculate the global start index for this group
                            const globalStart = groupIndex === 0 ? 0 : 5 + (groupIndex - 1) * 4;

                            return (
                                <div key={groupIndex}>
                                    {/* Divider after the featured group only */}
                                    {groupIndex === 1 && (
                                        <div style={{
                                            width: "100%",
                                            height: "1px",
                                            background: "rgba(255, 255, 255, 0.1)",
                                            marginTop: "65px",
                                            marginBottom: groupIndex === 1 ? "65px" : "85px",
                                        }} />
                                    )}
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: "1.67vw",
                                    }}>
                                        {group.map((product, index) => {
                                            const globalIndex = globalStart + index;
                                            const isFeatured = globalIndex === 0;

                                            return (
                                                <div
                                                    key={product.name}
                                                    style={{
                                                        gridColumn: isFeatured ? "span 2" : undefined,
                                                        gridRow: isFeatured ? "span 2" : undefined,
                                                    }}
                                                >
                                                    <div
                                                        className="relative overflow-hidden group"
                                                        style={{
                                                            width: "100%",
                                                            aspectRatio: isFeatured ? "593 / 599" : "277 / 234",
                                                            backgroundColor: "#1a1a1a",
                                                        }}
                                                    >
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <p style={{
                                                        fontFamily: "'Inter Tight', sans-serif",
                                                        fontWeight: 400,
                                                        fontSize: "18px",
                                                        lineHeight: "105%",
                                                        color: "#FFFFFF",
                                                        marginTop: "50px",
                                                        marginBottom: "0",
                                                    }}>
                                                        {product.name}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        });
                    })()}

                    {/* Final divider after last product row */}
                    {filteredBluwaeProducts.length > 0 && (
                        <div style={{
                            width: "100%",
                            height: "1px",
                            background: "rgba(255, 255, 255, 0.1)",
                            marginTop: "65px",
                        }} />
                    )}
                </div>

                {/* Description Section — width matched to 2 grid columns */}
                <div className="w-full px-[7.5vw]" style={{ paddingBottom: "120px" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1.67vw",
                        paddingTop: "60px",
                    }}>
                        <div style={{ gridColumn: "span 2" }}>
                            <h2 style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: "40px",
                                lineHeight: "105%",
                                color: "#FFFFFF",
                                margin: 0,
                                marginBottom: "32px",
                            }}>
                                Drinking water station - BLUWAE
                            </h2>
                            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "100%", color: "#AEAEAE", marginTop: 0, marginBottom: "24px" }}>
                                BLUWAE™ Series is a next-generation Drinking Water Station designed to deliver safe, accessible, and sustainable hydration across workplaces and public environments. Combining advanced Reverse Osmosis (RO) purification with intelligent dispensing technology, it provides Purified Drinking Water directly at the point of consumption, reducing dependence on packaged bottled water.
                            </p>
                            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "100%", color: "#AEAEAE", marginTop: 0, marginBottom: "24px" }}>
                                Ideal for offices, educational institutions, healthcare facilities, manufacturing units, and public spaces, BLUWAE™ functions as a reliable Commercial Hydration Solution. Available as a standalone unit or as part of Centralized Water Infrastructure, it supports ambient, chilled, and hot water dispensing, touch-free operation, and Bottle-Filling Capabilities.
                            </p>
                            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "100%", color: "#AEAEAE", marginTop: 0, marginBottom: 0 }}>
                                Designed to improve Workplace Hydration, reduce plastic waste, and lower operational costs, BLUWAE™ combines Advanced Filtration, Smart Dispensing, and premium design. More than a water access point, it is a future-ready Hydration System supporting responsible consumption and long-term sustainability goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* INLINE CSS */}
            <style jsx>{`
        /* Custom filter for #004063 blue color */
        :global(.filter-wae-blue) {
          filter: invert(16%) sepia(93%) saturate(1599%) hue-rotate(180deg) brightness(96%) contrast(105%) !important;
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