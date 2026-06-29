"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

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
      <section className="relative z-10 w-full px-[7.5vw]" style={{ paddingTop: "clamp(120px, 10vw, 150px)", paddingBottom: "100px" }}>
        
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
            Awards &<br/>Recognitions
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

        {/* Awards Showcase */}
        <div className="mt-12 space-y-10">
          {/* First Row: Bigger then Smaller */}
          <div className="flex gap-8">
            {/* Bigger Image */}
            <div style={{ width: '61.89655%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/304b56a7-9d7b-41e8-31f4-0ee7f7168800/public"
                alt="WAE Drinking Water Coolers Certified by BIS Under IS 1475:2024"
                width={717}
                height={400}
                className="w-full h-[356px] object-cover"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}>
                  WAE Drinking Water Coolers Certified by BIS Under IS 1475:2024
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#FFFFFF99'
                }}>
                  WAE, an Indian manufacturer of drinking water and water management systems for institutional and commercial use...
                </p>
                <a href="https://themachinemaker.com/news/wae-drinking-water-coolers-certified-by-bis-under-is-14752024/" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-white text-black border border-white" style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    transition: 'all 500ms ease',
                    cursor: 'pointer'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.transition = 'color 900ms ease';
                        arrow.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = 'black';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.color = 'black';
                      }
                    }}>
                    <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                    <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease', color: 'black' }}>↗</span>
                  </button>
                </a>
              </div>
            </div>

            {/* Smaller Image */}
            <div style={{ width: '34.65517%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6fe3159e-1abc-45bc-2d8e-bdfd03a3fb00/public"
                alt="WAE Felicitated with 15th CII Design Excellence..."
                width={402}
                height={400}
                className="w-full h-[356px] object-cover"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}>
                  WAE Felicitated with 15th CII Design Excellence...
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#FFFFFF99'
                }}>
                  WAE, India’s leading water solutions provider, has been conferred...
                </p>
                <a href="https://www.passionateinmarketing.com/wae-felicitated-with-15th-cii-design-excellence-award-2025-for-communication-design/" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-white text-black border border-white" style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    transition: 'all 500ms ease',
                    cursor: 'pointer'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.transition = 'color 900ms ease';
                        arrow.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = 'black';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.color = 'black';
                      }
                    }}>
                    <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                    <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease', color: 'black' }}>↗</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Second Row: Smaller then Bigger */}
          <div className="flex gap-8">
            {/* Smaller Image */}
            <div style={{ width: '34.65517%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/97bae575-faf2-4522-ed06-48c53cd6d400/public"
                alt="Anupam Vikram Joshe on WAE’s path to ZED Gold"
                width={718}
                height={356}
                className="w-full h-[356px] object-cover"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}>
                  Anupam Vikram Joshe on WAE’s path to ZED Gold
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#FFFFFF99'
                }}>
                  In today’s rapidly evolving sustainability landscape, organisations...
                </p>
                <a href="https://www.manufacturingtodayindia.com/waes-path-to-zed-gold" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-white text-black border border-white" style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    transition: 'all 500ms ease',
                    cursor: 'pointer'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.transition = 'color 900ms ease';
                        arrow.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = 'black';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.color = 'black';
                      }
                    }}>
                    <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                    <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease', color: 'black' }}>↗</span>
                  </button>
                </a>
              </div>
            </div>

            {/* Bigger Image */}
            <div style={{ width: '61.89655%' }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee45de6e-2169-4590-0684-201b1d3d6200/public"
                alt="WAE receives ZED gold certification for sustainable manufacturing"
                width={717}
                height={400}
                className="w-full h-[356px] object-cover"
              />
              <div className="mt-4">
                <h3 className="mb-2" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  color: '#FFFFFF'
                }}>
                  WAE receives ZED gold certification for sustainable manufacturing
                </h3>
                <p className="mb-4" style={{
                  fontFamily: 'Inter Tight',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  color: '#FFFFFF99'
                }}>
                  The ZED Gold Certification places WAE among enterprises that mainatin high levels of product quality while...
                </p>
                <a href="https://manufacturing.economictimes.indiatimes.com/news/industry/wae-receives-zed-gold-certification-for-sustainable-manufacturing/125057437" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-white text-black border border-white" style={{
                    fontFamily: 'Inter Tight',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '100%',
                    transition: 'all 500ms ease',
                    cursor: 'pointer'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.transition = 'color 900ms ease';
                        arrow.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = 'black';
                      e.currentTarget.style.borderColor = 'white';
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement;
                      if (arrow) {
                        arrow.style.color = 'black';
                      }
                    }}>
                    <span style={{ transition: 'color 500ms ease' }}>View Story </span>
                    <span className="ml-2 button-arrow" style={{ transition: 'color 900ms ease', color: 'black' }}>↗</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div style={{ position: "relative", zIndex: 1200 }}>
        <Footer />
      </div>
    </main>
  )
}
