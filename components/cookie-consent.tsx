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
    window.dispatchEvent(new Event("wae_cookie_consent_updated"))
  }

  const handleDecline = () => {
    localStorage.setItem("wae_cookie_consent", "declined")
    setIsVisible(false)
    window.dispatchEvent(new Event("wae_cookie_consent_updated"))
  }

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/secret-cms-login")) return null
  if (!isVisible) return null

  return (
    <div
      className="cookie-consent-overlay"
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
        body.mobile-blocked .cookie-consent-overlay {
          display: none !important;
        }

        .cookie-modal-box {
          position: relative;
          width: 50.97vw; /* 734px at 1440px */
          height: 31.11vw; /* 448px at 1440px */
          background-color: #003c58;
          padding: 4.93vw 6.45vw; /* py-71px px-93px relative to 1440px */
          border-radius: 0px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: 'Inter Tight', sans-serif;
          color: #FFFFFF;
          box-sizing: border-box;
        }

        .cookie-title {
          margin: 0 0 26px 0;
          font-family: 'Inter Tight', sans-serif;
          font-weight: 400;
          font-size: 32px;
          line-height: 105%;
          letter-spacing: 0%;
          vertical-align: middle;
        }

        .cookie-desc {
          margin: 0 0 77px 0;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 130%;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #AEAEAE;
        }

        .cookie-buttons-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
          width: 100%;
        }

        .cookie-link {
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #FFF;
          text-decoration: underline;
        }

        /* Mobile Adjustments */
        @media (max-width: 767px) {
          .cookie-modal-box {
            width: calc(100vw - 32px);
            height: auto;
            padding: 56px 30px;
          }
          .cookie-title {
            margin-bottom: 22px;
            font-size: 28px;
            line-height: 105%;
          }
          .cookie-desc {
            margin-bottom: 56px;
            font-size: 12px;
            line-height: 120%;
          }
          .cookie-buttons-row {
            gap: 16px;
            margin-bottom: 22px;
          }
          .cookie-link {
            font-size: 12px;
            line-height: 100%;
          }
        }
      `}</style>

      <div className="cookie-modal-box">
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
        <h3 className="cookie-title">
          We Use cookies!
        </h3>

        {/* Description */}
        <p className="cookie-desc">
          A better browsing experience starts here. We use cookies to personalize content, understand how you interact with our website, and continuously improve every visit. By continuing, you agree to our Cookie Policy.
        </p>

        {/* Buttons Row */}
        <div className="cookie-buttons-row">
          {/* Accept All Button */}
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
              padding: "13px 0",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
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
              flex: 1,
              background: necessaryHovered ? "#FFF" : "transparent",
              border: "1.5px solid #FFF",
              borderRadius: "0px",
              color: necessaryHovered ? "#003c58" : "#FFF",
              padding: "13px 0",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
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
            className="cookie-link"
            style={{
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
