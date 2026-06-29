"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

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
    <>
      <head>
        <title>Sign In - WAE CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <main className="min-h-screen bg-black flex items-center justify-center font-sans">
        <div className="w-full max-w-[440px] px-6">
          <div className="bg-[#04111d] border border-white/5 rounded-none px-10 py-12 text-white">
            <h1 className="text-[20px] font-normal text-white mb-8 text-left" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Sign in to your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-none text-left">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#051424] border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-white/20 transition-all text-sm pr-12 rounded-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="text-right">
                <span
                  className="text-xs text-gray-500 cursor-pointer hover:underline"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                  onClick={() => alert("Please contact the main administrator to reset your password.")}
                >
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#104e7a] hover:bg-[#155b8e] active:bg-[#0f446b] text-white py-3 text-sm font-medium transition-all cursor-pointer rounded-none disabled:opacity-50"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
