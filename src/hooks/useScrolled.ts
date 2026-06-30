'use client'

import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `threshold` px. Drives the Navbar's
 * transparent → solid background transition. Passive listener, no layout reads
 * beyond scrollY (cheap — INP-safe).
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
