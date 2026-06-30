'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { gsap } from '@/lib/gsap'

/**
 * Magnetic hover wrapper — the element drifts toward the cursor and springs back
 * on leave (GSAP, via @/lib/gsap). Wraps the child in a moving span so the child
 * keeps its own CSS hover/press. Desktop pointer only; skipped under
 * prefers-reduced-motion. transform only.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const ctx = gsap.context(() => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' })
      }
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' })
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
    }, el)

    return () => ctx.revert()
  }, [strength])

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}
