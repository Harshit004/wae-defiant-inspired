"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface StatusQuoPopupProps {
  className?: string
}

export default function StatusQuoPopup({ className = "" }: StatusQuoPopupProps) {
  const [isVisible, setIsVisible] = useState(true)
  // Initially null so CSS calc(100vh - 105px) works immediately on first render
  const [topOffset, setTopOffset] = useState<number | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      // Measure the visual WhatsApp icon if rendered by AiSensy
      const svgIcon =
        document.querySelector("#df-btn-cont .df-svg-icon") ||
        document.querySelector(".df-svg-icon")
      const btnText =
        document.querySelector("#df-btn-cont .df-btn-text") ||
        document.querySelector(".df-btn-text")
      const waBtn =
        document.querySelector("#df-btn-cont .df-btn") ||
        document.querySelector(".df-btn")

      const waTarget = (svgIcon || btnText || waBtn) as HTMLElement | null

      // Baseline: WhatsApp widget sits at bottom: 22px, icon height: 60px -> top is at 82px from viewport bottom
      let waTopFromViewportBottom = 82

      if (waTarget) {
        const rect = waTarget.getBoundingClientRect()
        // If only outer button wrapper was found, adjust for inner margin inside .df-btn
        const isButtonWrapper = !svgIcon && waTarget === waBtn
        const visualTop = isButtonWrapper ? rect.top + 15 : rect.top
        const calculated = window.innerHeight - visualTop
        if (calculated > 20 && calculated < window.innerHeight) {
          waTopFromViewportBottom = calculated
        }
      }

      // Exact target: popup bottom edge sits 23px above the floating WhatsApp widget
      const targetBottomFromViewportBottom = waTopFromViewportBottom + 23

      // Convert to #hero local coordinate:
      // At scrollY=0, hero starts at top: 0, so bottom edge of popup should sit at
      // (window.innerHeight - targetBottomFromViewportBottom) from the top of hero.
      // Combined with transform: translateY(-100%), style.top is exactly this coordinate.
      const computedTopInHero = Math.round(window.innerHeight - targetBottomFromViewportBottom)
      setTopOffset(computedTopInHero)
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)

    // Observe dynamic insertion and styling of the AiSensy WhatsApp widget
    const observer = new MutationObserver(() => {
      updatePosition()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const interval = setInterval(updatePosition, 300)
    const timeout = setTimeout(() => clearInterval(interval), 5000)

    return () => {
      window.removeEventListener("resize", updatePosition)
      observer.disconnect()
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  return (
    <div
      style={{
        top: topOffset !== null ? `${topOffset}px` : "calc(100vh - 105px)",
        transform: "translateY(-100%)",
      }}
      className="absolute right-0 z-30 pointer-events-none"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`pointer-events-auto
              w-[calc(100vw-24px)] max-w-[426px] md:w-[clamp(320px,29.58vw,426px)]
              bg-[#094063]
              px-[clamp(16px,1.39vw,20px)] py-[clamp(18px,2.76vh,24px)]
              shadow-[0_8px_32px_rgba(0,0,0,0.36)]
              ${className}`}
          >
            <div className="flex items-start gap-[clamp(12px,1.11vw,16px)]">
              {/* Top-left Circle 36x36 with 24x24 icon */}
              <div className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full bg-[#1D668F] flex items-center justify-center shrink-0">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e9a75c2-ffd4-400a-08c0-a54aac4a4200/public"
                  alt="Status Quo Announcement"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] object-contain"
                  priority
                />
              </div>

              {/* Right Column: Title + Cross, Body Text, Continue Browsing */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                {/* Top Header Row: Headline + 11.3x11.3 Cross */}
                <div className="flex items-center justify-between gap-2">
                  <h3
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "#FFFFFF",
                    }}
                    className="text-[12px] font-normal leading-[100%] text-white text-left m-0"
                  >
                    We’re here to disrupt the status quo !
                  </h3>

                  <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Close"
                    className="text-white hover:opacity-75 transition-opacity p-0 shrink-0 cursor-pointer focus:outline-none flex items-center justify-center"
                    style={{ width: "11.3px", height: "11.3px" }}
                  >
                    <svg
                      width="11.3"
                      height="11.3"
                      viewBox="0 0 11.3 11.3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "11.3px", height: "11.3px" }}
                    >
                      <path
                        d="M1 1L10.3 10.3M1 10.3L10.3 1"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Description Copy */}
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#AEAEAE",
                  }}
                  className="mt-[clamp(8px,1vh,12px)] mb-[clamp(12px,1.5vh,16px)] text-left"
                >
                  Our new website traces the origins of WAE’s water activism. We began by challenging how water is treated, delivered and consumed. We’re continuously engineering better ways to do all three. Feel free to look around while we put the finishing touches on new features and content. The refreshed site goes live on 1 January 2027.
                </p>

                {/* Bottom Action: Continue Browsing */}
                <button
                  type="button"
                  onClick={handleDismiss}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                  }}
                  className="text-[12px] font-medium leading-[100%] text-white text-left hover:underline underline-offset-4 transition-all cursor-pointer w-fit p-0 focus:outline-none"
                >
                  Continue browsing
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
