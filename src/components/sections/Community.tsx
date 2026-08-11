import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Container, Kicker, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { RunPhoto } from '@/components/RunPhoto'
import { GemArt } from '@/components/cards/art/GemArt'
import { GearArt } from '@/components/cards/art/GearArt'
import { CreatureArt } from '@/components/cards/art/CreatureArt'
import { ArtifactArt } from '@/components/cards/art/ArtifactArt'
import { EmberArt } from '@/components/cards/art/EmberArt'
import { cn } from '@/lib/utils'

/* The community arc: an arc of photo and card tiles — the active one in
   full color with prev/next controls, the rest tilted, faded and mono
   toward the bleeding edges. */

const ITEMS: { id: string; node: ReactNode }[] = [
  { id: 'photo', node: <RunPhoto /> },
  { id: 'gem', node: <GemArt /> },
  { id: 'gear', node: <GearArt /> },
  { id: 'photo-mono', node: <RunPhoto mono /> },
  { id: 'creature', node: <CreatureArt /> },
  { id: 'ember', node: <EmberArt /> },
  { id: 'artifact', node: <ArtifactArt /> },
]

/* Horizontal strip placement by offset from the active card (0 = center). */
const ARC: Record<number, { x: number; y: number; r: number; s: number; o: number; z: number }> = {
  0: { x: 0, y: 0, r: 0, s: 1, o: 1, z: 40 },
  1: { x: 290, y: 14, r: 4, s: 0.93, o: 0.8, z: 30 },
  2: { x: 555, y: 44, r: 8, s: 0.87, o: 0.55, z: 20 },
  3: { x: 800, y: 88, r: 12, s: 0.82, o: 0.3, z: 10 },
}

export function Community() {
  const [active, setActive] = useState(0)
  const count = ITEMS.length
  const step = (dir: number) => setActive((a) => (a + dir + count) % count)

  return (
    <section id="community" className="scroll-mt-24 overflow-hidden py-14 md:py-20">
      <Container>
        <Reveal className="text-center">
          <Kicker center>Social media</Kicker>
          <SectionTitle className="mx-auto max-w-[26ch]">
            Follow the run, follow the community <span className="text-foreground/35">@findrunapp</span>
          </SectionTitle>
        </Reveal>
      </Container>
      <Reveal delay={1}>
        <div className="relative mt-12 h-[280px] w-full [--fs:0.55] sm:h-[350px] sm:[--fs:0.8] md:h-[430px] md:[--fs:1]">
          {ITEMS.map((item, i) => {
            const raw = (((i - active) % count) + count) % count
            const offset = raw <= count / 2 ? raw : raw - count
            const arc = ARC[Math.min(Math.abs(offset), 3)]
            const sign = offset < 0 ? -1 : 1
            return (
              <div
                key={item.id}
                aria-hidden={offset !== 0}
                className="absolute top-0 left-1/2 aspect-[3/4] w-[300px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  transform: `translateX(calc(-50% + ${sign * arc.x}px * var(--fs))) translateY(calc(${arc.y}px * var(--fs))) rotate(${sign * arc.r}deg) scale(calc(${arc.s} * var(--fs)))`,
                  opacity: arc.o,
                  zIndex: arc.z,
                  filter: offset === 0 ? 'none' : 'grayscale(1)',
                }}
              >
                <div
                  className={cn(
                    'h-full w-full overflow-hidden rounded-[24px] bg-card shadow-[0_20px_50px_rgba(16,18,22,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    offset === 0 && 'hover:scale-[1.025]',
                    '[&_img]:transition-transform [&_img]:duration-700 [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:transition-transform [&>svg]:duration-700',
                    offset === 0 && 'hover:[&_img]:scale-[1.06] hover:[&>svg]:scale-[1.06]',
                  )}
                >
                  {item.node}
                </div>
              </div>
            )
          })}

          {/* prev / next on the active card's bottom edge */}
          <div
            className="absolute left-1/2 z-50 flex -translate-x-1/2 gap-2.5"
            style={{ top: 'calc(400px * (1 + var(--fs)) / 2 - 48px)' }}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="grid size-11 place-items-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="size-5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="grid size-11 place-items-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronRight className="size-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
