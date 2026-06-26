"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CookieConsent() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [acceptHovered, setAcceptHovered] = useState(false)
  const [necessaryHovered, setNecessaryHovered] = useState(false)
  const [closeHovered, setCloseHovered] = useState(false)
  const [privacyHovered, setPrivacyHovered] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("wae_cookie_consent")
    if (!consent) {
      // Delay visibility slightly for smoother entrance and layout stability
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("wae_cookie_consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("wae_cookie_consent", "declined")
    setIsVisible(false)
  }

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/secret-cms-login")) return null
  if (!isVisible) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        animation: "fadeIn 0.35s ease-out forwards",
      }}
    >
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "598px", // 201px (Btn1) + 201px (Btn2) + 10px (gap) + 186px (padding left + right) = 598px
          backgroundColor: "#003c58",
          padding: "71px 93px", // py-71px px-93px
          borderRadius: "0px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          fontFamily: "'Inter Tight', sans-serif",
          color: "#FFFFFF",
          boxSizing: "border-box",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          type="button"
          style={{
            position: "absolute",
            top: "26px", // mt-26
            right: "26px", // mr-26
            width: "34px",
            height: "34px",
            background: "none",
            border: "none",
            color: "#FFF",
            opacity: closeHovered ? 1 : 0.7,
            cursor: "pointer",
            transition: "opacity 0.2s ease",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close cookie consent"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h3
          style={{
            margin: "0 0 26px 0", // 26px gap below title
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "105%",
            letterSpacing: "0%",
            verticalAlign: "middle",
          }}
        >
          We Use cookies!
        </h3>

        {/* Description */}
        <p
          style={{
            margin: "0 0 77px 0", // 77px gap below description
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0%",
            verticalAlign: "middle",
            color: "#AEAEAE",
          }}
        >
          A better browsing experience starts here. We use cookies to personalize content, understand how you interact with our website, and continuously improve every visit. By continuing, you agree to our Cookie Policy.
        </p>

        {/* Buttons Row */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          {/* Accept All Button */}
          <button
            onClick={handleAccept}
            onMouseEnter={() => setAcceptHovered(true)}
            onMouseLeave={() => setAcceptHovered(false)}
            type="button"
            style={{
              width: "201px",
              background: acceptHovered ? "transparent" : "#FFF",
              border: "1.5px solid #FFF",
              borderRadius: "0px",
              color: acceptHovered ? "#FFF" : "#003c58",
              padding: "13px 0",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              boxSizing: "border-box",
            }}
          >
            Accept All
          </button>

          {/* Accept Necessary Button */}
          <button
            onClick={handleDecline}
            onMouseEnter={() => setNecessaryHovered(true)}
            onMouseLeave={() => setNecessaryHovered(false)}
            type="button"
            style={{
              width: "201px",
              background: necessaryHovered ? "#FFF" : "transparent",
              border: "1.5px solid #FFF",
              borderRadius: "0px",
              color: necessaryHovered ? "#003c58" : "#FFF",
              padding: "13px 0",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              boxSizing: "border-box",
            }}
          >
            Accept Necessary
          </button>
        </div>

        {/* Cookie Policy Link */}
        <div style={{ textAlign: "left" }}>
          <Link
            href="/cookie-policy"
            onMouseEnter={() => setPrivacyHovered(true)}
            onMouseLeave={() => setPrivacyHovered(false)}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              verticalAlign: "middle",
              color: "#FFF",
              textDecoration: "underline",
              opacity: privacyHovered ? 1 : 0.85,
              transition: "opacity 0.2s ease",
            }}
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
