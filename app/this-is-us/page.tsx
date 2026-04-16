"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"

// --- NEW MOBILE HEADER COMPONENT ---
interface MobileHeaderProps {
    productsItems: { text: string; href: string }[];
    blueprintItems: { text: string; href: string; }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ productsItems, blueprintItems }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''; // Cleanup on unmount
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Fixed Mobile Header Bar (Visible only on small screens) */}
            <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-black/10 md:hidden ">
                {/* Mobile Logo */}
                <Link href="/">
                    <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce113ad4-0a6b-43dd-066c-26769520d000/public"
                        alt="WAE Logo Mobile"
                        width={40}
                        height={40}
                    />
                </Link>
                {/* Hamburger Menu Icon */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex flex-col justify-around w-6 h-5 relative z-50 focus:outline-none"
                    aria-label="Toggle mobile menu"
                >
                    {/* Hamburger lines - always black for visibility on white background */}
                    <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
                    {/* <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span> */}
                    <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay (Slides in from right) */}
            <div
                className={`fixed inset-0 bg-black z-40 flex flex-col items-start pt-[80px] pb-5 px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >

                {/* Menu Items - THIS IS THE CHANGE */}
                {/* Changed flex-col to flex-row and added flex-wrap for multiple rows if needed */}
                {/* Also adjusted spacing and alignment for a horizontal layout */}
                <div className="flex flex-row flex-wrap justify-start items-center gap-x-6 gap-y-4 w-full mb-8">
                    <h3 className="text-white text-xs font-semibold uppercase mb-2 font-['Inter Tight', sans-serif] w-full">Inside WAE</h3>
                    {productsItems.map((item, i) => (
                        <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium font-['Inter Tight', sans-serif] leading-[110%]">
                            {item.text}
                        </Link>
                    ))}
                </div>
                <div className="w-full h-px bg-[#D9D9DC] mb-8" /> {/* Divider */}
                <div className="flex flex-row flex-wrap justify-start items-center gap-x-6 gap-y-4 w-full">
                    <h3 className="text-white text-xs font-semibold uppercase mb-2 font-['Inter Tight', sans-serif] w-full">Etcetera</h3>
                    {blueprintItems.map((item, i) => (
                        <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium font-['Inter Tight', sans-serif] leading-[110%]">
                            {item.text}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};
// --- END NEW MOBILE HEADER COMPONENT ---


// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-[140px]";

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
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: "100%",
                textTransform: "uppercase",
                backgroundColor: hovered ? "#000" : "#f2f2f2",
                border: "1px solid #000",
                cursor: "pointer",
                color: hovered ? "#fff" : "#000",
            }}
        >
            {children(hovered)}
        </button>
    );

    return href ? (
        href.startsWith('#') ? (
            <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
        ) : (
            <Link href={href} className="contents">{buttonContent}</Link>
        )
    ) : buttonContent;
};

const LinkedInButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative inline-block w-[32px] h-[32px]">
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/042c1bc2-c4d9-4047-a3a8-d4ccf1a59900/public"
                alt="LinkedIn" width={32} height={32}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{ opacity: hovered ? 0 : 1 }}
            />
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5bfff22f-161f-41ff-bf68-61c7c5c56a00/public"
                alt="LinkedIn Hover" width={32} height={32}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{ opacity: hovered ? 1 : 0 }}
            />
        </a>
    );
};

const CaseStudyButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition-all duration-650 ease inline-flex items-center justify-center p-0 mt-8"
            style={{
                width: '135px',
                height: '35px',
                pointerEvents: "auto",
                gap: "6px",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: "100%",
                textDecoration: "none",
                backgroundColor: hovered ? "#000" : "transparent",
                border: "1px solid #000",
                cursor: "pointer",
                color: hovered ? "#fff" : "#000",
            }}
        >
            Read the full story
            <div className="relative inline-block w-[12px] h-[12px]">
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                    alt="icon default"
                    className="w-full h-full object-contain absolute top-0 left-0 pt-[1px]"
                    style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.5s' }}
                />
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                    alt="icon hover"
                    className="w-full h-full object-contain absolute top-0 left-0 pt-[1px]"
                    style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }}
                />
            </div>
        </a>
    );
};

const DarkSectionButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition-all duration-650 ease inline-flex items-center justify-center p-0 mt-8"
            style={{
                width: '135px',
                height: '35px',
                pointerEvents: "auto",
                gap: "6px",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: "100%",
                textDecoration: "none",
                backgroundColor: hovered ? "#fff" : "transparent",
                border: "1px solid #fff",
                cursor: "pointer",
                color: hovered ? "#000" : "#fff",
            }}
        >
            Know More
            <div className="relative inline-block w-[12px] h-[12px] ml-1">
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                    alt="icon default"
                    className="w-full h-full object-contain absolute top-0 left-0 pt-[1px]"
                    style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.5s', filter: 'invert(1)' }}
                />
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                    alt="icon hover"
                    className="w-full h-full object-contain absolute top-0 left-0 pt-[1px]"
                    style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.5s', filter: 'invert(1)' }}
                />
            </div>
        </a>
    );
};

export default function Home() {
    const [activeSection, setActiveSection] = useState(0)
    const [currentTime, setCurrentTime] = useState("")
    const [headerHeight, setHeaderHeight] = useState(0)
    const headerRef = useRef<HTMLDivElement>(null)

    const [taglineVisible, setTaglineVisible] = useState(true)
    const prevScrollY = useRef(0)

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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setTaglineVisible(currentScrollY < prevScrollY.current)
            prevScrollY.current = currentScrollY
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

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

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.clientHeight);
            }
        };
        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

    const productsItems = [
        { text: "This is Us", href: "/inside-wae" },
        { text: "Our Portfolio", href: "/our-portfolio" },
        { text: "Reimagine Work", href: "/careers3" },
    ]
    const blueprintItems = [
        { text: "Sustainability", href: "/sustainability" },
        { text: "The Activist Co.", href: "/the-activist-co" },
        { text: "Blog", href: "/blogs2" },
    ]
    const lineCount = Math.min(productsItems.length, blueprintItems.length)

    return (
        <main className="relative pb-[40px]">
            {/* RENDER MOBILE HEADER COMPONENT HERE (only on small screens) */}
            <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />

            {/* DESKTOP HEADER (Hidden on small screens) */}
            {/* Removed mb-5 to allow hero to start immediately after it */}
            <header ref={headerRef} className={`w-full bg-white relative z-10 hidden md:block`}>
                <div className={containerClass}>
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
                                fontSize: "11px",
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
                                        fontSize: "11px",
                                        lineHeight: "110%",
                                    }}
                                >
                                    <Link href={item.href} className="contents">
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
                                    <Link href={item.href} className="contents">
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

            {/* Hero section */}
            <section
                id="hero"
                className="relative w-full overflow-hidden pt-5 bg-white"
            >
                {/* Desktop: Background video (full width, natural height) */}
                <div className="w-full">
                    <video
                        src="/3f6940f6f51b6c16ee6d8104dc1d4344a4633a81.mp4"
                        className="hidden md:block w-full h-auto z-0"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* 1. Split Text Section */}
            <section className="w-full flex flex-col md:flex-row font-['Inter_Tight']">
                {/* Left Side (White) */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-[9.72%]">
                    <p className="pb-[49px] text-[20px] text-[#00000099]">WAE</p>
                    <div className="max-w-[420px]">
                        <h2 className="text-[36px] md:text-[36px] font-medium leading-[120%] mb-12 text-black">
                            Built to end single-use plastic at scale
                        </h2>
                        <p className="text-[14px] font-medium leading-[130%] text-[#00000099]">
                            WAE is a mission-led, technology-driven provider of steel-first, point-of-use drinking water systems. Founded in 2010 to replace single-use bottled water with infrastructure-grade alternatives.
                        </p>
                    </div>
                </div>
                {/* Right Side (Black) */}
                <div className="w-full md:w-1/2 bg-[#0F0F0F] flex flex-col justify-center px-[9.72%] pt-[140px] pb-[89px]">
                    <div className="max-w-[420px]">
                        <h2 className="text-[36px] md:text-[36px] font-medium leading-[120%] mb-12 text-white">
                            A $3B market shifting away from the bottle
                        </h2>
                        <div className="text-[14px] font-medium leading-[130%] text-[#FFFFFF] space-y-6">
                            <p>The global water dispenser market is valued at $3.3B in 2025 and is projected to reach $7.6B by 2035, growing at 8.5% CAGR. Bottle-less, point-of-use systems are the fastest-growing segment, expanding at ~9.5% CAGR, driven by tightening plastic regulations across Europe, North America, and Asia.</p>
                            <p>Three forces are converging:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Corporate ESG mandates requiring measurable plastic reduction</li>
                                <li>Government legislation restricting single-use plastics in public spaces</li>
                                <li>Institutional demand for sustainable, cost-effective hydration infrastructure</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Mission and Vision Section */}
            <section className="w-full bg-[#f2f2f2] px-[9.44%] py-[120px]">
                <div className="flex flex-col gap-16 md:gap-[120px] max-w-[1440px] mx-auto">
                    {/* Mission */}
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/3 flex flex-col mb-8 md:mb-0">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7a5568a3-3b06-40ae-0cfe-3030021e8800/public"
                                alt="Mission Icon"
                                width={35}
                                height={35}
                                className="mb-6"
                            />
                            <h2 style={{
                                fontFamily: "Manrope, sans-serif",
                                fontWeight: 500,
                                fontStyle: "normal",
                                fontSize: "32px",
                                lineHeight: "110%",
                                letterSpacing: "0%",
                                verticalAlign: "middle"
                            }} className="text-black">
                                Our Mission
                            </h2>
                        </div>
                        <div className="w-full md:w-[36%] flex items-start">
                            <p style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontStyle: "normal",
                                fontSize: "14px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#00000099"
                            }}>
                                WAE exists to make a meaningful, lasting contribution, protecting the environment and improving the quality of human life without compromising future generations. Our idea of leadership is not defined by scale, but by excellence: in green technologies, consumer value, customer service, and employee capability. We seek to reconcile social progress, professional fulfilment, quality-driven service, and economic development. Long-term value creation must remain balanced, responsible, and sustainable. Growth, for us, is not a number on a chart. It is the outcome of doing right by people, planet, and the communities we are built to serve.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/3 flex flex-col mb-8 md:mb-0">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d3de72ac-82e3-443f-9491-2a6dcca3d700/public"
                                alt="Vision Icon"
                                width={35}
                                height={35}
                                className="mb-6"
                            />
                            <h2 style={{
                                fontFamily: "Manrope, sans-serif",
                                fontWeight: 500,
                                fontStyle: "normal",
                                fontSize: "32px",
                                lineHeight: "110%",
                                letterSpacing: "0%",
                                verticalAlign: "middle"
                            }} className="text-black">
                                Our Vision
                            </h2>
                        </div>
                        <div className="w-full md:w-[36%] flex items-start">
                            <p style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontStyle: "normal",
                                fontSize: "14px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#00000099"
                            }}>
                                WAE translates values into action through research-driven products and solutions that serve both the environment and human well-being. We operate as a technology-led organisation, guided by knowledge, science, and long-term thinking, not short-term market pressures. Accountability to employees, customers, partners, and societies is not optional. It is how we operate. We hold ourselves to the highest standards across products, services, relationships, and commitments. Profit is a strategic necessity, not the goal. It follows meaningful contribution, shared progress, and participative growth. That distinction shapes every decision we make, from the materials we choose to the partnerships we build.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Our Business Model Section */}
            <section className="w-full bg-white px-[9.72%] py-[120px] font-['Inter_Tight']">
                <h2 className="text-[32px] md:text-[40px] font-medium leading-[110%] mb-16 text-black" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Our Business Model
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">

                    {/* Column 1 */}
                    <div className="flex flex-col items-start border-l border-[#8D8D8D] pl-6 md:pl-8 h-full">
                        <h3 className="text-[20px] md:text-[24px] font-medium text-black mb-8 leading-[120%] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            Single-use plastic is an<br />institutional problem
                        </h3>
                        <div className="text-[14px] font-medium leading-[140%] text-[#00000099] space-y-6">
                            <p>Most organisations have made sustainability commitments, but their water infrastructure contradicts them. Bottled water creates ongoing plastic waste, carbon cost from logistics, and reputational risk.</p>
                            <p>The market has no shortage of hydration products. It has a shortage of credible, scalable alternatives designed for institutional environments, with material integrity and ESG traceability built in.</p>
                            <p>What's missing is not intent—but infrastructure intelligence. Organizations need systems that integrate purification at the point of use, eliminate dependency on external supply chains, and provide measurable impact data across water, carbon, and waste metrics. Without this shift, sustainability remains a reported ambition rather than an operational reality.</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col items-start border-l border-[#8D8D8D] pl-6 md:pl-8 h-full">
                        <h3 className="text-[20px] md:text-[24px] font-medium text-black mb-8 leading-[120%] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            The bottle gets replaced<br />with infrastructure
                        </h3>
                        <div className="text-[14px] font-medium leading-[140%] text-[#00000099] space-y-6">
                            <p>WAE designs and deploys steel-first, point-of-use water systems for public institutions, corporate campuses, hospitality, and healthcare environments. Our systems connect directly to the water supply, eliminating plastic at the source, not the policy level.</p>
                            <div>
                                <p className="mb-2">Key differentiators:</p>
                                <ul className="list-none space-y-2">
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>Steel-first material philosophy: no plastic contact with water</li>
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>Designed for institutional scale, not consumer markets</li>
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>ESG-traceable: aligned with UN SDG 6 (clean water and sanitation) and circular economy principles</li>
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>End-to-end service model covering installation, maintenance, and impact reporting</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col items-start border-l border-[#8D8D8D] pl-6 md:pl-8 h-full">
                        <h3 className="text-[20px] md:text-[24px] font-medium text-black mb-8 leading-[120%] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            How the model works in<br />practice
                        </h3>
                        <div className="text-[14px] font-medium leading-[140%] text-[#00000099] space-y-6">
                            <p>Site assessment: WAE audits the client's existing water usage, plastic footprint, and infrastructure</p>
                            <ol className="list-none space-y-3">
                                <li><span className="font-semibold text-black/80">1. System design:</span> Custom-configured point-of-use units specified for the environment</li>
                                <li><span className="font-semibold text-black/80">2. Installation:</span> Steel-first systems installed directly into the water supply, zero plastic in the water path</li>
                                <li><span className="font-semibold text-black/80">3. Service & reporting:</span> Ongoing maintenance with measurable plastic elimination data for ESG reporting</li>
                                <li><span className="font-semibold text-black/80">4. Scale:</span> Systems are modular and replicable across sites, campuses, and geographies</li>
                            </ol>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. Black Banner Context Section */}
            <section className="w-full bg-[#0F0F0F] py-[100px] md:py-[140px] px-[14.20%] font-['Inter_Tight'] text-white">
                <div>
                    <p className="text-[32px] font-normal leading-[120%] mb-0">
                        WAE was built as an activist <span className="font-bold">organisation</span>, not a product company. That origin shapes everything: material choices, partnerships, pricing philosophy, and where we deploy.
                        <br />
                        <br />
                        It is not <span className="font-bold">positioning</span>.<br />
                        It is <span className="font-bold">structure</span>.
                    </p>
                </div>
            </section>

            {/* 5. Team Section */}
            <section className="w-full bg-[#f2f2f2] px-[9.72%] py-[120px] font-['Inter_Tight']">
                <h2 className="text-[40px] md:text-[48px] font-medium leading-[110%] mb-16 text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                    The team behind WAE
                </h2>

                {/* Founder Block */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-24 items-start max-w-[1440px] mx-auto">
                    {/* Image */}
                    <div className="w-full md:w-[45%]">
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/33375025-0570-4253-56a7-580216923b00/public"
                                alt="A. Vikram Joshe"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* Text */}
                    <div className="w-full md:w-[55%] flex flex-col justify-start">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-[28px] md:text-[32px] font-medium text-black">A. Vikram Joshe</h3>
                                <p className="text-[14px] font-bold text-black mt-1">Founder & CEO</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/avikramjoshie/" />
                        </div>
                        <div className="mt-12">
                            <blockquote className="text-[24px] md:text-[28px] font-medium text-black leading-[120%] mb-8 tracking-tight">
                                "Water is one of the world's most visible expressions of care, and the future of care must include care for the planet."
                            </blockquote>
                            <p className="text-[14px] font-medium leading-[140%] text-[#00000099]">
                                A sustainability entrepreneur with three decades of cross-sector experience, building a water-secure future by making sustainable water technologies accessible and mainstream through responsible, long-term solutions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-16 max-w-[1440px] mx-auto">
                    {/* Deepak Panwar */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/3] w-full mb-6 bg-gray-200">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6bc35551-9c5a-4161-328f-da4114280600/public" alt="Deepak Panwar" fill className="object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[20px] font-medium text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Deepak Panwar</h4>
                                <p className="text-[12px] font-bold text-black mt-1">CEO - Food & Beverage Division</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/deepak-panwar-a546561aa/" />
                        </div>
                        <p className="text-[12px] font-medium leading-[140%] text-[#00000099]">
                            Leads WAE's Food & Beverage division, bringing senior leadership experience to drive strategic growth and expand the organisation's commercial footprint across food and hospitality sectors.
                        </p>
                    </div>

                    {/* Nayna Swati Dewesar */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/3] w-full mb-6 bg-gray-200">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Nayna Swati Dewesar" fill className="object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[20px] font-medium text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Nayna Swati Dewesar</h4>
                                <p className="text-[12px] font-bold text-black mt-1">Corporate Finance & Commercial</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/nayna-swati-dewesar-62414a35/" />
                        </div>
                        <p className="text-[12px] font-medium leading-[140%] text-[#00000099]">
                            A founding member of WAE, she leads corporate finance, procurement, and commercial projects, strengthening financial discipline, operational efficiency, and strategic execution across the wider organisation.
                        </p>
                    </div>

                    {/* Satinder Kaur */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/3] w-full mb-6 bg-gray-200">
                            {/* Placeholder image (Nayna) */}
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Satinder Kaur" fill className="object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[20px] font-medium text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Satinder Kaur</h4>
                                <p className="text-[12px] font-bold text-black mt-1">Chief Revenue Officer</p>
                            </div>
                            {/* Placeholder link */}
                            <LinkedInButton href="#" />
                        </div>
                        <p className="text-[12px] font-medium leading-[140%] text-[#00000099]">
                            Leads WAE's revenue strategy and overall commercial growth, overseeing sales operations, key account management, and strategic partnership development to drive consistent, scalable, long-term institutional revenue.
                        </p>
                    </div>

                    {/* Avnesh Sharma */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/3] w-full mb-6 bg-gray-200">
                            {/* Placeholder image (Deepak) */}
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6bc35551-9c5a-4161-328f-da4114280600/public" alt="Avnesh Sharma" fill className="object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[20px] font-medium text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Avnesh Sharma</h4>
                                <p className="text-[12px] font-bold text-black mt-1">Director - Customer Value Management</p>
                            </div>
                            {/* Placeholder link */}
                            <LinkedInButton href="#" />
                        </div>
                        <p className="text-[12px] font-medium leading-[140%] text-[#00000099]">
                            Drives customer value delivery and long-term retention across WAE's institutional client base, managing relationships and ensuring clients achieve measurable outcomes from their water infrastructure investments.
                        </p>
                    </div>

                    {/* Meenakshi Bora */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/3] w-full mb-6 bg-gray-200">
                            {/* Placeholder image (Nayna) */}
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Meenakshi Bora" fill className="object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[20px] font-medium text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Meenakshi Bora</h4>
                                <p className="text-[12px] font-bold text-black mt-1">VP - Client Relations & Operations</p>
                            </div>
                            {/* Placeholder link */}
                            <LinkedInButton href="#" />
                        </div>
                        <p className="text-[12px] font-medium leading-[140%] text-[#00000099]">
                            Aligns client relations and operations at WAE, enabling efficient, responsive service delivery and consistent client satisfaction through strong coordination, cross-functional execution, and operational excellence throughout.
                        </p>
                    </div>

                    {/* Rashmi Bhatia */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/3] w-full mb-6 bg-gray-200">
                            {/* Placeholder image (Nayna) */}
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Rashmi Bhatia" fill className="object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[20px] font-medium text-black tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Rashmi Bhatia</h4>
                                <p className="text-[12px] font-bold text-black mt-1">Director - Finance & Accounts</p>
                            </div>
                            {/* Placeholder link */}
                            <LinkedInButton href="#" />
                        </div>
                        <p className="text-[12px] font-medium leading-[140%] text-[#00000099]">
                            Brings over 14 years in corporate finance. Leads WAE's finance and accounts function, ensuring financial governance, accuracy, compliance, and sustainable fiscal management across the organisation.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. Case Studies Section */}
            <section className="w-full bg-[#f2f2f2] px-[9.72%] pb-[120px] font-['Inter_Tight']">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start max-w-[1440px] mx-auto">

                    {/* Left Column (1/3) */}
                    <div className="w-full md:w-1/3 flex flex-col md:pr-4">
                        <h2 className="text-[36px] md:text-[44px] font-medium leading-[110%] text-black tracking-tight mb-6 mt-16 md:mt-24" style={{ fontFamily: "Manrope, sans-serif" }}>
                            Case Studies
                        </h2>
                        <p className="text-[14px] font-medium leading-[140%] text-[#00000099]">
                            The success stories that changed what<br />sustainable hydration looks like.
                        </p>
                    </div>

                    {/* Right Container (2/3) -> nested grid */}
                    <div className="w-full md:w-2/3 mt-16 md:mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">

                            {/* Vol 1 */}
                            <div className="flex flex-col">
                                <p className="text-[12px] font-bold text-black mb-6">Volume 1:</p>
                                <h3 className="text-[20px] md:text-[24px] font-medium leading-[120%] text-black tracking-tight mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                                    Greener Banking, Better<br />Workplaces
                                </h3>
                                <p className="text-[14px] font-medium leading-[140%] text-[#00000099] mb-8">
                                    How BFSI organizations ditched plastic water jars<br />for a cleaner, safer alternative
                                </p>
                                <p className="text-[16px] font-bold italic leading-[130%] text-black mb-2">
                                    "It was a small change on paper. The<br />impact was anything but."
                                </p>
                                <p className="text-[12px] font-medium italic leading-[130%] text-[#00000099] mb-6">
                                    - Facilities Head, Bank of America
                                </p>
                                <p className="text-[12px] font-medium leading-[140%] text-[#00000099] mb-4">
                                    Banks and insurance offices run 24/7, and so did their plastic water jar problem-spills, hygiene concerns, and hundreds of jars piling up every month. By switching to stainless steel dispensers, BFSI offices cut plastic waste significantly, reduced water contamination risks, and gave employees a cleaner, more professional workspace. One switch. A lasting difference.
                                </p>
                                <CaseStudyButton href="/sustainability-bfsi" />
                            </div>

                            {/* Image Tall */}
                            <div className="flex flex-col relative w-full h-[600px] md:h-auto">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a5a62ff4-c6a9-49c5-60d9-701b19f00600/public"
                                    alt="Case Study"
                                    fill
                                    className="object-cover transition-all duration-1000 grayscale hover:grayscale-0"
                                />
                            </div>

                            {/* Vol 2 */}
                            <div className="flex flex-col">
                                <p className="text-[12px] font-bold text-black mb-6">Volume 2:</p>
                                <h3 className="text-[20px] md:text-[24px] font-medium leading-[120%] text-black tracking-tight mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                                    Clean Hydration for High-<br />Performance IT Teams
                                </h3>
                                <p className="text-[14px] font-medium leading-[140%] text-[#00000099] mb-8">
                                    How IT campuses moved away from plastic jars<br />and never looked back
                                </p>
                                <p className="text-[16px] font-bold italic leading-[130%] text-black mb-2">
                                    "Our employees noticed the<br />difference from day one."
                                </p>
                                <p className="text-[12px] font-medium italic leading-[130%] text-[#00000099] mb-6">
                                    - Admin Manager, Google
                                </p>
                                <p className="text-[12px] font-medium leading-[140%] text-[#00000099] mb-4">
                                    Large IT campuses consume enormous volumes of water daily. Plastic jars meant constant logistics, leakage, and avoidable plastic waste. Switching to in-situ dispensers simplified operations, eliminated single-use plastic from common areas, and gave teams access to hygienic, temperature-consistent water throughout the day. Less clutter, less waste, more focus.
                                </p>
                                <CaseStudyButton href="/sustainability-it" />
                            </div>

                            {/* Vol 3 */}
                            <div className="flex flex-col">
                                <p className="text-[12px] font-bold text-black mb-6">Volume 3:</p>
                                <h3 className="text-[20px] md:text-[24px] font-medium leading-[120%] text-black tracking-tight mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                                    A Greener Stay for Every<br />Guest
                                </h3>
                                <p className="text-[14px] font-medium leading-[140%] text-[#00000099] mb-8">
                                    How hospitality brands elevated their sustainability<br />commitment, one dispenser at a time
                                </p>
                                <p className="text-[16px] font-bold italic leading-[130%] text-black mb-2">
                                    "Guests started commenting on it. It<br />became part of our story."
                                </p>
                                <p className="text-[12px] font-medium italic leading-[130%] text-[#00000099] mb-6">
                                    - Operations Director, Club Mahindra
                                </p>
                                <p className="text-[12px] font-medium leading-[140%] text-[#00000099] mb-4">
                                    In hospitality, every detail shapes the guest experience. Replacing plastic water bottles with sleek and clean branded glass bottles helped hotels reduce plastic footprint, cut recurring supply costs, and signal a genuine commitment to sustainability. Guests noticed. Staff appreciated the ease. And the numbers backed it up with lower operational costs and stronger sustainability ratings.
                                </p>
                                <CaseStudyButton href="#" />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Serving with Purpose Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[137px] font-['Inter_Tight'] text-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 max-w-[1440px] mx-auto w-full">

                    {/* Left Column */}
                    <div className="w-full md:w-[45%] flex items-start">
                        <h2 className="text-[36px] font-bold leading-[110%] text-white tracking-tight">
                            Serving with Purpose
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-[39%] flex flex-col items-start lg:pr-12">
                        <p className="text-[14px] font-medium leading-[140%] text-white md:leading-[100%]">
                            All CSR activities undertaken through the WAE Foundation follow structured processes and are supported by proper documentation. Each initiative is planned, executed, and recorded with clear accountability. Transparency and traceability are central to how we operate, ensuring that every contribution is meaningful, measurable, and aligned with responsible long-term growth.
                        </p>
                        <DarkSectionButton href="/the-foundation" />
                    </div>

                </div>
            </section>

            {/* FOOTER SECTION */}
            <div style={{ position: "relative", zIndex: 10 }}>
                <Footer />
            </div>

            {/* INLINE CSS for hover and arrow animations */}
            <style jsx>{`
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
            <style jsx global>{`
        html {
        }
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
        </main>
    )
}