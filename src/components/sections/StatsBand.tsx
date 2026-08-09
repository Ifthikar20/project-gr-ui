import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const stats: { num: ReactNode; label: string }[] = [
  { num: '5', label: 'card types to hunt' },
  { num: '5', label: 'rarity tiers' },
  {
    num: (
      <>
        200<small className="text-[0.5em]"> ft</small>
      </>
    ),
    label: 'zone reach radius',
  },
  { num: '100%', label: 'found on real runs' },
]

export function StatsBand() {
  return (
    <section aria-label="FindRun by the numbers">
      <div className="mx-auto w-full max-w-[980px] px-6">
        <div className="grid grid-cols-2 border-y md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn('px-5 py-7 text-center md:py-10', i > 0 && 'md:border-l', i % 2 === 1 && 'border-l md:border-l')}
            >
              <div className="font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em]">{stat.num}</div>
              <div className="mt-1 text-[12.5px] font-semibold tracking-[0.02em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
