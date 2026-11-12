import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Thank You | WAE Corporation",
  description: "Thank you for getting in touch with WAE. Our team will review your inquiry and get back to you shortly.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/thank-you",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

