'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import { PLATFORM } from '@/lib/content'
import type { PlatformView } from '@/types'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { Reveal } from '@/components/ui/Reveal'
import { BrowserMockup } from '@/components/illustrations/BrowserMockup'
import { CommandHubIllustration } from '@/components/illustrations/CommandHubIllustration'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function Platform({ data }: { data: PlatformView }) {
  const root = useRef<HTMLElement>(null)

  useIso(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.platform-head', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } })
      gsap.to('.browser-mockup', { y: -40, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="plateforme" ref={root} className="relative overflow-hidden border-y border-line bg-cream py-28 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />
      <Container className="relative z-10 max-w-prose text-center">
        <div className="platform-head">
          <p className="eyebrow text-cobalt">{PLATFORM.eyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-heading text-display-lg font-bold text-ink">{data.h2}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mute">{data.body}</p>
        </div>
      </Container>

      <Container className="relative z-10 mt-14 max-w-3xl">
        <div className="relative">
          {/* Cobalt glow halo behind the dashboard */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(var(--cobalt)/0.18),transparent_70%)] blur-2xl"
          />
          <Reveal variant="clip" className="relative overflow-hidden rounded-xl shadow-[0_40px_120px_-40px_rgb(69_99_172/0.45)]">
            <div className="browser-mockup">
              <BrowserMockup url="app.eventizer.tn/dashboard">
                <CommandHubIllustration detailed />
              </BrowserMockup>
            </div>
          </Reveal>
        </div>

        <ul aria-label={PLATFORM.featuresAria} className="mt-12 flex flex-wrap justify-center gap-2.5">
          {data.features.map((feature) => (
            <li
              key={feature}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13px] text-body transition-all duration-300 hover:-translate-y-0.5 hover:border-cobalt/50 hover:text-ink hover:shadow-[0_8px_20px_-10px_rgb(69_99_172/0.4)]"
            >
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cobalt transition-transform duration-300 group-hover:scale-150" />
              {feature}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-xl border-l-2 border-gold bg-gold/[0.06] px-7 py-5 text-center leading-relaxed text-ink">
          {data.proofPoint}
        </p>

        <div className="mt-9 flex justify-center">
          <Magnetic>
            <ButtonLink href="#contact" variant="solid" aria-label={PLATFORM.ctaAria}>
              {data.cta}
              <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </ButtonLink>
          </Magnetic>
        </div>
      </Container>
    </section>
  )
}
