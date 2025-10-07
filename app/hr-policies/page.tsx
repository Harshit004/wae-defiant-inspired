"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from 'next/link';

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

      {/* HR Policy Heading */}
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
          HR Policy
        </h2>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus sagittis placerat. Vestibulum tellus purus, volutpat at nisl ac, convallis ornare nisl. Aenean sagittis rutrum erat, at lacinia sem vulputate sed. Morbi commodo arcu a nisi luctus, at condimentum odio tempor. Nulla pulvinar bibendum vestibulum. Vivamus rutrum mollis tortor vitae lacinia. Suspendisse a ante sit amet lacus facilisis feugiat. Fusce quis magna erat.
        </p>

        {/* Leave Policy Section */}
        <div className="mb-[80px]">
          <div
            className="grid grid-cols-2 gap-y-[80px]"
            style={{ justifyContent: "space-between" }}
          >
            {/* Left Column: Subheading */}
            <h3
              style={{
                width: "55%",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "130%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#000",
              }}
            >
              LEAVE POLICY:	
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
              To specify the guidelines related to Leave. It navigates the dual imperatives of meeting business objectives and supporting the personal and health needs of employees. It defines the types of leave available, eligibility criteria, accrual mechanisms, procedural requirements, and the rights and obligations of both employees and the organization.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Policy Section */}
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
              ATTENDANCE POLICY (CORPORATE & PLANT):
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
              <p className="mb-[20px]">
              This policy aims to define clear standards regarding attendance, work hours, remote presence, and leave regularization, while also accommodating the need for flexibility and employee well-being. It seeks to balance structure and empathy, reinforcing our belief that high performance is best achieved through trust, transparency, and professionalism.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* loan policy */}
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
              LOAN POLICY:
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
              <p className="mb-[20px]">
              To provide financial support to employees during financial crisis to meet certain defined personal exigencies.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* grievance redressal policy */}
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
              GRIEVANCE REDRESSAL POLICY:
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
              <p className="mb-[20px]">
              Employee Grievance Redressal Policy is not only about resolving issues; it is about building trust and ensuring that every employee feels safe and valued. By setting out clear steps, timelines, and responsibilities, we assure that no concern will be ignored, and every voice will be taken seriously.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* exit policy */}
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
              EXIT POLICY:
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
              <p className="mb-[20px]">
              To facilitate seamless exit of the employee from the organization which helps in maintaining transparency and mutual respect during the exit process.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* referral policy */}
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
              REFERRAL POLICY:
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
              <p className="mb-[20px]">
              This policy attracts high-quality talent efficiently by leveraging current employees’ networks, reducing hiring costs, and enhancing cultural fit.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORT POLICY FOR THE FAMILIES OF DECEASED EMPLOYEE policy */}
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
              SUPPORT POLICY FOR THE FAMILIES OF DECEASED EMPLOYEE:
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
              <p className="mb-[20px]">
              The purpose of this policy is to ensure that in the unfortunate event of the death of a serving employee, the company extends compassionate and structured support to the surviving family.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* POLICY ON INTERNAL JOB POSTING policy */}
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
              POLICY ON INTERNAL JOB POSTING:
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
              <p className="mb-[20px]">
              To promote internal career growth by providing employees with transparent access to job opportunities within the organization.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* L&D POLICY */}
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
              L&D POLICY:
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
              <p className="mb-[20px]">
              This Learning & Development (L&D) policy reflects our unwavering commitment to creating a future-ready, skilled, and agile workforce. It provides a structured framework to promote continuous learning, professional excellence, and leadership capability at every level of the organization.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* TALENT DEVELOPMENT policy */}
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
              TALENT DEVELOPMENT POLICY:
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
              <p className="mb-[20px]">
              To foster a culture of continuous learning, professional growth, and meaningful employee engagement that aligns with our purpose—Being Sustainable.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* EMPLOYEE ASSISTANCE & COUNSELLING POLICY */}
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
              EMPLOYEE ASSISTANCE & COUNSELLING POLICY:
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
              <p className="mb-[20px]">
              The objective of this policy is to create a supportive and caring workplace by providing professional and confidential counselling and support services to employees dealing with personal, psychological, emotional, or work-related challenges.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* POLICY ON PREVENTION OF ABUSE & RELIGIOUS NEUTRALITY policy */}
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
              POLICY ON PREVENTION OF<br />ABUSE & RELIGIOUS<br />NEUTRALITY:
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
              <p className="mb-[20px]">
              To ensure a safe, respectful, and inclusive environment by preventing abuse and upholding religious neutrality in the workplace.
              </p>
              <div className="mt-10">
                <Link href="#" className="contents">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Read More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
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
