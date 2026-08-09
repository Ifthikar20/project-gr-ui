import type { LucideIcon } from 'lucide-react'
import { ChartNoAxesColumn, Gem, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Gem,
    title: 'Cards worth chasing',
    text: 'Gems, golden running shoes, wild creatures, artifacts never catalogued before, true facts. Some are common. A few are one in a thousand.',
  },
  {
    icon: MapPin,
    title: 'Found in real zones',
    text: "Cards appear in zones seeded by real runs — including routes other people have already covered near you. Get within reach and it's yours.",
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Fitness that counts',
    text: 'Distance, pace, streak and cards-per-mile — tracked on every hunt. The fitter you get, the more ground you cover, the more you find.',
  },
]

export function WhatIs() {
  return (
    <section id="what" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal>
          <Kicker>What is FindRun</Kicker>
          <SectionTitle>A collection you can only build by moving.</SectionTitle>
          <SectionLead>
            FindRun is a fitness game where the rewards are real collectible cards. You don't buy packs — you{' '}
            <strong className="font-semibold text-foreground">earn</strong> them by running to where they surface. Every
            card you own is proof you were there.
          </SectionLead>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i}>
              <Card className="h-full rounded-[24px] border-border/60 py-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="px-7">
                  <div className="grid size-11 place-items-center rounded-[14px] border border-border bg-secondary text-foreground">
                    <feature.icon className="size-[22px]" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 font-display text-[19px] font-bold tracking-[-0.01em]">{feature.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">{feature.text}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
