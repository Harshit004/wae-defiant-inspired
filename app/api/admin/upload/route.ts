import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
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
