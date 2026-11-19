import type { ReactNode } from "react"
import type { Metadata } from "next"
import Sidebar from "@/components/admin/sidebar"
import AdminAuthGuard from "@/components/admin/auth-guard"

export const metadata: Metadata = {
  title: "WAE CMS Dashboard",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthGuard>
      <div className="flex bg-black min-h-screen">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          <main className="flex-grow bg-black flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  )
}

