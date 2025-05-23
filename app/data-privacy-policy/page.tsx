"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link";

// Shared container class for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

export default function Home() {
  // State variables
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

  <Link href="/homepage3" passHref>

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
                  lineHeight: "100%",
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

      {/* Data Privacy Policy Heading */}
      <div className={containerClass}>
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "48px",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginBottom: "40px",
          }}
        >
          Data Privacy Policy
        </h2>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0%",
            lineHeight: "150%",
            verticalAlign: "middle",
            marginBottom: "20px",
            color: "#000000",
          }}
        >
          Effective date: May 1, 2025
        </p>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0%",
            lineHeight: "150%",
            verticalAlign: "middle",
            color: "#00000099",
            marginBottom: "80px",
          }}
        >
          WAE Ltd ("we", "us", or "our") is committed to protecting the privacy and personal data of all individuals who interact with us, including users of our website, business partners, customers, and marketing contacts. This Data Privacy Policy outlines how we process personal data in accordance with applicable data protection laws, including Indian data protection legislation and internationally recognized frameworks. It reflects our commitment to responsible data governance, transparency, and information security.
        </p>

        {/* Personal Data processing Section for web app and services */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              1. Processing of Personal Data Related to Your Use of Our Websites, Applications, and Online Services	
            </h3>
            {/* Right Column: Policy Content */}
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Categories of Personal Data Processed:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[20px]">
                When visiting our websites, using our digital services, or communicating with us online, we may collect the following categories of personal data:
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                  <strong>Contact details: </strong>full name, email address, phone number, organization, job title
                </li>
                <li className="mb-[12px]">
                  <strong>Information submitted</strong> through web forms, inquiry portals, or email communications
                </li>
                <li className="mb-[12px]">
                  <strong>Cookies and tracking technologies: </strong>data collected through cookies or similar tools, subject to cookie policy preferences
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Purpose of Processing:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                  To provide, maintain, and improve the website and associated digital services
                </li>
                <li className="mb-[12px]">
                  To create and administer user accounts or sessions
                </li>
                <li className="mb-[12px]">
                  To personalize user experience and track usage for analytics
                </li>
                <li className="mb-[12px]">
                  To provide support or respond to queries submitted via online forms
                </li>
                <li className="mb-[12px]">
                To monitor system performance, ensure information security, and detect/prevent abuse
                </li>
                <li className="mb-[12px]">
                To comply with legal requirements applicable to digital service provision
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div className="whitespace-nowrap"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Online Offerings Provided by Your Organization:
              </div>
              <p className="mb-[20px]"></p>
              <p>
                If you are using our Online Offerings on behalf of your organization (e.g., as an employee or vendor), your data may be processed as part of a business relationship between WAE Ltd and your organization. In such cases, your organization is responsible for determining how your personal data is used and shared, and we process it under their direction, in line with any applicable agreements.
              </p>
              <p className="mb-[40px]"></p>
              
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Legal Basis for Processing:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">
                Depending on jurisdiction and context, processing of personal data for these purposes may be justified by:
              </p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                  Performance of a contract or to take steps at the request of the data subject
                </li>
                <li className="mb-[12px]">
                  Legitimate interest in providing secure, functional online services
                </li>
                <li className="mb-[12px]">
                  Compliance with legal obligations
                </li>
                <li className="mb-[12px]">
                  Consent, where required (e.g., marketing or cookies)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Personal Data processing Section for marketing and cmmunications */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              2. Processing of Personal Data Related to Marketing, Customer Satisfaction Surveys, and Communications
            </h3>
            {/* Right Column: Policy Content */}
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Categories of Personal Data Processed:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[20px]">
                When visiting our websites, using our digital services, or communicating with us online, we may collect the following categories of personal data:
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Name, email address, phone number, and company information
                </li>
                <li className="mb-[12px]">
                Preferences and interests expressed in prior interactions
                </li>
                <li className="mb-[12px]">
                Survey responses and communication history
                </li>
                <li>
                Engagement metrics (e.g., open rates, click-through rates)
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Purpose of Processing:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                To send you updates about our products, services, promotions, or relevant events
                </li>
                <li className="mb-[12px]">
                To assess satisfaction levels through customer surveys
                </li>
                <li className="mb-[12px]">
                To improve products, services, and communication strategies based on feedback
                </li>
                <li className="mb-[12px]">
                To conduct market analysis and campaign performance evaluation
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Your Rights and Choices:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">
              You may opt out of receiving marketing emails or surveys at any time by:
              </p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Clicking the "unsubscribe" link in marketing emails
                </li>
                <li className="mb-[12px]">
                Contacting our legal team at <strong>legal@waecorp.com</strong>
                </li>
              </ul>
              <p className="mb-[40px]"></p>
              
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Legal Basis for Processing:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Your consent, where required
                </li>
                <li className="mb-[12px]">
                Our legitimate interest in maintaining client relationships and improving services
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Personal Data processing Section for business relationships */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              3. Processing of Personal Data in the Context of Business Relationships
            </h3>
            {/* Right Column: Policy Content */}
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Categories of Personal Data Processed:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Business contact details: name, title, email address, phone number, office location
                </li>
                <li className="mb-[12px]">
                Relationship data: products/services ordered, inquiries made, project details, account communications
                </li>
                <li className="mb-[12px]">
                Transactional data: billing, payment, and account information (excluding sensitive data)
                </li>
                <li>
                Publicly available data (e.g., from corporate websites or public databases)
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Purpose of Processing:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Planning, executing, and managing contractual relationshipsPlanning, executing, and managing contractual relationships
                </li>
                <li className="mb-[12px]">
                Processing orders, invoices, and payments
                </li>
                <li className="mb-[12px]">
                Providing after-sales services including maintenance and support
                </li>
                <li className="mb-[12px]">
                Fulfilling contractual and compliance obligations
                </li>
                <li className="mb-[12px]">
                Maintaining professional communication with representatives of vendors, suppliers, or partners
                </li>
                <li>
                Establishing, exercising, or defending legal claims and ensuring regulatory compliance
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Your Rights and Choices:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">
              You may opt out of receiving marketing emails or surveys at any time by:
              </p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Clicking the "unsubscribe" link in marketing emails
                </li>
                <li className="mb-[12px]">
                Contacting our legal team at <strong>legal@waecorp.com</strong>
                </li>
              </ul>
              <p className="mb-[40px]"></p>
              
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Legal Basis for Processing:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Performance of a contract or service relationship
                </li>
                <li className="mb-[12px]">
                Compliance with legal obligations (e.g., tax laws, export compliance)
                </li>
                <li className="mb-[12px]">
                Legitimate interest in business continuity and relationship management
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Personal Data Transfer */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              4. Disclosure and Transfer of Personal Data
            </h3>
            {/* Right Column: Policy Content */}
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Categories of Recipients:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">We may disclose your personal data to the following categories of recipients:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                <strong>Affiliated Companies and Service Providers: </strong>These include IT service providers, cloud hosting partners, analytics vendors, email marketing platforms, and CRM software partners engaged by WAE Ltd. Such parties are contractually obligated to process personal data solely for the specified purposes and in accordance with applicable data protection laws.
                </li>
                <li className="mb-[12px]">
                <strong>Professional Advisors: </strong>Such as auditors, accountants, lawyers, and consultants involved in corporate governance, legal compliance, or dispute resolution.
                </li>
                <li className="mb-[12px]">
                <strong>Government Authorities and Law Enforcement: </strong>When required by applicable laws, regulations, legal processes, or enforceable government requests.
                </li>
                <li>
                <strong>Event-Driven Disclosures: </strong>In the case of a merger, acquisition, restructuring, or asset sale, personal data may be transferred to the involved parties under strict confidentiality agreements.
                </li>
              </ul>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Public and Community Features:
              </div>
              <p className="mb-[20px]"></p>
              <p>
              WAE Ltd may host blogs, forums, or other interactive platforms where users can voluntarily post content. Any information posted publicly can be accessed and used by others. We recommend caution when sharing personal data in such areas.
              </p>
              <p className="mb-[40px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                International Transfers of Data:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">
                WAE Ltd is headquartered in India and does not currently perform regular international transfers of personal data. However, should data need to be transferred to jurisdictions outside India:
              </p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                We will ensure that such transfers are governed by contractual or legal safeguards (e.g., Standard Contractual Clauses or equivalent legal instruments).
                </li>
                <li className="mb-[12px]">
                We will conduct necessary risk assessments and compliance reviews.
                </li>
                <li>
                We will inform data subjects of such transfers and their rights, where legally required.
                </li>
              </ul>
              <p className="mb-[16px]">
                Transfers may be made to:
              </p>
              <ul className="custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                International cloud hosting providers for data storage or backup
                </li>
                <li className="mb-[12px]">
                International service providers under binding contractual obligations
                </li>
                <li>
                Affiliates in foreign jurisdictions supporting specific business operations
                </li>
              </ul>
              <p >
                Data transferred internationally will continue to be governed by this Privacy Policy and subject to reasonable and appropriate technical and organizational safeguards.
              </p>
            </div>
          </div>
        </div>

        {/* Data retention */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              5. Retention of Personal Data
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <p className="mb-[20px]">
                WAE Ltd retains personal data only for as long as it is necessary to fulfill the purposes for which the data was collected or to comply with legal, regulatory, or contractual obligations. Our data retention practices are designed to ensure that personal data is not held longer than required and that it is securely deleted or anonymized at the end of its lifecycle.
              </p>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Retention Criteria:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">The specific retention period for personal data depends on the nature and purpose of processing. Key factors include:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                The duration of the customer or business relationship
                </li>
                <li className="mb-[12px]">
                Statutory or regulatory requirements (e.g., tax, employment, contractual laws)
                </li>
                <li className="mb-[12px]">
                The need to retain data for dispute resolution or enforcement of agreements
                </li>
                <li>
                Legitimate interests in maintaining records (e.g., marketing opt-outs, transactional logs)
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Retention Periods:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">Examples of standard retention periods include:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                <strong>Customer service and sales records: </strong>up to 7 years after the conclusion of the service or transaction
                </li>
                <li className="mb-[12px]">
                <strong>Marketing data: </strong>retained until the individual opts out or withdraws consent
                </li>
                <li className="mb-[12px]">
                <strong>Web form submissions and inquiries: </strong>1–2 years from the last communication
                </li>
                <li>
                <strong>Employment-related data: </strong>as per Indian labor laws or applicable regional laws
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Secure Deletion and Anonymization:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">At the end of the retention period, WAE Ltd:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                The duration of the customer or business relationship
                </li>
                <li className="mb-[12px]">
                Permanently deletes data from active databases and backup systems where feasible
                </li>
                <li className="mb-[12px]">
                Anonymizes the data where ongoing use is required for statistical or historical analysis without identifying individuals
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Review and Updates:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">WAE Ltd conducts periodic reviews of data retained across systems to ensure compliance with this policy. Retention periods are also adjusted based on changes in legal, operational, or technical requirements.</p>
            </div>
          </div>
        </div>

        {/* Data protection */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              6. Your Data Protection Rights
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <p className="mb-[20px]">
                As a data subject, you have various rights under applicable data protection laws. WAE Ltd is committed to ensuring that your rights are upheld and will take appropriate measures to respond to your requests in a timely and lawful manner.
              </p>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Your Rights Include:
              </div>
              <p className="mb-[20px]"></p>
              <strong className="mb-[8px]">1. Right of Access</strong>
              <p className="mb-[16px]">You have the right to request confirmation of whether we process your personal data and to receive a copy of such data along with relevant information about the processing.</p>
              <strong className="mb-[8px]">2. Right to Rectification</strong>
              <p className="mb-[16px]">You may request the correction of inaccurate or incomplete personal data we hold about you.</p>
              <strong className="mb-[8px]">3. Right to Erasure (Right to be Forgotten)</strong>
              <p className="mb-[16px]">You may request the deletion of your personal data where:</p>
              <ul className="mb-[16px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                It is no longer necessary for the purposes it was collected
                </li>
                <li className="mb-[12px]">
                You withdraw your consent (where applicable)
                </li>
                <li className="mb-[12px]">
                You object to processing and there are no overriding legitimate grounds
                </li>
                <li>
                Processing is unlawful or required by law to be erased
                </li>
              </ul>
              <strong className="mb-[8px]">4. Right to Restriction of Processing</strong>
              <p className="mb-[16px]">You may request that we restrict processing of your data under certain conditions, such as when the accuracy of the data is contested or the processing is unlawful.</p>
              <strong className="mb-[8px]">5. Right to Data Portability</strong>
              <p className="mb-[16px]">You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to request the transfer of that data to another data controller where technically feasible.</p>
              <strong className="mb-[8px]">6. Right to Object</strong>
              <p className="mb-[16px]">You may object to processing based on legitimate interests or for direct marketing purposes. In such cases, we will cease processing unless we have compelling legitimate grounds or are required to do so by law.</p>
              <strong className="mb-[8px]">7. Right to Withdraw Consent</strong>
              <p className="mb-[16px]">Where processing is based on your consent, you have the right to withdraw it at any time without affecting the lawfulness of prior processing.</p>
            </div>
          </div>
        </div>

        {/* Security Measures */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              7. Security Measures
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <p className="mb-[20px]">
                WAE Ltd takes the security of personal data seriously and has implemented a range of technical and organizational safeguards to protect personal data from unauthorized access, disclosure, alteration, or destruction.
              </p>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Technical Measures:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">The specific retention period for personal data depends on the nature and purpose of processing. Key factors include:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                <strong>Data Encryption: </strong>We use encryption protocols (e.g., TLS/SSL) to protect data in transit over public networks and, where applicable, encryption for data at rest.
                </li>
                <li className="mb-[12px]">
                <strong>Access Controls: </strong>We implement role-based access control, password policies, and authentication mechanisms to ensure that only authorized personnel have access to personal data.
                </li>
                <li className="mb-[12px]">
                <strong>Network Security: </strong>Firewalls, intrusion detection systems (IDS), and antivirus technologies are in place to monitor and protect our networks from external threats.
                </li>
                <li>
                <strong>Secure Configuration: </strong>Systems and applications are regularly updated and patched to address vulnerabilities.
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Retention Periods:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">Examples of standard retention periods include:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                <strong>Customer service and sales records: </strong>up to 7 years after the conclusion of the service or transaction
                </li>
                <li className="mb-[12px]">
                <strong>Marketing data: </strong>retained until the individual opts out or withdraws consent
                </li>
                <li className="mb-[12px]">
                <strong>Web form submissions and inquiries: </strong>1–2 years from the last communication
                </li>
                <li>
                <strong>Employment-related data: </strong>as per Indian labor laws or applicable regional laws
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Organizational Measures:
              </div>
              <p className="mb-[20px]"></p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                <strong>Employee Training: </strong>All employees handling personal data are trained on data protection policies and cybersecurity hygiene.
                </li>
                <li className="mb-[12px]">
                <strong>Data Handling Protocols: </strong>Clear procedures are defined for data processing, classification, retention, and disposal.
                </li>
                <li className="mb-[12px]">
                <strong>Third-Party Risk Management: </strong>Vendors and service providers are subject to due diligence and required to sign data processing agreements ensuring adequate protection standards.
                </li>
                <li>
                <strong>Incident Response Plan: </strong>WAE Ltd maintains a documented incident response plan to address potential data breaches or security events. If a data breach occurs that may impact individuals' rights, we will notify affected parties and regulators in accordance with applicable laws.
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Periodic Review and Improvements:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">Security controls are regularly reviewed, tested, and updated to keep pace with emerging threats, regulatory changes, and technological advancements. Internal audits and assessments are conducted periodically to evaluate compliance.</p>
            </div>
          </div>
        </div>

        {/* Contact Information and Complaints */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              8. Contact Information and Complaints
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <p>
                WAE Ltd is committed to ensuring transparency and responsiveness when it comes to privacy concerns. If you have any questions about this Privacy Policy or wish to exercise your rights or raise a concern, you are encouraged to reach out to us directly.
              </p>
              <p className="mb-[20px]"></p>

              <div className="mb-[20px]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Contact Details:
              </div>
              <p className="mb-[12px]">For all privacy-related queries, requests, or complaints, please contact:</p>
              <p className="mb-[12px]"><strong>WAE Ltd Legal and Compliance Email: legal@waecorp.com</strong></p>
              <p>We will make every effort to address and resolve your inquiry in a timely and satisfactory manner. For verification purposes, we may ask for certain information to confirm your identity before processing any data subject rights requests.</p>
            </div>
          </div>
        </div>

        {/* Compliance with the Indian Digital Personal Data Protection (DPDP) Act */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              9. Compliance with the Indian Digital Personal Data Protection (DPDP) Act
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <p className="mb-[20px]">
                This section applies to personal data processed by WAE Ltd in the territory of India or in relation to data principals located in India, in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
              </p>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Data Fiduciary Responsibilities:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">WAE Ltd acts as a <strong>Data Fiduciary</strong> when determining the purpose and means of processing personal data. As a fiduciary, we are obligated to:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Ensure data is processed lawfully and for specific, clear, and lawful purposes
                </li>
                <li className="mb-[12px]">
                Limit the collection of personal data to what is necessary for those purposes
                </li>
                <li className="mb-[12px]">
                Implement reasonable security safeguards to prevent data breaches
                </li>
                <li className="mb-[12px]">
                Inform data principals of their rights, the purpose of data collection, and methods for grievance redressal
                </li>
                <li>
                Erase personal data when it is no longer required or upon withdrawal of consent, unless retention is required by law
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Consent and Notice Requirements:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">We seek clear, specific, and informed consent before processing personal data, unless a legal exception applies. Notices are provided at the time of data collection and outline:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Purpose of processing
                </li>
                <li className="mb-[12px]">
                Rights available to data principals
                </li>
                <li>
                Contact details of the Grievance Officer
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Data Principal Rights:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">Under the DPDP Act, individuals ("data principals") have the right to:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Access their personal data
                </li>
                <li className="mb-[12px]">
                Correct or update their personal data
                </li>
                <li className="mb-[12px]">
                Withdraw consent for processing (where applicable)
                </li>
                <li className="mb-[12px]">
                Erasure of personal data under lawful grounds
                </li>
                <li>
                File a complaint with the Grievance Officer or the Data Protection Board of India
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Grievance Redressal:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">WAE Ltd has appointed a point of contact for handling data privacy grievances. Data principals can raise a grievance by emailing legal@waecorp.com. If the response is unsatisfactory, individuals may escalate their complaint to the Data Protection Board of India once fully operational.</p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Cross-Border Data Transfers:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[12px]">At present, WAE Ltd does not routinely transfer personal data outside India. If such transfers become necessary, they will comply with any cross-border transfer rules and governmental notifications issued under the DPDP Act.</p>
              <p>This section may be updated to reflect new obligations or clarifications as and when rules under the DPDP Act are formally notified.</p>
            </div>
          </div>
        </div>

        {/* Policy Updates and Notification */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              10. Policy Updates and Notification
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            > 
              <p className="mb-[16px]">WAE Ltd may update or revise this Data Privacy Policy from time to time to reflect changes in:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Applicable data protection laws and regulations
                </li>
                <li className="mb-[12px]">
                The technologies or platforms we use
                </li>
                <li>
                Our services, products, or business operations
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Notification of Changes:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">Whenever we make significant changes to this Privacy Policy, we will:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Publish the updated version on our official website at www.waecorp.com
                </li>
                <li className="mb-[12px]">
                Update the "Last Updated" date at the top of the policy
                </li>
                <li>
                Provide additional notice through email or banners on the website where legally required or appropriate
                </li>
              </ul>
              <p className="mb-[20px]"></p>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                User Acknowledgment:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[12px]">By continuing to access or use our website, services, or by interacting with us after such changes, you acknowledge and agree to the revised policy.</p>
              <p>We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting your data.</p>
            </div>
          </div>
        </div>

        {/* Document Governance and Version Control */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              11. Document Governance and Version Control
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            > 
              <p className="mb-[20px]">This section outlines how WAE Ltd manages, reviews, and controls the official version of its Data Privacy Policy.</p>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#00000099",
                }}
              >
                Ownership and Responsibility:
              </div>
              <p className="mb-[20px]"></p>
              <p className="mb-[16px]">The Legal and Compliance Team at WAE Ltd is responsible for:</p>
              <ul className="mb-[16px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Maintaining this document
                </li>
                <li className="mb-[12px]">
                Reviewing its relevance and accuracy
                </li>
                <li>
                Ensuring updates comply with applicable legal and regulatory frameworks
                </li>
              </ul>
              <p>All questions or requests for clarification regarding this document should be directed to <ul><strong>legal@waecorp.com.</strong></ul></p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "85%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              12. Contact Information
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            > 
              <p className="mb-[20px]">WAE Ltd welcomes inquiries, feedback, and concerns regarding the handling of personal data and this Data Privacy Policy.</p>
              <p className="mb-[16px]">For any of the following:</p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                Requests related to your data protection rights
                </li>
                <li className="mb-[12px]">
                Questions about our privacy practices
                </li>
                <li className="mb-[12px]">
                Concerns about how your personal data is handled
                </li>
                <li>
                Reporting potential data breaches or incidents
                </li>
              </ul>

              <p className="mb-[16px]"></p>

              <p className="mb-[12px]">You may contact us at:</p>
              <strong>WAE Ltd Legal and Compliance Team</strong>
              <p className="mb-[8px]"></p>
              <p className="mb-[8px]"><strong>Email: </strong>legal@waecorp.com</p>
              <strong>Website:www.waecorp.com</strong>
              <p className="mb-[12px]">We aim to respond to legitimate requests and inquiries within the timelines specified under applicable laws and regulations. We may request additional information to verify your identity before processing certain requests to ensure data security.</p>
              <p>For sensitive concerns, you may mark your communication as <strong>“Confidential – Data Privacy Concern.”</strong></p>
            </div>
          </div>
        </div>

      </div>

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
