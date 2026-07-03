import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Explore Roles at WAE | Purpose-Driven Career Opportunities",
  description: "Discover purpose-driven career opportunities at WAE and build a future shaped by innovation, sustainability, and impact.",
  keywords: "Sustainability, Innovation and impact",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
