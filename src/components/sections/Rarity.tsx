import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
        <Reveal className="text-center">
          <Kicker center>Rarity</Kicker>
          <SectionTitle className="mx-auto">
            Five tiers.
            <br />
            The rare ones make you run further.
          </SectionTitle>
          <SectionLead className="mx-auto">
            Every card carries a tier. Commons keep the streak alive; legendaries surface once in a blue moon and only
            in the toughest zones.
          </SectionLead>
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-[780px]">
          <div className="overflow-hidden rounded-[20px] border border-border/60 bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-12 pl-6 text-[12px] font-bold tracking-[0.06em] uppercase text-muted-foreground">
                    Tier
                  </TableHead>
                  <TableHead className="h-12 text-[12px] font-bold tracking-[0.06em] uppercase text-muted-foreground">
                    Odds
                  </TableHead>
                  <TableHead className="h-12 pr-6 text-[12px] font-bold tracking-[0.06em] uppercase text-muted-foreground">
                    What lives here
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tiers.map((tier) => (
                  <TableRow key={tier.tier} className="border-border/60">
                    <TableCell className="py-4 pl-6">
                      <span className="flex items-center gap-3">
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-lg text-white ${tier.bg}`}
                          aria-hidden="true"
                        >
                          <RarityGlyph tier={tier.tier} className="size-4" />
                        </span>
                        <span className="font-display text-[15.5px] font-bold">{tier.name}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-4 font-display text-[15px] font-bold whitespace-nowrap">
                      {tier.odds}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-[14.5px] leading-relaxed text-foreground/70">
                      {tier.desc}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
