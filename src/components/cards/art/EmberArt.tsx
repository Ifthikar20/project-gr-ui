import { useId } from 'react'

export function EmberArt() {
  const id = useId()
  const bg = `${id}-bg`
  const flame = `${id}-flame`
  const core = `${id}-core`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b1710" />
          <stop offset="1" stopColor="#4a2714" />
        </linearGradient>
        <linearGradient id={flame} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6b23c" />
          <stop offset="1" stopColor="#e0512a" />
        </linearGradient>
        <linearGradient id={core} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf0c8" />
          <stop offset="1" stopColor="#f6c04c" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="124" r="74" fill="#f08b2c" opacity="0.14" />
      <g strokeLinejoin="round">
        <path
          d="M150 44 C168 70 186 88 186 122 C186 152 170 172 150 176 C130 172 114 152 114 122 C114 106 122 92 130 82 C128 98 132 108 140 112 C136 92 140 66 150 44 Z"
          fill={`url(#${flame})`}
        />
        <path
          d="M150 96 C159 112 168 122 168 140 C168 156 160 166 150 168 C140 166 132 156 132 140 C132 130 137 122 141 116 C140 126 144 132 149 134 C146 122 147 108 150 96 Z"
          fill={`url(#${core})`}
        />
      </g>
      <path d="M96 60 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" fill="#ffffff" opacity="0.9" />
      <circle cx="216" cy="78" r="2.2" fill="#ffd9a0" opacity="0.8" />
      <circle cx="206" cy="176" r="2.6" fill="#ffb45e" opacity="0.65" />
      <circle cx="92" cy="168" r="2" fill="#ffd9a0" opacity="0.55" />
    </svg>
  )
}
