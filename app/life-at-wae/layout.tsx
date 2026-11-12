import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Life at WAE | Culture, People & Purpose",
  description: "Experience the vibrant, purpose-driven culture at WAE where changemakers innovate, collaborate, and pioneer the future of water.",
  keywords: "Life at WAE, Company Culture, Careers, Changemakers",
  alternates: {
    canonical: "/life-at-wae",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
