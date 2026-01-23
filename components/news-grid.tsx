"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"

interface NewsCardProps {
  imageUrl: string
  title?: string
  description?: string
  description2?: string
  date?: string
  imageHeight: number
  objectPosition?: string
  link?: string
}

function NewsCard({ imageUrl, title, description, description2, date, imageHeight, objectPosition, link }: NewsCardProps) {
  const CardContent = (
    <div>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title || "News image"}
        width={800}
        height={600}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ height: `${imageHeight}px`, objectPosition }}
      />
      {(title || date) && (
        <div className="mt-4">
          {title && (
            <h3
              className="group-hover:text-gray-600 transition-colors duration-300"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "120%",
                color: "#000000",
              }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className="mt-2"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "130%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              {description}
            </p>
          )}
          {date && (
            <div className="mt-2 flex items-center justify-between">
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  color: "#00000099",
                }}
              >
                {date}
              </p>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#000000",
                  textDecoration: "underline",
                  textDecorationStyle: "solid",
                }}
              >
                Read Release
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block group h-full">
        {CardContent}
      </a>
    )
  }

  return CardContent
}

export default function NewsGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const description =
    "In the quiet halls of Kyoto in 1997, something monumental began a collective awakening of the world's conscience towards the mounting crisis of climate change."
  const description2 =
    "In the quiet halls of Kyoto in 1997, something monumental began a collective awakening of the world's conscience towards the mounting crisis of climate change."

  const cards = {
    card1: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b0b96d5-689b-44ec-0cd5-52c3ddc4f200/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "January 12, 2026",
      link: "https://etedge-insights.com/sdgs-and-esg/sustainability/2026-outlook-esg-sustainability-and-the-next-phase-of-indias-water-infrastructure/",
    },
    card2: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c5b5b9ca-0c88-466b-7d0d-8bfd8c79c000/public",
      link: "https://travtalkindia.com/hotels-advance-sustainability-with-glass-bottling/",
    },
    card3: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0d69d654-fca7-4859-e573-6690ccfe6400/public",
      link: "https://indiacsr.in/strategic-csr-creating-lasting-community-impact/",
    },
    card4: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e4885c1-f514-4c6e-b409-56b7363e8300/public",
      title: "From activism to infrastructure: How WAE is attempting to cut India’s plastic bottle use",
      description: "Most people would rarely consider how a disposable plastic bottle of mineral water comes into being and what its long-term consequences are. It was against this context that Anupam Joshi founded WAE Water (WAE) as “an activist venture” almost 15 years ago.",
      date: "December 06, 2025",
      link: "https://yourstory.com/socialstory/2025/12/from-activism-to-infrastructure-how-wae-is-attempting-to-cut-indias-plastic-bottle-use",
    },
    card5: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/62e1be2c-5a3b-45d7-825d-bc6a0b0eac00/public",
      title: "How Club Mahindra Quietly Solved Hospitality’s Biggest Plastic Problem",
      description: "India’s hospitality industry is waking up to a silent pollutant: Plastic. While many hotel chains are still searching for alternatives, Club Mahindra has already turned sustainability into action. ",
      date: "11 November 2025",
      link: "https://www.hospitalitynet.org/opinion/4129692.html",
    },
    card6: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e668674-668e-4e85-c6ba-5f0bc48af400/public",
      link: "https://hospibuz.com/opinion/luxury-meets-sustainability-an-interview-with-wae-fb-10567581",
    },
    card7: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce3e9012-cce0-4574-9d36-2c212da3dd00/public",
      objectPosition: "bottom",
      link: "https://indiacsr.in/wae-foundation-safe-drinking-water-units-28-police-stations-noida/",
    },
  }

  // Base dimensions (original design size)
  const baseWidth = 1160
  const gap = 40
  const col1 = 332
  const col2 = 332
  const col3 = 416

  // Calculate text area heights (title + description + date line ~135px for cards with text)
  const textHeight = 135
  const card1ImageHeight = 340
  const card1TotalHeight = card1ImageHeight + textHeight

  const card2ImageHeight = 340
  const card2Top = 0

  const card3ImageHeight = 295
  const card3Top = card1TotalHeight + gap

  const card4ImageHeight = 489
  const card4Top = card2ImageHeight + gap

  const card5Top = card3Top + card3ImageHeight + gap
  const card5ImageHeight = 372

  const card6Top = card5Top
  const card6ImageHeight = 237

  const card7Top = card6Top + card6ImageHeight + gap
  const card7ImageHeight = 264

  const totalHeight = card7Top + card7ImageHeight + textHeight

  // Calculate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // Get the actual available width (accounting for padding)
        const containerWidth = containerRef.current.offsetWidth
        const calculatedScale = Math.min(1, containerWidth / baseWidth)
        setScale(Math.max(0.1, calculatedScale)) // Ensure scale is never too small
      }
    }

    // Initial calculation with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateScale, 0)

    // Use ResizeObserver for more accurate measurements
    let resizeObserver: ResizeObserver | null = null
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateScale)
      resizeObserver.observe(containerRef.current)
    }

    // Fallback to window resize listener
    window.addEventListener("resize", updateScale)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", updateScale)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full max-w-full overflow-hidden"
      style={{
        position: "relative",
        height: `${totalHeight * scale}px`
      }}
    >
      <div
        style={{
          width: `${baseWidth}px`,
          height: `${totalHeight}px`,
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "top left"
        }}
      >
        {/* Card 1: top-left, spans 2 cols */}
        <div style={{ position: "absolute", top: 0, left: 0, width: `${col1 + gap + col2}px` }}>
          <NewsCard {...cards.card1} imageHeight={card1ImageHeight} />
        </div>

        {/* Card 2: top-right, col3 */}
        <div style={{ position: "absolute", top: card2Top, left: `${col1 + gap + col2 + gap}px`, width: `${col3}px` }}>
          <NewsCard {...cards.card2} imageHeight={card2ImageHeight} />
        </div>

        {/* Card 3: below card 1, spans 2 cols */}
        <div style={{ position: "absolute", top: `${card3Top}px`, left: 0, width: `${col1 + gap + col2}px` }}>
          <NewsCard {...cards.card3} imageHeight={card3ImageHeight} />
        </div>

        {/* Card 4: below card 2, col3 */}
        <div
          style={{ position: "absolute", top: `${card4Top}px`, left: `${col1 + gap + col2 + gap}px`, width: `${col3}px` }}
        >
          <NewsCard {...cards.card4} imageHeight={card4ImageHeight} />
        </div>

        {/* Card 5: col1 */}
        <div style={{ position: "absolute", top: `${card5Top}px`, left: 0, width: `${col1}px` }}>
          <NewsCard {...cards.card5} imageHeight={card5ImageHeight} />
        </div>

        {/* Card 6: col2 */}
        <div style={{ position: "absolute", top: `${card6Top}px`, left: `${col1 + gap}px`, width: `${col2}px` }}>
          <NewsCard {...cards.card6} imageHeight={card6ImageHeight} />
        </div>

        {/* Card 7: spans col2+col3 */}
        <div
          style={{ position: "absolute", top: `${card7Top}px`, left: `${col1 + gap}px`, width: `${col2 + gap + col3}px` }}
        >
          <NewsCard {...cards.card7} imageHeight={card7ImageHeight} />
        </div>
      </div>
    </div>
  )
}
