import { Badge } from '@/components/ui/badge'
import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { CollectibleCard } from '@/components/cards/CollectibleCard'
import { MiniCard } from '@/components/cards/MiniCard'
import { galleryEntries, miniCards } from '@/components/cards/data'

const tagBg = {
  common: 'bg-rarity-common',
  uncommon: 'bg-rarity-uncommon',
  rare: 'bg-rarity-rare',
  epic: 'bg-rarity-epic',
  legendary: 'bg-rarity-legendary',
} as const

export function CardTypes() {
  return (
    <section id="cards" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal className="text-center">
          <Kicker center>Five kinds of find</Kicker>
          <SectionTitle className="mx-auto">
            Gems. Gear. Creatures.
            <br />
            Artifacts. Facts.
          </SectionTitle>
          <SectionLead className="mx-auto">Every card is one of five. Tilt one — the good ones shimmer.</SectionLead>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-8 [perspective:1400px]">
          {galleryEntries.map((entry) => (
            <Reveal key={entry.type} delay={entry.delay} className="flex flex-col items-center gap-4">
              <CollectibleCard data={entry.card} />
              <div className="max-w-[300px] text-center">
                <h3 className="flex items-center justify-center gap-2 font-display text-xl font-bold">
                  {entry.type}
                  <Badge
                    className={`${tagBg[entry.tagTier]} rounded-[7px] border-0 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.05em] uppercase text-white`}
                  >
                    {entry.tag}
                  </Badge>
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-foreground/70">{entry.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* the binder */}
        <Reveal className="mt-16 md:mt-20">
          <div className="mx-auto max-w-[620px] text-center">
            <h3 className="font-display text-[clamp(21px,2.6vw,26px)] font-bold tracking-[-0.015em]">
              …and the binder runs deep.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">
              Golden shoes that only drop after a personal best. Boots that outlast winters. Animals that show at dawn
              and vanish by seven. 500 cards at launch — new sets every season.
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 gap-4 md:grid-cols-4">
            {miniCards.map((mini) => (
              <MiniCard key={mini.name} data={mini} />
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] font-semibold text-muted-foreground">
            500 cards at launch · 5 types · 5 rarities · all found on foot
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
