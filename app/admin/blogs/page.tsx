"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { Edit3, Trash2, Plus, AlertTriangle, Eye, Filter } from "lucide-react"

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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [writers, setWriters] = useState<Writer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all")
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all")

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/blogs")
      const data = await response.json()
      if (data.success) {
        setBlogs(data.blogs)
        setWriters(data.writers)
      }
    } catch (err) {
      console.error("Failed to load blogs and writers")
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
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: deleteTarget.id }),
      })

      const data = await response.json()
      if (data.success) {
        setBlogs(blogs.filter((b) => b.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        alert(data.message || "Failed to delete blog post")
      }
    } catch (err) {
      alert("Error deleting blog post.")
    } finally {
      setDeleting(false)
    }
  }

  const getWriterName = (writerId: string) => {
    const writer = writers.find(w => w.id === writerId);
    return writer ? writer.name : writerId;
  }

  const categories = Array.from(new Set(blogs.map(b => b.category)))

  const filteredBlogs = blogs.filter((b) => {
    // 1. Search Query
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase())

    // 2. Category Filter
    const matchesCategory =
      selectedCategoryFilter === "all" ||
      b.category === selectedCategoryFilter

    // 3. Status Filter
    const matchesStatus =
      selectedStatusFilter === "all" ||
      b.status === selectedStatusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Title and Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Blogs & Articles Management
            </h1>
            <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Manage, preview, and update all blog content and articles.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-[#04111d] border border-white/5 px-3 py-2">
              <Filter size={12} className="text-gray-500" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer pr-4 animate-none"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <option value="all" className="bg-[#04111d] text-white">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#04111d] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-[#04111d] border border-white/5 px-3 py-2">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer pr-4 animate-none"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <option value="all" className="bg-[#04111d] text-white">All Statuses</option>
                <option value="Live" className="bg-[#04111d] text-white">Live</option>
                <option value="Draft" className="bg-[#04111d] text-white">Draft</option>
              </select>
            </div>

            {/* Add Blog button */}
            <Link
              href="/admin/blogs/new"
              className="bg-[#104e7a] hover:bg-[#155b8e] px-4 py-2 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <Plus size={14} />
              <span>Add Blog Post</span>
            </Link>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="w-full bg-[#02111d] border border-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-sm">Loading blogs...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">No blog posts found.</div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-[11px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <th className="py-4 px-6 font-medium w-[45%] text-left">Blog Image and Title</th>
                  <th className="py-4 px-6 font-medium w-[20%] text-left">Category</th>
                  <th className="py-4 px-6 font-medium w-[15%] text-left">Writer</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Status</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Action</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "'Manrope', sans-serif" }}>
                {filteredBlogs.map((b) => {
                  const isLive = b.status === "Live"
                  // Convert category and title to slug paths to preview the article
                  const categorySlug = b.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  const titleSlug = b.id
                  const previewUrl = `/blogs/${categorySlug}/${titleSlug}`

                  return (
                    <tr key={b.id} className="hover:bg-white/[0.01] transition-all">
                      {/* Image & Title */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-12 bg-[#051424] border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {b.imageSrcHover ? (
                              <Image
                                src={b.imageSrcHover}
                                alt={b.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="text-[10px] text-gray-600 font-semibold uppercase">BLOG</div>
                            )}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-white tracking-wide text-[11px] line-clamp-2">
                              {b.title}
                            </span>
                            <span className="text-[9px] text-gray-500 mt-0.5">
                              Slug ID: {b.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-5 px-6 text-[11px] align-middle">
                        <div className="text-gray-200 text-[11px]">{b.category}</div>
                      </td>

                      {/* Writer */}
                      <td className="py-5 px-6 text-gray-400 text-[11px] align-middle">
                        <div className="text-[11px]">{getWriterName(b.writerId)}</div>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 text-center align-middle">
                        <span className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-none ${
                          isLive 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-center align-middle">
                        <div className="inline-flex gap-4 justify-center">
                          <Link
                            href={previewUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white transition-all"
                            title="Preview blog details"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/admin/blogs/${b.id}/edit`}
                            className="text-gray-400 hover:text-white transition-all"
                            title="Edit blog post"
                          >
                            <Edit3 size={16} />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(b)}
                            className="text-red-500/80 hover:text-red-400 transition-all focus:outline-none cursor-pointer"
                            title="Delete blog post"
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
                  Delete Blog Post
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Are you sure you want to delete the blog post &quot;{deleteTarget.title}&quot;? This action cannot be undone.
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
                    {deleting ? "Deleting..." : "Delete Blog Post"}
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
