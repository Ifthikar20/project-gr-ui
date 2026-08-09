import { cn } from '@/lib/utils'

/** The FindRun card-with-bolt logo. Header variant carries the volt outline ring. */
export function BrandMark({
  variant = 'header',
  className,
}: {
  variant?: 'header' | 'footer'
  className?: string
}) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8 shrink-0', className)}>
      <rect
        x="6"
        y="3"
        width="20"
        height="26"
        rx="4.5"
        transform="rotate(-8 16 16)"
        fill={variant === 'header' ? '#17150f' : '#221f17'}
      />
      {variant === 'header' && (
        <rect
          x="6"
          y="3"
          width="20"
          height="26"
          rx="4.5"
          transform="rotate(-8 16 16)"
          fill="none"
          stroke="#61ff00"
          strokeWidth="1.4"
          opacity="0.5"
        />
      )}
      <path d="M18 7 L11 18 h4.2 l-1.2 7 L21 14 h-4.2 z" fill="#61ff00" />
    </svg>
  )
}
