import { useId } from 'react'

export function EmeraldArt() {
  const id = useId()
  const bg = `${id}-bg`
  const top = `${id}-top`
  const body = `${id}-body`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16241a" />
          <stop offset="1" stopColor="#25402c" />
        </linearGradient>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dff9e8" />
          <stop offset="1" stopColor="#9fe8bb" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#57d68a" />
          <stop offset="1" stopColor="#2a9a55" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="118" r="76" fill="#61ff00" opacity="0.10" />
      <g transform="translate(150 112)" strokeLinejoin="round">
        <polygon points="-34,-26 34,-26 52,0 0,58 -52,0" fill={`url(#${body})`} />
        <polygon points="-34,-26 34,-26 18,0 -18,0" fill={`url(#${top})`} />
        <polygon points="-34,-26 -18,0 -52,0" fill="#7fe0a5" />
        <polygon points="34,-26 52,0 18,0" fill="#35b268" />
        <polygon points="-18,0 18,0 0,58" fill="#1f7f42" />
      </g>
      <path d="M92 52 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" fill="#ffffff" opacity="0.9" />
      <circle cx="216" cy="172" r="2.4" fill="#ffffff" opacity="0.6" />
    </svg>
  )
}
