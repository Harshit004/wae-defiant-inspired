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
          Privacy Policy
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
          This policy describes how WAE India P Ltd. and its parent, subsidiary, and affiliate companies (collectively, “WAE,” “we,” or “us”) collect, use and share information collected through the mail, www.waecorp.com and other websites that link to this privacy policy, and WAE mobile services including our mobile application (the “App”) (collectively, the “WAE Services”).
        </p>

        {/* Compliance Section */}
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
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              Compliance with the Digital 
              Personal Data Protection Act, 
              2023 (DPDP Act)	
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
              <p>
                WAE complies with the provisions of the Digital Personal Data Protection Act, 2023 as applicable in India. 
                This includes obligations related to lawful processing of personal data, obtaining consent for data usage, 
                ensuring data security, enabling rights of data principals, and appointment of a Data Protection Officer 
                (DPO) as mandated under the Act. Any data processing activity performed by WAE within the territorial 
                scope of the DPDP Act adheres to its requirements.
              </p>
            </div>
          </div>
        </div>

        {/* KYC Section */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
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
              HOW WE COLLECT AND USE INFORMATION
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
              <strong>Know Your Customer (“KYC”):</strong>
              <p className="mb-[20px]">
                We may collect personally identifiable information (“KYC”) such as your name, your contact information, 
                your shipping information, and your billing information (such as credit card account data). We collect 
                KYC when you provide it to us through your use of the WAE Services, for example when you interact 
                with our websites, place an order, or sign up for our mailing list. We also receive limited KYC when you 
                choose to download or request the App. We may combine the KYC we collect with additional 
                information from other third-party sources. We use the KYC that we collect to provide the WAE Services 
                (such as to respond to customer service requests), to analyze and improve the WAE Services, and to 
                conduct marketing. If you register for email or if you provide your email address to us, we will send you 
                emails about a variety of topics such as events, new products, promotional offers from our affiliates or 
                other selected business partners, environmental issues, and employment opportunities. Please see 
                below for your choices regarding how we collect, use, and share your KYC.
              </p>
              <p className="mb-[20px]">
                We share email activity data with our marketing email provider to help them better target email 
                deployments to consumers. While our marketing email provider has access to email address and email 
                activity and may share bulk/non-specific activity data, no Email addresses or specific email actions are 
                ever shared with other third parties. Should a consumer wish to opt out of this sharing, that consumer 
                simply needs to opt out of marketing email from us.
              </p>
              <p className="mb-[20px]"> 
                Our Website/App uses the GPS feature of your mobile device to determine the 
                location of the device. We and our third-party vendors or partners may collect and use this geographic 
                location data for purposes such as the functioning of the App, to make our advertising more relevant, 
                and to improve WAE Services. We do not store geographic location data in combination with KYC. 
                If you do not want us or third parties to collect and use your device’s geographic location, you can 
                control this function in your application settings (if your device offers this type of control), by disabling 
                location services for your device, or by uninstalling the App, but these choices will affect your ability
                to use the App.
              </p>
              <p className="mb-[20px]"> <strong>Non-Personal Information: </strong>
                We automatically collect certain non-personal information when you use 
                WAE Services. For example, we collect information about the devices you use to connect to our services 
                (such as the IP address of your computer or numeric identifier of your mobile device) and about how you 
                use WAE Services (such as what time you visit our websites). We, and our advertisers and ad servers, 
                may also collect non-personal information outside the WAE Services to measure the success of our 
                advertising campaigns. We use the non-personal information that we collect for a variety of purposes 
                such as to provide and improve the WAE Services, and to analyze and offer our advertising.
              </p>
              <p className="mb-[20px]">
                Our website also uses third-party analytics vendors such as Google Analytics. Please click here for more 
                information about how data is collected and processed in connection with the Google Analytics service: 
                www.google.com/policies/privacy/partners/. We and our third-party vendors or partners use analytics 
                data for a variety of purposes such as to improve the design and content of our websites, to help us 
                learn things like what pages are most attractive to all of our visitors and what promotions visitors like to 
                see, and to gauge the success of our advertising campaigns.
              </p>
              <p className="mb-[20px]"> <strong>Information You Post: </strong>
                All information that you share about yourself, whether KYC or not, in a public 
                open forum – such as on a social network – will be considered public information for the purposes of this 
                policy. If you don’t want it to be public, please don’t post it.
              </p>
              <p> <strong>Legal Basis for Processing: </strong>
                We process personal data based on various legal grounds: contract 
                necessity (e.g., fulfilling an order), legitimate interests (e.g., customer service improvement), user 
                consent (e.g., marketing opt-ins), and legal obligations (e.g., tax or accounting compliance), as required 
                under applicable data protection regulations such as the GDPR.
              </p>
            </div>
          </div>
        </div>

        {/* HOW WE SHARE INFORMATION Section */}
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
              HOW WE SHARE INFORMATION
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
                We do not disclose your KYC to third parties, except as follows:
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                  After giving you notice and an opportunity to choose not to share the information.
                </li>
                <li className="mb-[12px]">
                  To companies that provide services to us or perform functions on our behalf (such as processing credit card payments or taking orders) and have agreed to use your information only for the purposes we request.
                </li>
                <li className="mb-[12px]">
                  For us to send offers to WAE customers on behalf of our affiliated companies and on behalf of other non-affiliated partners (such as environmental groups that we support).
                </li>
                <li className="mb-[12px]">
                  To other selected reputable companies, we may disclose your name and postal address (but not your email address or credit card information) so that they can mail you information that may interest you.
                </li>
                <li className="mb-[12px]">
                  When we believe disclosure is appropriate to comply with applicable law, legal process, and/or governmental authorities.
                </li>
                <li className="mb-[12px]">
                  When we believe disclosure is appropriate to enforce our Terms of Use and other agreements, or to protect our rights, our customers, our property, our employees, or others.
                </li>
                <li className="mb-[12px]">
                  If we are involved in a merger, acquisition, bankruptcy, partial or total sale of assets, or other corporate change.
                </li>
              </ul>
              <p className="mb-[20px]">
                We may disclose de-identified, aggregated, or other non-personal information to third parties in our discretion. The WAE Services or our offerings on social media platforms may include commenting, forums, sharing, or other similar features. Information that you provide using these features may be available to other users or the general public.
              </p>
              <strong>
                International Data Transfers: If personal data is transferred outside India or the European Economic Area, WAE ensures appropriate safeguards are in place such as Standard Contractual Clauses (SCCs) or transfers to countries with an adequacy decision by relevant authorities.
              </strong>
            </div>
          </div>
        </div>

        {/* YOUR CHOICES Section */}
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
              YOUR CHOICES
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
                With your KYC you always have the option to change or correct your information and the choice of not hearing from us again. There are several ways you can control our use of your KYC in connection with marketing and promotions.
              </p>
              <ul className="mb-[20px] custom-bullet" style={{ lineHeight: "120%" }}>
                <li className="mb-[12px]">
                  To remove your name from our lists. You can choose to decline communications from us at the point that we request your KYC. After we have collected your KYC, you can choose to stop our communications or our service, or stop us from sharing your information with other companies for their marketing purposes. To exercise any of these options, please contact us by mail, email, or telephone using the contact information below.
                </li>
                <li className="mb-[12px]">
                  To stop email communications. If you receive email communications from us and want to opt out of receiving such communications in the future, you can click the “Unsubscribe” link at the bottom of the promotional email.
                </li>
                <li className="mb-[12px]">
                To stop collection of geographic location. If you do not want us to collect your device’s geographic location through our App, you can disable that function when you first use the App or in your device settings. This will prevent you from using some features of the App.
                </li>
                <li className="mb-[12px]">
                  Other choices. Please see below to learn about your choices with regard to our use of cookies and interest-based advertising.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CORRECTING OR UPDATING YOUR INFORMATION */}
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
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              CORRECTING OR UPDATING YOUR INFORMATION
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
                If you would like to request changes to the KYC that you have previously provided to us, please contact us by mail, email, or telephone using the contact information below.
              </p>
            </div>
          </div>
        </div>

        {/* COOKIES */}
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
              COOKIES
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
                We may use “cookies,” “web beacons,” and other similar technologies to collect information in connection with the WAE Services and our advertisements. A “cookie” is a computer file that acts as an identification card for your computer to distinguish your browser from others and enable us to serve you better. For example, we use cookies to save products in your shopping cart while you browse our websites and to track the effectiveness of our marketing and advertising campaigns. Similarly, a “web beacon” is a technology that can recognize specific cookies and convey information about that browser. We do not use these technologies to collect KYC. We may also use technologies, such as our own cookies, to provide you with personalized online display advertising tailored to your interests.
              </p>
              <p className="mb-[20px]">
                Most browsers accept cookies automatically. You may be able to set your browser to reject and/or delete cookies. For instructions, check your browser’s technical information. However, if you reject or delete cookies then this may disable or interfere with features of the WAE Services or other websites you visit. We recommend that you leave cookies “turned on” so we can offer you a better shopping experience on our sites.
              </p>
              <strong>
                Data Retention: We retain personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. For example, customer support interactions may be stored for 3 years, marketing consents for 5 years, and anonymized data indefinitely for statistical purposes.
              </strong>
            </div>
          </div>
        </div>

        {/* INTEREST-BASED ADVERTISING */}
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
                fontSize: "32px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              INTEREST-BASED ADVERTISING
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
                We may work with third-party advertising companies that collect and use information about your online activities across sites over time, in order to deliver more relevant advertising when you are using the WAE Services and elsewhere on the Internet. This practice is known as interest-based advertising. You may visit www.aboutads.info to learn more and to opt out of this type of advertising by companies participating in the Digital Advertising Alliance self-regulatory program. We do not operate or control this site, and are not responsible for the opt-out choices available there. Note that electing to opt out will not stop advertising from appearing in your browser or applications. It may make the ads you see less relevant to your interests. If you delete, block or otherwise restrict cookies or use a different computer or Internet browser, you may need to renew your opt-out choice.
              </p>
            </div>
          </div>
        </div>

        {/* CHILDREN */}
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
              CHILDREN
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
                The online WAE Services are not intended for the use of individuals under the age of 13, and we do not knowingly collect information online from individuals under the age of 13.
              </p>
              <strong>
                If WAE becomes aware that personal data has been inadvertently collected from a child under 13, appropriate steps will be taken to delete such information promptly.
              </strong>
            </div>
          </div>
        </div>

        {/* Links to Third Parties and Social Media */}
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
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              LINKS TO THIRD PARTIES AND SOCIAL MEDIA
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
                Our websites and App may contain links to third-party online properties. Such third parties have their own policies that govern their collection, use, and disclosure of information. We suggest that you read their privacy policies to learn about their practices.
              </p>
              <p>
                Social media provides tools that many of our customers use and enjoy, and we include links to various social media platforms on our websites. If you interact with these social media tools through our websites, your experience on those social media sites will be governed by the privacy and other policies of those sites. So, the privacy settings you have chosen on those sites will determine the degree to which your information is made public. We encourage you to choose your privacy settings on those sites accordingly.
              </p>
            </div>
          </div>
        </div>

        {/* SAFEGUARDING YOUR KYC */}
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
              SAFEGUARDING YOUR KYC
            </h3>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099",
              }}
            >
              <p className="mb-[20px]">
                We have reasonable and appropriate physical, electronic, and administrative measures in place to safeguard the security of your personal information. However, when you communicate with customer service via email or chat on our websites, these communications may not be encrypted. For that reason, we ask that you do not share sensitive information via these communication channels.
              </p>
              <strong>
                We continuously assess and improve our data security practices to ensure alignment with applicable data protection standards.
              </strong>
            </div>
          </div>
        </div>

        {/* UPDATES TO THE PRIVACY POLICY */}
        <div>
          <div
            className="grid grid-cols-2"
            style={{ justifyContent: "space-between" }}
          >
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
              UPDATES TO THE PRIVACY POLICY
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
                If we modify this Privacy Policy, we will post the revised Privacy Policy online. We will notify you if the policy changes in any material way by sending a notice to the email address you provided us or by placing a prominent notice on our website at www.waecorp.com. You should check regularly to see if this Privacy Policy has changed.
              </p>
              <strong>
                The "Last Updated" date at the top of this page will reflect the most recent changes.
              </strong>
              <div className="mb-[20px]"></div>
              <p>
                CONTACT US If you have any questions about this Privacy Policy, you can email, write, or call us: privacyterms@waecorp.com H-18 Sector 63 Noida. 201301 India 120-4069800
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
