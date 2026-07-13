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
        uv.x *= screenRatio / texRatio;
      } else {
        uv.y *= texRatio / screenRatio;
      }
      uv += 0.5;

      // Displaced mouse coordinate needs to be scaled as well
      vec2 mouse = uMouse - 0.5;
      if (screenRatio > texRatio) {
        mouse.x *= screenRatio / texRatio;
      } else {
        mouse.y *= texRatio / screenRatio;
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
      
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0);
      } else {
        gl_FragColor = texture2D(uTexture, uv);
      }
    }
  `
);
