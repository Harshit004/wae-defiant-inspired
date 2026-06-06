"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  ChevronDown,
  ChevronUp,
  FileText,
  Radio,
  Settings,
  LogOut
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(true)

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/secret-cms-login"
    } catch (err) {
      alert("Failed to log out.")
    }
  }

  return (
    <aside className="w-[260px] bg-[#04111d] border-r border-white/5 flex flex-col justify-between h-screen sticky top-0 text-[#AEAEAE]">
      {/* Brand logo section */}
      <div>
        <div className="px-6 py-[30px] border-b border-white/5 flex items-center gap-3">
          <Link href="/admin/categories" className="flex items-center gap-2">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
              alt="WAE Logo"
              width={40}
              height={40}
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-white tracking-wider text-sm">WAE</span>
              <span className="text-[9px] uppercase tracking-widest text-[#0081C9]">Our Green is Blue</span>
            </div>
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="mt-8 px-4 space-y-2">
          {/* Dashboard */}
          <Link
            href="/admin/categories"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname === "/admin/dashboard" ? "text-white bg-white/5" : ""
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          {/* Products Dropdown */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all hover:text-white text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <Package size={18} />
                <span>Products</span>
              </div>
              {productsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {productsOpen && (
              <div className="mt-1 ml-4 border-l border-white/5 pl-4 space-y-1">
                <Link
                  href="/admin/categories"
                  className={`block py-2 px-2 text-xs font-medium transition-all hover:text-white ${
                    pathname === "/admin/categories" ? "text-[#0081C9] font-semibold" : ""
                  }`}
                >
                  All Categories
                </Link>
                <Link
                  href="/admin/products"
                  className={`block py-2 px-2 text-xs font-medium transition-all hover:text-white ${
                    pathname === "/admin/products" ? "text-[#0081C9] font-semibold" : ""
                  }`}
                >
                  Product Listing
                </Link>
              </div>
            )}
          </div>

          {/* Blogs */}
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white"
          >
            <FileText size={18} />
            <span>Blogs</span>
          </Link>

          {/* News & Events */}
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white"
          >
            <Radio size={18} />
            <span>News & Events</span>
          </Link>

          {/* Settings */}
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white text-left cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
