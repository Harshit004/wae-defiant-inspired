import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact Us | Connect with WAE",
  description: "Get in touch with WAE for enterprise hydration solutions, drinking water stations, project partnerships, and sustainability queries.",
  keywords: "Contact WAE, Water Solutions, Hydration Systems",
  alternates: {
    canonical: "/contact-us",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
