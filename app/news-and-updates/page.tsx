import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import NewsGrid from "@/components/news-grid"
import { readNewsEventsDB } from "@/lib/newsEventsDb"

export default function NewsAndUpdatesPage() {
  const data = readNewsEventsDB()
  const newsItems = (data.items || []).filter(i => i.type === 'news')

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
              className="w-full md:w-auto px-[12px] md:px-6 border transition-colors flex items-center justify-center font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] h-[41px] border-white text-black bg-white"
            >
              News & Media
            </button>
          </Link>
          <Link href="/awards-and-recognitions" className="flex-1 md:flex-none">
            <button
              className="w-full md:w-auto px-[12px] md:px-6 border transition-colors flex items-center justify-center font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] h-[41px] border-white/30 text-white hover:border-white"
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
            <h1 className="font-inter-tight font-normal text-[32px] md:text-[clamp(40px,4.16vw,60px)] leading-[100%] m-0">
              Press Release
            </h1>
          </div>

          <div className="w-full md:w-[clamp(260px,28vw,403px)] shrink-0">
            <p className="font-manrope font-normal text-[14px] md:text-[clamp(14px,1.11vw,16px)] leading-[130%] text-[#AEAEAE] m-0">
              {data.heroTextNews || "Stay informed with WAE's latest announcements, recognitions, and stories advancing sustainability and water innovation."}
            </p>
          </div>
        </div>

        {/* News Grid Component */}
        <div>
          <NewsGrid cards={newsItems} />
        </div>

      </section>

      <div style={{ position: "relative", zIndex: 1200 }}>
        <Footer />
      </div>
    </main>
  )
}
