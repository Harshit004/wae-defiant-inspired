"use client"

import React from 'react'
import dynamic from 'next/dynamic'

const WaterWave = dynamic(
  () => import('react-water-wave'),
  { ssr: false }
)

export default function LightweightRipple({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <WaterWave
        imageUrl={imageUrl}
        style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}
        dropRadius={15}
        perturbance={0.02}
        resolution={512}
      >
        {() => <div className="w-full h-full" />}
      </WaterWave>
    </div>
  )
}
