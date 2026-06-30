"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/admin/header"
import { Edit3, Trash2, Plus, Star, Link as LinkIcon, Check, X, Save } from "lucide-react"

interface NewsEventItem {
  id: string
  type: 'news' | 'award'
  title: string
  description: string
  date: string
  imageUrl: string
  link: string
  displayOnHomepage: boolean
  rank: number
}

interface NewsEventsDBState {
  heroTextNews: string
  heroTextAwards: string
  items: NewsEventItem[]
}

export default function NewsEventsPage() {
  const [data, setData] = useState<NewsEventsDBState | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'news' | 'award'>('news')
  
  // Hero text editing
  const [heroText, setHeroText] = useState('')
  const [savingHero, setSavingHero] = useState(false)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsEventItem | null>(null)
  
  // Form State
  const [formData, setFormData] = useState<Partial<NewsEventItem>>({
    title: '', description: '', date: '', imageUrl: '', link: '', displayOnHomepage: false, rank: 1
  })
  const [savingItem, setSavingItem] = useState(false)
  
  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/news-events")
      const json = await response.json()
      if (json.success) {
        setData(json.data)
        if (activeTab === 'news') setHeroText(json.data.heroTextNews)
        else setHeroText(json.data.heroTextAwards)
      }
    } catch (err) {
      console.error("Failed to load news/events")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      setHeroText(activeTab === 'news' ? data.heroTextNews : data.heroTextAwards)
    }
  }, [activeTab, data])

  const handleSaveHeroText = async () => {
    setSavingHero(true)
    try {
      const payload = activeTab === 'news' 
        ? { action: 'update_hero', heroTextNews: heroText }
        : { action: 'update_hero', heroTextAwards: heroText }
        
      const response = await fetch("/api/admin/news-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (result.success) {
        setData(prev => prev ? {
          ...prev,
          ...(activeTab === 'news' ? { heroTextNews: heroText } : { heroTextAwards: heroText })
        } : null)
        alert("Hero text updated successfully!")
      }
    } catch (e) {
      alert("Error saving hero text")
    } finally {
      setSavingHero(false)
    }
  }

  const handleOpenModal = (item?: NewsEventItem) => {
    if (item) {
      setEditingItem(item)
      setFormData(item)
    } else {
      setEditingItem(null)
      setFormData({
        type: activeTab,
        title: '', description: '', date: '', imageUrl: '', link: '', displayOnHomepage: false, rank: 1
      })
    }
    setIsModalOpen(true)
  }

  const handleSaveItem = async () => {
    setSavingItem(true)
    try {
      const action = editingItem ? 'update' : 'create'
      const response = await fetch("/api/admin/news-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, itemData: formData }),
      })
      const result = await response.json()
      if (result.success) {
        setIsModalOpen(false)
        fetchData()
      } else {
        alert(result.message || "Failed to save item")
      }
    } catch (e) {
      alert("Error saving item")
    } finally {
      setSavingItem(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const response = await fetch("/api/admin/news-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", itemId: deleteTarget }),
      })
      const result = await response.json()
      if (result.success) {
        setDeleteTarget(null)
        fetchData()
      }
    } catch (err) {
      alert("Error deleting item.")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-black text-white">Loading...</div>
  }

  const displayedItems = data?.items.filter(i => i.type === activeTab) || []
  const homepageItemsCount = data?.items.filter(i => i.displayOnHomepage).length || 0

  return (
    <>
      <Header searchQuery="" onSearchChange={() => {}} />

      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        {/* Title and Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-[24px] font-normal" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              News & Events Management
            </h1>
            <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Manage News, Press Releases, and Awards.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Star size={11} className={homepageItemsCount === 5 ? "text-amber-400" : "text-gray-600"} />
              <span className={`text-[11px] font-medium ${homepageItemsCount === 5 ? "text-amber-400" : "text-gray-600"}`}>
                {homepageItemsCount} / 5 items displayed on homepage
              </span>
            </div>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#0081C9] hover:bg-[#006bb3] text-white px-4 py-2 rounded transition-colors text-sm font-medium"
          >
            <Plus size={16} /> Add {activeTab === 'news' ? 'News' : 'Award'}
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('news')}
            className={`pb-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'news' ? 'border-[#0081C9] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            News & Press Release
          </button>
          <button
            onClick={() => setActiveTab('award')}
            className={`pb-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'award' ? 'border-[#0081C9] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Awards & Recognition
          </button>
        </div>

        {/* Hero Text Editor */}
        <div className="bg-[#111] border border-white/5 p-6 rounded-xl mb-8">
          <h2 className="text-sm font-semibold mb-4">Hero Section Text ({activeTab === 'news' ? 'News' : 'Awards'})</h2>
          <textarea
            value={heroText}
            onChange={(e) => setHeroText(e.target.value)}
            className="w-full bg-[#222] border border-white/10 p-3 rounded text-sm text-gray-200 min-h-[100px] outline-none focus:border-[#0081C9]"
            placeholder="Text displayed beside the hero headline..."
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveHeroText}
              disabled={savingHero}
              className="flex items-center gap-2 bg-[#222] hover:bg-[#333] border border-white/10 text-white px-4 py-2 rounded transition-colors text-xs font-medium"
            >
              <Save size={14} /> {savingHero ? 'Saving...' : 'Save Hero Text'}
            </button>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto border border-white/5 rounded-xl">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#111] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400">Title</th>
                <th className="px-6 py-4 font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-center">Homepage</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-center">Rank</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic text-xs">
                    No items found for this category.
                  </td>
                </tr>
              ) : (
                displayedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white truncate max-w-[300px]" title={item.title}>
                          {item.title}
                        </span>
                        <a href={item.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 mt-1 truncate max-w-[300px]">
                          <LinkIcon size={10} /> {item.link}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {item.date || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.displayOnHomepage ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-[10px] font-medium border border-amber-500/20">
                          <Star size={10} /> Featured
                        </span>
                      ) : (
                        <span className="text-gray-600 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.displayOnHomepage ? (
                        <span className="text-gray-300 font-medium">#{item.rank}</span>
                      ) : (
                        <span className="text-gray-600 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded transition-colors text-blue-400"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item.id)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded transition-colors text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] rounded-t-xl">
              <h2 className="text-lg font-medium text-white">{editingItem ? 'Edit Item' : `Add New ${activeTab === 'news' ? 'News' : 'Award'}`}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1 text-sm">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded p-2.5 text-white outline-none focus:border-[#0081C9]"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Description (Summary)</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded p-2.5 text-white min-h-[80px] outline-none focus:border-[#0081C9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date String (optional)</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    placeholder="Date - dd/mm/yyyy"
                    className="w-full bg-black border border-white/10 rounded p-2.5 text-white outline-none focus:border-[#0081C9]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Link URL</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={e => setFormData({...formData, link: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-black border border-white/10 rounded p-2.5 text-white outline-none focus:border-[#0081C9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://imagedelivery.net/..."
                  className="w-full bg-black border border-white/10 rounded p-2.5 text-white outline-none focus:border-[#0081C9]"
                />
                {formData.imageUrl && (
                  <div className="mt-3 relative w-full h-[150px] bg-black border border-white/5 rounded overflow-hidden">
                    <Image src={formData.imageUrl} alt="Preview" fill className="object-cover opacity-80" />
                  </div>
                )}
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded border border-white/5 space-y-4">
                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Homepage Display</h4>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="homepageToggle"
                    checked={formData.displayOnHomepage}
                    onChange={e => setFormData({...formData, displayOnHomepage: e.target.checked})}
                    className="w-4 h-4 accent-[#0081C9]"
                  />
                  <label htmlFor="homepageToggle" className="text-sm text-gray-200 cursor-pointer">Feature this item on the homepage</label>
                </div>
                
                {formData.displayOnHomepage && (
                  <div className="pt-2">
                    <label className="block text-xs text-gray-400 mb-1">Layout Rank (1 to 5)</label>
                    <select
                      value={formData.rank}
                      onChange={e => setFormData({...formData, rank: parseInt(e.target.value)})}
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-white outline-none focus:border-[#0081C9]"
                    >
                      <option value={1}>Rank 1 (First Large Layout)</option>
                      <option value={2}>Rank 2 (Second Large Layout)</option>
                      <option value={3}>Rank 3 (First Sidebar Item)</option>
                      <option value={4}>Rank 4 (Second Sidebar Item)</option>
                      <option value={5}>Rank 5 (Third Sidebar Item)</option>
                    </select>
                    <p className="text-[10px] text-amber-500/80 mt-2">
                      Note: Only 5 items total can be featured. Assigning a rank will override any existing item with that rank.
                    </p>
                  </div>
                )}
              </div>

            </div>
            <div className="p-6 border-t border-white/10 bg-[#0a0a0a] rounded-b-xl flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 transition-colors rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                disabled={savingItem}
                className="px-5 py-2.5 text-xs font-medium text-white bg-[#0081C9] hover:bg-[#006bb3] transition-colors rounded disabled:opacity-50"
              >
                {savingItem ? 'Saving...' : (editingItem ? 'Save Changes' : 'Add Item')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-sm flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Delete Item?</h3>
              <p className="text-sm text-gray-400">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 bg-[#0a0a0a] flex justify-end gap-2 border-t border-white/10">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-colors rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition-colors rounded disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
