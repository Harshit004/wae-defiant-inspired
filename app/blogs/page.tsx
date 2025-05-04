"use client"

import type React, { FC } from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from "next/link" // Import the Link component

// Shared container class for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
}

/**
 * Reusable hover button component.
 */
const HoverButton: FC<HoverButtonProps> = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
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
        fontSize: "10px",
        lineHeight: "100%",
        textTransform: "uppercase",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
      }}
    >
      {children(hovered)}
    </button>
  );
};

// Placeholder for blog post data
const blogPosts = [
  {
    imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bcfbeffa-a552-47b4-3551-f14a51f2bd00/public",
    title: "Water Conservation",
    description: "How to reduce your water foot print : From Shower to shopping. Why every drop count : Understanding the Global Crisis",
  },
  {
    imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bcfbeffa-a552-47b4-3551-f14a51f2bd00/public",
    alt: "blog image",
    title: "Policy",
    description: "Who owns water : Water rights and access. Why water should be a human right -and to make it happen. Water inequality",
  },
  {
    imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bcfbeffa-a552-47b4-3551-f14a51f2bd00/public",
    title: "Climate Change and Water",
    description: "The link between climate  change and water scarcity. Melting Glacier -Rising Risk : Climate change and fresh water supplies. How draughts are reshaping global water politics",
  },
  {
    imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bcfbeffa-a552-47b4-3551-f14a51f2bd00/public",
    title: "Industry Impact and Solutions",
    description: "The hidden water cost of manufacturing -what business needs to know. Green Infra -How cities can manage waste water",
  },
  {
    imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bcfbeffa-a552-47b4-3551-f14a51f2bd00/public",
    title: "Technology",
    description: "How smart irrigation is transforming agriculture. Desalination -Cab it solve the world water shortages. Water from Air -The future of water",
  },
];

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
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ]
  const blueprintItems = [
    { text: "Sustainability", href: "#" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ]

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
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "#00000066",
                }}
              >
                20.5937° N
                <br />
                78.9629° E
              </div>

              {/* Tagline Animation */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
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
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <Link href={item.href}>
                      <div className="c--anim-btn"> {/* Apply className here */}
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
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <Link href={item.href}>
                      <div className="c--anim-btn"> {/* Apply className here */}
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

      {/* Blogs Heading */}
      <div className={containerClass} style={{ marginTop: "180px" }}>
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "48px",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginBottom: "180px",
          }}
        >
          BLOGS
        </h2>

        {/* Blog Posts Section */}
        <div>
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className={`flex items-start space-x-8 justify-between ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                style={{ marginBottom: index < blogPosts.length - 1 ? '180px' : '0' }}
              >
                {/* Image */}
                <div className="w-[320px] h-[320px] relative overflow-hidden">
                  {index === 1 ? ( // Check if it's the second blog post (index 1)
                    <Image
                      src={post.imageUrl}
                      alt={post.alt}
                      style={{
                        filter: "grayscale(100%)",
                        transition: "filter 0.5s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                      width={320}
                      height={320}
                    />
                  ) : (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>

                {/* Title, Description, and Button */}
                <div className="flex-1 flex flex-col justify-between" style={{ maxWidth: '320px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        marginBottom: "40px",
                      }}
                    >
                      {post.description}
                    </p>
                  </div>
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Know More
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
                </div>
              </div>
            ))}
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