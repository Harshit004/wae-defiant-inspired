import { NextResponse } from "next/server"
import { CATEGORIES } from "@/data/products"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  const baseUrl = "https://www.waecorp.com"

  const urls: string[] = []

  // Iterate over categories in data/products.ts
  for (const [catKey, categoryData] of Object.entries(CATEGORIES)) {
    // Exclude empty categories (e.g. pus with 0 products)
    if (!categoryData.products || categoryData.products.length === 0) {
      continue
    }

    // Category page
    urls.push(`${baseUrl}/portfolio/${catKey}`)

    // Products within category
    for (const product of categoryData.products) {
      urls.push(`${baseUrl}/portfolio/${catKey}/${product.id}`)
    }
  }

  const urlEntries = urls
    .map(
      (loc) => `  <url>
    <loc>${loc}</loc>
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
