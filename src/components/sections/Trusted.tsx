import type { TrustedView } from '@/types'
import { Container } from '@/components/ui/Container'
import { Marquee } from '@/components/ui/Marquee'
import { Sparkles } from '@/components/ui/Sparkles'

export function Trusted({ data }: { data: TrustedView }) {
  // Repeat so one marquee copy fills wide viewports before it loops.
  const items = [...data.references, ...data.references, ...data.references]

  return (
    <section className="relative overflow-hidden border-t border-line bg-paper pt-24 sm:pt-28">
      <Container>
        <p className="eyebrow text-center text-cobalt">{data.eyebrow}</p>
      </Container>

      <div className="relative mt-12">
        <Marquee
          duration={32}
          className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          {items.map((name, i) => (
            <span
              key={i}
              className="mx-10 whitespace-nowrap font-heading text-xl font-bold text-ink/35 transition-colors duration-300 hover:text-ink/70 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Sparkle horizon glow */}
      <div className="relative mt-8 h-80 w-full overflow-hidden [mask-image:radial-gradient(65%_65%_at_50%_100%,black,transparent)] sm:h-96">
        {/* Brand radial glow */}
        <div aria-hidden="true" className="trusted-glow absolute inset-0" />
        {/* Curved horizon */}
        <div
          aria-hidden="true"
          className="absolute -left-1/2 top-[60%] aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-cobalt/40 bg-paper"
        />
        {/* Sparkles */}
        <Sparkles
          count={96}
          className="absolute inset-x-0 bottom-0 z-10 h-full w-full text-cobalt [mask-image:radial-gradient(50%_55%_at_50%_75%,black,transparent_80%)]"
        />
      </div>
    </section>
  )
}
