import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "About Us| Disrupting the Status Quo in Sustainability",
  description: "Learn how WAE is redefining sustainability through Zero to Landfill initiatives, Scope 3 impact, and its Our Green is Blue philosophy.",
  keywords: "Zero to landfill, Scope 3 Impact, Our Green is Blue",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
