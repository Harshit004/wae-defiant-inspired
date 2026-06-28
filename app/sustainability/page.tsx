"use client"

import type { FC, ReactNode } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { animate, useInView } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  variant?: "default" | "inverted";
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, variant = "default" }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const isDefault = variant === "default";

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
        fontSize: "14px",
        lineHeight: "100%",
        backgroundColor: isDefault
          ? (hovered ? "#000" : "#f2f2f2")
          : (hovered ? "#fff" : "transparent"),
        border: isDefault
          ? "1px solid #000"
          : "1px solid #fff",
        cursor: "pointer",
        color: isDefault
          ? (hovered ? "#fff" : "#000")
          : (hovered ? "#000" : "#fff"),
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

/**
 * CountUp Component: Animates a numeric value from 0 to target
 */
const CountUp: FC<{ value: string; duration?: number }> = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const match = value.match(/([\d,.]+)/);
      if (!match) return;

      const numStr = match[0].replace(/,/g, "");
      const target = parseFloat(numStr);

      const controls = animate(0, target, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setCount(latest);
        },
      });

      return () => controls.stop();
    }
  }, [value, duration, isInView]);

  const formatNumber = (num: number) => {
    const hasDecimal = value.includes(".");
    if (hasDecimal) {
      return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    }
    return Math.floor(num).toLocaleString();
  };

  const match = value.match(/([\d,.]+)/);
  const prefix = match ? value.substring(0, value.indexOf(match[0])) : "";
  const suffix = match ? value.substring(value.indexOf(match[0]) + match[0].length) : "";

  return (
    <span ref={nodeRef}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default function Home() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

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
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ]
  const blueprintItems = [
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Resources", href: "/resources" },
    { text: "Blog", href: "/blogs" },
  ]

  const brandLogos = [
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3f2f7aee-3341-40f0-83b0-9929fed77700/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e2da048e-651a-463e-2689-58d8418b7700/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/acad2e03-7926-494c-2661-e2ad69e80700/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/84053b5e-b615-468f-2117-8b76f26e1d00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9436a14a-faf2-4320-7f65-6f5684bfb600/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76665ccd-981b-4323-13f3-aae079a46500/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d183040a-3d81-43a8-09ff-31cd03319f00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d9eb2793-e98a-45d8-1c96-a3d3985c3c00/public",
    "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2c5a5b3a-4e77-43fb-3735-3e9446a9a500/public"
  ]

  return (
    <main className="relative bg-[#0A0A0A] text-white">
      {/* HEADER */}
      <div> 
        <header ref={headerRef} className={`w-full bg-[#0A0A0A] text-white relative z-10 pb-5`}>
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
              <div>VISION</div>
              <div>INSIDE WAE</div>
              <div>ETCETERA</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/20 mb-[10px]" />

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
                    className="invert"
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
                  color: "#FFFFFF99",
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
                  color: "#FFFFFF99",
                }}
              >
                To lead the way in<br />sustainability ahead of the<br />next
              </div>

              {/* Inside WAE Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-white/20 last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents text-white"> 
                      <div className="c--anim-btn">
                        <div className="text-container">
                          <span className="c-anim-btn">{item.text}</span>
                          <span className="block">{item.text}</span>
                        </div>
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
                    className="pb-2 border-b border-white/20 last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents text-white">
                      <div className="c--anim-btn">
                        <div className="text-container">
                          <span className="c-anim-btn">{item.text}</span>
                          <span className="block">{item.text}</span>
                        </div>
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
        className="w-screen relative overflow-hidden flex items-center justify-between"
        style={{ height: `calc(100vh - ${headerHeight}px)`, minHeight: "600px", background: "radial-gradient(circle at left, #012D4C 0%, #0A0A0A 60%)" }}
      >
        <div className={containerClass}>
            <div className="flex justify-between items-start pt-[60px]">
                <div className="w-1/2 pr-10">
                    <h1 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "64px",
                        lineHeight: "110%",
                        letterSpacing: "-0.02em",
                        color: "#FFFFFF",
                        margin: 0,
                    }}>
                        Our planet,<br />
                        Our responsibility
                    </h1>
                </div>
                <div className="w-[45%] flex flex-col justify-end pt-[120px]">
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        color: "#FFFFFF",
                        marginBottom: "32px",
                    }}>
                        Sustainability is not a choice. It is a responsibility.
                    </p>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        color: "#FFFFFF80",
                    }}>
                        We help organizations reduce environmental impact, adopt ethical practices, and move towards regenerative business models that are better for business and better for the planet
                    </p>
                </div>
            </div>
        </div>

        {/* Hero Video inserted into the layout */}
        <div className="w-full absolute bottom-0 flex justify-center pb-[80px]" style={{ left: "50%", transform: "translateX(-50%)", width: "95vw" }}>
             <video
                src="/11977161_1920_1080_30fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[400px] object-cover"
                />
        </div>
      </section>

      {/* CLIENTS STRIP WITH MARQUEE */}
      <section className="w-full border-b border-white/20 pt-[60px] pb-[60px]">
        <div className={containerClass}>
            <div className="flex items-center gap-[40px]">
                <div className="w-[120px] shrink-0 border-r border-white/20">
                    <span style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#FFFFFF"
                    }}>Our Clients</span>
                </div>
                {/* Marquee constrained within this flex item */}
                <div className="marquee-container relative flex-1 overflow-hidden">
                    <div className="marquee-content flex items-center" style={{ gap: "4vw" }}>
                        {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                            <Image
                            src={logo}
                            alt={`Brand Logo`}
                            height={32}
                            width={100} 
                            className="h-[32px] w-auto max-w-none grayscale brightness-0 invert"
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* RESPONSIBILITY SECTION */}
      <section className="w-full pt-[100px] pb-[100px] border-b border-white/20">
        <div className={containerClass}>
            <div className="flex justify-between items-start">
                <div className="w-1/2">
                    <h2 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "40px",
                        lineHeight: "110%",
                        color: "#FFFFFF",
                        letterSpacing: "-0.01em",
                        maxWidth: "400px"
                    }}>
                        Responsibility begins<br/>with what we choose to change.
                    </h2>
                </div>
                <div className="w-[45%]">
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80",
                        marginBottom: "24px",
                        maxWidth: "420px"
                    }}>
                        The world is not running low on water. It is running out of patience for those who waste it.
                    </p>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80",
                        maxWidth: "420px"
                    }}>
                        Every bottle procured through a supply chain contributes to aquifer depletion, plastic waste, transport emissions, and growing business risk. What was once seen as convenience is now an environmental, operational, and reputational liability. WAE exists to replace that model with one that is cleaner, smarter, and built for the future.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* WHY IT MATTERS SECTION */}
      <section className="w-full pt-[100px] pb-[100px] border-b border-white/20">
        <div className={containerClass}>
            <div className="mb-[60px]">
                <h2 style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "32px",
                    lineHeight: "110%",
                    color: "#FFFFFF",
                    marginBottom: "12px"
                }}>Why It Matters</h2>
                <p style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#FFFFFF80"
                }}>The challenge is no longer invisible.</p>
            </div>
            
            <div className="flex justify-between items-start gap-[80px]">
                <div className="w-1/2 h-[500px]">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/697673e1-ba24-4763-4a6f-f2f4fadbda00/public" alt="Why it matters" className="w-full h-full object-cover" />
                </div>
                
                <div className="w-1/2 flex flex-col justify-between h-[500px]">
                    {/* Stat 1 */}
                    <div className="flex flex-col justify-center flex-1 border-b border-white/20 pb-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="w-[180px]">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "64px",
                                    color: "#FFFFFF"
                                }}><CountUp value="50"/>%</span>
                            </div>
                            <div className="flex-1">
                                <h4 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                    marginBottom: "8px"
                                }}>Water use</h4>
                                <p style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "#FFFFFF80",
                                    lineHeight: "130%"
                                }}>50% rise in corporate water<br/>withdrawals globally</p>
                            </div>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col justify-center flex-1 border-b border-white/20 pb-[20px] pt-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="w-[180px]">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "64px",
                                    color: "#FFFFFF"
                                }}>₹<CountUp value="36"/>L cr +</span>
                            </div>
                            <div className="flex-1">
                                <h4 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                    marginBottom: "8px"
                                }}>Financial exposure</h4>
                                <p style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "#FFFFFF80",
                                    lineHeight: "130%"
                                }}>More than Rs 36 lakh crore in<br/>water-related financial risk reported<br/>by companies worldwide</p>
                            </div>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex flex-col justify-center flex-1 border-b border-white/20 pb-[20px] pt-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="w-[180px]">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "64px",
                                    color: "#FFFFFF"
                                }}>₹<CountUp value="8.5"/>L cr</span>
                            </div>
                            <div className="flex-1">
                                <h4 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                    marginBottom: "8px"
                                }}>Revenue at risk</h4>
                                <p style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "#FFFFFF80",
                                    lineHeight: "130%"
                                }}>Nearly Rs 8.5 lakh crore in business<br/>revenue currently at risk from water-<br/>related disruption</p>
                            </div>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex flex-col justify-center flex-1 pt-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="w-[180px]">
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "64px",
                                    color: "#FFFFFF"
                                }}><CountUp value="67"/>%</span>
                            </div>
                            <div className="flex-1">
                                <h4 style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                    marginBottom: "8px"
                                }}>Global stress</h4>
                                <p style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "#FFFFFF80",
                                    lineHeight: "130%"
                                }}>50% rise in corporate water<br/>withdrawals globally</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CENTRAL STATEMENT SECTION */}
      <section className="w-full pt-[120px] pb-[120px] text-center border-b border-white/20">
        <div className={containerClass}>
            <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "140%",
                color: "#FFFFFF80",
                maxWidth: "1000px",
                margin: "0 auto",
                marginBottom: "40px"
            }}>
                Our <span className="text-white font-medium">responsibility</span> is to create <span className="text-white font-medium">solutions</span> that protect natural resources while improving the quality of everyday life. That means rethinking wasteful systems, reducing dependence on extractive supply chains, and enabling <span className="text-white font-medium">organizations</span> to act with greater accountability.
            </p>
            <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "140%",
                color: "#FFFFFF80",
                maxWidth: "1000px",
                margin: "0 auto"
            }}>
                Responsibility at <span className="text-white font-medium">WAE</span> is not a statement. It is built into the way we <span className="text-white font-medium">design</span>, <span className="text-white font-medium">deliver</span>, and <span className="text-white font-medium">scale solutions</span>.
            </p>
        </div>
      </section>

      {/* WE ARE HELPING CLIENTS */}
      <section className="w-full pt-[100px] pb-[100px] border-b border-white/20">
        <div className={containerClass}>
            <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                color: "#FFFFFF",
                marginBottom: "60px"
            }}>We are helping clients</h2>

            <div className="grid grid-cols-3 gap-[40px]">
                <div className="flex flex-col">
                    <div className="w-full h-[240px] mb-[24px]">
                        <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21779bba-89da-415d-af81-d015add0cc00/public" alt="Reduce Scope 3" className="w-full h-full object-cover" />
                    </div>
                    <h3 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "20px",
                        color: "#FFFFFF",
                        marginBottom: "16px"
                    }}>Reduce Scope 3 Emissions</h3>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80"
                    }}>The greatest emissions are often the ones hidden in everyday operations. Rethink how water is sourced, transported, and consumed to reduce indirect emissions where they matter most and turn sustainability into measurable business impact.</p>
                </div>
                <div className="flex flex-col">
                    <div className="w-full h-[240px] mb-[24px]">
                        <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce4e4b96-60aa-4973-1d75-80165114a800/public" alt="Enable Plastic-Free Hydration" className="w-full h-full object-cover" />
                    </div>
                    <h3 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "20px",
                        color: "#FFFFFF",
                        marginBottom: "16px"
                    }}>Enable Plastic-Free Hydration</h3>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80"
                    }}>Every refill is a choice against single-use plastic. Replace a disposable habit with a lasting solution that protects natural resources, keeps plastic out of the waste stream, and redefines the way people experience drinking water.</p>
                </div>
                <div className="flex flex-col">
                    <div className="w-full h-[240px] mb-[24px]">
                        <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f886425-f3b6-4b5a-de68-f75fd3459500/public" alt="Advance the Net-Zero Transition" className="w-full h-full object-cover" />
                    </div>
                    <h3 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "20px",
                        color: "#FFFFFF",
                        marginBottom: "16px"
                    }}>Advance the Net-Zero Transition</h3>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80"
                    }}>Net-zero isn't achieved through a single initiative but through thousands of smarter decisions. Transform water infrastructure into a climate-positive asset that reduces environmental impact while supporting long-term sustainability and ESG ambitions.</p>
                </div>
            </div>
        </div>
      </section>

      {/* TRANSFORMATIONS SECTION */}
      <section className="w-full pt-[100px] pb-[100px] border-b border-white/20">
        <div className={containerClass}>
            <div className="flex justify-between items-start gap-[80px]">
                <div className="w-[30%]">
                    <h2 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "32px",
                        color: "#FFFFFF",
                        marginBottom: "16px"
                    }}>Transformations</h2>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#FFFFFF80",
                        lineHeight: "140%"
                    }}>The success stories that changed what<br/>sustainable hydration looks like.</p>
                </div>
                
                <div className="w-[35%] flex flex-col gap-[60px]">
                    <div className="flex flex-col">
                        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", color: "#FFFFFF80", marginBottom: "16px" }}>Volume : 1</span>
                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "20px", color: "#FFFFFF", marginBottom: "16px" }}>Greener banking, better<br/>workplaces</h3>
                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", color: "#FFFFFF80", lineHeight: "140%", marginBottom: "16px" }}>How BFSI organizations ditched plastic water jars for a cleaner, safer alternative</p>
                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", color: "#FFFFFF80", lineHeight: "140%", marginBottom: "24px" }}>Banking offices run 12/6, and so did their plastic water jar problem-spills, hygiene concerns, and hundreds of jars piling up every month. By switching to stainless steel alternatives, BFSI offices cut plastic waste significantly, reduced water contamination risks, and gave employees a cleaner, more professional workspace.</p>
                        <button className="text-white border border-white/20 w-max px-4 py-2 text-[12px] flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
                            Download full story
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", color: "#FFFFFF80", marginBottom: "16px" }}>Volume : 2</span>
                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "20px", color: "#FFFFFF", marginBottom: "16px" }}>Clean hydration for high<br/>performance it teams</h3>
                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", color: "#FFFFFF80", lineHeight: "140%", marginBottom: "16px" }}>How IT campuses moved away from plastic jars and never looked back.</p>
                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", color: "#FFFFFF80", lineHeight: "140%", marginBottom: "24px" }}>Large IT campuses consume enormous volumes of water daily. Plastic jars meant constant logistics, leakage, and avoidable plastic waste. Switching to in-situ dispensers simplified operations, eliminated single-use plastic from common areas, and gave teams access to hygienic, temperature consistent water throughout the day.</p>
                        <button className="text-white border border-white/20 w-max px-4 py-2 text-[12px] flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
                            Download full story
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", color: "#FFFFFF80", marginBottom: "16px" }}>Volume : 3</span>
                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "20px", color: "#FFFFFF", marginBottom: "16px" }}>A Greener Stay for Every<br/>Guest</h3>
                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", color: "#FFFFFF80", lineHeight: "140%", marginBottom: "16px" }}>How hospitality brands elevated their sustainability commitment, one dispenser at a time</p>
                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "12px", color: "#FFFFFF80", lineHeight: "140%", marginBottom: "24px" }}>In hospitality, every detail shapes the guest experience. Replacing plastic water bottles with sleek and clean branded glass bottled helped hotels reduce plastic footprint, cut recurring supply costs, and signal a genuine commitment to sustainability. Guests noticed, Staff appreciated the ease. And the numbers backed it up with lower operational costs and stronger sustainability ratings while enhancing brand perception across every guest interaction.</p>
                        <button className="text-white border border-white/20 w-max px-4 py-2 text-[12px] flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
                            Download full story
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>

                <div className="w-[30%]">
                    <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ed81f80c-aa41-49b4-922a-4899bc32d300/public" alt="Transformations" className="w-full h-auto object-cover" />
                </div>
            </div>
        </div>
      </section>

      {/* EARTH SECTION */}
      <section className="w-full pt-[100px] pb-[100px]">
        <div className={containerClass}>
            <div className="w-full h-[500px] mb-[60px]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/048c10f8-fc18-43ed-c62c-8658de2acf00/public" alt="Earth, Our Only Shareholder" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex justify-between items-start">
                <div className="w-1/2">
                    <h2 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "40px",
                        lineHeight: "110%",
                        color: "#FFFFFF"
                    }}>
                        Earth, Our<br/>Only Shareholder
                    </h2>
                </div>
                <div className="w-[35%] flex flex-col items-start gap-[24px]">
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80"
                    }}>
                        We're excited to share the progress we have made, reflecting our commitment to sustainability.
                    </p>
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                        color: "#FFFFFF80",
                        marginBottom: "16px"
                    }}>
                        Explore them to see how we're making a positive impact on the environment, society & governance.
                    </p>
                    <button className="text-white border border-white/20 w-max px-4 py-2 text-[12px] flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
                        Download report
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* INLINE CSS for animations */}
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

        /* Marquee Animation */
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          width: fit-content;
          animation: slide 30s linear infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>

    </main>
  )
}
