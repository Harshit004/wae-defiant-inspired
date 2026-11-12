import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Sitemap | Explore Our Website",
  description: "Use the WAE sitemap to quickly find information about our portfolio, sustainability, responsibility, news, careers, policies, and contact details.",
  alternates: {
    canonical: "/sitemap",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
