import { HeartPulse, Server, Smartphone } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

/* Where your data resides — a dark showcase panel with an embossed
   padlock carrying the FindRun bolt. Copy matches the real privacy
   policy: runs and health data stay on the phone; the server only
   ever sees GPS-verified claims. */

const panelGlow = {
  background: [
    'radial-gradient(90% 110% at 0% 100%, rgba(38, 110, 66, 0.55), transparent 60%)',
    'radial-gradient(90% 110% at 100% 100%, rgba(38, 110, 66, 0.5), transparent 60%)',
    'radial-gradient(70% 80% at 50% 0%, rgba(30, 82, 52, 0.35), transparent 65%)',
    'radial-gradient(60% 55% at 50% 45%, rgba(21, 24, 29, 0.9), rgba(16, 20, 17, 0) 100%)',
  ].join(', '),
}

const residency = [
  { icon: Smartphone, label: 'Runs & routes — on your phone' },
  { icon: HeartPulse, label: 'Health data — read on-device, never uploaded' },
  { icon: Server, label: 'Server — only verified card claims' },
]

function LockMotif() {
  return (
    <svg
      viewBox="0 0 400 470"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-auto -translate-x-1/2 -translate-y-[44%]"
    >
      {/* shackle */}
      <path
        d="M128 208 v-64 a72 72 0 0 1 144 0 v64"
        fill="none"
        stroke="rgba(255,255,255,0.045)"
        strokeWidth="36"
        strokeLinecap="round"
      />
      <path
        d="M128 208 v-64 a72 72 0 0 1 144 0 v64"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="36"
        strokeLinecap="round"
        transform="translate(0 3)"
        opacity="0.5"
      />
      {/* body */}
      <rect x="62" y="200" width="276" height="252" rx="52" fill="rgba(255,255,255,0.035)" />
      <rect
        x="62"
        y="200"
        width="276"
        height="252"
        rx="52"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1.5"
      />
      {/* the FindRun bolt, embossed into the body */}
      <path
        d="M228 240 L148 348 h38 l-11 74 L262 310 h-38 z"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />
    </svg>
  )
}

export function Privacy() {
  return (
    <section id="privacy" className="scroll-mt-24 px-3 py-8 md:px-6 md:py-12">
      <Reveal>
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] bg-[#0e1310] px-6 py-24 text-center md:rounded-[40px] md:py-36">
          <div aria-hidden="true" className="absolute inset-0" style={panelGlow} />
          <LockMotif />
          <div className="relative z-10 mx-auto max-w-[880px]">
            <div className="mx-auto max-w-[560px]">
              <h2 className="font-display text-[clamp(30px,4.4vw,50px)] leading-[1.08] font-bold tracking-[-0.028em] text-white">
                Private by design.
              </h2>
              <p className="mx-auto mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-white/60">
                Your runs, routes and health data live on your phone. The server only ever sees the claims you make —
                GPS-verified, nothing more.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
              {residency.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/75 backdrop-blur-sm"
                >
                  <item.icon className="size-3.5 text-white/50" strokeWidth={2.2} />
                  {item.label}
                </li>
              ))}
            </ul>
            <a
              href="privacy.html"
              className="mt-7 inline-block text-[13.5px] font-semibold text-white/45 transition-colors hover:text-white"
            >
              Read the privacy policy →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
