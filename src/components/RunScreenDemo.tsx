import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { BatteryMedium, RotateCcw, Signal, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * The FindRun run screen, live. The app chrome is static — what animates is
 * the rewards system: the runner moves along a real route, and reaching a
 * zone claims its card (toast, stash slot, XP). Auto-plays while in view,
 * loops after a run-complete summary, and settles into the finished state
 * under prefers-reduced-motion. Click the phone (or Replay) to restart.
 */

interface ZoneDef {
  x: number
  y: number
  r: number
  glow: number
  name: string
  tier: string
  xp: number
  color: string
}

const ZONES: ZoneDef[] = [
  { x: 80, y: 470, r: 20, glow: 34, name: 'Rose Quartz', tier: 'Uncommon Gem', xp: 40, color: '#57b878' },
  { x: 210, y: 300, r: 18, glow: 30, name: 'Harbor Fox', tier: 'Rare Creature', xp: 90, color: '#4f8fe0' },
  { x: 150, y: 130, r: 22, glow: 36, name: 'Harbor Sapphire', tier: 'Legendary Gem', xp: 240, color: '#e0a63a' },
]

const ROUTE =
  'M40 590 Q70 520 80 470 Q95 405 150 380 Q205 355 210 300 Q214 240 170 205 Q140 180 150 130'

const RUN_MS = 11000
const SUMMARY_MS = 2600
const TOTAL_KM = 5.0
const TOTAL_RUN_SECONDS = 27 * 60 // 5.0 km at 5:24 /km

function fmtTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function RunScreenDemo() {
  const glowId = useId()
  const frameRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const runnerRef = useRef<SVGGElement>(null)
  const distRef = useRef<HTMLSpanElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const paceRef = useRef<HTMLSpanElement>(null)

  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [visible, setVisible] = useState(false)
  const [claimed, setClaimed] = useState([false, false, false])
  const [toast, setToast] = useState<ZoneDef | null>(null)
  const [summary, setSummary] = useState(false)

  const lengthRef = useRef(0)
  const elapsedRef = useRef(0)
  const claimedRef = useRef([false, false, false])
  const summaryRef = useRef(false)
  const toastTimer = useRef<number | undefined>(undefined)

  const claim = (i: number) => {
    claimedRef.current = claimedRef.current.map((c, j) => (j === i ? true : c))
    setClaimed([...claimedRef.current])
    setToast(ZONES[i])
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1700)
  }

  const applyFrame = (progress: number) => {
    const route = routeRef.current
    const trail = trailRef.current
    const runner = runnerRef.current
    if (!route || !trail || !runner || !lengthRef.current) return
    const length = lengthRef.current
    const at = length * progress
    const p = route.getPointAtLength(at)
    runner.setAttribute('transform', `translate(${p.x} ${p.y})`)
    trail.style.strokeDasharray = `${length}`
    trail.style.strokeDashoffset = `${length - at}`
    if (distRef.current) distRef.current.textContent = (TOTAL_KM * progress).toFixed(1)
    if (timeRef.current) timeRef.current.textContent = fmtTime(TOTAL_RUN_SECONDS * progress)
    if (paceRef.current) paceRef.current.textContent = progress < 0.04 ? '–:––' : '5:24'
    ZONES.forEach((z, i) => {
      if (!claimedRef.current[i] && Math.hypot(p.x - z.x, p.y - z.y) < z.r * 0.8) claim(i)
    })
  }

  const reset = () => {
    elapsedRef.current = 0
    claimedRef.current = [false, false, false]
    summaryRef.current = false
    setClaimed([false, false, false])
    setToast(null)
    setSummary(false)
  }

  const replay = () => {
    if (reduced) return
    reset()
    applyFrame(0)
  }

  // Measure the route once, paint the first (or final) frame.
  useLayoutEffect(() => {
    if (routeRef.current) lengthRef.current = routeRef.current.getTotalLength()
    if (reduced) {
      claimedRef.current = [true, true, true]
      setClaimed([true, true, true])
      applyFrame(1)
    } else {
      applyFrame(0)
    }
  }, [reduced])

  // Play only while on screen.
  useEffect(() => {
    const el = frameRef.current
    if (!el || reduced) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  // The loop: run → summary → restart.
  useEffect(() => {
    if (reduced || !visible) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) // ignore background-tab gaps
      last = now
      elapsedRef.current += dt
      const elapsed = elapsedRef.current
      if (elapsed <= RUN_MS) {
        if (summaryRef.current) {
          summaryRef.current = false
          setSummary(false)
        }
        applyFrame(elapsed / RUN_MS)
      } else if (elapsed <= RUN_MS + SUMMARY_MS) {
        applyFrame(1)
        if (!summaryRef.current) {
          summaryRef.current = true
          setSummary(true)
        }
      } else {
        reset()
        applyFrame(0)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, reduced])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const runXp = ZONES.reduce((sum, z, i) => sum + (claimed[i] ? z.xp : 0), 0)

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={frameRef}
        role="img"
        aria-label="FindRun run screen demo: a tracked 5 kilometre run passes through three zones and claims Rose Quartz, Harbor Fox and Harbor Sapphire for 370 XP"
        onClick={replay}
        className={cn(
          'relative w-[290px] max-w-[80vw] rounded-[46px] bg-[#0b0c0f] p-[10px] select-none',
          'shadow-[0_34px_90px_rgba(16,18,22,0.38),inset_0_0_0_1.5px_rgba(255,255,255,0.06)]',
          !reduced && 'cursor-pointer',
        )}
      >
        <div className="relative aspect-[300/650] overflow-hidden rounded-[37px] bg-[#12141b]" aria-hidden="true">
          {/* ------------------------------------------------ the map */}
          <svg viewBox="0 0 300 650" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#61ff00" stopOpacity="0.5" />
                <stop offset="1" stopColor="#61ff00" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g stroke="#1f2430" strokeWidth="2">
              <path d="M0 80 H300 M0 160 H300 M0 240 H300 M0 320 H300 M0 400 H300 M0 480 H300 M0 560 H300" />
              <path d="M60 0 V650 M140 0 V650 M220 0 V650" />
            </g>
            <rect x="170" y="420" width="90" height="70" rx="8" fill="#161b16" stroke="#243024" strokeWidth="2" />
            <rect x="28" y="184" width="72" height="88" rx="8" fill="#16181f" stroke="#242a36" strokeWidth="2" />
            <rect x="236" y="86" width="52" height="58" rx="8" fill="#16181f" stroke="#242a36" strokeWidth="2" />

            {/* planned route + traveled trail */}
            <path
              ref={routeRef}
              d={ROUTE}
              fill="none"
              stroke="#4f8fe0"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="1 10"
              opacity="0.85"
            />
            <path
              ref={trailRef}
              d={ROUTE}
              fill="none"
              stroke="#61ff00"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* zones + card markers */}
            {ZONES.map((z, i) => (
              <g key={z.name}>
                <circle
                  cx={z.x}
                  cy={z.y}
                  r={z.glow}
                  fill={`url(#${glowId})`}
                  className={cn('transition-opacity duration-700', claimed[i] && 'opacity-30')}
                />
                <circle
                  cx={z.x}
                  cy={z.y}
                  r={z.r}
                  fill="none"
                  stroke="#61ff00"
                  strokeWidth="2.5"
                  className={cn('transition-opacity duration-700', claimed[i] && 'opacity-25')}
                />
                <g transform={`translate(${z.x} ${z.y})`}>
                  <path
                    d="M0 -9 L8 0 L0 9 L-8 0 Z"
                    fill={z.color}
                    className={cn(
                      'origin-center [transform-box:fill-box] transition-all duration-500',
                      claimed[i] && 'scale-[2] opacity-0',
                    )}
                  />
                </g>
              </g>
            ))}

            {/* runner */}
            <g ref={runnerRef}>
              {!reduced && (
                <circle r="13" fill="#61ff00" opacity="0.25" className="origin-center animate-ping [transform-box:fill-box]" />
              )}
              <circle r="8" fill="#61ff00" stroke="#0b0c0f" strokeWidth="2.5" />
            </g>
          </svg>

          {/* ------------------------------------------- phone chrome */}
          <div className="absolute top-[10px] left-1/2 z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-[13px] text-[11px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <Signal className="size-3" strokeWidth={2.6} />
              <Wifi className="size-3" strokeWidth={2.6} />
              <BatteryMedium className="size-3.5" strokeWidth={2.4} />
            </span>
          </div>

          {/* live run stats */}
          <div className="absolute inset-x-3 top-[46px] z-20 rounded-2xl border border-white/50 bg-white/92 px-4 py-2.5 shadow-lg backdrop-blur-md">
            <div className="grid grid-cols-3 divide-x divide-[#101216]/8 text-center">
              <div>
                <div className="font-display text-[17px] leading-tight font-bold text-[#101216] tabular-nums">
                  <span ref={distRef}>0.0</span>
                  <span className="ml-0.5 text-[10px] font-extrabold text-[#101216]/50">km</span>
                </div>
                <div className="text-[8.5px] font-extrabold tracking-[0.08em] uppercase text-[#101216]/55">Distance</div>
              </div>
              <div>
                <div className="font-display text-[17px] leading-tight font-bold text-[#101216] tabular-nums">
                  <span ref={timeRef}>0:00</span>
                </div>
                <div className="text-[8.5px] font-extrabold tracking-[0.08em] uppercase text-[#101216]/55">Time</div>
              </div>
              <div>
                <div className="font-display text-[17px] leading-tight font-bold text-[#101216] tabular-nums">
                  <span ref={paceRef}>–:––</span>
                  <span className="ml-0.5 text-[10px] font-extrabold text-[#101216]/50">/km</span>
                </div>
                <div className="text-[8.5px] font-extrabold tracking-[0.08em] uppercase text-[#101216]/55">Pace</div>
              </div>
            </div>
          </div>

          {/* claim toast */}
          <div
            className={cn(
              'absolute inset-x-5 bottom-[96px] z-30 transition-all duration-300 ease-out',
              toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
            )}
          >
            {toast && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/50 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: toast.color }} />
                <span className="min-w-0">
                  <span className="block truncate text-[12.5px] leading-tight font-bold text-[#101216]">
                    {toast.name} claimed
                  </span>
                  <span className="block text-[9.5px] leading-tight font-semibold text-[#101216]/55">{toast.tier}</span>
                </span>
                <span className="ml-auto font-display text-[14px] font-bold text-[#101216]">+{toast.xp} XP</span>
              </div>
            )}
          </div>

          {/* stash tray */}
          <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-white/50 bg-white/92 px-3 py-2.5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2">
              {ZONES.map((z, i) => (
                <div
                  key={z.name}
                  className={cn(
                    'grid size-10 place-items-center rounded-xl transition-all duration-500',
                    claimed[i]
                      ? 'scale-100'
                      : 'border border-dashed border-[#101216]/20 bg-[#101216]/[0.03]',
                  )}
                  style={
                    claimed[i]
                      ? { background: `${z.color}1f`, boxShadow: `inset 0 0 0 1.5px ${z.color}80` }
                      : undefined
                  }
                >
                  {claimed[i] ? (
                    <svg viewBox="0 0 24 24" className="size-5">
                      <path d="M12 3 L20 12 L12 21 L4 12 Z" fill={z.color} />
                    </svg>
                  ) : (
                    <span className="text-[11px] font-bold text-[#101216]/25">?</span>
                  )}
                </div>
              ))}
              <div className="ml-auto pr-1 text-right">
                <div className="text-[8.5px] font-extrabold tracking-[0.08em] uppercase text-[#101216]/55">Run XP</div>
                <div className="font-display text-[17px] leading-tight font-bold text-[#101216] tabular-nums">{runXp}</div>
              </div>
            </div>
          </div>

          {/* run-complete summary */}
          <div
            className={cn(
              'absolute inset-0 z-40 grid place-items-center bg-[#0b0c0f]/45 backdrop-blur-[2px] transition-opacity duration-300',
              summary ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <div
              className={cn(
                'rounded-[22px] bg-white px-7 py-5 text-center shadow-2xl transition-transform duration-300',
                summary ? 'scale-100' : 'scale-90',
              )}
            >
              <div className="text-[9.5px] font-extrabold tracking-[0.1em] uppercase text-[#101216]/55">
                Run complete
              </div>
              <div className="mt-1 font-display text-[22px] font-bold text-[#101216]">5.0 km · 27:00</div>
              <div className="mt-0.5 text-[12.5px] font-semibold text-[#101216]/70">3 cards claimed · +370 XP</div>
            </div>
          </div>
        </div>
      </div>

      {!reduced && (
        <Button
          variant="ghost"
          size="sm"
          onClick={replay}
          className="rounded-full text-[13px] font-semibold text-foreground/55 hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          Replay run
        </Button>
      )}
    </div>
  )
}
