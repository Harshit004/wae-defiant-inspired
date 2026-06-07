"use client"

import { Search, User } from "lucide-react"

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (val: string) => void
}

export default function Header({ searchQuery = "", onSearchChange }: HeaderProps) {
  return (
    <header className="h-[80px] bg-[#04111d] border-b border-white/5 px-10 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input Box */}
      <div className="relative w-full max-w-[400px]">
        <input
          type="text"
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full bg-[#051424] border border-white/5 text-white placeholder-gray-500 px-4 py-2 pr-12 text-sm outline-none focus:border-white/10 transition-all rounded-none"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        />
        <Search
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {/* User profile section */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#0d2136] flex items-center justify-center text-white border border-white/10">
          <User size={18} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Marketing Manager
          </span>
          <span className="text-[10px] text-gray-500" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}
