import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Clean up file name to avoid special characters
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${Date.now()}_${cleanFileName}`

    const isVercel = !!process.env.VERCEL
    const isProd = process.env.NODE_ENV === "production" || isVercel
    const token = process.env.GITHUB_ACCESS_TOKEN

    const relativePath = `/uploads/${filename}`

    if (!isProd) {
      // Local development write
      const uploadDir = path.join(process.cwd(), "public", "uploads")
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)
      return NextResponse.json({ success: true, url: relativePath })
    }

    // Production Git-backed write via GitHub API
    if (!token) {
      return NextResponse.json({ success: false, message: "GITHUB_ACCESS_TOKEN not configured" }, { status: 500 })
    }

    const owner = process.env.GITHUB_OWNER || "Harshit004"
    const repo = process.env.GITHUB_REPO || "wae-defiant-inspired"
    const branch = process.env.GITHUB_BRANCH || "main"
    const gitFilePath = `public/uploads/${filename}`

    const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${gitFilePath}`
    const putRes = await fetch(putFileUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `cms: upload PDF ${file.name}`,
        content: buffer.toString("base64"),
        branch,
      }),
    })

    if (!putRes.ok) {
      const errorText = await putRes.text()
      return NextResponse.json({ success: false, message: `GitHub API upload failed: ${errorText}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: relativePath })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message || "Upload failed" }, { status: 500 })
  }
}
