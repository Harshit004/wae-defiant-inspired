"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

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
    "Identity & Ambition",
    "Products & Solutions",
    "Career",
  ]
  const blueprintItems = ["Sustainability", "The Activist Co.", "Blog"]
  const lineCount = Math.min(productsItems.length, blueprintItems.length)

  return (
    <main className="relative">
      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header
          ref={headerRef}
          className="w-full"
          style={{ marginBottom: "120px", position: "relative", zIndex: 1 }}
        >
          <div className={containerClass}>
            {/* Top Row: Location, Time, and Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                lineHeight: "100%",
                letterSpacing: "0px",
                textTransform: "uppercase",
              }}
            >
              <div style={{ color: "#00000066" }}>INSIGNIA</div>
              <div style={{ color: "#00000066" }}>ORIGIN</div>
              <div style={{ color: "#00000066" }}>OBJECTIVE</div>
              <div style={{ color: "#00000066" }}>Inside WAE</div>
              <div style={{ color: "#00000066" }}>ETCETERA</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Animated Tagline, and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Column 1: Logo */}
              <div className="flex flex-col justify-center">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                  alt="WAE Logo"
                  width={77.53575134277344}
                  height={82.03529357910156}
                />
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "10px",
                  lineHeight: "125%",
                  letterSpacing: "0px",
                  color: "#000000",
                  marginRight: "0.2rem",
                  display: "inline-block",
                }}
              >
                20.5937° N<br />
                78.9629° E
              </div>

              {/* Column 3: Animated Tagline */}
              <div className="flex flex-col items-start">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={taglineVisible ? "visible" : "hidden"}
                  style={{ whiteSpace: "nowrap" }}
                  className="flex flex-row justify-center"
                >
                  {taglineWords1.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "125%",
                        letterSpacing: "0px",
                        color: "#000000",
                        marginRight: "0.2rem",
                        display: "inline-block",
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
                  style={{ whiteSpace: "nowrap" }}
                  className="flex flex-row justify-center"
                >
                  {taglineWords2.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "125%",
                        letterSpacing: "0px",
                        color: "#000000",
                        marginRight: "0.2rem",
                        display: "inline-block",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Column 4: Products & Solutions Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "0px",
                      textAlign: "left",
                      borderBottom: i < lineCount ? "1px solid #D9D9DC" : "none",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span style={{ display: "block" }}>{item}</span>
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

              {/* Column 5: Blueprint Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "0px",
                      textAlign: "left",
                      borderBottom: i < lineCount ? "1px solid #D9D9DC" : "none",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span style={{ display: "block" }}>{item}</span>
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

      {/* Privacy Policy Heading */}
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
          Terms of Use
        </h2>
        {/* <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0%",
            lineHeight: "150%",
            verticalAlign: "middle",
            color: "#000000",
          }}
        >
          Effective date: May 1, 2025
        </p> */}
        {/* <p
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
          This policy describes how WAE India P Ltd. and its parent, subsidiary, and affiliate companies (collectively, “WAE,” “we,” or “us”) collect, use and share information collected through the mail, www.waecorp.com and other websites that link to this privacy policy, and WAE mobile services including our mobile application (the “App”) (collectively, the “WAE Services”).
        </p> */}

        {/* Scope Section */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Scope	
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
              <p className="mb-[20px]"><strong>1.1 </strong>
                Any use of this website provided by WAE Limited and/or its affiliates ("WAE Website") is subject to these Terms of Use. These Terms of Use may be amended, modified, or replaced by other terms and conditions, for example, those governing the purchase of products and services. By logging in, or where login is not required, by accessing or using the WAE Website, you accept these Terms of Use in their current version.
              </p>
              <p className="mb-[20px]"><strong>1.2 </strong>
                In cases where this website is targeted toward businesses or public enterprises, such entities are represented by the individual user, who shall be presumed to possess the requisite authority and knowledge to act on their behalf.
              </p>
              <p><strong>1.3 </strong>
                If the user accesses the WAE Website as a business customer, i.e., not acting for purposes unrelated to their trade, business, or profession, consumer protection laws (such as provisions under Indian Consumer Protection legislation) may not apply.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Services	
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
              <p className="mb-[20px]"><strong>2.1 </strong>
                The WAE Website contains specific information, product literature, downloadable resources, and other materials, including but not limited to documentation related to the products and technology, that may be accessed or downloaded.
              </p>
              <p className="mb-[20px]"><strong>2.2 </strong>
                WAE reserves the right to modify, suspend, or terminate the operation of the WAE Website, in whole or in part, at any time without prior notice. Due to the inherent characteristics of the Internet and digital systems, WAE cannot accept any liability for the continuous, uninterrupted availability of the WAE Website.
              </p>
            </div>
          </div>
        </div>

        {/* Registration and Password Section */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Registration and<br />Password
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
              <p className="mb-[20px]"><strong>3.1 </strong>
                Certain areas of the WAE Website may be restricted to registered users. For security and business transaction integrity, only registered users may access such areas. WAE reserves the right to refuse registration or to subject previously unrestricted areas to registration. WAE may also revoke a user’s access without notice, particularly if:
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                    False or misleading data was used during registration
                </li>
                <li className="mb-[12px]">
                    The Terms of Use are violated
                </li>
                <li className="mb-[12px]">
                    The user acts in breach of applicable law when accessing or using the website
                </li>
                <li className="mb-[12px]">
                    The user has not accessed the website for a prolonged period
                </li>
              </ul>
              <p className="mb-[20px]"><strong>3.2 </strong>
                Registered users must ensure that the data provided during registration is accurate and kept up-to-date. The user is responsible for maintaining an accurate email address where WAE can reach them.
              </p>
              <p className="mb-[20px]"><strong>3.3 </strong>
                Upon registration (if applicable), the user will receive login credentials ("User Data"). On first access, the user must change the password to a secure one known only to them. These credentials allow the user to access their profile, view or modify data, or withdraw consent to data processing, if applicable.
              </p>
              <p className="mb-[20px]"><strong>3.4 </strong>
                The user is responsible for ensuring that their login credentials are not disclosed to third parties. They shall be liable for all activities carried out using their User Data. Users must log out at the end of each session if they have logged in while using WAE’s website. If unauthorized access is suspected, WAE must be notified immediately in writing or via email.
              </p>
              <p className="mb-[20px]"><strong>3.5 </strong>
                After receiving such notification, WAE will block access under the concerned User Data. Re-access will be granted upon application or new registration.
              </p>
              <p className="mb-[20px]"><strong>3.6 </strong>
                The user may request termination of their registration at any time, provided that doing so does not conflict with ongoing contractual obligations. WAE will then delete all personal data no longer required.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property Section */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Intellectual Property
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
              <p className="mb-[20px]"><strong>4.1 </strong>
                Except as otherwise provided in Section 4, users may not modify, reproduce, or commercially use any information or content on the WAE Website without prior written permission from WAE.
              </p>
              <p className="mb-[20px]"><strong>4.2 </strong>
                No rights or licenses are granted to users beyond those explicitly stated. Patent rights are expressly excluded.
              </p>
              <p className="mb-[20px]"><strong>4.3 </strong>
                WAE may freely use any suggestions or feedback provided by users for the improvement or development of its products and services.
              </p>
            </div>
          </div>
        </div>

        {/* User Obligations */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "40px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              User Obligations
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
              <p className="mb-[20px]"><strong>5.1 </strong>
                When using the WAE Website, the user shall not:
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                    Harm others, especially minors
                </li>
                <li className="mb-[12px]">
                    Violate public decency or applicable laws
                </li>
                <li className="mb-[12px]">
                    Infringe intellectual property or proprietary rights
                </li>
                <li className="mb-[12px]">
                    Upload or distribute malware or other harmful programs
                </li>
                <li className="mb-[12px]">
                    Post content or links that breach confidentiality obligations
                </li>
                <li className="mb-[12px]">
                    Send unsolicited communications, advertisements, or spam
                </li>
              </ul>
              <p className="mb-[20px]"><strong>5.2 </strong>
                WAE may deny or restrict access for users violating these Terms.
              </p>
            </div>
          </div>
        </div>

        {/* Hyperlinks */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Hyperlinks
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
                The WAE Website may include links to third-party sites. WAE is not responsible for the content of such external sites and does not endorse them. Access to such sites is at the user’s own risk.
              </p>
            </div>
          </div>
        </div>

        {/* Warranty and Disclaimer */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                lineHeight: "130%",
                fontSize: "40px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Warranty and<br />Disclaimer
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
                The WAE Website may include links to third-party sites. WAE is not responsible for the content of such external sites and does not endorse them. Access to such sites is at the user’s own risk.
              </p>
            </div>
          </div>
        </div>

        {/* Warranty and Disclaimer 2 */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Warranty and<br />Disclaimer
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
              <p className="mb-[20px]"><strong>7.1 </strong>
                All materials on the WAE Website are provided "as is." WAE disclaims all warranties, express or implied, including warranties of accuracy, fitness for a particular purpose, or non-infringement, except in cases of willful misconduct or fraud.
              </p>
              <p><strong>7.2 </strong>
                Product specifications may vary or change without prior notice. Any required performance attributes must be agreed upon in a separate purchase contract.
              </p>
            </div>
          </div>
        </div>

        {/* Liability */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Liability
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
              <p className="mb-[20px]"><strong>8.1 </strong>
                WAE shall not be liable for any damages unless mandated by applicable law. This includes liability under product liability law, intentional misconduct, gross negligence, personal injury, or failure to meet essential contractual obligations.
              </p>
              <p><strong>8.2 </strong>
                While WAE strives to keep its website virus-free, users are responsible for using appropriate security software. WAE does not guarantee that the site is free from malware.
              </p>
            </div>
          </div>
        </div>

        {/* Export Control */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Export Control
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
              <p className="mb-[20px]"><strong>9.1 </strong>
                Users are responsible for ensuring that materials accessed or transferred from the WAE Website comply with applicable export control laws.
              </p>
              <p className="mb-[20px]"><strong>9.2 </strong>
                Users must not transfer materials to sanctioned countries, organizations, or individuals.
              </p>
              <p className="mb-[20px]"><strong>9.3 </strong>
                Upon request, users must provide WAE with relevant details for export control verification.
              </p>
              <p className="mb-[20px]"><strong>9.4 </strong>
                Users shall indemnify WAE for any breach of export control regulations.
              </p>
              <p><strong>9.5 </strong>
                WAE may decline to fulfill any request if restricted by trade regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Data Protection
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
                WAE will handle personal data in accordance with applicable laws and its Data Privacy Policy, accessible via hyperlink on the website.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Jurisdiction and Miscellaneous Section */}
        <div>
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Legal Jurisdiction and<br />Miscellaneous
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
              <p className="mb-[20px]"><strong>11.1 </strong>
                Any supplementary agreements must be in writing.
              </p>
              <p className="mb-[20px]"><strong>11.2 </strong>
                The courts of Delhi, India shall have exclusive jurisdiction.
              </p>
              <p className="mb-[20px]"><strong>11.3 </strong>
                The WAE Website is operated under Indian law. If accessed outside India, users are solely responsible for compliance with local laws.
              </p>
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
