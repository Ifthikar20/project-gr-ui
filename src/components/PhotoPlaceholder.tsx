import { Image } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A tasteful stand-in for banner photography. Swap it for a real
    <img className="absolute inset-0 h-full w-full object-cover" /> */
export function PhotoPlaceholder({
  label = 'Your photo here',
  align = 'center',
  className,
}: {
  label?: string
  /** Keep the marker clear of overlaid content. */
  align?: 'center' | 'right'
  className?: string
}) {
  return (
    <div className={cn('absolute inset-0 grid place-items-center overflow-hidden bg-[#171a21]', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.16)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
      />
      <div
        className={cn(
          'relative flex flex-col items-center gap-2.5 text-white/35',
          align === 'right' && 'md:translate-x-[130%]',
        )}
      >
        <Image className="size-9" strokeWidth={1.6} aria-hidden="true" />
        <span className="text-[12px] font-semibold tracking-[0.08em] uppercase">{label}</span>
      </div>
    </div>
  )
}
