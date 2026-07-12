"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef, Suspense } from "react"
import Image from "next/image"
import { motion, animate, useInView } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"
import ContactSectionDark from "@/components/contact-section-dark"
import Header from "@/components/header"
import { useSearchParams } from "next/navigation"
import { CATEGORIES } from "@/data/products"

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
            className="w-fit "
            style={{
                transition: 'background-color 0.65s ease, color 0.65s ease, border-color 0.65s ease',
                pointerEvents: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55vw", padding: "0.69vw 1.11vw",
                fontFamily: "\'Manrope\', sans-serif",
        fontWeight: 500,
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


function ProductListingContent() {
    // State variables
    const searchParams = useSearchParams()
    const categoryId = searchParams.get("category") || "bluwae"
    const currentCategory = CATEGORIES[categoryId] || CATEGORIES.bluwae

    const [activeSection, setActiveSection] = useState(0)
    const [currentTime, setCurrentTime] = useState("")
    const [activeGovernanceCard, setActiveGovernanceCard] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const [productSearchQuery, setProductSearchQuery] = useState("")
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

    // Refs and state for dynamic background image height
    const bgWrapperRef = useRef<HTMLDivElement>(null)
    const bluwaeDescRef = useRef<HTMLParagraphElement>(null)
    const [bgImageHeight, setBgImageHeight] = useState<number>(0)

    // State for controlling tagline visibility on scroll
    const [taglineVisible, setTaglineVisible] = useState(true)
    const prevScrollY = useRef(0)

    // Reset filter when category changes
    useEffect(() => {
        setActiveFilter("all")
    }, [categoryId])

    const filteredProducts = currentCategory.products.filter(p => {
        const matchesCategory = activeFilter === "all" || p.category === activeFilter;
        const matchesSearch = !productSearchQuery || p.name.toLowerCase().includes(productSearchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    // Get unique mounting types for tabs
    const uniqueMountingTypes = Array.from(new Set(currentCategory.products.map(p => p.category)));
    const shortCategoryName = currentCategory.title.includes(" - ") 
        ? currentCategory.title.split(" - ")[1].toUpperCase() 
        : currentCategory.title.toUpperCase();

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
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setTaglineVisible(currentScrollY < prevScrollY.current)
            prevScrollY.current = currentScrollY
        }
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



    const taglineLine1 = "To lead the way in sustainability"
    const taglineLine2 = "ahead of the rest."
    const taglineWords1 = taglineLine1.split(" ")
    const taglineWords2 = taglineLine2.split(" ")

    const productsItems = [
        { text: "This is Us", href: "/this-is-us" },
        { text: "Our Portfolio", href: "/our-portfolio" },
        { text: "Reimagine Work", href: "/careers" },
    ]
    const blueprintItems = [
        { text: "Sustainability", href: "/sustainability" },
        { text: "The Activist Co.", href: "/the-activist-co" },
        { text: "Blog", href: "/blogs" },
    ]
const etceteraItems = [
    { text: "Contact", href: "/contact-us" },
    { text: "Compliance", href: "/compliance" },
    { text: "Mentioned", href: "/news-and-updates" },
]

    return (
        <main className="relative">
            {/* HEADER */}
            <Header transparentBg />

            {/* MAIN CONTENT */}
            <div style={{
                width: "100%",
                backgroundColor: "#0f0f0f",
                backgroundImage: "linear-gradient(146.59deg, #004063 4.52%, #0F0F0F 49.04%)",
                backgroundSize: "100% 60.76vw",
                backgroundRepeat: "no-repeat",
                paddingTop: "230px",
            }}>
                {/* Title + Search Row */}
                <div className="w-full px-[7.5vw]" style={{ marginTop: "0px", marginBottom: "0px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 700,
                            fontSize: "24px",
                            lineHeight: "110%",
                            color: "#FFFFFF",
                            textTransform: "uppercase",
                            margin: 0,
                            verticalAlign: "middle",
                        }}>
                            ALL {shortCategoryName} <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "100%", color: "#AEAEAE", verticalAlign: "middle", marginLeft: "8px" }}>({filteredProducts.length})</span>
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
                <div className="w-full px-[7.5vw]" style={{ marginTop: "65px", paddingBottom: "48px" }}>
                    <div style={{ display: "flex", gap: "32px" }}>
                        {[
                            { label: `ALL ${shortCategoryName}`, value: "all" },
                            ...uniqueMountingTypes.map(mt => ({
                                label: mt.replace(/-/g, ' ').toUpperCase(),
                                value: mt
                            }))
                        ].map((tab) => (
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
                                    verticalAlign: "middle",
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
                        const groups: typeof filteredProducts[] = [];
                        const firstGroupSize = Math.min(5, filteredProducts.length);
                        if (firstGroupSize > 0) {
                            groups.push(filteredProducts.slice(0, firstGroupSize));
                        }
                        if (filteredProducts.length > firstGroupSize) {
                            groups.push(filteredProducts.slice(firstGroupSize));
                        }

                        return groups.map((group, groupIndex) => {
                            const globalStart = groupIndex === 0 ? 0 : 5;

                            return (
                                <div key={groupIndex}>
                                    {groupIndex === 1 && (
                                        <div style={{
                                            width: "100%",
                                            height: "1px",
                                            background: "rgba(255, 255, 255, 0.1)",
                                            marginTop: "65px",
                                            marginBottom: "65px",
                                        }} />
                                    )}
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: "1.67vw",
                                        rowGap: groupIndex === 0 ? "62px" : "65px",
                                    }}>
                                        {group.map((product, index) => {
                                            const globalIndex = globalStart + index;
                                            const isFeatured = globalIndex === 0 && filteredProducts.length >= 5;

                                            return (
                                                <Link
                                                    href={`/product-description-page?product=${product.id}`}
                                                    key={product.name}
                                                    style={{
                                                        gridColumn: isFeatured ? "span 2" : undefined,
                                                        gridRow: isFeatured ? "span 2" : undefined,
                                                        display: isFeatured ? "flex" : "block",
                                                        flexDirection: isFeatured ? "column" : undefined,
                                                        height: isFeatured ? "100%" : undefined,
                                                    }}
                                                >
                                                    <div
                                                        className="relative overflow-hidden group"
                                                        style={{
                                                            width: "100%",
                                                            aspectRatio: isFeatured ? undefined : "277 / 234",
                                                            flex: isFeatured ? 1 : undefined,
                                                            backgroundColor: "#1a1a1a",
                                                        }}
                                                    >
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className={`object-cover transition-all duration-700 ease-in-out ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
                                                        />
                                                        {product.hoverImage && (
                                                            <Image
                                                                src={product.hoverImage}
                                                                alt={`${product.name} hover`}
                                                                fill
                                                                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                                                            />
                                                        )}
                                                    </div>
                                                    <p style={{
                                                        fontFamily: "'Inter Tight', sans-serif",
                                                        fontWeight: 400,
                                                        fontSize: "18px",
                                                        lineHeight: "105%",
                                                        color: "#FFFFFF",
                                                        marginTop: "50px",
                                                        marginBottom: "0",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0%",
                                                        verticalAlign: "middle",
                                                    }}>
                                                        {product.name}
                                                    </p>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        });
                    })()}

                    {filteredProducts.length > 0 && (
                        <div style={{
                            width: "100%",
                            height: "1px",
                            background: "rgba(255, 255, 255, 0.1)",
                            marginTop: "65px",
                        }} />
                    )}
                </div>

                {/* Description Section */}
                <div className="w-full px-[7.5vw]" style={{ paddingBottom: "120px" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1.67vw",
                        paddingTop: "0px",
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
                                {currentCategory.title}
                            </h2>
                            {currentCategory.paragraphs.map((pText, pIdx) => (
                                <p key={pIdx} style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "auto", color: "#AEAEAE", marginTop: 0, marginBottom: pIdx === currentCategory.paragraphs.length - 1 ? 0 : "24px" }}>
                                    {pText}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                :global(.filter-wae-blue) {
                  filter: invert(16%) sepia(93%) saturate(1599%) hue-rotate(180deg) brightness(96%) contrast(105%) !important;
                }
            `}</style>

            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </main>
    )
}

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <ProductListingContent />
        </Suspense>
    )
}