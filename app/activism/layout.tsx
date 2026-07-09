import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Activist Company | Refuse Plastic. Restore Balance.",
  description: "Guided by Our Green is Blue, WAE advances blue innovation, stewardship, and refill ecosystems that challenge the status quo.",
  keywords: "Blue Innovation, Our green is blue, Stewardship",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
