import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Sustainability | Water Stewardship & ESG Impact",
  description: "Empowering organisations with sustainable water solutions, ESG leadership, and measurable progress toward water-positive futures.",
  keywords: "Sustainable water solution, ESG leadership",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
