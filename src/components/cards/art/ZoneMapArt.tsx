/* A wide, dark miniature of the real run map: city blocks with streets
   between them, the two named regions where cards surface, and a route
   that runs the streets into both — the same picture the run screen
   draws, not a decorative grid of pins. */

const COL: [number, number][] = [
  [2, 54],
  [70, 154],
  [170, 254],
  [270, 354],
  [370, 454],
  [470, 558],
]
const ROW: [number, number][] = [
  [2, 36],
  [52, 88],
  [104, 140],
  [156, 168],
]
const BLOCK_FILLS = ['#171a21', '#1b1f27', '#15181e']

const BLOCKS: { x: number; y: number; w: number; h: number; fill: string }[] = []
COL.forEach(([x0, x1], i) => {
  ROW.forEach(([y0, y1], j) => {
    const w = x1 - x0
    const h = y1 - y0
    const fill = BLOCK_FILLS[(i + j) % BLOCK_FILLS.length]
    if ((i + j) % 3 === 0 && w > 60) {
      BLOCKS.push({ x: x0, y: y0, w: w * 0.55, h, fill })
      BLOCKS.push({ x: x0 + w * 0.62, y: y0, w: w * 0.38, h, fill: BLOCK_FILLS[(i + j + 1) % 3] })
    } else {
      BLOCKS.push({ x: x0, y: y0, w, h, fill })
    }
  })
})

const CEDAR = '0,44 110,44 110,84 250,84 250,138 96,138 96,156 0,156'
const LANTERN = '300,8 420,0 556,0 556,74 500,102 346,102 300,60'
const ROUTE = 'M62 170 V104 Q62 96 70 96 H354 Q362 96 362 88 V52 Q362 44 370 44 H425'

export function ZoneMapArt() {
  return (
    <svg
      viewBox="0 0 560 170"
      preserveAspectRatio="xMidYMid slice"
      aria-label="A city map with two marked regions and a route running the streets into both"
    >
      {/* streets show through as the ground the blocks sit on */}
      <rect width="560" height="170" fill="#23272f" />
      {BLOCKS.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill={b.fill} />
      ))}

      {/* the regions where cards surface */}
      <polygon points={CEDAR} fill="rgba(97,255,0,0.14)" />
      <polygon
        points={CEDAR}
        fill="none"
        stroke="rgba(97,255,0,0.55)"
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeLinejoin="round"
      />
      <polygon points={LANTERN} fill="rgba(120,90,240,0.22)" />
      <polygon
        points={LANTERN}
        fill="none"
        stroke="rgba(155,125,255,0.7)"
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeLinejoin="round"
      />
      <text x="150" y="114" fontSize="9" fontWeight="700" letterSpacing="0.6" fill="rgba(150,255,90,0.85)">
        CEDAR HOLLOW
      </text>
      <text x="356" y="30" fontSize="9" fontWeight="700" letterSpacing="0.6" fill="rgba(185,165,255,0.9)">
        LANTERN HILL
      </text>

      {/* collected */}
      <g transform="translate(236 110)">
        <circle r="7.5" fill="#0b0c0f" opacity="0.75" />
        <path
          d="M-3.2 0 L-1 2.4 L3.4 -2.6"
          fill="none"
          stroke="rgba(150,255,90,0.9)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* the run, along the streets */}
      <path d={ROUTE} fill="none" stroke="#61FF00" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="425" cy="44" r="6" fill="#fff" stroke="#61FF00" strokeWidth="3" />
    </svg>
  )
}
