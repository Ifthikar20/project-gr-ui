import { Button } from '@/components/ui/button'
import { Container } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { AppStoreButton } from '@/components/AppStoreButton'
import { RunPhoto } from '@/components/RunPhoto'
import { GemArt } from '@/components/cards/art/GemArt'
import { ZoneMapArt } from '@/components/cards/art/ZoneMapArt'

/* The about story as a bento block set: the dark mission statement over
   the zone map leads, with two art tiles beside it, then a full-bleed
   run photo next to the download panel. */

const artTile =
  'group relative min-h-[240px] overflow-hidden rounded-[24px] [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:transition-transform [&>svg]:duration-700 [&>svg]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>svg]:scale-[1.06] [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&_img]:scale-[1.06]'

const panel =
  'transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(16,18,22,0.1)]'

const mapChip =
  'rounded-full border border-white/10 bg-[#0b0c0f]/85 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur-sm'

const crowd = ['SM', 'DP', 'JR', 'PK', 'MT']

export function AboutBento() {
  return (
    <section id="what" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="flex flex-col gap-4">
          {/* mission panel + art tiles */}
          <Reveal stagger className="grid gap-4 md:grid-cols-[1.45fr_1fr]">
            <div className={`flex flex-col gap-7 rounded-[28px] bg-[#101216] p-8 md:rounded-[36px] md:p-10 ${panel}`}>
              <div>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white/75">
                  What is RunnerCard
                </span>
                <h2 className="mt-6 max-w-[26ch] font-display text-[clamp(23px,2.7vw,33px)] leading-[1.16] font-bold tracking-[-0.022em] text-white">
                  Our mission is to bring the game back to running — real streets, real miles, and rewards you can
                  actually hold.
                </h2>
                <Button
                  asChild
                  size="lg"
                  className="mt-7 h-12 rounded-full bg-white px-7 text-[15px] text-[#101216] hover:bg-white/90"
                >
                  <a href="#track">Watch a run</a>
                </Button>
              </div>
              <div className="relative mx-auto h-[200px] w-full max-w-[460px] overflow-hidden rounded-[20px] md:h-[230px] [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:transition-transform [&>svg]:duration-700 [&>svg]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>svg]:scale-[1.05]">
                <ZoneMapArt />
                <span className={`${mapChip} absolute top-5 left-5`}>Run</span>
                <span className={`${mapChip} absolute top-1/2 right-5 -translate-y-1/2`}>Find</span>
                <span className={`${mapChip} absolute bottom-5 left-8`}>Keep</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <div className={artTile}>
                {/* pinned so the photo's own aspect never drives the row height */}
                <div className="absolute inset-0">
                  <RunPhoto n={2} />
                </div>
              </div>
              <div className={artTile}>
                <GemArt />
              </div>
            </div>
          </Reveal>

          {/* run photo + download panel */}
          <Reveal stagger delay={1} className="grid gap-4 md:grid-cols-2">
            <div
              className={`group relative min-h-[300px] overflow-hidden rounded-[28px] md:rounded-[36px] ${panel}`}
            >
              <div className="absolute inset-0 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[&_img]:scale-[1.06]">
                <RunPhoto n={5} />
              </div>
            </div>
            <div className={`flex flex-col rounded-[28px] bg-[#e9fbdb] p-8 md:rounded-[36px] md:p-10 ${panel}`}>
              <h3 className="max-w-[16ch] font-display text-[clamp(26px,3.2vw,40px)] leading-[1.1] font-bold tracking-[-0.02em]">
                Join the hunt — get the app.
              </h3>
              <p className="mt-4 max-w-[40ch] text-[15.5px] leading-relaxed text-foreground/60">
                RunnerCard is free on the App Store. Download it, start a run, and the ground you cover starts paying
                out in cards.
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-9">
                <AppStoreButton />
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
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
