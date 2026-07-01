"use client"

import { User } from "lucide-react"

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (val: string) => void
}

export default function Header({ searchQuery = "", onSearchChange }: HeaderProps) {
  return (
    <header className="h-[80px] bg-[#04111d] border-b border-white/5 px-10 flex items-center justify-end sticky top-0 z-30">
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
