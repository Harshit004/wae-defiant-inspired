"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Still used for Hero InView
import RelatedCard from "@/components/related-card"; // Assuming this component exists
import Footer from "@/components/footer"; // Assuming this component exists
import ContactSection from "@/components/contact-section";
import Link from "next/link";

interface HoverButtonProps {
    children: (hovered: boolean) => React.ReactNode;
}

/**
 * Reusable hover button component.
 */
const HoverButton: FC<HoverButtonProps> = ({ children }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
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
                fontFamily: "'Inter Tight', sans-serif", // Note: Inline style for font
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
};

const HealthCarousel: FC = () => {
    const images = [
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7c0589a5-de0f-4531-919b-17e5146d5700/public",
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9aa5a359-166a-4f39-a604-e78e5684dd00/public",
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/723f0e80-f450-4f3b-57e7-86948d880800/public"
    ];
    const [currentIndex, setCurrentIndex] = useState(1);

    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    const leftIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const rightIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    return (
        <section className="relative w-screen overflow-hidden flex items-center justify-center">
            <div className="flex flex-row items-center justify-center transition-all duration-500">
                {/* Left Image */}
                <div onClick={prevSlide} className="flex-shrink-0 cursor-pointer" style={{ width: '75vw' }}>
                    <img src={images[leftIndex]} alt="Carousel Left" className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Left Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Left Arrow */}
                <button onClick={prevSlide} className="flex-shrink-0 w-[32px] h-[32px] z-10 transition-transform hover:scale-110">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9ab93cb5-da4f-4ed2-2501-f6c37a04a800/public" alt="Left Arrow" className="w-full h-full object-contain" />
                </button>

                {/* Left Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Middle Image - 75vw */}
                <div className="flex-shrink-0 z-10" style={{ width: '75vw' }}>
                    <img src={images[currentIndex]} alt="Carousel Middle" className="w-full h-auto object-cover" />
                </div>

                {/* Right Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Right Arrow */}
                <button onClick={nextSlide} className="flex-shrink-0 w-[32px] h-[32px] z-10 transition-transform hover:scale-110">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21a53c08-6ada-45bd-3a0c-4fbeb66a8500/public" alt="Right Arrow" className="w-full h-full object-contain" />
                </button>

                {/* Right Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Right Image */}
                <div onClick={nextSlide} className="flex-shrink-0 cursor-pointer" style={{ width: '75vw' }}>
                    <img src={images[rightIndex]} alt="Carousel Right" className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>
        </section>
    );
};

const WaterCarousel: FC = () => {
    const images = [
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e99e63b-aea6-4a8e-e4e7-521549a09200/public",
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2890168a-c532-457b-a950-a631524b8900/public",
        "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b6a7aec8-ca9b-4874-368d-c70275c39c00/public"
    ];
    const [currentIndex, setCurrentIndex] = useState(1);

    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    const leftIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const rightIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    return (
        <section className="relative w-screen overflow-hidden flex items-center justify-center">
            <div className="flex flex-row items-center justify-center transition-all duration-500">
                {/* Left Image */}
                <div onClick={prevSlide} className="flex-shrink-0 cursor-pointer" style={{ width: '75vw' }}>
                    <img src={images[leftIndex]} alt="Carousel Left" className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Left Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Left Arrow */}
                <button onClick={prevSlide} className="flex-shrink-0 w-[32px] h-[32px] z-10 transition-transform hover:scale-110">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9ab93cb5-da4f-4ed2-2501-f6c37a04a800/public" alt="Left Arrow" className="w-full h-full object-contain" />
                </button>

                {/* Left Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Middle Image - 75vw */}
                <div className="flex-shrink-0 z-10" style={{ width: '75vw' }}>
                    <img src={images[currentIndex]} alt="Carousel Middle" className="w-full h-auto object-cover" />
                </div>

                {/* Right Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Right Arrow */}
                <button onClick={nextSlide} className="flex-shrink-0 w-[32px] h-[32px] z-10 transition-transform hover:scale-110">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21a53c08-6ada-45bd-3a0c-4fbeb66a8500/public" alt="Right Arrow" className="w-full h-full object-contain" />
                </button>

                {/* Right Gap 35px */}
                <div className="flex-shrink-0" style={{ width: '35px' }}></div>

                {/* Right Image */}
                <div onClick={nextSlide} className="flex-shrink-0 cursor-pointer" style={{ width: '75vw' }}>
                    <img src={images[rightIndex]} alt="Carousel Right" className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>
        </section>
    );
};

const ReadMoreButton: FC = () => {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition-all duration-650 ease flex items-center justify-center p-0"
            style={{
                width: '99px',
                height: '35px',
                pointerEvents: "auto",
                gap: "6px",
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
            Read More
            <div className="relative inline-block w-[12px] h-[12px]">
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                    alt="icon default"
                    className="w-full h-full object-contain absolute top-0 left-0"
                    style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.5s' }}
                />
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                    alt="icon hover"
                    className="w-full h-full object-contain absolute top-0 left-0"
                    style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }}
                />
            </div>
        </button>
    );
};

const Home: FC = () => {
    // State and refs
    const [activeSection, setActiveSection] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<string>(""); // State is declared but not used in the provided snippets
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const [heroRef, heroInView] = useInView({ threshold: 0.5 });
    const [taglineVisible, setTaglineVisible] = useState<boolean>(true); // State is declared but not used for conditional rendering in provided snippets
    const prevScrollY = useRef<number>(0); // Used for tagline visibility logic
    const [headerHeroScale, setHeaderHeroScale] = useState<number>(1); // State is declared and updated, but not applied to an element's style/transform in provided snippets
    const headerHeroRef = useRef<HTMLDivElement>(null); // Ref for the fixed header/hero container

    // Ref for the Sustainability section wrapper for scroll animation - REMOVED as parallax is discarded
    // const sustainabilityScrollRef = useRef<HTMLDivElement>(null);


    const sections = ["hero"]; // Extendable for additional sections - used only to set active section based on heroInView

    const containerRef = useRef<HTMLDivElement>(null); // Ref is declared but not applied to an element

    // --- ADDED: Explicitly scroll to top on mount ---
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, []);
    // --- END ADDED CODE ---


    // Update tagline visibility on scroll (logic present, but taglineVisible state not used)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setTaglineVisible(currentScrollY < prevScrollY.current);
            prevScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update current time (India Time) every minute (logic present, but currentTime state not used)
    useEffect(() => {
        const updateIndiaTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Kolkata",
            };
            setCurrentTime(new Date().toLocaleTimeString("en-US", options));
        };

        updateIndiaTime();
        const interval = setInterval(updateIndiaTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Set active section when hero is in view (logic present, but activeSection state not used)
    useEffect(() => {
        if (heroInView) setActiveSection(0);
    }, [heroInView]);

    // Measure header height to offset hero section (logic present, headerHeight state used)
    useEffect(() => {
        if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
    }, [headerRef]);

    // Scroll-driven header/hero scaling effect (logic present, headerHeroScale state updated, but state not applied)
    useEffect(() => {
        const handleScroll = () => {
            if (!headerHeroRef.current) return;
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const maxScroll = viewportHeight * 0.8;
            const minScale = 0; // Scaling down to 0 might make it disappear abruptly

            if (scrollPosition <= 100) {
                setHeaderHeroScale(1);
            } else if (scrollPosition >= maxScroll) {
                setHeaderHeroScale(minScale);
            } else {
                const scrollRange = maxScroll - 100;
                const scrollProgress = (scrollPosition - 100) / scrollRange;
                setHeaderHeroScale(1 - scrollProgress);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Framer Motion scroll-driven animations (Keeping logo opacity as it seems unrelated to section snap)
    const { scrollYProgress } = useScroll(); // Tracks scroll progress of the window by default
    const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // Logo opacity linked to scroll

    // Scroll-linked animation for Sustainability section's y position - REMOVED as parallax is discarded
    // const { scrollYProgress: sustainabilityScrollProgress } = useScroll({
    //   target: sustainabilityScrollRef,
    //   offset: ["start end", "end start"],
    // });
    // Map scroll progress (0 to 1) to a y translation - REMOVED as parallax is discarded
    // const sustainabilityY = useTransform(
    //   sustainabilityScrollProgress,
    //   [0, 1],
    //   [360, 0]
    // );


    // --- POTENTIAL TROUBLESHOOTING AREA (Declared but not used/Incorrect Syntax) ---
    // These useTransform calls have incorrect syntax and are not used in the provided code structure.
    // They were potentially intended for scroll animations now replaced by scroll-snap.
    const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]);
    const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
    const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
    const finalPurposeOpacity = useTransform(
        [purposeOpacity, purposeVanish] as any,
        ([pO, pV]: any) => pO * pV
    );

    const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]);
    const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
    const finalIndiaOpacity = useTransform(
        [indiaOpacity, indiaVanish] as any,
        ([iO, iV]: any) => iO * iV
    );
    // --- END POTENTIAL TROUBLESHOOTING AREA ---


    // Menu items arrays - INSIDE WAE section
    const productsItems = [
        { text: "This Is Us", href: "/inside-wae" },
        { text: "Our Portfolio", href: "/our-portfolio" },
        { text: "Reimagine Work", href: "/careers3" },
    ];

    // ETCETERA section
    const blueprintItems = [
        { text: "Sustainability", href: "/sustainability" },
        { text: "The Activist Co.", href: "the-activist-co" },
        { text: "Blog", href: "/blogs2" },
    ];
    const lineCount = Math.min(productsItems.length, blueprintItems.length); // Declared but not used

    // Tagline words split for animation (logic present, but taglineWords1/2 not used for animation in provided code)
    const taglineLine1 = "To lead the way in sustainability"; // Declared but not used
    const taglineLine2 = "ahead of the rest"; // Declared but not used
    const taglineWords1 = taglineLine1.split(" "); // Declared but not used
    const taglineWords2 = taglineLine2.split(" "); // Declared but not used

    // Framer Motion animation variants (declared but not applied in provided code)
    const containerVariants = { // Declared but not used
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.05, ease: "easeInOut" },
        },
    };
    const childVariants = { // Declared but not used
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
    };

    return (
        <main className="relative">
            {/* HEADER AND HERO SECTION */}
            {/* This div is fixed and covers the initial viewport height.
          The scroll-driven container below is pushed down by 100vh using margin-top. */}
            <div ref={headerHeroRef} className="w-full z-0"> {/* Changed from fixed to normal flow */}
                <header ref={headerRef} className="w-full bg-white relative z-10 pb-5">
                    <div className="mx-auto w-full max-w-[1440px] px-[140px]">
                        {/* Top Row: Navigation */}
                        <div
                            className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
                            style={{
                                fontFamily: "'Inter Tight', sans-serif", // Inline style
                                fontWeight: 500,
                                fontSize: "12px",
                                lineHeight: "100%",
                                letterSpacing: "0px",
                            }}
                        >
                            <div>
                                <Link href="/identity">IDENTITY</Link>
                            </div>
                            <div>
                                <Link href="/origin">ORIGIN</Link>
                            </div>
                            <div>
                                <Link href="/objective">OBJECTIVE</Link>
                            </div>
                            <div>
                                <Link href="/inside-wae">INSIDE WAE</Link>
                            </div>
                            <div>
                                <Link href="/etcetera">ETCETERA</Link>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

                        {/* Bottom Row: Logo, Coordinates, Tagline, Menu Items */}
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
                                    fontFamily: "'Inter Tight', sans-serif", // Inline style
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
                                    fontFamily: "'Inter Tight', sans-serif", // Inline style
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
                                            fontFamily: "'Inter Tight', sans-serif", // Inline style
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        <Link href={item.href} className="contents"> {/* className="contents" might affect layout/hover */}
                                            <div className="c--anim-btn"> {/* Custom CSS class for hover animation */}
                                                <div className="text-container"> {/* Custom CSS class */}
                                                    <span className="c-anim-btn">{item.text}</span> {/* Custom CSS class */}
                                                    <span className="block">{item.text}</span>
                                                </div>
                                                <span className="menu-arrow"> {/* Custom CSS class for arrow animation */}
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
                                            fontFamily: "'Inter Tight', sans-serif", // Inline style
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        <Link href={item.href} className="contents"> {/* className="contents" might affect layout/hover */}
                                            <div className="c--anim-btn"> {/* Custom CSS class for hover animation */}
                                                <div className="text-container"> {/* Custom CSS class */}
                                                    <span className="c-anim-btn">{item.text}</span> {/* Custom CSS class */}
                                                    <span className="block">{item.text}</span>
                                                </div>
                                                <span className="menu-arrow blueprint-arrow"> {/* Custom CSS class for arrow animation + rotation */}
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
            {/* NOTE: If you want the Hero to be a scroll-snap point, add snap-center here */}
            <section
                id="hero"
                ref={heroRef}
                className="w-screen flex items-center justify-center bg-white"
                style={{ height: `calc(100vh - ${headerHeight}px)` }}
            >
                <div className="w-screen flex items-center justify-center">
                    <img
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c82b772a-3edf-4ea4-e2d1-b7970a099100/public"
                        alt="Hero image"
                        className="w-full h-fit object-cover rounded-none"
                    />
                </div>
            </section>

            {/* Impact Section */}
            <section
                id="impact"
                className="w-screen flex items-center justify-center bg-none mb-[100px]"
            // style={{ height: `calc(100vh - ${headerHeight}px)` }}
            >
                <div className="w-screen flex items-center justify-center">
                    <img
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f4eed33f-31ce-4797-81c5-1b33122e4800/public"
                        alt="impact image"
                        className="w-full h-fit object-cover rounded-none"
                    />
                </div>
            </section>

            {/* Health carousel jumbotron */}
            <HealthCarousel />

            <div className="h-[90px]"></div>

            <WaterCarousel />

            <div className="h-[100px]"></div>

            <div className="flex flex-col md:flex-row justify-between items-start" style={{ paddingLeft: '9.72%', paddingRight: '9.72%' }}>
                <div className="w-full" style={{ maxWidth: '40%' }}>
                    <h2
                        style={{
                            fontFamily: "Inter Tight",
                            fontWeight: 500,
                            fontStyle: "normal",
                            fontSize: "24px",
                            lineHeight: "120%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            color: "#000"
                        }}
                    >
                        Drinking Water Stations Installed Across 28 Police Stations in Noida
                    </h2>
                </div>
                <div className="w-full" style={{ maxWidth: '35%' }}>
                    <p
                        style={{
                            fontFamily: "Inter Tight",
                            fontWeight: 500,
                            fontStyle: "normal",
                            fontSize: "12px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            color: "#00000099"
                        }}
                    >
                        In a major step towards ensuring access to safe and clean drinking water for frontline personnel, WAE Foundation, the social responsibility arm of WAE Limited, has successfully installed Water Stations at 28 police stations across Noida.
                    </p>
                    <div className="h-[16px]"></div>
                    <p
                        style={{
                            fontFamily: "Inter Tight",
                            fontWeight: 500,
                            fontStyle: "normal",
                            fontSize: "12px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            color: "#00000099"
                        }}
                    >
                        This initiative, undertaken in collaboration with the Gautam Buddha Nagar Police Department, aims to provide a sustainable and hygienic source of drinking water to police officers, staff, and visitors. The Water Stations feature advanced purification and dispensing technology designed for minimal environmental impact – a reflection of WAE’s ongoing commitment to public health and sustainability.
                    </p>
                    <div className="h-[60px]"></div>
                    <Link href="/drinking-water-stations-installed-across-28-police-stations-in-noida">
                        <ReadMoreButton />
                    </Link>
                </div>
            </div>

            <div className="h-[100px]"></div>

            {/* FOOTER SECTION */}
            {/* Footer likely appears at the very bottom */}
            {/* NOTE: If you want this section to be a scroll-snap point, add snap-center here */}
            {/* NOTE: Adjust padding/margins if this section's height + content interferes with snapping */}
            <div style={{ position: "relative", zIndex: 1200 }}> {/* z-index to appear above the gray background */}
                {/* Assuming Footer is a valid component */}
                <Footer />
            </div>

            {/* INLINE STYLES */}
            {/* Custom CSS for specific elements and animations */}
            <style jsx>{`
        /* These classes were for a different scroll-snap setup and are likely not needed with global html/body snap */
        /*
        .container {
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          height: 200vh;
        }

        .section {
          scroll-snap-align: start;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        */

        /* Product Grid Table Styles */
        .product-grid {
          width: 1160px; /* Fixed width */
          height: 928px; /* Fixed height */
          border-collapse: collapse;
        }

         /* Solutions Grid Table Styles */
        .solutions-grid {
          width: 1160px; /* Fixed width */
          height: 696px; /* Fixed height */
          border-collapse: collapse;
        }

        .product-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 110%;
          letter-spacing: 0px;
          vertical-align: middle;
          text-align: center;
          width: calc(232px * 2); /* Fixed width based on cell size */
          height: 232px; /* Fixed height */
          box-sizing: border-box;
        }
        .product-cell {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 0px;
          text-align: center;
          vertical-align: middle;
          text-transform: uppercase;
          color: #1e1e1e;
          background-color: #f2f2f2; /* Default background for most cells */
          width: 232px; /* Fixed width */
          height: 232px; /* Fixed height */
          padding: 0px;
          box-sizing: border-box;
        }
         /* Corrected invalid CSS */
         .product-cell.bg-white-override { /* Added a class name */
             background-color: #fff !important;
         }
         /* You would need to update the HTML like:
            <td className="product-cell bg-white-override"></td>
            instead of:
            <td className="product-cell !bg-white"></td>
         */


        .placeholder-img {
          object-fit: cover;
          /* Potential issue: no explicit max-width/height, might overflow fixed cell */
        }

        /* Custom Button Hover Animation Styles */
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-container {
          height: 12px; /* Fixed height */
          overflow: hidden; /* Hides the second text span by default */
        }
        .c-anim-btn {
          display: block;
          transition: margin-top 0.5s; /* Animates the text moving up */
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px; /* Moves the first text span up by its height */
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0; /* Hidden by default */
          transform: translateX(-10px); /* Starts off-position */
          transition: transform 0.5s ease, opacity 0.5s ease; /* Animates movement and fade */
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0); /* Moves arrow into position */
          opacity: 1; /* Fades arrow in */
        }
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px); /* Additional rotation + initial position */
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }
      `}</style>
        </main>
    );
};

export default Home;