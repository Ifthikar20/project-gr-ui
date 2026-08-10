import { Star } from 'lucide-react'
import { Container, Kicker, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'

interface Review {
  title: string
  quote: string
  who: string
  meta: string
}

// Sample beta-voice reviews — swap for real TestFlight feedback at launch.
const reviews: Review[] = [
  {
    title: 'Ran it twice anyway',
    quote:
      "“I ran 6 km chasing a legendary that turned out to be common. Ran it again the next day anyway. That's the trap — in the best way.”",
    who: 'Sam M.',
    meta: 'TestFlight · 41 cards',
  },
  {
    title: "My name's on a card now",
    quote:
      "“Found an artifact nobody else had. My name's on the card now. I've never cared this much about a 5k.”",
    who: 'Devi P.',
    meta: 'TestFlight · first-finder ×3',
  },
  {
    title: 'A deck about my own city',
    quote:
      "“The fact cards get me. I'm collecting a whole deck about my own city while my pace quietly drops every week.”",
    who: 'Jordan R.',
    meta: 'TestFlight · 12-day streak',
  },
  {
    title: 'The streak finally stuck',
    quote:
      '“Every tracker guilt-tripped me into running. This one bribes me — and somehow that works. Fourteen days and counting.”',
    who: 'Priya K.',
    meta: 'TestFlight · 26 cards',
  },
  {
    title: 'Zones changed my routes',
    quote:
      '“I used to run the same loop every day. Now I detour two blocks because a zone lit up. My easy runs got longer without me noticing.”',
    who: 'Marco T.',
    meta: 'TestFlight · 33 cards',
  },
  {
    title: 'Genuinely good tracker',
    quote:
      "“Pace, splits, streaks — it holds up as a plain running app even when I'm not chasing anything. The cards are the dessert.”",
    who: 'Lena W.',
    meta: 'TestFlight · 58 cards',
  },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="w-[340px] flex-none rounded-[26px] bg-[#e9effa] p-7 text-left">
      <div className="flex gap-0.5 text-rarity-legendary" aria-label="5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-[18px] fill-current" strokeWidth={0} />
        ))}
      </div>
      <h3 className="mt-3.5 text-[16px] font-bold">{review.title}</h3>
      <p className="mt-1 text-[13.5px] text-foreground/50">
        {review.who}, {review.meta}
      </p>
      <blockquote className="mt-3 text-[15px] leading-relaxed text-foreground/80">{review.quote}</blockquote>
    </article>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <Reveal className="text-center">
          <Kicker center>From the beta</Kicker>
          <SectionTitle className="mx-auto max-w-[24ch]">
            Runners who came for the cards, stayed for the miles.
          </SectionTitle>
        </Reveal>
      </Container>
      <Reveal delay={1}>
        <div className="marquee mt-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto">
          <div className="marquee-track flex w-max">
            <div className="flex w-max gap-5 pr-5">
              {reviews.map((review) => (
                <ReviewCard key={review.title} review={review} />
              ))}
            </div>
            <div className="flex w-max gap-5 pr-5" aria-hidden="true">
              {reviews.map((review) => (
                <ReviewCard key={review.title} review={review} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
