import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1120px] px-6', className)}>{children}</div>
}

/** A big rounded section card — every content section sits in one. */
export function SectionCard({
  id,
  tint = false,
  className,
  children,
}: {
  id?: string
  /** Soft-tinted variant for alternating rhythm. */
  tint?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 px-3 py-2 md:px-6 md:py-2.5">
      <div
        className={cn(
          'mx-auto w-full max-w-[1180px] rounded-[28px] px-5 py-12 md:rounded-[40px] md:px-12 md:py-16',
          tint ? 'bg-[#edf1f7]' : 'bg-card shadow-[0_1px_2px_rgba(16,18,22,0.03),0_16px_40px_rgba(16,18,22,0.05)]',
          className,
        )}
      >
        {children}
      </div>
    </section>
  )
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
        'text-[12.5px] font-extrabold tracking-[0.14em] uppercase text-muted-foreground',
        center && 'text-center',
        className,
      )}
    >
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
