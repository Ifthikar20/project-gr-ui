import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { Reveal } from '@/components/Reveal'

/* The closing CTA as a full-width photo banner: headline and the
   waitlist form over the image slot (placeholder until photography). */

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
            <PhotoPlaceholder label="City-run photo here" align="right" />
            {/* legibility scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,12,22,0.8)_0%,rgba(16,12,22,0.45)_42%,transparent_70%)]"
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
