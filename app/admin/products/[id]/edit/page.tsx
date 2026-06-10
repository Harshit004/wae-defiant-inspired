"use client"

import { useEffect, useState, use, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { ChevronLeft, Trash2, Plus, Save, GripVertical } from "lucide-react"

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

interface Category {
  id: string
  title: string
  products: any[]
}

interface EditProductProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProductProps) {
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Modal states
  const [showUnsavedModal, setShowUnsavedModal] = useState(false)
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState<string | null>(null)

  // Form Fields
  const [name, setName] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subCategory, setSubCategory] = useState("free-standing")
  const [status, setStatus] = useState<"Live" | "Draft">("Live")

  // Up to 4 images
  const [images, setImages] = useState<string[]>(["", "", "", ""])

  // Features List
  const [featuresList, setFeaturesList] = useState<FeatureItem[]>([])

  // Single String Specs
  const [coldTemp, setColdTemp] = useState("")
  const [hotTemp, setHotTemp] = useState("")
  const [greenCert, setGreenCert] = useState("")
  const [dripTray, setDripTray] = useState("")
  const [refrigerant, setRefrigerant] = useState("")
  const [powerReq, setPowerReq] = useState("")
  const [purificationSys, setPurificationSys] = useState("")
  const [pouSterilization, setPouSterilization] = useState("")

  // Dynamic lists
  const [storageCapacity, setStorageCapacity] = useState<SpecRow[]>([])
  const [dimensions, setDimensions] = useState<DimensionRow[]>([])

  // CMS Customization Fields
  const [description, setDescription] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [heroImage, setHeroImage] = useState("")
  const [heroTagline, setHeroTagline] = useState("")
  const [heroSubtext, setHeroSubtext] = useState("")
  const [heroCtaText, setHeroCtaText] = useState("")
  const [heroCtaLink, setHeroCtaLink] = useState("")
  const [showcaseCtaText, setShowcaseCtaText] = useState("")
  const [showcaseCtaLink, setShowcaseCtaLink] = useState("")
  const [brochurePdf, setBrochurePdf] = useState("")
  const [datasheetPdf, setDatasheetPdf] = useState("")
  const [hasHot, setHasHot] = useState(true)
  const [hasCold, setHasCold] = useState(true)
  const [hasAmbient, setHasAmbient] = useState(true)

  const [uploadingBrochure, setUploadingBrochure] = useState(false)
  const [uploadingDatasheet, setUploadingDatasheet] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/products")
        const data = await response.json()
        if (data.success) {
          setCategories(data.categories)
          const prod = data.products.find((p: any) => p.id === productId)
          if (prod) {
            setName(prod.name)
            setHeroSubtitle(prod.heroSubtitle || "")
            setStatus(prod.status || "Live")

            // Find parent category and placement type
            const parentCat = data.categories.find((c: any) =>
              c.products?.some((cp: any) => cp.id === productId)
            )
            if (parentCat) {
              setSelectedCategory(parentCat.id)
              const catProduct = parentCat.products.find((cp: any) => cp.id === productId)
              setSubCategory(catProduct?.category || "free-standing")
            } else if (data.categories.length > 0) {
              setSelectedCategory(data.categories[0].id)
            }

            // Pad images up to 4
            const loadedImages = prod.images || []
            const paddedImages = [...loadedImages]
            while (paddedImages.length < 4) {
              paddedImages.push("")
            }
            setImages(paddedImages.slice(0, 4))

            // Features List
            setFeaturesList(prod.featuresList || [])

            // Specs
            const specs = prod.specifications || {}
            setColdTemp(specs.waterTemp?.cold || "")
            setHotTemp(specs.waterTemp?.hot || "")
            setGreenCert(specs.greenCertification || "")
            setDripTray(specs.dripTray || "")
            setRefrigerant(specs.refrigerant || "")
            setPowerReq(specs.powerRequirement || "")
            setPurificationSys(specs.purificationSystem || "")
            setPouSterilization(specs.pointOfUseSterilization || "")

            // Dynamic lists
            setStorageCapacity(specs.storageCapacity || [])
            setDimensions(specs.dimensions || [])

            // Customization Fields
            setDescription(prod.description || "")
            setCategoryName(prod.categoryName || "")
            setHeroImage(prod.heroImage || "")
            setHeroTagline(prod.heroTagline || "")
            setHeroSubtext(prod.heroSubtext || "")
            setHeroCtaText(prod.heroCtaText || "")
            setHeroCtaLink(prod.heroCtaLink || "")
            setShowcaseCtaText(prod.showcaseCtaText || "")
            setShowcaseCtaLink(prod.showcaseCtaLink || "")
            setBrochurePdf(prod.brochurePdf || "")
            setDatasheetPdf(prod.datasheetPdf || "")
            
            const variants = prod.variants || { hot: true, cold: true, ambient: true }
            setHasHot(variants.hot !== false)
            setHasCold(variants.cold !== false)
            setHasAmbient(variants.ambient !== false)
          }
        }
      } catch (err) {
        console.error("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [productId])

  const handleFieldChange = (setter: any, value: any) => {
    setter(value)
    setIsDirty(true)
  }

  const handleImageChange = (index: number, val: string) => {
    const updated = [...images]
    updated[index] = val
    setImages(updated)
    setIsDirty(true)
  }

  const handleAddFeature = () => {
    setFeaturesList([...featuresList, { title: "", description: "" }])
    setIsDirty(true)
  }

  const handleRemoveFeature = (index: number) => {
    setFeaturesList(featuresList.filter((_, i) => i !== index))
    setIsDirty(true)
  }

  const handleFeatureChange = (index: number, field: "title" | "description", val: string) => {
    const updated = [...featuresList]
    updated[index][field] = val
    setFeaturesList(updated)
    setIsDirty(true)
  }

  // Drag-and-drop state for feature reordering
  const dragIndexRef = useRef<number | null>(null)
  const dragOverIndexRef = useRef<number | null>(null)

  const handleFeatureDragStart = (index: number) => {
    dragIndexRef.current = index
  }

  const handleFeatureDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragOverIndexRef.current = index
  }

  const handleFeatureDrop = (index: number) => {
    const from = dragIndexRef.current
    const to = index
    if (from === null || from === to) return
    const updated = [...featuresList]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setFeaturesList(updated)
    setIsDirty(true)
    dragIndexRef.current = null
    dragOverIndexRef.current = null
  }

  const handleFeatureDragEnd = () => {
    dragIndexRef.current = null
    dragOverIndexRef.current = null
  }

  const handleAddStorage = () => {
    setStorageCapacity([...storageCapacity, { variant: "", hot: "", cold: "", ambient: "" }])
    setIsDirty(true)
  }

  const handleRemoveStorage = (index: number) => {
    setStorageCapacity(storageCapacity.filter((_, i) => i !== index))
    setIsDirty(true)
  }

  const handleStorageChange = (index: number, field: keyof SpecRow, val: string) => {
    const updated = [...storageCapacity]
    updated[index][field] = val
    setStorageCapacity(updated)
    setIsDirty(true)
  }

  const handleAddDimension = () => {
    setDimensions([...dimensions, { variant: "", weight: "", height: "", width: "", depth: "" }])
    setIsDirty(true)
  }

  const handleRemoveDimension = (index: number) => {
    setDimensions(dimensions.filter((_, i) => i !== index))
    setIsDirty(true)
  }

  const handleDimensionChange = (index: number, field: keyof DimensionRow, val: string) => {
    const updated = [...dimensions]
    updated[index][field] = val
    setDimensions(updated)
    setIsDirty(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "brochure" | "datasheet") => {
    const file = e.target.files?.[0]
    if (!file) return

    const setter = type === "brochure" ? setBrochurePdf : setDatasheetPdf
    const setUploading = type === "brochure" ? setUploadingBrochure : setUploadingDatasheet

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        handleFieldChange(setter, data.url)
      } else {
        alert(data.message || "Failed to upload file")
      }
    } catch (err) {
      alert("Error uploading file")
    } finally {
      setUploading(false)
    }
  }

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDirty) {
      e.preventDefault()
      setPendingRedirectUrl("/admin/products")
      setShowUnsavedModal(true)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const activeImages = images.filter((img) => img.trim() !== "")
    const activeFeatures = featuresList.filter((f) => f.title.trim() !== "" || f.description.trim() !== "")
    const activeStorage = storageCapacity.filter((s) => s.variant.trim() !== "")
    const activeDimensions = dimensions.filter((d) => d.variant.trim() !== "")

    const payload = {
      action: "update",
      id: productId,
      categoryId: selectedCategory,
      subCategory: subCategory,
      productData: {
        name,
        categoryName,
        heroSubtitle,
        images: activeImages,
        featuresList: activeFeatures,
        specifications: {
          storageCapacity: activeStorage,
          waterTemp: {
            cold: coldTemp,
            hot: hotTemp
          },
          greenCertification: greenCert,
          dripTray,
          refrigerant,
          dimensions: activeDimensions,
          powerRequirement: powerReq,
          purificationSystem: purificationSys,
          pointOfUseSterilization: pouSterilization
        },
        status,
        description,
        heroImage,
        heroTagline,
        heroSubtext,
        heroCtaText,
        heroCtaLink,
        showcaseCtaText,
        showcaseCtaLink,
        brochurePdf,
        datasheetPdf,
        variants: {
          hot: hasHot,
          cold: hasCold,
          ambient: hasAmbient
        }
      }
    }

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setIsDirty(false)
        window.location.href = "/admin/products"
      } else {
        alert(data.message || "Failed to update product")
      }
    } catch (err) {
      alert("Error saving product.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Header />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link
            href="/admin/products"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-all uppercase tracking-wider font-semibold"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <ChevronLeft size={14} />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-[24px] font-normal text-white mb-8 text-left" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          Edit Product
        </h1>

        {/* Form */}
        {loading ? (
          <div className="text-center text-gray-500 text-sm py-10">Loading product details...</div>
        ) : (
          <form onSubmit={handleSave} className="w-full bg-[#04111d]/20 border border-white/5 p-8 text-left space-y-8">
            
            {/* Section 1: Basic Information */}
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                1. Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Product Slug / ID (Read-only)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={productId}
                    className="w-full bg-[#051424] border border-white/5 text-gray-500 px-4 py-3 text-sm rounded-none cursor-not-allowed select-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => handleFieldChange(setStatus, e.target.value as any)}
                    className="w-full bg-[#051424] border border-white/10 text-white px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none cursor-pointer"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    <option value="Live">Live</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Parent Category *
                  </label>
                  <select
                    required
                    value={selectedCategory}
                    onChange={(e) => handleFieldChange(setSelectedCategory, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none cursor-pointer"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Placement Sub-category *
                  </label>
                  <select
                    required
                    value={subCategory}
                    onChange={(e) => handleFieldChange(setSubCategory, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none cursor-pointer"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    <option value="free-standing">Free Standing</option>
                    <option value="counter-top">Counter Top</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Hero Section Customization */}
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                2. Hero Section Customization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Hero Background Image Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://imagedelivery.net/.../public"
                    value={heroImage}
                    onChange={(e) => handleFieldChange(setHeroImage, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Hero Subtext (Above Tagline)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Experience on-demand"
                    value={heroSubtext}
                    onChange={(e) => handleFieldChange(setHeroSubtext, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Hero Tagline
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Plastic is passe, Landfilling is zero.&#10;Sustainability is the future."
                    value={heroTagline}
                    onChange={(e) => handleFieldChange(setHeroTagline, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none resize-y"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Hero Button CTA Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Contact Us"
                    value={heroCtaText}
                    onChange={(e) => handleFieldChange(setHeroCtaText, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Hero Button Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #product-showcase or https://..."
                    value={heroCtaLink}
                    onChange={(e) => handleFieldChange(setHeroCtaLink, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Hero Subtitle (Used in Cards/Lists)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Powerful LED sterilization"
                    value={heroSubtitle}
                    onChange={(e) => handleFieldChange(setHeroSubtitle, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Product Display Section (Showcase) Customization */}
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                3. Product Display Section (Showcase) Customization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => handleFieldChange(setName, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Category Name Override
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DRINKING WATER STATION - BLUWAE Series"
                    value={categoryName}
                    onChange={(e) => handleFieldChange(setCategoryName, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Showcase Button CTA Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enquire Now"
                    value={showcaseCtaText}
                    onChange={(e) => handleFieldChange(setShowcaseCtaText, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Showcase Button Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://... (Auto defaults to # and functions as dead button if blank)"
                    value={showcaseCtaLink}
                    onChange={(e) => handleFieldChange(setShowcaseCtaLink, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
              </div>

              {/* Water Option Checkboxes */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Available Water Variants
                </label>
                <div className="flex flex-wrap gap-8 bg-[#051424]/30 border border-white/5 p-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasHot}
                      onChange={(e) => handleFieldChange(setHasHot, e.target.checked)}
                      className="w-4 h-4 bg-[#051424] border border-white/20 text-[#0081C9] focus:ring-0 rounded-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-300">Hot Variant</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasCold}
                      onChange={(e) => handleFieldChange(setHasCold, e.target.checked)}
                      className="w-4 h-4 bg-[#051424] border border-white/20 text-[#0081C9] focus:ring-0 rounded-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-300">Cold Variant</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasAmbient}
                      onChange={(e) => handleFieldChange(setHasAmbient, e.target.checked)}
                      className="w-4 h-4 bg-[#051424] border border-white/20 text-[#0081C9] focus:ring-0 rounded-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-300">Ambient Variant</span>
                  </label>
                </div>
              </div>

              {/* Carousel Images Link Inputs */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Carousel Images (Cloudflare CDN Links)
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {images.map((imgUrl, index) => (
                    <div key={index}>
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        Image Link #{index + 1}
                      </label>
                      <input
                        type="url"
                        placeholder="https://imagedelivery.net/.../public"
                        value={imgUrl}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Images Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#051424]/20 border border-dashed border-white/10 p-6">
                  {images.some((url) => url.trim() !== "") ? (
                    images.map((url, idx) => {
                      if (!url.trim()) return null
                      return (
                        <div key={idx} className="relative aspect-square bg-[#04111d] border border-white/10 flex items-center justify-center p-2 group overflow-hidden">
                          <Image
                            src={url}
                            alt={`Preview ${idx + 1}`}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleImageChange(idx, "")}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 hover:bg-red-500 transition-all focus:outline-none opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-gray-300 font-bold">
                            Image {idx + 1}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="col-span-full text-center text-xs text-gray-600 py-4">
                      No images loaded. Enter Cloudflare image CDN links above to preview.
                    </div>
                  )}
                </div>
              </div>

              {/* Features List Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-6">
                  <label className="block text-xs font-semibold text-gray-400 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Features List (Labels & Descriptions)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="border border-[#104e7a]/40 hover:bg-[#104e7a]/20 text-[#0081C9] hover:text-white px-3 py-1.5 text-[10px] font-semibold flex items-center gap-1.5 transition-all rounded-none cursor-pointer"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <Plus size={12} />
                    <span>Add Feature</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {featuresList.map((f, idx) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={() => handleFeatureDragStart(idx)}
                      onDragOver={(e) => handleFeatureDragOver(e, idx)}
                      onDrop={() => handleFeatureDrop(idx)}
                      onDragEnd={handleFeatureDragEnd}
                      className="flex gap-3 items-start bg-[#051424]/30 border border-white/5 p-4 relative transition-all duration-150 hover:border-white/10 group"
                      style={{ cursor: "grab" }}
                    >
                      {/* Drag Handle */}
                      <div
                        className="flex-shrink-0 flex items-center self-stretch text-gray-600 hover:text-gray-400 transition-colors cursor-grab active:cursor-grabbing pt-1"
                        title="Drag to reorder"
                      >
                        <GripVertical size={16} />
                      </div>

                      {/* Index Badge */}
                      <div className="flex-shrink-0 w-5 h-5 bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-gray-500 mt-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {idx + 1}
                      </div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <input
                            type="text"
                            placeholder="Feature Title"
                            value={f.title}
                            onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                            className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                            style={{ fontFamily: "'Manrope', sans-serif", cursor: "text" }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <textarea
                            rows={2}
                            placeholder="Feature Description"
                            value={f.description}
                            onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                            className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none resize-none"
                            style={{ fontFamily: "'Manrope', sans-serif", cursor: "text" }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="flex-shrink-0 text-gray-600 hover:text-red-500 p-2 transition-all focus:outline-none cursor-pointer mt-0.5"
                        title="Remove feature"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Specifications & Documents Customization */}
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                4. Specifications & Documents Customization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Product Brochure PDF URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. /brochure-download.pdf or https://..."
                      value={brochurePdf}
                      onChange={(e) => handleFieldChange(setBrochurePdf, e.target.value)}
                      className="flex-1 bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    />
                    <label className="bg-[#104e7a]/40 hover:bg-[#104e7a]/60 text-white px-4 py-3 text-xs font-semibold cursor-pointer transition-all flex items-center justify-center min-w-[100px] select-none">
                      {uploadingBrochure ? "Uploading..." : "Upload File"}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, "brochure")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Technical Datasheet PDF URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. /datasheet-download.pdf or https://..."
                      value={datasheetPdf}
                      onChange={(e) => handleFieldChange(setDatasheetPdf, e.target.value)}
                      className="flex-1 bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    />
                    <label className="bg-[#104e7a]/40 hover:bg-[#104e7a]/60 text-white px-4 py-3 text-xs font-semibold cursor-pointer transition-all flex items-center justify-center min-w-[100px] select-none">
                      {uploadingDatasheet ? "Uploading..." : "Upload File"}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, "datasheet")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Product Description (CMS only)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter product description here..."
                    value={description}
                    onChange={(e) => handleFieldChange(setDescription, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none resize-y"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
              </div>

              {/* Specifications Subsections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Water Temp Cold
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chilled: 5°C - 20°C"
                    value={coldTemp}
                    onChange={(e) => handleFieldChange(setColdTemp, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Water Temp Hot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hot: 30°C - 80°C"
                    value={hotTemp}
                    onChange={(e) => handleFieldChange(setHotTemp, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Green Certification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Meets green certification standards"
                    value={greenCert}
                    onChange={(e) => handleFieldChange(setGreenCert, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Drip Tray
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1000ml capacity"
                    value={dripTray}
                    onChange={(e) => handleFieldChange(setDripTray, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Refrigerant
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. R-134a"
                    value={refrigerant}
                    onChange={(e) => handleFieldChange(setRefrigerant, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Power Requirement
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 220V / 50Hz"
                    value={powerReq}
                    onChange={(e) => handleFieldChange(setPowerReq, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Purification System
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Multigrade filter | CTO | RO | Post Carbon Filter | LED UV-C"
                    value={purificationSys}
                    onChange={(e) => handleFieldChange(setPurificationSys, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Point of Use Sterilization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Germ Guardian™"
                    value={pouSterilization}
                    onChange={(e) => handleFieldChange(setPouSterilization, e.target.value)}
                    className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-2.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
              </div>

              {/* Sub-section: Storage Capacity Table */}
              <div className="mb-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Storage Capacity Ranges
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddStorage}
                    className="border border-[#104e7a]/40 hover:bg-[#104e7a]/20 text-[#0081C9] hover:text-white px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1.5 transition-all rounded-none cursor-pointer"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <Plus size={10} />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 uppercase font-medium">
                        <th className="pb-2 pr-4">Variant Name</th>
                        <th className="pb-2 px-4">Hot capacity (L)</th>
                        <th className="pb-2 px-4">Cold capacity (L)</th>
                        <th className="pb-2 px-4">Ambient capacity (L)</th>
                        <th className="pb-2 pl-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storageCapacity.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5">
                          <td className="py-2 pr-4">
                            <input
                              type="text"
                              required
                              placeholder="e.g. FS VAR 150"
                              value={row.variant}
                              onChange={(e) => handleStorageChange(idx, "variant", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 3"
                              value={row.hot}
                              onChange={(e) => handleStorageChange(idx, "hot", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 40"
                              value={row.cold}
                              onChange={(e) => handleStorageChange(idx, "cold", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 15"
                              value={row.ambient}
                              onChange={(e) => handleStorageChange(idx, "ambient", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 pl-4 text-right">
                            {storageCapacity.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveStorage(idx)}
                                className="text-gray-500 hover:text-red-500 p-2 transition-all focus:outline-none cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-section: Dimensions Table */}
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Product Dimensions
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddDimension}
                    className="border border-[#104e7a]/40 hover:bg-[#104e7a]/20 text-[#0081C9] hover:text-white px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1.5 transition-all rounded-none cursor-pointer"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <Plus size={10} />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 uppercase font-medium">
                        <th className="pb-2 pr-4">Variant Name</th>
                        <th className="pb-2 px-4">Weight (kg)</th>
                        <th className="pb-2 px-4">Height (mm)</th>
                        <th className="pb-2 px-4">Width (mm)</th>
                        <th className="pb-2 px-4">Depth (mm)</th>
                        <th className="pb-2 pl-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dimensions.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5">
                          <td className="py-2 pr-4">
                            <input
                              type="text"
                              required
                              placeholder="e.g. FS VAR 150"
                              value={row.variant}
                              onChange={(e) => handleDimensionChange(idx, "variant", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 45"
                              value={row.weight}
                              onChange={(e) => handleDimensionChange(idx, "weight", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 1630"
                              value={row.height}
                              onChange={(e) => handleDimensionChange(idx, "height", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 535"
                              value={row.width}
                              onChange={(e) => handleDimensionChange(idx, "width", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="e.g. 650"
                              value={row.depth}
                              onChange={(e) => handleDimensionChange(idx, "depth", e.target.value)}
                              className="w-full bg-[#051424] border border-white/10 text-white px-3 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                              style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                          </td>
                          <td className="py-2 pl-4 text-right">
                            {dimensions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveDimension(idx)}
                                className="text-gray-500 hover:text-red-500 p-2 transition-all focus:outline-none cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#104e7a] hover:bg-[#155b8e] px-8 py-3 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <Save size={14} />
                <span>{saving ? "Saving..." : "Save Product"}</span>
              </button>
            </div>
          </form>
        )}
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
