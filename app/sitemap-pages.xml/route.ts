import { NextResponse } from "next/server"
import { JOBS } from "@/data/jobs"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  const baseUrl = "https://www.waecorp.com"

  const staticPages = [
    { path: "" },
    { path: "/profile" },
    { path: "/portfolio" },
    { path: "/careers" },
    { path: "/sustainability" },
    { path: "/activism" },
    { path: "/memberships" },
    { path: "/compliance" },
    { path: "/life-at-wae" },
    { path: "/contact-us" },
    { path: "/perspectives" },
    { path: "/terms-of-use" },
    { path: "/cookie-policy" },
    { path: "/data-privacy-policy" },
    { path: "/sitemap" },
  ]

  const liveJobs = Object.values(JOBS)
    .filter((j) => j.status === "Live")
    .map((job) => ({
      path: `/join-wae/${job.id}`,
      lastmod: job.createdAt,
    }))

  const allUrls: Array<{ path: string; lastmod?: string }> = [...staticPages, ...liveJobs]

  const urlEntries = allUrls
    .map(
      (item) => `  <url>
    <loc>${baseUrl}${item.path}</loc>${item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : ""}
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
