"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { animate, useInView } from "framer-motion"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Link from "next/link"
import EnquireNowPopup from "@/components/EnquireNowPopup"

// Shared container class: 24px padding on mobile, 7.5vw on desktop
const containerClass = "mx-auto w-full max-w-[1440px] px-[24px] md:px-[7.5vw]"

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  variant?: "default" | "inverted";
  download?: boolean;
  onClick?: () => void;
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, variant = "default", download, onClick }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const isDefault = variant === "default";

  const buttonContent = (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55vw",
        padding: "10.5px 16px",
        fontFamily: "'Manrope', sans-serif",
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
    href.startsWith('#') || download ? (
      <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }} download={download ? true : undefined}>{buttonContent}</a>
    ) : (
      <Link href={href} className="contents">{buttonContent}</Link>
    )
  ) : buttonContent;
};

/**
 * CountUp Component: Animates a numeric value from 0 to target
 */
const CountUp: FC<{ value: string; duration?: number }> = ({ value, duration = 2 }) => {
  const match = value.match(/([\d,.]+)/);
  const numStr = match ? match[0].replace(/,/g, "") : "0";
  const target = parseFloat(numStr) || 0;
  const hasDecimal = value.includes(".");

  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, target, {
            duration: duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
              setCount(latest);
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.05, rootMargin: "50px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (hasDecimal) {
      return num.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
    return Math.floor(num).toLocaleString();
  };

  const prefix = match ? value.substring(0, value.indexOf(match[0])) : "";
  const suffix = match ? value.substring(value.indexOf(match[0]) + match[0].length) : "";

  return (
    <span ref={nodeRef} className="inline-block tabular-nums">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default function Home() {
  const [isEnquirePopupOpen, setIsEnquirePopupOpen] = useState(false);
  const [activeVolume, setActiveVolume] = useState(0);

  // Touch & drag state for mobile carousel swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
  ];

  const volumes = [
    {
      volume: "Volume : 1",
      title: "Greener banking, better workplaces",
      subtitle: "How BFSI organizations ditched plastic water jars for a cleaner, safer alternative",
      desc: "Banking offices run 12/6, and so did their plastic water jar problem-spills, hygiene concerns, and hundreds of jars piling up every month. By switching to stainless steel alternatives, BFSI offices cut plastic waste significantly, reduced water contamination risks, and gave employees a cleaner, more professional workspace.",
      pdf: "/WAE_Success_Stories_Vol_I.pdf"
    },
    {
      volume: "Volume : 2",
      title: "Clean hydration for high performance it teams",
      subtitle: "How IT campuses moved away from plastic jars and never looked back.",
      desc: "Large IT campuses consume enormous volumes of water daily. Plastic jars meant constant logistics, leakage, and avoidable plastic waste. Switching to in-situ dispensers simplified operations, eliminated single-use plastic from common areas, and gave teams access to hygienic, temperature consistent water throughout the day.",
      pdf: "/WAE_Success_Stories_Vol_II.pdf"
    },
    {
      volume: "Volume : 3",
      title: "A Greener Stay for Every Guest",
      subtitle: "How hospitality brands elevated their sustainability commitment, one dispenser at a time",
      desc: "In hospitality, every detail shapes the guest experience. Replacing plastic water bottles with sleek and clean branded glass bottled helped hotels reduce plastic footprint, cut recurring supply costs, and signal a genuine commitment to sustainability. Guests noticed, Staff appreciated the ease. And the numbers backed it up with lower operational costs and stronger sustainability ratings while enhancing brand perception across every guest interaction.",
      pdf: "/WAE_Success_Stories_Vol_III.pdf"
    }
  ];

  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActiveVolume((prev) => (prev < volumes.length - 1 ? prev + 1 : prev));
    } else if (distance < -minSwipeDistance) {
      setActiveVolume((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActiveVolume((prev) => (prev < volumes.length - 1 ? prev + 1 : prev));
    } else if (distance < -minSwipeDistance) {
      setActiveVolume((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <main className="relative bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Dark background gradient: set to z-0 so it stays strictly underneath content */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          background: 'linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)',
          height: 'clamp(500px, 80vh, 875px)'
        }}
      />

      {/* HEADER */}
      <div className="relative z-20">
        <Header transparentBg />
      </div>

      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative z-10 flex flex-col items-center"
      >
        <div className={`${containerClass} pt-[106px] md:pt-[240px]`}>
          <div className="flex flex-col pb-[24px] md:pb-[2.63vw]">
            <div className="w-full md:w-1/2 md:pr-10">
              <h1
                className="text-[28px] md:text-[4.16vw] leading-[100%] md:leading-[130%] text-white align-middle"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0%",
                  margin: 0,
                }}
              >
                Our planet,<br />
                Our responsibility
              </h1>
            </div>
            <div className="w-full flex justify-end mt-[24px] md:mt-0">
              <div className="w-[53.74vw] md:w-[39.58vw] flex flex-col justify-start">
                <p
                  className="text-[8px] md:text-[1.11vw] leading-[9px] md:leading-[100%] text-[#AEAEAE] md:text-white mb-[9px] md:mb-[1.5vw] align-middle"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0%",
                  }}
                >
                  Sustainability is not a choice. It is a responsibility.
                </p>
                <p
                  className="text-[8px] md:text-[1.11vw] leading-[9px] md:leading-[130%] text-[#AEAEAE] md:text-white align-middle"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0%",
                  }}
                >
                  We help organizations reduce environmental impact, adopt ethical practices, and move towards regenerative business models that are better for business and better for the planet
                </p>
              </div>
            </div>
          </div>

          {/* Hero Video inserted into the layout */}
          <div className="w-full flex justify-center mt-[16px] md:mt-0 pb-[40px] md:pb-[4.72vw]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full object-cover bg-gray-900 aspect-[1226/506]"
            >
              <source src="/11977161_1920_1080_30fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* CLIENTS STRIP WITH MARQUEE */}
          <div className="flex items-center w-full border-t border-b border-white/20 py-[10px] md:py-[2.08vw]">
            <div className="shrink-0 flex items-center pr-[19px] md:pr-[4.09vw] border-r border-white/20">
              <span
                className="text-[8px] md:text-[1.25vw] leading-[100%] text-white align-middle"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0%",
                }}
              >
                Our Clients
              </span>
            </div>
            {/* Marquee constrained within this flex item */}
            <div className="marquee-container relative flex-1 overflow-hidden pl-[19px] md:pl-[4.16vw]">
              <div className="marquee-content flex items-center gap-[24px] md:gap-[5.55vw]">
                {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center justify-center w-[60px] md:w-[120px]">
                    <Image
                      src={logo}
                      alt={`Brand Logo`}
                      height={45}
                      width={120}
                      className="h-[18px] max-h-[18px] md:h-auto md:max-h-[45px] w-auto max-w-full grayscale brightness-0 invert object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY SECTION */}
      <section className="w-full relative z-10 pt-[40px] pb-[40px] md:pt-[6.38vw] md:pb-[6.38vw]">
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-[38.68vw] mb-6 md:mb-0">
              <h2
                className="text-[24px] md:text-[2.77vw] leading-[120%] text-white align-middle m-0"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Responsibility begins<br />
                with what we choose to change.
              </h2>
            </div>
            <div className="w-full md:w-[27.77vw] flex flex-col pt-0 md:pt-[0.5vw]">
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#AEAEAE] mb-4 md:mb-[1.38vw] align-middle"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                }}
              >
                The world is not running low on water. It is running out of patience for those who waste it.
              </p>
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#AEAEAE] align-middle"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                }}
              >
                Every bottle procured through a supply chain contributes to aquifer depletion, plastic waste, transport emissions, and growing business risk. What was once seen as convenience is now an environmental, operational, and reputational liability. WAE exists to replace that model with one that is cleaner, smarter, and built for the future.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-white/20"></div>

      {/* WHY IT MATTERS SECTION */}
      <section className="w-full relative z-10 pt-[40px] pb-[40px] md:pt-[6.38vw] md:pb-[6.38vw]">
        <div className={containerClass}>
          <div className="mb-6 md:mb-[5.13vw]">
            <h2
              className="text-[20px] md:text-[2.77vw] leading-[100%] text-white mb-2 md:mb-[1.18vw] align-middle"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
              }}
            >
              Why It Matters
            </h2>
            <p
              className="text-[11px] md:text-[0.97vw] leading-[100%] text-[#AEAEAE] align-middle"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
              }}
            >
              The challenge is no longer invisible.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left side image */}
            <div className="w-full md:w-[34.02vw] shrink-0 mb-6 md:mb-0">
              <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/697673e1-ba24-4763-4a6f-f2f4fadbda00/public"
                alt="Why it matters"
                className="w-full h-auto aspect-[490/545] object-cover"
              />
            </div>

            <div className="hidden md:block w-[4.58vw] shrink-0"></div>
            <div className="hidden md:block w-[1px] shrink-0 bg-white/20"></div>
            <div className="hidden md:block w-[4.58vw] shrink-0"></div>

            {/* Right side stats */}
            <div className="w-full md:w-[41.52vw] flex flex-col">
              {/* Stat 1 */}
              <div className="flex items-center justify-between border-b border-white/20 py-4 md:py-0 md:flex-1">
                <div className="flex-1">
                  <span
                    className="text-[36px] md:text-[4.86vw] text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    <CountUp value="50" />%
                  </span>
                </div>
                <div className="w-[55%] md:w-[19.44vw] shrink-0 pl-4 md:pl-[1.38vw]">
                  <h4
                    className="text-[14px] md:text-[1.25vw] text-white mb-1 md:mb-[0.69vw]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Water use
                  </h4>
                  <p
                    className="text-[10px] md:text-[1.04vw] text-white/50 leading-normal"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    50% rise in corporate water withdrawals globally
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center justify-between border-b border-white/20 py-4 md:py-0 md:flex-1">
                <div className="flex-1">
                  <span
                    className="text-[36px] md:text-[4.86vw] text-white whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    ₹<CountUp value="36" />L cr +
                  </span>
                </div>
                <div className="w-[55%] md:w-[19.44vw] shrink-0 pl-4 md:pl-[1.38vw]">
                  <h4
                    className="text-[14px] md:text-[1.25vw] text-white mb-1 md:mb-[0.69vw]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Financial exposure
                  </h4>
                  <p
                    className="text-[10px] md:text-[1.04vw] text-white/50 leading-normal"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    More than Rs 36 lakh crore in water-related financial risk reported by companies worldwide
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center justify-between border-b border-white/20 py-4 md:py-0 md:flex-1">
                <div className="flex-1">
                  <span
                    className="text-[36px] md:text-[4.86vw] text-white whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    ₹<CountUp value="8.5" />L cr
                  </span>
                </div>
                <div className="w-[55%] md:w-[19.44vw] shrink-0 pl-4 md:pl-[1.38vw]">
                  <h4
                    className="text-[14px] md:text-[1.25vw] text-white mb-1 md:mb-[0.69vw]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Revenue at risk
                  </h4>
                  <p
                    className="text-[10px] md:text-[1.04vw] text-white/50 leading-normal"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    Nearly Rs 8.5 lakh crore in business revenue currently at risk from water- related disruption
                  </p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center justify-between py-4 md:py-0 md:flex-1">
                <div className="flex-1">
                  <span
                    className="text-[36px] md:text-[4.86vw] text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    <CountUp value="67" />%
                  </span>
                </div>
                <div className="w-[55%] md:w-[19.44vw] shrink-0 pl-4 md:pl-[1.38vw]">
                  <h4
                    className="text-[14px] md:text-[1.25vw] text-white mb-1 md:mb-[0.69vw]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Global stress
                  </h4>
                  <p
                    className="text-[10px] md:text-[1.04vw] text-white/50 leading-normal"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    50% rise in corporate water withdrawals globally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-white/20"></div>

      {/* OUR RESPONSIBILITY SOLUTIONS */}
      <section className="w-full relative z-10 pt-[40px] pb-[40px] md:pt-[6.38vw] md:pb-[6.38vw] flex flex-col items-end">
        <div className={containerClass}>
          <div className="flex flex-col items-end w-full">
            <p
              className="text-[14px] md:text-[2.77vw] leading-[140%] md:leading-[130%] text-[#FFFFFF80] text-right align-middle mb-4 md:mb-[1.5vw] w-full"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
              }}
            >
              Our <span className="text-white">responsibility</span> is to create <span className="text-white">solutions</span> that protect natural resources while improving the quality of everyday life. That means rethinking wasteful systems, reducing dependence on extractive supply chains, and enabling <span className="text-white">organizations</span> to act with greater accountability.
            </p>
            <p
              className="text-[14px] md:text-[2.77vw] leading-[140%] md:leading-[130%] text-[#FFFFFF80] text-right align-middle w-full"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
              }}
            >
              Responsibility at <span className="text-white">WAE</span> is not a statement. It is built into the way we <span className="text-white">design</span>, <span className="text-white">deliver</span>, and <span className="text-white">scale solutions</span>.
            </p>
          </div>
        </div>
      </section>
      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-white/20"></div>

      {/* WE ARE HELPING CLIENTS */}
      <section className="w-full relative z-10 pt-[40px] pb-[40px] md:pt-[6.38vw] md:pb-[6.38vw]">
        <div className={containerClass}>
          <h2
            className="text-[20px] md:text-[2.77vw] leading-[120%] text-white align-middle mb-6 md:mb-[5vw]"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
            }}
          >
            We are helping clients
          </h2>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-[2.29vw]">
            <div className="flex flex-col border-l-0 md:border-l border-white/20 pl-0 md:pl-[1.52vw] pb-6 md:pb-0 border-b md:border-b-0 border-white/20">
              <div className="w-full aspect-[360/224] mb-3 md:mb-[1.38vw]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21779bba-89da-415d-af81-d015add0cc00/public" alt="Reduce Scope 3" className="w-full h-full object-cover" />
              </div>
              <h3
                className="text-[16px] md:text-[1.66vw] leading-[100%] text-white align-middle mb-2 md:mb-[0.83vw]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Reduce Scope 3 Emissions
              </h3>
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#AEAEAE] align-middle"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                The greatest emissions are often the ones hidden in everyday operations. Rethink how water is sourced, transported, and consumed to reduce indirect emissions where they matter most and turn sustainability into measurable business impact.
              </p>
            </div>

            <div className="flex flex-col border-l-0 md:border-l border-white/20 pl-0 md:pl-[1.52vw] pb-6 md:pb-0 border-b md:border-b-0 border-white/20">
              <div className="w-full aspect-[360/224] mb-3 md:mb-[1.38vw]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce4e4b96-60aa-4973-1d75-80165114a800/public" alt="Enable Plastic-Free Hydration" className="w-full h-full object-cover" />
              </div>
              <h3
                className="text-[16px] md:text-[1.66vw] leading-[100%] text-white align-middle mb-2 md:mb-[0.83vw]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Enable Plastic-Free Hydration
              </h3>
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#AEAEAE] align-middle"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Every refill is a choice against single-use plastic. Replace a disposable habit with a lasting solution that protects natural resources, keeps plastic out of the waste stream, and redefines the way people experience drinking water.
              </p>
            </div>

            <div className="flex flex-col border-l-0 md:border-l border-white/20 pl-0 md:pl-[1.52vw]">
              <div className="w-full aspect-[360/224] mb-3 md:mb-[1.38vw]">
                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f886425-f3b6-4b5a-de68-f75fd3459500/public" alt="Advance the Net-Zero Transition" className="w-full h-full object-cover" />
              </div>
              <h3
                className="text-[16px] md:text-[1.66vw] leading-[100%] text-white align-middle mb-2 md:mb-[0.83vw]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Advance the Net-Zero Transition
              </h3>
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#AEAEAE] align-middle"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Net-zero isn't achieved through a single initiative but through thousands of smarter decisions. Transform water infrastructure into a climate-positive asset that reduces environmental impact while supporting long-term sustainability and ESG ambitions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-white/20"></div>

      {/* TRANSFORMATIONS SECTION */}
      <section className="w-full relative z-10 pt-[40px] pb-[40px] md:pt-[6.38vw] md:pb-[6.38vw]">
        <div className={containerClass}>
          {/* DESKTOP VIEW */}
          <div className="hidden md:flex items-stretch">
            {/* Left Column */}
            <div className="w-[30%] border-r border-white/20 pr-[5.97vw]">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "2.77vw",
                color: "#FFFFFF",
                lineHeight: "130%",
                verticalAlign: "middle",
                marginBottom: "1.94vw"
              }}>Blue<br />Transformations</h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                color: "#AEAEAE",
                lineHeight: "1.3",
                verticalAlign: "middle"
              }}>The success stories that changed what sustainable hydration looks like.</p>
            </div>

            {/* Right Column Grid */}
            <div className="w-[70%] pl-[3.47vw]">
              <div className="grid grid-cols-2 gap-x-[6.38vw] gap-y-[4.51vw]">
                {/* Volume 1 */}
                <div className="flex flex-col justify-between aspect-[362/391] w-full">
                  <div>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", marginBottom: "0.86vw", display: "block", lineHeight: "110%", verticalAlign: "middle" }}>Volume : 1</span>
                    <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "1.66vw", color: "#FFFFFF", marginBottom: "0.97vw", lineHeight: "normal", verticalAlign: "middle" }}>Greener banking, better workplaces</h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "130%", marginBottom: "1.94vw", verticalAlign: "middle" }}>How BFSI organizations ditched plastic water jars for a cleaner, safer alternative</p>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "130%", marginBottom: "1.94vw", verticalAlign: "middle" }}>Banking offices run 12/6, and so did their plastic water jar problem-spills, hygiene concerns, and hundreds of jars piling up every month. By switching to stainless steel alternatives, BFSI offices cut plastic waste significantly, reduced water contamination risks, and gave employees a cleaner, more professional workspace.</p>
                  </div>
                  <HoverButton variant="inverted" href="/WAE_Success_Stories_Vol_I.pdf" download>
                    {(hovered) => (
                      <>
                        Download full story
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
                      </>
                    )}
                  </HoverButton>
                </div>

                {/* Image */}
                <div className="w-full aspect-[362/391]">
                  <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ed81f80c-aa41-49b4-922a-4899bc32d300/public" alt="Transformations" className="w-full h-full object-cover" />
                </div>

                {/* Volume 2 */}
                <div className="flex flex-col justify-between aspect-[362/391] w-full">
                  <div>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", marginBottom: "0.86vw", display: "block", lineHeight: "110%", verticalAlign: "middle" }}>Volume : 2</span>
                    <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "1.66vw", color: "#FFFFFF", marginBottom: "0.97vw", lineHeight: "normal", verticalAlign: "middle" }}>Clean hydration for high performance it teams</h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "130%", marginBottom: "1.94vw", verticalAlign: "middle" }}>How IT campuses moved away from plastic jars and never looked back.</p>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "130%", marginBottom: "1.94vw", verticalAlign: "middle" }}>Large IT campuses consume enormous volumes of water daily. Plastic jars meant constant logistics, leakage, and avoidable plastic waste. Switching to in-situ dispensers simplified operations, eliminated single-use plastic from common areas, and gave teams access to hygienic, temperature consistent water throughout the day.</p>
                  </div>
                  <HoverButton variant="inverted" href="/WAE_Success_Stories_Vol_II.pdf" download>
                    {(hovered) => (
                      <>
                        Download full story
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
                      </>
                    )}
                  </HoverButton>
                </div>

                {/* Volume 3 */}
                <div className="flex flex-col justify-between aspect-[362/391] w-full">
                  <div>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", marginBottom: "0.86vw", display: "block", lineHeight: "110%", verticalAlign: "middle" }}>Volume : 3</span>
                    <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "1.66vw", color: "#FFFFFF", marginBottom: "0.97vw", lineHeight: "normal", verticalAlign: "middle" }}>A Greener Stay for Every Guest</h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "130%", marginBottom: "1.94vw", verticalAlign: "middle" }}>How hospitality brands elevated their sustainability commitment, one dispenser at a time</p>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "0.97vw", color: "#AEAEAE", lineHeight: "130%", marginBottom: "1.94vw", verticalAlign: "middle" }}>In hospitality, every detail shapes the guest experience. Replacing plastic water bottles with sleek and clean branded glass bottled helped hotels reduce plastic footprint, cut recurring supply costs, and signal a genuine commitment to sustainability. Guests noticed, Staff appreciated the ease. And the numbers backed it up with lower operational costs and stronger sustainability ratings while enhancing brand perception across every guest interaction.</p>
                  </div>
                  <HoverButton variant="inverted" href="/WAE_Success_Stories_Vol_III.pdf" download>
                    {(hovered) => (
                      <>
                        Download full story
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
                      </>
                    )}
                  </HoverButton>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW */}
          <div className="block md:hidden">
            {/* Top Header: Title on Left, Image on Right */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="w-[55%] flex flex-col justify-start">
                <h2
                  className="text-[20px] text-white leading-tight mb-2"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Blue<br />Transformations
                </h2>
                <p
                  className="text-[10px] text-[#AEAEAE] leading-[130%]"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  The success stories that changed what sustainable hydration looks like.
                </p>
              </div>
              <div className="w-[42%] aspect-[362/391] shrink-0">
                <img
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ed81f80c-aa41-49b4-922a-4899bc32d300/public"
                  alt="Transformations"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Swipable Volume Carousel Track */}
            <div
              className="w-full overflow-hidden select-none touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeVolume * 100}%)` }}
              >
                {volumes.map((vol, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 flex flex-col pr-1">
                    <span
                      className="text-[10px] text-[#AEAEAE] mb-2 block"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {vol.volume}
                    </span>
                    <h3
                      className="text-[16px] text-white mb-2 leading-snug"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {vol.title}
                    </h3>
                    <p
                      className="text-[11px] text-[#AEAEAE] leading-[130%] mb-3"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {vol.subtitle}
                    </p>
                    <p
                      className="text-[11px] text-[#AEAEAE] leading-[130%] mb-4"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {vol.desc}
                    </p>
                    <div className="mt-1">
                      <HoverButton variant="inverted" href={vol.pdf} download>
                        {(hovered) => (
                          <>
                            Download full story
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
                          </>
                        )}
                      </HoverButton>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider line before dots */}
              <div className="border-b border-white/20 mt-6 mb-4"></div>

              {/* Carousel pagination indicators matching Screenshot 3 */}
              <div className="flex items-center justify-center gap-1.5">
                {volumes.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveVolume(idx)}
                    className={`transition-all duration-300 cursor-pointer ${
                      activeVolume === idx
                        ? "w-5 h-1 bg-white rounded-full"
                        : "w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/70"
                    }`}
                    aria-label={`Go to volume ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="hidden md:block relative z-10 mx-[7.5vw] border-b border-white/20"></div>

      {/* EARTH SECTION */}
      <section className="w-full relative z-10 pt-[40px] pb-[40px] md:pt-[6.38vw] md:pb-[6.38vw]">
        <div className={containerClass}>
          <div className="w-full h-[180px] sm:h-[260px] md:h-[500px] mb-6 md:mb-[5vw]">
            <img
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/048c10f8-fc18-43ed-c62c-8658de2acf00/public"
              alt="Earth, Our Only Shareholder"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h2
                className="text-[24px] md:text-[2.77vw] leading-[110%] md:leading-[100%] text-white align-middle"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                }}
              >
                Earth, Our<br />Only Shareholder
              </h2>
            </div>
            <div className="w-full md:w-[35%] flex flex-col items-start">
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#FFFFFF80] align-middle mb-3 md:mb-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                }}
              >
                We're excited to share the progress we have made, reflecting our commitment to sustainability.
              </p>
              <p
                className="text-[11px] md:text-[0.97vw] leading-[140%] md:leading-[130%] text-[#FFFFFF80] align-middle mb-6 md:mb-[4.3vw]"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                }}
              >
                Explore them to see how we're making a positive impact on the environment, society & governance.
              </p>
              <HoverButton variant="inverted" onClick={() => setIsEnquirePopupOpen(true)}>
                {(hovered) => (
                  <>
                    Download full story
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
                  </>
                )}
              </HoverButton>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="relative z-10">
        <Footer />
      </div>

      <EnquireNowPopup
        isOpen={isEnquirePopupOpen}
        onClose={() => setIsEnquirePopupOpen(false)}
        pageLink="/sustainability"
        downloadUrl="/Work in Progress Report 2026 1.pdf"
      />

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
