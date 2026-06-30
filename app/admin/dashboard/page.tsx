"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Package,
  FileText,
  Briefcase,
  Users,
  Activity,
  Eye,
  LayoutGrid,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  Globe,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Newspaper,
} from "lucide-react"

interface DashboardData {
  products: { total: number; live: number; draft: number; categories: number }
  blogs: { total: number; live: number; draft: number }
  jobs: { total: number; live: number; draft: number }
  enquiries: { total: number; product: number; general: number }
  subscribers: { total: number }
  analytics: { totalSessions: number; uniqueVisitors: number; totalPageViews: number; avgTimeSpent: number }
  newsEvents: { total: number; newsCount: number; awardCount: number; homepageFeatured: number }
}

function formatTime(seconds: number) {
  if (seconds < 60) return `${Math.floor(seconds)}s`
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}m ${s}s`
}

function StatCard({ icon: Icon, label, value, sub, color, href }: {
  icon: any; label: string; value: string | number; sub?: string; color: string; href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="relative flex flex-col justify-between h-full p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 rounded-2xl overflow-hidden" style={{ minHeight: "168px" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.04] blur-2xl pointer-events-none" style={{ background: color }} />
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl" style={{ background: `${color}18` }}>
            <Icon size={20} style={{ color }} />
          </div>
          <ArrowRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        <div>
          <p className="text-4xl font-medium tracking-tight text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{value}</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{label}</p>
          {sub && <p className="text-xs text-white/30 mt-2" style={{ fontFamily: "'Manrope', sans-serif" }}>{sub}</p>}
        </div>
      </div>
    </Link>
  )
}

function SectionPanel({ title, icon: Icon, color, href, children }: {
  title: string; icon: any; color: string; href: string; children: React.ReactNode
}) {
  return (
    <div className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ background: `${color}18` }}>
            <Icon size={16} style={{ color }} />
          </div>
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{title}</h2>
        </div>
        <Link href={href} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>
          Manage <ArrowRight size={12} />
        </Link>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function LiveDraftBar({ live, total }: { live: number; total: number }) {
  const pct = total > 0 ? (live / total) * 100 : 0
  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-white/40 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <span>{live} Live</span>
        <span>{total - live} Draft</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full bg-emerald-500/70 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [productsRes, blogsRes, jobsRes, enquiriesRes, subscribersRes, analyticsRes, newsEventsRes] =
          await Promise.allSettled([
            fetch("/api/admin/products").then((r) => r.json()),
            fetch("/api/admin/blogs").then((r) => r.json()),
            fetch("/api/admin/jobs").then((r) => r.json()),
            fetch("/api/admin/enquiries").then((r) => r.json()),
            fetch("/api/subscribers").then((r) => r.json()),
            fetch("/api/analytics").then((r) => r.json()),
            fetch("/api/admin/news-events").then((r) => r.json()),
          ])

        const products = productsRes.status === "fulfilled" ? productsRes.value : null
        const blogs = blogsRes.status === "fulfilled" ? blogsRes.value : null
        const jobs = jobsRes.status === "fulfilled" ? jobsRes.value : null
        const enquiries = enquiriesRes.status === "fulfilled" ? enquiriesRes.value : null
        const subscribers = subscribersRes.status === "fulfilled" ? subscribersRes.value : null
        const analytics = analyticsRes.status === "fulfilled" ? analyticsRes.value : null
        const newsEvents = newsEventsRes.status === "fulfilled" ? newsEventsRes.value : null

        const productList = products?.products || []
        const blogList = blogs?.blogs || []
        const jobList = jobs?.jobs || []
        const enquiryList = enquiries?.enquiries || []
        const subscriberList = subscribers?.subscribers || []
        const sessionList = Array.isArray(analytics) ? analytics : []
        const newsEventList = newsEvents?.data?.items || []

        const totalSessions = sessionList.length
        const uniqueVisitors = new Set(sessionList.map((s: any) => s.visitorId)).size
        const totalPageViews = sessionList.reduce((acc: number, curr: any) => acc + (curr.behavior?.pagesViewed?.length || 0), 0)
        const avgTimeSpent = totalSessions > 0
          ? sessionList.reduce((acc: number, curr: any) => acc + (curr.behavior?.timeSpentSeconds || 0), 0) / totalSessions
          : 0

        setData({
          products: {
            total: productList.length,
            live: productList.filter((p: any) => p.status === "Live").length,
            draft: productList.filter((p: any) => p.status !== "Live").length,
            categories: products?.categories?.length || 0,
          },
          blogs: {
            total: blogList.length,
            live: blogList.filter((b: any) => b.status === "Live").length,
            draft: blogList.filter((b: any) => b.status !== "Live").length,
          },
          jobs: {
            total: jobList.length,
            live: jobList.filter((j: any) => j.status === "Live").length,
            draft: jobList.filter((j: any) => j.status !== "Live").length,
          },
          enquiries: {
            total: enquiryList.length,
            product: enquiryList.filter((e: any) => (e.type || "product") === "product").length,
            general: enquiryList.filter((e: any) => e.type === "general").length,
          },
          subscribers: { total: subscriberList.length },
          analytics: { totalSessions, uniqueVisitors, totalPageViews, avgTimeSpent },
          newsEvents: {
            total: newsEventList.length,
            newsCount: newsEventList.filter((i: any) => i.type === 'news').length,
            awardCount: newsEventList.filter((i: any) => i.type === 'award').length,
            homepageFeatured: newsEventList.filter((i: any) => i.displayOnHomepage).length,
          }
        })
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4 text-white/40">
          <Loader2 size={36} className="animate-spin" />
          <p className="text-sm uppercase tracking-widest font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Loading Dashboard…</p>
        </div>
      </div>
    )
  }

  const d = data!

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>WAE Content Management</p>
            <h1 className="text-3xl font-medium tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Dashboard</h1>
          </div>
          <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0081C9] hover:bg-[#006bad] text-white text-sm font-medium transition-colors rounded-full" style={{ fontFamily: "'Manrope', sans-serif" }}>
            <PlusCircle size={16} />
            Add New Product
          </Link>
        </div>

        {/* Top KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <StatCard icon={Package} label="Products" value={d.products.total} sub={`${d.products.live} live · ${d.products.draft} draft`} color="#0081C9" href="/admin/products" />
          <StatCard icon={LayoutGrid} label="Categories" value={d.products.categories} sub="Product families" color="#7c3aed" href="/admin/categories" />
          <StatCard icon={FileText} label="Blog Posts" value={d.blogs.total} sub={`${d.blogs.live} live · ${d.blogs.draft} draft`} color="#d97706" href="/admin/blogs" />
          <StatCard icon={Newspaper} label="News & Events" value={d.newsEvents.total} sub={`${d.newsEvents.newsCount} news · ${d.newsEvents.awardCount} awards`} color="#eab308" href="/admin/news-events" />
          <StatCard icon={Briefcase} label="Job Openings" value={d.jobs.total} sub={`${d.jobs.live} live · ${d.jobs.draft} draft`} color="#10b981" href="/admin/jobs" />
          <StatCard icon={Mail} label="Enquiries" value={d.enquiries.total} sub={`${d.enquiries.product} product · ${d.enquiries.general} general`} color="#f43f5e" href="/admin/enquiries" />
          <StatCard icon={Users} label="Subscribers" value={d.subscribers.total} sub="Newsletter signups" color="#06b6d4" href="/admin/subscribers" />
        </div>

        {/* Analytics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "Total Sessions", value: d.analytics.totalSessions, color: "#3b82f6" },
            { icon: Globe, label: "Unique Visitors", value: d.analytics.uniqueVisitors, color: "#a78bfa" },
            { icon: Eye, label: "Page Views", value: d.analytics.totalPageViews, color: "#34d399" },
            { icon: Clock, label: "Avg Session", value: formatTime(d.analytics.avgTimeSpent), color: "#fbbf24" },
          ].map((item) => (
            <Link key={item.label} href="/admin/analytics" className="group">
              <div className="flex items-center gap-4 p-5 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl transition-all">
                <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: `${item.color}18` }}>
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-xl font-medium tracking-tight text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <SectionPanel title="Products" icon={Package} color="#0081C9" href="/admin/products">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>Total Products</span>
                <span className="text-2xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.products.total}</span>
              </div>
              <LiveDraftBar live={d.products.live} total={d.products.total} />
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400" style={{ fontFamily: "'Manrope', sans-serif" }}><CheckCircle2 size={13} /><span>{d.products.live} Live</span></div>
                <div className="flex items-center gap-1.5 text-xs text-white/30" style={{ fontFamily: "'Manrope', sans-serif" }}><AlertCircle size={13} /><span>{d.products.draft} Draft</span></div>
              </div>
              <div className="flex gap-3 mt-2">
                <Link href="/admin/products/new" className="flex-1 text-center py-2 text-xs font-medium bg-[#0081C9]/10 hover:bg-[#0081C9]/20 text-[#0081C9] rounded-lg transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>+ New Product</Link>
                <Link href="/admin/categories/new" className="flex-1 text-center py-2 text-xs font-medium bg-white/5 hover:bg-white/10 text-white/60 rounded-lg transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>+ New Category</Link>
              </div>
            </div>
          </SectionPanel>

          <SectionPanel title="Blog Posts" icon={FileText} color="#d97706" href="/admin/blogs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>Total Posts</span>
                <span className="text-2xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.blogs.total}</span>
              </div>
              <LiveDraftBar live={d.blogs.live} total={d.blogs.total} />
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400" style={{ fontFamily: "'Manrope', sans-serif" }}><CheckCircle2 size={13} /><span>{d.blogs.live} Live</span></div>
                <div className="flex items-center gap-1.5 text-xs text-white/30" style={{ fontFamily: "'Manrope', sans-serif" }}><AlertCircle size={13} /><span>{d.blogs.draft} Draft</span></div>
              </div>
              <Link href="/admin/blogs/new" className="block w-full text-center py-2 text-xs font-medium bg-[#d97706]/10 hover:bg-[#d97706]/20 text-[#d97706] rounded-lg transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>+ Write New Post</Link>
            </div>
          </SectionPanel>

          <SectionPanel title="News & Events" icon={Newspaper} color="#eab308" href="/admin/news-events">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>Total Items</span>
                <span className="text-2xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.newsEvents.total}</span>
              </div>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5">News</span>
                  <span className="text-white font-medium">{d.newsEvents.newsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5">Awards</span>
                  <span className="text-white font-medium">{d.newsEvents.awardCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5">Homepage Featured</span>
                  <span className="text-white font-medium">{d.newsEvents.homepageFeatured}</span>
                </div>
              </div>
            </div>
          </SectionPanel>

          <SectionPanel title="Job Openings" icon={Briefcase} color="#10b981" href="/admin/jobs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>Total Openings</span>
                <span className="text-2xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.jobs.total}</span>
              </div>
              <LiveDraftBar live={d.jobs.live} total={d.jobs.total} />
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400" style={{ fontFamily: "'Manrope', sans-serif" }}><CheckCircle2 size={13} /><span>{d.jobs.live} Live</span></div>
                <div className="flex items-center gap-1.5 text-xs text-white/30" style={{ fontFamily: "'Manrope', sans-serif" }}><AlertCircle size={13} /><span>{d.jobs.draft} Draft</span></div>
              </div>
              <Link href="/admin/jobs/new" className="block w-full text-center py-2 text-xs font-medium bg-[#10b981]/10 hover:bg-[#10b981]/20 text-[#10b981] rounded-lg transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>+ Post New Job</Link>
            </div>
          </SectionPanel>

          <SectionPanel title="Enquiries" icon={Mail} color="#f43f5e" href="/admin/enquiries">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>Total Enquiries</span>
                <span className="text-2xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.enquiries.total}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#f43f5e]/5 border border-[#f43f5e]/10 text-center">
                  <p className="text-xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.enquiries.product}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>Product</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <p className="text-xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.enquiries.general}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>General</p>
                </div>
              </div>
            </div>
          </SectionPanel>

          <SectionPanel title="Newsletter Subscribers" icon={Users} color="#06b6d4" href="/admin/subscribers">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>Total Signups</span>
                <span className="text-2xl font-medium text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{d.subscribers.total}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#06b6d4]/5 border border-[#06b6d4]/10 flex items-center gap-3">
                <TrendingUp size={18} className="text-[#06b6d4] flex-shrink-0" />
                <p className="text-xs text-white/50" style={{ fontFamily: "'Manrope', sans-serif" }}>View full subscriber list with email and signup date</p>
              </div>
              <Link href="/admin/subscribers" className="block w-full text-center py-2 text-xs font-medium bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 text-[#06b6d4] rounded-lg transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>View All Subscribers →</Link>
            </div>
          </SectionPanel>

          <SectionPanel title="Analytics" icon={Activity} color="#3b82f6" href="/admin/analytics">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Sessions", value: d.analytics.totalSessions, color: "#3b82f6" },
                  { label: "Visitors", value: d.analytics.uniqueVisitors, color: "#a78bfa" },
                  { label: "Page Views", value: d.analytics.totalPageViews, color: "#34d399" },
                  { label: "Avg Duration", value: formatTime(d.analytics.avgTimeSpent), color: "#fbbf24" },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <p className="text-lg font-medium" style={{ color: item.color, fontFamily: "'Inter Tight', sans-serif" }}>{item.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/admin/analytics" className="block w-full text-center py-2 text-xs font-medium bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] rounded-lg transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>Full Analytics Report →</Link>
            </div>
          </SectionPanel>

        </div>

        {/* Quick nav footer */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-[10px] uppercase tracking-widest text-white/20 mb-5" style={{ fontFamily: "'Manrope', sans-serif" }}>Quick Navigation</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "All Products", href: "/admin/products", icon: Package },
              { label: "All Categories", href: "/admin/categories", icon: LayoutGrid },
              { label: "All Blogs", href: "/admin/blogs", icon: FileText },
              { label: "All Jobs", href: "/admin/jobs", icon: Briefcase },
              { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
              { label: "Subscribers", href: "/admin/subscribers", icon: Users },
              { label: "Analytics", href: "/admin/analytics", icon: Activity },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all" style={{ fontFamily: "'Manrope', sans-serif" }}>
                <item.icon size={13} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
