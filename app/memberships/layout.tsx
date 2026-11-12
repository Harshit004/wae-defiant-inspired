import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Memberships | Water Industry Associations",
  description: "Explore WAE memberships, including IWQA and IWA, and see how industry connections support quality, safety, and sustainable water solutions.",
  alternates: {
    canonical: "/memberships",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
