'use client'

import Image from 'next/image'

import { getContent } from '@/content'
import type { Locale } from '@/lib/i18n'
import type { SectionHeaderView } from '@/types'
import { track } from '@/lib/analytics'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Container } from '@/components/ui/Container'

const PILLAR_IMAGES = [
  '/images/pillars/management.png',
  '/images/pillars/tech.png',
  '/images/pillars/communication.png',
  '/images/pillars/audiovisuel.png',
]

/**
 * "Nos expertises" — a scannable 2×2 grid: every pillar and its concrete
 * deliverables are visible at once. (The previous tabbed explorer hid 3 of the 4
 * behind clicks and let a decorative photo push the actual services below the
 * fold.) The photo is now a compact 16:9 band carrying the number + title, so it
 * sets the mood without costing the content its space.
 */
export function Pillars({ header, locale }: { header: SectionHeaderView; locale: Locale }) {
  const sectionRef = useGsapReveal<HTMLElement>({
    childSelector: '.pillar-reveal',
    y: 28,
    stagger: 0.1,
    start: 'top 80%',
  })
  const { PILLARS } = getContent(locale)

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden bg-paper py-28 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />
      <Container className="relative z-10">
        <header className="pillar-reveal mx-auto max-w-prose text-center">
          {header.eyebrow ? <p className="eyebrow text-cobalt">{header.eyebrow}</p> : null}
          <h2 className="mt-5 font-heading text-display-lg font-bold text-ink">{header.title}</h2>
          {header.subtitle ? <p className="mt-5 text-lg leading-relaxed text-mute">{header.subtitle}</p> : null}
        </header>

        <ul className="mx-auto mt-16 grid max-w-content grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
          {PILLARS.items.map((pillar, i) => (
            <li key={pillar.title} className="pillar-reveal">
              <PillarCard pillar={pillar} index={i} />
            </li>
          ))}
        </ul>
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

function PillarCard({ pillar, index }: { pillar: PillarItem; index: number }) {
  return (
    <article className="spotlight grad-border group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-500 ease-out-quart hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgb(69_99_172/0.35)]">
      {/* Photo band — decorative, and it carries the number + title so the image
          costs no extra vertical space. */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={PILLAR_IMAGES[index]}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 570px, 100vw"
          className="object-cover [filter:grayscale(0.3)] transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-[1.05] group-hover:[filter:grayscale(0)]"
        />
        <div
          aria-hidden="true"
          // Weighted to the bottom: keeps the title legible on any photo while
          // leaving the top of the image visible.
          className="absolute inset-0 bg-gradient-to-t from-noir via-noir/45 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-baseline gap-3.5 p-6">
          <span aria-hidden="true" className="font-heading text-sm font-bold tabular-nums text-gold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-heading text-xl font-bold leading-tight text-white sm:text-2xl">{pillar.title}</h3>
        </div>
        {/* Gold rule that draws across on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-cobalt transition-transform duration-500 ease-out-quart group-hover:scale-x-100 rtl:origin-right"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="leading-relaxed text-body">{pillar.description}</p>

        {/* Deliverables — always visible; this is what a prospect is scanning for. */}
        <ul className="mt-6">
          {pillar.services.map((service) => (
            <li key={service} className="flex items-start gap-3 border-t border-line py-3">
              <CheckIcon />
              <span className="text-sm leading-relaxed text-body">{service}</span>
            </li>
          ))}
        </ul>

        {/* mt-auto keeps the CTAs aligned across cards of differing text length. */}
        <a
          href="#contact"
          aria-label={pillar.expandAria}
          onClick={() => track('pillar_expand', { pillar: pillar.title })}
          className="group/cta mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-ink transition-colors hover:text-cobalt"
        >
          {pillar.expandCta}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </article>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-cobalt"
    >
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
