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

            {/* Hero section */}
            <section
                id="hero"
                className="relative w-full overflow-hidden pt-0 md:mb-[100px]"
            >
                {/* Desktop: Background video (full width, natural height) */}
                <div className="w-full">
                    <img
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4aac756b-b040-4aa4-a27d-0afb88f87a00/public"
                        className="hidden md:block w-full h-auto z-0"
                        alt="2026 Outlook Hero"
                    />
                </div>
            </section>

            {/* Article Section */}
            <section className="w-full mb-[140px] px-[9.72%]">
                <div className="mx-auto">
                    {/* Title spanning full width */}
                    <h1 className="text-[40px] font-medium mb-6 leading-[120%] mb-[44px]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
                        2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure
                    </h1>

                    {/* Three column layout for content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* First Column */}
                        <div className="space-y-6 text-sm leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                            <div className="text-sm font-bold mb-[24px] leading-[130%] underline text-[#80808099]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                Aditi Sharma
                            </div>

                            <p>
                                As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives. With intensifying hydrological stress, demographic expansion, and regulatory realignment of Environmental, Social, and Governance (ESG) metrics, the year 2026 represents a pivotal phase for integrating sustainability at scale into India’s water economy. This forward-looking perspective situates water infrastructure within broader systemic transitions, linking fiscal capital flows, ESG compliance, sectoral innovation, and governance architectures.
                            </p>

                            <p>
                                At its core, water infrastructure in India is transitioning from a traditional supply-centric model to an integrated sustainability paradigm. Historically, water investments have focused on basic access and potable supply; however, emerging macroeconomic and climatic risks demand multi-sectoral resilience, incorporating wastewater recycling, digital monitoring, desalination, and ecosystem-centric water management. Urban agglomerations such as Hyderabad exemplify this shift, where large-scale ring-main networks and integrated supply planning are being deployed to mitigate supply disruptions and scale urban water resilience for projected demand growth through 2027.
                            </p>

                            <p>
                                2026 is likely to witness accelerated refinement of ESG and sustainability disclosure regimes, both in financial markets and public sector governance. The Securities and Exchange Board of India (SEBI) continues to calibrate disclosure norms, balancing investor demand for granular sustainability data with concerns over reporting burdens. Recent regulatory developments indicate potential rationalisation of ESG reporting requirements while expanding coverage of material environmental risks, including water stress, resource efficiency, and climate implications.
                            </p>

                            <p>
                                Concurrently, public sector audit frameworks are beginning to integrate ESG criteria within institutional performance assessments, signalling a shift from voluntary corporate metrics toward systemic accountability across government entities and state-owned enterprises.
                            </p>
                        </div>

                        {/* Second Column */}
                        <div className="space-y-6 text-sm mt-[36px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>

                            <p>
                                For corporates, the BRSR (Business Responsibility and Sustainability Reporting) framework is set to become more comprehensive, with enhanced assurance norms (BRSR Core) and sectoral materiality matrices that explicitly recognise water usage, effluent discharge, reuse metrics, and watershed impacts as core performance indicators. Novel digital tools, including AI-driven ESG monitoring platforms, will underpin real-time data capture, reducing reporting latency and enhancing comparability across firms and sectors.  ￼
                            </p>

                            <p>
                                The intersection of ESG compliance and capital markets will be particularly transformative. Green finance instruments, such as sustainability-linked bonds, ESG-linked loans, and municipal green bonds, are expected to proliferate, offering lower cost of capital for projects that meet defined environmental outcomes. This financial innovation aligns with global climate finance paradigms, enabling municipal utilities and project SPVs to tap diversified funding sources beyond traditional budgetary allocations.
                            </p>

                            <p>
                                At the project level, hybrid financing modalities, such as viability gap funding (VGF), performance-based contracts, and blended public–private partnerships, will be essential for derisking long-tenor water sector investments. The Indian ecosystem is already seeing advanced demonstrations of such models in wastewater reuse initiatives and urban resilience
                            </p>

                            <p>
                                A defining characteristic of the 2026 outlook is water circularity, which transcends linear supply frameworks by embedding treatment, reuse, and resource optimization within economic value chains. Emerging policies are pushing states to mandate the use of treated water in industrial clusters and large real estate developments.
                            </p>

                            <p>
                                Technological innovation is also becoming a strategic enabler. Smart water networks equipped with IoT sensors, AI-assisted leak detection, and predictive analytics are reducing non-revenue water (NRW) while improving service quality. Decentralised wastewater treatment systems and compact tertiary treatment units are gaining traction, particularly as urbanisation densifies water demand and wastewater volumes.
                            </p>
                        </div>

                        {/* Third Column */}
                        <div className="space-y-6 text-sm mt-[36px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                            <p>
                                Despite compelling economic and sustainability rationales, water infrastructure in India faces significant capital adequacy challenges. Investments in treatment capacity, distribution networks, and digital infrastructure require coordinated mobilisation of both public funds and private capital. Analytical estimates suggest substantial investment opportunities in treated water and water reuse markets by mid-century, underscoring the long-term economic potential embedded in water infrastructure transformation.
                            </p>

                            <p>
                                Within urban utilities and municipal bodies, there is growing emphasis on revenue optimisation, tariff rationalisation, and operational efficiency. This shift towards cost-reflective pricing mechanisms is necessary to ensure that water utilities can sustain O&M (operations and maintenance) expenditures, honour debt service obligations, and attract institutional capital, thereby avoiding the cyclical rebuilds that afflict underfunded assets.
                            </p>

                            <p>
                                Water infrastructure’s evolution is closely tied to national climate and sustainable development agendas. By synchronising investments with Jal Jeevan Mission, National Water Mission, and state-level circularity policies, India is crafting a holistic blueprint for resource security, climate adaptation, and socio-economic growth. This integrated strategy reinforces water as both an economic and ecological asset, necessitating governance reforms, technological upgrades, and inclusive financing to realise sustainable water futures.
                            </p>

                            <p>
                                In a nutshell, 2026 will be a watershed year for India’s water infrastructure, marked by enhanced ESG institutionalisation, innovative financing mechanisms, circular water economies, and digital transformation. These structural shifts, underpinned by robust policy frameworks and market incentives, position India to tackle persistent water challenges while catalysing sustainable and resilient growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles SECTION */}
            <section className="w-full mb-[140px] px-[9.72%]">
                <div className="mx-auto">
                    <h2 className="mb-12" style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 500,
                        fontSize: '40px',
                        lineHeight: '110.00000000000001%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                    }}>
                        Related Articles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Article 1 */}
                        <Link href="/north-star-of-progress" className="group block">
                            <div className="overflow-hidden mb-[60px]">
                                <Image
                                    src="https://travtalkindia.com/wp-content/uploads/2026/01/whatsapp-image-2025-12-19-at-14.44.53-768x841.jpeg"
                                    alt="From Kyoto to COP28"
                                    width={347}
                                    height={300}
                                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                Hotels advance sustainability with glass bottling
                            </h3>
                            <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change.
                            </p>
                        </Link>

                        {/* Article 2 */}
                        <Link href="/climate-change-&-water-v2" className="group block">
                            <div className="overflow-hidden mb-[60px]">
                                <Image
                                    src="https://indiacsr.in/wp-content/uploads/2024/08/corporate-social-responsibility-india-csr.jpg"
                                    alt="Climate Change in the Indian Subcontinent"
                                    width={347}
                                    height={300}
                                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                Strategic CSR: Creating Lasting Community Impact
                            </h3>
                            <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
                            </p>
                        </Link>

                        {/* Article 3 */}
                        <Link href="/climate-change-&-water-v3" className="group block">
                            <div className="overflow-hidden mb-[60px]">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e008f8b-030e-4423-6ca5-a5a3f5349200/public"
                                    alt="The Ozone Crisis"
                                    width={347}
                                    height={300}
                                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                From activism to infrastructure: How WAE is attempting to cut India’s plastic bottle use
                            </h3>
                            <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                The story of the ozone layer's recovery stands as a testament to what global cooperation can achieve. This environmental success story offers valuable lessons for addressing climate change and other ecological challenges.
                            </p>
                        </Link>
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