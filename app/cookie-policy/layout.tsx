import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Cookie Policy | How We Use Cookies",
  description: "Learn how WAE uses necessary, analytics, functional, and marketing cookies to improve website performance and your experience.",
  alternates: {
    canonical: "/cookie-policy",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
