import { cn } from '@/lib/utils'
import { useCardTilt } from '@/hooks/useCardTilt'
import type { CardData } from './data'
import './cards.css'

export function CollectibleCard({
  data,
  float = false,
  heroHeading = false,
  ariaLabel,
}: {
  data: CardData
  /** Idle float animation (hero card). */
  float?: boolean
  /** Render the card name as an h2 (hero) instead of h3 (gallery). */
  heroHeading?: boolean
  ariaLabel?: string
}) {
  const ref = useCardTilt<HTMLElement>()
  const Name = heroHeading ? 'h2' : 'h3'
  return (
    <article
      ref={ref}
      className={cn('card', `card--${data.edge}`, 'card--interactive', float && 'card--float')}
      aria-label={ariaLabel ?? data.ariaLabel}
    >
      <div className="card__art">{data.art}</div>
      <div className="card__body">
        <div className="card__row">
          <Name className="card__name">{data.name}</Name>
          <span className="card__xp">
            {data.xp}
            <span>XP</span>
          </span>
        </div>
        <p className="card__meta">
          <i className="card__dot" aria-hidden="true" />
          {data.band}
        </p>
        <div className="card__stats">
          {data.stats.map((s) => (
            <div key={s.label} className="card__stat">
              <b>{s.v}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card__sheen" aria-hidden="true" />
    </article>
  )
}
