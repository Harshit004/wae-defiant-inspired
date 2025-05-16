"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from 'next/link';

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

              {/* Tagline */}
              {/* (Animated version commented out; using static text instead) */}
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

      {/* MAIN CONTENT SECTION: TERMS OF USE */}
      <div className={containerClass}>
        {/* Main Heading */}
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
          TERMS OF USE
        </h2>

        {/* Introduction Paragraph */}
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0%",
            lineHeight: "150%",
            verticalAlign: "middle",
            color: "#00000099",
            marginBottom: "40px",
          }}
        >
          This page states the terms and conditions governing your use of the WAECORP.COM website. Please read them carefully. These terms and conditions may be updated and amended by us from time to time, so please visit this page periodically to review them. By using this site, you signify that you agree with these terms of use. If you do not accept the following terms and conditions, do not use this site or the services provided therein. In addition,<br />
          (i) when you use any current or future service or purchase any current or future product on this site, you will also be subject to the applicable terms and conditions of sale, and<br />
          (ii) when you join communities through the WAE Platform available at www.waecorp.com, you will also be subject to the “WWW.WAECORP.COM Terms of Use.”
        </p>

        {/* Section 1: Acceptance of Terms of Use */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              1. Acceptance of Terms of Use
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
                Welcome to WAE website (hereinafter “the Site”), a service provided by WAE India P Ltd. and its affiliates (hereinafter “We”, “Our” or “Us”). By visiting the Site, by providing Us with information, by using the services offered by the Site and/or by purchasing products from the Site, you agree to be bound by these Terms of Use. If you do not agree with any of these terms, then please do not use the Site.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Description of Service */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              2. Description of Service
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
                The Site is offered to you, the user (hereinafter “User(s)”, “You” or “Your”) who connects to the Site and uses Our services enabling access to a variety of resources, including download areas, product information, support services for customers and partners, other information and online purchasing of some of Our products (hereinafter the “Service”).<br />
                You are responsible for obtaining access to the Service. Please note that such access may involve third-party fees (such as Internet service provider charges). In addition, You must provide and are responsible for the equipment necessary to access the Service.<br />
                We will endeavor to allow uninterrupted access to the Site. However, access to the Site may be suspended, restricted or terminated at any time and without notice and We shall not be liable if for any reason the Site is unavailable.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Registration – Password – Security */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              3. Registration –<br />Password – Security
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
                In order to fully use the Site and buy Our products, You must register with Us by opening a free of charge account. In consideration of Your registration to the Service, You represent that You are at least 18 years of age, that You have the legal right to accept these Terms of Use (including on behalf of Your organization if using the Service for professional purposes) and are not barred from receiving products and services under the laws of any applicable jurisdiction. In doing so, You will be prompted to provide certain information and to create an account name and password. You agree to (a) provide true, accurate, current and complete information about Yourself; and (b) maintain and promptly update Your profile to keep it true, accurate, current and complete. You are fully responsible for maintaining the confidentiality of Your password and account for all activities that occur under Your password or account. The WAE Privacy Policy, available at the home page (http://www.waecorp.com), will govern the use of Your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Your Conduct When Using the Site or the Service */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              4. Your Conduct When Using the Site or the Service
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
                You understand that any content you post is solely your responsibility. You are solely responsible for your conduct on the Site and for all content that you may upload, post, license, sublicense, display or otherwise make available via the Service or the Site. WAE does not control such content and does not guarantee its accuracy, integrity, or quality. In addition, You will not:
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li>Upload, reproduce, post, display, license, sublicense or otherwise make available any content that is offensive, inappropriate, unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or otherwise objectionable or contrary to applicable laws.</li>
                <li>Harm minors in any way.</li>
                <li>Forge headers or manipulate identifiers to disguise the origin of any content.</li>
                <li>Upload or distribute content that (i) you do not have a right to make available, (ii) infringes any intellectual property rights, or (iii) contains viruses or harmful computer code.</li>
                <li>Interfere with or disrupt the Site, Service, or its networks; disobey any network procedures or policies; modify or hack the Site; or misrepresent your affiliation with the Site.</li>
                <li>Use any elements available on the Site except when specifically authorized; obtain materials or information through unauthorized means; stalk or harass others; collect personal data of other users; or otherwise violate applicable laws.</li>
              </ul>
              <p>
                Do not insert hyperlinks to your or third party sites or content unless you have verified they comply with these guidelines. You acknowledge that (i) We may remove any content that violates these Terms and (ii) WAE may access, preserve and disclose your account and content as required by law or to protect rights, property, or safety.
              </p>
              <p>
                By posting any content to WAE Community Sites or Blogs, You grant WAE a worldwide, royalty-free, sub-licensable, transferable and non-exclusive license to use, copy, distribute, reproduce, modify, translate, adapt, and publicly display such content in connection with the promotion of WAE products and services for the duration of the legal protection of the intellectual property rights.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Links to Third Party Websites */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              5. Links to Third Party Websites
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
                We have no control over third party websites linked from the Site. These links are provided solely for convenience. If You use them, You will leave the Site, and We assume no responsibility for any content or issues arising therefrom.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Linking to the Site */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              6. Linking to the Site
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
                You may link to the Site provided that you do not replicate the home page, remove or alter our logos, create frames or imply our endorsement of products/services other than our own, or misrepresent your relationship with Us. Your website must not contain distasteful, offensive or controversial content or violate any rights or laws. We reserve the right to revoke linking privileges for breach of these Terms.
              </p>
            </div>
          </div>
        </div>

        {/* Section 7: Limited License to Access and Use the Site – Proprietary Rights of WAE */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              7. Limited License to Access and Use the Site – Proprietary Rights of WAE
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
                You acknowledge that the Site and its software contain proprietary and confidential information protected by intellectual property laws. All materials including design, text, software, scripts, graphics, photos, interactive features, and trademarks are owned or licensed by WAE and are subject to copyright and other rights. Except for the rights expressly granted herein, all rights are reserved.
              </p>
              <p>
                You may not modify, reproduce, duplicate, copy, sell, transmit, store, or exploit any materials from the Site for any commercial purpose or public display, nor make any derivative use of the Site or its contents. Unauthorized use terminates any permission granted.
              </p>
            </div>
          </div>
        </div>

        {/* Section 8: Software Available */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              8. Software Available
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
                Any software available on this Site, whether free or licensed, is the copyrighted work of WAE, its affiliates, and/or suppliers. Your use of such Software is governed by the accompanying license agreement (if any) and must be accepted through any provided double-click acceptance process. Copying or redistributing the Software to any other server or location is prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Section 9: Exclusions and Limitations of Liability */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              9. Exclusions and Limitations of Liability
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
                The Site and its content are provided “as is” and “as available” without warranty of any kind. We exclude all warranties including, without limitation, merchantability, satisfactory quality, fitness for a particular purpose, non-infringement, and any warranty regarding the servers being free of viruses or other disruptive code. Use of the Site is entirely at Your risk. We will use reasonable endeavors to correct any errors once notified but assume no liability for any damages, errors, or omissions, whether indirect, consequential, or incidental. Nothing in these Terms shall limit liability for death, personal injury, fraud, or any liability that cannot be limited by law.
              </p>
            </div>
          </div>
        </div>

        {/* Section 10: Electronic Communications */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              10. Electronic Communications
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
                When you visit the Site, make purchases, or send emails to us, you are communicating with us electronically. You consent to receive communications electronically (via email or posted notices) which will satisfy any legal requirement that such communications be in writing.
              </p>
            </div>
          </div>
        </div>

        {/* Section 11: Indemnification */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              11. Indemnification
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
                You agree to indemnify, defend, and hold harmless WAE India Pvt. Ltd., its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs (including reasonable attorney fees) resulting from any violation of these Terms of Use or any activity related to your account.
              </p>
            </div>
          </div>
        </div>

        {/* Section 12: Jurisdiction and Governing Law */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              12. Jurisdiction and Governing Law
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
                These Terms of Use shall be governed by and construed in accordance with the laws of India. Any legal action arising out of or related to your use of the Site shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India. You consent to the personal jurisdiction of such courts.
              </p>
            </div>
          </div>
        </div>

        {/* Section 13: Changes to Terms */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              13. Changes to Terms
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
                WAE reserves the right, at its sole discretion, to revise, modify, or update these Terms of Use at any time. Any such changes will be effective immediately upon posting on the Site, and continued use of the Site constitutes your acceptance of the modified Terms. It is your responsibility to check this page periodically for updates.
              </p>
            </div>
          </div>
        </div>

        {/* Section 14: Export Control Compliance */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              14. Export Control Compliance
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
                You agree not to export or re-export any software, technology, or products from the Site in violation of applicable Indian export laws or regulations, and further agree to comply with all applicable Indian laws regarding the transmission of technical data exported from India.
              </p>
            </div>
          </div>
        </div>

        {/* Section 15: Copyright Infringement Notification (DMCA Equivalent) */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              15. Copyright Infringement Notification (DMCA Equivalent)
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
                If you believe that your copyrighted work has been copied or used on this Site in a manner that constitutes copyright infringement, you may notify us with the following information:
              </p>

              <ul className="mb-[20px] mt-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li>A physical or electronic signature of the copyright owner or an authorized representative;</li>
                <li>Identification of the copyrighted work claimed to have been infringed;</li>
                <li>Identification of the material that is claimed to be infringing and its location on the Site;</li>
                <li>Your contact information (address, phone number, and email);</li>
                <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law;</li>
                <li>A statement that the information in the notice is accurate and, under penalty of perjury, that you are the owner or authorized to act on behalf of the owner.</li>
              </ul>
              <p>
                <strong>Please send copyright-related concerns to:</strong><br />
                <strong>Legal Compliance</strong><br />
                WAE India Pvt. Ltd.<br />
                <strong>Email: </strong>legal@waecorp.com<br />
                <strong>Subject Line: </strong>"Copyright Infringement Notice"
              </p>
            </div>
          </div>
        </div>

        {/* Section 16: Payment Processing */}
        <div className="mb-[80px]">
          <div className="grid grid-cols-2 gap-y-[80px]" style={{ justifyContent: "space-between" }}>
            <h3
              style={{
                width: "75%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              16. Payment Processing
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
                Certain purchases or services may require payment. All payments made through the Site shall be processed through secure third-party gateways authorized in India. WAE is not liable for any issues arising out of payment processing. You agree to provide current, complete, and accurate purchase and account information and to promptly update your account with any changes.
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
          display: flex;
          flex-direction: column;
          gap: 12px;
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
