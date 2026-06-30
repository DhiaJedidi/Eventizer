'use client'

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'

import { gsap } from '@/lib/gsap'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Variant = 'up' | 'mask' | 'clip'

/**
 * Editorial scroll reveals (GSAP ScrollTrigger). SSR/no-JS safe (content renders
 * visible; the hidden start state is only set once GSAP runs) and skipped under
 * prefers-reduced-motion. transform / opacity / clip-path only.
 *
 *  - up   : smooth fade + rise (default)
 *  - mask : text slides up from behind a clipped edge (headings)
 *  - clip : image uncovers via clip-path + gentle scale settle
 */
export function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  duration,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  variant?: Variant
  delay?: number
  duration?: number
  as?: 'div' | 'span' | 'li' | 'h2' | 'h3'
}) {
  const ref = useRef<HTMLElement>(null)

  useIso(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top 86%', once: true }
      if (variant === 'mask') {
        const inner = el.firstElementChild ?? el
        gsap.set(el, { overflow: 'hidden' })
        gsap.fromTo(
          inner,
          { yPercent: 115 },
          { yPercent: 0, duration: duration ?? 1, delay, ease: 'expo.out', scrollTrigger: st },
        )
      } else if (variant === 'clip') {
        const img = el.firstElementChild
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: duration ?? 1.1, delay, ease: 'expo.out', scrollTrigger: st },
        )
        if (img) gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: duration ?? 1.3, delay, ease: 'expo.out', scrollTrigger: st })
      } else {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: duration ?? 0.9, delay, ease: 'expo.out', scrollTrigger: st },
        )
      }
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag ref={ref as never} className={className} style={{ willChange: 'transform' }}>
      {children}
    </Tag>
  )
}
