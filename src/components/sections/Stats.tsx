'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import { STATS } from '@/lib/content'
import type { StatView } from '@/types'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Social-proof stats — clean white band, oversized ink numbers that count up on
 * scroll-in with small uppercase labels (landing-page guide: huge animated
 * social proof; taste skill: negative space over card chrome). Motion per the
 * web-animation skill: entrance → ease-out, transform/opacity only, count-up via
 * a tweened value object, fully skipped under prefers-reduced-motion.
 */
export function Stats({ data }: { data: StatView[] }) {
  const root = useRef<HTMLDivElement>(null)

  useIso(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        // Entrance: subtle rise + settle (start from scale 0.96, not 0).
        gsap.fromTo(
          '.stat-item',
          { y: 22, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      }
      el.querySelectorAll<HTMLElement>('.stat-value').forEach((node) => {
        const value = node.dataset.value ?? ''
        const m = value.match(/^([\d\s ]+)(.*)$/)
        const target = m ? parseInt(m[1].replace(/[\s ]/g, ''), 10) : NaN
        const suffix = m ? m[2] : ''
        if (Number.isNaN(target) || reduce) {
          node.textContent = value
          return
        }
        const o = { v: 0 }
        gsap.to(o, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { v: 1 },
          onUpdate() {
            node.textContent = Math.round(o.v).toLocaleString('fr-FR') + suffix
          },
          onComplete() {
            node.textContent = value
          },
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="chiffres" aria-label={STATS.sectionAria} className="border-y border-line bg-white py-20 sm:py-24">
      <Container>
        <div
          ref={root}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-4 sm:gap-x-8"
        >
          {data.map((stat) => (
            <div key={stat.label} className="stat-item text-center will-change-transform">
              <span
                className="stat-value block whitespace-nowrap font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
                data-value={stat.value}
              >
                {Number.isNaN(parseInt(stat.value, 10)) ? stat.value : '0'}
              </span>
              <span className="mt-3 block text-[11px] uppercase tracking-widest2 text-mute">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
