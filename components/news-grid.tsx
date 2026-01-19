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
}

function NewsCard({ imageUrl, title, description, description2, date, imageHeight }: NewsCardProps) {
  return (
    <div>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title || "News image"}
        width={800}
        height={600}
        className="w-full object-cover"
        style={{ height: `${imageHeight}px` }}
      />
      {(title || date) && (
        <div className="mt-4">
          {title && (
            <h3
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
              <a
                href="#"
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
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
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
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/43507b9f-8835-4590-fb85-018c3ad03a00/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
      description,
      date: "Nov 04, 2025",
    },
    card2: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eefb65c0-5cfa-45ed-e6e9-6b4fbea85e00/public",
    },
    card3: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8a17983e-1a75-4cf1-db88-8a6fb0c86e00/public",
    },
    card4: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/721b6598-48b4-450f-f19a-be9b2bb22f00/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
      description,
      description2,
      date: "Nov 04, 2025",
    },
    card5: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/49452202-7d18-4a41-843b-897e34126800/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
      description,
      date: "Nov 04, 2025",
    },
    card6: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/44bb3d28-ee1f-4a9b-02aa-27f6d8881d00/public",
    },
    card7: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c962425c-edb1-4cd4-e31f-19c38867c700/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
      description,
      date: "Nov 04, 2025",
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
  const card1ImageHeight = 494
  const card1TotalHeight = card1ImageHeight + textHeight

  const card2ImageHeight = 340
  const card2Top = 0

  const card3ImageHeight = 295
  const card3Top = card1TotalHeight + gap

  const card4ImageHeight = 726
  const card4Top = card2ImageHeight + gap

  const card5Top = card3Top + card3ImageHeight + gap
  const card5ImageHeight = 456

  const card6Top = card5Top
  const card6ImageHeight = 237

  const card7Top = card6Top + card6ImageHeight + gap
  const card7ImageHeight = 232

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
