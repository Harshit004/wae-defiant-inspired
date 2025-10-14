"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
// Removed: import { useInView } from "react-intersection-observer";
// Removed: import gsap from "gsap";
import Footer from "@/components/footer";
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
};

// Data for the additional sections
const extraSections = [
  { 
    number: '01', 
    title: 'Apprenticeship', 
    description: 'Kickstart your career with hands-on learning at WAE. Our apprenticeship programs offer real-world experience, mentorship from industry leaders, and the chance to contribute to sustainable innovation. Join us to build skills that shape a better future for you and the planet.' 
  },
  { 
    number: '02', 
    title: 'Full-Time Positions', 
    description: 'We’re looking for passionate professionals ready to innovate, collaborate, and make a meaningful impact. Join our team full-time to shape sustainable solutions and contribute to a future where technology and responsibility go hand in hand.' 
  },
  { 
    number: '03', 
    title: 'Internships', 
    description: 'Gain real-world experience and make a difference with an internship at WAE. Work alongside industry experts, contribute to sustainable projects, and grow your skills in an environment that values curiosity, innovation, and impact.' 
  },
  { 
    number: '04', 
    title: 'Short Term Projects', 
    description: 'Collaborate on high-impact, short-term projects at WAE. Whether you are a student, freelancer, or specialist, bring your expertise to meaningful assignments that drive sustainability and innovation.' 
  }
];

// --- NEW MOBILE HEADER COMPONENT ---
interface MobileHeaderProps {
  productsItems: { text: string; href: string }[];
  blueprintItems: { text: string; href: string; }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ productsItems, blueprintItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-black/10 md:hidden ">
        <Link href="/">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce113ad4-0a6b-43dd-066c-26769520d000/public"
            alt="WAE Logo Mobile"
            width={40}
            height={40}
          />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-around w-6 h-5 relative z-50 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-white transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-start pt-[80px] pb-5 px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-row flex-wrap justify-start items-center gap-x-6 gap-y-4 w-full mb-8">
          <h3 className="text-white text-xs font-semibold uppercase mb-2 font-['Inter Tight', sans-serif] w-full">Inside WAE</h3>
          {productsItems.map((item, i) => (
            <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium font-['Inter Tight', sans-serif] leading-[110%]">
              {item.text}
            </Link>
          ))}
        </div>
        <div className="w-full h-px bg-[#D9D9DC] mb-8" />
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

const containerClass = "mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-[140px]";

export default function Careers2() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  return (
    <main className="relative">
      {/* MOBILE HEADER */}
      <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />
      {/* DESKTOP HEADER */}
      <header ref={headerRef} className={`w-full relative z-10 hidden md:block pb-[20px] bg-white`}>
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
      <section
        id="hero"
        className="relative w-full overflow-hidden h-[550px] pt-[70px] md:pt-[160px] mb-[140px]"
      >
        {/* Desktop: Background video (cover, aspect ratio maintained) */}
        <video
          className="hidden md:block absolute inset-0 w-screen object-contain z-0"
          style={{ objectFit: 'contain' }}
          src="/Career_Page_update_video_banner.mp4"
          autoPlay
                  muted
                  loop
                  playsInline
                />
              </section>
      {/* MAIN CONTENT SECTIONS */}
      <section className="w-full px-[9.722222%] max-w-[1440px] mx-auto">
        {/* Grid Layout for Sections 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 justify-between">
          {/* Row 1 */}
          <div style={{
            width: '80%',
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: 32,
            lineHeight: '110.00000000000001%',
            letterSpacing: 0,
            verticalAlign: 'middle',
          }} className="mb-0">Join a team that transforms<br className="hidden md:block"/>challenges into solutions.</div>
          <div style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: 16,
            lineHeight: '120%',
            letterSpacing: 0,
            verticalAlign: 'middle',
          }} className="mb-[140px] mt-0">
            This is where purpose meets progress. Where innovation reshapes impact. At WAE Limited, you won't just join a company, you'll shape a more sustainable tomorrow.
          </div>

          {/* Row 2 - Original Content */}
          <div></div>
          <div className="flex flex-col">
            <div style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: 16,
              lineHeight: '120%',
              letterSpacing: 0,
              verticalAlign: 'middle',
              color: '#00000099',
            }} className="mb-5">At WAE, every role contributes to advancing water access, technology, and sustainability. Whether you're building next-gen systems or driving strategy, your work matters.</div>
            <div className="mb-5" />
            {/* <a href="#" className="w-fit mb-10">
              <button className="border border-black px-6 py-3 text-xs font-medium uppercase font-['Inter Tight',sans-serif] hover:bg-black hover:text-white transition flex items-center gap-2">
                Learn about work at WAE
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d87555-09bc-466e-f870-061b0e7ae900/public"
                  alt="arrow"
                  width={16}
                  height={16}
                  className="inline-block align-middle"
                />
              </button>
            </a> */}
            <div className="mb-10" />
            <div style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: 18,
              lineHeight: '120%',
              letterSpacing: 0,
              verticalAlign: 'middle',
            }} className="mb-5">"We're not just building systems. We're restoring balance where it matters most."</div>
            <div className="mb-5" />
            <div style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: 14,
              lineHeight: '120%',
              letterSpacing: 0,
              verticalAlign: 'middle',
              color: '#00000099',
            }}>A Vikram Joshe, CEO</div>
          </div>

          {/* 140px gap between row 2 and row 3 */}
          <div className="mb-[140px]"></div>
          <div className="mb-[140px]"></div>

          {/* Row 3 */}
          <div style={{
            width: '80%',
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: 32,
            lineHeight: '110.00000000000001%',
            letterSpacing: 0,
            verticalAlign: 'middle',
          }} className="mb-0">Join our community and<br className="hidden md:block"/>help shape it.</div>
          <div className="flex flex-col">
            <div style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: 16,
              lineHeight: '120%',
              letterSpacing: 0,
              verticalAlign: 'middle',
              color: '#00000099',
            }} className="mb-5">We believe in a culture that values originality, inclusion, and continuous learning. You'll be part of a team that supports you to grow, thrive, and lead with purpose.</div>
            <div className="mb-5" />
            {/* <a href="#" className="w-fit mb-10">
              <button className="border border-black px-6 py-3 text-xs font-medium uppercase font-['Inter Tight',sans-serif] hover:bg-black hover:text-white transition flex items-center gap-2">
                Learn about life at WAE
            <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d87555-09bc-466e-f870-061b0e7ae900/public"
                  alt="arrow"
                  width={16}
                  height={16}
                  className="inline-block align-middle"
                />
              </button>
            </a> */}
            <div className="mb-10" />
            <div style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: 18,
              lineHeight: '120%',
              letterSpacing: 0,
              verticalAlign: 'middle',
            }} className="mb-5">"Here, you're free to be yourself—and free to do your best work."</div>
            <div className="mb-5" />
            <div style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: 14,
              lineHeight: '120%',
              letterSpacing: 0,
              verticalAlign: 'middle',
              color: '#00000099',
            }}>Amit K. Singh, Marketing</div>
          </div>
        </div>

        
    </section>

    {/* Explore Roles Section */}
    <section className="w-full px-[9.722222%] max-w-[1440px] mx-auto mt-[140px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 justify-between">
        <div style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 500,
          fontStyle: 'Medium',
          fontSize: '48px',
          lineHeight: '120%',
          letterSpacing: '0%',
          verticalAlign: 'middle',
          marginBottom: '24px',
        }}>
          Explore Roles
        </div>
        <div className="flex flex-col">
          <div style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 400,
            fontStyle: 'Regular',
            fontSize: '14px',
            lineHeight: '120%',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            marginBottom: '24px'
          }}>
            Design and implement intelligent water systems that power communities and industries.
          </div>
          <Link href="/explore-roles" className="w-fit">
            <button className="flex items-center gap-2 border border-black px-6 py-3 text-xs font-medium uppercase font-['Inter Tight',sans-serif] hover:bg-black hover:text-white transition">
              Explore roles&nbsp;&nbsp;<span style={{fontWeight: 700 as React.CSSProperties['fontWeight']}}>↗</span>
            </button>
          </Link>
        </div>
      </div>
    </section>

    {/* Explore our Resources Section */}
    <section className="w-full px-[9.722222%] max-w-[1440px] mx-auto mt-[140px] pb-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 justify-between">
        <div style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 500,
          fontStyle: 'Medium',
          fontSize: '48px',
          lineHeight: '120%',
          letterSpacing: '0%',
          verticalAlign: 'middle',
          marginBottom: '24px',
        }}>
          Explore our Resources
        </div>
        <div className="flex flex-col">
          <div style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 400,
            fontStyle: 'Regular',
            fontSize: '14px',
            lineHeight: '120%',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            marginBottom: '24px'
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis odio tempus dui tristique feugiat.
          </div>
          <Link href="/hr-policies" className="w-fit">
            <button className="flex items-center gap-2 border border-black px-6 py-3 text-xs font-medium uppercase font-['Inter Tight',sans-serif] hover:bg-black hover:text-white transition">
              Know more about policy&nbsp;&nbsp;<span style={{fontWeight: 700 as React.CSSProperties['fontWeight']}}>↗</span>
            </button>
          </Link>
        </div>
      </div>
    </section>

    {/* FOOTER SECTION */}
    <div>
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
    </main>
  );
}