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

    // Upload to Vercel Blob
    const blob = await put(`uploads/${filename}`, file, {
      access: 'public',
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message || "Upload failed" }, { status: 500 })
  }
}
