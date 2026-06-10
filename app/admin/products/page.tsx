"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { Edit3, Trash2, Plus, AlertTriangle, Eye, Filter } from "lucide-react"

interface SpecRow {
  variant: string
  hot: string
  cold: string
  ambient: string
}

interface DimensionRow {
  variant: string
  weight: string
  height: string
  width: string
  depth: string
}

interface ProductDetails {
  id: string
  name: string
  categoryName: string
  heroSubtitle: string
  images: string[]
  featuresList: Array<{ title: string; description: string }>
  specifications: {
    storageCapacity: SpecRow[]
    waterTemp: {
      cold: string
      hot: string
    }
    greenCertification: string
    dripTray: string
    refrigerant: string
    dimensions: DimensionRow[]
    powerRequirement: string
    purificationSystem: string
    pointOfUseSterilization: string
  }
  status?: "Live" | "Draft"
  description?: string
  heroImage?: string
  heroTagline?: string
  heroSubtext?: string
  heroCtaText?: string
  heroCtaLink?: string
  showcaseCtaText?: string
  showcaseCtaLink?: string
  brochurePdf?: string
  datasheetPdf?: string
  variants?: {
    hot: boolean
    cold: boolean
    ambient: boolean
  }
}

interface Category {
  id: string
  title: string
  description: string
  products: any[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDetails[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all")
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all")

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<ProductDetails | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/products")
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
        setCategories(data.categories)
      }
    } catch (err) {
      console.error("Failed to load products and categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: deleteTarget.id }),
      })

      const data = await response.json()
      if (data.success) {
        setProducts(products.filter((p) => p.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        alert(data.message || "Failed to delete product")
      }
    } catch (err) {
      alert("Error deleting product.")
    } finally {
      setDeleting(false)
    }
  }

  // Filter products by category, status, and search query
  const filteredProducts = products.filter((p) => {
    // 1. Search Query
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.heroSubtitle.toLowerCase().includes(searchQuery.toLowerCase())

    // 2. Category Filter
    // Find the category key for the product. In our DB structure, the product could be linked to a category ID.
    // Let's find which category has this product in its products list.
    const parentCategory = categories.find((c) =>
      c.products?.some((cp: any) => cp.id === p.id)
    )
    const matchesCategory =
      selectedCategoryFilter === "all" ||
      parentCategory?.id === selectedCategoryFilter

    // 3. Status Filter
    const productStatus = p.status || "Live"
    const matchesStatus =
      selectedStatusFilter === "all" || productStatus === selectedStatusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Helper to get category title and placement type for the product
  const getProductCategoryInfo = (prodId: string) => {
    const cat = categories.find((c) =>
      c.products?.some((cp: any) => cp.id === prodId)
    )
    const catProduct = cat?.products?.find((cp: any) => cp.id === prodId)
    return {
      categoryTitle: cat?.title || "Unknown Category",
      placement: catProduct?.category || "free-standing",
    }
  }

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Title and Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Products Management
            </h1>
            <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Manage, preview, and update all product models and variants.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-[#04111d] border border-white/5 px-3 py-2">
              <Filter size={12} className="text-gray-500" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer pr-4"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <option value="all" className="bg-[#04111d] text-white">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#04111d] text-white">
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-[#04111d] border border-white/5 px-3 py-2">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer pr-4"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <option value="all" className="bg-[#04111d] text-white">All Statuses</option>
                <option value="Live" className="bg-[#04111d] text-white">Live</option>
                <option value="Draft" className="bg-[#04111d] text-white">Draft</option>
              </select>
            </div>

            {/* Add Product button */}
            <Link
              href="/admin/products/new"
              className="bg-[#104e7a] hover:bg-[#155b8e] px-4 py-2 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <Plus size={14} />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {/* Products Table */}
        <div className="w-full bg-[#02111d] border border-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-sm">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">No products found.</div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-[11px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <th className="py-4 px-6 font-medium w-[32%] text-left">Product Image and Name</th>
                  <th className="py-4 px-6 font-medium w-[23%] text-left">Category / Placement</th>
                  <th className="py-4 px-6 font-medium w-[25%] text-left">Hero Subtitle</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Status</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Action</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "'Manrope', sans-serif" }}>
                {filteredProducts.map((p) => {
                  const { categoryTitle, placement } = getProductCategoryInfo(p.id)
                  const isLive = (p.status || "Live") === "Live"
                  return (
                    <tr key={p.id} className="hover:bg-white/[0.01] transition-all">
                      {/* Product Image & Name */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 bg-[#051424] border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {p.images && p.images[0] ? (
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                className="object-contain p-1"
                              />
                            ) : (
                              <div className="text-[10px] text-gray-600 font-semibold uppercase">WAE</div>
                            )}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-white tracking-wide text-[11px]">
                              {p.name}
                            </span>
                            <span className="text-[9px] text-gray-500 mt-0.5">
                              ID: {p.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Placement */}
                      <td className="py-5 px-6 text-[11px] align-middle">
                        <div className="text-gray-200 text-[11px]">{categoryTitle}</div>
                        <div className="text-gray-500 mt-1 capitalize text-[9px]">{placement.replace("-", " ")}</div>
                      </td>

                      {/* Hero Subtitle */}
                      <td className="py-5 px-6 text-gray-400 text-[11px] align-middle">
                        <div className="max-w-[220px] text-[11px] truncate">{p.heroSubtitle || "-"}</div>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 text-center align-middle">
                        <span className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-none ${
                          isLive 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}>
                          {p.status || "Live"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-center align-middle">
                        <div className="inline-flex gap-4 justify-center">
                          <Link
                            href={`/admin/products/${p.id}/view`}
                            className="text-gray-400 hover:text-white transition-all"
                            title="Preview product details"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="text-gray-400 hover:text-white transition-all"
                            title="Edit product"
                          >
                            <Edit3 size={16} />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(p)}
                            className="text-red-500/80 hover:text-red-400 transition-all focus:outline-none cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
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
                  Delete Product
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Are you sure you want to delete product &quot;{deleteTarget.name}&quot;? This will permanently remove the product from its categories. This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="border border-white/10 hover:bg-white/5 px-4 py-2 text-xs font-semibold text-white rounded-none cursor-pointer transition-all"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 text-xs font-semibold rounded-none cursor-pointer transition-all disabled:opacity-50"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {deleting ? "Deleting..." : "Delete Product"}
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
