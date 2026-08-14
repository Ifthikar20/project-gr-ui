import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from '@/hooks/useReveal'

export function Reveal({
  delay = 0,
  stagger = false,
  className,
  children,
}: {
  /** Stagger step — multiplied by 90ms, mirroring the old data-reveal-delay. */
  delay?: number
  /** Animate direct children in sequence instead of the block as one. */
  stagger?: boolean
  className?: string
  children: ReactNode
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn(stagger ? 'reveal-stagger' : 'reveal', revealed && 'is-revealed', className)}
      style={delay ? { transitionDelay: `${delay * 90}ms` } : undefined}
    >
      {children}
    </div>
  )
}
