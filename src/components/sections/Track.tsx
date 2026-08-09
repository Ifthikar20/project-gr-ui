import { Card, CardContent } from '@/components/ui/card'
import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { ActivityRingsArt } from '@/components/cards/art/ActivityRingsArt'

const tiles = [
  { label: 'Distance', num: '5.0', unit: 'km' },
  { label: 'Cards found', num: '3' },
  { label: 'Avg pace', num: '5:24', unit: '/km' },
  { label: 'Day streak', num: '12' },
]

export function Track() {
  return (
    <section id="track" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <div className="grid place-items-center rounded-[30px] bg-gradient-to-b from-wash-blue to-[#eef3fb] p-6 shadow-sm md:p-10">
              <ActivityRingsArt />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <Kicker>Track</Kicker>
            <SectionTitle>A real fitness tracker, wrapped around a hunt.</SectionTitle>
            <SectionLead className="mb-7">
              Every run is measured like it should be. The cards are the reason to lace up — the fitness is what you
              keep either way.
            </SectionLead>
            <div className="grid grid-cols-2 gap-4">
              {tiles.map((tile) => (
                <Card key={tile.label} className="rounded-[20px] border-border/60 py-5 shadow-sm">
                  <CardContent className="px-5">
                    <div className="text-xs font-bold tracking-[0.04em] uppercase text-muted-foreground">
                      {tile.label}
                    </div>
                    <div className="mt-1.5 font-display text-[clamp(26px,3.6vw,36px)] font-bold tracking-[-0.02em]">
                      {tile.num}
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
