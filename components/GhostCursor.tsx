'use client'

import React, { useEffect, useRef } from 'react'

export default function GhostCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touchscreens
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -100
    let mouseY = -100
    let isVisible = false
    let isPointer = false
    let isClicking = false

    const render = () => {
      if (!cursor) return
      const scale = isClicking ? 0.9 : isPointer ? 1.15 : 1
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-38%, -4%) scale(${scale})`
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        cursor.style.opacity = '1'
      }

      const target = e.target as HTMLElement | null
      const clickable = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer'
      )
      isPointer = !!clickable
      render()
    }

    const handleMouseDown = () => {
      isClicking = true
      render()
    }

    const handleMouseUp = () => {
      isClicking = false
      render()
    }

    const handleMouseLeave = () => {
      isVisible = false
      cursor.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisible = true
      cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Add homepage-specific class to hide default cursor
    document.documentElement.classList.add('homepage-ghost-cursor-active')

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.classList.remove('homepage-ghost-cursor-active')
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999999] opacity-0 will-change-transform hidden md:block"
      style={{
        transition: 'opacity 0.2s ease, transform 0.03s linear',
      }}
      aria-hidden="true"
    >
      <img
        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8e483afa-d843-477f-e2f8-8b17703fa700/public"
        alt=""
        className="w-[38px] h-auto drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] select-none pointer-events-none"
        draggable={false}
      />
    </div>
  )
}
