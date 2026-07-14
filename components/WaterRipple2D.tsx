"use client"

import { useEffect, useRef } from "react"

export default function WaterRipple2D({ imageUrl }: { imageUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    let half_width: number
    let half_height: number
    let size: number
    let oldind: number
    let newind: number
    let ripplemap: Int32Array
    let last_map: Int32Array
    let ripple: ImageData
    let texture: ImageData
    const riprad = 3
    const delay = 30
    let animationFrameId: number
    let randomRippleInterval: NodeJS.Timeout

    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = imageUrl
    img.onload = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height

      half_width = width >> 1
      half_height = height >> 1
      size = width * (height + 2) * 2
      oldind = width
      newind = width * (height + 3)

      ripplemap = new Int32Array(size)
      last_map = new Int32Array(size)

      const imgAspect = img.width / img.height
      const canvasAspect = width / height
      let drawWidth = width
      let drawHeight = height
      let offsetX = 0
      let offsetY = 0

      if (canvasAspect > imgAspect) {
        drawHeight = width / imgAspect
        offsetY = (height - drawHeight) / 2
      } else {
        drawWidth = height * imgAspect
        offsetX = (width - drawWidth) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      texture = ctx.getImageData(0, 0, width, height)
      ripple = ctx.getImageData(0, 0, width, height)

      for (let i = 0; i < size; i++) {
        last_map[i] = ripplemap[i] = 0
      }

      let lastTime = 0
      function run(time: number) {
        if (time - lastTime >= delay) {
          newframe()
          ctx!.putImageData(ripple, 0, 0)
          lastTime = time
        }
        animationFrameId = requestAnimationFrame(run)
      }
      animationFrameId = requestAnimationFrame(run)

      randomRippleInterval = setInterval(() => {
        disturb(Math.random() * width, Math.random() * height)
      }, 700)
    }

    function disturb(dx: number, dy: number) {
      dx <<= 0
      dy <<= 0

      for (let j = dy - riprad; j < dy + riprad; j++) {
        for (let k = dx - riprad; k < dx + riprad; k++) {
          if (j >= 0 && j < height && k >= 0 && k < width) {
            ripplemap[oldind + (j * width) + k] += 128
          }
        }
      }
    }

    function newframe() {
      let a, b, data, old_data
      let cur_pixel, new_pixel

      let t = oldind; oldind = newind; newind = t;
      let i = 0

      const _width = width,
        _height = height,
        _ripplemap = ripplemap,
        _last_map = last_map,
        _rd = ripple.data,
        _td = texture.data,
        _half_width = half_width,
        _half_height = half_height;

      for (let y = 0; y < _height; y++) {
        for (let x = 0; x < _width; x++) {
          const _newind = newind + i, _mapind = oldind + i;
          data = (
            _ripplemap[_mapind - _width] +
            _ripplemap[_mapind + _width] +
            _ripplemap[_mapind - 1] +
            _ripplemap[_mapind + 1]) >> 1;

          data -= _ripplemap[_newind];
          data -= data >> 5;

          _ripplemap[_newind] = data;

          data = 1024 - data;

          old_data = _last_map[i];
          _last_map[i] = data;

          if (old_data !== data) {
            a = (((x - _half_width) * data / 1024) << 0) + _half_width;
            b = (((y - _half_height) * data / 1024) << 0) + _half_height;

            if (a >= _width) a = _width - 1;
            if (a < 0) a = 0;
            if (b >= _height) b = _height - 1;
            if (b < 0) b = 0;

            new_pixel = (a + (b * _width)) * 4;
            cur_pixel = i * 4;

            _rd[cur_pixel] = _td[new_pixel];
            _rd[cur_pixel + 1] = _td[new_pixel + 1];
            _rd[cur_pixel + 2] = _td[new_pixel + 2];
          }

          ++i;
        }
      }
    }

    const handleMouseMove = (evt: MouseEvent) => {
      disturb(evt.offsetX, evt.offsetY)
    }
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (randomRippleInterval) clearInterval(randomRippleInterval)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [imageUrl])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  )
}
