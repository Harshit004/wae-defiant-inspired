"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/admin/header"
import { Edit3, Trash2, Plus, AlertTriangle, Eye, Filter } from "lucide-react"

interface JobPost {
  id: string;
  title: string;
  category: string;
  type: string;
  time: string;
  shortDescription: string;
  status: 'Live' | 'Draft';
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all")
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all")

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<JobPost | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/jobs")
      const data = await response.json()
      if (data.success) {
        setJobs(data.jobs)
      }
    } catch (err) {
      console.error("Failed to load jobs")
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
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: deleteTarget.id }),
      })

      const data = await response.json()
      if (data.success) {
        setJobs(jobs.filter((j) => j.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        alert(data.message || "Failed to delete job post")
      }
    } catch (err) {
      alert("Error deleting job post.")
    } finally {
      setDeleting(false)
    }
  }

  const categories = Array.from(new Set(jobs.map(j => j.category)))

  const filteredJobs = jobs.filter((j) => {
    // 1. Search Query
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.category.toLowerCase().includes(searchQuery.toLowerCase())

    // 2. Category Filter
    const matchesCategory =
      selectedCategoryFilter === "all" ||
      j.category === selectedCategoryFilter

    // 3. Status Filter
    const matchesStatus =
      selectedStatusFilter === "all" ||
      j.status === selectedStatusFilter

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
              Jobs & Careers Management
            </h1>
            <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Manage, preview, and update all job listings.
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

            {/* Add Job button */}
            <Link
              href="/admin/jobs/new"
              className="bg-[#104e7a] hover:bg-[#155b8e] px-4 py-2 text-xs font-semibold text-white flex items-center gap-2 transition-all rounded-none"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <Plus size={14} />
              <span>Add Job Post</span>
            </Link>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="w-full bg-[#02111d] border border-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-sm">Loading jobs...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">No job posts found.</div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-[11px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <th className="py-4 px-6 font-medium w-[45%] text-left">Job Title</th>
                  <th className="py-4 px-6 font-medium w-[20%] text-left">Category</th>
                  <th className="py-4 px-6 font-medium w-[15%] text-left">Type / Time</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Status</th>
                  <th className="py-4 px-6 font-medium w-[10%] text-center">Action</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "'Manrope', sans-serif" }}>
                {filteredJobs.map((j) => {
                  const isLive = j.status === "Live"
                  const previewUrl = `/join-wae/${j.id}`

                  return (
                    <tr key={j.id} className="hover:bg-white/[0.01] transition-all">
                      {/* Title */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col text-left">
                          <span className="font-semibold text-white tracking-wide text-[14px] line-clamp-1">
                            {j.title}
                          </span>
                          <span className="text-[9px] text-gray-500 mt-0.5">
                            Slug ID: {j.id}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-5 px-6 text-[11px] align-middle">
                        <div className="text-gray-200 text-[11px]">{j.category}</div>
                      </td>

                      {/* Type / Time */}
                      <td className="py-5 px-6 text-gray-400 text-[11px] align-middle">
                        <div className="text-[11px]">{j.type} • {j.time}</div>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 text-center align-middle">
                        <span className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-none ${
                          isLive 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}>
                          {j.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-center align-middle">
                        <div className="inline-flex gap-4 justify-center">
                          <Link
                            href={previewUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white transition-all"
                            title="Preview job post"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/admin/jobs/edit/${j.id}`}
                            className="text-gray-400 hover:text-white transition-all"
                            title="Edit job post"
                          >
                            <Edit3 size={16} />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(j)}
                            className="text-red-500/80 hover:text-red-400 transition-all focus:outline-none cursor-pointer"
                            title="Delete job post"
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
                  Delete Job Post
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Are you sure you want to delete the job post &quot;{deleteTarget.title}&quot;? This action cannot be undone.
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
                    {deleting ? "Deleting..." : "Delete Job Post"}
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
