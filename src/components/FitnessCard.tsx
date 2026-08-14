import { useEffect, useState, type CSSProperties } from 'react'
import { HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'

/* The fitness side of the app, shown rather than described: three charts
   over the same week of running, cycling on their own and animating in.
   Sample figures — swap the arrays for real data before launch. */

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

// kilometres per day
const KM = [3.2, 5.0, 0, 6.4, 4.1, 8.6, 2.1]
// seconds per kilometre, split by split, on the last run
const SPLITS = [351, 331, 324, 319, 327, 312, 320, 308]
// steps per day
const STEPS = [4520, 6300, 1180, 8140, 5210, 9140, 3400]

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)
const fmtPace = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`
const KM_TOTAL = sum(KM)
const KM_MAX = Math.max(...KM)
const RUNS = KM.filter((km) => km > 0).length
const STEP_TOTAL = sum(STEPS)
const STEP_MAX = Math.max(...STEPS)
const PACE_AVG = sum(SPLITS) / SPLITS.length
const PACE_BEST = Math.min(...SPLITS)

/* ---------------------------------------------------- distance, by day */
function DistanceChart() {
  return (
    <div className="flex h-full items-end gap-1.5">
      {KM.map((km, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center gap-1.5">
          {/* definite height so the bars' percentage heights have something to resolve against */}
          <div className="flex h-[calc(100%-18px)] w-full items-end justify-center">
            <div
              className="fit-bar w-full max-w-[22px] rounded-[7px]"
              style={
                {
                  '--h': `${Math.max((km / KM_MAX) * 100, 4)}%`,
                  animationDelay: `${i * 70}ms`,
                  background: km === KM_MAX ? 'var(--volt)' : 'rgba(16,18,22,0.13)',
                } as CSSProperties
              }
            />
          </div>
          <span className="text-[10px] font-semibold text-foreground/40">{DAYS[i]}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------- pace, split by split */
const PACE_MIN = Math.min(...SPLITS)
const PACE_MAX = Math.max(...SPLITS)
const px = (i: number) => 10 + (i * 280) / (SPLITS.length - 1)
const py = (v: number) => 14 + ((v - PACE_MIN) / (PACE_MAX - PACE_MIN)) * 58
const LINE = SPLITS.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')
const AREA = `${LINE} L290 86 L10 86 Z`

function PaceChart() {
  return (
    <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="fit-pace-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#61ff00" stopOpacity="0.28" />
          <stop offset="1" stopColor="#61ff00" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* the run's average, for the line to beat */}
      <line
        x1="10"
        x2="290"
        y1={py(PACE_AVG)}
        y2={py(PACE_AVG)}
        stroke="rgba(16,18,22,0.18)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path d={AREA} fill="url(#fit-pace-fill)" className="fit-area" />
      <path
        d={LINE}
        fill="none"
        stroke="#3d9c00"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fit-line"
      />
      {SPLITS.map((v, i) => (
        <circle
          key={i}
          cx={px(i)}
          cy={py(v)}
          r={v === PACE_BEST ? 4.5 : 2.6}
          fill={v === PACE_BEST ? 'var(--volt)' : '#3d9c00'}
          stroke="#fff"
          strokeWidth={v === PACE_BEST ? 2 : 0}
          className="fit-dot"
          style={{ animationDelay: `${300 + i * 60}ms` }}
        />
      ))}
    </svg>
  )
}

/* --------------------------------------------------------- steps, by day */
function StepsChart() {
  return (
    <div className="flex h-full flex-col justify-between">
      {STEPS.map((steps, i) => (
        <div key={i} className="flex h-[10px] items-center gap-2">
          <span className="w-2 text-[9px] leading-none font-semibold text-foreground/40">{DAYS[i]}</span>
          <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-foreground/[0.07]">
            <div
              className="fit-row h-full rounded-full"
              style={
                {
                  '--w': `${Math.max((steps / STEP_MAX) * 100, 3)}%`,
                  animationDelay: `${i * 60}ms`,
                  background: steps === STEP_MAX ? 'var(--volt)' : 'rgba(16,18,22,0.2)',
                } as CSSProperties
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const VIEWS = [
  {
    id: 'distance',
    kicker: 'This week',
    value: KM_TOTAL.toFixed(1),
    unit: 'km',
    meta: `${RUNS} runs`,
    foot: `${fmtPace(PACE_AVG)} /km avg · 13 day streak`,
    chart: <DistanceChart />,
    label: 'Distance by day',
  },
  {
    id: 'pace',
    kicker: 'Last run',
    value: fmtPace(PACE_AVG),
    unit: '/km',
    meta: `${SPLITS.length}.0 km`,
    foot: `Fastest split ${fmtPace(PACE_BEST)} · finished strong`,
    chart: <PaceChart />,
    label: 'Pace, split by split',
  },
  {
    id: 'steps',
    kicker: 'Steps',
    value: STEP_TOTAL.toLocaleString('en-US'),
    unit: '',
    meta: 'this week',
    foot: `${Math.round(STEP_TOTAL / 7).toLocaleString('en-US')} a day · best ${STEP_MAX.toLocaleString('en-US')}`,
    chart: <StepsChart />,
    label: 'Steps by day',
  },
]

export function FitnessCard() {
  const [view, setView] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => setView((v) => (v + 1) % VIEWS.length), 4600)
    return () => window.clearInterval(id)
  }, [reduced, paused])

  const v = VIEWS[view]

  return (
    <div
      className="flex h-full min-h-[240px] flex-col rounded-[24px] border border-border/60 bg-card p-5 shadow-sm md:p-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11.5px] font-bold tracking-[0.06em] uppercase text-muted-foreground">{v.kicker}</span>
        <div className="flex items-center gap-1.5">
          {VIEWS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(i)}
              aria-label={item.label}
              aria-current={i === view}
              className={cn(
                'size-1.5 rounded-full transition-all duration-300',
                i === view ? 'w-4 bg-foreground/70' : 'bg-foreground/20 hover:bg-foreground/40',
              )}
            />
          ))}
        </div>
      </div>

      <div key={v.id} className="fit-view flex flex-1 flex-col">
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-[clamp(26px,2.6vw,34px)] leading-none font-bold tracking-[-0.02em] tabular-nums">
            {v.value}
            {v.unit && <small className="ml-1 text-[0.45em] font-bold text-muted-foreground">{v.unit}</small>}
          </span>
          <span className="text-[12px] font-semibold text-foreground/45 tabular-nums">{v.meta}</span>
        </div>

        <div className="mt-auto pt-6">
          <div className="h-[92px] sm:h-[106px]">{v.chart}</div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border/60 pt-3 text-[12px]">
          <span className="font-medium text-muted-foreground tabular-nums">{v.foot}</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <HeartPulse className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
            On-device
          </span>
        </div>
      </div>
    </div>
  )
}
