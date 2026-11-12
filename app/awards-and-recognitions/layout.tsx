import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Awards & Recognitions | Celebrating Innovation & Sustainability",
  description: "Explore the prestigious industry awards, design accolades, and green certifications honoring WAE's pioneering water technologies and ESG leadership.",
  keywords: "Awards, Accolades, Certifications, Sustainability Leadership",
  alternates: {
    canonical: "/awards-and-recognitions",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
