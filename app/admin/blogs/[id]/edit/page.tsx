"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Header from "@/components/admin/header"
import { ChevronLeft, Trash2, Plus, Save, MoveUp, MoveDown, FileText } from "lucide-react"

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list';
  text?: string;
  items?: string[];
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imageSrcHover: string;
  heroImage: string;
  writerId: string;
  readTime: string;
  status: 'Live' | 'Draft';
  createdAt: string;
  contentColumns: [ContentBlock[], ContentBlock[], ContentBlock[]];
}

interface Writer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  link: string;
}

export default function EditBlogPage() {
  const params = useParams()
  const id = params?.id as string

  const [writers, setWriters] = useState<Writer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Form Fields
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Climate Change & Water")
  const [description, setDescription] = useState("")
  const [imageSrc, setImageSrc] = useState("")
  const [imageSrcHover, setImageSrcHover] = useState("")
  const [heroImage, setHeroImage] = useState("")
  const [writerId, setWriterId] = useState("aditi-sharma")
  const [readTime, setReadTime] = useState("2 min read")
  const [status, setStatus] = useState<"Live" | "Draft">("Live")

  // Content Columns (3 Columns)
  const [col1, setCol1] = useState<ContentBlock[]>([])
  const [col2, setCol2] = useState<ContentBlock[]>([])
  const [col3, setCol3] = useState<ContentBlock[]>([])
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin/blogs")
        const data = await res.json()
        if (data.success) {
          setWriters(data.writers)
          
          // Find target blog
          const blog = data.blogs.find((b: BlogPost) => b.id === id)
          if (blog) {
            setTitle(blog.title)
            setCategory(blog.category)
            setDescription(blog.description)
            setImageSrc(blog.imageSrc)
            setImageSrcHover(blog.imageSrcHover)
            setHeroImage(blog.heroImage)
            setWriterId(blog.writerId)
            setReadTime(blog.readTime)
            setStatus(blog.status)
            
            // Content columns
            setCol1(blog.contentColumns?.[0] || [])
            setCol2(blog.contentColumns?.[1] || [])
            setCol3(blog.contentColumns?.[2] || [])
          } else {
            alert("Blog post not found.")
          }
        }
      } catch (err) {
        console.error("Failed to load writers and blog data")
      } finally {
        setLoading(false)
      }
    }
    if (id) loadData()
  }, [id])

  const handleFieldChange = (setter: any, value: any) => {
    setter(value)
    setIsDirty(true)
  }

  // Block management
  const getColSetter = (index: number) => {
    if (index === 0) return { val: col1, set: setCol1 };
    if (index === 1) return { val: col2, set: setCol2 };
    return { val: col3, set: setCol3 };
  }

  const addBlock = (colIndex: number, type: 'paragraph' | 'heading' | 'list') => {
    const { val, set } = getColSetter(colIndex);
    const newBlock: ContentBlock = {
      type,
      text: type !== 'list' ? '' : undefined,
      items: type === 'list' ? [''] : undefined
    };
    set([...val, newBlock]);
    setIsDirty(true);
  }

  const removeBlock = (colIndex: number, blockIdx: number) => {
    const { val, set } = getColSetter(colIndex);
    set(val.filter((_, i) => i !== blockIdx));
    setIsDirty(true);
  }

  const moveBlock = (colIndex: number, blockIdx: number, direction: 'up' | 'down') => {
    const { val, set } = getColSetter(colIndex);
    const targetIdx = direction === 'up' ? blockIdx - 1 : blockIdx + 1;
    if (targetIdx < 0 || targetIdx >= val.length) return;

    const updated = [...val];
    const temp = updated[blockIdx];
    updated[blockIdx] = updated[targetIdx];
    updated[targetIdx] = temp;
    set(updated);
    setIsDirty(true);
  }

  const updateBlockText = (colIndex: number, blockIdx: number, text: string) => {
    const { val, set } = getColSetter(colIndex);
    const updated = [...val];
    updated[blockIdx] = { ...updated[blockIdx], text };
    set(updated);
    setIsDirty(true);
  }

  const addListItem = (colIndex: number, blockIdx: number) => {
    const { val, set } = getColSetter(colIndex);
    const updated = [...val];
    const block = updated[blockIdx];
    if (block.items) {
      block.items = [...block.items, ''];
      set(updated);
      setIsDirty(true);
    }
  }

  const removeListItem = (colIndex: number, blockIdx: number, itemIdx: number) => {
    const { val, set } = getColSetter(colIndex);
    const updated = [...val];
    const block = updated[blockIdx];
    if (block.items) {
      block.items = block.items.filter((_, i) => i !== itemIdx);
      set(updated);
      setIsDirty(true);
    }
  }

  const updateListItem = (colIndex: number, blockIdx: number, itemIdx: number, valText: string) => {
    const { val, set } = getColSetter(colIndex);
    const updated = [...val];
    const block = updated[blockIdx];
    if (block.items) {
      block.items[itemIdx] = valText;
      set(updated);
      setIsDirty(true);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Clean empty list items from lists
    const cleanCol = (blocks: ContentBlock[]) => {
      return blocks.map(b => {
        if (b.type === 'list' && b.items) {
          return {
            ...b,
            items: b.items.filter(item => item.trim() !== '')
          }
        }
        return b;
      }).filter(b => (b.type !== 'list' && b.text?.trim() !== '') || (b.type === 'list' && b.items && b.items.length > 0))
    }

    const payload = {
      action: "update",
      id,
      blogData: {
        title,
        category,
        description,
        imageSrc,
        imageSrcHover,
        heroImage,
        writerId,
        readTime,
        status,
        contentColumns: [cleanCol(col1), cleanCol(col2), cleanCol(col3)]
      }
    }

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setIsDirty(false)
        window.location.href = "/admin/blogs"
      } else {
        alert(data.message || "Failed to save changes")
      }
    } catch (err) {
      alert("Error saving blog post.")
    } finally {
      setSaving(false)
    }
  }

  const activeColData = activeTab === 0 ? col1 : activeTab === 1 ? col2 : col3;

  if (loading) {
    return (
      <div className="flex-1 bg-black p-10 text-white flex items-center justify-center">
        <span className="text-gray-500">Loading blog post details...</span>
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-all uppercase tracking-wider font-semibold"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <ChevronLeft size={14} />
            <span>Back to Blogs</span>
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-[24px] font-normal text-white mb-8 text-left" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          Edit Blog Post
        </h1>

        {/* Form */}
        <form onSubmit={handleSave} className="w-full bg-[#04111d]/20 border border-white/5 p-8 text-left space-y-8">
          
          {/* Section 1: Basic & Meta Info */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              1. Basic & Metadata
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Blog Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Climate Change in the Indian Subcontinent"
                  value={title}
                  onChange={(e) => handleFieldChange(setTitle, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => handleFieldChange(setCategory, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none cursor-pointer"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  <option value="Water conservation">Water conservation</option>
                  <option value="Policy">Policy</option>
                  <option value="Climate Change & Water">Climate Change & Water</option>
                  <option value="Industry Impact and Solutions">Industry Impact and Solutions</option>
                  <option value="Technology">Technology</option>
                </select>
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
                  Writer *
                </label>
                <select
                  required
                  value={writerId}
                  onChange={(e) => handleFieldChange(setWriterId, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none cursor-pointer"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {writers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Read Time *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 min read"
                  value={readTime}
                  onChange={(e) => handleFieldChange(setReadTime, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Short Description (Meta Description / List Snippet) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summarize the article content..."
                  value={description}
                  onChange={(e) => handleFieldChange(setDescription, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none resize-y"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Media CDN Assets */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              2. Media Assets (Cloudflare CDN Links)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Card Cover Image (Pre-hover / Grayscale Backup)
                </label>
                <input
                  type="url"
                  placeholder="https://imagedelivery.net/.../public"
                  value={imageSrc}
                  onChange={(e) => handleFieldChange(setImageSrc, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Card Hover Image (Color / Default) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://imagedelivery.net/.../public"
                  value={imageSrcHover}
                  onChange={(e) => handleFieldChange(setImageSrcHover, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Hero Top Banner Image *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://imagedelivery.net/.../public"
                  value={heroImage}
                  onChange={(e) => handleFieldChange(setHeroImage, e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-600 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: 3-Column Content Block Editor */}
          <div>
            <div className="border-b border-white/5 pb-2 mb-6 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                3. Article Content Columns (3-Column Layout)
              </h2>
              {/* Column Tabs */}
              <div className="flex bg-[#051424] border border-white/10 p-1">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx as any)}
                    className={`px-4 py-1.5 text-xs font-semibold uppercase transition-all rounded-none cursor-pointer ${
                      activeTab === idx ? "bg-[#104e7a] text-white" : "text-gray-400 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    Column {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#051424]/10 border border-white/5 p-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Manage and structure content blocks inside <strong>Column {activeTab + 1}</strong>.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addBlock(activeTab, 'paragraph')}
                    className="border border-[#104e7a]/40 hover:bg-[#104e7a]/20 text-[#0081C9] hover:text-white px-2.5 py-1.5 text-[10px] font-semibold flex items-center gap-1 transition-all rounded-none cursor-pointer"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <Plus size={12} />
                    <span>+ Paragraph</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock(activeTab, 'heading')}
                    className="border border-[#104e7a]/40 hover:bg-[#104e7a]/20 text-[#0081C9] hover:text-white px-2.5 py-1.5 text-[10px] font-semibold flex items-center gap-1 transition-all rounded-none cursor-pointer"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <Plus size={12} />
                    <span>+ Subheading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock(activeTab, 'list')}
                    className="border border-[#104e7a]/40 hover:bg-[#104e7a]/20 text-[#0081C9] hover:text-white px-2.5 py-1.5 text-[10px] font-semibold flex items-center gap-1 transition-all rounded-none cursor-pointer"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <Plus size={12} />
                    <span>+ Bullet List</span>
                  </button>
                </div>
              </div>

              {activeColData.length === 0 ? (
                <div className="p-8 text-center text-gray-600 text-xs border border-dashed border-white/10">
                  No content blocks added to Column {activeTab + 1} yet. Add a block above to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {activeColData.map((block, idx) => (
                    <div key={idx} className="bg-[#051424]/30 border border-white/5 p-4 flex gap-4 items-start relative">
                      
                      {/* Block Type Indicator */}
                      <div className="flex flex-col items-center gap-1 text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                        <FileText size={16} />
                        <span>{block.type}</span>
                      </div>

                      {/* Content editor based on block type */}
                      <div className="flex-1">
                        {block.type !== 'list' ? (
                          <textarea
                            rows={3}
                            required
                            placeholder={block.type === 'heading' ? "Enter subheading text..." : "Enter paragraph text..."}
                            value={block.text || ''}
                            onChange={(e) => updateBlockText(activeTab, idx, e.target.value)}
                            className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-700 px-4 py-2 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          />
                        ) : (
                          <div className="space-y-2 text-left">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">List Items</span>
                            {block.items?.map((itemVal, itemIdx) => (
                              <div key={itemIdx} className="flex gap-2 items-center">
                                <span className="text-gray-600 text-xs">•</span>
                                <input
                                  type="text"
                                  placeholder="List item..."
                                  value={itemVal}
                                  onChange={(e) => updateListItem(activeTab, idx, itemIdx, e.target.value)}
                                  className="flex-1 bg-[#051424] border border-white/10 text-white placeholder-gray-700 px-3 py-1.5 outline-none focus:border-white/20 transition-all text-xs rounded-none"
                                  style={{ fontFamily: "'Manrope', sans-serif" }}
                                />
                                {block.items && block.items.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeListItem(activeTab, idx, itemIdx)}
                                    className="text-gray-500 hover:text-red-400 p-1 focus:outline-none cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addListItem(activeTab, idx)}
                              className="mt-2 text-[10px] text-[#0081C9] hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Plus size={10} /> Add List Item
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Block Ordering and Deletion actions */}
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveBlock(activeTab, idx, 'up')}
                          className="text-gray-500 hover:text-white disabled:opacity-30 p-1 cursor-pointer focus:outline-none"
                        >
                          <MoveUp size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === activeColData.length - 1}
                          onClick={() => moveBlock(activeTab, idx, 'down')}
                          className="text-gray-500 hover:text-white disabled:opacity-30 p-1 cursor-pointer focus:outline-none"
                        >
                          <MoveDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(activeTab, idx)}
                          className="text-gray-500 hover:text-red-500 p-1 cursor-pointer focus:outline-none mt-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions bar */}
          <div className="border-t border-white/5 pt-6 flex justify-end gap-4">
            <Link
              href="/admin/blogs"
              className="border border-white/10 hover:bg-white/5 px-6 py-2.5 text-xs font-semibold text-white rounded-none transition-all cursor-pointer"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#104e7a] hover:bg-[#155b8e] active:bg-[#0f446b] text-white px-6 py-2.5 text-xs font-semibold flex items-center gap-2 transition-all rounded-none cursor-pointer disabled:opacity-50"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <Save size={14} />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>

        </form>
      </div>
    </>
  )
}
