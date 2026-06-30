'use client'

import { useEffect, useRef } from 'react'

import { gsap } from '@/lib/gsap'

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor]'

/**
 * Custom pointer — a gold dot that tracks precisely plus a cobalt ring that lags
 * and expands over interactive elements. Also drives the cursor-tracking glow on
 * `.spotlight` cards (one delegated pointermove listener). Desktop fine-pointer
 * only; fully skipped under prefers-reduced-motion, so the native cursor stays.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    const ctx = gsap.context(() => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

      const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
      const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
      const xRing = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3' })
      const yRing = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3' })

      let shown = false
      let hovering = false

      const move = (e: PointerEvent) => {
        if (!shown) {
          shown = true
          gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
        }
        xDot(e.clientX)
        yDot(e.clientY)
        xRing(e.clientX)
        yRing(e.clientY)

        // Drive cursor-tracking glow on spotlight cards.
        const sp = (e.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null
        if (sp) {
          const r = sp.getBoundingClientRect()
          sp.style.setProperty('--mx', `${e.clientX - r.left}px`)
          sp.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
      }

      const over = (e: PointerEvent) => {
        if (!hovering && (e.target as Element | null)?.closest?.(INTERACTIVE)) {
          hovering = true
          ring.classList.add('is-hover')
          gsap.to(ring, { scale: 1.9, duration: 0.32, ease: 'power3.out' })
          gsap.to(dot, { scale: 0.5, duration: 0.32, ease: 'power3.out' })
        }
      }
      const out = (e: PointerEvent) => {
        if (hovering && !(e.relatedTarget as Element | null)?.closest?.(INTERACTIVE)) {
          hovering = false
          ring.classList.remove('is-hover')
          gsap.to(ring, { scale: 1, duration: 0.32, ease: 'power3.out' })
          gsap.to(dot, { scale: 1, duration: 0.32, ease: 'power3.out' })
        }
      }
      const down = () => gsap.to(ring, { scale: hovering ? 1.5 : 0.78, duration: 0.18 })
      const up = () => gsap.to(ring, { scale: hovering ? 1.9 : 1, duration: 0.3 })
      const leave = () => {
        shown = false
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 })
      }

      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('pointerover', over, { passive: true })
      window.addEventListener('pointerout', out, { passive: true })
      window.addEventListener('pointerdown', down, { passive: true })
      window.addEventListener('pointerup', up, { passive: true })
      document.addEventListener('mouseleave', leave)

      return () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerover', over)
        window.removeEventListener('pointerout', out)
        window.removeEventListener('pointerdown', down)
        window.removeEventListener('pointerup', up)
        document.removeEventListener('mouseleave', leave)
      }
    })

    return () => {
      root.classList.remove('has-cursor')
      ctx.revert()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  )
}
