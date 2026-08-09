import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from '@/hooks/useReveal'

export function Reveal({
  delay = 0,
  className,
  children,
}: {
  /** Stagger step — multiplied by 90ms, mirroring the old data-reveal-delay. */
  delay?: number
  className?: string
  children: ReactNode
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn('reveal', revealed && 'is-revealed', className)}
      style={delay ? { transitionDelay: `${delay * 90}ms` } : undefined}
    >
      {children}
    </div>
  )
}
