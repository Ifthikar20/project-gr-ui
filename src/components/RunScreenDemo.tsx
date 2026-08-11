import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BatteryMedium, RotateCcw, Signal, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CollectibleCard } from '@/components/cards/CollectibleCard'
import { MiniCard } from '@/components/cards/MiniCard'
import type { CardData, MiniData } from '@/components/cards/data'
import { EmeraldArt } from '@/components/cards/art/EmeraldArt'
import { EmberArt } from '@/components/cards/art/EmberArt'
import { EmeraldMiniArt } from '@/components/cards/art/minis'
import './RunScreenDemo.css'

/**
 * A faithful mockup of the app's Active Run screen, transcribed from the
 * iOS source (ActiveRunView + DesignSystem): light flat city map, 🏃
 * runner with a heading arrow, a route that follows the streets between
 * blocks, two shaded active regions, a bottom stats band (Time · mi ·
 * Steps · min/mi, pace in pulse violet), pause orb and Hold-to-stop.
 * Claims follow the app's choreography — rarity burst, card flight into
 * the stash chip, "+1" float — no toasts, no XP mid-run.
 * Auto-plays in view and loops via the real "Run complete" summary.
 * Sizes are the app's point values at ~0.69 scale (393pt → 270px).
 */

// ---- DesignSystem tokens (Colors.swift) --------------------------------
const INK = '#16181D'
const SNOW = '#FAFAF8'
const PULSE = '#5F40BF'
const MAP_GREEN = '#61FF00'
const ink = (a: number) => `rgba(22, 24, 29, ${a})`
// Rarity = pulse at opacity steps (never a new hue)
const rarityColor: Record<string, string> = {
  uncommon: 'rgba(95, 64, 191, 0.5)',
  rare: 'rgba(95, 64, 191, 0.7)',
  legendary: 'rgba(95, 64, 191, 1)',
}

interface ZoneDef {
  /** Region rect in map viewBox units — cards surface anywhere inside. */
  x: number
  y: number
  w: number
  h: number
  label: string
  short: string
  tier: 'uncommon' | 'rare' | 'legendary'
  fill: string
  stroke: string
  ink: string
  /** Label and collected-badge anchors, kept inside the sliced viewport. */
  lx: number
  ly: number
  bx: number
  by: number
}

/* Two active regions rather than pin-drops: run into the shaded area and
   the card inside it is collected. */
const ZONES: ZoneDef[] = [
  {
    x: 0,
    y: 208,
    w: 146,
    h: 116,
    label: 'PARK ZONE',
    short: 'Park zone',
    tier: 'uncommon',
    fill: 'rgba(97, 255, 0, 0.2)',
    stroke: 'rgba(72, 168, 16, 0.75)',
    ink: '#3d7f13',
    lx: 40,
    ly: 232,
    bx: 126,
    by: 227,
  },
  {
    x: 156,
    y: 16,
    w: 146,
    h: 116,
    label: 'DAWN ZONE',
    short: 'Dawn zone',
    tier: 'legendary',
    fill: 'rgba(95, 64, 191, 0.17)',
    stroke: 'rgba(95, 64, 191, 0.7)',
    ink: '#4a2fa0',
    lx: 176,
    ly: 118,
    bx: 266,
    by: 113,
  },
]

/* The route follows the street grid — every leg runs down an avenue or a
   cross street, never through a block. */
const ROUTE =
  'M52 408 L52 286 Q52 266 72 266 L130 266 Q150 266 150 246 L150 186 Q150 166 170 166 L228 166 Q248 166 248 146 L248 86 Q248 66 228 66 L168 66'

const GRID_MAJOR = 'M0 66 H300 M0 166 H300 M0 266 H300 M0 366 H300 M52 0 V420 M150 0 V420 M248 0 V420'
const GRID_MINOR = 'M0 116 H300 M0 216 H300 M0 316 H300 M101 0 V420 M199 0 V420'

/* Building footprints, block by block: the gaps between them are the
   streets and alleys the runner threads. */
const COL: [number, number][] = [
  [2, 43],
  [61, 95.5],
  [106.5, 141],
  [159, 193.5],
  [204.5, 239],
  [257, 298],
]
const ROW: [number, number][] = [
  [2, 59],
  [75, 110.5],
  [119.5, 159],
  [175, 210.5],
  [219.5, 259],
  [275, 310.5],
  [319.5, 359],
  [375, 418],
]
const FILLS = ['#E4E0D5', '#EAE6DB', '#DEDACE', '#EDE9DF']
// blocks given over to the park and the water instead
const OPEN = new Set(['0-3', '0-4', '5-5', '5-6', '5-7', '4-7'])

const BUILDINGS: { x: number; y: number; w: number; h: number; fill: string }[] = []
COL.forEach(([x0, x1], i) => {
  ROW.forEach(([y0, y1], j) => {
    if (OPEN.has(`${i}-${j}`)) return
    const w = x1 - x0
    const h = y1 - y0
    const tone = (n: number) => FILLS[(i + j + n) % FILLS.length]
    switch ((i * 3 + j * 5) % 4) {
      case 0:
        BUILDINGS.push({ x: x0, y: y0, w, h: h * 0.58, fill: tone(0) })
        BUILDINGS.push({ x: x0, y: y0 + h * 0.66, w, h: h * 0.34, fill: tone(1) })
        break
      case 1:
        BUILDINGS.push({ x: x0, y: y0, w: w * 0.54, h, fill: tone(0) })
        BUILDINGS.push({ x: x0 + w * 0.62, y: y0, w: w * 0.38, h, fill: tone(2) })
        break
      case 2:
        BUILDINGS.push({ x: x0, y: y0, w, h, fill: tone(1) })
        break
      default:
        BUILDINGS.push({ x: x0, y: y0, w: w * 0.46, h, fill: tone(3) })
        BUILDINGS.push({ x: x0 + w * 0.54, y: y0, w: w * 0.46, h: h * 0.44, fill: tone(0) })
        BUILDINGS.push({ x: x0 + w * 0.54, y: y0 + h * 0.52, w: w * 0.46, h: h * 0.48, fill: tone(2) })
    }
  })
})

// The finds as collectible cards, revealed on the Run complete screen.
// Indices match ZONES; the last one collected is featured.
const FIND_CARDS: CardData[] = [
  {
    edge: 'uncommon',
    stage: 'Stage 1',
    name: 'Moss Emerald',
    xp: '40',
    art: <EmeraldArt />,
    band: 'Uncommon Gem · Trailblazer set',
    stats: [
      { v: '1.4', label: 'km run' },
      { v: '1,900', label: 'steps' },
      { v: '+40', label: 'xp gained', volt: true },
    ],
    use: { name: 'Soft Ground', val: '+5%', text: 'Trail kilometres count 5% extra XP while displayed.' },
    found: { where: 'Park & greenway zones', pct: 46 },
    flavor: 'Grows its colour where the path stays damp. Brightest after rain.',
    foot: { left: 'illus. RUNNERCARD · morning runs', right: '118 / 500' },
    ariaLabel: 'Gem card: Moss Emerald, Stage 1 Uncommon — 40 XP, found in park and greenway zones',
  },
  {
    edge: 'legendary',
    stage: 'Stage 3',
    name: 'First Light Ember',
    xp: '240',
    art: <EmberArt />,
    band: 'Legendary Gem · Trailblazer set',
    stats: [
      { v: '5.0', label: 'km run' },
      { v: '6,830', label: 'steps' },
      { v: '+240', label: 'xp gained', volt: true },
    ],
    use: { name: 'First Light', val: '2×', text: 'Dawn runs bank double XP while your streak holds.' },
    found: { where: 'Dawn summit zones', pct: 4 },
    flavor: 'Only surfaces in the first light after a climb — warm to the touch, or so runners say.',
    foot: { left: 'illus. RUNNERCARD · dawn only', right: '007 / 500' },
    ariaLabel: 'Gem card: First Light Ember, Stage 3 Legendary — 240 XP, surfaces at dawn',
  },
]

const FIND_MINIS: MiniData[] = [
  { tier: 'uncommon', name: 'Moss Emerald', xp: '40', type: 'Uncommon Gem', art: <EmeraldMiniArt /> },
  { tier: 'legendary', name: 'First Light Ember', xp: '240', type: 'Legendary Gem', art: <EmberArt /> },
]

const CARD_SCALE = 0.66

const VIEW_W = 300
const VIEW_H = 420
const M_PER_UNIT = 1.6 // map units → metres
const PACE_S_PER_M = 521.4 / 1609.344 // 8:41 /mi

const RUN_MS = 11000
const SUMMARY_MS = 3400
const TOTAL_MI = 3.11 // 5.0 km
const TOTAL_KM = 5.0
const KM_PACE = '5:24' // 8:41 /mi
const TOTAL_SECONDS = 27 * 60
const TOTAL_STEPS = 6830
const TOTAL_CAL = 342

function fmtTime(totalSeconds: number) {
  const s = Math.floor(totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`
}

// UnitFormat.shortDistance: feet under 152.4 m, else miles at 1 decimal
function shortDistance(meters: number) {
  return meters < 152.4 ? `${Math.round(meters * 3.28084)} ft` : `${(meters / 1609.344).toFixed(1)} mi`
}

function normalizeDeg(d: number) {
  let deg = d % 360
  if (deg > 180) deg -= 360
  if (deg < -180) deg += 360
  return deg
}

// SF-symbol-shaped rarity glyphs: diamond.fill / rhombus.fill / crown.fill
function RarityGlyphApp({ tier, size, color }: { tier: ZoneDef['tier']; size: number; color: string }) {
  const d =
    tier === 'uncommon'
      ? 'M12 3 L21 12 L12 21 L3 12 Z'
      : tier === 'rare'
        ? 'M12 5 L22 12 L12 19 L2 12 Z'
        : 'M5 19 L3 8 L8 12 L12 4 L16 12 L21 8 L19 19 Z'
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size }} aria-hidden="true">
      <path d={d} fill={color} />
    </svg>
  )
}

interface SummaryStats {
  mi: string
  time: string
  pace: string
  steps: number
  cal: number
  gems: number
}

/** The demo's live numbers, in the site's metric voice — emitted whenever
    a displayed value changes so the section's stat tiles can follow the run. */
export interface LiveStats {
  km: string
  cards: number
  pace: string
  streak: number
}

export const RunScreenDemo = memo(function RunScreenDemo({ onLive }: { onLive?: (s: LiveStats) => void }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const remainRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const runnerRef = useRef<SVGGElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const distRef = useRef<HTMLSpanElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const stepsRef = useRef<HTMLSpanElement>(null)
  const paceRef = useRef<HTMLSpanElement>(null)
  const chipTextRef = useRef<HTMLSpanElement>(null)
  const chipArrowRef = useRef<HTMLSpanElement>(null)

  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [visible, setVisible] = useState(false)
  const [claimed, setClaimed] = useState(() => ZONES.map(() => false))
  const [stash, setStash] = useState(0)
  const [paused, setPaused] = useState(false)
  const [holding, setHolding] = useState(false)
  const [fx, setFx] = useState<{ i: number; key: number; from: { x: number; y: number }; to: { x: number; y: number } } | null>(null)
  const [summaryStats, setSummaryStats] = useState<SummaryStats | null>(null)

  const lengthRef = useRef(0)
  const elapsedRef = useRef(0)
  const claimedRef = useRef(ZONES.map(() => false))
  const pausedRef = useRef(false)
  const frozenRef = useRef(1)
  const summaryRef = useRef<SummaryStats | null>(null)
  const stashRef = useRef(0)
  const fxCounter = useRef(0)
  const timers = useRef(new Set<number>())
  const holdTimer = useRef<number | undefined>(undefined)
  const onLiveRef = useRef(onLive)
  const lastLiveRef = useRef('')

  useEffect(() => {
    onLiveRef.current = onLive
  })

  const emitLive = (progress: number) => {
    const cb = onLiveRef.current
    if (!cb) return
    const s: LiveStats = {
      km: (TOTAL_KM * progress).toFixed(1),
      cards: stashRef.current,
      pace: progress < 0.04 ? '–:––' : KM_PACE,
      // the finished run extends the streak; a fresh loop winds it back
      streak: summaryRef.current ? 13 : 12,
    }
    const key = `${s.km}|${s.cards}|${s.pace}|${s.streak}`
    if (key === lastLiveRef.current) return
    lastLiveRef.current = key
    cb(s)
  }

  const later = (ms: number, fn: () => void) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id)
      fn()
    }, ms)
    timers.current.add(id)
  }
  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current.clear()
  }

  const claim = (i: number) => {
    claimedRef.current = claimedRef.current.map((c, j) => (j === i ? true : c))
    setClaimed([...claimedRef.current])
    const mapEl = mapRef.current
    if (mapEl) {
      // zone centre on screen, under preserveAspectRatio="xMidYMid slice"
      const w = mapEl.offsetWidth
      const h = mapEl.offsetHeight
      const s = Math.max(w / VIEW_W, h / VIEW_H)
      const z = ZONES[i]
      fxCounter.current += 1
      setFx({
        i,
        key: fxCounter.current,
        from: {
          x: (w - VIEW_W * s) / 2 + (z.x + z.w / 2) * s,
          y: (h - VIEW_H * s) / 2 + (z.y + z.h / 2) * s,
        },
        to: { x: 38, y: 40 }, // the stash chip, app coords (52, 30)pt scaled
      })
    }
    later(950, () => {
      stashRef.current += 1
      setStash(stashRef.current)
    })
    later(1600, () => setFx(null))
  }

  const applyFrame = (progress: number) => {
    const route = routeRef.current
    if (!route || !lengthRef.current) return
    const length = lengthRef.current
    const at = length * progress
    const p = route.getPointAtLength(at)
    const p2 = route.getPointAtLength(Math.min(at + 2, length))
    const course = (Math.atan2(p2.x - p.x, -(p2.y - p.y)) * 180) / Math.PI

    runnerRef.current?.setAttribute('transform', `translate(${p.x} ${p.y})`)
    arrowRef.current?.setAttribute('transform', `rotate(${course.toFixed(1)})`)
    if (remainRef.current) {
      // guide line: only the not-yet-covered remainder
      remainRef.current.style.strokeDasharray = `${length}`
      remainRef.current.style.strokeDashoffset = `${-at}`
    }
    if (trailRef.current) {
      // traveled breadcrumb
      trailRef.current.style.strokeDasharray = `${length}`
      trailRef.current.style.strokeDashoffset = `${length - at}`
    }

    if (distRef.current) distRef.current.textContent = (TOTAL_MI * progress).toFixed(2)
    if (timeRef.current) timeRef.current.textContent = fmtTime(TOTAL_SECONDS * progress)
    if (stepsRef.current) stepsRef.current.textContent = `${Math.round(TOTAL_STEPS * progress)}`
    if (paceRef.current) paceRef.current.textContent = progress < 0.04 ? '–:––' : '8:41'

    // next-zone chip + the claim that fires on entering the region
    const next = claimedRef.current.findIndex((c) => !c)
    if (next >= 0) {
      const z = ZONES[next]
      // distance to the region edge — zero once the runner is inside it
      const dx = Math.max(z.x - p.x, 0, p.x - (z.x + z.w))
      const dy = Math.max(z.y - p.y, 0, p.y - (z.y + z.h))
      const d = Math.hypot(dx, dy)
      const meters = d * M_PER_UNIT
      if (chipTextRef.current) {
        const eta = progress >= 0.04 ? ` · ~${fmtTime(meters * PACE_S_PER_M)}` : ''
        chipTextRef.current.textContent = `${z.short} · ${shortDistance(meters)}${eta}`
      }
      if (chipArrowRef.current) {
        const bearing = (Math.atan2(z.x + z.w / 2 - p.x, -(z.y + z.h / 2 - p.y)) * 180) / Math.PI
        chipArrowRef.current.style.transform = `rotate(${normalizeDeg(bearing - course).toFixed(1)}deg)`
      }
      if (d === 0) claim(next)
    }

    emitLive(progress)
  }

  const captureSummary = (progress: number): SummaryStats => ({
    mi: (TOTAL_MI * progress).toFixed(2),
    time: fmtTime(TOTAL_SECONDS * progress),
    pace: progress < 0.04 ? '–:––' : '8:41',
    steps: Math.round(TOTAL_STEPS * progress),
    cal: Math.round(TOTAL_CAL * progress),
    gems: claimedRef.current.filter(Boolean).length,
  })

  const finishEarly = () => {
    const progress = Math.min(elapsedRef.current / RUN_MS, 1)
    frozenRef.current = progress
    summaryRef.current = captureSummary(progress)
    setSummaryStats(summaryRef.current)
    setPaused(false)
    pausedRef.current = false
    elapsedRef.current = RUN_MS
  }

  const reset = () => {
    clearTimers()
    elapsedRef.current = 0
    claimedRef.current = ZONES.map(() => false)
    frozenRef.current = 1
    summaryRef.current = null
    pausedRef.current = false
    stashRef.current = 0
    setClaimed(ZONES.map(() => false))
    setStash(0)
    setFx(null)
    setSummaryStats(null)
    setPaused(false)
  }

  const replay = () => {
    if (reduced) return
    reset()
    applyFrame(0)
  }

  // Measure the route; paint the first (or, reduced, the final) frame.
  useLayoutEffect(() => {
    if (routeRef.current) lengthRef.current = routeRef.current.getTotalLength()
    if (reduced) {
      claimedRef.current = ZONES.map(() => true)
      setClaimed(ZONES.map(() => true))
      stashRef.current = ZONES.length
      setStash(ZONES.length)
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
      const dt = Math.min(now - last, 64)
      last = now
      if (!pausedRef.current) elapsedRef.current += dt
      const elapsed = elapsedRef.current
      if (elapsed <= RUN_MS) {
        applyFrame(elapsed / RUN_MS)
      } else if (elapsed <= RUN_MS + SUMMARY_MS) {
        if (!summaryRef.current) {
          frozenRef.current = 1
          summaryRef.current = captureSummary(1)
          setSummaryStats(summaryRef.current)
        }
        applyFrame(frozenRef.current)
      } else {
        reset()
        applyFrame(0)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, reduced])

  useEffect(() => () => {
    clearTimers()
    window.clearTimeout(holdTimer.current)
  }, [])

  const togglePause = () => {
    if (reduced || summaryStats) return
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
  }

  const holdStart = () => {
    if (reduced || summaryStats) return
    setHolding(true)
    holdTimer.current = window.setTimeout(() => {
      setHolding(false)
      finishEarly()
    }, 1000)
  }
  const holdEnd = () => {
    window.clearTimeout(holdTimer.current)
    setHolding(false)
  }

  const nextZoneVisible = claimed.some((c) => !c)

  return (
    <div className="flex w-full max-w-[290px] flex-col items-center gap-3">
      <div
        ref={frameRef}
        role="img"
        aria-label="RunnerCard active run screen: a live 3.11 mile run along city streets through two shaded card regions, collecting Moss Emerald and First Light Ember; the stats band shows time, distance, steps and pace, with pause and hold-to-stop controls"
        onClick={replay}
        className={cn(
          'gr-frame relative w-full rounded-[46px] bg-[#0b0c0f] p-[10px] select-none',
          'shadow-[0_34px_90px_rgba(16,18,22,0.38),inset_0_0_0_1.5px_rgba(255,255,255,0.06)]',
          'transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          !reduced &&
            'cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_44px_110px_rgba(16,18,22,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]',
        )}
      >
        <div
          className="relative flex aspect-[300/650] flex-col overflow-hidden rounded-[37px]"
          style={{ background: SNOW }}
          aria-hidden="true"
        >
          {/* ================================================== live map */}
          <div ref={mapRef} className="relative min-h-0 flex-1">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              {/* light standard map: land, water, park, city blocks, streets */}
              <rect width={VIEW_W} height={VIEW_H} fill="#EFEDE6" />
              <path d="M300 292 Q262 314 250 356 Q243 392 222 420 L300 420 Z" fill="#C5DEF1" />
              <rect x="-4" y="170" width="50" height="96" rx="10" fill="#D5E8C3" />
              <g>
                {BUILDINGS.map((b, i) => (
                  <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="1.6" fill={b.fill} />
                ))}
              </g>
              {/* street casing then surface — the runnable gaps between blocks */}
              <g fill="none" stroke="#E2DDD1">
                <path d={GRID_MAJOR} strokeWidth="17" />
                <path d={GRID_MINOR} strokeWidth="9.5" />
              </g>
              <g fill="none" stroke="#FFFFFF">
                <path d={GRID_MAJOR} strokeWidth="14" />
                <path d={GRID_MINOR} strokeWidth="7" />
              </g>

              {/* the two active regions — run inside one and its card is yours */}
              {ZONES.map((z, i) => (
                <g key={z.label} opacity={claimed[i] ? 0.4 : 1}>
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="16" fill={z.fill} />
                  <rect
                    x={z.x}
                    y={z.y}
                    width={z.w}
                    height={z.h}
                    rx="16"
                    fill="none"
                    stroke={z.stroke}
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />
                  <text x={z.lx} y={z.ly} fontSize="9.5" fontWeight="700" letterSpacing="0.6" fill={z.ink}>
                    {z.label}
                  </text>
                  {claimed[i] && (
                    <g transform={`translate(${z.bx} ${z.by})`}>
                      <circle r="8" fill={INK} opacity="0.8" />
                      <path
                        d="M-3.4 0 L-1 2.6 L3.8 -2.8"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </g>
              ))}

              {/* guide line (remainder, map green) + traveled breadcrumb */}
              <path ref={routeRef} d={ROUTE} fill="none" stroke="none" />
              <path ref={remainRef} d={ROUTE} fill="none" stroke={MAP_GREEN} strokeWidth="4.5" strokeLinecap="round" />
              <path
                ref={trailRef}
                d={ROUTE}
                fill="none"
                stroke={ink(0.55)}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* the runner: 🏃 + map-green heading arrow */}
              <g ref={runnerRef}>
                <g ref={arrowRef}>
                  <path d="M0 -18 L5 -10 L-5 -10 Z" fill={MAP_GREEN} stroke={ink(0.3)} strokeWidth="0.5" />
                </g>
                <text
                  fontSize="18"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ filter: 'drop-shadow(0 1px 1px rgba(22,24,29,0.5))' }}
                >
                  🏃
                </text>
              </g>
            </svg>

            {/* status bar — dark content over the light map */}
            <div
              className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-[13px] text-[11px] font-semibold"
              style={{ color: INK }}
            >
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <Signal className="size-3" strokeWidth={2.6} />
                <Wifi className="size-3" strokeWidth={2.6} />
                <BatteryMedium className="size-3.5" strokeWidth={2.4} />
              </span>
            </div>
            <div className="absolute top-[10px] left-1/2 z-40 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />

            {/* MapKit compass, top-trailing */}
            <div
              className="absolute top-[38px] right-2 z-20 grid size-[22px] place-items-center rounded-full bg-white/95 shadow-sm"
              style={{ boxShadow: `0 1px 3px ${ink(0.15)}, inset 0 0 0 1px ${ink(0.1)}` }}
            >
              <svg viewBox="0 0 20 20" className="size-[14px]">
                <path d="M10 3 L12 10 L8 10 Z" fill="#E4574C" />
                <path d="M10 17 L8 10 L12 10 Z" fill={ink(0.35)} />
              </svg>
            </div>

            {/* stash chip — appears after the first collection */}
            {stash > 0 && (
              <div
                key={stash}
                className="gr-chip-pop absolute top-[38px] left-2 z-30 flex items-center gap-1.5 rounded-full px-2.5 py-[5px]"
                style={{ background: 'rgba(255,255,255,0.94)', boxShadow: `inset 0 0 0 1px ${ink(0.12)}, 0 2px 5px ${ink(0.08)}` }}
              >
                <svg viewBox="0 0 24 24" className="size-[9px]">
                  <path d="M12 3 L21 12 L12 21 L3 12 Z" fill={PULSE} />
                </svg>
                <span className="text-[10px] font-bold tabular-nums" style={{ color: INK }}>
                  {stash}
                </span>
              </div>
            )}

            {/* "+1" float on catch */}
            {fx && (
              <div
                key={`float-${fx.key}`}
                className="gr-plus-float absolute top-[14px] left-[66px] z-30 flex items-center gap-[3px]"
                style={{ color: rarityColor[ZONES[fx.i].tier], textShadow: '0 0 3px rgba(255,255,255,0.9)' }}
              >
                <svg viewBox="0 0 24 24" className="size-[8px]">
                  <path d="M12 3 L21 12 L12 21 L3 12 Z" fill="currentColor" />
                </svg>
                <span className="text-[9.5px] font-bold tabular-nums">+1</span>
              </div>
            )}

            {/* paused banner */}
            {paused && (
              <div className="absolute inset-x-0 top-[40px] z-30 flex justify-center">
                <span
                  className="rounded-full px-3.5 py-[6px] text-[9.5px] font-bold text-white"
                  style={{ background: ink(0.85) }}
                >
                  Paused — resume moving
                </span>
              </div>
            )}

            {/* collection burst */}
            {fx && (
              <div key={`burst-${fx.key}`} className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
                <div className="relative grid place-items-center">
                  <div
                    className="gr-burst-ring absolute size-[84px] rounded-full"
                    style={{ border: `3px solid ${rarityColor[ZONES[fx.i].tier]}` }}
                  />
                  <div className="gr-burst-glyph" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.95))' }}>
                    <RarityGlyphApp tier={ZONES[fx.i].tier} size={49} color={rarityColor[ZONES[fx.i].tier]} />
                  </div>
                </div>
              </div>
            )}

            {/* the found card flying into the stash chip */}
            {fx && (
              <div
                key={`flight-${fx.key}`}
                className="gr-gem-flight pointer-events-none absolute top-0 left-0 z-30"
                style={
                  {
                    '--fx': `${fx.from.x - 8}px`,
                    '--fy': `${fx.from.y - 11}px`,
                    '--tx': `${fx.to.x - 8}px`,
                    '--ty': `${fx.to.y - 11}px`,
                  } as React.CSSProperties
                }
              >
                <svg viewBox="0 0 16 22" className="h-[22px] w-[16px]">
                  <rect
                    width="16"
                    height="22"
                    rx="3.5"
                    fill={rarityColor[ZONES[fx.i].tier]}
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.2"
                  />
                  <rect x="3.4" y="4" width="9.2" height="7" rx="1.6" fill="rgba(255,255,255,0.75)" />
                  <rect x="3.4" y="13.4" width="9.2" height="1.8" rx="0.9" fill="rgba(255,255,255,0.55)" />
                </svg>
              </div>
            )}
          </div>

          {/* ================================================ stats band */}
          <div
            className="relative z-10 flex flex-col items-center gap-2.5 px-3.5 pt-3 pb-5"
            style={{ background: SNOW, borderTop: `1px solid ${ink(0.12)}` }}
          >
            {/* next-zone chip */}
            <div
              className={cn(
                'flex items-center gap-1.5 rounded-full bg-white px-2.5 py-[5px]',
                !nextZoneVisible && 'invisible',
              )}
              style={{ boxShadow: `inset 0 0 0 1px ${ink(0.12)}` }}
            >
              {nextZoneVisible && (
                <RarityGlyphApp
                  tier={ZONES[claimed.findIndex((c) => !c)].tier}
                  size={9}
                  color={rarityColor[ZONES[claimed.findIndex((c) => !c)].tier]}
                />
              )}
              <span ref={chipArrowRef} className="inline-flex transition-transform duration-300" style={{ color: PULSE }}>
                <svg viewBox="0 0 24 24" className="size-[9px]" fill="none" stroke="currentColor" strokeWidth="3.2">
                  <path d="M12 20 V5 M6 11 L12 5 L18 11" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span ref={chipTextRef} className="text-[9.5px] font-bold tabular-nums" style={{ color: INK }} />
            </div>

            {/* Time · mi · Steps · min/mi */}
            <div className="gr-stats flex items-end gap-4">
              {[
                { ref: timeRef, initial: '0:00', label: 'Time' },
                { ref: distRef, initial: '0.00', label: 'mi' },
                { ref: stepsRef, initial: '0', label: 'Steps' },
                { ref: paceRef, initial: '–:––', label: 'min/mi', accent: true },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-[1px]">
                  <span
                    className="gr-num font-display text-[24px] leading-none font-bold tabular-nums"
                    style={{ color: stat.accent ? PULSE : INK }}
                  >
                    <span ref={stat.ref}>{stat.initial}</span>
                  </span>
                  <span className="text-[8.5px] font-medium" style={{ color: ink(0.55) }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* pause orb + Hold to stop */}
            <div className="flex w-full items-center gap-3 pt-0.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePause()
                }}
                className="grid size-[44px] shrink-0 place-items-center rounded-full bg-white"
                style={{ boxShadow: `inset 0 0 0 1px ${ink(0.12)}, 0 3px 6px ${ink(0.2)}` }}
                aria-label={paused ? 'Resume' : 'Pause'}
              >
                {paused ? (
                  <svg viewBox="0 0 24 24" className="size-[15px]">
                    <path d="M8 5 L19 12 L8 19 Z" fill={INK} />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="size-[15px]">
                    <rect x="6" y="5" width="4" height="14" rx="1.4" fill={INK} />
                    <rect x="14" y="5" width="4" height="14" rx="1.4" fill={INK} />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  holdStart()
                }}
                onPointerUp={holdEnd}
                onPointerLeave={holdEnd}
                className="relative h-[44px] flex-1 overflow-hidden rounded-full"
                style={{ background: PULSE, boxShadow: `0 3px 6px ${ink(0.18)}` }}
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-white/35"
                  style={{ width: holding ? '100%' : '0%', transition: holding ? 'width 1s linear' : 'width 0.15s ease' }}
                />
                <span className="relative font-display text-[14px] font-semibold text-white">Hold to stop</span>
              </button>
            </div>
          </div>

          {/* home indicator */}
          <div
            className="absolute bottom-[5px] left-1/2 z-30 h-[4px] w-[100px] -translate-x-1/2 rounded-full"
            style={{ background: ink(0.3) }}
          />

          {/* ======================================= Run complete summary */}
          <div
            className={cn(
              'absolute inset-0 z-40 flex flex-col items-center justify-center gap-3.5 px-5 transition-opacity duration-300',
              summaryStats ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            style={{ background: SNOW }}
          >
            {summaryStats &&
              (() => {
                const found = claimed.map((c, i) => (c ? i : -1)).filter((i) => i >= 0)
                const featured = found.length > 0 ? found[found.length - 1] : null
                const rest = found.slice(0, -1)
                return (
                  <>
                    <div className="text-center">
                      <div className="font-display text-[19px] font-semibold" style={{ color: INK }}>
                        Run complete
                      </div>
                      <div className="mt-1 text-[9.5px] font-semibold tabular-nums" style={{ color: ink(0.55) }}>
                        {summaryStats.mi} mi · {summaryStats.time} · {summaryStats.pace} /mi · {summaryStats.steps}{' '}
                        steps
                      </div>
                    </div>

                    {featured != null ? (
                      <>
                        {/* the capture of the run, as its collectible card */}
                        <div
                          className="gr-card-reveal"
                          style={{ width: 330 * CARD_SCALE, height: 334 * CARD_SCALE }}
                        >
                          <div style={{ width: 330, transform: `scale(${CARD_SCALE})`, transformOrigin: 'top left' }}>
                            <CollectibleCard data={FIND_CARDS[featured]} />
                          </div>
                        </div>
                        {rest.length > 0 && (
                          <div className={cn('grid w-full gap-2 px-1', rest.length === 2 ? 'grid-cols-2' : 'max-w-[132px]')}>
                            {rest.map((i, n) => (
                              <div key={ZONES[i].label} className="gr-find-in" style={{ animationDelay: `${0.55 + n * 0.12}s` }}>
                                <MiniCard data={FIND_MINIS[i]} />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="max-w-[200px] text-center text-[10px] font-medium" style={{ color: ink(0.55) }}>
                        No gems this time. The route remembers you anyway.
                      </p>
                    )}

                    <div className="text-center">
                      <div className="text-[8.5px] font-medium" style={{ color: ink(0.55) }}>
                        Aug 10 · +75 XP · {summaryStats.gems} {summaryStats.gems === 1 ? 'find' : 'finds'}
                      </div>
                      <div className="mt-1 text-[9px] font-semibold" style={{ color: PULSE }}>
                        Tap to meet your finds
                      </div>
                    </div>
                  </>
                )
              })()}
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
})
