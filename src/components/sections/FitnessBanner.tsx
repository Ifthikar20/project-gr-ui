import { useId } from 'react'
import { ChartNoAxesColumn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/Reveal'

/* The fitness statement — a wide showcase panel in the style of a photo
   card: designed night-run scene (skyline, road, a zone glowing ahead of
   the runner pictogram), caption bottom-left, pill buttons below. */

function NightRunScene() {
  const id = useId()
  const sky = `${id}-sky`
  const glow = `${id}-glow`
  const road = `${id}-road`
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12141b" />
          <stop offset="0.55" stopColor="#1a2030" />
          <stop offset="0.78" stopColor="#2b3350" />
          <stop offset="1" stopColor="#232c42" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#61ff00" stopOpacity="0.5" />
          <stop offset="1" stopColor="#61ff00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={road} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#171a22" />
          <stop offset="1" stopColor="#0e1016" />
        </linearGradient>
      </defs>

      <rect width="1200" height="520" fill={`url(#${sky})`} />

      {/* stars + moon */}
      <g fill="#ffffff">
        <circle cx="150" cy="80" r="1.6" opacity="0.5" />
        <circle cx="320" cy="52" r="1.2" opacity="0.35" />
        <circle cx="520" cy="96" r="1.6" opacity="0.45" />
        <circle cx="760" cy="48" r="1.3" opacity="0.4" />
        <circle cx="980" cy="88" r="1.8" opacity="0.5" />
        <circle cx="1120" cy="140" r="1.2" opacity="0.35" />
        <circle cx="640" cy="150" r="1.1" opacity="0.3" />
      </g>
      <circle cx="1042" cy="98" r="30" fill="#e8e6da" opacity="0.85" />
      <circle cx="1032" cy="90" r="9" fill="#d5d3c6" opacity="0.5" />

      {/* skyline */}
      <g fill="#0c0e14">
        <rect x="0" y="252" width="70" height="90" />
        <rect x="78" y="222" width="52" height="120" />
        <rect x="138" y="266" width="84" height="76" />
        <rect x="230" y="204" width="46" height="138" />
        <rect x="284" y="248" width="66" height="94" />
        <rect x="360" y="230" width="40" height="112" />
        <rect x="408" y="270" width="88" height="72" />
        <rect x="504" y="212" width="52" height="130" />
        <rect x="564" y="258" width="70" height="84" />
        <rect x="642" y="238" width="44" height="104" />
        <rect x="694" y="276" width="80" height="66" />
        <rect x="782" y="220" width="56" height="122" />
        <rect x="846" y="262" width="72" height="80" />
        <rect x="926" y="240" width="42" height="102" />
        <rect x="976" y="272" width="86" height="70" />
        <rect x="1070" y="234" width="54" height="108" />
        <rect x="1132" y="264" width="68" height="78" />
      </g>
      {/* lit windows */}
      <g fill="#f6d878" opacity="0.5">
        <rect x="92" y="238" width="5" height="7" />
        <rect x="106" y="256" width="5" height="7" />
        <rect x="242" y="222" width="5" height="7" />
        <rect x="256" y="244" width="5" height="7" />
        <rect x="518" y="230" width="5" height="7" />
        <rect x="530" y="252" width="5" height="7" />
        <rect x="796" y="240" width="5" height="7" />
        <rect x="810" y="262" width="5" height="7" />
        <rect x="938" y="256" width="5" height="7" />
        <rect x="1084" y="250" width="5" height="7" />
      </g>

      {/* road */}
      <rect x="0" y="342" width="1200" height="178" fill={`url(#${road})`} />
      <path d="M0 342 H1200" stroke="#2a3040" strokeWidth="2" />
      {/* lane dashes */}
      <path
        d="M40 436 H1160"
        stroke="#9aa3b8"
        strokeWidth="5"
        strokeDasharray="42 54"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* the zone ahead */}
      <circle cx="585" cy="420" r="110" fill={`url(#${glow})`} />
      <ellipse cx="585" cy="428" rx="58" ry="18" fill="none" stroke="#61ff00" strokeWidth="2.5" opacity="0.8" />
      <g transform="translate(585 396)">
        <path d="M0 -11 L9 0 L0 11 L-9 0 Z" fill="#e0a63a" />
      </g>

      {/* runner pictogram, mid-stride toward the zone */}
      <g
        transform="translate(830 396) scale(-1 1)"
        stroke="#f4f6fb"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <circle cx="26" cy="-124" r="13.5" fill="#f4f6fb" stroke="none" />
        {/* torso, leaning into the stride */}
        <path d="M14 -104 L28 -50" />
        {/* arms pumping at 90° */}
        <path d="M16 -98 L48 -80 L64 -102" />
        <path d="M16 -98 L-12 -84 L-24 -56" />
        {/* front leg driving, back leg pushing off */}
        <path d="M28 -50 L60 -24 L52 12" />
        <path d="M28 -50 L-4 -18 L-32 2" />
      </g>
      {/* grounded soft shadow */}
      <ellipse cx="800" cy="422" rx="110" ry="11" fill="#000000" opacity="0.3" />
    </svg>
  )
}

export function FitnessBanner() {
  return (
    <section id="fitness" className="scroll-mt-24 px-3 py-8 md:px-6 md:py-12">
      <Reveal>
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] md:rounded-[40px]">
          <div className="relative aspect-[1200/520] min-h-[360px]">
            <NightRunScene />
            {/* caption scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,10,14,0.72),rgba(8,10,14,0.12)_45%,transparent_65%)]"
            />
            <div className="absolute bottom-0 left-0 z-10 max-w-[520px] p-7 text-left md:p-11">
              <ChartNoAxesColumn className="size-8 text-white" strokeWidth={2.4} />
              <p className="mt-4 text-[clamp(17px,2vw,22px)] leading-snug font-semibold text-white">
                Keep the fitness level up — distance, pace, splits and streaks, tracked on every hunt.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={1}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild className="h-12 rounded-full px-7 text-[15px]">
            <a href="#join">Join the beta</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 rounded-full border-transparent bg-card px-7 text-[15px] shadow-sm">
            <a href="#track">Check the tracker</a>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
