"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/admin/header"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"

const CATEGORIES = [
  "DEVELOPMENT",
  "DESIGN",
  "MARKETING",
  "CUSTOMER SERVICE",
  "OPERATION",
  "FINANCE",
  "MANAGEMENT"
]

export default function EditJobPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    category: "DEVELOPMENT",
    type: "On-site",
    time: "Full time",
    shortDescription: "",
    status: "Live",
    summaryParagraphs: [""],
    whatYouWillDo: [""],
    whatYouWillOwn: [""],
    whoWeAreLookingFor: [""],
  })

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch("/api/admin/jobs")
        const data = await response.json()
        if (data.success) {
          const job = data.jobs.find((j: any) => j.id === id)
          if (job) {
            setFormData({
              title: job.title,
              category: job.category,
              type: job.type,
              time: job.time,
              shortDescription: job.shortDescription,
              status: job.status,
              summaryParagraphs: job.summaryParagraphs.length ? job.summaryParagraphs : [""],
              whatYouWillDo: job.whatYouWillDo.length ? job.whatYouWillDo : [""],
              whatYouWillOwn: job.whatYouWillOwn.length ? job.whatYouWillOwn : [""],
              whoWeAreLookingFor: job.whoWeAreLookingFor.length ? job.whoWeAreLookingFor : [""],
            })
          } else {
            setError("Job not found")
          }
        }
      } catch (err) {
        setError("Failed to load job")
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    const newArray = [...(formData[field] as string[])]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const handleAddArrayItem = (field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: [...(formData[field] as string[]), ""] })
  }

  const handleRemoveArrayItem = (field: keyof typeof formData, index: number) => {
    const newArray = [...(formData[field] as string[])]
    newArray.splice(index, 1)
    setFormData({ ...formData, [field]: newArray })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    // filter empty strings
    const cleanedData = {
      ...formData,
      summaryParagraphs: formData.summaryParagraphs.filter(Boolean),
      whatYouWillDo: formData.whatYouWillDo.filter(Boolean),
      whatYouWillOwn: formData.whatYouWillOwn.filter(Boolean),
      whoWeAreLookingFor: formData.whoWeAreLookingFor.filter(Boolean),
    }

    if (!cleanedData.title) {
      setError("Title is required")
      setSaving(false)
      return
    }

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id,
          jobData: cleanedData,
        }),
      })

      const data = await response.json()
      if (data.success) {
        router.push("/admin/jobs")
        router.refresh()
      } else {
        setError(data.message || "Failed to update job")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setSaving(false)
    }
  }

  const renderArrayField = (title: string, field: 'summaryParagraphs' | 'whatYouWillDo' | 'whatYouWillOwn' | 'whoWeAreLookingFor') => (
    <div className="bg-[#051424] border border-white/5 p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          {title}
        </h3>
        <button
          type="button"
          onClick={() => handleAddArrayItem(field)}
          className="flex items-center gap-2 text-xs text-[#0081C9] hover:text-[#005f94] transition-colors cursor-pointer"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          <Plus size={14} /> Add Item
        </button>
      </div>
      
      {formData[field].map((item, index) => (
        <div key={index} className="flex gap-3">
          <textarea
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            className="flex-1 bg-black border border-white/10 text-white text-sm p-3 focus:border-[#0081C9] outline-none transition-all resize-y min-h-[80px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
            placeholder="Enter text..."
          />
          <button
            type="button"
            onClick={() => handleRemoveArrayItem(field, index)}
            className="text-gray-500 hover:text-red-500 transition-colors p-2 h-fit cursor-pointer"
            disabled={formData[field].length === 1 && formData[field][0] === ""}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#02111d] min-h-screen">
        <Header searchQuery="" onSearchChange={() => {}} />
        <div className="flex-1 p-10 flex items-center justify-center text-gray-500">
          Loading job details...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#02111d] min-h-screen">
      <Header searchQuery="" onSearchChange={() => {}} />

      <form onSubmit={handleSubmit} className="flex-1 p-10 flex flex-col max-w-[1200px] mx-auto w-full">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/jobs" className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Edit Job Post
              </h1>
              <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Update the details for "{formData.title}".
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#104e7a] hover:bg-[#155b8e] px-6 py-2.5 text-xs font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <Save size={14} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#051424] border border-white/5 p-6 space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black border border-white/10 text-white text-lg px-4 py-3 focus:border-[#0081C9] outline-none transition-all font-semibold"
                  placeholder="e.g. Senior Product Designer"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Short Description (For Listing Page)
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-black border border-white/10 text-white text-sm p-4 focus:border-[#0081C9] outline-none transition-all resize-y min-h-[100px]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                  placeholder="A brief summary shown on the main careers page."
                />
              </div>
            </div>

            {renderArrayField("Job Summary Paragraphs", "summaryParagraphs")}
            {renderArrayField("What You'll Do", "whatYouWillDo")}
            {renderArrayField("What You'll Own", "whatYouWillOwn")}
            {renderArrayField("Who We Are Looking For", "whoWeAreLookingFor")}

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#051424] border border-white/5 p-6 space-y-6">
              <h3 className="text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Publish Settings
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-black border border-white/10 text-white text-sm px-4 py-2 focus:border-[#0081C9] outline-none"
                >
                  <option value="Live">Live (Public)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black border border-white/10 text-white text-sm px-4 py-2 focus:border-[#0081C9] outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Job Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-black border border-white/10 text-white text-sm px-4 py-2 focus:border-[#0081C9] outline-none"
                  placeholder="e.g. On-site"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Time
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-black border border-white/10 text-white text-sm px-4 py-2 focus:border-[#0081C9] outline-none"
                  placeholder="e.g. Full time"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
