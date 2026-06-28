"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Package,
  ChevronDown,
  ChevronUp,
  FileText,
  Briefcase,
  PlaySquare,
  Settings,
  LogOut,
  Users
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(true)

  const isCategoriesActive = pathname.startsWith("/admin/categories")
  const isProductsActive = pathname.startsWith("/admin/products")
  const isParentProductsActive = isCategoriesActive || isProductsActive

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
      <div>
        {/* Brand logo section */}
        <div className="px-6 py-[24px] border-b border-white/5 flex items-center justify-start">
          <Link href="/admin/categories" className="flex items-center">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/66b9c744-127a-427d-bc84-3a0c3f3e5700/public"
              alt="WAE Logo"
              width={102}
              height={39}
              priority
            />
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="mt-8 px-4 space-y-2">
          {/* Dashboard */}
          <Link
            href="/admin/categories"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname === "/admin/dashboard" 
                ? "text-white bg-white/5 border-l-4 border-[#0081C9] pl-3" 
                : "text-[#AEAEAE]"
            }`}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>

          {/* Products Dropdown */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all hover:text-white text-left focus:outline-none ${
                isParentProductsActive
                  ? "bg-[#082a45]/40 text-white border-l-4 border-[#0081C9] pl-3"
                  : "text-[#AEAEAE]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={18} />
                <span>Products</span>
              </div>
              {productsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {productsOpen && (
              <div className="mt-1 ml-[26px] pl-4 border-l border-white/10 space-y-1">
                <Link
                  href="/admin/categories"
                  className={`block py-2 px-2 text-xs font-medium transition-all hover:text-white ${
                    isCategoriesActive ? "text-[#0081C9] font-semibold" : "text-[#AEAEAE]"
                  }`}
                >
                  All Categories
                </Link>
                <Link
                  href="/admin/products"
                  className={`block py-2 px-2 text-xs font-medium transition-all hover:text-white ${
                    isProductsActive ? "text-[#0081C9] font-semibold" : "text-[#AEAEAE]"
                  }`}
                >
                  Product Listing
                </Link>
              </div>
            )}
          </div>

          {/* Blogs */}
          <Link
            href="/admin/blogs"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/blogs")
                ? "text-white bg-white/5 border-l-4 border-[#0081C9] pl-3"
                : "text-[#AEAEAE]"
            }`}
          >
            <FileText size={18} />
            <span>Blogs</span>
          </Link>

          {/* Enquiries */}
          <Link
            href="/admin/enquiries"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/enquiries")
                ? "text-white bg-white/5 border-l-4 border-[#0081C9] pl-3"
                : "text-[#AEAEAE]"
            }`}
          >
            <FileText size={18} />
            <span>Enquiries</span>
          </Link>

          {/* Jobs */}
          <Link
            href="/admin/jobs"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/jobs")
                ? "text-white bg-white/5 border-l-4 border-[#0081C9] pl-3"
                : "text-[#AEAEAE]"
            }`}
          >
            <Briefcase size={18} />
            <span>Jobs</span>
          </Link>

          {/* News & Events */}
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white"
          >
            <PlaySquare size={18} />
            <span>News & Events</span>
          </Link>

          {/* Analytics */}
          <Link
            href="/admin/analytics"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/analytics")
                ? "text-white bg-white/5 border-l-4 border-[#0081C9] pl-3"
                : "text-[#AEAEAE]"
            }`}
          >
            <PlaySquare size={18} />
            <span>Analytics</span>
          </Link>

          {/* Subscribers */}
          <Link
            href="/admin/subscribers"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/subscribers")
                ? "text-white bg-white/5 border-l-4 border-[#0081C9] pl-3"
                : "text-[#AEAEAE]"
            }`}
          >
            <Users size={18} />
            <span>Subscribers</span>
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
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:text-white text-left cursor-pointer focus:outline-none"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
