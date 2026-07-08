import type React from "react"
import "./globals.css"
import { Inter, Manrope, Inter_Tight } from "next/font/google"
import type { Metadata } from "next"
import CookieConsent from "@/components/cookie-consent"
import AnalyticsTracker from "@/components/analytics-tracker"
import { Suspense } from "react"
import { Toaster } from "sonner"
import ScrollToTop from "@/components/scroll-to-top"
import MobileBlocker from "@/components/mobile-blocker"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" })

export const metadata: Metadata = {
  title: "WAE | Activist-Led Sustainable Hydration Solutions",
  description: "Redefining water through sustainable hydration solutions, WAE is an activist company committed to innovation and lasting impact.",
  keywords: "Sustainable Hydration Solutions",
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
        <MobileBlocker />
        {children}
        <CookieConsent />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <ScrollToTop />
        <Toaster />
        <Script
          type="text/javascript"
          src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
          id="aisensy-wa-widget"
          widget-id="aab32h"
        />
      </body>
    </html>
  )
}