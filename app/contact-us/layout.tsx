import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact WAE | Connect With Our Team",
  description: "Contact WAE to explore sustainable hydration solutions, discuss your project, request support, or get expert guidance from our team.",
  alternates: {
    canonical: "/contact-us",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
