"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import NewsGrid from "@/components/news-grid"
import { usePathname } from "next/navigation"

export default function NewsAndUpdatesPage() {
  const pathname = usePathname()

  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* Top gradient matching dark theme */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)",
          height: "clamp(500px, 80vh, 875px)",
        }}
      />
      
      <div>
        <Header />
      </div>

      {/* Main Content Area */}
      <section className="relative z-10 w-full px-[7.5vw]" style={{ paddingTop: "clamp(180px, 16.3vw, 235px)", paddingBottom: "100px" }}>
        
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-20">
          <Link href="/news-and-updates">
            <button className={`px-6 py-2 border transition-colors text-sm font-medium ${pathname === '/news-and-updates' ? 'border-white text-black bg-white' : 'border-white/30 text-white hover:border-white'}`}>
              News & Media
            </button>
          </Link>
          <Link href="/awards-and-recognitions">
            <button className={`px-6 py-2 border transition-colors text-sm font-medium ${pathname === '/awards-and-recognitions' ? 'border-white text-black bg-white' : 'border-white/30 text-white hover:border-white'}`}>
              Awards & Recognitions
            </button>
          </Link>
        </div>

        {/* Hero Text */}
        <div className="flex flex-row justify-between items-start mb-20 gap-10">
          <h1 style={{
            fontFamily: 'Inter Tight',
            fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 60px)',
            lineHeight: '110%',
            flexShrink: 0,
            maxWidth: '45%'
          }}>
            News &<br/>Press Release
          </h1>
          <p style={{
            fontFamily: 'Inter Tight',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '160%',
            color: '#FFFFFF99',
            maxWidth: '400px',
            marginTop: '10px'
          }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
          </p>
        </div>

        {/* News Grid Component */}
        <div>
          <NewsGrid />
        </div>

      </section>

      <div style={{ position: "relative", zIndex: 1200 }}>
        <Footer />
      </div>
    </main>
  )
}
