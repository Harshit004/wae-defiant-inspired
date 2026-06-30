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
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isCategoriesActive = pathname.startsWith("/admin/categories")
  const isProductsActive = pathname.startsWith("/admin/products")
  const isParentProductsActive = isCategoriesActive || isProductsActive

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      localStorage.removeItem("wae_cms_token")
      window.location.href = "/secret-cms-login"
    } catch (err) {
      alert("Failed to log out.")
    }
  }

  return (
    <aside className={`${isCollapsed ? 'w-[80px]' : 'w-[260px]'} transition-all duration-300 bg-[#04111d] border-r border-white/5 flex flex-col justify-between h-screen sticky top-0 text-[#AEAEAE]`}>
      <div className="overflow-x-hidden">
        {/* Brand logo section */}
        <div className={`h-[87px] border-b border-white/5 flex items-center ${isCollapsed ? 'justify-center' : 'px-6 justify-start'}`}>
          <Link href="/admin/dashboard" className="flex items-center">
            {isCollapsed ? (
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                alt="WAE Header Logo"
                width={40}
                height={42}
                priority
              />
            ) : (
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/66b9c744-127a-427d-bc84-3a0c3f3e5700/public"
                alt="WAE Logo"
                width={102}
                height={39}
                priority
              />
            )}
          </Link>
        </div>

        {/* Navigation items */}
        <nav className={`mt-8 space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {/* Dashboard */}
          <Link
            href="/admin/dashboard"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname === "/admin/dashboard" 
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="Dashboard"
          >
            <Home size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Dashboard</span>}
          </Link>

          {/* Products Dropdown */}
          <div title="Products">
            <button
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false);
                  setProductsOpen(true);
                } else {
                  setProductsOpen(!productsOpen);
                }
              }}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} py-3 text-sm font-medium transition-all hover:text-white text-left focus:outline-none ${
                isParentProductsActive
                  ? `bg-[#082a45]/40 text-white border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}`
                  : "text-[#AEAEAE]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="truncate">Products</span>}
              </div>
              {!isCollapsed && (
                productsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              )}
            </button>

            {productsOpen && !isCollapsed && (
              <div className="mt-1 ml-[26px] pl-4 border-l border-white/10 space-y-1 overflow-hidden">
                <Link
                  href="/admin/categories"
                  className={`block py-2 px-2 text-xs font-medium transition-all hover:text-white truncate ${
                    isCategoriesActive ? "text-[#0081C9] font-semibold" : "text-[#AEAEAE]"
                  }`}
                >
                  All Categories
                </Link>
                <Link
                  href="/admin/products"
                  className={`block py-2 px-2 text-xs font-medium transition-all hover:text-white truncate ${
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
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/blogs")
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="Blogs"
          >
            <FileText size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Blogs</span>}
          </Link>

          {/* Enquiries */}
          <Link
            href="/admin/enquiries"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/enquiries")
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="Enquiries"
          >
            <FileText size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Enquiries</span>}
          </Link>

          {/* Jobs */}
          <Link
            href="/admin/jobs"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/jobs")
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="Jobs"
          >
            <Briefcase size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Jobs</span>}
          </Link>

          {/* News & Events */}
          <Link
            href="/admin/news-events"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/news-events")
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="News & Events"
          >
            <PlaySquare size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">News & Events</span>}
          </Link>

          {/* Analytics */}
          <Link
            href="/admin/analytics"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/analytics")
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="Analytics"
          >
            <PlaySquare size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Analytics</span>}
          </Link>

          {/* Subscribers */}
          <Link
            href="/admin/subscribers"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white ${
              pathname.startsWith("/admin/subscribers")
                ? `text-white bg-white/5 border-[#0081C9] ${isCollapsed ? 'border-l-4 rounded-r-md' : 'border-l-4 pl-3'}` 
                : "text-[#AEAEAE]"
            }`}
            title="Subscribers"
          >
            <Users size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Subscribers</span>}
          </Link>

          {/* Settings */}
          <Link
            href="/admin/categories"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white`}
            title="Settings"
          >
            <Settings size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Footer section with toggle and logout */}
      <div className="flex flex-col border-t border-white/5">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} py-4 text-sm font-medium transition-all hover:text-white text-[#AEAEAE]`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {!isCollapsed && <span>Collapse Sidebar</span>}
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm font-medium transition-all hover:text-white text-left cursor-pointer focus:outline-none`}
            title="Logout"
          >
            <LogOut size={18} className="flex-shrink-0 text-red-400" />
            {!isCollapsed && <span className="text-red-400">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
