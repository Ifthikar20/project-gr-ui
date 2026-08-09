import { useId } from 'react'

export function ArtifactArt() {
  const id = useId()
  const bg = `${id}-bg`
  const stone = `${id}-stone`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262031" />
          <stop offset="1" stopColor="#3c3350" />
        </linearGradient>
        <linearGradient id={stone} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbb8ee" />
          <stop offset="0.5" stopColor="#a586dd" />
          <stop offset="1" stopColor="#7e5cc0" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="112" r="72" fill="#b06bff" opacity="0.12" />
      <g transform="translate(150 118)">
        <polygon points="-15,62 15,62 10,-46 -10,-46" fill={`url(#${stone})`} />
        <polygon points="-10,-46 10,-46 0,-66" fill="#d8c8f4" />
        <ellipse cx="0" cy="10" rx="52" ry="16" fill="none" stroke="#c9b2f0" strokeWidth="2" opacity="0.65" />
        <circle cx="52" cy="10" r="3.4" fill="#e0a63a" />
      </g>
      <circle cx="92" cy="54" r="2" fill="#ffffff" opacity="0.7" />
      <circle cx="222" cy="70" r="1.6" fill="#ffffff" opacity="0.55" />
    </svg>
  )
}
