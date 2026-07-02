"use client"

import type { FC } from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

const MobileBlocker: FC = () => {
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkMobile = () => window.innerWidth < 1024

    if (!dismissed && checkMobile()) {
      document.body.classList.add("mobile-blocked")
    }

    const handleResize = () => {
      if (!dismissed && checkMobile()) {
        document.body.classList.add("mobile-blocked")
      } else {
        document.body.classList.remove("mobile-blocked")
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      document.body.classList.remove("mobile-blocked")
      window.removeEventListener("resize", handleResize)
    }
  }, [dismissed])

  const handleDismiss = () => {
    document.body.classList.remove("mobile-blocked")
    setDismissed(true)
  }

  // Before hydration, or if dismissed, render nothing (CSS handles initial masking)
  if (!mounted || dismissed) return null

  return (
    <>
      <div className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#080809] text-white p-6 md:p-12 lg:hidden select-none font-sans overflow-hidden">
        {/* CSS keyframe animations for the auroras */}
        <style jsx>{`
          @keyframes float-one {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -30px) scale(1.1); }
          }
          @keyframes float-two {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-30px, 20px) scale(0.95); }
          }
          .aurora-one {
            animation: float-one 12s ease-in-out infinite;
          }
          .aurora-two {
            animation: float-two 15s ease-in-out infinite;
          }
        `}</style>

        {/* Elegant structural grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80 pointer-events-none" />
        
        {/* Soft rotating / floating neon auroras for a rich high-end tech aesthetic */}
        <div className="aurora-one absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#00F0FF]/[0.035] rounded-full blur-[120px] pointer-events-none" />
        <div className="aurora-two absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#B000FF]/[0.035] rounded-full blur-[130px] pointer-events-none" />

        {/* Header Section */}
        <div className="relative z-10 flex justify-between items-center w-full border-b border-white/10 pb-5">
          <div className="flex items-center space-x-3">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
              alt="WAE Logo"
              width={34}
              height={36}
              className="brightness-100 opacity-95"
            />
            <span 
              className="tracking-[0.3em] font-medium text-xs text-white/90"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              WAE
            </span>
          </div>
          <div 
            className="text-[9px] tracking-[0.2em] text-white/45 font-mono uppercase"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            REF.SYS // 20.5937° N
          </div>
        </div>

        {/* Core Content Section */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto my-auto py-8">
          {/* Circular animated radar icon */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full border border-white/[0.03] animate-ping duration-[3s]" />
            <div className="absolute w-20 h-20 rounded-full bg-white/[0.01] border border-white/5" />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent flex items-center justify-center border border-white/15 shadow-[0_0_25px_rgba(255,255,255,0.03)]">
              <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
            </div>
          </div>

          <h2 
            className="text-base md:text-lg font-medium tracking-[0.25em] uppercase text-white/95 mb-4"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Optimized for Desktop
          </h2>
          
          <p 
            className="text-xs text-white/50 leading-[1.8] font-light max-w-[270px] mb-8"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            This website is optimized for desktop and laptop viewports to preserve interactive structures, detailed navigation columns, and high-fidelity typography.
          </p>

          {/* Mini Brutalist Feature Specs */}
          <div className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-8 text-left space-y-2.5">
            <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase font-mono border-b border-white/5 pb-1.5">Environment Requirements</div>
            <div className="flex items-center space-x-2 text-[10px] text-white/70">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span style={{ fontFamily: "'Manrope', sans-serif" }}>Immersive multi-column grid layouts</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-white/70">
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span style={{ fontFamily: "'Manrope', sans-serif" }}>High-fidelity typography & navigation</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 flex flex-col items-center justify-between border-t border-white/10 pt-5 space-y-5 md:flex-row md:space-y-0">
          <div 
            className="text-[9px] tracking-[0.2em] text-white/45 uppercase text-center md:text-left"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            DISRUPTING THE STATUS QUO © {new Date().getFullYear()}
          </div>
          
          {/* Action button satisfying the 44px+ touch target rule (48px height) */}
          <button
            onClick={handleDismiss}
            className="group flex items-center justify-center space-x-2.5 h-12 px-6 rounded-full bg-white text-black font-semibold hover:bg-white/90 active:scale-[0.97] transition-all duration-200 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            aria-label="Continue to mobile site"
          >
            <span>Enter Anyway</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileBlocker
