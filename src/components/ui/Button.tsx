import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'gold' | 'outline' | 'ghost'

// Refined pill CTAs. CSS hover/press only (web-animation skill): transform/opacity
// + color; `group` enables the child arrow slide; active press for tactile feel.
const base =
  'group inline-flex items-center justify-center rounded-full font-body font-semibold ' +
  'px-7 py-3.5 min-h-[48px] text-[14px] tracking-wide transition-all duration-300 ease-out-expo ' +
  'active:scale-[0.98] motion-reduce:transform-none'

const variants: Record<Variant, string> = {
  // Brand cobalt primary
  solid: 'bg-cobalt text-white hover:brightness-110',
  // Gold spotlight (one per view)
  gold: 'bg-gold text-ink hover:brightness-105',
  // Outline on light
  outline: 'border border-ink/20 text-ink hover:border-cobalt hover:text-cobalt',
  // Outline on dark
  ghost: 'border border-white/35 text-white hover:bg-white/10',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

export function ButtonLink({ variant = 'solid', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
