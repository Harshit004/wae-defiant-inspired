import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "HTML Sitemap | WAE Corporation Directory",
  description: "Browse the complete directory of WAE pages, solutions, sustainable drinking water stations, perspectives, and corporate resources.",
  keywords: "HTML Sitemap, Site Directory, WAE Pages",
  alternates: {
    canonical: "/sitemap",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
