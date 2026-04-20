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
    { text: "This is Us", href: "/inside-wae" },
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
      {/* NOTE: If you want the Hero to be a scroll-snap point, add snap-center here */}
      <section
        id="hero"
        // ref={heroRef}
        className="w-screen flex items-center justify-center bg-white"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="w-screen flex items-center justify-center">
          <img
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7d9e6714-27eb-4090-aeef-ee8f5e3f3e00/public"
            alt="Hero image"
            className="w-full h-fit object-cover rounded-none"
          />
        </div>
      </section>

      {/* APPROACH & IDEAS SECTION */}
      <section className="w-full bg-[#f2f2f2] pl-[9.375%] pr-[13.95%] py-[135px] font-['Inter_Tight']">
        <div className="flex flex-col gap-[160px] max-w-[1440px] mx-auto w-full">

          {/* Block 1: Our Approach */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 lg:gap-32">
            <div className="w-full md:w-[40%] flex flex-col pt-2">
              <p className="font-normal text-[14px] leading-[100%] text-[#00000099] uppercase mb-2">OUR APPROACH</p>
              <h2 className="font-medium text-[36px] leading-[110%] text-black tracking-tight">
                Our Green Is Blue
              </h2>
            </div>
            <div className="w-full md:w-[40%] flex flex-col">
              <div className="font-medium text-[14px] leading-[120%] text-[#00000099] space-y-8 lg:pr-12">
                <p>
                  "Our Green Is Blue" is more than a tagline — it's a founding belief. The ecological truth is simple: without water, there is no life. Forests fail, food systems fracture, and futures fade.
                </p>
                <p>
                  Water shapes climate, communities, commerce, and civilisation. That's why we don't treat the planet as a stakeholder in business. We treat business as a steward of the planet. Our vision is built on that principle: honour water, design responsibly, and build systems where progress serves the planet, not the other way around.
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: Our Ideas */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 lg:gap-32">
            <div className="w-full md:w-[40%] flex flex-col pt-2">
              <p className="font-normal text-[14px] leading-[100%] text-[#00000099] uppercase mb-2">OUR IDEAS</p>
              <h2 className="font-medium text-[36px] leading-[110%] text-black tracking-tight">
                Blue Innovation
              </h2>
            </div>
            <div className="w-full md:w-[40%] flex flex-col">
              <div className="font-medium text-[14px] leading-[120%] text-[#00000099] space-y-8 lg:pr-12">
                <p>
                  Innovation starts with a question: what can we remove that harms the planet?
                </p>
                <p>
                  We design out single-use plastics, excess packaging, and short product lifecycles. In their place, we build stainless steel dispensers, refill-based infrastructure, touchless hygiene systems, and purification technology that minimises waste. We engineer for longevity, because durability is climate action.
                </p>
                <p>
                  Sustainability isn't layered onto our products as an afterthought. It's the blueprint.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ACTIVIST COMPANY SECTION */}
      <section className="relative w-full font-['Inter_Tight'] bg-white">
        <div className="relative w-full max-h-[611px] flex items-center">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/dec126a3-d49c-4aa5-eb45-0a171454ac00/public"
            alt="WAE Activist Company"
            fill
            className="object-cover object-[70%_center] md:object-[center_right] z-0"
            priority
          />
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[9.375%] py-[120px] lg:px-[140px]">
            <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col">
              <h2 className="font-bold text-[36px] leading-[110%] text-black tracking-tight mb-8">
                Activist Company
              </h2>
              <div className="font-medium text-[14px] leading-[120%] text-[#00000099] space-y-6 mb-12">
                <p>
                  WAE was founded on conviction: a deliberate refusal to accept waste as inevitable.
                </p>
                <p>
                  We question systems that normalise single-use culture. We challenge practices that quietly degrade the environment. We advocate for refill ecosystems over bottled convenience, and for responsibility over routine. This isn't rebellion — it's reform.
                </p>
                <p>
                  We believe businesses shape behaviour, and behaviour shapes the planet. By offering viable, elegant alternatives to plastic dependency, we disrupt the status quo with substance. Leadership, for us, means solutions that are environmentally sound, commercially viable, and ethically grounded.
                </p>
              </div>
              <HoverButton href="#">
                {(hovered) => (
                  <>
                    <span>Know More</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </HoverButton>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="w-full bg-[#f2f2f2] font-['Inter_Tight'] py-[99px] pl-[9.375%] pr-[13.95%] lg:px-[140px]">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0">

          {/* Left Column */}
          <div className="w-full flex flex-col pr-12 lg:pr-24">
            <div className="flex flex-row justify-between items-start mb-12 lg:mb-[60px]">
              <h2 className="font-bold text-[36px] leading-[110%] text-black tracking-tight" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Core Pillars
              </h2>
              <div className="w-[35px] h-[35px] border border-black flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L11 11M11 11H3M11 11V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="font-medium text-[14px] leading-[120%] text-[#00000099] space-y-6 lg:pr-12">
              <p>
                The single-use economy has run unchallenged for too long - normalised by convenience, protected by habit, and ignored by the very institutions with the power to change it.
              </p>
              <p>
                WAE was built to be the exception. Not through campaigns or pledges, but through infrastructure that makes the bottle redundant. Scalable, institutional, and permanent.
              </p>
              <p>
                That is the standard we were founded on, and the one we refuse to lower
              </p>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden md:block w-[1px] bg-[#D9D9DC]"></div>

          {/* Right Column */}
          <div className="w-full flex flex-col pl-12 lg:pl-24 md:mt-0 mt-16">

            {/* Item 1 */}
            <div className="flex flex-col mb-10 text-left">
              <h3 className="font-semibold text-[26px] leading-[110%] text-black mb-6" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Climate &amp; Resource Efficiency
              </h3>
              <p className="font-medium text-[14px] leading-[100%] text-[#00000099]">
                Climate action is operational, not abstract. We reduce lifecycle emissions by replacing disposable plastic with durable stainless steel systems. Energy efficiency, material longevity, and logistics optimisation are built into everything we do. Resource efficiency means disciplined restraint: using less, wasting less, emitting less.
              </p>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-[#D9D9DC] mb-10"></div>

            {/* Item 2 */}
            <div className="flex flex-col mb-10 text-left">
              <h3 className="font-semibold text-[26px] leading-[110%] text-black mb-6" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Stewardship &amp; Conservation
              </h3>
              <p className="font-medium text-[14px] leading-[100%] text-[#00000099]">
                Water isn't a product to be used — it's a resource to be respected. Our refill models reduce plastic leakage and lower environmental burden. Through efficient purification and conscious infrastructure, we make conservation a practice, not a pledge.
              </p>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-[#D9D9DC] mb-10"></div>

            {/* Item 3 */}
            <div className="flex flex-col text-left">
              <h3 className="font-semibold text-[26px] leading-[110%] text-black mb-6" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Blue Communities
              </h3>
              <p className="font-medium text-[14px] leading-[100%] text-[#00000099]">
                Real change scales through participation. We partner with corporates, institutions, and hospitality leaders to build refill cultures that shift behaviour permanently. Blue Communities are ecosystems of shared accountability, where sustainability moves from policy to practice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BLUE GOVERNANCE SECTION */}
      <section className="w-full bg-white font-['Inter_Tight'] pt-[87px] pb-[125px]">
        {/* Title & Description */}
        <div className="w-full max-w-[1440px] mx-auto px-[9.375%] lg:px-[140px] mb-[60px]">
          <h2 className="font-bold text-[36px] leading-[110%] text-black tracking-tight mb-8" style={{ fontFamily: "Inter Tight, sans-serif" }}>
            Blue Governance
          </h2>
          <p className="font-medium text-[14px] leading-[120%] text-[#00000099] max-w-[800px]">
            Blue Governance is WAE's commitment to embedding ecological intelligence, ethical discipline, and transparent accountability into every decision. It covers ESG policy, compliance, ethical sourcing, and annual sustainability reporting — ensuring responsibility is structural, not symbolic.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="w-full max-w-[1440px] pl-[9.375%]">
          <div
            id="governance-track"
            className="w-full border-t border-b border-l border-[#D9D9DC] flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {governanceCards.map((card, index) => (
              <div
                key={card.id}
                className={`snap-start flex-shrink-0 w-[85vw] md:w-[320px] lg:w-[23%] min-w-[250px] border-r border-[#D9D9DC] flex flex-col p-6 lg:p-8 transition-colors duration-300 ${activeGovernanceCard === index
                  ? "bg-black text-white"
                  : "bg-white text-black"
                  }`}
                style={{ maxHeight: "378px" }}
              >
                {/* Number */}
                <div className="font-bold text-[20px] leading-[110%] mb-[40px] lg:mb-[60px]" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                  {card.id}
                </div>

                {/* SVG Icon container */}
                <div className={`flex items-center justify-center h-[48px] mb-[40px] lg:mb-[60px] transition-colors duration-300 ${activeGovernanceCard === index ? "text-white" : "text-black"
                  }`}>
                  {card.icon}
                </div>

                {/* Card Title */}
                <h3 className="font-bold text-[20px] lg:text-[22px] leading-[110%] mb-4 tracking-tight" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className={`font-medium text-[12px] leading-[130%] transition-colors duration-300 ${activeGovernanceCard === index ? "text-[#ffffff99]" : "text-[#00000099]"
                  }`}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          <div className="mt-[40px] flex justify-end gap-3 hidden md:flex mr-[9.72%]">
            <button
              disabled={activeGovernanceCard === 0}
              onClick={() => {
                if (activeGovernanceCard > 0) {
                  const newIndex = activeGovernanceCard - 1;
                  setActiveGovernanceCard(newIndex);
                  const track = document.getElementById('governance-track');
                  if (track) {
                    const cardWidth = (track.children[0] as HTMLElement)?.clientWidth || 320;
                    track.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
                  }
                }
              }}
              className={`w-[35px] h-[35px] border flex items-center justify-center transition-colors duration-300 ${activeGovernanceCard === 0
                ? "border-[#D9D9DC] text-[#D9D9DC] cursor-not-allowed bg-white"
                : "border-black text-black hover:bg-[#f2f2f2] cursor-pointer bg-white"
                }`}
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              disabled={activeGovernanceCard === governanceCards.length - 1}
              onClick={() => {
                if (activeGovernanceCard < governanceCards.length - 1) {
                  const newIndex = activeGovernanceCard + 1;
                  setActiveGovernanceCard(newIndex);
                  const track = document.getElementById('governance-track');
                  if (track) {
                    const cardWidth = (track.children[0] as HTMLElement)?.clientWidth || 320;
                    track.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
                  }
                }
              }}
              className={`w-[35px] h-[35px] border flex items-center justify-center transition-colors duration-300 ${activeGovernanceCard === governanceCards.length - 1
                ? "border-[#D9D9DC] text-[#D9D9DC] cursor-not-allowed bg-white"
                : "border-black text-black hover:bg-[#f2f2f2] cursor-pointer bg-white"
                }`}
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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