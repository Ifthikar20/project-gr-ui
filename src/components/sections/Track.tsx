import { Card, CardContent } from '@/components/ui/card'
import { Kicker, SectionCard, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { RunScreenDemo } from '@/components/RunScreenDemo'

const tiles = [
  { label: 'Distance', num: '5.0', unit: 'km' },
  { label: 'Cards found', num: '3' },
  { label: 'Avg pace', num: '5:24', unit: '/km' },
  { label: 'Day streak', num: '12' },
]

export function Track() {
  return (
    <SectionCard id="track">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <div className="grid place-items-center rounded-[30px] bg-gradient-to-b from-wash-blue to-[#eef3fb] px-6 py-10 shadow-sm md:px-10 md:py-12">
              <RunScreenDemo />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <Kicker>Track</Kicker>
            <SectionTitle>A real fitness tracker, wrapped around a hunt.</SectionTitle>
            <SectionLead className="mb-7">
              Every run is measured like it should be. The cards are the reason to lace up — the fitness is what you
              keep either way. This is the real run screen: get within reach and the find is collected mid-stride.
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
    </SectionCard>
  )
}
