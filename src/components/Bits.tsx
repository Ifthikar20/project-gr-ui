import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1120px] px-6', className)}>{children}</div>
}

export function VoltDot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('inline-block size-[9px] shrink-0 rounded-full bg-volt', className)} />
}

export function Kicker({
  center = false,
  className,
  children,
}: {
  center?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-[12.5px] font-extrabold tracking-[0.14em] uppercase text-muted-foreground',
        center && 'justify-center',
        className,
      )}
    >
      <VoltDot className="size-[7px]" />
      {children}
    </p>
  )
}

export function SectionTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn(
        'mt-3 font-display text-[clamp(28px,3.6vw,40px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function SectionLead({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('mt-4 max-w-[62ch] text-[17px] leading-relaxed text-foreground/70', className)}>{children}</p>
}
