import { NextResponse } from "next/server"
import { BLOGS } from "@/data/blogs"

export const dynamic = "force-static"
export const revalidate = 86400

const CATEGORIES = [
  "climate-change-water",
  "policy",
  "water-conservation",
  "industry-impact-and-solutions",
  "technology",
]

export async function GET() {
  const baseUrl = "https://www.waecorp.com"
  const defaultDate = "2026-06-25T00:00:00.000Z"

  const urls: Array<{ loc: string; lastmod: string }> = []

  // Blog hub
  urls.push({
    loc: `${baseUrl}/perspectives`,
    lastmod: defaultDate,
  })

  // Category pages
  for (const catSlug of CATEGORIES) {
    urls.push({
      loc: `${baseUrl}/perspectives/${catSlug}`,
      lastmod: defaultDate,
    })
  }

  // Live blog articles
  const liveBlogs = Object.values(BLOGS).filter(
    (b) => b.status === "Live" && !b.id.endsWith("-tst")
  )

  for (const blog of liveBlogs) {
    const categorySlug = blog.category
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    urls.push({
      loc: `${baseUrl}/perspectives/${categorySlug}/${blog.id}`,
      lastmod: blog.createdAt || defaultDate,
    })
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
