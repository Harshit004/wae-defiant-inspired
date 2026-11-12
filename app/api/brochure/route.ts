import { NextRequest, NextResponse } from "next/server"
import { get } from "@vercel/blob"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get("url")
    if (!url) {
      return new NextResponse("Missing url parameter", { status: 400 })
    }

    // Security check: ensure URL belongs to vercel-storage
    const parsed = new URL(url)
    if (!parsed.hostname.endsWith(".blob.vercel-storage.com")) {
      return new NextResponse("Invalid blob URL", { status: 400 })
    }

    const result = await get(url, { access: "private" })
    if (!result || result.statusCode !== 200 || !result.stream) {
      return new NextResponse("File not found", { status: 404 })
    }

    return new NextResponse(result.stream as any, {
      status: 200,
      headers: {
        "Content-Type": result.headers.get("content-type") || "application/pdf",
        "Content-Disposition": result.headers.get("content-disposition") || "inline",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    })
  } catch (error: any) {
    console.error("Error serving private brochure:", error)
    return new NextResponse("Failed to load document", { status: 500 })
  }
}

