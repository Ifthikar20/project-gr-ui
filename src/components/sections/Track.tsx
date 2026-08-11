import { useCallback, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { RunScreenDemo, type LiveStats } from '@/components/RunScreenDemo'

export function Track() {
  const [live, setLive] = useState<LiveStats>({ km: '0.0', cards: 0, pace: '–:––', streak: 12 })
  const onLive = useCallback((s: LiveStats) => setLive(s), [])

  const tiles = [
    { label: 'Distance', num: live.km, unit: 'km' },
    { label: 'Cards found', num: String(live.cards) },
    { label: 'Avg pace', num: live.pace, unit: '/km' },
    { label: 'Day streak', num: String(live.streak) },
  ]

  return (
    <section id="track" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal className="min-w-0">
            <div className="grid place-items-center rounded-[30px] bg-gradient-to-b from-wash-blue to-[#eef3fb] px-3 py-8 sm:px-6 sm:py-10 md:px-6 md:py-12 lg:px-10">
              <RunScreenDemo onLive={onLive} />
            </div>
          </Reveal>
          <Reveal delay={1} className="min-w-0">
            <Kicker>Track</Kicker>
            <SectionTitle>A real fitness tracker, wrapped around a hunt.</SectionTitle>
            <SectionLead className="mb-7">
              Every run is measured like it should be. The cards are the reason to lace up — the fitness is what you
              keep either way. This is the real run screen: get within reach and the find is collected mid-stride.
            </SectionLead>
            <div className="grid grid-cols-2 gap-4">
              {tiles.map((tile) => (
                <Card
                  key={tile.label}
                  className="rounded-[20px] border-border/60 py-5 shadow-sm transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-md"
                >
                  <CardContent className="px-5">
                    <div className="text-xs font-bold tracking-[0.04em] uppercase text-muted-foreground">
                      {tile.label}
                    </div>
                    <div className="mt-1.5 font-display text-[clamp(26px,3.6vw,36px)] font-bold tracking-[-0.02em] tabular-nums">
                      <span key={tile.num} className="stat-tick inline-block">
                        {tile.num}
                      </span>
                      {tile.unit && <small className="ml-0.5 text-[0.5em] font-bold text-muted-foreground">{tile.unit}</small>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
