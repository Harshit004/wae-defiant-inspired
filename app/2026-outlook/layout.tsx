import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "2026 Outlook | Pioneering Sustainable Water Innovation",
  description: "Explore WAE's strategic 2026 outlook on next-generation water technologies, environmental stewardship, circular hydration, and sustainable design.",
  keywords: "2026 Outlook, Sustainable Water Technology, Innovation, Environmental Stewardship",
  alternates: {
    canonical: "/2026-outlook",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

