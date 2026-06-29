"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import NewsGrid from "@/components/news-grid"

export default function AwardsAndRecognitionsPage() {
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
              Awards &<br />Recognitions
            </h1>
          </div>

          <div style={{ width: "clamp(260px, 28vw, 403px)", flexShrink: 0 }}>
            <p style={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.11vw, 16px)',
              lineHeight: '130%',
              color: '#FFFFFF',
              letterSpacing: '0px',
            }}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
            </p>
          </div>
        </div>

        {/* Awards Grid Component */}
        <div>
          <NewsGrid cards={[
            {
              imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/304b56a7-9d7b-41e8-31f4-0ee7f7168800/public",
              title: "WAE Drinking Water Coolers Certified by BIS Under IS 1475:2024",
              description: "WAE, an Indian manufacturer of drinking water and water management systems for institutional and commercial use...",
              link: "https://themachinemaker.com/news/wae-drinking-water-coolers-certified-by-bis-under-is-14752024/",
            },
            {
              imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6fe3159e-1abc-45bc-2d8e-bdfd03a3fb00/public",
              title: "WAE Felicitated with 15th CII Design Excellence...",
              description: "WAE, India’s leading water solutions provider, has been conferred...",
              link: "https://www.passionateinmarketing.com/wae-felicitated-with-15th-cii-design-excellence-award-2025-for-communication-design/",
            },
            {
              imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/97bae575-faf2-4522-ed06-48c53cd6d400/public",
              title: "Anupam Vikram Joshe on WAE’s path to ZED Gold",
              description: "In today’s rapidly evolving sustainability landscape, organisations...",
              link: "https://www.manufacturingtodayindia.com/waes-path-to-zed-gold",
            },
            {
              imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee45de6e-2169-4590-0684-201b1d3d6200/public",
              title: "WAE receives ZED gold certification for sustainable manufacturing",
              description: "The ZED Gold Certification places WAE among enterprises that mainatin high levels of product quality while...",
              link: "https://manufacturing.economictimes.indiatimes.com/news/industry/wae-receives-zed-gold-certification-for-sustainable-manufacturing/125057437",
            }
          ]} />
        </div>

      </section>

      <div style={{ position: "relative", zIndex: 1200 }}>
        <Footer />
      </div>
    </main>
  )
}
