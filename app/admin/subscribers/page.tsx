"use client"

import { useEffect, useState } from "react"
import { Subscriber } from "@/data/subscribers"
import { Search } from "lucide-react"

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const res = await fetch("/api/subscribers")
        const data = await res.json()
        if (data.success) {
          setSubscribers(data.subscribers)
        }
      } catch (err) {
        console.error("Failed to fetch subscribers:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSubscribers()
  }, [])

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white font-['Inter_Tight']">Newsletter Subscribers</h1>
      </div>

      <div className="bg-[#04111d] border border-white/10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AEAEAE]" size={18} />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-white/10 rounded focus:outline-none focus:border-[#0081C9] text-white text-sm transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#AEAEAE]">
            <thead className="text-xs uppercase bg-white/5 text-white border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium rounded-tl-lg">Email</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium rounded-tr-lg">Page Link</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">Loading subscribers...</td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/50 bg-white/5 border-b border-white/10 rounded-bl-lg rounded-br-lg">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub, index) => (
                  <tr key={sub.id} className={`border-b border-white/10 hover:bg-white/5 transition-colors ${index === filteredSubscribers.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-6 py-4 font-medium text-white">{sub.email}</td>
                    <td className="px-6 py-4">{sub.date}</td>
                    <td className="px-6 py-4">{sub.time}</td>
                    <td className="px-6 py-4">
                      <a href={sub.pageLink} target="_blank" rel="noopener noreferrer" className="text-[#0081C9] hover:underline">
                        {sub.pageLink}
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
