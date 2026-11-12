import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Data Privacy Policy | WAE Corporation",
  description: "Read WAE's commitment to protecting your personal data, privacy rights, and transparent data handling practices under global privacy regulations.",
  keywords: "Data Privacy Policy, Privacy Rights, Information Security",
  alternates: {
    canonical: "/data-privacy-policy",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
