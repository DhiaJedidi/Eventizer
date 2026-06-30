'use client'

import Image from 'next/image'

import { TEAM } from '@/lib/content'
import type { SectionHeaderView, TeamMemberView } from '@/types'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Container } from '@/components/ui/Container'

// Literal class names so Tailwind/its purge keeps the authored gradients.
const TEAM_GRADS = [
  'team-grad-0',
  'team-grad-1',
  'team-grad-2',
  'team-grad-3',
  'team-grad-4',
  'team-grad-5',
]

export function Team({ data, header }: { data: TeamMemberView[]; header: SectionHeaderView }) {
  const ref = useGsapReveal<HTMLElement>({ childSelector: '.team-reveal', y: 28, stagger: 0.1, start: 'top 82%' })

  return (
    <section id="equipe" ref={ref} className="border-t border-line bg-cream py-28 sm:py-32 lg:py-40">
      <Container>
        <header className="team-reveal mx-auto max-w-2xl text-center">
          {header.eyebrow ? <p className="eyebrow text-cobalt">{header.eyebrow}</p> : null}
          <h2 className="mt-5 font-heading text-display-lg font-bold text-ink">{header.title}</h2>
          {header.subtitle ? <p className="mt-5 text-lg leading-relaxed text-mute">{header.subtitle}</p> : null}
        </header>

        <ul aria-label={TEAM.gridAria} className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((member, i) => (
            <li key={member.name} className="team-reveal group transition-transform duration-500 hover:-translate-y-1.5">
              <Avatar member={member} index={i} />
              <h3 className="mt-5 font-heading text-xl font-semibold text-ink">{member.name}</h3>
              <p className="mt-1.5 text-[12px] uppercase tracking-widest2 text-cobalt">{member.role}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-mute">{member.oneLiner}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function Avatar({ member, index }: { member: TeamMemberView; index: number }) {
  if (member.image) {
    return (
      <div className="spotlight grad-border aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={member.image.url}
          alt={member.image.alt}
          width={400}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover [filter:grayscale(0.2)] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:[filter:grayscale(0)]"
        />
      </div>
    )
  }
  const initials = member.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <div
      aria-hidden="true"
      className={`${TEAM_GRADS[index % 6]} spotlight spotlight-on-dark grad-border flex aspect-[4/5] items-center justify-center rounded-xl font-heading text-4xl font-medium text-white`}
    >
      {initials}
    </div>
  )
}
