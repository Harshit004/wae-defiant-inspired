"use client"

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const WaterWave = dynamic(
  () => import('react-water-wave'),
  { ssr: false }
)

export default function LightweightRipple({ imageUrl }: { imageUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <WaterWave
        imageUrl={imageUrl}
        crossOrigin="anonymous"
        style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}
        dropRadius={20}
        perturbance={0.03}
        resolution={512}
        interactive={true}
      >
        {({ drop }: any) => <AmbientDropper drop={drop} containerRef={containerRef} />}
      </WaterWave>
    </div>
  )
}

function AmbientDropper({ drop, containerRef }: { drop: any; containerRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    if (!drop) return
    const interval = setInterval(() => {
      const container = containerRef.current
      if (!container) return
      const width = container.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 1440)
      const height = container.offsetHeight || (typeof window !== 'undefined' ? window.innerHeight : 900)
      const x = Math.random() * width
      const y = Math.random() * height
      drop({
        x,
        y,
        radius: 14 + Math.random() * 8,
        strength: 0.015 + Math.random() * 0.02,
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [drop, containerRef])

  return <div className="w-full h-full" />
}
