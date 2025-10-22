"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from 'next/link';
import JobApplicationForm from "@/components/job-application-form";

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  className?: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2 border border-[#00000066] text-black px-4 py-2 rounded-md transition-colors hover:bg-black hover:text-white ${className}`}
    >
      {children(isHovered)}
    </button>
  );
};

// Shared container class for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

export default function Home() {
  // State variables
  const headerRef = useRef<HTMLDivElement>(null)

  // State for controlling tagline visibility on scroll
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)
  
  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Tagline lines (split into words)
  const taglineLine1 = "To lead the way in sustainability"
  const taglineLine2 = "ahead of the rest."
  const taglineWords1 = taglineLine1.split(" ")
  const taglineWords2 = taglineLine2.split(" ")

  // Arrays for menu items
  const productsItems = [
    "This is Us",
    "Our Portfolio",
    "Reimagine Work",
  ]
  const blueprintItems = ["Sustainability", "The Activist Co.", "Blog"]
  const lineCount = Math.min(productsItems.length, blueprintItems.length)

  return (
    <main className="relative">
      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
      <header ref={headerRef} className="w-full relative z-10 mb-[120px]">
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "130%",
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

  <Link href="/" passHref>

    <Image

      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"

      alt="WAE Logo"

      width={78}

      height={82}

      style={{ cursor: 'pointer' }}

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
                  lineHeight: "130%",
                  color: "#000000",
                }}
              >
                20.5937° N
                <br />
                78.9629° E
              </div>

              {/* Tagline Animation */}
              {/* <div className="flex flex-col items-start">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={taglineVisible ? "visible" : "hidden"}
                  className="flex flex-row justify-center whitespace-nowrap"
                >
                  {taglineWords1.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      className="mr-1"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "125%",
                        color: "#000",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={taglineVisible ? "visible" : "hidden"}
                  className="flex flex-row justify-center whitespace-nowrap"
                >
                  {taglineWords2.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      className="mr-1"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "125%",
                        color: "#000",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </div> */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "130%",
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
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
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
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Job Description Heading */}
      <div className={containerClass}>
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "32px",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginBottom: "80px",
          }}
        >
          Job Description: Manager/Sr. Manager - Marketing Communications (MarComm) 
        </h2>
      </div>

      {/* POSITION OVERVIEW Section */}
      <div className={containerClass} style={{ marginBottom: "80px" }}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_53%] gap-x-16">
          {/* Left Column - Section Title */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
              }}
            >
              Position Overview
            </h3>
          </div>
          
          {/* Right Column - Content */}
          <div>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                marginBottom: "24px",
              }}
            >
              We are seeking a dynamic and experienced Manager/Sr. Manager - Marketing Communications to lead our MarComm team. The ideal candidate will be responsible for creating and implementing effective communication strategies to enhance brand awareness and drive engagement across multiple channels. This role requires a strategic thinker with a proven track record in managing integrated marketing campaigns, content creation (including brochures and presentations), brand positioning, and vendor/stakeholder management. The position is based in Noida.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-black px-6 py-3 transition-all duration-300 hover:bg-black hover:text-white"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0%",
              }}
            >
              Apply Now&nbsp;&nbsp;<span style={{fontWeight: 700 as React.CSSProperties['fontWeight']}}>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* KEY RESPONSIBILITIES Section */}
      <div className={containerClass} style={{ marginBottom: "80px" }}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_53%] gap-x-16">
          {/* Left Column - Section Title */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
              }}
            >
              Key Responsibilities:
            </h3>
          </div>
          
          {/* Right Column - Content */}
          <div>
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px", marginBottom: "16px" }}>
          {/* 1. STRATEGIC PLANNING & EXECUTION */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Strategic Planning & Execution:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Develop and execute comprehensive MarComm strategies aligned with company objectives and brand vision.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Plan, design, and oversee the creation of marketing materials, including digital, print, social, and video content.
              </li>
            </ul>
          </li>

          {/* 2. CONTENT DEVELOPMENT */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Content Development:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Lead the creation of high-quality content for brochures, presentations, white papers, blogs, and case studies.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Ensure consistency of voice, messaging, and branding across all communication channels.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Collaborate with internal teams to gather insights and translate technical information into compelling narratives.
              </li>
            </ul>
          </li>

          {/* 3. BRAND MANAGEMENT */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Brand Management:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Manage brand positioning and ensure all communications support the overall brand identity, values, and vision.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Monitor brand perception and implement strategies to strengthen brand equity and reputation.
              </li>
            </ul>
          </li>

          {/* 4. VENDOR & STAKEHOLDER ENGAGEMENT */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Vendor & Stakeholder Engagement:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Identify, onboard, and manage relationships with external agencies, freelancers, and vendors for creative, design, and production needs.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Negotiate contracts and ensure timely delivery of high-quality outputs within budget.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Collaborate with internal stakeholders (sales, product, leadership) to align messaging and support business objectives.
              </li>
            </ul>
          </li>

          {/* 5. DIGITAL MARKETING */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Digital Marketing:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Work with the digital team to drive SEO, SEM, email marketing, and social media campaigns.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Analyze campaign performance and optimize strategies to maximize reach, engagement, and ROI.
              </li>
            </ul>
          </li>

          {/* 6. PERFORMANCE ANALYTICS & REPORTING */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Performance Analytics & Reporting:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Establish KPIs and track the effectiveness of all MarComm initiatives using data-driven insights.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Prepare regular reports on campaign performance and ROI for senior leadership.
              </li>
            </ul>
          </li>

          {/* 7. TEAM LEADERSHIP & DEVELOPMENT */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Team Leadership & Development:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Lead, mentor, and develop a high-performing MarComm team, fostering collaboration and growth.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Manage team workflows, set clear goals, and ensure timely delivery of all initiatives.
              </li>
            </ul>
          </li>
        </ol>
          </div>
        </div>
      </div>

      {/* KEY RESULT AREAS (KRAs) Section */}
      <div className={containerClass} style={{ marginBottom: "80px" }}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_53%] gap-x-16">
          {/* Left Column - Section Title */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
              }}
            >
              Key Result Areas (KRAs):
            </h3>
          </div>
          
          {/* Right Column - Content */}
          <div>
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px", marginBottom: "16px" }}>
          {/* 1. CAMPAIGN EFFECTIVENESS */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Campaign Effectiveness:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Achieve targeted KPIs (reach, engagement, and lead generation) across all marketing and communication campaigns.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Demonstrate measurable improvement in brand awareness and market share.
              </li>
            </ul>
          </li>

          {/* 2. BRAND CONSISTENCY */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Brand Consistency:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Maintain a high level of consistency (>95%) across all communication materials and channels.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Ensure brand guidelines are adhered to across all touchpoints and by all stakeholders.
              </li>
            </ul>
          </li>

          {/* 3. VENDOR & STAKEHOLDER SATISFACTION */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Vendor & Stakeholder Satisfaction:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Build and maintain strong relationships with at least 5 key vendors and ensure 100% on-time delivery.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Achieve a stakeholder satisfaction score of 4.5/5 or higher in internal surveys.
              </li>
            </ul>
          </li>

          {/* 4. MEDIA COVERAGE */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Media Coverage:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Secure a minimum of 10 high-quality media mentions per quarter.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Increase share of voice in industry publications by 20% year-over-year.
              </li>
            </ul>
          </li>

          {/* 5. CONTENT QUALITY */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Content Quality:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Deliver high-quality, error-free content with a 98% approval rate from internal stakeholders.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Produce a minimum of 8 major content pieces (brochures, presentations, whitepapers) per quarter.
              </li>
            </ul>
          </li>

          {/* 6. TEAM PERFORMANCE */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Team Performance:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Maintain high team morale and productivity, reflected in a team engagement score of 4.5/5 or higher.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Achieve 100% on-time delivery of all major projects and campaigns.
              </li>
            </ul>
          </li>

          {/* 7. POSITIVE QUALITY */}
          <li style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Positive Quality:
            </h4>
            <ul className="custom-bullet">
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Maintain high quality of brochures and presentations delivered to the office within the prescribed time frame.
              </li>
              <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "12px" }}>
                Ensure all deliverables meet brand standards and are free from errors.
              </li>
            </ul>
          </li>
        </ol>
          </div>
        </div>
      </div>

      {/* QUALIFICATIONS Section */}
      <div className={containerClass} style={{ marginBottom: "120px" }}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_53%] gap-x-16">
          {/* Left Column - Section Title */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "140%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                textTransform: "uppercase",
              }}
            >
              Qualifications:
            </h3>
          </div>
          
          {/* Right Column - Content */}
          <div>
            <ul className="custom-bullet" style={{ marginBottom: "24px" }}>
          <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "8px" }}>
            Post-grad in Marketing, Communications, Business, or a related field; MBA is a plus.
          </li>
          <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "8px" }}>
            8+ years of experience in marketing communications, with at least 4 years in a managerial role.
          </li>
          <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "8px" }}>
            Proven expertise in content creation (brochures, presentations, digital content) and brand management.
          </li>
          <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "8px" }}>
            Strong vendor and stakeholder management skills.
          </li>
          <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "8px" }}>
            Excellent written, verbal, and presentation skills.
          </li>
          <li style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "130%", color: "#00000099", marginBottom: "8px" }}>
            A creative thinker.
          </li>
        </ul>

            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-black px-6 py-3 transition-all duration-300 hover:bg-black hover:text-white"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0%",
              }}
            >
              Apply Now&nbsp;&nbsp;<span style={{fontWeight: 700 as React.CSSProperties['fontWeight']}}>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL FOR JOB APPLICATION FORM */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-black hover:text-gray-700 text-2xl font-bold z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            
            {/* Form Content */}
            <div className="p-8">
              <JobApplicationForm />
            </div>
          </div>
        </div>
      )}

      {/* FOOTER SECTION */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>

      {/* INLINE CSS for hover, arrow animations, and custom bullet styling */}
      <style jsx>{`
        .custom-bullet {
          margin-left: 2%;
          list-style-type: disc;
        }

        .custom-bullet li::marker {
          color: #00000099;
        }
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
  )
}
