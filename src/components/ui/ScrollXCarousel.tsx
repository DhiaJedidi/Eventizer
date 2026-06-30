'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { gsap, ScrollTrigger } from '@/lib/gsap'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Scroll-driven horizontal carousel — the track translates left as you scroll the
 * (tall) wrapper, while a sticky inner stage holds it in view. Recreated from a
 * motion/react component to the project's stack: CSS `sticky` (NOT a GSAP pin, so
 * it never inserts a pin-spacer and can't conflict with other pinned sections) +
 * a GSAP scrub tween for the x + progress bar. Reduced-motion → plain native
 * horizontal scroll. No `motion`, no `cn`.
 */
export function ScrollXCarousel({
  children,
  header,
  background,
  heightVh = 220,
  trackClassName = '',
}: {
  children: ReactNode
  header?: ReactNode
  background?: ReactNode
  heightVh?: number
  trackClassName?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useIso(() => {
    const wrap = wrapRef.current
    const trackEl = trackRef.current
    if (!wrap || !trackEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth)
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
    }, wrap)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  if (reduce) {
    return (
      <div className="relative">
        {header}
        <div className={`no-scrollbar flex gap-6 overflow-x-auto px-6 pb-4 ${trackClassName}`}>{children}</div>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden">
        {background}
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[8vw] bg-[linear-gradient(90deg,rgb(var(--paper))_35%,transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[8vw] bg-[linear-gradient(270deg,rgb(var(--paper))_35%,transparent)]"
        />

        {header}

        <div ref={trackRef} className={`relative z-10 flex w-max gap-6 px-8 ${trackClassName}`}>
          {children}
        </div>

        <div className="relative z-10 mx-8 h-1 overflow-hidden rounded-full bg-line sm:mx-[max(2rem,calc((100vw-1180px)/2))]">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cobalt to-gold" />
        </div>
      </div>
    </div>
  )
}
