import { ArrowUpRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { CollectibleCard } from '@/components/cards/CollectibleCard'
import { gemCard, heroCardAriaLabel } from '@/components/cards/data'

const horizonGlow = {
  background: [
    'radial-gradient(34% 42% at 18% 78%, rgba(122, 180, 255, 0.50), transparent 70%)',
    'radial-gradient(30% 40% at 42% 88%, rgba(255, 168, 212, 0.42), transparent 70%)',
    'radial-gradient(32% 42% at 64% 80%, rgba(151, 235, 178, 0.48), transparent 70%)',
    'radial-gradient(30% 40% at 86% 86%, rgba(255, 224, 150, 0.42), transparent 70%)',
  ].join(', '),
}

const betaRunners = ['SM', 'DP', 'PK']

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#eef3fa] to-background pt-14 pb-16 text-center md:pt-20 md:pb-28"
    >
      {/* pastel horizon, ported from the legacy .hero::before */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[22%] -left-[10%] -right-[10%] h-[70%] opacity-75 blur-[46px]"
        style={horizonGlow}
      />
      <Container className="relative z-10">
        <Reveal className="flex flex-col items-center">
          {/* proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <div className="flex items-center">
              {betaRunners.map((initials, i) => (
                <span
                  key={initials}
                  className={`grid size-8 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-[#eef3fa] ${i > 0 ? '-ml-2' : ''}`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-0.5 text-rarity-legendary" aria-label="5 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
              ))}
            </span>
            <span className="text-[13px] font-semibold text-muted-foreground">Loved by TestFlight beta runners</span>
          </div>

          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(44px,7vw,84px)] leading-[1.0] font-bold tracking-[-0.035em]">
            Every run
            <br />
            mints a card.
          </h1>
          <p className="mt-6 max-w-[54ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-foreground/70">
            A real fitness tracker with a collection on top: miles in, cards out. Gems, gear and creatures — minted
            only on the streets you actually run.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="h-13 rounded-full px-8 text-[15.5px]">
              <a href="#join">
                Start collecting
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={2} className="relative mt-12 grid place-items-center [perspective:1400px] md:mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute size-[480px] max-w-[90vw] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.9),transparent_70%)]"
          />
          <CollectibleCard data={gemCard} float heroHeading ariaLabel={heroCardAriaLabel} />
        </Reveal>
      </Container>
    </section>
  )
}
