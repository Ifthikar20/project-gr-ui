import { useId } from 'react'

export function CreatureArt() {
  const id = useId()
  const bg = `${id}-bg`
  const fur = `${id}-fur`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16241a" />
          <stop offset="1" stopColor="#25402c" />
        </linearGradient>
        <linearGradient id={fur} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f09448" />
          <stop offset="1" stopColor="#d06a1e" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="118" r="72" fill="#61ff00" opacity="0.08" />
      <g transform="translate(150 118)" strokeLinejoin="round">
        <polygon points="-46,-38 -18,-20 -34,-2" fill={`url(#${fur})`} />
        <polygon points="46,-38 18,-20 34,-2" fill={`url(#${fur})`} />
        <polygon points="-46,-38 -40,-10 -22,-24" fill="#8f4513" />
        <polygon points="46,-38 40,-10 22,-24" fill="#8f4513" />
        <polygon points="-36,-6 36,-6 0,52" fill={`url(#${fur})`} />
        <polygon points="-36,-6 -14,10 0,52 -22,26" fill="#f7b678" />
        <polygon points="36,-6 14,10 0,52 22,26" fill="#f7b678" />
        <polygon points="-8,34 8,34 0,44" fill="#2b1a0e" />
        <circle cx="-16" cy="8" r="3.4" fill="#2b1a0e" />
        <circle cx="16" cy="8" r="3.4" fill="#2b1a0e" />
        <polygon points="0,52 -6,62 6,62" fill="#fdf3e4" />
      </g>
      <circle cx="84" cy="56" r="2" fill="#ffffff" opacity="0.6" />
      <circle cx="224" cy="70" r="1.6" fill="#ffffff" opacity="0.5" />
    </svg>
  )
}
