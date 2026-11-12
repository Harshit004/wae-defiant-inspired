import { NextRequest, NextResponse } from "next/server"
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { put } from "@vercel/blob"

export async function POST(req: Request): Promise<NextResponse> {
  const contentType = req.headers.get("content-type") || ""

  // Case 1: Client-side direct upload handshake (JSON payload)
  if (contentType.includes("application/json")) {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
          { error: "BLOB_READ_WRITE_TOKEN is not set in this environment's variables. Please check Vercel settings and redeploy." },
          { status: 500 }
        )
      }

      const body = (await req.json()) as HandleUploadBody
      const jsonResponse = await handleUpload({
        token: process.env.BLOB_READ_WRITE_TOKEN,
        body,
        request: req,
        onBeforeGenerateToken: async (pathname) => {
          return {
            allowedContentTypes: ["application/pdf"],
            maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB limit
          }
        },
      })
      return NextResponse.json(jsonResponse)
    } catch (error: any) {
      console.error("handleUpload error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  }

  // Case 2: Server-side FormData fallback
  try {
    const formData = await (req as NextRequest).formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    // Clean up file name to avoid special characters
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${Date.now()}_${cleanFileName}`

    let blob
    try {
      // First try public access (if store is public)
      blob = await put(`uploads/${filename}`, file, {
        access: 'public',
      })
      return NextResponse.json({ success: true, url: blob.url })
    } catch (publicError: any) {
      // If store is configured as private, upload with private access and route via /api/brochure
      if (publicError?.message?.includes('private')) {
        blob = await put(`uploads/${filename}`, file, {
          access: 'private',
        })
        const viewUrl = `/api/brochure?url=${encodeURIComponent(blob.url)}`
        return NextResponse.json({ success: true, url: viewUrl })
      }
      throw publicError
    }
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message || "Upload failed" }, { status: 500 })
  }
}
