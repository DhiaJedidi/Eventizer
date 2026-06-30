import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Single registration point. Import gsap/ScrollTrigger from here everywhere —
// never directly from the 'gsap' package in components (ai-usage.md §5/§10).
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
