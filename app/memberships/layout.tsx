import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Industry Memberships & Alliances | WAE",
  description: "Discover WAE's industry affiliations, trade council memberships, and collaborative alliances driving sustainability and water stewardship.",
  keywords: "Memberships, Industry Alliances, Sustainability Councils",
  alternates: {
    canonical: "/memberships",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
