import { NextRequest, NextResponse } from "next/server"
import { getStorage } from "firebase-admin/storage"
import "@/lib/firebase-admin"

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

    // Upload to Firebase Storage
    const bucket = getStorage().bucket();
    const fileRef = bucket.file(`uploads/${filename}`);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    const bucketName = bucket.name;
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(fileRef.name)}?alt=media`;

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message || "Upload failed" }, { status: 500 })
  }
}
