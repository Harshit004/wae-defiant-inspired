import { NextResponse } from "next/server"
import { CATEGORIES } from "@/data/products"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  const baseUrl = "https://www.waecorp.com"
  const defaultDate = "2026-06-25T00:00:00.000Z"

  const urls: Array<{ loc: string; lastmod: string }> = []

  // Iterate over categories in data/products.ts
  for (const [catKey, categoryData] of Object.entries(CATEGORIES)) {
    // Exclude empty categories (e.g. pus with 0 products)
    if (!categoryData.products || categoryData.products.length === 0) {
      continue
    }

    // Category page
    urls.push({
      loc: `${baseUrl}/portfolio/${catKey}`,
      lastmod: defaultDate,
    })

    // Products within category
    for (const product of categoryData.products) {
      urls.push({
        loc: `${baseUrl}/portfolio/${catKey}/${product.id}`,
        lastmod: defaultDate,
      })
    }
  }

  const urlEntries = urls
    .map(
      (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
