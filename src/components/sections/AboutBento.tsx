import { Button } from '@/components/ui/button'
import { Container } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { GemArt } from '@/components/cards/art/GemArt'
import { CreatureArt } from '@/components/cards/art/CreatureArt'
import { ZoneMapArt } from '@/components/cards/art/ZoneMapArt'

/* The about story as a bento block set: a soft-volt statement panel with
   two art tiles, a dark mission panel with floating chips over the zone
   map, and a join panel with the beta crowd. */

const artTile =
  'relative min-h-[240px] overflow-hidden rounded-[24px] [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full'

const mapChip =
  'rounded-full border border-white/10 bg-[#0b0c0f]/85 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur-sm'

const crowd = ['SM', 'DP', 'JR', 'PK', 'MT']

export function AboutBento() {
  return (
    <section id="what" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="flex flex-col gap-4">
          {/* statement panel + art tiles */}
          <Reveal>
            <div className="grid gap-4 md:grid-cols-[1.45fr_1fr]">
              <div className="flex flex-col items-start rounded-[28px] bg-[#e9fbdb] p-8 md:rounded-[36px] md:p-12">
                <span className="rounded-full bg-white/75 px-4 py-1.5 text-[13px] font-semibold text-foreground/70">
                  What is FindRun
                </span>
                <h2 className="mt-7 max-w-[20ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.12] font-bold tracking-[-0.025em]">
                  A collection you can only build by moving.
                </h2>
                <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-foreground/60">
                  You don't buy packs — you earn cards by running to where they surface. Every card you own is proof
                  you were there.
                </p>
                <Button asChild size="lg" className="mt-8 h-12 rounded-full px-7 text-[15px]">
                  <a href="#how">How it works</a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={artTile}>
                  <GemArt />
                </div>
                <div className={artTile}>
                  <CreatureArt />
                </div>
              </div>
            </div>
          </Reveal>

          {/* mission panel + join panel */}
          <Reveal delay={1}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-7 rounded-[28px] bg-[#101216] p-8 md:rounded-[36px] md:p-10">
                <p className="max-w-[34ch] text-[clamp(19px,2vw,24px)] leading-snug font-semibold text-white">
                  Our mission is to bring the game back to running — real streets, real miles, and rewards you can
                  actually hold.
                </p>
                <div className="relative flex-1 overflow-hidden rounded-[20px] [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:min-h-[240px]">
                  <ZoneMapArt />
                  <span className={`${mapChip} absolute top-5 left-5`}>Run</span>
                  <span className={`${mapChip} absolute top-1/2 right-5 -translate-y-1/2`}>Find</span>
                  <span className={`${mapChip} absolute bottom-5 left-8`}>Keep</span>
                </div>
              </div>
              <div className="flex flex-col rounded-[28px] bg-[#e9fbdb] p-8 md:rounded-[36px] md:p-10">
                <h3 className="max-w-[16ch] font-display text-[clamp(26px,3.2vw,40px)] leading-[1.1] font-bold tracking-[-0.02em]">
                  Join the hunt — get your invite.
                </h3>
                <p className="mt-4 max-w-[40ch] text-[15.5px] leading-relaxed text-foreground/60">
                  FindRun is rolling out city by city on TestFlight. Grab a spot and start collecting the ground you
                  cover.
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-9">
                  <Button asChild size="lg" className="h-12 rounded-full px-7 text-[15px]">
                    <a href="#join">Get my invite</a>
                  </Button>
                  <div className="flex items-center">
                    {crowd.map((initials, i) => (
                      <span
                        key={initials}
                        className={`grid size-10 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background ring-2 ring-[#e9fbdb] ${i > 0 ? '-ml-1.5' : ''}`}
                      >
                        {initials}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
