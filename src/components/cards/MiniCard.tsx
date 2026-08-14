import { cn } from '@/lib/utils'
import type { MiniData } from './data'
import './cards.css'

export function MiniCard({ data }: { data: MiniData }) {
  return (
    <div className={cn('mini', `mini--${data.tier}`)}>
      <div className="mini__art">{data.art}</div>
      <div className="mini__row">
        <b className="mini__name">{data.name}</b>
        <span className="mini__xp">
          {data.xp}
          <i>XP</i>
        </span>
      </div>
      <span className="mini__type">
        <i className="mini__dot" aria-hidden="true" />
        {data.type}
      </span>
    </div>
  )
}
