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
import WhatsAppWidget from "@/components/whatsapp-widget"
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZHJQLN');`
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="icon" href="https://github.com/wae-corp/WAE-F-B/blob/main/public/favicon-32x32.png?raw=true" sizes="32x32" />
      </head>
      <body className={interTight.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZHJQLN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <MobileBlocker />
        {children}
        <CookieConsent />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <ScrollToTop />
        <Toaster />
        <WhatsAppWidget />
      </body>
    </html>
  )
}