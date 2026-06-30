'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { FOOTER, NAV } from '@/lib/content'
import { gsap } from '@/lib/gsap'
import { track } from '@/lib/analytics'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/ui/Magnetic'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [curtain, setCurtain] = useState(false)
  const isHome = usePathname() === '/'
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`)

  // Curtain reveal only on capable desktops; static cinematic footer otherwise.
  useIso(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 1023px)').matches
    setCurtain(!reduce && !small)
  }, [])

  // Giant wordmark parallax + staggered content reveal.
  useIso(() => {
    const wrap = wrapperRef.current
    if (!wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantRef.current,
        { yPercent: 24, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: 'power1.out', scrollTrigger: { trigger: wrap, start: 'top 85%', end: 'bottom bottom', scrub: 1 } },
      )
      const blocks = contentRef.current?.children
      if (blocks) {
        gsap.fromTo(
          blocks,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: wrap, start: 'top 55%', end: 'bottom bottom', scrub: 1 } },
        )
      }
    }, wrap)
    return () => ctx.revert()
  }, [curtain])

  const footerInner = (
    <footer
      className={`flex w-full flex-col justify-between overflow-hidden bg-noir text-white ${
        curtain ? 'fixed bottom-0 left-0 h-screen' : 'relative min-h-[78vh]'
      }`}
    >
      {/* Ambient aurora + grid */}
      <div aria-hidden="true" className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-full blur-[80px]" />
      <div aria-hidden="true" className="footer-grid pointer-events-none absolute inset-0 z-0" />
      <div aria-hidden="true" className="grain-overlay z-0 opacity-25" />

      {/* Giant brand wordmark */}
      <div
        ref={giantRef}
        aria-hidden="true"
        className="footer-giant pointer-events-none absolute -bottom-[2vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap text-[19vw] leading-none"
      >
        EVENTIZER
      </div>

      {/* Center content */}
      <div ref={contentRef} className="relative z-10 flex flex-1 flex-col justify-center">
        <Container className="flex flex-col items-center gap-8 py-20 text-center">
          <a href={hrefFor('#hero')} aria-label={FOOTER.logoAria} className="inline-flex">
            <Image src="/logo.png" alt="" width={141} height={40} sizes="180px" className="h-11 w-auto" />
          </a>

          <Magnetic>
            <a
              href={hrefFor('#contact')}
              onClick={() => track('cta_click', { location: 'footer' })}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-ink transition-[filter] duration-300 hover:brightness-105"
            >
              {NAV.cta}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>

          <nav aria-label="Navigation du pied de page" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {FOOTER.links.map((l) => (
              <a key={l.href} href={hrefFor(l.href)} className="link-underline text-sm text-white/65 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <ul className="flex gap-3">
            {FOOTER.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-gold"
                >
                  <SocialIcon name={s.name} />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10">
        <Container className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-6 sm:flex-row">
          <p className="text-[11px] uppercase tracking-widest2 text-white/40">{FOOTER.copyright}</p>
          <a href="/mentions-legales" className="link-underline text-[11px] uppercase tracking-widest2 text-white/40 transition-colors hover:text-white/70">
            {FOOTER.legalLink}
          </a>
          <Magnetic>
            <button
              type="button"
              aria-label="Retour en haut"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetic>
        </Container>
      </div>
    </footer>
  )

  return curtain ? (
    <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: 'inset(0)' }}>
      {footerInner}
    </div>
  ) : (
    <div ref={wrapperRef}>{footerInner}</div>
  )
}

function SocialIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const
  if (name === 'LinkedIn') {
    return (
      <svg {...common}>
        <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.95-2.8s-2.25 1.3-2.25 2.7V21h-4z" />
      </svg>
    )
  }
  if (name === 'Instagram') {
    return (
      <svg {...common}>
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.06A4.94 4.94 0 1 0 12 16.94 4.94 4.94 0 0 0 12 7.06zm0 8.15A3.21 3.21 0 1 1 12 8.8a3.21 3.21 0 0 1 0 6.4zm6.3-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}
