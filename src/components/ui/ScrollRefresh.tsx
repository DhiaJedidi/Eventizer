'use client'

import { useEffect } from 'react'

import { ScrollTrigger } from '@/lib/gsap'

/**
 * Recomputes every ScrollTrigger once the page has settled. The home page has two
 * pinned sections (the Team Building wheel and the Références carousel) plus a
 * post-mount layout swap and lazy images — all of which shift element positions
 * after the pins initialise, which previously made sections overlap. Refreshing
 * after load / fonts / images realigns them. No-op under reduced motion.
 */
export function ScrollRefresh() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const refresh = () => ScrollTrigger.refresh()

    const onLoad = () => refresh()
    if (document.readyState !== 'complete') window.addEventListener('load', onLoad)

    const timers = [120, 500, 1200, 2400].map((d) => window.setTimeout(refresh, d))
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('load', onLoad)
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])

  return null
}
