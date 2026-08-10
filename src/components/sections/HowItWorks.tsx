import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Container, Kicker, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'

const steps = [
  { title: 'Open the map', text: 'Active zones glow near you — each one holds cards waiting to be reached.' },
  {
    title: 'Run to the zone',
    text: 'Pick a card, follow your route, and close the distance on foot. Your run is tracked the whole way.',
  },
  {
    title: 'The card reveals',
    text: 'Get within 200 ft and the card flips — gem, gear, creature, artifact or fact. First one there takes it.',
  },
  {
    title: 'Keep it forever',
    text: 'It lands in your collection with the zone, date and rarity stamped on it. Yours, permanently.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <Reveal className="text-center">
          <Kicker center>How you find a card</Kicker>
          <SectionTitle>Four steps. One good run.</SectionTitle>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i} className="relative">
              <Card className="h-full rounded-[20px] border-border/60 py-6 shadow-sm">
                <CardContent className="px-6">
                  <div className="grid size-[30px] place-items-center rounded-full border border-border bg-secondary font-display text-sm font-bold text-foreground">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-[17.5px] font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-foreground/70">{step.text}</p>
                </CardContent>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute top-11 -right-[14px] z-10 hidden size-[26px] text-foreground/15 lg:block"
                  strokeWidth={2.4}
                />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
