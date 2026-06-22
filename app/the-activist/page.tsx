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
}

const HoverButton: FC<HoverButtonProps> = ({ children, href }) => {
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
                backgroundColor: hovered ? "#000" : "#fff",
                border: "1px solid #000",
                cursor: "pointer",
                color: hovered ? "#fff" : "#000",
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

const governanceCards = [
    {
        id: "1.",
        title: "ESG Policy",
        text: "We set measurable targets, track outcomes, and align operations with long-term eco-logical balance. Sustainability is woven into procurement, partnerships.",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="10"></circle>
                <path d="M16 16c-2-4-6-6-10-2 2 4 6 6 10 2z"></path>
                <path d="M32 32c2 4 6 6 10 2-2-4-6-6-10-2z"></path>
                <path d="M16 32c-2 4-6 6-10 2 2-4 6-6 10-2z"></path>
                <path d="M32 16c2-4 6-6 10-2-2 4-6 6-10 2z"></path>
                <path d="M20 20l4 4-2 6"></path>
                <path d="M28 20l-2 4 4 2"></path>
            </svg>
        )
    },
    {
        id: "2.",
        title: "Compliances",
        text: "Compliance is our baseline, not our benchmark. We adhere to environmental, safety, and statutory standards, reinforced through proactive audits and certifications.",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M28 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V16z"></path>
                <polyline points="28 4 28 16 40 16"></polyline>
                <polyline points="16 26 22 32 32 20"></polyline>
            </svg>
        )
    },
    {
        id: "3.",
        title: "Ethical Sourcing",
        text: "Impact begins upstream. We prioritise responsible suppliers, transparent processes, and durable materials. Responsibility must travel the entire value chain.",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 32c-3 0-6 2-6 5s3 5 6 5h14c6 0 10-4 10-10H20l-4 5z"></path>
                <path d="M24 18c-2-3-6-3-8 1-1 3 2 6 8 11 6-5 9-8 8-11-2-4-6-4-8-1z"></path>
            </svg>
        )
    },
    {
        id: "4.",
        title: "Sustainability Report",
        text: "We report plastic reduction, carbon savings, water conservation, and community impact with clarity. It's an open ledger of progress.",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M28 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V16z"></path>
                <polyline points="28 4 28 16 40 16"></polyline>
                <path d="M24 34c0-7-6-7-6-7s0-6 7-6 6 6 6 6-6 0-6 7z"></path>
                <path d="M24 34v-7"></path>
            </svg>
        )
    },
    {
        id: "5.",
        title: "Impact Stories",
        text: "Documented across three volumes, Impact Stories capture milestones and the growth toward responsible, refill-centric futures.",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12h28c2 0 4 2 4 4v8c0 2-2 4-4 4H26l-6 6v-6h-6c-2 0-4-2-4-4v-8c0-2 2-4 4-4z"></path>
                <path d="M12 36l6-4h12l6 4v8h-24v-8z"></path>
                <line x1="24" y1="32" x2="24" y2="44"></line>
                <line x1="18" y1="18" x2="30" y2="18"></line>
            </svg>
        )
    }
];

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
        { text: "Blog", href: "/blogs" },
    ]
    const lineCount = Math.min(productsItems.length, blueprintItems.length) // Note: lineCount is calculated but not used

    return (
        <main className="relative pb-[40px]">
            {/* HEADER (Not Fixed in this version) */}
            {/* The div with inline styles here seems unnecessary if not fixed */}
            <div> {/* Consider removing this outer div or making it relative/static */}
                <header ref={headerRef} className={`w-full relative z-10 pb-5 bg-white`}> {/* Apply containerClass inside header content div */}
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
                        <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

                        {/* Bottom Row: Logo, Tagline and Menu Items */}
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
                className="w-full relative bg-white overflow-hidden"
                style={{ height: `calc(100vh - ${headerHeight}px)` }}
            >
                {/* Background video */}
                <video
                    src="/the-activist-hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Text overlay — 59px above bottom, left margin 9.72% */}
                <div
                    className="absolute"
                    style={{ bottom: "59px", left: "9.72%" }}
                >
                    {/* Headline */}
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 500,
                        fontSize: "47px",
                        lineHeight: "110%",
                        letterSpacing: "0%",
                        color: "#FFFFFF",
                        margin: 0,
                        marginBottom: "20px",
                    }}>
                        Earth, Our Only Shareholder
                    </p>

                    {/* Scroll for more row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <span style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#FFFFFF",
                        }}>
                            SCROLL FOR MORE
                        </span>
                        <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ab21a431-a08a-486f-1cd9-aba510ee8600/public"
                            alt="Scroll"
                            width={12}
                            height={12}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
            </section>

            {/* SAY NO TO BOTTLED WATER SECTION */}
            <section className="w-full bg-[#f2f2f2]" style={{ paddingTop: "121px", paddingBottom: "121px", paddingLeft: "9.72%", paddingRight: "6.46%" }}>
                <div className="w-full max-w-[1440px] mx-auto">
                    {/* Label */}
                    <p
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#00000099",
                            margin: 0,
                            marginBottom: "19px",
                        }}
                    >
                        An Activist Company
                    </p>

                    {/* Heading */}
                    <h2
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "36px",
                            lineHeight: "110%",
                            letterSpacing: "0%",
                            color: "#000000",
                            textTransform: "capitalize",
                            margin: 0,
                            marginBottom: "33px",
                        }}
                    >
                        Say No To Bottled Water
                    </h2>

                    {/* Subheading */}
                    <p
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#00000099",
                            margin: 0,
                            marginBottom: "83px",
                        }}
                    >
                        No bottle. No compromise. No excuses.<br />
                        Because when blue is protected, everything green that depends on it survives.
                    </p>

                    {/* Row 1 */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "115px" }}>
                        {/* Card 1 — Action */}
                        <div style={{ width: "21.875vw" }}>
                            <div style={{ height: "49px", display: "flex", alignItems: "flex-end", marginBottom: "32px" }}>
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b2262a67-0658-41c8-b5e9-fc7671450500/public" alt="Action icon" width={33} height={33} style={{ display: "block" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "26px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", margin: 0, marginBottom: "24px" }}>Action</h3>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0, marginBottom: "20px" }}>
                                Talk is cheap. Plastic is cheaper. Action is everything.
                            </p>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0 }}>
                                WAE builds stainless steel systems that outlast trends, purification technology that restores what pollution stole, and refill infrastructure that makes doing the right thing effortlessly human.…{" "}
                                <span style={{ fontWeight: 500, cursor: "pointer", color: "#000000" }}>Read more</span>
                            </p>
                        </div>

                        {/* Card 2 — Activism */}
                        <div style={{ width: "20.83333vw" }}>
                            <div style={{ height: "49px", display: "flex", alignItems: "flex-end", marginBottom: "32px" }}>
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/950014d5-b09b-43f2-9ef0-75cd3e02bc00/public" alt="Activism icon" width={49} height={49} style={{ display: "block" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "26px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", margin: 0, marginBottom: "24px" }}>Activism</h3>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0, marginBottom: "20px" }}>
                                Every bottle you throw away outlives you.
                            </p>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0 }}>
                                Not by years. By centuries. Long after you're gone, that single-use plastic will still be breaking down, seeping into soils, drifting through oceans, and quietly entering the bodies of people not yet…{" "}
                                <span style={{ fontWeight: 500, cursor: "pointer", color: "#000000" }}>Read more</span>
                            </p>
                        </div>

                        {/* Card 3 — Alignment */}
                        <div style={{ width: "20.83333vw" }}>
                            <div style={{ height: "49px", display: "flex", alignItems: "flex-end", marginBottom: "32px" }}>
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2c3dbfdd-cfa0-4967-1ef4-6270bcf0ca00/public" alt="Alignment icon" width={25} height={21} style={{ display: "block" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "26px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", margin: 0, marginBottom: "24px" }}>Alignment</h3>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0, marginBottom: "20px" }}>
                                Here's the uncomfortable truth: the planet doesn't need us. We need it.
                            </p>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0 }}>
                                Every river, forest, and ecosystem operated in elegant balance long before the first boardroom meeting. WAE operates from that humility. Ecology…{" "}
                                <span style={{ fontWeight: 500, cursor: "pointer", color: "#000000" }}>Read more</span>
                            </p>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {/* Card 4 — Ideas */}
                        <div style={{ width: "21.875vw" }}>
                            <div style={{ height: "49px", display: "flex", alignItems: "flex-end", marginBottom: "32px" }}>
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8fbd3c5c-cb6f-4b16-3b12-bf1d6ea96400/public" alt="Ideas icon" width={37} height={37} style={{ display: "block" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "26px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", margin: 0, marginBottom: "24px" }}>Ideas</h3>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0, marginBottom: "20px" }}>
                                The best ideas don't add to the problem — they dissolve it.
                            </p>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0 }}>
                                At WAE, we asked: what if water never cost the Earth its health? What if every drink left things better than it found them? Those questions became products, systems, and a movement. Circular by design. Restorative by intention.…{" "}
                                <span style={{ fontWeight: 500, cursor: "pointer", color: "#000000" }}>Read more</span>
                            </p>
                        </div>

                        {/* Card 5 — Impact */}
                        <div style={{ width: "20.83333vw" }}>
                            <div style={{ height: "49px", display: "flex", alignItems: "flex-end", marginBottom: "32px" }}>
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ebbf8084-97a2-4d28-4a1c-b57d66240200/public" alt="Impact icon" width={33} height={33} style={{ display: "block" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "26px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", margin: 0, marginBottom: "24px" }}>Impact</h3>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0, marginBottom: "20px" }}>
                                The most powerful impact is invisible.
                            </p>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0 }}>
                                It's the bottle that was never made. The microplastic that never entered a child's bloodstream. The ocean floor that remained undisturbed. You won't see it on a shelf or in an ad, but it's real, cumulative, and growing.…{" "}
                                <span style={{ fontWeight: 500, cursor: "pointer", color: "#000000" }}>Read more</span>
                            </p>
                        </div>

                        {/* Card 6 — Innovation */}
                        <div style={{ width: "20.83333vw" }}>
                            <div style={{ height: "49px", display: "flex", alignItems: "flex-end", marginBottom: "32px" }}>
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5f584bfb-a14a-4213-328d-e63560b70100/public" alt="Innovation icon" width={36} height={36} style={{ display: "block" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "26px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", margin: 0, marginBottom: "24px" }}>Innovation</h3>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0, marginBottom: "20px" }}>
                                Here's the uncomfortable truth: the planet doesn't need us. We need it.
                            </p>
                            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "105%", letterSpacing: "0%", color: "#00000099", margin: 0 }}>
                                Every river, forest, and ecosystem operated in elegant balance long before the first boardroom meeting. WAE operates from that humility. Ecology…{" "}
                                <span style={{ fontWeight: 500, cursor: "pointer", color: "#000000" }}>Read more</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 01 SECTION */}
            <section className="w-full bg-white py-[104px] pl-[9.305%] pr-[8.264%]">
                <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">

                    {/* Left: 01 and Title */}
                    <div className="flex flex-row items-center gap-6 lg:gap-[40px] w-full lg:w-[45%]">
                        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "200px", lineHeight: "110%", letterSpacing: "0%", color: "#000000" }}>
                            01
                        </div>
                        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "40px", lineHeight: "110%", letterSpacing: "0%", color: "#000000", display: "flex", flexDirection: "column" }}>
                            <span>Per Cent</span>
                            <span>Principle</span>
                            <span>Planet</span>
                        </div>
                    </div>

                    {/* Right: Text Blocks */}
                    <div className="w-full lg:w-[50%] flex flex-col justify-center space-y-[20px] text-[#00000099]">
                        <p className="font-normal text-[12px] leading-[140%] md:leading-[100%]" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                            One percent doesn't sound like much. Until you realise it's the difference between taking and giving back.
                        </p>
                        <p className="font-medium text-[12px] leading-[140%] md:leading-[100%] text-black" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                            WAE commits 1% to the planet, not as charity, not as a PR move, but as a discipline. A quiet acknowledgment that everything we build is borrowed. That profit built on extraction without return is just slow debt.
                        </p>
                        <p className="font-normal text-[12px] leading-[140%] md:leading-[100%]" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                            The Earth doesn't issue invoices. It issues consequences.
                        </p>
                        <p className="font-normal text-[12px] leading-[140%] md:leading-[100%]" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                            We choose to pay our dues early, willingly, and without asterisks. Because there is only one planet, and it deserves at least that.
                        </p>
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