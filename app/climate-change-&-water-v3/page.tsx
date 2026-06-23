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
  const [copied, setCopied] = useState(false);
  const [hoveredRelatedCard, setHoveredRelatedCard] = useState<number | null>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const paragraphStyle = {
    fontFamily: "var(--font-manrope), sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0%',
    color: '#AEAEAE',
  };

  const headingStyle = {
    fontFamily: "var(--font-inter-tight), sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '1.3',
    letterSpacing: '0%',
    color: '#fff',
  };

  const relatedPosts = [
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf4fc4f5-cfc3-4eb9-ac32-bac46f834a00/public",
      title: "From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future",
      description: "In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change.",
      linkUrl: "/north-star-of-progress"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4addca72-6f79-4c23-9c24-c400cd9b6a00/public",
      title: "Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective",
      description: "The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.",
      linkUrl: "/climate-change-&-water-v2"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c3eb242-b13a-443c-da32-a78bce6e7a00/public",
      title: "The Ozone Crisis: A Success Story in Environmental Cooperation",
      description: "The story of the ozone layer's recovery stands as a testament to what global cooperation can achieve. This environmental success story offers valuable lessons for addressing climate change and other ecological challenges.",
      linkUrl: "/climate-change-&-water"
    }
  ];

  return (
    <main className="relative bg-[#0c0c0c] text-white">
      <Header />

      {/* Hero section */}
              <section
                id="hero"
                className="relative w-full overflow-hidden pt-0 md:mb-[140px]"
              >
                {/* Hero image (full width, natural height) */}
                <div className="relative w-full">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public"
                    alt="Climate Agreements Hero"
                    width={1440}
                    height={810}
                    priority
                    className="w-full h-auto z-0"
                  />
                  {/* Top Gradient */}
                  <div 
                    className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                    style={{
                      height: '430px',
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  />
                  {/* Bottom Gradient */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
                    style={{
                      height: '270px',
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    }}
                  />
                </div>
              </section>      {/* Background Gradient Wrapper (max 875px gradient height, screen width, transitions to solid black #0c0c0c) */}
      <div 
        className="relative w-full bg-[#0c0c0c]" 
        style={{
          color: '#ffffff',
        }}
      >
        {/* Gradient background with max height of 875px */}
        <div 
          className="absolute top-0 left-0 right-0 pointer-events-none z-0"
          style={{
            height: '875px',
            maxHeight: '875px',
            background: 'linear-gradient(180deg, #00223d 0px, #0c0c0c 100%) no-repeat',
          }}
        />
        {/* Article Section */}
        <section 
          className="relative z-10 w-full" 
          style={{ 
            paddingTop: '6.319vw', 
            paddingLeft: '7.5vw', 
            paddingRight: '7.5vw', 
            paddingBottom: '7.43vw' 
          }}
        >
          <div className="mx-auto">
            {/* Category label above title */}
            <div 
              style={{ 
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#fff',
                marginBottom: '31px'
              }}
            >
              Climate Change & Water
            </div>

            {/* Title spanning full width */}
            <h1 
              style={{ 
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontWeight: 400,
                fontSize: '40px',
                lineHeight: '100%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#fff',
                marginBottom: '42px'
              }}
            >
              From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
            </h1>

            {/* Author and Read Time Metadata Row */}
            <div 
              className="flex justify-between items-center text-white" 
              style={{ 
                marginBottom: '38px',
              }}
            >
              <Link 
                href="/aditi-sharma" 
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '130%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  color: '#fff'
                }}
              >
                Aditi Sharma
              </Link>
              
              <div className="flex items-center gap-[12px]">
                <span 
                  style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#fff'
                  }}
                >
                  2 min read
                </span>
                
                <button 
                  onClick={handleShare}
                  aria-label="Share article" 
                  className="hover:opacity-80 transition-opacity relative flex items-center"
                >
                  <Image 
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cefe6cc9-95e7-4e11-0008-900d4d407600/public" 
                    alt="Share" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 object-contain"
                  />
                  {copied && (
                    <span 
                      className="absolute bottom-full right-0 mb-2 px-2 py-1 text-[10px] bg-black/95 text-white rounded border border-white/20 whitespace-nowrap backdrop-blur-sm shadow-md"
                      style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
                    >
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Horizontal rule with 1px solid #FFFFFF4D */}
            <div className="relative z-10 w-full" style={{ borderTop: '1px solid #FFFFFF4D' }} />
            
            {/* Three column layout for content with 58px gap */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginTop: '58px' }}>
              {/* First Column */}
              <div>
                <p style={{ ...paragraphStyle, marginTop: 0 }}>
                  In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change. What followed was a turbulent yet determined journey, a series of historic global agreements that would shape the planet's climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline—it's the story of how humanity has tried, failed, and continued to try again in its battle against a warming world.
                </p>
                
                <h2 style={{ ...headingStyle, marginTop: '46px', marginBottom: '20px' }}>
                  The Dawn: Kyoto Protocol—the First Global Climate Commitment
                </h2>
                
                <p style={{ ...paragraphStyle, marginTop: '20px' }}>
                  The Kyoto Protocol, adopted in December 1997 and entered into force in 2005, was the first legally binding climate treaty. It asked industrialized nations—primarily responsible for historical emissions—to reduce greenhouse gases by an average of 5% below 1990 levels between 2008 and 2012. It was revolutionary. It introduced market-based mechanisms like the Clean Development Mechanism (CDM) and carbon trading—trying to make sustainability economically viable.
                </p>
                
                <p style={{ ...paragraphStyle, marginTop: '12px' }}>
                  But Kyoto had its flaws. While the U.S.—one of the largest emitters—never ratified it. And developing countries, including China and India, had no binding targets, sparking criticism and limiting its global effectiveness. Still, Kyoto was a vital first step. It created a legal architecture and introduced the concept of accountability in climate policy.
                </p>
                
                <h2 style={{ ...headingStyle, marginTop: '46px', marginBottom: '20px' }}>
                  Transition & Tension: From Kyoto to Paris
                </h2>
                
                <p style={{ ...paragraphStyle, marginTop: '20px' }}>
                  Post-Kyoto, the world grew more complex. Global emissions soared. China became the world's largest emitter. The global financial crisis diverted attention. Yet, scientific consensus deepened—IPCC reports warned of rising sea levels, glacial melt, extreme weather.
                </p>

                <p style={{ ...paragraphStyle, marginTop: '12px' }}>
                  Copenhagen's COP15 in 2009 was a diplomatic heartbreak. Expectations were sky-high, but no binding treaty emerged. However, it sowed seeds for future frameworks, like voluntary commitments and climate finance.
                </p>
              </div>
              
              {/* Second Column */}
              <div>
                <p style={{ ...paragraphStyle, marginTop: 0 }}>
                  Finally, in 2015, the Paris Agreement was born at COP21. Unlike Kyoto, it brought both developed and developing nations under a single framework, aiming to limit global warming to "well below 2°C"—ideally 1.5°C. The Paris Agreement wasn't legally binding in terms of emission targets, but it required countries to submit Nationally Determined Contributions (NDCs), which would be reviewed every five years for ambition and progress.
                </p>
                
                <p style={{ ...paragraphStyle, marginTop: '12px' }}>
                  It was less about enforcement, more about transparency and global peer pressure.
                </p>
                
                <h2 style={{ ...headingStyle, marginTop: '46px', marginBottom: '20px' }}>
                  The Present Storm: COP28 and the Crossroads of Climate Policy
                </h2>
                
                <p style={{ ...paragraphStyle, marginTop: '20px' }}>
                  Enter COP28, held in Dubai, UAE in 2023—a moment heavy with contradictions and expectations. Hosted by an oil-producing nation, led by Sultan Al Jaber, the summit faced scepticism but turned heads with a historic milestone: the first ever mention of "transitioning away from fossil fuels" in an official agreement.
                </p>
                
                <p style={{ ...paragraphStyle, marginTop: '12px' }}>
                  COP28 brought the first Global Stocktake—a comprehensive review of where the world stands since Paris. The results? Stark.
                </p>
                
                <ul className="list-disc pl-5 mt-[20px]" style={{ ...paragraphStyle }}>
                  <li style={{ marginBottom: '8px' }}>The world is not on track to meet 1.5°C.</li>
                  <li style={{ marginBottom: '8px' }}>Emissions must peak before 2025 and fall by 43% by 2030 to stay on course.</li>
                  <li style={{ marginBottom: '0px' }}>Adaptation financing is lagging, and loss-and-damage funding is still too slow.</li>
                </ul>

                <p style={{ ...headingStyle, fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>
                  Key agreements included:
                </p>
                
                <ul className="list-disc pl-5 mt-[12px]" style={{ ...paragraphStyle }}>
                  <li style={{ marginBottom: '8px' }}>A Loss and Damage Fund finally operationalized, with pledges of over $700 million to support vulnerable countries.</li>
                  <li style={{ marginBottom: '8px' }}>A push for tripling renewable energy capacity by 2030.</li>
                  <li style={{ marginBottom: '0px' }}>Recognition of the need to phase out unabated fossil fuels although language remained ambiguous under pressure from oil-rich nations.</li>
                </ul>
              </div>
              
              {/* Third Column */}
              <div>
                <h2 style={{ ...headingStyle, marginTop: 0, marginBottom: '20px' }}>
                  Scientific Backdrop & Climate Reality
                </h2>
                
                <p style={{ ...headingStyle, fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>
                  Let's not forget the data:
                </p>
                
                <ul className="list-disc pl-5 mt-[12px]" style={{ ...paragraphStyle }}>
                  <li style={{ marginBottom: '8px' }}>The planet has already warmed by about 1.1°C since pre-industrial times.</li>
                  <li style={{ marginBottom: '8px' }}>The 2020s are set to be the hottest decade on record, with 2023 likely becoming the hottest year.</li>
                  <li style={{ marginBottom: '8px' }}>The Arctic is warming nearly four times faster than the global average.</li>
                  <li style={{ marginBottom: '8px' }}>Sea levels have risen by about 21–24 cm since 1880.</li>
                  <li style={{ marginBottom: '0px' }}>Climate-related disasters have increased fivefold over the past 50 years, according to WMO.</li>
                </ul>

                <p style={{ ...paragraphStyle, marginTop: '20px' }}>
                  The science is unrelenting. We are running out of time, and the carbon budget for 1.5°C could be exhausted before 2030 if current trends continue.
                </p>

                <h2 style={{ ...headingStyle, marginTop: '46px', marginBottom: '20px' }}>
                  What Now? A World at a Tipping Point
                </h2>

                <p style={{ ...paragraphStyle, marginTop: '20px' }}>
                  From Kyoto's baby steps to COP28's cautious declarations, the evolution of climate diplomacy reflects humanity's struggle between ambition and inertia, politics and science, development and survival. The agreements have grown more inclusive but still fall short on urgency and enforcement.
                </p>

                <p style={{ ...paragraphStyle, marginTop: '12px' }}>
                  The coming years will be decisive. Climate change is no longer tomorrow's threat, it's today's crisis. It is not enough to make promises in plush conference halls. The real work must happen on the ground - in policies, in boardrooms, on farms, and in cities.
                </p>

                <p style={{ ...paragraphStyle, marginTop: '12px' }}>
                  As the world now looks towards COP29 and beyond, the story is still being written. The question is: will it be one of redemption, or regret?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider above writer info (now replaced with clean spacing) */}
        <div className="relative z-10 mx-[7.5vw] h-px" style={{ borderTop: '1px solid #FFFFFF4D', marginBottom: '48px' }} />

        {/* Writer Card Section */}
        <section className="relative z-10 w-full mb-[76px] px-[7.5vw]">
          <div className="mx-auto">
            <div className="flex flex-col md:flex-row items-stretch md:gap-[94px]">
              {/* Left side - Circular Image */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/471bde63-5514-44fd-67a7-d06a24417100/public"
                  alt="Aditi Sharma"
                  width={242}
                  height={244}
                  className="rounded-full object-cover grayscale w-[242px] h-[244px]"
                />
              </div>
              
              {/* Right side - Content */}
              <div className="flex flex-col justify-between flex-grow md:py-[2px]" style={{ minHeight: '244px' }}>
                <div>
                  <h3 className="text-white" style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontWeight: 700,
                    fontSize: '24px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize',
                    marginBottom: '12px',
                  }}>
                    Aditi Sharma
                  </h3>
                  
                  <p style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '120%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#ffffff',
                    marginBottom: '32px',
                  }}>
                    Executive - Marketing, WAE
                  </p>
                  
                  <p style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#AEAEAE',
                    margin: 0,
                    maxWidth: '750px'
                  }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.
                  </p>
                </div>
                
                <div className="mt-6 md:mt-0 flex items-end">
                  <Link href="/aditi-sharma" className="inline-flex items-center text-white hover:text-blue-400 transition-colors" style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '120%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}>
                    <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                      View Profile
                    </span>
                    <span style={{ marginLeft: '10px' }}>↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal rule with 76px gap before it */}
        <div className="relative z-10 mx-[7.5vw] h-px bg-white/30" style={{ borderTop: '1px solid #FFFFFF4D' }} />
        

        {/* Related Articles SECTION */}
        <section 
          className="relative z-10 w-full" 
          style={{ 
            paddingTop: '76px', 
            paddingBottom: '15.347vw', 
            paddingLeft: '7.5vw', 
            paddingRight: '7.5vw' 
          }}
        >
          <div className="mx-auto">
            <h2 className="text-white" style={{
              fontFamily: "var(--font-inter-tight), sans-serif",
              fontWeight: 400,
              fontSize: '40px',
              lineHeight: '110.00000000000001%',
              letterSpacing: '0%',
              verticalAlign: 'middle',
              marginBottom: '60px'
            }}>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[4.166%] gap-y-[130px]">
              {relatedPosts.map((post, index) => (
                <div
                  key={index}
                  className="group flex items-stretch transition-all duration-300"
                  onMouseEnter={() => setHoveredRelatedCard(index)}
                  onMouseLeave={() => setHoveredRelatedCard(null)}
                >
                  {/* Vertical divider line before every card */}
                  <div className="w-px bg-white/20 self-stretch shrink-0" />
                  {/* Between every line and card, there is 22/1440 vw gap */}
                  <div style={{ width: "calc(22 / 1440 * 100vw)" }} className="shrink-0" />

                  {/* Card Content wrapper */}
                  <div className="flex flex-col flex-grow text-left">
                    <Link href={post.linkUrl} className="block relative aspect-[364/270] w-full overflow-hidden">
                      {/* Primary Image */}
                      <div
                        className="absolute inset-0 transition-opacity duration-[800ms]"
                        style={{ opacity: hoveredRelatedCard === index ? 0 : 1 }}
                      >
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Hover Image */}
                      {post.imageSrcHover && (
                        <div
                          className="absolute inset-0 transition-opacity duration-[800ms]"
                          style={{ opacity: hoveredRelatedCard === index ? 1 : 0 }}
                        >
                          <Image
                            src={post.imageSrcHover}
                            alt={`${post.title} hover`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </Link>

                    {/* 20px gap */}
                    <div style={{ height: "20px" }} />

                    <Link href={post.linkUrl}>
                      <h3
                        className="hover:opacity-80 transition-opacity m-0"
                        style={{
                          fontFamily: "var(--font-inter-tight), sans-serif",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          color: "#ffffff",
                          verticalAlign: "middle"
                        }}
                      >
                        {post.title}
                      </h3>
                    </Link>

                    {/* 12px gap */}
                    <div style={{ height: "12px" }} />

                    <p
                      className="m-0"
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#AEAEAE",
                        verticalAlign: "middle"
                      }}
                    >
                      {post.description}
                    </p>

                    {/* 52px gap */}
                    <div style={{ height: "52px" }} />

                    <Link
                      href={post.linkUrl}
                      className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto"
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "110%",
                        letterSpacing: "0%",
                        color: "#ffffff",
                        verticalAlign: "middle",
                      }}
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              ))}
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