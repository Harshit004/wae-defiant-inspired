"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import NewsGrid from "@/components/news-grid"

export default function AwardsAndRecognitionsPage() {
  const pathname = usePathname()
  const [data, setData] = useState<{ heroTextAwards: string, items: any[] } | null>(null)

  useEffect(() => {
    fetch("/api/news-events")
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data)
      })
      .catch(console.error)
  }, [])

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
        <Header transparentBg />
      </div>

      {/* Main Content Area */}
      <section className="relative z-10 w-full px-[7.5vw] pt-[116px] md:pt-[clamp(180px,17.7vw,255px)] pb-[100px]">

        {/* Toggle Buttons */}
        <div className="flex flex-row w-full gap-[16px] mb-[40px] md:mb-[75px] md:justify-start">
          <Link href="/news-and-updates" className="flex-1 md:flex-none">
            <button
              className={`w-full md:w-auto px-[12px] md:px-6 border transition-colors flex items-center justify-center font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] h-[41px] ${pathname === '/news-and-updates' ? 'border-white text-black bg-white' : 'border-white/30 text-white hover:border-white'}`}
            >
              News & Media
            </button>
          </Link>
          <Link href="/awards-and-recognitions" className="flex-1 md:flex-none">
            <button
              className={`w-full md:w-auto px-[12px] md:px-6 border transition-colors flex items-center justify-center font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] h-[41px] ${pathname === '/awards-and-recognitions' ? 'border-white text-black bg-white' : 'border-white/30 text-white hover:border-white'}`}
            >
              Awards & Honours
            </button>
          </Link>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 mb-[40px] md:mb-[56px]" />

        {/* Hero Text */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-[48px] md:mb-[96px] gap-[24px] md:gap-[0px]">
          <div className="w-full md:w-[clamp(260px,28.2vw,407px)] shrink-0">
            <h1 className="font-inter-tight font-normal text-[32px] md:text-[clamp(40px,4.16vw,60px)] leading-[100%] m-0 md:whitespace-nowrap">
              Awards & Honours
            </h1>
          </div>

          <div className="w-full md:w-[clamp(260px,28vw,403px)] shrink-0">
            <p className="font-manrope font-normal text-[14px] md:text-[clamp(14px,1.11vw,16px)] leading-[130%] text-[#AEAEAE] m-0">
              {data ? data.heroTextAwards : "Loading..."}
            </p>
          </div>
        </div>

        {/* Awards Grid Component */}
        <div>
          {data ? <NewsGrid cards={data.items.filter(i => i.type === 'award')} /> : null}
        </div>

      </section>

      <div style={{ position: "relative", zIndex: 1200 }}>
        <Footer />
      </div>
    </main>
  )
}
