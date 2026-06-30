'use client'

import type { ReactNode } from 'react'

import type { WhyView } from '@/types'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Container } from '@/components/ui/Container'

// Same-font colour emphasis on one word (taste skill: emphasise within the family,
// never inject a second typeface).
function emphasize(text: string, word: string): ReactNode {
  const idx = text.toLowerCase().indexOf(word.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-cobalt">{text.slice(idx, idx + word.length)}</span>
      {text.slice(idx + word.length)}
    </>
  )
}

/**
 * "Un partenaire, pas un prestataire." — refined per the taste skill: no eyebrow
 * (eyebrow restraint), a headline-led editorial layout with oversized index
 * numerals + hairline dividers instead of three equal cards. GSAP reveal, brand
 * cobalt/gold, Montserrat/Poppins.
 */
export function WhyEventizer({ data }: { data: WhyView }) {
  const ref = useGsapReveal<HTMLElement>({ childSelector: '.why-item', y: 30, stagger: 0.14, start: 'top 80%' })

  return (
    <section id="pourquoi" ref={ref} className="relative overflow-hidden bg-paper py-28 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />
      <Container className="relative z-10">
        <header className="why-item mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-display-lg font-bold text-ink">
            {emphasize(data.h2, 'partenaire')}
          </h2>
        </header>

        <div className="mt-16 sm:mt-24">
          {data.differentiators.map((diff, i) => (
            <div
              key={diff.title}
              className="why-item group grid grid-cols-1 gap-x-12 gap-y-4 border-t border-line py-10 sm:grid-cols-[7rem_1fr] sm:py-14"
            >
              <div
                aria-hidden="true"
                className="font-heading text-6xl font-bold leading-none text-cobalt/15 transition-colors duration-500 group-hover:text-gold sm:text-7xl"
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="max-w-2xl">
                <h3 className="font-heading text-2xl font-semibold text-ink">{diff.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-body">{diff.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
