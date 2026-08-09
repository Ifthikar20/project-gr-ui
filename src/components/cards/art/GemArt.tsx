import { useId } from 'react'

export function GemArt() {
  const id = useId()
  const bg = `${id}-bg`
  const top = `${id}-top`
  const body = `${id}-body`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#20242e" />
          <stop offset="1" stopColor="#343b4d" />
        </linearGradient>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dff6ff" />
          <stop offset="1" stopColor="#9fd8ff" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6cb9ff" />
          <stop offset="1" stopColor="#3a6fe0" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="118" r="76" fill="#61ff00" opacity="0.10" />
      <g transform="translate(150 112)" strokeLinejoin="round">
        <polygon points="-34,-26 34,-26 52,0 0,58 -52,0" fill={`url(#${body})`} />
        <polygon points="-34,-26 34,-26 18,0 -18,0" fill={`url(#${top})`} />
        <polygon points="-34,-26 -18,0 -52,0" fill="#8ecbff" />
        <polygon points="34,-26 52,0 18,0" fill="#5090ee" />
        <polygon points="-18,0 18,0 0,58" fill="#2f5bd0" />
      </g>
      <path d="M92 52 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" fill="#ffffff" opacity="0.9" />
      <circle cx="216" cy="172" r="2.4" fill="#ffffff" opacity="0.6" />
    </svg>
  )
}
