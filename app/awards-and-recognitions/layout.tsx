import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Awards & Recognition | Honours and Achievements",
  description: "Discover WAE awards and recognitions celebrating innovation, sustainability, quality, and leadership in hydration solutions.",
  alternates: {
    canonical: "/awards-and-recognitions",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
