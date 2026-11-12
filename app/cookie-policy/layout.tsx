import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Cookie Policy | WAE Corporation",
  description: "Learn how WAE uses cookies and similar tracking technologies to improve browsing experience, analyze traffic, and ensure site security.",
  keywords: "Cookie Policy, Privacy, Tracking Technologies",
  alternates: {
    canonical: "/cookie-policy",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
