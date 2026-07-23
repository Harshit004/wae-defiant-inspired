"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const toggleVisibility = () => {
      // Appear after the hero section (approx 100vh)
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    // Check initially in case of page reload halfway down
    toggleVisibility()

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (pathname?.startsWith("/admin")) {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[85px] right-5 md:bottom-[100px] md:right-6 z-[9999] hover:opacity-80 transition-opacity flex items-center justify-center"
      style={{ width: "54px", height: "54px" }}
      aria-label="Scroll to top"
    >
      <Image
        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4a558429-0490-4c44-df30-94e4625a4600/public"
        alt="Scroll to top"
        width={54}
        height={54}
      />
    </button>
  )
}
