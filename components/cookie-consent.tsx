"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

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
        bottom: "24px",
        right: "24px",
        left: "24px",
        maxWidth: "420px",
        backgroundColor: "rgba(15, 15, 15, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        padding: "20px",
        zIndex: 9999,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        animation: "slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fontFamily: "'Inter Tight', sans-serif",
        marginLeft: "auto", // Keeps it floating on the right on desktop
      }}
    >
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h4
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 500,
            color: "#FFF",
            letterSpacing: "0.02em",
          }}
        >
          Cookie Preferences
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            lineHeight: "1.5",
            color: "#AEAEAE",
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          We use cookies to enhance your experience, analyze site usage, and support our sustainability mission. Read our{" "}
          <Link
            href="/privacy-policy"
            style={{
              color: "#0081C9",
              textDecoration: "underline",
              transition: "color 0.2s ease",
            }}
            hover-style={{ color: "#FFF" }}
          >
            Privacy Policy
          </Link>{" "}
          to learn more.
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button
          onClick={handleDecline}
          type="button"
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
            color: "#FFF",
            padding: "8px 16px",
            fontSize: "11px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FFF"
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          type="button"
          style={{
            background: "#FFF",
            border: "1px solid #FFF",
            borderRadius: "6px",
            color: "#000",
            padding: "8px 16px",
            fontSize: "11px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "#FFF"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FFF"
            e.currentTarget.style.color = "#000"
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
