"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { Edit3, Trash2, Plus, AlertTriangle } from "lucide-react"

interface Category {
  id: string
  title: string
  description: string
  imageUrl?: string
  products: any[]
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (err) {
      console.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: deleteTarget.id }),
      })

      const data = await response.json()
      if (data.success) {
        setCategories(categories.filter((cat) => cat.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        alert(data.message || "Failed to delete category")
      }
    } catch (err) {
      alert("Error deleting category.")
    } finally {
      setDeleting(false)
    }
  }

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Title bar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Product Categories
          </h1>
          <Link
            href="/admin/categories/new"
            className="bg-[#104e7a] hover:bg-[#155b8e] px-4 py-2 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <Plus size={14} />
            <span>Add</span>
          </Link>
        </div>

        {/* Categories Table */}
        <div className="w-full bg-[#02111d] border border-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-sm">Loading categories...</div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">No categories found.</div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[#051424]">
                <tr className="border-b border-white/5 text-gray-400 text-xs" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <th className="py-4 px-6 font-medium w-[35%] text-left">Product Image and Name</th>
                  <th className="py-4 px-6 font-medium w-[43%] text-left">Summary</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Products</th>
                  <th className="py-4 px-6 font-medium w-[12%] text-center">Action</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "'Manrope', sans-serif" }}>
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-[#051424] border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {cat.imageUrl ? (
                            <Image
                              src={cat.imageUrl}
                              alt={cat.title}
                              fill
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="text-[10px] text-gray-600 font-semibold uppercase">WAE</div>
                          )}
                        </div>
                        <span className="font-semibold text-white tracking-wide text-xs uppercase">
                          {cat.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <div className="line-clamp-3 text-gray-400 text-xs max-w-[550px] leading-relaxed">
                        {cat.description}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center text-white font-medium text-xs align-middle">
                      {cat.products ? cat.products.length : 0}
                    </td>
                    <td className="py-5 px-6 text-center align-middle">
                      <div className="inline-flex gap-4 justify-center">
                        <Link
                          href={`/admin/categories/${cat.id}/edit`}
                          className="text-gray-400 hover:text-white transition-all"
                          title="Edit Category"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(cat)}
                          className="text-red-500/80 hover:text-red-400 transition-all focus:outline-none cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#04111d] border border-white/10 w-full max-w-[440px] px-8 py-8 text-white relative">
            <button
              onClick={() => setDeleteTarget(null)}
              className="absolute right-6 top-6 text-gray-500 hover:text-gray-300"
            >
              ✕
            </button>

            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-md font-semibold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Delete Category
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Are you sure you want to delete &quot;{deleteTarget.title}&quot;? This will permanently remove the category. This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="border border-white/10 hover:bg-white/5 px-4 py-2 text-xs font-semibold text-white rounded-none cursor-pointer transition-all"
                    style={{ fontFamily: "'Inter Tight', sans-serif' " }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 text-xs font-semibold rounded-none cursor-pointer transition-all disabled:opacity-50"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {deleting ? "Deleting..." : "Delete Category"}
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
