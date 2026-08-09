import { useId } from 'react'

export function ZoneMapArt() {
  const id = useId()
  const glow = `${id}-glow`
  return (
    <svg
      viewBox="0 0 300 260"
      className="h-auto w-[min(300px,74vw)]"
      aria-label="A stylised map with three glowing zones and a running route"
    >
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#61ff00" stopOpacity="0.55" />
          <stop offset="1" stopColor="#61ff00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="300" height="260" rx="20" fill="#12141b" />
      <g stroke="#1f2430" strokeWidth="2">
        <path d="M0 60 H300 M0 130 H300 M0 200 H300" />
        <path d="M60 0 V260 M140 0 V260 M220 0 V260" />
      </g>
      <rect x="150" y="140" width="80" height="60" rx="8" fill="#161b16" stroke="#243024" strokeWidth="2" />
      {/* zones */}
      <circle cx="72" cy="70" r="34" fill={`url(#${glow})`} />
      <circle cx="72" cy="70" r="20" fill="none" stroke="#61ff00" strokeWidth="2.5" />
      <circle cx="210" cy="96" r="30" fill={`url(#${glow})`} />
      <circle cx="210" cy="96" r="16" fill="none" stroke="#61ff00" strokeWidth="2.5" opacity="0.85" />
      <circle cx="120" cy="188" r="36" fill={`url(#${glow})`} />
      <circle cx="120" cy="188" r="22" fill="none" stroke="#61ff00" strokeWidth="2.5" />
      {/* route */}
      <path
        d="M40 220 Q72 150 72 70 Q72 40 120 60 Q170 82 210 96"
        fill="none"
        stroke="#4f8fe0"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 10"
      />
      {/* gem markers */}
      <g transform="translate(72 70)"><path d="M0 -9 L8 0 L0 9 L-8 0 Z" fill="#e0a63a" /></g>
      <g transform="translate(210 96)"><path d="M0 -8 L7 0 L0 8 L-7 0 Z" fill="#9b6fe0" /></g>
      <g transform="translate(120 188)"><path d="M0 -9 L8 0 L0 9 L-8 0 Z" fill="#4f8fe0" /></g>
      {/* runner puck */}
      <circle cx="40" cy="220" r="8" fill="#61ff00" stroke="#0b0c0f" strokeWidth="2" />
    </svg>
  )
}
