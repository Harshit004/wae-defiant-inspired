import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const WaterDistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uProgress: 0.0,
    uResolution: new THREE.Vector2(1, 1),
    uTextureSize: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment (Pixel) Shader
  `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uProgress;
    uniform vec2 uResolution;
    uniform vec2 uTextureSize;
    varying vec2 vUv;

    void main() {
      float screenRatio = uResolution.x / uResolution.y;
      float texRatio = uTextureSize.x / uTextureSize.y;
      
      vec2 uv = vUv - 0.5;
      if (screenRatio > texRatio) {
        // screen is wider than texture - scale Y to crop top/bottom
        uv.y *= texRatio / screenRatio;
      } else {
        // screen is taller than texture - scale X to crop sides
        uv.x *= screenRatio / texRatio;
      }
      uv += 0.5;

      // Displaced mouse coordinate needs to be scaled identically
      vec2 mouse = uMouse - 0.5;
      if (screenRatio > texRatio) {
        mouse.y *= texRatio / screenRatio;
      } else {
        mouse.x *= screenRatio / texRatio;
      }
      mouse += 0.5;
      
      // Calculate distance from cursor to pixel
      float distortion = distance(uv, mouse);
      
      // Create a wave ripple falloff effect based on distance
      if (distortion < 0.25) {
        float wave = sin(distortion * 40.0 - uProgress * 5.0) * 0.015;
        // Displace the UV coordinate directions mapping the image
        uv += (uv - mouse) * wave * (1.0 - distortion * 4.0);
      }
      
      gl_FragColor = texture2D(uTexture, uv);
    }
  `
);
