import { useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Container, VoltDot } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'

const ctaGlow = {
  background: [
    'radial-gradient(34% 42% at 24% 80%, rgba(122, 180, 255, 0.45), transparent 70%)',
    'radial-gradient(30% 40% at 52% 88%, rgba(151, 235, 178, 0.45), transparent 70%)',
    'radial-gradient(30% 40% at 80% 82%, rgba(255, 168, 212, 0.4), transparent 70%)',
  ].join(', '),
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
    <section id="join" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-border/60 bg-card px-6 py-16 text-center shadow-sm md:py-24">
            {/* pastel blob, ported from the legacy .cta::before */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[30%] -left-[10%] -right-[10%] h-[80%] opacity-60 blur-[46px]"
              style={ctaGlow}
            />
            <div className="relative z-10 mx-auto max-w-[620px]">
              <h2 className="font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] font-bold tracking-[-0.028em]">
                Your city is full of cards
                <br />
                you haven't <span className="text-volt-deep">found yet</span>.
              </h2>
              <p className="mt-4 text-[17.5px] text-foreground/70">
                Join the FindRun beta and start collecting the ground you cover.
              </p>
              {!joined ? (
                <>
                  <form className="mt-7 flex flex-wrap justify-center gap-2.5" noValidate onSubmit={onSubmit}>
                    <Input
                      ref={inputRef}
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      aria-label="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 min-w-[250px] max-w-[340px] flex-1 rounded-full border-transparent bg-background px-5 text-[15.5px] shadow-sm"
                    />
                    <Button type="submit" size="lg" className="h-12 rounded-full px-7 text-[15px]">
                      <VoltDot className="size-[7px]" />
                      Get my invite
                    </Button>
                  </form>
                  <p className="mt-4 text-[13px] font-medium text-muted-foreground">
                    iPhone · iOS 17+ · Free during beta · No spam, one invite email.
                  </p>
                </>
              ) : (
                <p className="mt-6 font-semibold text-volt-deep">
                  You're on the list — check your inbox for a TestFlight invite.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
