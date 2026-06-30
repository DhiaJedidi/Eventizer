'use client'

import { useEffect, useRef, useState } from 'react'

interface PixelTrailProps {
  pixelSize?: number
  fadeDuration?: number
  delay?: number
  className?: string
  /** Class applied to most cells — set the colour here (e.g. `bg-cobalt`). */
  pixelClassName?: string
  /** Optional accent colour applied to every `altEvery`-th cell (e.g. `bg-gold`). */
  altPixelClassName?: string
  altEvery?: number
}

/**
 * A grid of cells that flash and fade as the cursor passes over them. Apply a
 * `GooeyFilter` to the parent to merge the trail into liquid blobs. Recreated from
 * a framer-motion/uuid original to the project's stack: zero deps, direct DOM
 * opacity (no per-cell React state), desktop fine-pointer + non-reduced-motion only.
 */
export function PixelTrail({
  pixelSize = 32,
  fadeDuration = 600,
  delay = 0,
  className = '',
  pixelClassName = '',
  altPixelClassName = '',
  altEvery = 6,
}: PixelTrailProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(!reduce && fine)
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cols = Math.max(0, Math.ceil(dims.w / pixelSize))
  const rows = Math.max(0, Math.ceil(dims.h / pixelSize))

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / pixelSize)
    const y = Math.floor((e.clientY - rect.top) / pixelSize)
    const px = el.querySelector<HTMLElement>(`[data-px="${x}-${y}"]`)
    if (!px) return
    // Flash on instantly, then transition the fade-out.
    px.style.transition = 'none'
    px.style.opacity = '1'
    requestAnimationFrame(() => {
      px.style.transition = `opacity ${fadeDuration}ms ${delay}ms ease-out`
      px.style.opacity = '0'
    })
  }

  return (
    <div
      ref={ref}
      className={`absolute inset-0 h-full w-full ${className}`}
      onMouseMove={enabled ? handleMove : undefined}
    >
      {enabled &&
        dims.w > 0 &&
        Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                data-px={`${c}-${r}`}
                className={altPixelClassName && (c + r) % altEvery === 0 ? altPixelClassName : pixelClassName}
                style={{ width: pixelSize, height: pixelSize, opacity: 0 }}
              />
            ))}
          </div>
        ))}
    </div>
  )
}
