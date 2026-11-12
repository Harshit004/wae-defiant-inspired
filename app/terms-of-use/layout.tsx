import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "WAE Terms of Use | Website Terms & Conditions",
  description: "Read WAE’s Terms of Use covering website access, permitted activities, user responsibilities, intellectual property, and legal conditions.",
  alternates: {
    canonical: "/terms-of-use",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
