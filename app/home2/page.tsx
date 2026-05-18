"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, animate } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"
import ContactSectionDark from "@/components/contact-section-dark"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

/**
 * Animated counter component
 */
const Counter: FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(0, value, {
            duration: 2,
            onUpdate(value) {
                setCount(value);
            },
        });

        return () => controls.stop();
    }, [value]);

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
                <div className="absolute top-0 left-0 w-1/2 h-full z-[5] backdrop-blur-[25px] bg-black/30" />

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
                                        fontFamily: "'Inter Tight', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Inter Tight', sans-serif",
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
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Inter Tight', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Inter Tight', sans-serif",
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
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Inter Tight', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Inter Tight', sans-serif",
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
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
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
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
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
                className="bg-black text-white border-b border-white"
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
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: '60px',
                            lineHeight: '105%',
                            letterSpacing: '0%',
                            color: '#FFFFFF',
                            marginLeft: '5vw',
                            maxWidth: '1300px'
                        }}
                    >
                        Every product is designed to replace plastic and reduce operational carbon footprint.
                    </h2>

                    <div style={{ height: '124px' }} />

                    <div className="flex justify-between items-start">
                        <h3
                            style={{
                                fontFamily: "'Manrope', sans-serif",
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
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '110%',
                                letterSpacing: '0px',
                                color: '#FFFFFF',
                                maxWidth: '34.72vw',
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
                                        fontFamily: "'Manrope', sans-serif",
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
                                        fontFamily: "'Manrope', sans-serif",
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
                                        fontFamily: "'Manrope', sans-serif",
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
                        <Link href="/our-products2" className="bg-[#004063] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#00304a]">
                            <div
                                className="rounded-full border border-white flex items-center justify-center"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    lineHeight: '110%',
                                    textTransform: 'uppercase',
                                    textAlign: 'center'
                                }}
                            >
                                VIEW ALL
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Carbon Neutral Section */}
            <section
                className="bg-black text-white border-b border-white"
                style={{
                    paddingTop: '123px',
                    paddingBottom: '123px',
                    paddingLeft: '7.5vw',
                    paddingRight: '7.5vw'
                }}
            >
                <div className="flex justify-between items-start w-full">
                    {/* Left Column */}
                    <div style={{ width: '44.93vw' }} className="flex flex-col h-full justify-between">
                        <div>
                            <h2
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '40px',
                                    lineHeight: '110%',
                                    color: '#FFFFFF'
                                }}
                            >
                                Carbon neutral by design
                            </h2>
                            <div style={{ height: '32px' }} />
                            <p
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                    color: '#AEAEAE'
                                }}
                            >
                                Carbon neutrality isn't an afterthought at WAE.<br />It is built into every stage.
                            </p>
                        </div>

                        <div className="mt-[125px]">
                            <motion.div
                                initial={{ filter: 'grayscale(100%)' }}
                                whileHover={{ filter: 'grayscale(0%)' }}
                                transition={{ duration: 0.8 }}
                                className="w-full h-auto cursor-pointer"
                            >
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fd6e76cf-b35a-46af-de19-8caa2b168300/public"
                                    alt="Carbon Neutral Illustration"
                                    width={645}
                                    height={362}
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div style={{ width: '34.93vw' }}>
                        {/* Manufacture */}
                        <div className="flex flex-col">
                            <h4
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '100%',
                                    color: '#FFFFFF'
                                }}
                            >
                                1. Manufacture
                            </h4>
                            <div style={{ height: '12px' }} />
                            <p
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                    color: '#AEAEAE'
                                }}
                            >
                                Energy-efficient production, ZED Gold certified by India's MSME Ministry. Energy-efficient production, ZED Gold certified by India's MSME MinistryEnergy-efficient production, ZED Gold certified
                            </p>
                            <div style={{ height: '22px' }} />
                            <div className="w-full h-px bg-white" />
                        </div>

                        <div style={{ height: '48px' }} />

                        {/* Distribution */}
                        <div className="flex flex-col">
                            <h4
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '100%',
                                    color: '#FFFFFF'
                                }}
                            >
                                2. Distribution
                            </h4>
                            <div style={{ height: '12px' }} />
                            <p
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                    color: '#AEAEAE'
                                }}
                            >
                                Optimised logistics to minimise transport emissions Optimised logistics to minimise transport emissionsOptimised logistics to minimise transport emissionsOptimised logistics to minimise transport emissions
                            </p>
                            <div style={{ height: '22px' }} />
                            <div className="w-full h-px bg-white" />
                        </div>

                        <div style={{ height: '48px' }} />

                        {/* Use */}
                        <div className="flex flex-col">
                            <h4
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '100%',
                                    color: '#FFFFFF'
                                }}
                            >
                                3. Use
                            </h4>
                            <div style={{ height: '12px' }} />
                            <p
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                    color: '#AEAEAE'
                                }}
                            >
                                Products eliminate plastic bottle waste at source Products eliminate plastic bottle waste at sourceProducts eliminate plastic bottle waste at sourceProducts eliminate plastic bottle waste at source
                            </p>
                            <div style={{ height: '22px' }} />
                            <div className="w-full h-px bg-white" />
                        </div>

                        <div style={{ height: '48px' }} />

                        {/* End of life */}
                        <div className="flex flex-col">
                            <h4
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '100%',
                                    color: '#FFFFFF'
                                }}
                            >
                                4. End of life
                            </h4>
                            <div style={{ height: '12px' }} />
                            <p
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                    color: '#AEAEAE'
                                }}
                            >
                                Recyclable components and responsible disposal Recyclable components and responsible disposalRecyclable components and responsible disposalRecyclable components and responsible disposalRecyclable components and responsible disposal
                            </p>
                            <div style={{ height: '22px' }} />
                            <div className="w-full h-px bg-white" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability Impact Section */}
            <section
                className="relative text-white"
                style={{
                    background: 'linear-gradient(146.59deg, #004063 4.52%, #000000 49.04%)',
                    paddingTop: '124px',
                    paddingBottom: '124px',
                    paddingLeft: '7.5vw',
                    paddingRight: '7.5vw',
                    overflow: 'hidden'
                }}
            >
                {/* Background Image (Globe) */}
                <div className="absolute top-0 right-0 h-full w-auto opacity-80 pointer-events-none select-none z-0">
                    <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4c85a864-1c67-40fb-c37a-dd689f3ed700/public"
                        alt="Impact Background"
                        width={1000}
                        height={1000}
                        className="h-full w-auto object-cover object-right"
                    />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="max-w-[600px]">
                        <p
                            style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: '20px',
                                lineHeight: '110%',
                                color: '#FFFFFF'
                            }}
                        >
                            Real numbers. Real results.
                        </p>
                        <div style={{ height: '10px' }} />
                        <h2
                            style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: '40px',
                                lineHeight: '110%',
                                color: '#FFFFFF'
                            }}
                        >
                            Our sustainability impact
                        </h2>
                        <div style={{ height: '32px' }} />
                        <p
                            style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '100%',
                                color: '#AEAEAE',
                                maxWidth: '32.91vw'
                            }}
                        >
                            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
                        </p>
                    </div>

                    <div className="mt-[150px]">
                        <div className="grid grid-cols-2" style={{ maxWidth: '45.55vw', maxHeight: '267px' }}>
                            {/* Litres */}
                            <div className="border-r border-white/20 p-8 pl-0">
                                <Counter value={1012120.45} suffix="+" />
                                <p
                                    style={{
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
                                        fontSize: '18px',
                                        lineHeight: '100%',
                                        color: '#FFFFFF',
                                        // textTransform: 'uppercase'
                                    }}
                                >
                                    Litres
                                </p>
                            </div>

                            <div className="p-8">
                                {/* Empty space in grid? Screenshot shows 3 stats in a 2x2 grid structure but only 3 filled */}
                            </div>

                            {/* Gallon */}
                            <div className="border-r border-t border-white/20 p-8 pl-0">
                                <Counter value={12185.45} suffix="+" />
                                <p
                                    style={{
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
                                        fontSize: '18px',
                                        lineHeight: '100%',
                                        color: '#FFFFFF',
                                        // textTransform: 'uppercase'
                                    }}
                                >
                                    Gallon
                                </p>
                            </div>

                            {/* Millions */}
                            <div className="border-t border-white/20 p-8">
                                <Counter value={22253.65} suffix="+" />
                                <p
                                    style={{
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 400,
                                        fontSize: '18px',
                                        lineHeight: '100%',
                                        color: '#FFFFFF',
                                        // textTransform: 'uppercase'
                                    }}
                                >
                                    Millions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full h-px bg-white" />

            {/* BLOGS SECTION */}
            <section
                className="bg-black text-white"
                style={{
                    paddingTop: '123px',
                    paddingBottom: '123px',
                    paddingLeft: '7.5vw',
                    paddingRight: '7.5vw'
                }}
            >
                <div className="w-full">
                    <h2 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: '40px',
                        lineHeight: '110%',
                        color: '#FFFFFF',
                        marginBottom: '20px'
                    }}>
                        From our blog
                    </h2>
                    <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '140%',
                        color: '#AEAEAE',
                        maxWidth: '450px',
                        marginBottom: '60px'
                    }}>
                        WAE publishes perspectives on climate, water, and sustainability — because good water companies think beyond the tap.
                    </p>

                    <div className="grid grid-cols-3 gap-x-0">
                        {/* Card 1 */}
                        <div className="group cursor-pointer border-l border-white/20 pl-8 pr-12">
                            <div className="relative w-full aspect-square overflow-hidden mb-6">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0d11c81d-cb15-4d1a-b552-895a9f264600/public"
                                    alt="From Kyoto to COP28"
                                    fill
                                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div style={{ minHeight: '80px', marginBottom: '16px' }}>
                                <h3 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '120%',
                                    color: '#FFFFFF'
                                }}>
                                    From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
                                </h3>
                            </div>
                            <p style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '140%',
                                color: '#AEAEAE',
                                marginBottom: '32px'
                            }}>
                                In the quiet halls of Kyoto in 1997, something monumental began a collective awakening of the world's conscience towards the mounting crisis of climate change.
                            </p>
                            <div className="flex items-center gap-2">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#FFFFFF',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px'
                                }}>Read Article</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group cursor-pointer border-l border-white/20 pl-8 pr-12">
                            <div className="relative w-full aspect-square overflow-hidden mb-6">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/50e6b6b0-4629-4ab6-0710-9ecc16700e00/public"
                                    alt="Climate Change in the Indian Subcontinent"
                                    fill
                                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div style={{ minHeight: '80px', marginBottom: '16px' }}>
                                <h3 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '120%',
                                    color: '#FFFFFF'
                                }}>
                                    Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective
                                </h3>
                            </div>
                            <p style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '140%',
                                color: '#AEAEAE',
                                marginBottom: '32px'
                            }}>
                                The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
                            </p>
                            <div className="flex items-center gap-2">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#FFFFFF',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px'
                                }}>Read Article</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group cursor-pointer border-l border-white/20 pl-8 pr-12">
                            <div className="relative w-full aspect-square overflow-hidden mb-6">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/371f4ccb-4672-4c8e-2fba-a3a7ffe05900/public"
                                    alt="The Ozone Crisis"
                                    fill
                                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div style={{ minHeight: '80px', marginBottom: '16px' }}>
                                <h3 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '120%',
                                    color: '#FFFFFF'
                                }}>
                                    The Ozone Crisis: A Success Story in Environmental Cooperation
                                </h3>
                            </div>
                            <p style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '140%',
                                color: '#AEAEAE',
                                marginBottom: '32px'
                            }}>
                                It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth.
                            </p>
                            <div className="flex items-center gap-2">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#FFFFFF',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px'
                                }}>Read Article</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MEDIA & UPDATES SECTION */}
            <section
                className="bg-black text-white"
                style={{
                    paddingTop: '123px',
                    paddingBottom: '123px',
                    paddingLeft: '7.5vw',
                    paddingRight: '7.5vw',
                    borderTop: '1px solid rgba(255, 255, 255, 1)'
                }}
            >
                <div className="w-full">
                    <h2 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: '40px',
                        lineHeight: '110%',
                        color: '#FFFFFF',
                        marginBottom: '80px',
                        maxWidth: '800px'
                    }}>
                        Stay informed with our latest media coverage and announcements
                    </h2>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Main News Column */}
                        <div className="col-span-4">
                            <div className="relative w-full aspect-[1.8/1] overflow-hidden mb-6">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b2089e4-37cf-450d-c869-2248d7209700/public"
                                    alt="WAE ZED Gold Certification"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: '20px',
                                lineHeight: '120%',
                                color: '#FFFFFF',
                                marginBottom: '12px'
                            }}>
                                WAE shines with ZED Gold certification for sustainable excellence
                            </h3>
                            <p style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: '150%',
                                color: '#AEAEAE'
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget nisl magna. Curabitur venenatis est non nibh ultricies dictum. Curabitur venenatis est non nibh ultricies dictum.
                            </p>
                        </div>

                        {/* Middle News Column */}
                        <div className="col-span-4">
                            <div className="relative w-full aspect-[1.8/1] overflow-hidden mb-6">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/97d880ca-cfa0-4094-52b7-940402225a00/public"
                                    alt="Manufacturing"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: '20px',
                                lineHeight: '120%',
                                color: '#FFFFFF',
                                marginBottom: '12px'
                            }}>
                                WAE shines with ZED Gold certification for sustainable excellence
                            </h3>
                            <p style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: '150%',
                                color: '#AEAEAE'
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget nisl magna. Curabitur venenatis est non nibh ultricies dictum. Curabitur venenatis est non nibh ultricies dictum.
                            </p>
                        </div>

                        {/* Sidebar News Column */}
                        <div className="col-span-4 flex flex-col justify-between">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="relative w-[140px] aspect-[1.4/1] flex-shrink-0">
                                        <Image
                                            src={i === 2 ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f2da7d0f-dbed-45a9-1641-8cee5fc4fe00/public" : i === 1 ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b2089e4-37cf-450d-c869-2248d7209700/public" : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b2089e4-37cf-450d-c869-2248d7209700/public"}
                                            alt="Small news item"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h4 style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            lineHeight: '120%',
                                            color: '#FFFFFF'
                                        }}>
                                            WAE shines with ZED Gold certification
                                        </h4>
                                        <p style={{
                                            fontFamily: "'Manrope', sans-serif",
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            lineHeight: '140%',
                                            color: '#AEAEAE'
                                        }}>
                                            Lorem ipsum dolor sit amet,
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section
                className="bg-black text-white"
                style={{
                    paddingTop: '123px',
                    paddingBottom: '123px',
                    paddingLeft: '7.5vw',
                    paddingRight: '7.5vw',
                    borderTop: '1px solid rgba(255, 255, 255, 1)'
                }}
            >
                <ContactSectionDark />
            </section>
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