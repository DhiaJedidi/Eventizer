import type { ReactNode } from 'react'

/** Centered content column — max-width 1200px (design.md), responsive gutters. */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
