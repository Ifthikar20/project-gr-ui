import { Badge } from '@/components/ui/badge'
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

const trust = ['Free to play', 'iPhone · iOS 17+', 'Runs on your real routes']

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#eef3fa] to-background pt-16 pb-16 text-center md:pt-24 md:pb-28"
    >
      {/* pastel horizon, ported from the legacy .hero::before */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[22%] -left-[10%] -right-[10%] h-[70%] opacity-75 blur-[46px]"
        style={horizonGlow}
      />
      <Container className="relative z-10">
        <Reveal className="flex flex-col items-center">
          <Badge
            variant="outline"
            className="rounded-full border-border bg-card px-4 py-1.5 text-[11.5px] font-extrabold tracking-[0.14em] uppercase text-muted-foreground shadow-sm"
          >
            A running game you can hold
          </Badge>
          <h1 className="mt-5 max-w-[15ch] font-display text-[clamp(40px,6.2vw,72px)] leading-[1.02] font-bold tracking-[-0.032em]">
            Run to find.
            <br />
            Collect what no one else has.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-foreground/70">
            Collectible cards surface in real-world <strong className="font-semibold text-foreground">zones</strong> —
            patches of the map where runners have already been. Lace up, reach one on foot, and the card is{' '}
            <strong className="font-semibold text-foreground">yours to keep</strong>. Gems, golden shoes, wild
            creatures, artifacts, facts — all found on the move.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="h-12 rounded-full px-7 text-[15px]">
              <a href="#join">Join the beta</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 rounded-full bg-card px-7 text-[15px]">
              <a href="#how">See how it works</a>
            </Button>
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13.5px] font-semibold text-muted-foreground">
                <span aria-hidden="true" className="inline-block size-[6px] rounded-full bg-foreground/25" />
                {item}
              </li>
            ))}
          </ul>
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
