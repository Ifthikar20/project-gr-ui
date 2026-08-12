import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { APP_STORE_URL } from '@/components/AppStoreButton'
import { Container } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { RunPhoto } from '@/components/RunPhoto'
import { GemPhoto } from '@/components/GemPhoto'
import { CreatureArt } from '@/components/cards/art/CreatureArt'
import { cn } from '@/lib/utils'

interface DeckCard {
  id: string
  node: ReactNode
}

const DECK: DeckCard[] = [
  { id: 'photo-1', node: <RunPhoto n={1} className="object-[28%_center]" /> },
  { id: 'gem', node: <GemPhoto n={1} /> },
  { id: 'photo-2', node: <RunPhoto n={2} /> },
  { id: 'creature', node: <CreatureArt /> },
  { id: 'photo-7', node: <RunPhoto n={7} /> },
]

/* Resting transforms per stack position, top first. */
const STACK = [
  { transform: 'translate(0, 0) rotate(0deg) scale(1)', z: 40 },
  { transform: 'translate(-18px, 16px) rotate(-6deg) scale(0.97)', z: 30 },
  { transform: 'translate(16px, 26px) rotate(5deg) scale(0.94)', z: 20 },
  { transform: 'translate(-2px, 34px) rotate(-2deg) scale(0.92)', z: 10 },
  { transform: 'translate(12px, 40px) rotate(3deg) scale(0.9)', z: 5 },
]

function ShuffleDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3, 4])
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
      className="group relative mx-auto block aspect-[4/5] w-full max-w-[420px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background md:max-w-[440px]"
    >
      {DECK.map((card, i) => {
        const pos = order.indexOf(i)
        const isExiting = exiting === i
        const rest = STACK[Math.min(pos, STACK.length - 1)]
        return (
          <div
            key={card.id}
            aria-hidden={pos !== 0}
            className="absolute inset-0 transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              transform: isExiting ? 'translate(120%, -6%) rotate(18deg)' : rest.transform,
              opacity: isExiting ? 0 : 1,
              zIndex: isExiting ? 50 : rest.z,
            }}
          >
            <div
              className={cn(
                'isolate h-full w-full overflow-hidden rounded-[28px] bg-card shadow-[0_24px_60px_rgba(16,18,22,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(0_round_28px)]',
                pos === 0 && 'group-hover:-translate-y-2 group-hover:rotate-[-1deg]',
                '[&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:transition-transform [&>svg]:duration-700 [&>svg]:ease-[cubic-bezier(0.22,1,0.36,1)]',
                pos === 0 && 'group-hover:[&_img]:scale-[1.05] group-hover:[&>svg]:scale-[1.05]',
              )}
            >
              {card.node}
            </div>
          </div>
        )
      })}
    </button>
  )
}

export function Hero() {
  return (
    <section id="top" className="flex min-h-[100svh] scroll-mt-24 flex-col overflow-hidden pt-24 pb-10 md:pt-28">
      <Container className="flex flex-1 flex-col">
        <div className="grid flex-1 items-start gap-12 md:grid-cols-[1fr_1fr] md:gap-8">
          <Reveal stagger className="text-left md:pt-6">
            <h1 className="font-display text-[clamp(46px,5.2vw,84px)] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase">
              Every run
              <br />
              mints a card.
            </h1>
          </Reveal>

          <Reveal delay={2} className="self-center">
            <ShuffleDeck />
          </Reveal>
        </div>

        <Reveal delay={3} className="mt-12 md:mt-0">
          <p className="max-w-[42ch] text-[15.5px] leading-relaxed text-foreground/60">
            A real fitness tracker with a collection on top — gems, gear, creatures and artifacts, minted only on the
            streets you actually run.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              asChild
              className="h-12 rounded-full bg-volt px-7 text-[15px] font-semibold text-[#101216] hover:bg-volt/90"
            >
              <a href={APP_STORE_URL}>
                Start collecting
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <a
              href="#track"
              className="text-[14.5px] font-semibold text-foreground/55 transition-colors hover:text-foreground"
            >
              See it in action
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
