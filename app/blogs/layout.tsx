import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Insights | Research for a More Sustainable Future",
  description: "Discover expert insights on climate, water, and sustainability through research-driven stories shaping the future of our planet.",
  keywords: "Climate, Water, Sustainability, Future of our planet",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
