import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Life at WAE | Careers, Culture & Growth",
  description: "Discover life at WAE an inclusive, purpose-led workplace offering internships, career growth, collaboration, and meaningful impact.",
  alternates: {
    canonical: "/life-at-wae",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
