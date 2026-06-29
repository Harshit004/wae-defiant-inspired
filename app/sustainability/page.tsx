"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { animate, useInView } from "framer-motion"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Link from "next/link"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

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
      className="w-fit  transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55vw", padding: "0.69vw 1.11vw",
        fontFamily: "\'Manrope\', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
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
      {/* Dark background gradient */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)', height: 'clamp(500px, 80vh, 875px)'
        }}
      />
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative flex flex-col items-center"
      >
        {/* Adjusted spacing to accommodate the transparent header */}
        <div className={`${containerClass} -mt-[80px] pt-[80px]`}>
          <div className="flex flex-col pt-[60px] pb-[2.63vw]">
            <div className="w-1/2 pr-10">
              <h1 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "4.16vw",
                lineHeight: "130%",
                letterSpacing: "0%",
                color: "#FFFFFF",
                margin: 0,
                verticalAlign: "middle"
              }}>
                Our planet,<br />
                Our responsibility
              </h1>
            </div>
            <div className="w-full flex justify-end">
              <div className="w-[39.58vw] flex flex-col justify-start">
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "1.11vw",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  marginBottom: "1.5vw",
                  verticalAlign: "middle"
                }}>
                  Sustainability is not a choice. It is a responsibility.
                </p>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "1.11vw",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  verticalAlign: "middle"
                }}>
                  We help organizations reduce environmental impact, adopt ethical practices, and move towards regenerative business models that are better for business and better for the planet
                </p>
              </div>
            </div>
          </div>

          {/* Hero Video inserted into the layout */}
          <div className="w-full flex justify-center pb-[4.72vw]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover bg-gray-900"
              style={{ aspectRatio: "16/9", maxHeight: "80vh" }}
            >
              <source src="/11977161_1920_1080_30fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* CLIENTS STRIP WITH MARQUEE */}
          <div className="flex items-center w-full border-t border-b border-white/20 py-[2.08vw]">
            <div className="shrink-0 flex items-center pr-[4.09vw] border-r border-white/20">
              <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "1.25vw",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FFFFFF",
                verticalAlign: "middle"
              }}>Our Clients</span>
            </div>
            {/* Marquee constrained within this flex item */}
            <div className="marquee-container relative flex-1 overflow-hidden pl-[4.16vw]">
              <div className="marquee-content flex items-center" style={{ gap: "5.55vw" }}>
                {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center justify-center w-[120px]">
                    <Image
                      src={logo}
                      alt={`Brand Logo`}
                      height={45}
                      width={120}
                      className="max-h-[45px] w-auto max-w-full grayscale brightness-0 invert object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY SECTION */}
      <section className="w-full pt-[6.38vw] pb-[6.38vw]">
        <div className={containerClass}>
          <div className="flex justify-between items-start">
            <div className="w-[38.68vw]">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "2.77vw",
                lineHeight: "120%",
                color: "#FFFFFF",
                verticalAlign: "middle",
                margin: 0
              }}>
                Responsibility begins<br />
                with what we choose to change.
              </h2>
            </div>
            <div className="w-[27.77vw] flex flex-col pt-[0.5vw]">
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                color: "#AEAEAE",
                marginBottom: "1.38vw",
                verticalAlign: "middle"
              }}>
                The world is not running low on water. It is running out of patience for those who waste it.
              </p>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                color: "#AEAEAE",
                verticalAlign: "middle"
              }}>
                Every bottle procured through a supply chain contributes to aquifer depletion, plastic waste, transport emissions, and growing business risk. What was once seen as convenience is now an environmental, operational, and reputational liability. WAE exists to replace that model with one that is cleaner, smarter, and built for the future.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-[7.5vw] border-b border-white/20"></div>

      {/* WHY IT MATTERS SECTION */}
      <section className="w-full pt-[6.38vw] pb-[6.38vw]">
        <div className={containerClass}>
          <div className="mb-[5.13vw]">
            <h2 style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "2.77vw",
              lineHeight: "100%",
              color: "#FFFFFF",
              marginBottom: "1.18vw",
              verticalAlign: "middle"
            }}>Why It Matters</h2>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "0.97vw",
              lineHeight: "100%",
              color: "#AEAEAE",
              verticalAlign: "middle"
            }}>The challenge is no longer invisible.</p>
          </div>

          <div className="flex items-stretch">
            {/* Left side image */}
            <div className="w-[34.02vw] shrink-0">
              <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/697673e1-ba24-4763-4a6f-f2f4fadbda00/public" alt="Why it matters" className="w-full h-auto aspect-[490/545] object-cover" />
            </div>

            <div className="w-[4.58vw] shrink-0"></div>
            <div className="w-[1px] shrink-0 bg-white/20"></div>
            <div className="w-[4.58vw] shrink-0"></div>

            {/* Right side stats */}
            <div className="w-[41.52vw] flex flex-col">
              {/* Stat 1 */}
              <div className="flex-1 flex items-center border-b border-white/20">
                <div className="flex-1">
                  <span style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "4.86vw",
                    color: "#FFFFFF"
                  }}><CountUp value="50" />%</span>
                </div>
                <div className="w-[19.44vw] shrink-0 pl-[1.38vw]">
                  <h4 style={{
                    fontFamily: "\'Manrope\', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.25vw",
                    color: "#FFFFFF",
                    marginBottom: "0.69vw"
                  }}>Water use</h4>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: "1.04vw",
                    color: "#FFFFFF80",
                    lineHeight: "normal"
                  }}>50% rise in corporate water withdrawals globally</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex-1 flex items-center border-b border-white/20">
                <div className="flex-1">
                  <span style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "4.86vw",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap"
                  }}>₹<CountUp value="36" />L cr +</span>
                </div>
                <div className="w-[19.44vw] shrink-0 pl-[1.38vw]">
                  <h4 style={{
                    fontFamily: "\'Manrope\', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.25vw",
                    color: "#FFFFFF",
                    marginBottom: "0.69vw"
                  }}>Financial exposure</h4>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: "1.04vw",
                    color: "#FFFFFF80",
                    lineHeight: "normal"
                  }}>More than Rs 36 lakh crore in water-related financial risk reported by companies worldwide</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex-1 flex items-center border-b border-white/20">
                <div className="flex-1">
                  <span style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "4.86vw",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap"
                  }}>₹<CountUp value="8.5" />L cr</span>
                </div>
                <div className="w-[19.44vw] shrink-0 pl-[1.38vw]">
                  <h4 style={{
                    fontFamily: "\'Manrope\', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.25vw",
                    color: "#FFFFFF",
                    marginBottom: "0.69vw"
                  }}>Revenue at risk</h4>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: "1.04vw",
                    color: "#FFFFFF80",
                    lineHeight: "normal"
                  }}>Nearly Rs 8.5 lakh crore in business revenue currently at risk from water- related disruption</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex-1 flex items-center">
                <div className="flex-1">
                  <span style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "4.86vw",
                    color: "#FFFFFF"
                  }}><CountUp value="67" />%</span>
                </div>
                <div className="w-[19.44vw] shrink-0 pl-[1.38vw]">
                  <h4 style={{
                    fontFamily: "\'Manrope\', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.25vw",
                    color: "#FFFFFF",
                    marginBottom: "0.69vw"
                  }}>Global stress</h4>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: "1.04vw",
                    color: "#FFFFFF80",
                    lineHeight: "normal"
                  }}>50% rise in corporate water withdrawals globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-[7.5vw] border-b border-white/20"></div>

            {/* OUR RESPONSIBILITY SOLUTIONS */}
      <section className="w-full pt-[6.38vw] pb-[6.38vw] flex flex-col items-end">
        <div className={containerClass}>
          <div className="flex flex-col items-end w-full">
            <p style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "2.77vw",
              lineHeight: "130%",
              color: "#FFFFFF80",
              textAlign: "right",
              verticalAlign: "middle",
              marginBottom: "1.5vw",
              width: "100%"
            }}>
              Our <span className="text-white">responsibility</span> is to create <span className="text-white">solutions</span> that protect natural resources while improving the quality of everyday life. That means rethinking wasteful systems, reducing dependence on extractive supply chains, and enabling <span className="text-white">organizations</span> to act with greater accountability.
            </p>
            <p style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "2.77vw",
              lineHeight: "130%",
              color: "#FFFFFF80",
              textAlign: "right",
              verticalAlign: "middle",
              width: "100%"
            }}>
              Responsibility at <span className="text-white">WAE</span> is not a statement. It is built into the way we <span className="text-white">design</span>, <span className="text-white">deliver</span>, and <span className="text-white">scale solutions</span>.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-[7.5vw] border-b border-white/20"></div>

      {/* WE ARE HELPING CLIENTS */}
      <section className="w-full pt-[6.38vw] pb-[6.38vw]">
        <div className={containerClass}>
          <h2 style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "2.77vw",
            lineHeight: "120%",
            color: "#FFFFFF",
            verticalAlign: "middle",
            marginBottom: "5vw"
          }}>We are helping clients</h2>

          <div className="grid grid-cols-3 gap-[2.29vw]">
            <div className="flex flex-col border-l border-white/20 pl-[1.52vw]">
              <div className="w-full aspect-[360/224] mb-[1.38vw]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21779bba-89da-415d-af81-d015add0cc00/public" alt="Reduce Scope 3" className="w-full h-full object-cover" />
              </div>
              <h3 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "1.66vw",
                lineHeight: "100%",
                color: "#FFFFFF",
                verticalAlign: "middle",
                marginBottom: "0.83vw"
              }}>Reduce Scope 3 Emissions</h3>
              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                color: "#AEAEAE",
                verticalAlign: "middle"
              }}>The greatest emissions are often the ones hidden in everyday operations. Rethink how water is sourced, transported, and consumed to reduce indirect emissions where they matter most and turn sustainability into measurable business impact.</p>
            </div>

            <div className="flex flex-col border-l border-white/20 pl-[1.52vw]">
              <div className="w-full aspect-[360/224] mb-[1.38vw]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce4e4b96-60aa-4973-1d75-80165114a800/public" alt="Enable Plastic-Free Hydration" className="w-full h-full object-cover" />
              </div>
              <h3 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "1.66vw",
                lineHeight: "100%",
                color: "#FFFFFF",
                verticalAlign: "middle",
                marginBottom: "0.83vw"
              }}>Enable Plastic-Free Hydration</h3>
              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                color: "#AEAEAE",
                verticalAlign: "middle"
              }}>Every refill is a choice against single-use plastic. Replace a disposable habit with a lasting solution that protects natural resources, keeps plastic out of the waste stream, and redefines the way people experience drinking water.</p>
            </div>

            <div className="flex flex-col border-l border-white/20 pl-[1.52vw]">
              <div className="w-full aspect-[360/224] mb-[1.38vw]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f886425-f3b6-4b5a-de68-f75fd3459500/public" alt="Advance the Net-Zero Transition" className="w-full h-full object-cover" />
              </div>
              <h3 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "1.66vw",
                lineHeight: "100%",
                color: "#FFFFFF",
                verticalAlign: "middle",
                marginBottom: "0.83vw"
              }}>Advance the Net-Zero Transition</h3>
              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                color: "#AEAEAE",
                verticalAlign: "middle"
              }}>Net-zero isn't achieved through a single initiative but through thousands of smarter decisions. Transform water infrastructure into a climate-positive asset that reduces environmental impact while supporting long-term sustainability and ESG ambitions.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-[7.5vw] border-b border-white/20"></div>

            {/* TRANSFORMATIONS SECTION */}
      <section className="w-full pt-[6.38vw] pb-[6.38vw]">
        <div className={containerClass}>
          <div className="flex items-stretch">
            {/* Left Column */}
            <div className="w-[30%] border-r border-white/20 pr-[5.97vw]">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "2.77vw",
                color: "#FFFFFF",
                lineHeight: "110%",
                verticalAlign: "middle",
                marginBottom: "1.94vw"
              }}>Transformations</h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                color: "#AEAEAE",
                lineHeight: "100%",
                verticalAlign: "middle"
              }}>The success stories that changed what sustainable hydration looks like.</p>
            </div>

            {/* Right Column Grid */}
            <div className="w-[70%] pl-[3.47vw]">
              <div className="grid grid-cols-2 gap-x-[6.38vw] gap-y-[4.51vw]">
                {/* Volume 1 */}
                <div className="flex flex-col">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", marginBottom: "0.86vw", display: "block", lineHeight: "110%", verticalAlign: "middle" }}>Volume : 1</span>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "1.66vw", color: "#FFFFFF", marginBottom: "0.97vw", lineHeight: "normal", textTransform: "uppercase", verticalAlign: "middle" }}>Greener banking, better workplaces</h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "100%", marginBottom: "1.94vw", verticalAlign: "middle" }}>How BFSI organizations ditched plastic water jars for a cleaner, safer alternative</p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "100%", marginBottom: "1.94vw", verticalAlign: "middle" }}>Banking offices run 12/6, and so did their plastic water jar problem-spills, hygiene concerns, and hundreds of jars piling up every month. By switching to stainless steel alternatives, BFSI offices cut plastic waste significantly, reduced water contamination risks, and gave employees a cleaner, more professional workspace.</p>
                  <button className="text-white w-max text-[0.97vw] flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Download report
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H2M11 1V10" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>

                {/* Image */}
                <div className="w-full aspect-[362/391]">
                  <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ed81f80c-aa41-49b4-922a-4899bc32d300/public" alt="Transformations" className="w-full h-full object-cover" />
                </div>

                {/* Volume 2 */}
                <div className="flex flex-col">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", marginBottom: "0.86vw", display: "block", lineHeight: "110%", verticalAlign: "middle" }}>Volume : 2</span>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "1.66vw", color: "#FFFFFF", marginBottom: "0.97vw", lineHeight: "normal", textTransform: "uppercase", verticalAlign: "middle" }}>Clean hydration for high performance it teams</h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "100%", marginBottom: "1.94vw", verticalAlign: "middle" }}>How IT campuses moved away from plastic jars and never looked back.</p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "100%", marginBottom: "1.94vw", verticalAlign: "middle" }}>Large IT campuses consume enormous volumes of water daily. Plastic jars meant constant logistics, leakage, and avoidable plastic waste. Switching to in-situ dispensers simplified operations, eliminated single-use plastic from common areas, and gave teams access to hygienic, temperature consistent water throughout the day.</p>
                  <button className="text-white w-max text-[0.97vw] flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Download report
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H2M11 1V10" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>

                {/* Volume 3 */}
                <div className="flex flex-col">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", marginBottom: "0.86vw", display: "block", lineHeight: "110%", verticalAlign: "middle" }}>Volume : 3</span>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "1.66vw", color: "#FFFFFF", marginBottom: "0.97vw", lineHeight: "normal", textTransform: "uppercase", verticalAlign: "middle" }}>A Greener Stay for Every Guest</h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "100%", marginBottom: "1.94vw", verticalAlign: "middle" }}>How hospitality brands elevated their sustainability commitment, one dispenser at a time</p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "100%", marginBottom: "1.94vw", verticalAlign: "middle" }}>In hospitality, every detail shapes the guest experience. Replacing plastic water bottles with sleek and clean branded glass bottled helped hotels reduce plastic footprint, cut recurring supply costs, and signal a genuine commitment to sustainability. Guests noticed, Staff appreciated the ease. And the numbers backed it up with lower operational costs and stronger sustainability ratings while enhancing brand perception across every guest interaction.</p>
                  <button className="text-white w-max text-[0.97vw] flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Download report
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H2M11 1V10" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-[7.5vw] border-b border-white/20"></div>

      {/* EARTH SECTION */}
      <section className="w-full pt-[6.38vw] pb-[6.38vw]">
        <div className={containerClass}>
          <div className="w-full h-[500px] mb-[5vw]">
            <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/048c10f8-fc18-43ed-c62c-8658de2acf00/public" alt="Earth, Our Only Shareholder" className="w-full h-full object-cover" />
          </div>

          <div className="flex justify-between items-start">
            <div className="w-1/2">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "2.77vw",
                lineHeight: "100%",
                verticalAlign: "middle",
                color: "#FFFFFF"
              }}>
                Earth, Our<br />Only Shareholder
              </h2>
            </div>
            <div className="w-[35%] flex flex-col items-start">
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                verticalAlign: "middle",
                color: "#FFFFFF80"
              }}>
                We're excited to share the progress we have made, reflecting our commitment to sustainability.
              </p>
              <br />
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                lineHeight: "130%",
                verticalAlign: "middle",
                color: "#FFFFFF80",
                marginBottom: "4.3vw"
              }}>
                Explore them to see how we're making a positive impact on the environment, society & governance.
              </p>
              <button className="text-white w-max text-[0.97vw] flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Download report
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H2M11 1V10" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

{/* FOOTER */}
      <Footer />

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
