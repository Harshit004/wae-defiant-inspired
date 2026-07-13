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
  const { viewport, size } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - e.clientY / window.innerHeight; // Invert Y axis for WebGL
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!materialRef.current) return;
    
    // Smoothly ease the shader uniform toward the actual mouse pointer position
    materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, mouse.current.x, 0.1);
    materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, mouse.current.y, 0.1);
    
    // Pass the current screen size and texture size
    materialRef.current.uResolution.set(size.width, size.height);
    materialRef.current.uTextureSize.set(1440, 691);
    
    // Increment progress time variable to keep the liquid waves undulating
    materialRef.current.uProgress += 0.05;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
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
