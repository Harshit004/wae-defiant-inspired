"use client"

import Image from "next/image"

interface NewsCardProps {
  imageUrl: string
  title?: string
  description?: string
  date?: string
  link?: string
  isLarge?: boolean
}

function NewsCard({ imageUrl, title, description, date, link, isLarge = false }: NewsCardProps) {
  const CardContent = (
    <div className="flex flex-col h-full group" style={{ width: '100%' }}>
      {/* Image Container */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: isLarge ? '604/319' : '382/215',
          marginBottom: isLarge ? '40px' : '31px'
        }}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title || "News image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      {(title || date) && (
        <div className="flex flex-col flex-1">
          {title && (
            <h3
              className="group-hover:text-gray-300 transition-colors duration-300"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "130%",
                color: "#FFFFFF",
                marginBottom: "20px"
              }}
            >
              {title}
            </h3>
          )}

          {description && (
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#AEAEAE",
                marginBottom: isLarge ? '27px' : '36px'
              }}
            >
              {description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between">
            {date && (
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  color: "#AEAEAE",
                }}
              >
                {date}
              </p>
            )}

            {link && (
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  textDecoration: "underline",
                }}
              >
                Read Release
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {CardContent}
      </a>
    )
  }

  return CardContent
}

interface NewsGridProps {
  cards?: NewsCardProps[]
}

export default function NewsGrid({ cards }: NewsGridProps) {
  const allCards = cards || [
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b0b96d5-689b-44ec-0cd5-52c3ddc4f200/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "Date-26/06/26",
      link: "/2026-outlook",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e4885c1-f514-4c6e-b409-56b7363e8300/public",
      title: "From activism to infrastructure: How WAE is attempting to cut India’s plastic bottle use",
      description: "Most people would rarely consider how a disposable plastic bottle of mineral water comes into being and what its long-term consequences are. It was against this context that Anupam Joshi founded WAE Water (WAE) as \"an activist venture\" almost 15 years ago.",
      date: "December 06, 2025",
      link: "https://yourstory.com/socialstory/2025/12/from-activism-to-infrastructure-how-wae-is-attempting-to-cut-indias-plastic-bottle-use",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e668674-668e-4e85-c6ba-5f0bc48af400/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "Date-26/06/26",
      link: "https://travtalkindia.com/hotels-advance-sustainability-with-glass-bottling/",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e668674-668e-4e85-c6ba-5f0bc48af400/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "Date-26/06/26",
      link: "https://indiacsr.in/strategic-csr-creating-lasting-community-impact/",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e668674-668e-4e85-c6ba-5f0bc48af400/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "Date-26/06/26",
      link: "https://www.hospitalitynet.org/opinion/4129692.html",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e668674-668e-4e85-c6ba-5f0bc48af400/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "Date-26/06/26",
      link: "https://hospibuz.com/opinion/luxury-meets-sustainability-an-interview-with-wae-fb-10567581",
    },
    {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e668674-668e-4e85-c6ba-5f0bc48af400/public",
      title: "2026 Outlook: ESG, sustainability and the next phase of India’s water infrastructure",
      description: "As India accelerates toward its developmental inflection point in the mid-2020s, water infrastructure and sustainability frameworks stand at the nexus of economic resilience, climate adaptation, and corporate governance imperatives.",
      date: "Date-26/06/26",
      link: "https://indiacsr.in/wae-foundation-safe-drinking-water-units-28-police-stations-noida/",
    },
  ]

  // Group into rows: first row has 2 items, subsequent rows have 3 items
  const rows: typeof allCards[] = []
  let currentIndex = 0

  if (allCards.length > 0) {
    // First row: 2 cards
    const firstRowSize = Math.min(2, allCards.length)
    rows.push(allCards.slice(0, firstRowSize))
    currentIndex += firstRowSize
  }

  // Rest of the rows: 3 cards
  while (currentIndex < allCards.length) {
    rows.push(allCards.slice(currentIndex, currentIndex + 3))
    currentIndex += 3
  }

  return (
    <div className="w-full max-w-full">
      {rows.map((row, rowIndex) => {
        const isLarge = rowIndex === 0;

        return (
          <div key={rowIndex}>
            {/* Row container */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${!isLarge ? 'lg:grid-cols-3' : ''} gap-[30px] lg:gap-[39px] w-full`}
            >
              {row.map((card, cardIndex) => (
                <div key={cardIndex} className="w-full">
                  <NewsCard {...card} isLarge={isLarge} />
                </div>
              ))}
            </div>

            {/* Divider between rows */}
            {rowIndex < rows.length - 1 && (
              <div
                className="w-full h-px bg-[#FFFFFF1A]"
                style={{ marginTop: '92px', marginBottom: '92px' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
