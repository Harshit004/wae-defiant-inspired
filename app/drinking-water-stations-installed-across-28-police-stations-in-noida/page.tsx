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

            {/* HERO SECTION */}
            {/* NOTE: If you want the Hero to be a scroll-snap point, add snap-center here */}
            <section
                id="hero"
                // ref={heroRef}
                className="w-screen flex items-center justify-center pt-5 bg-white mb-[100px]"
            // style={{ height: `calc(100vh - ${headerHeight}px)` }}
            >
                <div className="w-screen flex items-center justify-center">
                    <img
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7843e6a1-3eac-4cfe-2bec-eed283a14700/public"
                        alt="Hero image"
                        className="w-full h-fit object-cover rounded-none"
                    />
                </div>
            </section>

            {/* Article Section */}
            <section className="w-full mb-[140px] px-[9.72%]">
                <div className="mx-auto">
                    {/* Title spanning full width */}
                    <h1 className="text-[40px] font-medium mb-6 leading-[120%] mb-[44px]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
                        Drinking Water Stations Installed Across 28 Police Stations in Noida
                    </h1>

                    {/* Three column layout for content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* First Column */}
                        <div className="space-y-6 text-sm leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                            <div className="text-sm font-bold mb-[24px] leading-[130%] underline text-[#80808099]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                Aditi Sharma
                            </div>

                            <p>
                                In a major step towards ensuring access to safe and clean drinking water for frontline personnel, WAE Foundation, the social responsibility arm of WAE Limited, has successfully installed Water Stations at 28 police stations across Noida.
                            </p>

                            <p>
                                This initiative, undertaken in collaboration with the Gautam Buddha Nagar Police Department, aims to provide a sustainable and hygienic source of drinking water to police officers, staff, and visitors. The Water Stations feature advanced purification and dispensing technology designed for minimal environmental impact – a reflection of WAE’s ongoing commitment to public health and sustainability.
                            </p>

                        </div>

                        {/* Second Column */}
                        <div className="space-y-6 text-sm mt-[42px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>

                            <p>
                                Speaking about the initiative, Ms. Rashi Tarika, Head-Communications, WAE Foundation, said, “Our police force works tirelessly to keep citizens safe.
                            </p>

                            <p>
                                Providing them with clean drinking water is a small but significant gesture of gratitude and care. This initiative aligns with our vision of making safe water accessible to every community- serving institution.”
                            </p>

                        </div>

                        {/* Third Column */}
                        <div className="space-y-6 text-sm mt-[42px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                            <p>
                                Each Water Station is designed for energy efficiency and low maintenance, ensuring reliable operation even in high-traffic environments. The installations are expected to benefit over 2000 police personnel and daily visitors across the 28 stations.
                            </p>

                            <p>
                                WAE Foundation continues to expand its impact through water stewardship programs, focusing on schools, public offices, and marginalised communities, with the mission of promoting health, dignity, and sustainability through responsible water access.
                            </p>
                        </div>
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