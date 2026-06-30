'use client'

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'

import { HERO, SITE } from '@/lib/content'
import type { HeroView } from '@/types'
import { gsap } from '@/lib/gsap'
import { Magnetic } from '@/components/ui/Magnetic'

const POSTER = '/images/hero/hero-events-poster-v2.jpg'
const VIDEO = '/videos/hero-events.mp4'
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Split the (locked copy.md) headline into two visual lines at the comma. */
function splitHeading(h1: string): string[][] {
  const i = h1.indexOf(', ')
  const lines = i === -1 ? [h1] : [h1.slice(0, i + 1), h1.slice(i + 2)]
  return lines.map((line) => Array.from(line))
}

export function Hero({ data }: { data: HeroView }) {
  const root = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lines = useMemo(() => splitHeading(data.h1), [data.h1])

  // Slow the hero reel to 0.75x. Set defaultPlaybackRate too so it survives
  // autoplay start and loops; re-assert on play for browsers that reset it.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const apply = () => {
      v.defaultPlaybackRate = 0.75
      v.playbackRate = 0.75
    }
    apply()
    v.addEventListener('loadedmetadata', apply)
    v.addEventListener('play', apply)
    return () => {
      v.removeEventListener('loadedmetadata', apply)
      v.removeEventListener('play', apply)
    }
  }, [])

  // Entrance: per-char reveal of the heading, then staggered fades — timed like the spec
  // (chars @0.2s, subheadline @0.8s, CTAs @1.2s, tag @1.4s). GSAP via @/lib/gsap.
  useIso(() => {
    if (!root.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(
        '.hero-char',
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.03 },
        0.2,
      )
        .fromTo('.hero-sub', { opacity: 0 }, { opacity: 1, duration: 1 }, 0.8)
        .fromTo('.hero-ctas', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2)
        .fromTo('.hero-tag', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.4)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-noir text-white">
      {/* Raw full-screen video — no overlay, no dimming */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={POSTER}
        aria-hidden="true"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>

      {/* Subtle bottom scrim — keeps text legible across the 3 varied clips */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[5] h-2/3 bg-gradient-to-t from-noir/80 via-noir/30 to-transparent"
      />

      {/* Bottom-anchored content */}
      <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16">
        <div className="flex flex-1 flex-col justify-end pb-12 lg:grid lg:grid-cols-2 lg:items-end lg:pb-16">
          {/* Left — heading, subheadline, CTAs */}
          <div>
            <h1
              className="mb-4 font-heading text-4xl font-bold leading-[1.02] text-white md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              {lines.map((line, li) => (
                <span key={li} className="block">
                  {line.map((ch, ci) => (
                    <span key={`${li}-${ci}`} className="hero-char inline-block will-change-transform">
                      {ch === ' ' ? ' ' : ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hero-sub mb-6 max-w-xl text-base text-white/75 md:text-lg">{data.subheadline}</p>

            <div className="hero-ctas flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#contact"
                  aria-label={HERO.primaryCtaAria}
                  className="inline-flex rounded-lg bg-gold px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white/90"
                >
                  {data.primaryCta}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#services"
                  aria-label={HERO.secondaryCtaAria}
                  className="liquid-glass inline-flex rounded-lg px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                >
                  {data.secondaryCta}
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right — tagline tag card */}
          <div className="mt-10 flex items-end justify-start lg:mt-0 lg:justify-end">
            <div className="hero-tag liquid-glass rounded-xl px-6 py-3">
              <span className="text-lg font-light tracking-wideish md:text-xl lg:text-2xl">{SITE.tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
