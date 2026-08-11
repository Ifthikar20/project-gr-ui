import { useState } from 'react'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { cn } from '@/lib/utils'

/** Renders assets/running-sf.jpg, falling back to the placeholder until
    that file exists in public/assets/. */
export function RunPhoto({ mono = false }: { mono?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <PhotoPlaceholder label="Add running-sf.jpg" />
  return (
    <img
      src="assets/running-sf.jpg"
      alt="Runners out on the streets"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', mono && 'object-[70%_30%] grayscale')}
    />
  )
}
