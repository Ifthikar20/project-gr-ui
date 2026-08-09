export type RarityTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

/** The five brand tier glyphs — dot, diamond, star, shield, crown. */
export function RarityGlyph({ tier }: { tier: RarityTier }) {
  switch (tier) {
    case 'common':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[21px]">
          <circle cx="12" cy="12" r="7" />
        </svg>
      )
    case 'uncommon':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[21px]">
          <path d="M12 3 L20 12 L12 21 L4 12 Z" />
        </svg>
      )
    case 'rare':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[21px]">
          <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" />
        </svg>
      )
    case 'epic':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-[21px]">
          <path d="M4 9 L12 3 L20 9 L17 20 L7 20 Z" strokeLinejoin="round" />
        </svg>
      )
    case 'legendary':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[21px]">
          <path d="M5 19 L3 8 L8 12 L12 4 L16 12 L21 8 L19 19 Z" />
        </svg>
      )
  }
}
