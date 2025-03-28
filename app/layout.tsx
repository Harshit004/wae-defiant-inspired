import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Link from "next/link"


const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="https://github.com/wae-corp/WAE-F-B/blob/main/public/favicon-32x32.png?raw=true" sizes="32x32" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'