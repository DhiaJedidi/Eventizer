'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import { gsap } from '@/lib/gsap'

interface RevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
  start?: string
  childSelector?: string
}

// useLayoutEffect on the client sets the hidden start state before paint (no flash);
// useEffect on the server avoids the SSR warning.
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Reusable GSAP ScrollTrigger reveal. Attach the returned ref to a section, pass
 * a `childSelector` to stagger children. SSR/no-JS safe (content renders visible;
 * the hidden start state is only set once GSAP runs) and skipped under
 * prefers-reduced-motion. transform + opacity only.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)

  useIso(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const {
      y = 32,
      x = 0,
      opacity = 0,
      duration = 0.95,
      stagger = 0.12,
      delay = 0,
      ease = 'expo.out',
      start = 'top 86%',
      childSelector,
    } = options

    const targets = childSelector ? el.querySelectorAll(childSelector) : el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
