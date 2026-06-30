'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

import type { CaseStudyView, SectionHeaderView } from '@/types'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Generic premium event-atmosphere backdrop per case (decorative). Real Payload
// photos override these; the verified event name + stat live in the text below.
function backdropFor(slug: string): { src: string; grad: string } {
  if (slug.includes('sommet')) return { src: '/images/cases/sommet.png', grad: 'case-grad-sommet' }
  if (slug.includes('radiologie')) return { src: '/images/cases/radiologie.png', grad: 'case-grad-radiologie' }
  if (slug.includes('osstem')) return { src: '/images/cases/osstem.png', grad: 'case-grad-osstem' }
  return { src: '/images/cases/bconnected.png', grad: 'case-grad-bconnected' }
}

export function CaseStudies({ data, header }: { data: CaseStudyView[]; header: SectionHeaderView }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)
  const [activeDot, setActiveDot] = useState(0)

  // Pinned scroll-driven horizontal only on capable desktops; otherwise native swipe.
  useIso(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 1023px)').matches
    setPinned(!reduce && !small)
  }, [])

  // Vertical scroll → horizontal track translation, with the section pinned.
  useIso(() => {
    if (!pinned) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Refreshed after the Team Building wheel pin (refreshPriority 1) so this
          // pin's start accounts for that section's pin spacer — prevents overlap.
          refreshPriority: 0,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
    }, section)
    // Card widths are fixed, so layout is stable; refresh after mount just in case.
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [pinned])

  // Native-mode active dot tracking.
  const onScroll = () => {
    const t = trackRef.current
    if (!t || pinned) return
    const card = t.querySelector<HTMLElement>('.case-card')
    const w = (card?.offsetWidth ?? 440) + 24
    setActiveDot(Math.round(t.scrollLeft / w))
  }
  const goTo = (i: number) => {
    trackRef.current?.querySelectorAll<HTMLElement>('.case-card')[i]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="references"
      className={`relative overflow-hidden bg-paper ${
        pinned ? 'flex h-screen flex-col justify-center' : 'py-28 sm:py-32 lg:py-40'
      }`}
    >
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          {header.eyebrow ? <p className="eyebrow text-cobalt">{header.eyebrow}</p> : null}
          <h2 className="mt-5 font-heading text-display-lg font-bold text-ink">{header.title}</h2>
          {header.subtitle ? <p className="mt-5 text-lg leading-relaxed text-mute">{header.subtitle}</p> : null}
        </header>
      </Container>

      {/* Track — translated by GSAP when pinned, native scroll otherwise */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className={`mt-12 flex gap-6 px-[max(1.5rem,calc((100vw-1100px)/2))] will-change-transform ${
          pinned ? '' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-2'
        }`}
      >
        {data.map((item) => (
          <CaseCard key={item.slug} item={item} />
        ))}
      </div>

      {/* Indicator */}
      <Container>
        {pinned ? (
          <div aria-hidden="true" className="mt-12 h-0.5 w-40 overflow-hidden rounded-full bg-ink/10">
            <div ref={barRef} className="h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cobalt to-gold" />
          </div>
        ) : (
          <div className="mt-10 flex justify-center gap-2">
            {data.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`Voir la référence ${i + 1}`}
                aria-current={activeDot === i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeDot === i ? 'w-7 bg-cobalt' : 'w-1.5 bg-ink/15 hover:bg-ink/30'
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

function CaseCard({ item }: { item: CaseStudyView }) {
  const bd = backdropFor(item.slug)
  const src = item.image?.url ?? bd.src
  return (
    <article
      aria-label={`Référence client : ${item.title}`}
      className={`case-card grad-border group relative flex h-[480px] w-[300px] flex-none snap-start flex-col justify-end overflow-hidden rounded-2xl border border-white/6 transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-30px_rgb(69_99_172/0.55)] sm:h-[560px] sm:w-[440px] ${bd.grad}`}
    >
      <Image
        src={src}
        alt={item.image?.alt ?? ''}
        aria-hidden={item.image ? undefined : true}
        fill
        sizes="(max-width: 640px) 300px, 440px"
        className="object-cover transition-transform duration-700 ease-out-quart [filter:grayscale(0.15)] group-hover:scale-[1.04] group-hover:[filter:grayscale(0)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-noir via-noir/45 to-transparent transition-opacity duration-300 group-hover:from-noir/90"
      />

      <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
        {item.badges.map((b) => (
          <span
            key={b}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur"
          >
            {b}
          </span>
        ))}
      </div>

      <div className="relative z-10 p-7">
        <h3 className="font-heading text-xl font-extrabold leading-tight text-white">{item.title}</h3>
        <p className="mt-4 font-heading text-5xl font-extrabold text-gold drop-shadow-[0_2px_24px_rgb(225_170_43/0.45)]">{item.keyStat}</p>
        <p className="mt-1 text-[13px] uppercase tracking-wideish text-white/50">{item.statLabel}</p>
        <p className="mt-3 line-clamp-3 text-sm text-white/65">{item.description}</p>
      </div>
    </article>
  )
}
