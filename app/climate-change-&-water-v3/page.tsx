"use client"

import type { FC } from "react"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Link from "next/link"
import ConnectWithUs from "@/components/connect-with-us"


// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-[140px]";

/**
 * Reusable hover button component.
 */
interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
}

const HoverButton: FC<HoverButtonProps> = ({ children, href }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const buttonContent = (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-4 py-3 transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        textTransform: "uppercase",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
      }}
    >
      {children(hovered)}
    </button>
  );

  return href ? (
      href.startsWith('#') ? (
        <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }}>{buttonContent}</a>
      ) : (
        <Link href={href} className="contents">{buttonContent}</Link>
      )
    ) : buttonContent;
};


export default function Home() {
  return (
    <main className="relative pb-[40px] bg-[#0c0c0c] text-white">
      <Header />

      {/* Hero section */}
              <section
                id="hero"
                className="relative w-full overflow-hidden pt-0 md:mb-[140px]"
              >
                {/* Hero image (full width, natural height) */}
                <div className="w-full">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public"
                    alt="Climate Agreements Hero"
                    width={1440}
                    height={810}
                    priority
                    className="w-full h-auto z-0"
                  />
                </div>
              </section>      {/* Background Gradient Wrapper (875px height, screen width, transitions to solid black #0c0c0c) */}
      <div style={{
        background: 'linear-gradient(180deg, #00223d 0px, #0c0c0c 875px) no-repeat',
        backgroundSize: '100% 875px',
        backgroundColor: '#0c0c0c',
        color: '#ffffff',
        width: '100%'
      }}>
        {/* Article Section */}
        <section className="w-full mb-[140px] px-[9.72%] pt-[60px]">
          <div className="mx-auto">
            {/* Category label above title */}
            <div className="text-[14px] font-normal mb-3 text-[#FFFFFFB3]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Climate Change & Water
            </div>

            {/* Title spanning full width */}
            <h1 className="text-[40px] font-medium leading-[120%] mb-[24px] text-white" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
              From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
            </h1>

            {/* Author and Read Time Metadata Row */}
            <div className="flex justify-between items-center pb-4 mb-[44px] border-b border-white/10 text-sm text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              <Link href="/aditi-sharma" className="underline font-bold text-white hover:text-blue-400 transition-colors">
                Aditi Sharma
              </Link>
              <div className="flex items-center gap-2">
                <span>2 min read</span>
                <button aria-label="Share article" className="hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Three column layout for content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* First Column */}
              <div className="space-y-6 text-sm leading-[130%] text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                <p>
                  In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change. What followed was a turbulent yet determined journey, a series of historic global agreements that would shape the planet's climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline—it's the story of how humanity has tried, failed, and continued to try again in its battle against a warming world.
                </p>
                
                <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%] text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  The Dawn: Kyoto Protocol—the First Global Climate Commitment
                </h2>
                
                <p>
                  The Kyoto Protocol, adopted in December 1997 and entered into force in 2005, was the first legally binding climate treaty. It asked industrialized nations—primarily responsible for historical emissions—to reduce greenhouse gases by an average of 5% below 1990 levels between 2008 and 2012. It was revolutionary. It introduced market-based mechanisms like the Clean Development Mechanism (CDM) and carbon trading—trying to make sustainability economically viable.
                </p>
                
                <p>
                  But Kyoto had its flaws. While the EU and Japan took it seriously, the U.S.—one of the largest emitters—never ratified it. And developing countries, including China and India, had no binding targets, sparking criticism and limiting its global effectiveness. Still, Kyoto was a vital first step. It created a legal architecture and introduced the concept of accountability in climate policy.
                </p>
                
                <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%] text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Transition & Tension: From Kyoto to Paris
                </h2>
                
                <p>
                  Post-Kyoto, the world grew more complex. Global emissions soared. China became the world's largest emitter. The global financial crisis diverted attention. Yet, scientific consensus deepened—IPCC reports warned of rising sea levels, glacial melt, extreme weather.
                </p>

                <p>
                  Copenhagen's COP15 in 2009 was a diplomatic heartbreak. Expectations were sky-high, but no binding treaty emerged. However, it sowed seeds for future frameworks, like voluntary commitments and climate finance.
                </p>
              </div>
              
              {/* Second Column */}
              <div className="space-y-6 text-sm leading-[130%] text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                <p>
                  Finally, in 2015, the Paris Agreement was born at COP21. Unlike Kyoto, it brought both developed and developing nations under a single framework, aiming to limit global warming to "well below 2°C"—ideally 1.5°C. The Paris Agreement wasn't legally binding in terms of emission targets, but it required countries to submit Nationally Determined Contributions (NDCs), which would be reviewed every five years for ambition and progress.
                </p>
                
                <p>
                  It was less about enforcement, more about transparency and global peer pressure.
                </p>
                
                <h2 className="text-xl font-bold mt-6 mb-6 leading-[130%] text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  The Present Storm: COP28 and the Crossroads of Climate Policy
                </h2>
                
                <p>
                  Enter COP28, held in Dubai, UAE in 2023—a moment heavy with contradictions and expectations. Hosted by an oil-producing nation, led by Sultan Al Jaber, the summit faced scepticism but turned heads with a historic milestone: the first ever mention of "transitioning away from fossil fuels" in an official agreement.
                </p>
                
                <p>
                  COP28 brought the first Global Stocktake—a comprehensive review of where the world stands since Paris. The results? Stark.
                </p>
                
                <ul className="list-disc pl-5 mt-3 space-y-2 text-[#ffffffb3]">
                  <li>The world is not on track to meet 1.5°C.</li>
                  <li>Emissions must peak before 2025 and fall by 43% by 2030 to stay on course.</li>
                  <li>Adaptation financing is lagging, and loss-and-damage funding is still too slow.</li>
                </ul>

                <p className="font-bold text-white mt-8 mb-3">
                  Key agreements included:
                </p>
                
                <ul className="list-disc pl-5 mt-3 space-y-2 text-[#ffffffb3]">
                  <li>A Loss and Damage Fund finally operationalized, with pledges of over $700 million to support vulnerable countries.</li>
                  <li>A push for tripling renewable energy capacity by 2030.</li>
                  <li>Recognition of the need to phase out unabated fossil fuels although language remained ambiguous under pressure from oil-rich nations.</li>
                </ul>
              </div>
              
              {/* Third Column */}
              <div className="space-y-6 text-sm leading-[130%] text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                <h2 className="text-xl font-bold mb-6 leading-[130%] text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Scientific Backdrop & Climate Reality
                </h2>
                
                <p className="font-bold text-white mb-3">
                  Let's not forget the data:
                </p>
                
                <ul className="list-disc pl-5 mt-3 space-y-2 text-[#ffffffb3]">
                  <li>The planet has already warmed by about 1.1°C since pre-industrial times.</li>
                  <li>The 2020s are set to be the hottest decade on record, with 2023 likely becoming the hottest year.</li>
                  <li>The Arctic is warming nearly four times faster than the global average.</li>
                  <li>Sea levels have risen by about 21–24 cm since 1880.</li>
                  <li>Climate-related disasters have increased fivefold over the past 50 years, according to WMO.</li>
                </ul>

                <p>
                  The science is unrelenting. We are running out of time, and the carbon budget for 1.5°C could be exhausted before 2030 if current trends continue.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-6 leading-[130%] text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  What Now? A World at a Tipping Point
                </h2>

                <p>
                  From Kyoto's baby steps to COP28's cautious declarations, the evolution of climate diplomacy reflects humanity's struggle between ambition and inertia, politics and science, development and survival. The agreements have grown more inclusive but still fall short on urgency and enforcement.
                </p>

                <p>
                  The coming years will be decisive. Climate change is no longer tomorrow's threat, it's today's crisis. It is not enough to make promises in plush conference halls. The real work must happen on the ground - in policies, in boardrooms, on farms, and in cities.
                </p>

                <p>
                  As the world now looks towards COP29 and beyond, the story is still being written. The question is: will it be one of redemption, or regret?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider above writer info */}
        <div className="mx-[9.72%] h-px bg-white/10 mb-12" />

        {/* Writer Card Section */}
        <section className="w-full mb-[140px] px-[9.72%]">
          <div className="mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start md:gap-[60px]">
              {/* Left side - Circular Image */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/471bde63-5514-44fd-67a7-d06a24417100/public"
                  alt="Aditi Sharma"
                  width={220}
                  height={220}
                  className="rounded-full object-cover grayscale"
                />
              </div>
              
              {/* Right side - Content */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-white" style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '140%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  marginBottom: '6px',
                }}>
                  Aditi Sharma
                </h3>
                
                <p style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#FFFFFFB3',
                  marginBottom: '24px',
                }}>
                  Executive - Marketing, WAE
                </p>
                
                <p style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '17px',
                  lineHeight: '140%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#FFFFFFB3',
                  margin: 0,
                  maxWidth: '750px'
                }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
                </p>
                
                <Link href="/aditi-sharma" className="inline-block mt-[40px] text-white hover:text-blue-400 transition-colors" style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  textDecoration: 'underline',
                }}>
                  View Profile ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles SECTION */}
        <section className="w-full pb-[140px] px-[9.72%]">
          <div className="mx-auto">
            <h2 className="mb-12 text-white" style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: '40px',
              lineHeight: '110.00000000000001%',
              letterSpacing: '0%',
              verticalAlign: 'middle'
            }}>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <Link href="/north-star-of-progress" className="group block">
                <div className="overflow-hidden mb-6">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public"
                    alt="From Kyoto to COP28"
                    width={347}
                    height={300}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] text-white group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
                </h3>
                <p className="text-sm leading-[24px] mb-4 text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change.
                </p>
                <div className="text-xs uppercase tracking-wider underline text-[#ffffffb3] group-hover:text-white transition-colors duration-300">
                  Read Article
                </div>
              </Link>
              
              {/* Article 2 */}
              <Link href="/climate-change-&-water-v2" className="group block">
                <div className="overflow-hidden mb-6">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public"
                    alt="Climate Change in the Indian Subcontinent"
                    width={347}
                    height={300}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] text-white group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective
                </h3>
                <p className="text-sm leading-[24px] mb-4 text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.
                </p>
                <div className="text-xs uppercase tracking-wider underline text-[#ffffffb3] group-hover:text-white transition-colors duration-300">
                  Read Article
                </div>
              </Link>
              
              {/* Article 3 */}
              <Link href="/climate-change-&-water-v3" className="group block">
                <div className="overflow-hidden mb-6">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public"
                    alt="The Ozone Crisis"
                    width={347}
                    height={300}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-bold mb-2 uppercase leading-[140%] text-white group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  The Ozone Crisis: A Success Story in Environmental Cooperation
                </h3>
                <p className="text-sm leading-[24px] mb-4 text-[#ffffffb3]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  The story of the ozone layer's recovery stands as a testament to what global cooperation can achieve. This environmental success story offers valuable lessons for addressing climate change and other ecological challenges.
                </p>
                <div className="text-xs uppercase tracking-wider underline text-[#ffffffb3] group-hover:text-white transition-colors duration-300">
                  Read Article
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER SECTION */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>


       {/* Global Styles */}
      <style jsx global>{`
        html {
        }
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
    </main>
  )
}