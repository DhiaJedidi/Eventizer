import type { ReactNode } from 'react'

/**
 * CSS infinite marquee — renders children twice and translates -50% for a
 * seamless loop (no framer-motion / react-use-measure). Pauses on hover; the
 * global reduced-motion rule effectively freezes it for those users.
 */
export function Marquee({
  children,
  className = '',
  duration = 30,
}: {
  children: ReactNode
  className?: string
  duration?: number
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee [animation-play-state:running] hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
