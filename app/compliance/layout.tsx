import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Compliance & Standards | WAE",
  description: "Learn about WAE's rigorous adherence to regulatory, environmental, quality, and water safety standards across operations and manufacturing.",
  keywords: "Compliance, Standards, Water Quality, Certification",
  alternates: {
    canonical: "/compliance",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
