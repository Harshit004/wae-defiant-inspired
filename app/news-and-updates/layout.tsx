import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Media Centre | Stories of Progress and Impact",
  description: "Stay informed with WAE's latest announcements, recognitions, and stories advancing sustainability and water innovation.",
  keywords: "Sustainability, Innovation",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
