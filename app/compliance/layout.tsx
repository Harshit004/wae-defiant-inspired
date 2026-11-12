import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Compliance | Certified Sustainable Standards",
  description: "Explore WAE compliance, certifications, and standards that support safe, sustainable manufacturing and reliable hydration solutions.",
  alternates: {
    canonical: "/compliance",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
