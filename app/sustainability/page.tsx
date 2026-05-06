"use client"

import type { FC, ReactNode } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, animate } from "framer-motion"
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
  variant?: "default" | "inverted";
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, variant = "default" }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  // Define styles based on variant
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
        // textTransform: "uppercase",
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

  // Use a simple anchor tag if it's an internal page link, Link component for Next.js routes
  return href ? (
    href.startsWith('#') ? ( // Check if it's an anchor link
      <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
    ) : ( // Assume it's a Next.js route link
      <Link href={href} className="contents">{buttonContent}</Link>
    )
  ) : buttonContent;
};



/**
 * Helping Clients Section: A carousel with hover-to-expand cards
 */
const HelpingClientsSection: FC = () => {
  // First image remains expanded by default
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sharedText = {
    beforeHover: "Advanced filtration systems deliver certified, high-quality drinking water exactly where it’s needed—eliminating dependence on bottled supply chains... ",
    afterHover: "Advanced filtration systems deliver certified, high-quality drinking water exactly where it’s needed—eliminating dependence on bottled supply chains. This ensures consistent quality, reduces operational complexity, and brings control back to the point of consumption."
  };

  const cards = [
    {
      overlayTitle: "Purify at the source of use",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f7825f8c-a05f-4ad0-60e7-e52b3f9b1500/public",
    },
    {
      overlayTitle: "Cut costs by up to 90%",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/14d5fde0-1ebe-48a0-d66a-c6817e444100/public",
    },
    {
      overlayTitle: "Remove the footprint entirely",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c695e08f-c86b-4c76-d91d-8efb8f950700/public",
    },
  ];

  const handleNext = () => {
    if (currentIndex < 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setHoveredIndex(2);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setHoveredIndex(0);
    }
  };

  return (
    <section
      className="w-full bg-[#f2f2f2] overflow-hidden"
      style={{ padding: "120px 9.72%" }}
    >
      <div className="flex justify-between items-center mb-20">
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: "40px",
          lineHeight: "120%",
          letterSpacing: "0%",
          margin: 0
        }}>
          We are helping clients
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.3 : 1, cursor: currentIndex === 0 ? "default" : "pointer" }}
            className="w-[44px] h-[44px] border border-[#00000033] flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === 1}
            style={{ opacity: currentIndex === 1 ? 0.3 : 1, cursor: currentIndex === 1 ? "default" : "pointer" }}
            className="w-[44px] h-[44px] border border-[#00000033] flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative" style={{ minHeight: "640px" }}>
        <motion.div
          className="flex"
          style={{ gap: "2.77vw" }}
          animate={{ x: `calc(-${currentIndex * (25 + 2.77)}vw)` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className="flex-shrink-0"
                style={{ width: isHovered ? (index === cards.length - 1 ? "52.79vw" : "45.83vw") : "25vw" }}
                animate={{ width: isHovered ? (index === cards.length - 1 ? "52.79vw" : "45.83vw") : "25vw" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  if (index === 2) {
                    setCurrentIndex(1);
                  } else if (index === 0) {
                    setCurrentIndex(0);
                  }
                }}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden group cursor-pointer"
                  style={{ height: "461px" }}
                >
                  <Image
                    src={card.image}
                    alt={card.overlayTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-14 left-10 right-10">
                    <h3 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "32px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#FFFFFF",
                      margin: 0
                    }}>
                      {card.overlayTitle}
                    </h3>
                  </div>
                </div>

                {/* Textbox below */}
                <div style={{ marginTop: "32px", maxWidth: isHovered ? "41.52vw" : "none" }}>
                  <motion.div
                    animate={{ height: isHovered ? "auto" : "80px" }}
                  >
                    <p style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "130%",
                      letterSpacing: "0%",
                      color: "#00000099",
                      margin: 0
                    }}>
                      {isHovered ? (
                        sharedText.afterHover
                      ) : (
                        <>
                          {sharedText.beforeHover}
                          <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 500,
                            fontSize: "18px",
                            lineHeight: "100%",
                            color: "#00000099"
                          }}>
                            read more
                          </span>
                        </>
                      )}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div style={{ height: "60px" }} />

      <div className="flex">
        <HoverButton href="/this-is-us">
          {(hovered) => (
            <>
              <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
              }}>
                Know More
              </span>
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
                style={{ transform: hovered ? "translate(2px, -2px)" : "none" }}
              >
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </HoverButton>
      </div>
    </section>
  );
};

/**
 * Impact Section: Data cards with results
 */
const ImpactSection: FC = () => {
  const impactData = [
    { number: "1,012,120.25", label: <>Tonnes CO<sub>2</sub> Emissions Saved</> },
    { number: "12,185.43", label: "Million Gallons Water Saved" },
    { number: "22,253.65", label: "Tonnes Plastic Removed" },
  ];

  return (
    <section className="w-full bg-white" style={{ padding: "120px 9.72%" }}>
      <div>
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: "40px",
          lineHeight: "120%",
          letterSpacing: "0%",
          margin: 0,
        }}>
          Real Impact. Measurable Change.
        </h2>
        <div style={{ height: "12px" }} />
        <p style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#000000",
          margin: 0
        }}>
          Here’s a snapshot of the results we’ve helped our clients achieve.
        </p>
      </div>

      <div style={{ height: "60px" }} />

      <div className="flex" style={{ gap: "4.166vw" }}>
        {impactData.map((item, index) => (
          <div
            key={index}
            className="bg-[#f2f2f2] text-black flex flex-col justify-between items-start"
            style={{
              width: "24.07vw",
              height: "220px",
              position: "relative",
              padding: "20px 24px"
            }}
          >
            {/* Vertical Line */}
            <div
              style={{
                position: "absolute",
                left: "24px",
                top: "20px",
                bottom: "20px",
                width: "1px",
                backgroundColor: "#000"
              }}
            />

            <div style={{ marginLeft: "12px" }}>
              <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 300,
                fontSize: "40px",
                lineHeight: "110%",
                letterSpacing: "0%",
                color: "#000"
              }}>
                {item.number}
              </span>
            </div>

            <div style={{ marginLeft: "12px" }}>
              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000",
                margin: 0
              }}>
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * Sustainable Success Section: Case studies and stories
 */
const SustainableSuccessSection: FC = () => {
  const volumes = [
    {
      vol: "Volume 1:",
      title: "Greener Banking, Better Workplaces",
      desc: "How BFSI organizations ditched plastic water jars for a cleaner, safer alternative",
      href: "/sustainability-bfsi"
    },
    {
      vol: "Volume 2:",
      title: "Clean Hydration for High-Performance IT Teams",
      desc: "How IT campuses moved away from plastic jars and never looked back",
      href: "/sustainability-it"
    },
    {
      vol: "Volume 3:",
      title: "A Greener Stay for Every Guest",
      desc: "How hospitality brands elevated their sustainability commitment, one dispenser at a time",
      href: "#"
    }
  ];

  return (
    <section className="w-full bg-[#f2f2f2]" style={{ padding: "120px 9.72%" }}>
      <h2 style={{
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "40px",
        lineHeight: "120%",
        letterSpacing: "0%",
        margin: 0,
        marginBottom: "80px"
      }}>
        From idea to sustainable success
      </h2>

      <div className="flex justify-between items-start">
        {/* Left Column */}
        <div style={{ width: "41.11vw", height: "707px" }}>
          <img
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/973fa860-5492-4195-d819-b12b854f6c00/public"
            alt="Sustainable success"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column */}
        <div
          className="flex flex-col justify-between"
          style={{ width: "37.361vw", height: "710px" }}
        >
          {volumes.map((item, index) => (
            <div key={index} className="w-full">
              <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                color: "#00000099",
                display: "block",
                marginBottom: "36px"
              }}>
                {item.vol}
              </span>

              <h3 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                margin: 0,
                marginBottom: "16px"
              }}>
                {item.title}
              </h3>

              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "110%",
                color: "#00000099",
                margin: 0,
                marginBottom: "40px"
              }}>
                {item.desc}
              </p>

              <Link href={item.href}>
                <button className="group flex items-center gap-2 border border-[#00000033] px-4 py-2 hover:bg-black hover:text-white transition-all duration-300">
                  <span style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}>
                    Read the full story
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Link>

              {index < volumes.length - 1 && (
                <div style={{ paddingBottom: "0px", marginTop: "24px" }}>
                  <div style={{ borderBottom: "1px solid #00000033" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* THREE COMMITMENTS HEADER */}
      <div style={{ height: "120px" }} />
      <div className="flex justify-center text-center">
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: "40px",
          lineHeight: "120%",
          letterSpacing: "0%",
          margin: 0,
          whiteSpace: "nowrap",
        }}>
          Three commitments WAE helps your organisation make
        </h2>
      </div>
      <div style={{ height: "60px" }} />

      {/* COMMITMENTS GRID */}
      <CommitmentsGrid />
    </section>
  );
};

/**
 * Commitments Grid: Hoverable images with sliding text
 */
const CommitmentsGrid: FC = () => {
  const commitments = [
    {
      title: "Water Stewardship",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/22a17004-59d1-4bc3-1afc-421343a5fb00/public",
      desc: "The global economy faces resource reckoning. WAE equips organisations to move from passive observers to active participants - developing hydration infrastructure that aligns with circular-economy principles and long-term resource resilience."
    },
    {
      title: "Water Neutrality",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1901bbae-c22a-402d-6191-7dae53a74f00/public",
      desc: "Corporate water withdrawals are rising at the same time the crisis is deepening. WAE replaces bottled water programmes with sustainable hydration solutions that make organisations water-positive - reducing their global water footprint in a measurable, reportable way."
    },
    {
      title: "Water Restoration",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/87d6d3fa-ec46-4666-7785-e1edb92d6400/public",
      desc: "By 2030, an estimated 1.8 billion people will live under conditions of acute water scarcity. WAE's Water Restoration Programme goes beyond neutrality - helping organisations actively balance and offset their water footprint through targeted strategies and independently verified outcomes."
    }
  ];

  return (
    <div
      className="flex"
      style={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw"
      }}
    >
      {commitments.map((item, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden"
          style={{ width: "33.333%", height: "448px" }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          {/* Default Dark Overlay for readability */}
          {/* Precise Dark Gradient Overlay */}
          <div
            className="absolute left-0 right-0 bottom-0 transition-all duration-1000 ease-in-out h-[102px] group-hover:h-[212px]"
            style={{
              background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.779088) 40.38%, #000000 100%)",
              zIndex: 1
            }}
          />

          {/* Sliding Text Container */}
          <div
            className="absolute left-10 bottom-10 right-10 transition-transform duration-1000 ease-in-out translate-y-[calc(100%-20px)] group-hover:translate-y-0"
            style={{ zIndex: 10 }}
          >
            <h4 style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "100%",
              color: "#FFF",
              margin: 0,
              marginBottom: "24px"
            }}>
              {item.title}
            </h4>
            <p
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "130%",
                color: "#FFF",
                margin: 0
              }}
            >
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Water Visual Section: Full-width background image section
 */
const WaterVisualSection: FC = () => {
  return (
    <section
      style={{
        width: "100vw",
        height: "650px",
        backgroundImage: "url('https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ad6f4a7c-2cd4-49d6-fe20-30eb48df2c00/public')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw"
      }}
    >
      {/* Black Overlay from Left to Right */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "45.138vw",
          background: "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.779088) 40.38%, rgba(0, 0, 0, 0) 100%)",
          zIndex: 1
        }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-start items-start"
        style={{ padding: "120px 9.72%", zIndex: 2 }}
      >
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: "40px",
          lineHeight: "120%",
          letterSpacing: "0%",
          color: "#FFFFFF",
          margin: 0
        }}>
          Earth, Our Only Shareholder
        </h2>

        <div style={{ height: "138px" }} />

        <div style={{ width: "40.83vw" }}>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "120%",
            letterSpacing: "0%",
            color: "#FFFFFF",
            margin: 0
          }}>
            We&apos;re excited to share the progress we have made, reflecting our commitment to sustainability.
          </p>
          <div style={{ height: "24px" }} />
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "120%",
            letterSpacing: "0%",
            color: "#FFFFFF",
            margin: 0
          }}>
            Explore them to see how we&apos;re making a positive impact on the environment, society &amp; governance.
          </p>
        </div>

        <div style={{ height: "60px" }} />

        <button className="group relative border border-white text-white px-6 py-3 transition-colors duration-300 hover:bg-white hover:text-black flex items-center gap-2">
          <span style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            textTransform: "uppercase"
          }}>
            DOWNLOAD REPORT
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};

/**
 * Compliance Requirement Section: Data cards with hover effects
 */
const ComplianceCard: FC<{
  iconDefault: string,
  iconHover: string,
  iconSize: number,
  children: (hovered: boolean) => ReactNode
}> = ({ iconDefault, iconHover, iconSize, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white p-8 flex flex-col justify-between transition-colors duration-500 cursor-pointer"
      style={{
        backgroundColor: hovered ? "#000000" : "#FFFFFF",
        height: "100%"
      }}
    >
      <div style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
        <img
          src={hovered ? iconHover : iconDefault}
          alt="icon"
          className="w-full h-full object-contain transition-all duration-500"
        />
      </div>

      <div style={{
        marginTop: "40px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "125%",
        color: hovered ? "#FFFFFF" : "#00000099",
        transition: "color 0.5s ease"
      }}>
        {children(hovered)}
      </div>
    </div>
  );
};

const ComplianceRequirementSection: FC = () => {
  const Highlight: FC<{ hovered: boolean, children: ReactNode }> = ({ hovered, children }) => (
    <span style={{
      fontWeight: 500,
      color: hovered ? "#FFF" : "#000",
      transition: "color 0.5s ease"
    }}>
      {children}
    </span>
  );

  return (
    <section className="w-full bg-[#f2f2f2]" style={{ padding: "120px 9.72%" }}>
      <div
        className="flex"
        style={{ gap: "2.8372vw", alignItems: "flex-start" }}
      >
        {/* Left Column */}
        <div style={{ width: "29.5138vw" }} className="flex flex-col">
          <h3 style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "100%",
            color: "#00000099",
            margin: 0,
            marginBottom: "40px"
          }}>
            Water stewardship is no longer a values statement. It is a compliance requirement.
          </h3>

          <div style={{ height: "461px" }}>
            <ComplianceCard
              iconSize={100}
              iconDefault="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c8568be0-803f-41b4-5da9-3aa124b55400/public"
              iconHover="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a9b742b7-ac33-464c-a85c-f03844b51400/public"
            >
              {(hovered) => (
                <div style={{ marginTop: "auto" }}>
                  <Highlight hovered={hovered}>6,000+</Highlight> companies have committed to science-based water targets <Highlight hovered={hovered}>(SBTN, 2024)</Highlight>
                </div>
              )}
            </ComplianceCard>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{ width: "calc(22.708vw * 2 + 2.8372vw)" }}
          className="flex flex-col"
        >
          {/* Top Cards Row */}
          <div className="flex" style={{ gap: "2.8372vw" }}>
            <div style={{ width: "22.708vw", height: "250px" }}>
              <ComplianceCard
                iconSize={69}
                iconDefault="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3ff36ad7-4ef3-4e02-2660-43fc854e0a00/public"
                iconHover="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5a7a3ae5-6631-4631-43a6-0fcca8326900/public"
              >
                {(hovered) => (
                  <>The CEO Water Mandate nearly doubled in size in 2024 - now endorsed by close to <Highlight hovered={hovered}>400 organisations</Highlight></>
                )}
              </ComplianceCard>
            </div>
            <div style={{ width: "22.708vw", height: "250px" }}>
              <ComplianceCard
                iconSize={69}
                iconDefault="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a7ce22a4-067c-4131-fefd-60f71376af00/public"
                iconHover="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/baf9f1bb-ac8e-45c9-bd0e-d1927ae3ae00/public"
              >
                {(hovered) => (
                  <><Highlight hovered={hovered}>CSRD, GRI 303, TNFD and CDP</Highlight> Water Security all now mandate detailed water risk disclosure</>
                )}
              </ComplianceCard>
            </div>
          </div>

          <div style={{ height: "40px" }} />

          {/* Card 4 (Wide) */}
          <div style={{ width: "100%", height: "200px" }}>
            <ComplianceCard
              iconSize={69}
              iconDefault="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21589712-bd38-43ad-8774-ddfd29334a00/public"
              iconHover="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a770e5ff-88cc-4417-c2cd-83208f65f100/public"
            >
              {(hovered) => (
                <><Highlight hovered={hovered}>34%</Highlight> of consumers expect the companies they engage with to prioritise water conservation <Highlight hovered={hovered}>(PwC, 2024)</Highlight></>
              )}
            </ComplianceCard>
          </div>

          <div style={{ height: "20px" }} />

          {/* Footer Text */}
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "100%",
            color: "#00000099",
            margin: 0,
            width: "100%"
          }}>
            The organisations moving now are building structural advantage. Those waiting are accumulating liability.
          </p>
        </div>
      </div>
    </section>
  );
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
      // Parse the number and surrounding characters
      const match = value.match(/([\d,.]+)/);
      if (!match) return;

      const numStr = match[0].replace(/,/g, "");
      const target = parseFloat(numStr);
      const prefix = value.substring(0, value.indexOf(match[0]));
      const suffix = value.substring(value.indexOf(match[0]) + match[0].length);

      const controls = animate(0, target, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // premium cubic-bezier
        onUpdate: (latest) => {
          setCount(latest);
        },
      });

      return () => controls.stop();
    }
  }, [value, duration, isInView]);

  // Format the number part (keep decimals if original has them)
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

/**
 * This Leads To Section: Grid of images and alarming statistics
 */
const ThisLeadsToSection: FC = () => {
  const stats = [
    { num: "50%", text: "rise in corporate water withdrawals globally, even as the crisis deepens" },
    { num: "$425B+", text: "in water-related financial risk reported by companies worldwide" },
    { num: "$100B", text: "in business revenue currently at risk from water-related disruption (CDP, 2023)" },
    { num: "67%", text: "people worldwide will live in water-stressed regions by 2025" },
  ];

  const totalHeight = 522; // 225px (R1) + 36px (gap) + 261px (R2)

  return (
    <section className="w-full bg-[#f2f2f2]" style={{ padding: "120px 9.72%" }}>
      <h2 style={{
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "32px",
        lineHeight: "120%",
        margin: 0,
        marginBottom: "60px"
      }}>
        This leads to..
      </h2>

      <div className="flex justify-between items-start gap-[8.33vw]">
        {/* Left Column: Image Grid */}
        <div style={{ width: "33.75vw" }}>
          <div className="flex" style={{ height: "225px", gap: "2.5vw", marginBottom: "36px" }}>
            <div style={{ width: "15.625vw", height: "225px" }} className="relative">
              <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42a74203-aa22-41c1-7642-aa46d8543a00/public"
                alt="Tap water"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{ width: "15.625vw", height: "225px" }} className="relative">
              <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b00473f9-2a5b-435f-a80c-50b36ce10600/public"
                alt="Pouring water"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div style={{ width: "33.75vw", height: "261px" }}>
            <img
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/16f55209-2340-4b05-cd86-4ee6a92bbb00/public"
              alt="Plastic bottles"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Statistics */}
        <div style={{ width: "41.3149vw", height: `${totalHeight}px` }} className="flex flex-col justify-between">
          {stats.map((stat, index) => (
            <div key={index} className="w-full">
              <div
                className="flex items-center justify-between"
                style={{
                  borderTop: index === 0 ? "none" : "1px solid #0000001a",
                  paddingTop: index === 0 ? "0" : "20px",
                  paddingBottom: "20px"
                }}
              >
                <span style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 300,
                  fontSize: "70px",
                  lineHeight: "110%",
                  color: "#000000",
                  width: "250px",
                  verticalAlign: "middle"
                }}>
                  <CountUp value={stat.num} />
                </span>
                <span style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "100%",
                  color: "#00000099",
                  flex: 1,
                  maxWidth: "280px",
                  verticalAlign: "middle"
                }}>
                  {stat.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: "60px" }} />

      <p style={{
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "140%",
        color: "#000000",
        margin: 0
      }}>
        Every bottle procured through your supply chain is a direct contribution to aquifer depletion.<br />
        The exposure is financial, reputational, and regulatory - and it is <strong style={{ fontWeight: 600 }}>growing.</strong>
      </p>
    </section>
  );
};

/**
 * Connect Section: Final CTA section before footer
 */
const ConnectSection: FC = () => {
  return (
    <section
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        padding: "120px 9.72%"
      }}
    >
      <div className="flex justify-between items-start">
        {/* Left Column */}
        <div style={{ maxWidth: "480px" }}>
          <h2 style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "120%",
            margin: 0
          }}>
            Connect with us for a brighter tomorrow
          </h2>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-start">
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "120%",
            margin: 0
          }}>
            Let&apos;s create meaningful, measurable impact together.
          </p>

          <div style={{ height: "24px" }} />

          <button className="group border border-white px-6 py-3 transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2">
            <span style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              // textTransform: "uppercase"
            }}>
              Get in touch
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  // State variables
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [headerHeight, setHeaderHeight] = useState(0)
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
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers3" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ]
  const lineCount = Math.min(productsItems.length, blueprintItems.length) // Note: lineCount is calculated but not used

  // Brand logos for marquee
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
    <main className="relative pb-[40px]">
      {/* HEADER (Not Fixed in this version) */}
      {/* The div with inline styles here seems unnecessary if not fixed */}
      <div> {/* Consider removing this outer div or making it relative/static */}
        <header ref={headerRef} className={`w-full bg-white relative z-10 pb-5`}> {/* Apply containerClass inside header content div */}
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
                  color: "#00000066",
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
                  color: "#00000066",
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
      <section
        id="hero"
        className="w-screen relative bg-white overflow-hidden"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        {/* Background video */}
        <video
          src="/sustainability-hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text overlay — 59px above bottom, left margin 9.72% */}
        <div
          className="absolute"
          style={{ bottom: "59px", left: "9.72%" }}
        >
          {/* Headline */}
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "47px",
            lineHeight: "110%",
            letterSpacing: "0%",
            color: "#FFFFFF",
            margin: 0,
            marginBottom: "20px",
          }}>
            OUR PLANET, OUR RESPONSIBILITY
          </p>

          {/* Scroll for more row */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#FFFFFF",
            }}>
              We believe sustainability isn’t a choice, it’s a responsibility. Together, let’s create a future where businesses thrive while actively protecting our planet.
            </span>
          </div>
        </div>
      </section>

      {/* BRAND LOGO MARQUEE SECTION */}
      <section
        className="w-full bg-[#f2f2f2] overflow-hidden"
        style={{ padding: "80px 9.72%" }}
      >
        <div className="marquee-container relative">
          <div className="marquee-content flex items-center" style={{ gap: "6.94vw" }}>
            {[...brandLogos, ...brandLogos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo}
                  alt={`Brand Logo ${index % 9 + 1}`}
                  height={44}
                  width={100} // width will be adjusted by image-rendering and css but we need a baseline for Next.js Image
                  className="h-[44px] w-auto max-w-none grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE ORGANISATION SECTION */}
      <section
        className="w-full bg-white"
        style={{ padding: "120px 9.72%" }}
      >
        <div className="flex justify-between items-start">
          {/* Left Column */}
          <div style={{ width: "20.83vw" }}>
            <h2 style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "uppercase",
              margin: 0
            }}>
              About the organisation
            </h2>
          </div>

          {/* Middle Column */}
          <div style={{ width: "20.83vw" }}>
            <p style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "120%",
              letterSpacing: "0%",
              color: "#00000099",
              margin: 0
            }}>
              We are a sustainability-driven activist firm enabling organisations to reduce their environmental footprint, embed ethical practices, and transition towards regenerative business models.
            </p>
          </div>

          {/* Right Column */}
          <div style={{ width: "20.83vw" }}>
            <p style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "120%",
              letterSpacing: "0%",
              color: "#00000099",
              margin: 0
            }}>
              The world is not running low on water. It is running out of patience for those who waste it.
            </p>
          </div>
        </div>
      </section>



      {/* THIS LEADS TO SECTION */}
      <ThisLeadsToSection />

      {/* ENTERPRISE SYSTEMS SECTION */}
      <section
        className="w-full bg-[#000000] text-white"
        style={{ padding: "120px 9.72%" }}
      >
        <div>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "120%",
            letterSpacing: "0%",
            margin: 0
          }}>
            WAE builds enterprise-grade, point-of-use water purification systems that make bottled water redundant - commercially, operationally, and environmentally.
          </p>

          <div style={{ height: "24px" }} />

          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "120%",
            letterSpacing: "0%",
            margin: 0
          }}>
            The model is simple: deliver pure, healthy water at the point of consumption, eliminate the supply chain that causes harm, and do it at one-tenth the cost of bottled water.
          </p>

          <div style={{ height: "60px" }} />

          <HoverButton href="/our-portfolio" variant="inverted">
            {(hovered) => (
              <>
                <span style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                }}>
                  Know More
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </HoverButton>
        </div>
      </section>

      {/* HELPING CLIENTS SECTION */}
      <HelpingClientsSection />

      {/* IMPACT SECTION */}
      <ImpactSection />

      {/* SUSTAINABLE SUCCESS SECTION */}
      <SustainableSuccessSection />

      {/* WATER VISUAL SECTION */}
      <WaterVisualSection />

      {/* COMPLIANCE REQUIREMENT SECTION */}
      <ComplianceRequirementSection />

      {/* CONNECT SECTION */}
      <ConnectSection />

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

      {/* Global Styles */}
      <style jsx global>{`
        html {
          /* scroll-behavior: smooth; */
        }
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
    </main>
  )
}