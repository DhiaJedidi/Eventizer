'use client'

import { type CSSProperties } from 'react'
import Image from 'next/image'

import type { TeamBuildingItemView, TeamBuildingView } from '@/types'
import { track } from '@/lib/analytics'
import { Container } from '@/components/ui/Container'
import { FlickeringGrid } from '@/components/ui/FlickeringGrid'
import { ScrollXCarousel } from '@/components/ui/ScrollXCarousel'

const WORDMARK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='200' viewBox='0 0 1000 200'><text x='500' y='152' font-family='Arial, Helvetica, sans-serif' font-weight='800' font-size='168' letter-spacing='-5' text-anchor='middle' fill='white'>EVENTIZER</text></svg>`
const WORDMARK_MASK = `url("data:image/svg+xml,${encodeURIComponent(WORDMARK_SVG)}")`
const wordmarkMaskStyle: CSSProperties = {
  WebkitMaskImage: WORDMARK_MASK,
  maskImage: WORDMARK_MASK,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskSize: 'min(1080px, 92%)',
  maskSize: 'min(1080px, 92%)',
}

/** Activity card — image with a content panel that reveals on hover (adapted
 *  from CardHoverReveal to pure CSS group-hover, brand colours). */
function Card({ item, onSelect }: { item: TeamBuildingItemView; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${item.title} — ${item.subtitle}`}
      className="tb-card group relative h-[420px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-line bg-noir text-left shadow-[0_30px_60px_-30px_rgb(13_13_13/0.5)] outline-none transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:h-[460px] sm:w-[320px]"
    >
      <Image
        src={item.image}
        alt=""
        aria-hidden="true"
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/25 to-transparent" />

      {/* Default title */}
      <span className="absolute inset-x-0 bottom-0 block p-6 transition-all duration-500 ease-out group-hover:translate-y-2 group-hover:opacity-0">
        <span className="block font-heading text-xl font-bold uppercase tracking-wide text-white">{item.title}</span>
        <span className="mt-1 block text-sm text-white/70">{item.subtitle}</span>
      </span>

      {/* Hover reveal panel */}
      <span className="absolute inset-x-3 bottom-3 block translate-y-[120%] rounded-xl border border-white/10 bg-noir/55 p-5 opacity-0 backdrop-blur-xl transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
        <span className="inline-block rounded-full bg-gold px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-noir">
          {item.title}
        </span>
        <span className="mt-3 block text-sm leading-relaxed text-white/85">{item.subtitle}</span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
          Organisez le vôtre
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </button>
  )
}

/**
 * "Team Building en mode action !" — a scroll-driven horizontal carousel
 * (ScrollXCarousel: CSS sticky + GSAP scrub, no pin, so no conflict with the
 * pinned Références section). Cards reveal details on hover and route to contact.
 */
export function TeamBuilding({ data }: { data: TeamBuildingView }) {
  const items = data.items
  const select = () => {
    track('team_building_select')
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="team-building" className="relative bg-paper">
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />

      <ScrollXCarousel
        heightVh={200}
        header={
          <Container className="relative z-10 text-center">
            {data.eyebrow ? <p className="eyebrow text-cobalt">{data.eyebrow}</p> : null}
            <h2 className="mx-auto mt-5 max-w-3xl font-heading text-display-lg font-bold text-ink">{data.h2}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mute">{data.intro}</p>
          </Container>
        }
        background={
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 opacity-90" style={wordmarkMaskStyle}>
            <FlickeringGrid color="#4563AC" maxOpacity={0.45} flickerChance={0.15} squareSize={4} gridGap={4} />
          </div>
        }
      >
        {items.map((item) => (
          <Card key={item.title} item={item} onSelect={select} />
        ))}
      </ScrollXCarousel>
    </section>
  )
}
