"use client"

import React, { useState } from "react"
import Image from "next/image"

export default function ShareArticleButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err)
        })
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share article"
      className="hover:opacity-80 transition-opacity relative flex items-center cursor-pointer bg-transparent border-none p-0"
    >
      <Image
        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cefe6cc9-95e7-4e11-0008-900d4d407600/public"
        alt="Share"
        width={24}
        height={24}
        className="w-4 h-4 md:w-6 md:h-6 object-contain"
      />
      {copied && (
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-[10px] bg-black/95 text-white rounded border border-white/20 whitespace-nowrap backdrop-blur-sm shadow-md font-inter-tight">
          Link Copied!
        </span>
      )}
    </button>
  )
}
