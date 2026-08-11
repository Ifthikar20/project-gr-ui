import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Bits'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { Reveal } from '@/components/Reveal'
import { GemArt } from '@/components/cards/art/GemArt'
import { CreatureArt } from '@/components/cards/art/CreatureArt'
import { cn } from '@/lib/utils'

const betaRunners = ['SM', 'DP', 'PK']

/* The photo card: renders assets/running-sf.jpg and falls back to the
   placeholder until that file exists in public/assets/. */
function RunPhoto({ mono = false }: { mono?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <PhotoPlaceholder label="Add running-sf.jpg" />
  return (
    <img
      src="assets/running-sf.jpg"
      alt="Runners out on the streets"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', mono && 'object-[70%_30%] grayscale')}
    />
  )
}

interface DeckCard {
  id: string
  node: ReactNode
}

const DECK: DeckCard[] = [
  { id: 'photo', node: <RunPhoto /> },
  { id: 'gem', node: <GemArt /> },
  { id: 'photo-mono', node: <RunPhoto mono /> },
  { id: 'creature', node: <CreatureArt /> },
]

/* Resting transforms per stack position, top first. */
const STACK = [
  { transform: 'translate(0, 0) rotate(0deg) scale(1)', z: 40 },
  { transform: 'translate(-18px, 16px) rotate(-6deg) scale(0.97)', z: 30 },
  { transform: 'translate(16px, 26px) rotate(5deg) scale(0.94)', z: 20 },
  { transform: 'translate(-2px, 34px) rotate(-2deg) scale(0.92)', z: 10 },
]

function ShuffleDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3])
  const [exiting, setExiting] = useState<number | null>(null)
  const orderRef = useRef(order)
  const busyRef = useRef(false)
  const bucketRef = useRef(0)
  orderRef.current = order

  const shuffle = () => {
    if (busyRef.current) return
    busyRef.current = true
    setExiting(orderRef.current[0])
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]])
      setExiting(null)
      window.setTimeout(() => {
        busyRef.current = false
      }, 120)
    }, 460)
  }

  // scroll shuffles to the next card
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    bucketRef.current = Math.floor(window.scrollY / 180)
    const onScroll = () => {
      const bucket = Math.floor(window.scrollY / 180)
      if (bucket !== bucketRef.current) {
        bucketRef.current = bucket
        shuffle()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={shuffle}
      aria-label="Photo and card deck — scroll or tap to shuffle to the next one"
      className="relative mx-auto block aspect-[4/5] w-full max-w-[420px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background md:max-w-[440px]"
    >
      {DECK.map((card, i) => {
        const pos = order.indexOf(i)
        const isExiting = exiting === i
        const rest = STACK[Math.min(pos, STACK.length - 1)]
        return (
          <div
            key={card.id}
            aria-hidden={pos !== 0}
            className="absolute inset-0 overflow-hidden rounded-[28px] bg-card shadow-[0_24px_60px_rgba(16,18,22,0.18)] transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full"
            style={{
              transform: isExiting ? 'translate(120%, -6%) rotate(18deg)' : rest.transform,
              opacity: isExiting ? 0 : 1,
              zIndex: isExiting ? 50 : rest.z,
            }}
          >
            {card.node}
          </div>
        )
      })}
    </button>
  )
}

export function Hero() {
  return (
    <section id="top" className="scroll-mt-24 overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <Reveal stagger className="text-left">
            {/* proof strip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex items-center">
                {betaRunners.map((initials, i) => (
                  <span
                    key={initials}
                    className={`grid size-7 place-items-center rounded-full bg-foreground text-[9px] font-bold text-background ring-2 ring-background ${i > 0 ? '-ml-1.5' : ''}`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-0.5 text-rarity-legendary" aria-label="5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3 fill-current" strokeWidth={0} />
                ))}
              </span>
              <span className="text-[12.5px] font-semibold text-muted-foreground">Loved by beta runners</span>
            </div>

            <h1 className="mt-7 font-display text-[clamp(46px,6vw,88px)] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase">
              Every run
              <br />
              mints a card.
            </h1>
            <p className="mt-8 max-w-[40ch] text-[15.5px] leading-relaxed text-foreground/60">
              A real fitness tracker with a collection on top — gems, gear and creatures, minted only on the streets
              you actually run.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild className="h-13 rounded-full px-8 text-[15.5px]">
                <a href="#join">
                  Start collecting
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <a
                href="#how"
                className="text-[14.5px] font-semibold text-foreground/55 transition-colors hover:text-foreground"
              >
                How it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <ShuffleDeck />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
