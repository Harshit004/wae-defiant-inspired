import Image from "next/image"

interface NewsCardProps {
  imageUrl: string
  title?: string
  date?: string
  imageHeight: number
}

function NewsCard({ imageUrl, title, date, imageHeight }: NewsCardProps) {
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
          {date && (
            <p
              className="mt-2"
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
          )}
        </div>
      )}
    </div>
  )
}

export default function NewsGrid() {
  const cards = {
    card1: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/43507b9f-8835-4590-fb85-018c3ad03a00/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
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
      date: "Nov 04, 2025",
    },
    card5: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/49452202-7d18-4a41-843b-897e34126800/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
      date: "Nov 04, 2025",
    },
    card6: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/44bb3d28-ee1f-4a9b-02aa-27f6d8881d00/public",
    },
    card7: {
      imageUrl: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c962425c-edb1-4cd4-e31f-19c38867c700/public",
      title: "WAE Introduces UV+UF Smart Hydration Systems for Corporate Campuses",
      date: "Nov 04, 2025",
    },
  }

  // Column percentages: 28.62%, 28.62%, 35.86% (accounting for gaps)
  // Gap: 40px = 3.45%

  return (
    <div style={{ width: "100%", maxWidth: "1160px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "40px",
          marginLeft: "-40px",
          marginTop: "-40px",
        }}
      >
        <colgroup>
          <col style={{ width: "28.62%" }} />
          <col style={{ width: "28.62%" }} />
          <col style={{ width: "35.86%" }} />
        </colgroup>
        <tbody>
          {/* Row 1: Card 1 (spans 2 cols), Card 2 */}
          <tr>
            <td colSpan={2} rowSpan={2} style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card1} imageHeight={494} />
            </td>
            <td style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card2} imageHeight={340} />
            </td>
          </tr>
          {/* Row 2: Card 4 starts (spans 2 rows) */}
          <tr>
            <td rowSpan={2} style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card4} imageHeight={591} />
            </td>
          </tr>
          {/* Row 3: Card 3 (spans 2 cols) */}
          <tr>
            <td colSpan={2} style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card3} imageHeight={295} />
            </td>
          </tr>
          {/* Row 4: Card 5 (spans 2 rows), Card 6 */}
          <tr>
            <td rowSpan={2} style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card5} imageHeight={456} />
            </td>
            <td style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card6} imageHeight={237} />
            </td>
            <td rowSpan={2}></td>
          </tr>
          {/* Row 5: Card 7 (spans cols 2-3) */}
          <tr>
            <td colSpan={2} style={{ verticalAlign: "top" }}>
              <NewsCard {...cards.card7} imageHeight={232} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
