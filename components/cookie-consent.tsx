"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CookieConsent() {
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
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#003c58",
          padding: "48px",
          borderRadius: "0px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          fontFamily: "'Inter Tight', sans-serif",
          color: "#FFFFFF",
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
            top: "30px",
            right: "30px",
            background: "none",
            border: "none",
            color: "#FFF",
            opacity: closeHovered ? 1 : 0.7,
            cursor: "pointer",
            transition: "opacity 0.2s ease",
            padding: "4px",
          }}
          aria-label="Close cookie consent"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header Title */}
        <h3
          style={{
            margin: "0 0 24px 0",
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          We Use cookies!
        </h3>

        {/* Description Paragraph */}
        <p
          style={{
            margin: "0 0 40px 0",
            fontSize: "14px",
            lineHeight: "1.6",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "'Inter Tight', sans-serif",
          }}
        >
          Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.{" "}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#FFF",
              textDecoration: "underline",
              fontFamily: "inherit",
              fontSize: "inherit",
              cursor: "pointer",
              display: "inline",
            }}
          >
            Let me choose
          </button>
        </p>

        {/* Buttons Row */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
          <button
            onClick={handleAccept}
            onMouseEnter={() => setAcceptHovered(true)}
            onMouseLeave={() => setAcceptHovered(false)}
            type="button"
            style={{
              flex: 1,
              background: acceptHovered ? "transparent" : "#FFF",
              border: "1.5px solid #FFF",
              borderRadius: "0px",
              color: acceptHovered ? "#FFF" : "#003c58",
              padding: "14px 0",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              textAlign: "center",
            }}
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            onMouseEnter={() => setNecessaryHovered(true)}
            onMouseLeave={() => setNecessaryHovered(false)}
            type="button"
            style={{
              flex: 1,
              background: necessaryHovered ? "#FFF" : "transparent",
              border: "1.5px solid #FFF",
              borderRadius: "0px",
              color: necessaryHovered ? "#003c58" : "#FFF",
              padding: "14px 0",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              textAlign: "center",
            }}
          >
            Accept Necessary
          </button>
        </div>

        {/* Privacy Policy Link */}
        <div style={{ textAlign: "left" }}>
          <Link
            href="/privacy-policy"
            onMouseEnter={() => setPrivacyHovered(true)}
            onMouseLeave={() => setPrivacyHovered(false)}
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.9)",
              textDecoration: "underline",
              opacity: privacyHovered ? 1 : 0.85,
              transition: "opacity 0.2s ease",
            }}
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  )
}
