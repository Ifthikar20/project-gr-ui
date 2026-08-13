import { HeartPulse } from 'lucide-react'

/* One fitness feature, shown rather than described: the week's runs as a
   distance chart, with the pace and streak the app keeps alongside them.
   Sample data — swap for real figures before launch. */

const WEEK = [
  { d: 'M', km: 3.2 },
  { d: 'T', km: 5.0 },
  { d: 'W', km: 0 },
  { d: 'T', km: 6.4 },
  { d: 'F', km: 4.1 },
  { d: 'S', km: 8.6 },
  { d: 'S', km: 2.1 },
]

const TOTAL = WEEK.reduce((sum, day) => sum + day.km, 0)
const MAX = Math.max(...WEEK.map((day) => day.km))
const RUNS = WEEK.filter((day) => day.km > 0).length

export function FitnessCard() {
  return (
    <div className="flex h-full min-h-[240px] flex-col rounded-[24px] border border-border/60 bg-card p-5 shadow-sm md:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[11.5px] font-bold tracking-[0.06em] uppercase text-muted-foreground">This week</span>
        <span className="text-[12px] font-semibold text-foreground/45 tabular-nums">{RUNS} runs</span>
      </div>
      <div className="mt-1 font-display text-[clamp(26px,2.6vw,34px)] leading-none font-bold tracking-[-0.02em] tabular-nums">
        {TOTAL.toFixed(1)}
        <small className="ml-1 text-[0.45em] font-bold text-muted-foreground">km</small>
      </div>

      <div className="mt-auto flex items-end gap-1.5 pt-6">
        {WEEK.map((day, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-[72px] w-full items-end justify-center sm:h-[86px]">
              <div
                className="fit-bar w-full max-w-[22px] rounded-[7px]"
                title={`${day.d}: ${day.km.toFixed(1)} km`}
                style={{
                  '--h': `${Math.max((day.km / MAX) * 100, 4)}%`,
                  animationDelay: `${i * 70}ms`,
                  background: day.km === MAX ? 'var(--volt)' : 'rgba(16,18,22,0.13)',
                } as React.CSSProperties}
              />
            </div>
            <span className="text-[10px] font-semibold text-foreground/40">{day.d}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border/60 pt-3 text-[12px]">
        <span className="font-semibold tabular-nums">
          5:24 <span className="font-medium text-muted-foreground">/km avg · 13 day streak</span>
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <HeartPulse className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
          On-device
        </span>
      </div>
    </div>
  )
}
