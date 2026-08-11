import { useState } from 'react'
import { GemArt } from '@/components/cards/art/GemArt'

/** Renders assets/gem-<n>.png when it exists in public/assets/,
    otherwise the illustrated gem card art. Rendered contained on a wash
    so photographic or transparent renders both sit well in a card. */
export function GemPhoto({ n }: { n: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <GemArt />
  return (
    <img
      src={`assets/gem-${n}.png`}
      alt="A RunnerCard gem card"
      onError={() => setFailed(true)}
      className="h-full w-full bg-[#eef1f7] object-contain p-8"
    />
  )
}
