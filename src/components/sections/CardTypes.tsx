import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
    <section id="cards" className="scroll-mt-24 py-14 md:py-20">
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

        <Reveal className="mt-10">
          <Tabs defaultValue={galleryEntries[0].type}>
            <TabsList className="mx-auto flex h-auto flex-wrap justify-center rounded-full p-1">
              {galleryEntries.map((entry) => (
                <TabsTrigger
                  key={entry.type}
                  value={entry.type}
                  className="rounded-full px-4 py-1.5 text-sm font-semibold"
                >
                  {entry.type}
                </TabsTrigger>
              ))}
            </TabsList>
            {galleryEntries.map((entry) => (
              <TabsContent key={entry.type} value={entry.type}>
                <div className="mx-auto mt-8 grid max-w-[880px] items-center justify-items-center gap-10 md:grid-cols-[auto_1fr] md:justify-items-start">
                  <div className="[perspective:1400px]">
                    <CollectibleCard data={entry.card} />
                  </div>
                  <div className="max-w-[52ch] text-center md:text-left">
                    <h3 className="flex items-center justify-center gap-2.5 font-display text-2xl font-bold md:justify-start">
                      {entry.type}
                      <Badge
                        className={`${tagBg[entry.tagTier]} rounded-[7px] border-0 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.05em] uppercase text-white`}
                      >
                        {entry.tag}
                      </Badge>
                    </h3>
                    <p className="mt-3 text-[17px] leading-relaxed text-foreground/70">{entry.blurb}</p>
                    <div className="mt-5 space-y-2.5 text-[15px]">
                      <p>
                        <span className="font-semibold">
                          Ability — {entry.card.use.name} {entry.card.use.val}:
                        </span>{' '}
                        <span className="text-foreground/70">{entry.card.use.text}</span>
                      </p>
                      <p>
                        <span className="font-semibold">Found most —</span>{' '}
                        <span className="text-foreground/70">{entry.card.found.where}.</span>
                      </p>
                    </div>
                    <blockquote className="mt-5 border-l-2 border-border pl-4 text-[15px] italic text-muted-foreground">
                      {entry.card.flavor}
                    </blockquote>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

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
            {miniCards.slice(0, 4).map((mini) => (
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
