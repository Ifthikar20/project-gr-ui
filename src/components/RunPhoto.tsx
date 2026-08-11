import { useState } from 'react'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { cn } from '@/lib/utils'

/** Renders assets/run-<n>.jpg, falling back to a labeled placeholder
    until that file exists in public/assets/. */
export function RunPhoto({ n, mono = false }: { n: number; mono?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <PhotoPlaceholder label={`Add run-${n}.jpg`} />
  return (
    <img
      src={`assets/run-${n}.jpg`}
      alt="Runners out on the streets"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', mono && 'grayscale')}
    />
  )
}
