"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import RelatedCard from "../components/related-card"

// A reusable button component with the hover effect:
// On hover, the button background becomes black, text becomes white, and the icon image changes.
function HoverButton({ children }: { children: (hovered: boolean) => React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-[16px] py-[12px]"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        letterSpacing: "0%",
        verticalAlign: "middle",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
        transition: "all 650ms ease", // This adds the fade in effect
      }}
    >
      {children(hovered)}
    </button>

  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const sections = ["hero"] // We only have 'hero' now

  // =======================
  // 1) TIME IN INDIA
  // =======================
  useEffect(() => {
    const updateIndiaTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }
      const indiaTime = new Date().toLocaleTimeString("en-US", options)
      setCurrentTime(indiaTime)
    }
    updateIndiaTime()
    const interval = setInterval(updateIndiaTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // =======================
  // 2) HERO IN-VIEW
  // =======================
  const [heroRef, heroInView] = useInView({ threshold: 0.5 })
  useEffect(() => {
    if (heroInView) setActiveSection(0)
  }, [heroInView])

  // =======================
  // 3) SCROLL-DRIVEN ANIMATION
  // =======================
  const { scrollYProgress } = useScroll()
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1])

  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"])
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0])
  const finalPurposeOpacity = useTransform(
    [purposeOpacity, purposeVanish],
    ([pO, pV]) => pO * pV
  )

  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"])
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0])
  const finalIndiaOpacity = useTransform(
    [indiaOpacity, indiaVanish],
    ([iO, iV]) => iO * iV
  )

  // =======================
  // 4) MENU ARRAYS
  // =======================
  const productsItems = [
    "Products & Solutions A",
    "Products & Solutions B",
    "Products & Solutions C",
    "Products & Solutions D",
  ]
  const blueprintItems = [
    "Blueprint 1",
    "Blueprint 2",
    "Blueprint 3",
  ]
  const lineCount = Math.min(productsItems.length, blueprintItems.length)

  return (
    <main className="relative">
      {/* ============================
          HEADER (unchanged)
      ============================ */}
      <header className="w-full bg-white" style={{ marginBottom: 0 }}>
        <div className="mx-auto w-full max-w-[1440px] px-[140px]">
          {/* TOP ROW */}
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
            <div style={{ color: "#00000066" }}>NOIDA</div>
            <div style={{ color: "#00000066" }}>INDIA</div>
            <div>{currentTime}</div>
            <div style={{ color: "#00000066" }}>Products &amp; Solutions</div>
            <div style={{ color: "#00000066" }}>News &amp; Updates</div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-5 items-start">
            {/* 1) Logo under NOIDA */}
            <div className="flex flex-col justify-center">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                alt="WAE Logo"
                width={77.53575134277344}
                height={82.03529357910156}
              />
            </div>

            {/* 2) Image under INDIA */}
            <div className="flex flex-col justify-center">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/45c6555a-9bdb-4f8a-3958-0df6cd00ac00/public"
                alt="WAE Text"
                width={44.00027084350586}
                height={18.93841552734375}
              />
            </div>

            {/* 3) Tagline under TIME */}
            <div className="flex flex-col justify-center">
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "10px",
                  lineHeight: "125%",
                  letterSpacing: "0px",
                  // textTransform: "uppercase",
                  color: "#00000066",
                }}
              >
                Light out for the territory
                <br />
                ahead of the rest.
              </div>
            </div>

            {/* 4) Products & Solutions items */}
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
                  {/* Vertical slide container for menu item */}
                  <div className="c--anim-btn">
                    <span className="c-anim-btn">{item}</span>
                    <span>{item}</span>
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
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 5) Blueprint items */}
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
                    <span className="c-anim-btn">{item}</span>
                    <span>{item}</span>
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
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ============================
          HERO SECTION (VIDEO)
      ============================ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-[590px] w-full overflow-hidden"
      >
        <video
          src="/a337333f-cbd25ca9.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Text Overlay */}
        <div
          className="absolute"
          style={{
            top: "350px",
            left: "60%",
            width: "393px",
            height: "159px",
            color: "#000",
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "48px",
            lineHeight: "110%",
            letterSpacing: "0%",
            verticalAlign: "middle",
          }}
        >
          We are <br />
          disrupting the <br />
          status quo
        </div>
      </section>

      {/* ============================
          SCROLL CONTAINER
      ============================ */}
      <motion.div style={{ height: "300vh", position: "relative", zIndex: 1000 }} className="bg-[#F2F2F2]">
        {/* PINNED LOGO IN CENTER */}
        <motion.div
          style={{
            position: "sticky",
            top: "25%",
            zIndex: 1100,
            opacity: logoOpacity,
          }}
          className="pointer-events-none flex justify-center"
        >
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
            alt="Center Logo"
            width={310}
            height={310}
            className="opacity-80"
          />
        </motion.div>

        {/* OUR PURPOSE SECTION */}
        <section
          className="h-screen flex items-end justify-center"
          style={{ position: "relative" }}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div
              style={{ width: "1160px", height: "115px" }}
              className="flex justify-between items-start"
            >
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "3.625rem",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                About WAE
              </h2>

              <div
                style={{
                  width: "251px",
                  height: "115px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#00000099",
                  }}
                >
                  The underlying natural order of the universe - circular continuity of the natural world. Undifferentiated, endlessly self-replenishing, immensely powerful and impassively generous.
                </p>
                <HoverButton>
                  {(hovered) => (
                    <>
                      Know More
                      <Image
                        src={
                          hovered
                            ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                            : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        }
                        alt="icon"
                        width={16}
                        height={16}
                      />
                    </>
                  )}
                </HoverButton>
              </div>
            </div>
          </motion.div>
        </section>

        {/* MADE IN INDIA SECTION */}
        <section
          className="h-screen flex items-end justify-center"
          style={{ position: "relative" }}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div style={{ width: "1160px" }} className="flex justify-between">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "3.625rem",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                Made in India
              </h2>
              <div
                style={{
                  width: "251px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "12px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#00000099",
                  }}
                >
                  WAE captures the heart of Indian innovation by seamlessly blending the time-honoured ideals with the latest technology. We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations for the country’s advancements, integrity & innovation. Our approach strengthens community resilience while showcasing India’s Intellectual capital on the world stage.
                </p>
                <HoverButton>
                  {(hovered) => (
                    <>
                      Know More
                      <Image
                        src={
                          hovered
                            ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                            : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        }
                        alt="icon"
                        width={16}
                        height={16}
                      />
                    </>
                  )}
                </HoverButton>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>

      {/* INLINE CSS for vertical slide hover animation and arrow emergence */}
      <style jsx>{`
        .c--anim-btn span {
          color: black;
          text-decoration: none;
          text-align: left;
          display: block;

          font-family: 'Arial', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 100%;
          letter-spacing: 0px;
        }

        .c--anim-btn,
        .c-anim-btn {
          transition: 0.5s;
        }

        .c--anim-btn {
          /* Container is only 12px tall */
          height: 12px;
          overflow: hidden;
        }

        /* The top line starts at margin-top: 0 */
        .c-anim-btn {
          margin-top: 0em;
        }

        /* On hover, shift top line by -12px */
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
      `}</style>

      {/* RELATED INFORMATION SECTION */}
      <section className="max-w-[72.5rem] mx-auto mb-[9.72%]">
        <h2 className="font-helvetica text-[3.63rem] leading-[110%] tracking-[0%] align-middle font-normal uppercase md:whitespace-nowrap mb-[2.5rem] mt-[7.5rem]">
          Related Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c32e685-fbfe-4edb-0e63-4bbf261b3100/public"
            title="Awards and Other Information"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/67063015-a309-4a59-9247-c67c4efea500/public"
            title="News And Updates"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={162}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/efbc7ed9-3a44-4bea-0cab-e1f7ba555500/public"
            title="Impact We Enable For You"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={200}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/afdeb7b4-18e6-4bc2-0ed8-85d97cb6dc00/public"
            title="Our Sustainable Water Solutions"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={238}
          />
        </div>
      </section>
    </main>
  )
}
