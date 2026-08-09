import { cn } from '@/lib/utils'
import { useCardTilt } from '@/hooks/useCardTilt'
import type { CardData } from './data'
import './cards.css'

const boltGlyph = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2 L4 14 h6 l-1 8 l9-12 h-6 z" fill="currentColor" />
  </svg>
)

export function CollectibleCard({
  data,
  float = false,
  heroHeading = false,
  compact = false,
  ariaLabel,
}: {
  data: CardData
  /** Idle float animation (hero card). */
  float?: boolean
  /** Render the card name as an h2 (hero) instead of h3 (gallery). */
  heroHeading?: boolean
  /** Name/art/band/stats only, with larger type — drops the fine-print blocks. */
  compact?: boolean
  ariaLabel?: string
}) {
  const ref = useCardTilt<HTMLElement>()
  const Name = heroHeading ? 'h2' : 'h3'
  return (
    <article
      ref={ref}
      className={cn(
        'card',
        `card--${data.edge}`,
        'card--interactive',
        float && 'card--float',
        compact && 'card--compact',
      )}
      aria-label={ariaLabel ?? data.ariaLabel}
    >
      <div className="card__inner">
        <div className="card__top">
          <span className="card__stage">{data.stage}</span>
          <Name className="card__name">{data.name}</Name>
          <span className="card__value">
            {data.xp}
            <span>XP</span>
          </span>
        </div>
        <div className="card__art">{data.art}</div>
        <div className="card__band">
          <i className="card__pip" aria-hidden="true" />
          {data.band}
        </div>
        <div className="card__stats">
          {data.stats.map((s) => (
            <div key={s.label} className={cn('card__stat', s.volt && 'card__stat--volt')}>
              <b>{s.v}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        {!compact && (
          <>
            <div className="card__use">
              <div className="card__use-head">
                <span className="card__use-ico">{boltGlyph}</span>
                <span className="card__use-name">{data.use.name}</span>
                <span className="card__use-val">{data.use.val}</span>
              </div>
              <p className="card__use-text">{data.use.text}</p>
            </div>
            <div className="card__found">
              <span className="card__found-label">found most</span>
              <span className="card__found-where">{data.found.where}</span>
              <span className="card__found-bar">
                <i style={{ width: `${data.found.pct}%` }} />
              </span>
              <span className="card__found-pct">{data.found.pct}%</span>
            </div>
            <p className="card__flavor">{data.flavor}</p>
            <div className="card__foot">
              <span>{data.foot.left}</span>
              <span className="card__set">{data.foot.right}</span>
            </div>
          </>
        )}
      </div>
      <div className="card__sheen" aria-hidden="true" />
    </article>
  )
}
