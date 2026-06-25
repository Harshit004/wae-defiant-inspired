"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { ChevronLeft, Edit3, ShieldAlert, Package, Check, RefreshCw } from "lucide-react"

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

interface FeatureItem {
  title: string
  description: string
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
    powerRequirement: string;
    purificationSystem: string;
    pointOfUseSterilization: string;
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
  variants?: {
    hot: boolean
    cold: boolean
    ambient: boolean
  }
  displayImageIndex?: number
}

interface ViewProductProps {
  params: Promise<{ id: string }>
}

export default function ViewProductPage({ params }: ViewProductProps) {
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/admin/products")
        const data = await response.json()
        if (data.success) {
          const prod = data.products.find((p: any) => p.id === productId)
          if (prod) {
            setProduct(prod)
          }
        }
      } catch (err) {
        console.error("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex-1 bg-black text-white flex items-center justify-center p-10">
          <div className="text-center text-gray-500 text-sm">Loading product preview...</div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-10 gap-4">
          <ShieldAlert size={48} className="text-red-500" />
          <h2 className="text-lg font-semibold text-white">Product Not Found</h2>
          <p className="text-xs text-gray-500">The product with ID &quot;{productId}&quot; does not exist.</p>
          <Link href="/admin/products" className="bg-[#104e7a] px-4 py-2 text-xs font-semibold">
            Back to Products
          </Link>
        </div>
      </>
    )
  }

  const isLive = (product.status || "Live") === "Live"
  const imagesList = product.images || []

  return (
    <>
      <Header />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Navigation / Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-all uppercase tracking-wider font-semibold mb-2"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <ChevronLeft size={14} />
              <span>Back to Products</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {product.name}
              </h1>
              <span className={`inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-none ${
                isLive 
                  ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              }`}>
                {product.status || "Live"}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Category: {product.categoryName} | ID: {product.id}
            </p>
          </div>

          <Link
            href={`/admin/products/${product.id}/edit`}
            className="bg-[#104e7a] hover:bg-[#155b8e] px-4 py-2 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none self-start md:self-auto"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <Edit3 size={14} />
            <span>Edit Product</span>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image Gallery Card */}
          <div className="lg:col-span-1 bg-[#04111d]/20 border border-white/5 p-6 flex flex-col">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Product Images
            </h3>

            {imagesList.length > 0 ? (
              <>
                <div className="relative w-full aspect-square bg-[#04111d] border border-white/10 overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={imagesList[activeImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                {/* Thumbnails list */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {imagesList.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square bg-[#04111d] border overflow-hidden p-1 transition-all ${
                        idx === activeImageIndex ? "border-[#0081C9]" : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <Image
                        src={url}
                        alt={`Thumb ${idx + 1}`}
                        fill
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 border border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600 text-xs p-10 min-h-[250px]">
                <Package size={32} className="mb-2" />
                <span>No images uploaded</span>
              </div>
            )}
          </div>

          {/* Right Column: Hero Subtitle & Features */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Subtitle Card */}
            <div className="bg-[#04111d]/20 border border-white/5 p-6 text-left">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Hero Subtitle copy
              </h3>
              <p className="text-sm text-gray-300 italic">
                &ldquo;{product.heroSubtitle || "No subtitle copy added"}&rdquo;
              </p>
            </div>

            {/* Features Card */}
            <div className="bg-[#04111d]/20 border border-white/5 p-6 text-left">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Key Features List
              </h3>
              
              {product.featuresList && product.featuresList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.featuresList.map((feature, idx) => (
                    <div key={idx} className="bg-[#051424]/30 border border-white/5 p-4 text-left">
                      <h4 className="text-xs font-semibold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {feature.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No key features defined.</p>
              )}
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-[#04111d]/20 border border-white/5 p-8 text-left mt-8 space-y-8">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Specifications Details
          </h2>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border border-white/5 bg-[#051424]/20 p-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Water Temp (Cold)</span>
              <span className="text-xs text-gray-200">{product.specifications?.waterTemp?.cold || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Water Temp (Hot)</span>
              <span className="text-xs text-gray-200">{product.specifications?.waterTemp?.hot || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Drip Tray</span>
              <span className="text-xs text-gray-200">{product.specifications?.dripTray || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Refrigerant</span>
              <span className="text-xs text-gray-200">{product.specifications?.refrigerant || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Power Requirement</span>
              <span className="text-xs text-gray-200">{product.specifications?.powerRequirement || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4 col-span-1 sm:col-span-2">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Point of Use Sterilization</span>
              <span className="text-xs text-gray-200">{product.specifications?.pointOfUseSterilization || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Green Certification</span>
              <span className="text-xs text-gray-200">{product.specifications?.greenCertification || "-"}</span>
            </div>
            <div className="border border-white/5 bg-[#051424]/20 p-4 col-span-1 sm:col-span-2 md:col-span-4">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">Purification System</span>
              <span className="text-xs text-gray-200">{product.specifications?.purificationSystem || "-"}</span>
            </div>
          </div>

          {/* Tables Row: Storage and Dimensions */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Storage capacity table */}
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Storage Capacity ranges
              </h3>
              {product.specifications?.storageCapacity && product.specifications.storageCapacity.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 uppercase font-medium">
                      <th className="py-2 pr-4">Variant</th>
                      <th className="py-2 px-4">Hot</th>
                      <th className="py-2 px-4">Cold</th>
                      <th className="py-2 px-4">Ambient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specifications.storageCapacity.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01]">
                        <td className="py-3 pr-4 text-gray-200 font-semibold">{row.variant}</td>
                        <td className="py-3 px-4 text-gray-400">{row.hot} L</td>
                        <td className="py-3 px-4 text-gray-400">{row.cold} L</td>
                        <td className="py-3 px-4 text-gray-400">{row.ambient} L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-xs text-gray-500">No capacity ranges specified.</p>
              )}
            </div>

            {/* Dimensions table */}
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Product Dimensions (WxDxH)
              </h3>
              {product.specifications?.dimensions && product.specifications.dimensions.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 uppercase font-medium">
                      <th className="py-2 pr-4">Variant</th>
                      <th className="py-2 px-4">Weight</th>
                      <th className="py-2 px-4">Height</th>
                      <th className="py-2 px-4">Width</th>
                      <th className="py-2 px-4">Depth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specifications.dimensions.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01]">
                        <td className="py-3 pr-4 text-gray-200 font-semibold">{row.variant}</td>
                        <td className="py-3 px-4 text-gray-400">{row.weight || "-"} kg</td>
                        <td className="py-3 px-4 text-gray-400">{row.height || "-"} mm</td>
                        <td className="py-3 px-4 text-gray-400">{row.width || "-"} mm</td>
                        <td className="py-3 px-4 text-gray-400">{row.depth || "-"} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-xs text-gray-500">No dimensions specified.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
