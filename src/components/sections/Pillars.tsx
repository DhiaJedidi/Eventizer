'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

import { getContent } from '@/lib/content-i18n'
import type { Locale } from '@/lib/i18n'
import type { SectionHeaderView } from '@/types'
import { track } from '@/lib/analytics'
import { gsap } from '@/lib/gsap'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Container } from '@/components/ui/Container'

const PILLAR_IMAGES = [
  '/images/pillars/management.png',
  '/images/pillars/tech.png',
  '/images/pillars/communication.png',
  '/images/pillars/audiovisuel.png',
]

export function Pillars({ header, locale }: { header: SectionHeaderView; locale: Locale }) {
  const { PILLARS } = getContent(locale)
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const sectionRef = useGsapReveal<HTMLElement>({ childSelector: '.pillar-reveal', y: 28, stagger: 0.12, start: 'top 80%' })

  const switchTab = (i: number) => {
    if (i === active) return
    track('pillar_expand', { pillar: PILLARS.items[i].title })
    const panel = panelRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !panel) {
      setActive(i)
      return
    }
    gsap.to(panel, {
      opacity: 0,
      x: -10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActive(i)
        gsap.fromTo(panel, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.35, ease: 'expo.out' })
      },
    })
  }

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden bg-paper py-28 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />
      <Container className="relative z-10">
        <header className="pillar-reveal mx-auto max-w-prose text-center">
          {header.eyebrow ? <p className="eyebrow text-cobalt">{header.eyebrow}</p> : null}
          <h2 className="mt-5 font-heading text-display-lg font-bold text-ink">{header.title}</h2>
          {header.subtitle ? <p className="mt-5 text-lg leading-relaxed text-mute">{header.subtitle}</p> : null}
        </header>

        {/* Desktop — tabbed explorer */}
        <div
          className="pillar-reveal spotlight grad-border mx-auto mt-16 hidden max-w-content overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-30px_rgb(26_23_20/0.18)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-30px_rgb(69_99_172/0.28)] lg:grid lg:grid-cols-[300px_1fr]"
          role="tablist"
          aria-label={header.title}
        >
          <div className="border-r border-line bg-cream p-3">
            {PILLARS.items.map((p, i) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => switchTab(i)}
                className={`mb-1 flex w-full items-center gap-4 rounded-xl px-5 py-5 text-left transition-all duration-300 ${
                  active === i ? 'bg-white text-ink shadow-[0_2px_12px_-4px_rgb(26_23_20/0.15)]' : 'text-mute hover:text-ink'
                }`}
              >
                <span
                  className={`font-heading text-sm font-medium tabular-nums ${active === i ? 'text-cobalt' : 'text-mute'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] font-semibold">{p.title}</span>
              </button>
            ))}
          </div>

          <div ref={panelRef} className="p-10 xl:p-14">
            <PillarPanel pillar={PILLARS.items[active]} index={active} />
          </div>
        </div>

        {/* Mobile — accordion */}
        <div className="mt-12 space-y-3 lg:hidden">
          {PILLARS.items.map((p, i) => (
            <div key={p.title} className="spotlight grad-border overflow-hidden rounded-xl border border-line bg-white">
              <button
                type="button"
                aria-expanded={openMobile === i}
                aria-controls={`pillar-m-${i}`}
                onClick={() => setOpenMobile(openMobile === i ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className="font-heading text-sm font-medium tabular-nums text-cobalt">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-semibold text-ink">{p.title}</span>
                <span aria-hidden="true" className={`text-cobalt transition-transform duration-300 ${openMobile === i ? 'rotate-180' : ''}`}>
                  ⌄
                </span>
              </button>
              <div id={`pillar-m-${i}`} hidden={openMobile !== i} className="border-t border-line p-5">
                <PillarPanel pillar={p} index={i} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

type PillarItem = {
  title: string
  description: string
  services: readonly string[]
  expandCta: string
  expandAria: string
}

function PillarPanel({ pillar, index }: { pillar: PillarItem; index: number }) {
  return (
    <div className="pillar-panel">
      <div className="group mb-7 overflow-hidden rounded-xl">
        <Image
          src={PILLAR_IMAGES[index]}
          alt=""
          aria-hidden="true"
          width={800}
          height={600}
          sizes="(max-width: 1024px) 100vw, 720px"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="font-heading text-2xl font-semibold text-ink">{pillar.title}</h3>
      <p className="mt-3 max-w-lg leading-relaxed text-body">{pillar.description}</p>
      <div className="mt-7 grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
        {pillar.services.map((service) => (
          <div key={service} className="flex items-center gap-2.5 border-b border-line py-3">
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-cobalt" />
            <span className="text-[13px] text-body">{service}</span>
          </div>
        ))}
      </div>
      <a
        href="#contact"
        aria-label={pillar.expandAria}
        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-cobalt"
      >
        {pillar.expandCta}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </div>
  )
}
