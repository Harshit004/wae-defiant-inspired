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
    { text: "Reimagine Work", href: "/careers" },
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
                className="relative w-full overflow-hidden pt-0 md:mb-[140px]"
              >
                {/* Desktop: Background video (full width, natural height) */}
                <div className="w-full">
                  <video
                    src="/History Of Climate Change & Birth Of SDGs.mp4"
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

        {/* Article Section */}
<section className="w-full mb-[140px] px-[9.72%]">
  <div className="mx-auto">
    {/* Title spanning full width */}
    <h1 className="text-[40px] font-medium mb-6 leading-[120%] mb-[44px]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
    Why Luxury Hotels Are Turning to Smart Bottling Plants
    </h1>
    
    {/* Three column layout for content */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* First Column */}
      <div className="space-y-6 text-sm leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
        <div className="text-sm font-bold mb-[24px] leading-[130%] underline text-[#80808099]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          Rashi Tarika
        </div>

        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        A New Law in Luxury Hospitality
        </h2>
        
        <p>
        In advertising, Ogilvy would tell you: “The consumer isn’t a moron. She’s your wife.” In hospitality, the corollary is: Your guest isn’t just a guest. She’s a citizen of the planet. Today, that citizen is scrutinising every aspect of her stay — and plastic water bottles no longer pass the test.
        </p>

        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        The Numbers Don’t Lie
        </h2>

        <p>
        India’s luxury hotel sector once consumed over 50 million plastic water bottles every year. That’s not a number; it’s an indictment. Each bottle represents petroleum extraction, energy-intensive production, microplastic contamination, and an afterlife of waste that chokes oceans and landscapes. The literature is unequivocal: polycarbonate bottles leach bisphenol-A (BPA) into contents under normal usage conditions; microplastics have been detected in 93% of bottled waters tested in global studies (Mason et al., 2018). For hotels promising wellness and purity, serving water from such containers is a contradiction guests can taste.
        </p>

        <p>
        Much like ancient mariners navigating uncharted oceans with the North Star as their celestial constant, the SDGs illuminate a collective path forward—a visionary trajectory through uncertainty toward resilience, equity, and sustainability.
        </p>
        
        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        The New Luxury Guest — Armed with Data
        </h2>
        
        <p>
        Millennial and Gen Z travellers, who now dominate high-end travel demographics, arrive with evidence-based expectations. Booking.com’s 2025 Sustainable Travel Report records that 96% of Indian travellers prioritise sustainability, with 99% intending to make more responsible choices. India is now Asia’s second most sustainability-conscious travel market, outperforming the regional average by a decisive margin. These are not vague preferences; they are behavioural trends supported by longitudinal data.
        </p>
      </div>
      
        {/* Second Column */}
      <div className="space-y-6 text-sm mt-[0px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
        
        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        The Breakthrough: Intelligent Glass Bottling Plants
        </h2>
        
        <p>
        This is where science and style converge. Modern, in-house glass bottling facilities are not just machines; they are closed-loop, IoT-enabled water ecosystems. Using multi-barrier filtration (activated carbon, UV-C disinfection, ultrafiltration membranes), they achieve 99.9% removal of pathogens and contaminants. Integrated sterilisation chambers ensure each glass bottle is microbiologically safe before precision filling, capping, and date-stamping.
        </p>

        <p>
        And in an age where transparency is currency, each bottle can bear a QR code linking to live quality reports — total dissolved solids, pH, microbial counts — the kind of empirical detail that turns trust into loyalty.
        </p>
        
        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        Engineering for Elegance and Efficiency
        </h2>
        
        <p>
        The academic term is scalability; Ogilvy would call it making the suit fit the man. These systems adapt to a hotel’s footprint — from an 800 sq. ft. plant serving a boutique property to a 1,200 sq. ft. installation powering a palace resort. Predictive algorithms sync production to occupancy forecasts, special events, and seasonal variations, eliminating both shortages and surpluses.
        </p>

        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        Operational Economics — The Silent Win
        </h2>
        
        <p>
        Every plastic bottle eliminated removes an entire logistical chain: vendor negotiations, delivery scheduling, storage allocation, refrigeration energy, waste disposal. That’s a tangible cost saving — but also an invisible saving in brand reputation. The semiotics of a heavy, etched-glass bottle on a nightstand signal something a PET bottle never could: permanence, purity, and purpose.
        </p>
        
      </div>
      
      {/* Third Column */}
      <div className="space-y-6 text-sm mt-[0px] leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>

      <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        The Architectural Shift
        </h2>

        <p>
        Forward-thinking hotels are now embedding sustainability infrastructure in their design phase. The Leela Palace Udaipur’s renovation allocated 1,200 square feet for a guest-visible bottling facility — turning a back-of-house process into a brand theatre of responsibility.
        </p>

        <p>
        In 2000, the Millennium Declaration gave rise to eight Millennium Development Goals (MDGs), which guided global development until 2015. The MDGs were instrumental in reducing extreme poverty, improving access to primary education, and advancing healthcare. This was followed by the Millennium Summit in 2000, thus resulting in eight Millennium Development Goals (MDGs) aimed at reducing extreme poverty by 2015.
        </p>

        <p>
        In 2002, the World Summit on Sustainable Development in Johannesburg reaffirmed these global commitments and placed a stronger emphasis on multilateral partnerships. At Rio+20, member states adopted The Future We Want, calling for the formulation of a broader, more holistic agenda: the Sustainable Development Goals.
        </p>

        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        The Verdict
        </h2>

        <p>
        Smart bottling plants represent a systems-level innovation aligning environmental, economic, and experiential performance metrics.
        </p>

        <h2 className="text-[14px] font-bold mt-6 mb-6 leading-[130%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        They make water taste like conscience.
        </h2>

        <p>
        The future of luxury hospitality will not be defined solely by thread count or wine lists, but by the intelligence of its sustainability choices. In the glass bottle lies a simple, elegant truth: luxury and responsibility, bottled together, taste better.
        </p>
      </div>
    </div>
  </div>
</section>
    
      {/* Know Our Writer SECTION */}
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
            Know Our Writer
          </h2>
          
          <div className="flex flex-col justify-between md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-[346px] mb-8 md:mb-0">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8e2eac37-95f7-42d4-1c31-01daf5d4ab00/public"
                alt="Shambhavi Yadav"
                width={346}
                height={346}
                className="w-full h-auto grayscale"
              />
            </div>
            
            {/* Right side - Content */}
            <div className="w-full md:w-[70%] md:ml-[60px]">
              <h3 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '140%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Shambhavi Yadav
              </h3>
              
              <p  style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '120%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                marginBottom: '40px',
              }}>
                Climate Change and Water
              </p>
              
              <p className="mt-[40px] text-[#00000099]" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '17px',
                lineHeight: '120%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                margin: 0
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
              </p>
              
              <Link href="/shambhavi" className="inline-block mt-[40px]" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '120%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline',
                color: 'inherit'
              }}>
                View Profile ↗
              </Link>
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
                    <div className="overflow-hidden mb-4 relative">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e44c37c6-3be1-4f60-27bd-8cbfcb181200/public"
                        alt="History of Climate Change"
                        width={347}
                        height={300}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7b9cb7b8-1b96-42ca-b73b-4420a8b55800/public"
                        alt="History of Climate Change - Hover"
                        width={347}
                        height={300}
                        className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    The North Star of Progress: A Historical Lens on Climate Change and India’s Sustainable Future
                    </h3>
                    <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    In an era defined by climate volatility, rising inequalities, and fractured global priorities, sustainability as popularized by the United Nations Sustainable Development Goals (SDGs) ...
                    </p>
                  </Link>
                  
                  {/* Article 2 */}
                  <Link href="/envisioning-sustainability" className="group block">
                    <div className="overflow-hidden mb-4 relative">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/dd28574f-052d-4cb2-e8a5-3b15ec4d6300/public"
                        alt="Envisioning Sustainability"
                        width={347}
                        height={300}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dfb00d6-e403-4101-7e01-6fcdee1b5900/public"
                        alt="Envisioning Sustainability - Hover"
                        width={347}
                        height={300}
                        className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Envisioning Sustainability: Why the SDGs Are the World’s Shared Compass
                    </h3>
                    <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    The 17 Sustainable Development Goals (SDGs) adopted by the United Nations in 2015 represent a universal call to action to end poverty, protect the planet, and ensure prosperity for all by 2030...
                    </p>
                  </Link>
                  
                  {/* Article 3 */}
                  <Link href="/climate-change-&-water-v3" className="group block">
                    <div className="overflow-hidden mb-4 relative">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public"
                        alt="The Ozone Crisis"
                        width={347}
                        height={300}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c3eb242-b13a-443c-da32-a78bce6e7a00/public"
                        alt="The Ozone Crisis - Hover"
                        width={347}
                        height={300}
                        className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    The Ozone Crisis: A Success Story in Environmental Cooperation
                    </h3>
                    <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    The story of the ozone layer's recovery stands as a testament to what global cooperation can achieve. This environmental success story offers valuable lessons for addressing climate change and other ecological challenges.
                    </p>
                  </Link>
                </div>
              </div>
            </section>

      {/* Explore Categories SECTION */}
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
            Explore Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/abe4e4d0-cb21-4428-8d27-62ac59c62800/public"
                  alt="Water Conservation"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-5" style={{ height: '60px' }}></div>
              <p className="mb-5" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline'
              }}>
                Aditi Sharma
              </p>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                WATER CONSERVATION
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.</p>
            </div>
            
            {/* Category 2 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3082e23f-7ee0-47d0-338d-9d63943d0800/public"
                  alt="Policy"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-5" style={{ height: '60px' }}></div>
              <p className="mb-5" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline'
              }}>
                Aditi Sharma
              </p>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                POLICY
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.</p>
            </div>
            
            {/* Category 3 */}
            <div className="group">
              <div className="overflow-hidden mb-4">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/676e5a42-3d4b-4a29-facb-900980415000/public"
                  alt="Climate Change And Water"
                  width={347}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-5" style={{ height: '60px' }}></div>
              <p className="mb-5" style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                textDecoration: 'underline'
              }}>
                Aditi Sharma
              </p>
              <h3 className="text-sm font-bold mb-2 uppercase leading-[140%]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                CLIMATE CHANGE AND WATER
              </h3>
              <p className="text-sm leading-[24px] mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.</p>
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