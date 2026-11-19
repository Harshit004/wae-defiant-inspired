"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, ShieldCheck, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store session token in localStorage to keep CMS free of cookies
        localStorage.setItem("wae_cms_token", data.token)
        // Redirect to Categories page inside CMS
        window.location.href = "/admin/categories"
      } else {
        setError(data.message || "Invalid credentials.")
      }
    } catch (err) {
      setError("Failed to reach server. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center font-sans px-4 py-8">
      <div className="w-full max-w-[460px]">
        {/* WAE Corporate Header & Identity */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="inline-block mb-5 hover:opacity-90 transition-opacity">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
              alt="WAE Official Corporate Logo"
              width={120}
              height={36}
              priority
              className="h-auto w-[120px]"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0081C9] text-[11px] font-medium uppercase tracking-wider mb-2">
            <ShieldCheck size={13} />
            <span>Internal Management Portal</span>
          </div>
          <h1 className="text-[22px] font-medium text-white tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            WAE Content Management System
          </h1>
          <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Restricted access for authorized WAE Limited personnel
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#04111d] border border-white/10 rounded-lg px-8 py-9 text-white shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded text-left">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Administrator Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@waecorp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-500 px-4 py-2.5 outline-none focus:border-[#0081C9] transition-all text-sm rounded"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
            </div>

            <div className="relative">
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                CMS Passcode / Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-500 px-4 py-2.5 outline-none focus:border-[#0081C9] transition-all text-sm pr-12 rounded"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[34px] text-gray-500 hover:text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0081C9] hover:bg-[#006ba8] active:bg-[#005a8f] text-white py-3 text-sm font-medium transition-all cursor-pointer rounded disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <Lock size={15} />
              <span>{loading ? "Authenticating..." : "Sign In to CMS"}</span>
            </button>
          </form>

          {/* Legal and Security Disclaimer */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-500 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Unauthorized access attempts are prohibited, logged, and investigated. For credentials assistance, contact WAE IT Administration.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-500 px-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            ← Return to Corporate Website
          </Link>
          <span>&copy; {new Date().getFullYear()} WAE Limited</span>
        </div>
      </div>
    </main>
  )
}
