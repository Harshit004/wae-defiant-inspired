import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const WaterDistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uProgress: 0.0,
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
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse;
      
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
