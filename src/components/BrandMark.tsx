import { cn } from '@/lib/utils'

/** The RunnerCard mark: a volt sprinter minted on an ink card. The
    header variant shows the freshly-minted second card behind; the
    footer variant is the single-card cut. */
export function BrandMark({
  variant = 'header',
  className,
}: {
  variant?: 'header' | 'footer'
  className?: string
}) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8 shrink-0', className)}>
      {variant === 'header' && (
        <rect x="9" y="2.5" width="19" height="25" rx="5" transform="rotate(10 18.5 15)" fill="#5F40BF" />
      )}
      <rect x="4.5" y="4" width="20" height="26" rx="5" transform="rotate(-6 14.5 17)" fill="#16181D" />
      <g transform="rotate(-6 14.5 17) translate(2.34 7.19) scale(0.95)">
        <circle cx="16" cy="4" r="2.1" fill="#61FF00" />
        <g stroke="#61FF00" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M14.9 6.8 L11.9 12.3" />
          <path d="M14.6 7.2 L17.7 8.9 L19.3 7.0" />
          <path d="M14.2 7.6 L11.0 8.6 L9.4 10.9" />
          <path d="M11.9 12.3 L16.1 13.5 L15.0 17.6" />
          <path d="M11.9 12.3 L8.9 15.0 L6.3 17.2" />
        </g>
      </g>
    </svg>
  )
}
