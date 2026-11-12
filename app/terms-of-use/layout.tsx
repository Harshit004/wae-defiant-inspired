import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Terms of Use | WAE Corporation",
  description: "Read the terms, conditions, and user agreements governing the use of WAE Corporation's website, products, and online services.",
  keywords: "Terms of Use, Legal, Terms and Conditions",
  alternates: {
    canonical: "/terms-of-use",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
