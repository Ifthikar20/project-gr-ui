import { Card, CardContent } from '@/components/ui/card'
import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { RarityGlyph, type RarityTier } from '@/components/cards/art/RarityGlyph'

const tiers: { tier: RarityTier; name: string; odds: string; desc: string; bg: string }[] = [
  {
    tier: 'common',
    name: 'Common',
    odds: '~ 6 in 10',
    desc: 'The everyday find. Keeps your streak and your deck growing.',
    bg: 'bg-rarity-common',
  },
  {
    tier: 'uncommon',
    name: 'Uncommon',
    odds: '~ 1 in 4',
    desc: 'A little further out. Worth the extra half-mile.',
    bg: 'bg-rarity-uncommon',
  },
  {
    tier: 'rare',
    name: 'Rare',
    odds: '~ 1 in 12',
    desc: 'Most fact cards and the sharper gems live here.',
    bg: 'bg-rarity-rare',
  },
  {
    tier: 'epic',
    name: 'Epic',
    odds: '~ 1 in 60',
    desc: 'Artifacts surface here — first finder gets the credit.',
    bg: 'bg-rarity-epic',
  },
  {
    tier: 'legendary',
    name: 'Legendary',
    odds: '~ 1 in 900',
    desc: 'The holo chase cards. Toughest zones, longest runs, brightest shimmer.',
    bg: 'bg-rarity-legendary',
  },
]

export function Rarity() {
  return (
    <section id="rarity" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal>
          <Kicker>Rarity</Kicker>
          <SectionTitle>
            Five tiers.
            <br />
            The rare ones make you run further.
          </SectionTitle>
          <SectionLead>
            Every card carries a tier. Commons keep the streak alive; legendaries surface once in a blue moon and only
            in the toughest zones.
          </SectionLead>
        </Reveal>
        <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {tiers.map((tier, i) => (
            <Reveal key={tier.tier} delay={i}>
              <Card className="relative h-full overflow-hidden rounded-[20px] border-border/60 py-5 shadow-sm">
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${tier.bg}`} />
                <CardContent className="px-4">
                  <div
                    className={`grid size-10 place-items-center rounded-xl text-white shadow-md ${tier.bg}`}
                    aria-hidden="true"
                  >
                    <RarityGlyph tier={tier.tier} />
                  </div>
                  <h3 className="mt-3 font-display text-[16.5px] font-bold">{tier.name}</h3>
                  <p className="mt-0.5 text-[12.5px] font-bold tracking-[0.02em] text-muted-foreground">{tier.odds}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-foreground/70">{tier.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
