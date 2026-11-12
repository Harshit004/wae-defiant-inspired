import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Data Privacy Policy | Protecting Your Data",
  description: "Read WAE’s Data Privacy Policy to learn how we collect, use, protect, and manage personal data under applicable privacy laws.",
  alternates: {
    canonical: "/data-privacy-policy",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
