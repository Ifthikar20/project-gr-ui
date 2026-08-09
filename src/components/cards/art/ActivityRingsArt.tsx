export function ActivityRingsArt() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-auto w-[min(300px,74vw)]"
      aria-label="Activity rings: distance, cards found and streak"
    >
      <g transform="rotate(-90 120 120)" fill="none" strokeLinecap="round" strokeWidth="18">
        <circle cx="120" cy="120" r="100" stroke="rgba(16,18,22,0.08)" />
        <circle cx="120" cy="120" r="100" stroke="#101216" strokeDasharray="490 640" />
        <circle cx="120" cy="120" r="76" stroke="rgba(16,18,22,0.08)" />
        <circle cx="120" cy="120" r="76" stroke="#4f8fe0" strokeDasharray="300 478" />
        <circle cx="120" cy="120" r="52" stroke="rgba(16,18,22,0.08)" />
        <circle cx="120" cy="120" r="52" stroke="#9b6fe0" strokeDasharray="295 327" />
      </g>
      <g textAnchor="middle" style={{ fontFamily: 'var(--font-display)' }}>
        <text x="120" y="114" fontSize="34" fontWeight="800" fill="#101216">5.0</text>
        <text x="120" y="134" fontSize="13" fontWeight="700" fill="rgba(16,18,22,0.52)">KM TODAY</text>
      </g>
    </svg>
  )
}
