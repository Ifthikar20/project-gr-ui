import { useState } from 'react'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { cn } from '@/lib/utils'

/** Renders assets/run-<n>.jpg, falling back to a labeled placeholder
    until that file exists in public/assets/. */
export function RunPhoto({
  n,
  mono = false,
  className,
  align,
}: {
  n: number
  mono?: boolean
  /** Extra img classes — e.g. an object-position tweak for the crop. */
  className?: string
  /** Passed to the fallback placeholder to keep its marker clear of overlays. */
  align?: 'center' | 'right'
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <PhotoPlaceholder label={`Add run-${n}.jpg`} align={align} />
  return (
    <img
      src={`assets/run-${n}.jpg`}
      alt="Runners out on the streets"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', mono && 'grayscale', className)}
    />
  )
}
