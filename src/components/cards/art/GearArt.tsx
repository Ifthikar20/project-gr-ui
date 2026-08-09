import { useId } from 'react'

export function GearArt() {
  const id = useId()
  const bg = `${id}-bg`
  const gold = `${id}-gold`
  return (
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2416" />
          <stop offset="1" stopColor="#453a1e" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d878" />
          <stop offset="1" stopColor="#d99e2b" />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#${bg})`} />
      <circle cx="150" cy="122" r="74" fill="#e0a63a" opacity="0.14" />
      <g transform="translate(150 128)">
        <path
          d="M-62 22 C-62 6 -50 -2 -34 -6 C-14 -11 -2 -24 6 -34 C10 -39 16 -38 18 -33 C24 -18 34 -8 52 -2 C62 1 66 8 66 16 L66 24 C66 28 62 30 58 30 L-56 30 C-60 30 -62 27 -62 22 Z"
          fill={`url(#${gold})`}
        />
        <path d="M-62 24 L66 24 L66 30 C66 34 62 36 58 36 L-54 36 C-59 36 -62 33 -62 28 Z" fill="#8a6413" />
        <path d="M2 -28 C12 -20 24 -12 40 -7" stroke="#8a6413" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M-8 -18 C0 -12 12 -5 28 0" stroke="#8a6413" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M14 -34 C22 -46 34 -52 48 -52 C40 -44 36 -36 34 -28 Z" fill="#f6e7b4" />
      </g>
      <path d="M84 60 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" fill="#ffffff" opacity="0.9" />
      <circle cx="222" cy="66" r="2" fill="#ffffff" opacity="0.6" />
    </svg>
  )
}
