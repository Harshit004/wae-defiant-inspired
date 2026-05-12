"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
    children: (hovered: boolean) => React.ReactNode;
    href?: string;
    theme?: "light" | "dark" | "transparent-white";
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, theme = "light" }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const buttonContent = (
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
                fontWeight: 500, // This fontWeight is for the button text itself (like "Know More")
                fontSize: "10px",
                lineHeight: "100%",
                textTransform: "uppercase",
                backgroundColor: 
                    theme === "transparent-white" ? (hovered ? "#fff" : "transparent") :
                    theme === "dark" ? "#000" : (hovered ? "#000" : "#fff"),
                border: 
                    theme === "transparent-white" ? "1px solid #fff" :
                    theme === "dark" ? "1px solid #fff" : "1px solid #000",
                cursor: "pointer",
                color: 
                    theme === "transparent-white" ? (hovered ? "#004063" : "#fff") :
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
    const headerRef = useRef<HTMLDivElement>(null)

    // State for controlling tagline visibility on scroll
    const [taglineVisible, setTaglineVisible] = useState(true)
    const prevScrollY = useRef(0)

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
        <main className="relative pb-[40px]">
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
                            <div>OBJECTIVE</div>
                            <div>INSIDE WAE</div>
                            <div>ETCETERA</div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white mb-[10px]" />

                        {/* Bottom Row: Logo, Tagline and Menu Items */}
                        <div className="grid grid-cols-5 items-start">
                            {/* Logo */}
                            <div className="flex flex-col justify-center">
                                <Link href="/">
                                    <Image
                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
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
                <div className="w-full h-full flex items-center justify-center">
                    <video
                        src="/home2-hero.mp4"
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover rounded-none"
                    />
                </div>

                {/* Glassmorphism Overlay (Left Half) */}
                <div className="absolute top-0 left-0 w-1/2 h-full z-[5] backdrop-blur-[60px] bg-black/10" />

                {/* Hero Content - pointer-events-none to allow interaction with elements below if needed, but here it's h-full of relative section */}
                <div className={`absolute top-0 left-0 w-full h-full z-10 pointer-events-none`}>
                    <div className={`${containerClass} pointer-events-auto`}>
                        <div
                            style={{
                                marginTop: `${headerHeight + 105}px`,
                                width: "34.79vw",
                                color: "#FFFFFF",
                                fontFamily: "'Inter Tight', sans-serif",
                            }}
                        >
                            <h1
                                style={{
                                    fontWeight: 500,
                                    fontSize: "85px",
                                    lineHeight: "105%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    margin: 0,
                                }}
                            >
                                We're here<br />to disrupt the<br />status quo!
                            </h1>
                            <div style={{ height: "22px" }} />
                            <p
                                style={{
                                    fontWeight: 400,
                                    fontSize: "24px",
                                    lineHeight: "115%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    color: "#AEAEAE",
                                    margin: 0,
                                }}
                            >
                                A good water company
                                <br />
                                from water intake to water reuse
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand, Purpose & People Section */}
            <section className="relative bg-black text-white w-full">
                <div className="w-full h-[576px]">
                    <div className="grid grid-cols-3 h-full border-b border-white">
                        {/* Column 1: Brand */}
                        <div className="flex flex-col h-full items-center justify-center border-r border-white px-12 lg:px-24 transition-colors duration-500 hover:bg-[#004063] cursor-pointer group">
                            <div className="flex flex-col w-full max-w-[320px]">
                                <h2
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '40px',
                                        lineHeight: '110%',
                                        letterSpacing: '0%',
                                    }}
                                >
                                    Brand
                                </h2>
                                <div style={{ height: '32px' }} />
                                <h3
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        lineHeight: '100%',
                                    }}
                                >
                                    Being Sustainable
                                </h3>
                                <div style={{ height: '12px' }} />
                                <p
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                    }}
                                >
                                    The underlying natural order of the universe – circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.
                                </p>
                                <div style={{ height: '12px' }} />
                                <p
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                    }}
                                >
                                    WAE's mission is to lead the industry by 2030 offering science and technology driven water purification and reuse solutions.
                                </p>
                                <div style={{ height: '32px' }} />
                                <Link href="/this-is-us" className="contents">
                                    <HoverButton theme="transparent-white">
                                        {(hovered) => (
                                            <>
                                                Know More
                                                <div className="relative inline-block w-4 h-4">
                                                    <Image
                                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                                        alt="icon default"
                                                        width={16}
                                                        height={16}
                                                        className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
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
                                                            className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                                                        />
                                                    </motion.div>
                                                </div>
                                            </>
                                        )}
                                    </HoverButton>
                                </Link>
                            </div>
                        </div>

                        {/* Column 2: Purpose */}
                        <div className="flex flex-col h-full items-center justify-center border-r border-white px-12 lg:px-24 transition-colors duration-500 hover:bg-[#004063] cursor-pointer group">
                            <div className="flex flex-col w-full max-w-[320px]">
                                <h2
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '40px',
                                        lineHeight: '110%',
                                        letterSpacing: '0%',
                                    }}
                                >
                                    Purpose
                                </h2>
                                <div style={{ height: '32px' }} />
                                <h3
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        lineHeight: '100%',
                                    }}
                                >
                                    Our Green Is Blue
                                </h3>
                                <div style={{ height: '12px' }} />
                                <p
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                    }}
                                >
                                    It is where sustainability takes its truest form, not in what we take, but in what we give back. In every drop we preserve, nature finds its balance again — pure, circular, and endlessly alive.
                                </p>
                                <div style={{ height: '12px' }} />
                                <p
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                    }}
                                >
                                    At WAE, we do not just treat water but architect a scientifically governed, sustainability-positive water continuum.
                                </p>
                                <div style={{ height: '32px' }} />
                                <Link href="/sustainability" className="contents">
                                    <HoverButton theme="transparent-white">
                                        {(hovered) => (
                                            <>
                                                Know More
                                                <div className="relative inline-block w-4 h-4">
                                                    <Image
                                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                                        alt="icon default"
                                                        width={16}
                                                        height={16}
                                                        className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
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
                                                            className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                                                        />
                                                    </motion.div>
                                                </div>
                                            </>
                                        )}
                                    </HoverButton>
                                </Link>
                            </div>
                        </div>

                        {/* Column 3: People */}
                        <div className="flex flex-col h-full items-center justify-center px-12 lg:px-24 transition-colors duration-500 hover:bg-[#004063] cursor-pointer group">
                            <div className="flex flex-col w-full max-w-[320px]">
                                <h2
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '40px',
                                        lineHeight: '110%',
                                        letterSpacing: '0%',
                                    }}
                                >
                                    People
                                </h2>
                                <div style={{ height: '32px' }} />
                                <h3
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        lineHeight: '100%',
                                    }}
                                >
                                    People First
                                </h3>
                                <div style={{ height: '12px' }} />
                                <p
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                    }}
                                >
                                    People are the natural rhythm of WAE — endlessly evolving, quietly resilient, and profoundly capable of renewal. They are the pulse that keeps our purpose alive, the continuity between what we imagine and what we achieve.
                                </p>
                                <div style={{ height: '12px' }} />
                                <p
                                    className="text-white/60 transition-colors duration-500 group-hover:text-white"
                                    style={{
                                        fontFamily: 'Inter Tight',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                    }}
                                >
                                    In their curiosity and courage, the company finds its true flow — powerful, generous, and human at its core.
                                </p>
                                <div style={{ height: '32px' }} />
                                <Link href="/careers3" className="contents">
                                    <HoverButton theme="transparent-white">
                                        {(hovered) => (
                                            <>
                                                Know More
                                                <div className="relative inline-block w-4 h-4">
                                                    <Image
                                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                                                        alt="icon default"
                                                        width={16}
                                                        height={16}
                                                        className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
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
                                                            className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                                                        />
                                                    </motion.div>
                                                </div>
                                            </>
                                        )}
                                    </HoverButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Products Section */}
            <section
                className="bg-black text-white"
                style={{
                    paddingTop: '124px',
                    paddingBottom: '124px',
                    paddingLeft: '2.5vw',
                    paddingRight: '2.5vw'
                }}
            >
                <div className="w-full">
                    <h2
                        style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 500,
                            fontSize: '60px',
                            lineHeight: '105%',
                            letterSpacing: '0%',
                            color: '#FFFFFF',
                            maxWidth: '1200px'
                        }}
                    >
                        Every product is designed to replace plastic and reduce operational carbon footprint.
                    </h2>

                    <div style={{ height: '124px' }} />

                    <div className="flex justify-between items-start">
                        <h3
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                                fontSize: '24px',
                                lineHeight: '110%',
                                letterSpacing: '0px',
                                color: '#FFFFFF'
                            }}
                        >
                            Our Products
                        </h3>
                        <p
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '110%',
                                letterSpacing: '0px',
                                color: '#FFFFFF',
                                maxWidth: '380px',
                                textAlign: 'right'
                            }}
                        >
                            WAE's range of water systems is engineered for every environment - commercial, institutional, and industrial.
                        </p>
                    </div>

                    <div style={{ height: '18px' }} />

                    <div className="grid grid-cols-4 w-full" style={{ height: '506px' }}>
                        {/* Aurela */}
                        <div className="relative group cursor-pointer h-full overflow-hidden">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/317e8eb4-d823-462a-c1d3-54cd0664ea00/public"
                                alt="Aurela"
                                fill
                                className="object-cover"
                            />
                            <motion.div
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 bg-black/70 flex items-center justify-center z-10"
                            >
                                <div
                                    className="rounded-full border border-white flex items-center justify-center"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        fontFamily: 'Manrope',
                                        fontWeight: 600,
                                        fontSize: '18px',
                                        lineHeight: '110%',
                                        textTransform: 'uppercase',
                                        textAlign: 'center'
                                    }}
                                >
                                    AURELA
                                </div>
                            </motion.div>
                        </div>

                        {/* Reva */}
                        <div className="relative group cursor-pointer h-full overflow-hidden">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/62a8a1c0-fffe-44c2-5ae2-ed461e445600/public"
                                alt="Reva"
                                fill
                                className="object-cover"
                            />
                            <motion.div
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 bg-black/70 flex items-center justify-center z-10"
                            >
                                <div
                                    className="rounded-full border border-white flex items-center justify-center"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        fontFamily: 'Manrope',
                                        fontWeight: 600,
                                        fontSize: '18px',
                                        lineHeight: '110%',
                                        textTransform: 'uppercase',
                                        textAlign: 'center'
                                    }}
                                >
                                    REVA
                                </div>
                            </motion.div>
                        </div>

                        {/* Venus */}
                        <div className="relative group cursor-pointer h-full overflow-hidden">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3ed4ddbf-f8ce-4cdb-f703-41fa25cbf400/public"
                                alt="Venus"
                                fill
                                className="object-cover"
                            />
                            <motion.div
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 bg-black/70 flex items-center justify-center z-10"
                            >
                                <div
                                    className="rounded-full border border-white flex items-center justify-center"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        fontFamily: 'Manrope',
                                        fontWeight: 600,
                                        fontSize: '18px',
                                        lineHeight: '110%',
                                        textTransform: 'uppercase',
                                        textAlign: 'center'
                                    }}
                                >
                                    VENUS
                                </div>
                            </motion.div>
                        </div>

                        {/* View All */}
                        <div className="bg-[#004063] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#00304a]">
                            <div
                                className="rounded-full border border-white flex items-center justify-center"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    fontFamily: 'Manrope',
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    lineHeight: '110%',
                                    textTransform: 'uppercase',
                                    textAlign: 'center'
                                }}
                            >
                                VIEW ALL
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* FOOTER SECTION */}
            {/* This div now appears after the section container (which has margin) */}
            <div style={{ position: "relative", zIndex: 10 }}> {/* zIndex 10 here is fine as it's not overlapping a fixed element */}
                <Footer />
            </div>

            {/* INLINE CSS for hover and arrow animations */}
            <style jsx>{`
        /* Custom filter for #004063 blue color */
        .filter-wae-blue {
          filter: invert(16%) sepia(93%) saturate(1599%) hue-rotate(180deg) brightness(96%) contrast(105%);
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