"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { ChevronLeft, Trash2, Save } from "lucide-react"

export default function NewCategoryPage() {
  const [title, setTitle] = useState("")
  const [pageUrl, setPageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const [loading, setLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  
  // Modal states
  const [showUnsavedModal, setShowUnsavedModal] = useState(false)
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState<string | null>(null)

  const handleFieldChange = (setter: (val: string) => void, val: string) => {
    setter(val)
    setIsDirty(true)
  }

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDirty) {
      e.preventDefault()
      setPendingRedirectUrl("/admin/categories")
      setShowUnsavedModal(true)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title,
          description,
          imageUrl,
          paragraphs: [description]
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsDirty(false)
        window.location.href = "/admin/categories"
      } else {
        alert(data.message || "Failed to create category")
      }
    } catch (err) {
      alert("Error saving category.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link
            href="/admin/categories"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-all uppercase tracking-wider font-semibold"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <ChevronLeft size={14} />
            <span>Back to Categories</span>
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-[24px] font-normal text-white mb-8 text-left" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          Add Category
        </h1>

        {/* Main form container */}
        <form onSubmit={handleSave} className="w-full bg-[#04111d]/20 border border-white/5 p-8 text-left space-y-6">
          <div className="border-b border-white/5 pb-4 mb-6">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              New Category
            </h2>
            <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Fill out the details of the category. All changes will be reflected across the platform.
            </p>
          </div>

          {/* Row 1: Title and Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Category Name
              </label>
              <input
                type="text"
                required
                placeholder="Category Name"
                value={title}
                onChange={(e) => handleFieldChange(setTitle, e.target.value)}
                className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Page URL / Slug
              </label>
              <input
                type="text"
                required
                placeholder="e.g. /products/drinking-water-station-bluwae"
                value={pageUrl}
                onChange={(e) => handleFieldChange(setPageUrl, e.target.value)}
                className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
            </div>
          </div>

          {/* Row 2: Summary */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Summary
            </label>
            <textarea
              required
              rows={4}
              placeholder="Add Summary"
              value={description}
              onChange={(e) => handleFieldChange(setDescription, e.target.value)}
              className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none resize-none"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />
          </div>

          {/* Row 3: Paste Image Link */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Paste CDN Image URL
            </label>
            <input
              type="url"
              placeholder="https://imagedelivery.net/.../public"
              value={imageUrl}
              onChange={(e) => handleFieldChange(setImageUrl, e.target.value)}
              className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />

            {/* Render Preview Card if URL is entered */}
            {imageUrl ? (
              <div className="bg-[#051424] border border-white/10 p-4 flex items-center justify-between gap-4 w-fit min-w-[320px]">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-white/5 border border-white/5 overflow-hidden shrink-0">
                    <Image
                      src={imageUrl}
                      alt="Category Preview"
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // fallback image on error
                        e.currentTarget.src = "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white line-clamp-1 max-w-[200px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      {imageUrl.substring(imageUrl.lastIndexOf("/") + 1) || "category-image.jpg"}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      CDN Link Loaded
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFieldChange(setImageUrl, "")}
                  className="text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-white/10 p-6 text-center text-xs text-gray-600 rounded-none bg-[#051424]/20">
                No image loaded. Paste a Cloudflare image CDN link above to preview.
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#104e7a] hover:bg-[#155b8e] px-8 py-3 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none cursor-pointer disabled:opacity-50"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <Save size={14} />
              <span>{loading ? "Saving..." : "Save Category"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Unsaved Changes Warning Modal */}
      {showUnsavedModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#04111d] border border-white/10 w-full max-w-[440px] px-8 py-8 text-white relative">
            <button
              onClick={() => setShowUnsavedModal(false)}
              className="absolute right-6 top-6 text-gray-500 hover:text-gray-300"
            >
              ✕
            </button>

            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-md font-semibold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Unsaved Changes!
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  You have unsaved changes. Leaving this page will discard them.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowUnsavedModal(false)}
                    className="border border-white/10 hover:bg-white/5 px-4 py-2 text-xs font-semibold text-white rounded-none cursor-pointer transition-all"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsDirty(false)
                      if (pendingRedirectUrl) {
                        window.location.href = pendingRedirectUrl
                      }
                    }}
                    className="bg-[#104e7a] hover:bg-[#155b8e] text-white px-4 py-2 text-xs font-semibold rounded-none cursor-pointer transition-all"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
