import { NextResponse } from "next/server"
import { JOBS } from "@/data/jobs"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  const baseUrl = "https://www.waecorp.com"
  const defaultDate = "2026-06-01T00:00:00.000Z"

  const staticPages = [
    { path: "", lastmod: "2026-06-25T00:00:00.000Z" },
    { path: "/profile", lastmod: "2026-06-20T00:00:00.000Z" },
    { path: "/portfolio", lastmod: "2026-06-24T00:00:00.000Z" },
    { path: "/careers", lastmod: "2026-06-15T00:00:00.000Z" },
    { path: "/sustainability", lastmod: "2026-06-22T00:00:00.000Z" },
    { path: "/activism", lastmod: "2026-06-18T00:00:00.000Z" },
    { path: "/memberships", lastmod: "2026-06-10T00:00:00.000Z" },
    { path: "/compliance", lastmod: "2026-06-12T00:00:00.000Z" },
    { path: "/life-at-wae", lastmod: "2026-06-14T00:00:00.000Z" },
    { path: "/contact-us", lastmod: "2026-06-25T00:00:00.000Z" },
    { path: "/perspectives", lastmod: "2026-06-25T00:00:00.000Z" },
    { path: "/terms-of-use", lastmod: "2026-01-01T00:00:00.000Z" },
    { path: "/cookie-policy", lastmod: "2026-01-01T00:00:00.000Z" },
    { path: "/data-privacy-policy", lastmod: "2026-01-01T00:00:00.000Z" },
    { path: "/sitemap", lastmod: "2026-06-25T00:00:00.000Z" },
  ]

  const liveJobs = Object.values(JOBS)
    .filter((j) => j.status === "Live")
    .map((job) => ({
      path: `/join-wae/${job.id}`,
      lastmod: job.createdAt || defaultDate,
    }))

  const allUrls = [...staticPages, ...liveJobs]

  const urlEntries = allUrls
    .map(
      (item) => `  <url>
    <loc>${baseUrl}${item.path}</loc>
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
