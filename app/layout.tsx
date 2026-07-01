import type React from "react"
import "./globals.css"
import { Inter, Manrope, Inter_Tight } from "next/font/google"
import type { Metadata } from "next"
import CookieConsent from "@/components/cookie-consent"
import AnalyticsTracker from "@/components/analytics-tracker"
import { Suspense } from "react"
import { Toaster } from "sonner"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" })

export const metadata: Metadata = {
  title: "WAE - Disrupting the Status Quo",
  description: "Modern, innovative solutions for a better world",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${manrope.variable} ${interTight.variable}`}>
      <head>
        <link rel="icon" href="https://github.com/wae-corp/WAE-F-B/blob/main/public/favicon-32x32.png?raw=true" sizes="32x32" />
      </head>
      <body className={interTight.className}>
        {children}
        <CookieConsent />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  )
}