import type { ReactNode } from "react"
import Sidebar from "@/components/admin/sidebar"
import AdminAuthGuard from "@/components/admin/auth-guard"

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

