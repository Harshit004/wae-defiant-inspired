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
  metadataBase: new URL("https://www.waecorp.com"),
  alternates: {
    canonical: "/",
  },
  title: "WAE | Activist-Led Sustainable Hydration Solutions",
  description: "Redefining water through sustainable hydration solutions, WAE is an activist company committed to innovation and lasting impact.",
  keywords: "Sustainable Hydration Solutions",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.waecorp.com",
    siteName: "WAE",
    title: "WAE | Activist-Led Sustainable Hydration Solutions",
    description: "Redefining water through sustainable hydration solutions, WAE is an activist company committed to innovation and lasting impact.",
    images: [
      {
        url: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
        width: 1200,
        height: 630,
        alt: "WAE - Activist-Led Sustainable Hydration Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAE | Activist-Led Sustainable Hydration Solutions",
    description: "Redefining water through sustainable hydration solutions, WAE is an activist company committed to innovation and lasting impact.",
    images: ["https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public"],
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WAE Corporation",
  "alternateName": "WAE",
  "url": "https://www.waecorp.com",
  "logo": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public",
  "description": "Redefining water through sustainable hydration solutions, WAE is an activist company committed to innovation, zero to landfill initiatives, and lasting ESG impact.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H-18, H Block, Sector 63",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201301",
    "addressCountry": "IN"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-120-406-9800",
      "contactType": "customer service",
      "email": "info@waecorp.com",
      "areaServed": "IN"
    }
  ],
  "sameAs": [
    "https://in.linkedin.com/company/wae-limited",
    "https://www.x.com/WAE_LTD",
    "https://www.youtube.com/@wae-limited",
    "https://www.facebook.com/waeltd",
    "https://www.instagram.com/wae.limited"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${manrope.variable} ${interTight.variable}`}>
      <head>
        {/* Organization Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
        {/* OpenAI Measurement Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,u){
if(w.oaiq)return;var q=function(){q.q?q.q.push(arguments):(q.q=[arguments]);};
q.q=q.q||[];w.oaiq=q;var js=d.createElement(s);js.async=true;js.src=u;
var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(js,f);
})(window,document,'script','https://bzrcdn.openai.com/sdk/oaiq.min.js');`
          }}
        />
        {/* End OpenAI Measurement Pixel */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
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
        <Script 
          type="text/javascript"
          src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
          id="aisensy-wa-widget"
          strategy="afterInteractive"
          {...{ "widget-id": "aab53u" }}
        />
      </body>
    </html>
  )
}