import { useId, useRef, useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Reveal } from '@/components/Reveal'

/* The closing CTA as a full-width image banner: a dawn run — the hour
   First Light Ember surfaces — with the waitlist form over the scene. */

function DawnRunScene() {
  const id = useId()
  const sky = `${id}-sky`
  const sun = `${id}-sun`
  const glow = `${id}-glow`
  const road = `${id}-road`
  return (
    <svg
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#221d33" />
          <stop offset="0.45" stopColor="#4a3352" />
          <stop offset="0.68" stopColor="#8a4f56" />
          <stop offset="0.84" stopColor="#d0795a" />
          <stop offset="1" stopColor="#e8a06b" />
        </linearGradient>
        <radialGradient id={sun} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffdf9e" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#ffc16e" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffc16e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#61ff00" stopOpacity="0.45" />
          <stop offset="1" stopColor="#61ff00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={road} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1622" />
          <stop offset="1" stopColor="#100d16" />
        </linearGradient>
      </defs>

      <rect width="1200" height="560" fill={`url(#${sky})`} />

      {/* fading stars up high, the sun on the horizon */}
      <g fill="#ffffff">
        <circle cx="180" cy="70" r="1.4" opacity="0.35" />
        <circle cx="420" cy="46" r="1.2" opacity="0.3" />
        <circle cx="700" cy="84" r="1.4" opacity="0.25" />
        <circle cx="1010" cy="60" r="1.3" opacity="0.3" />
      </g>
      <circle cx="880" cy="356" r="170" fill={`url(#${sun})`} />
      <circle cx="880" cy="356" r="42" fill="#ffe4ae" />

      {/* skyline in dawn plum */}
      <g fill="#171225">
        <rect x="0" y="292" width="64" height="90" />
        <rect x="72" y="262" width="50" height="120" />
        <rect x="130" y="304" width="82" height="78" />
        <rect x="220" y="244" width="46" height="138" />
        <rect x="274" y="288" width="64" height="94" />
        <rect x="348" y="270" width="40" height="112" />
        <rect x="396" y="308" width="86" height="74" />
        <rect x="490" y="252" width="52" height="130" />
        <rect x="550" y="296" width="68" height="86" />
        <rect x="626" y="278" width="44" height="104" />
        <rect x="678" y="314" width="78" height="68" />
        <rect x="764" y="260" width="54" height="122" />
        <rect x="826" y="300" width="70" height="82" />
        <rect x="904" y="280" width="42" height="102" />
        <rect x="954" y="310" width="84" height="72" />
        <rect x="1046" y="272" width="52" height="110" />
        <rect x="1106" y="302" width="94" height="80" />
      </g>
      {/* waking windows */}
      <g fill="#ffd9a0" opacity="0.55">
        <rect x="86" y="278" width="5" height="7" />
        <rect x="232" y="262" width="5" height="7" />
        <rect x="246" y="284" width="5" height="7" />
        <rect x="504" y="270" width="5" height="7" />
        <rect x="778" y="280" width="5" height="7" />
        <rect x="1058" y="288" width="5" height="7" />
      </g>

      {/* road */}
      <rect x="0" y="382" width="1200" height="178" fill={`url(#${road})`} />
      <path d="M0 382 H1200" stroke="#332a42" strokeWidth="2" />
      <path
        d="M40 472 H1160"
        stroke="#b9a8c8"
        strokeWidth="5"
        strokeDasharray="42 54"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* the zone ahead */}
      <circle cx="700" cy="458" r="105" fill={`url(#${glow})`} />
      <ellipse cx="700" cy="464" rx="56" ry="17" fill="none" stroke="#61ff00" strokeWidth="2.5" opacity="0.75" />
      <g transform="translate(700 434)">
        <path d="M0 -11 L9 0 L0 11 L-9 0 Z" fill="#e0a63a" />
      </g>

      {/* runner into first light */}
      <g
        transform="translate(946 436) scale(-1 1)"
        stroke="#fdf4e8"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <circle cx="26" cy="-124" r="13.5" fill="#fdf4e8" stroke="none" />
        <path d="M14 -104 L28 -50" />
        <path d="M16 -98 L48 -80 L64 -102" />
        <path d="M16 -98 L-12 -84 L-24 -56" />
        <path d="M28 -50 L60 -24 L52 12" />
        <path d="M28 -50 L-4 -18 L-32 2" />
      </g>
      <ellipse cx="916" cy="462" rx="110" ry="11" fill="#000000" opacity="0.3" />
    </svg>
  )
}

export function JoinCta() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      inputRef.current?.focus()
      return
    }
    setJoined(true)
  }

  return (
    <section id="join" className="scroll-mt-24 px-3 py-8 md:px-6 md:py-12">
      <Reveal>
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] md:rounded-[40px]">
          <div className="relative min-h-[480px] md:aspect-[1200/560]">
            <DawnRunScene />
            {/* legibility scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,12,22,0.78)_0%,rgba(16,12,22,0.45)_42%,transparent_68%)]"
            />
            <div className="absolute inset-0 z-10 flex flex-col justify-center p-7 md:p-14">
              <div className="max-w-[560px] text-left">
                <h2 className="font-display text-[clamp(30px,4.4vw,52px)] leading-[1.06] font-bold tracking-[-0.028em] text-white">
                  Your city is full of cards you haven't found yet.
                </h2>
                <p className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-white/75">
                  Join the FindRun beta and start collecting the ground you cover.
                </p>
                {!joined ? (
                  <>
                    <form className="mt-7 flex flex-wrap gap-2.5" noValidate onSubmit={onSubmit}>
                      <Input
                        ref={inputRef}
                        type="email"
                        name="email"
                        placeholder="you@email.com"
                        aria-label="Email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 min-w-[230px] max-w-[300px] flex-1 rounded-full border-transparent bg-white/95 px-5 text-[15px] text-[#101216] placeholder:text-[#101216]/45"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="h-12 rounded-full bg-volt px-6 text-[15px] font-semibold text-[#101216] hover:bg-volt/90"
                      >
                        Get my invite
                        <ArrowRight className="size-4" />
                      </Button>
                    </form>
                    <p className="mt-4 text-[12.5px] font-medium text-white/55">
                      iPhone · iOS 17+ · Free during beta · No spam, one invite email.
                    </p>
                  </>
                ) : (
                  <p className="mt-7 text-[16px] font-semibold text-white">
                    You're on the list — check your inbox for a TestFlight invite.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
