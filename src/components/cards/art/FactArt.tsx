import { useId } from 'react'

export function FactArt() {
  const id = useId()
  const bg = `${id}-bg`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2a26" />
          <stop offset="1" stopColor="#2b4038" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="120" r="72" fill="#61ff00" opacity="0.10" />
      <g fill="none" stroke="#8fe8b0" strokeWidth="1.6" opacity="0.8">
        <path d="M78 84 L126 108 L170 76 L216 100" />
        <path d="M126 108 L140 152" />
      </g>
      <g fill="#eafff0">
        <circle cx="78" cy="84" r="3" />
        <circle cx="126" cy="108" r="3.6" />
        <circle cx="170" cy="76" r="2.8" />
        <circle cx="216" cy="100" r="3.2" />
        <circle cx="140" cy="152" r="2.8" />
      </g>
      <path d="M150 118 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="#c9ffd6" opacity="0.95" />
    </svg>
  )
}
