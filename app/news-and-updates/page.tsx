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
      <section className="relative z-10 w-full px-[7.5vw]" style={{ paddingTop: "clamp(180px, 17.7vw, 255px)", paddingBottom: "100px" }}>
        
        {/* Toggle Buttons */}
        <div className="flex gap-4" style={{ marginBottom: '75px' }}>
          <Link href="/news-and-updates">
            <button 
              className={`px-6 border transition-colors flex items-center justify-center ${pathname === '/news-and-updates' ? 'border-white text-black bg-white' : 'border-white/30 text-white hover:border-white'}`}
              style={{ 
                height: '41px',
                fontFamily: 'Manrope',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '100%'
              }}
            >
              News & Media
            </button>
          </Link>
          <Link href="/awards-and-recognitions">
            <button 
              className={`px-6 border transition-colors flex items-center justify-center ${pathname === '/awards-and-recognitions' ? 'border-white text-black bg-white' : 'border-white/30 text-white hover:border-white'}`}
              style={{ 
                height: '41px',
                fontFamily: 'Manrope',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '100%'
              }}
            >
              Awards & Recognitions
            </button>
          </Link>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20" style={{ marginBottom: '56px' }} />

        {/* Hero Text */}
        <div className="flex flex-row justify-between items-start" style={{ marginBottom: '96px' }}>
          <div style={{ width: "clamp(260px, 28.2vw, 407px)", flexShrink: 0 }}>
            <h1 style={{
              fontFamily: 'Inter Tight',
              fontWeight: 400,
              fontSize: 'clamp(40px, 4.16vw, 60px)',
              lineHeight: '100%',
              letterSpacing: '0px',
            }}>
              News &<br/>Press Release
            </h1>
          </div>
          
          <div style={{ width: "clamp(260px, 28vw, 403px)", flexShrink: 0 }}>
            <p style={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.11vw, 16px)',
              lineHeight: '100%',
              color: '#FFFFFF',
              letterSpacing: '0px',
            }}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
            </p>
          </div>
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
