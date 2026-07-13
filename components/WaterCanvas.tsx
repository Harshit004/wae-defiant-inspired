'use client';

import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { WaterDistortionMaterial } from './WaterDistortionMaterial';

// Register custom shader material into the React Three Fiber ecosystem
extend({ WaterDistortionMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterDistortionMaterial: any;
    }
  }
}

function Scene({ imgUrl }: { imgUrl: string }) {
  const materialRef = useRef<any>(null);
  const texture = useLoader(THREE.TextureLoader, imgUrl);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  // Target aspect ratio of the image (1440x691)
  const targetAspect = 1440 / 691;
  const viewportAspect = viewport.width / viewport.height;

  let scaleW = viewport.width;
  let scaleH = viewport.height;

  if (viewportAspect > targetAspect) {
    // Viewport is wider than target aspect ratio: cover width, crop top/bottom
    scaleH = viewport.width / targetAspect;
  } else {
    // Viewport is taller than target aspect ratio: cover height, crop sides
    scaleW = viewport.height * targetAspect;
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nsX = e.clientX / window.innerWidth;
      const nsY = 1.0 - e.clientY / window.innerHeight; // Invert Y axis for WebGL
      
      // Map normalized screen coordinates to scaled/cropped mesh coordinates
      mouse.current.x = (nsX - 0.5) * (viewport.width / scaleW) + 0.5;
      mouse.current.y = (nsY - 0.5) * (viewport.height / scaleH) + 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport.width, viewport.height, scaleW, scaleH]);

  useFrame(() => {
    if (!materialRef.current) return;
    
    // Smoothly ease the shader uniform toward the actual mouse pointer position
    materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, mouse.current.x, 0.1);
    materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, mouse.current.y, 0.1);
    
    // Increment progress time variable to keep the liquid waves undulating
    materialRef.current.uProgress += 0.05;
  });

  return (
    <mesh scale={[scaleW, scaleH, 1]}>
      <planeGeometry args={[1, 1]} />
      <waterDistortionMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

export default function WaterCanvas({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 5], fov: 15 }}>
        <Scene imgUrl={imgUrl} />
      </Canvas>
    </div>
  );
}
