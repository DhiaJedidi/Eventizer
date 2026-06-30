/**
 * Lightweight CSS sparkle field — a twinkling dot field, no particle engine.
 * Color comes from the parent's text color (`currentColor`), so set `text-cobalt`
 * etc. on the wrapper. Decorative; positions are deterministic (SSR-safe).
 * Disabled under prefers-reduced-motion via the global reduced-motion rule.
 */
const frac = (n: number) => n - Math.floor(n)

export function Sparkles({ count = 64, className = '' }: { count?: number; className?: string }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const a = frac(Math.sin(i * 12.9898) * 43758.5453)
    const b = frac(Math.sin(i * 78.233) * 12543.4519)
    const c = frac(Math.sin(i * 39.425) * 9123.17)
    return {
      left: a * 100,
      top: b * 100,
      size: 1 + c * 2.2,
      delay: a * 5,
      dur: 3 + b * 5,
    }
  })

  return (
    <div aria-hidden="true" className={className}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-current"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  )
}
