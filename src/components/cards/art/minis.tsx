/* The eight binder mini-card illustrations — flat fills, no gradients. */

const slice = { preserveAspectRatio: 'xMidYMid slice' } as const

export function TrailBootsArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#3a3126" />
      <g transform="translate(150 128)">
        <path d="M-40 -44 L-6 -44 L-6 6 L40 6 C48 6 52 12 52 18 L52 30 L-40 30 Z" fill="#8a6a4a" />
        <path d="M-40 30 L52 30 L52 38 L-40 38 Z" fill="#4c3a26" />
        <path d="M-34 -36 h22 M-34 -22 h22 M-34 -8 h22" stroke="#5c4630" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function NightHeronArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#1d2036" />
      <circle cx="210" cy="58" r="20" fill="#e8e6da" opacity="0.85" />
      <g transform="translate(140 130)" fill="#8d9bc9">
        <path d="M-10 -62 C4 -62 10 -50 8 -38 C6 -28 0 -22 0 -10 L0 26 C0 34 -6 40 -14 40 L-34 40 C-24 34 -18 30 -16 22 C-14 12 -14 -20 -12 -34 C-20 -40 -22 -50 -16 -58 C-14 -60 -12 -62 -10 -62 Z" />
        <circle cx="-6" cy="-52" r="2.4" fill="#171a2c" />
        <path d="M-4 -50 L16 -46 L-2 -42 Z" fill="#d9b45a" />
        <path d="M-8 40 L-8 58 M-20 40 L-20 58" stroke="#8d9bc9" strokeWidth="3" />
      </g>
    </svg>
  )
}

export function RoseQuartzArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#2e2230" />
      <circle cx="150" cy="118" r="58" fill="#e88bb0" opacity="0.12" />
      <g transform="translate(150 116)" strokeLinejoin="round">
        <polygon points="-24,-18 24,-18 36,0 0,40 -36,0" fill="#e88bb0" />
        <polygon points="-24,-18 24,-18 12,0 -12,0" fill="#f7c8da" />
        <polygon points="-12,0 12,0 0,40" fill="#d1608e" />
      </g>
    </svg>
  )
}

export function GhostKoiArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#101c1e" />
      <circle cx="150" cy="120" r="64" fill="#61ff00" opacity="0.06" />
      <g transform="translate(150 122)">
        <path d="M-56 0 C-34 -30 10 -34 34 -14 C46 -4 50 8 44 16 C34 30 -6 32 -32 18 C-44 12 -52 8 -56 0 Z" fill="#e9f2ee" />
        <path d="M34 -14 C48 -22 58 -22 64 -14 C56 -10 52 -4 52 4 C44 0 38 -6 34 -14 Z" fill="#cfe0d8" />
        <circle cx="-30" cy="-6" r="3" fill="#1b2a26" />
        <path d="M-6 -20 C0 -14 2 -6 -2 2" stroke="#f08b4b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M18 -8 C22 -2 22 6 18 12" stroke="#1b2a26" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
      </g>
    </svg>
  )
}

export function StormShellArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#1e2a38" />
      <g transform="translate(150 124)">
        <path d="M-40 -30 C-28 -44 28 -44 40 -30 L54 -6 L40 4 L34 -6 L34 40 L-34 40 L-34 -6 L-40 4 L-54 -6 Z" fill="#4f8fe0" />
        <path d="M0 -38 L0 40" stroke="#2c5a94" strokeWidth="3" />
        <path d="M-14 -38 C-8 -32 8 -32 14 -38" stroke="#2c5a94" strokeWidth="3" fill="none" />
      </g>
      <path d="M226 52 l-8 16 h7 l-9 18" stroke="#f6d878" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SecondWindArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#1b3230" />
      <g fill="none" stroke="#5fd0b2" strokeLinecap="round">
        <path d="M60 96 h96 c26 0 26 -30 4 -30" strokeWidth="7" />
        <path d="M52 128 h130 c30 0 30 34 6 34" strokeWidth="7" opacity="0.8" />
        <path d="M84 160 h64" strokeWidth="7" opacity="0.5" />
      </g>
    </svg>
  )
}

export function TramTokenArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#2a2033" />
      <circle cx="150" cy="118" r="52" fill="#c9a24a" />
      <circle cx="150" cy="118" r="52" fill="none" stroke="#8a6413" strokeWidth="4" />
      <circle cx="150" cy="118" r="36" fill="none" stroke="#8a6413" strokeWidth="2.4" opacity="0.7" />
      <text x="150" y="132" textAnchor="middle" fontFamily="Georgia, serif" fontSize="40" fontWeight="bold" fill="#5c420e">
        T
      </text>
    </svg>
  )
}

export function CitySparrowArt() {
  return (
    <svg viewBox="0 0 300 240" {...slice} aria-hidden="true">
      <rect width="300" height="240" fill="#2c2f36" />
      <g transform="translate(148 124)">
        <path d="M-30 6 C-30 -16 -8 -28 8 -20 C14 -30 26 -30 30 -24 C26 -20 24 -16 24 -10 C24 12 6 26 -12 22 L-2 36 L-14 30 L-20 36 L-18 24 C-26 20 -30 14 -30 6 Z" fill="#b9a684" />
        <circle cx="16" cy="-16" r="2.4" fill="#22242a" />
        <path d="M28 -18 L40 -15 L28 -11 Z" fill="#d9b45a" />
      </g>
    </svg>
  )
}
