import { Check } from 'lucide-react'
import { AppStoreButton, APP_STORE_URL } from '@/components/AppStoreButton'
import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'

/* Two prices, nothing else (docs/08: monetization is cosmetic only —
   never pay-for-XP, never paid shields). Free IS the game; Club sells
   shine. The layout borrows the classic SaaS pricing-card grammar:
   name, price, blurb, CTA, "this includes" checklist — cut down to the
   only two columns we'll ever need. */

type Tier = {
  name: string
  price: string
  period: string
  blurb: string
  includesLabel: string
  features: string[]
  highlight?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    blurb: 'The whole game. Every zone, every mint, the full binder — nothing about collecting is ever gated.',
    includesLabel: 'This includes:',
    features: [
      'Every zone, every day',
      'Unlimited card mints — earned on foot',
      'All five card types, all five rarities',
      'Distance, pace and streak tracking',
      'Friends board and player search',
    ],
  },
  {
    name: 'Club',
    price: '$3.99',
    period: '/mo',
    blurb: 'For collectors who want their binder to look the part. Pure cosmetics — the map plays identical.',
    includesLabel: 'Everything in Free, plus:',
    features: [
      'Foil card frames and binder themes',
      'Custom card backs and profile flair',
      'Gem skins for the finds you show off',
      'Early look at new card sets',
      'Supporter badge on the boards',
    ],
    highlight: true,
  },
]

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={
        tier.highlight
          ? 'flex flex-col rounded-[24px] border-[1.5px] border-foreground bg-card p-7 shadow-md'
          : 'flex flex-col rounded-[24px] border border-border/60 bg-card p-7 shadow-sm'
      }
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[19px] font-bold">{tier.name}</h3>
        {tier.highlight && (
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold tracking-[0.06em] uppercase text-primary-foreground">
            Supporter
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-[46px] leading-none font-bold tracking-[-0.02em]">{tier.price}</span>
        <span className="text-[14px] font-medium text-muted-foreground">{tier.period}</span>
      </div>
      <p className="mt-3 min-h-[3lh] text-[14.5px] leading-relaxed text-foreground/70">{tier.blurb}</p>
      <div className="mt-5">
        {tier.highlight ? (
          <Button asChild className="h-11 w-full rounded-full text-[14.5px] font-semibold">
            <a href={APP_STORE_URL}>Join in the app</a>
          </Button>
        ) : (
          <AppStoreButton className="h-11 w-full" label="Get the app" shortLabel="Get the app" />
        )}
      </div>
      <p className="mt-6 text-[12px] font-extrabold tracking-[0.1em] uppercase text-muted-foreground">
        {tier.includesLabel}
      </p>
      <ul className="mt-3 space-y-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-foreground/80">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <Reveal className="text-center">
          <Kicker center>Pricing</Kicker>
          <SectionTitle>Free to play. Pay only to show off.</SectionTitle>
          <SectionLead className="mx-auto text-center">
            Two prices, no tricks. The game — zones, mints, the whole collection — costs nothing. Club adds the
            shine.
          </SectionLead>
        </Reveal>
        <Reveal className="mx-auto mt-10 grid max-w-[880px] gap-5 md:grid-cols-2">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </Reveal>
        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-[56ch] text-[13px] leading-relaxed text-muted-foreground">
            Cards are never for sale. Club is cosmetics and flair — never pay-for-XP, no paid shields, no packs. If
            it affects the game, it can't be bought.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
