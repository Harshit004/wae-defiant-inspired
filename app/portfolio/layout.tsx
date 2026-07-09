import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Portfolio | Purpose-Led Products & Solutions",
  description: "From plastic-free hydration systems to water reuse solutions, explore WAE's portfolio built for sustainability and lasting impact.",
  keywords: "Water Reuse Solutions, Plastic Free Hydration,",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
