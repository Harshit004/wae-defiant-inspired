import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Careers | Join a Team That Creates Impact",
  description: "Discover meaningful careers at WAE where innovation, sustainability, and purpose come together to transform challenges into solutions.",
  keywords: "Sustainability & Purpose, Innovatio",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
