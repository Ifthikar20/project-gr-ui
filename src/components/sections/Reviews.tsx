import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Container, Kicker, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'

const reviews = [
  {
    body: "“I ran 6 km chasing a legendary that turned out to be common. Ran it again the next day anyway. That's the trap — in the best way.”",
    initials: 'SM',
    name: 'Sam M.',
    meta: 'TestFlight · 41 cards',
  },
  {
    body: "“Found an artifact nobody else had. My name's on the card now. I've never cared this much about a 5k.”",
    initials: 'DP',
    name: 'Devi P.',
    meta: 'TestFlight · first-finder ×3',
  },
  {
    body: "“The fact cards get me. I'm collecting a whole deck about my own city while my pace quietly drops every week.”",
    initials: 'JR',
    name: 'Jordan R.',
    meta: 'TestFlight · 12-day streak',
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-muted/50 py-16 md:py-24">
      <Container>
        <Reveal className="text-center">
          <Kicker center>From the beta</Kicker>
          <SectionTitle className="mx-auto max-w-[24ch]">
            Runners who came for the cards, stayed for the miles.
          </SectionTitle>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.initials} delay={i} className="h-full">
              <Card className="h-full rounded-[30px] border-border/60 py-6 shadow-sm">
                <CardContent className="flex h-full flex-col gap-3.5 px-6">
                  <div className="flex gap-1 text-rarity-legendary" aria-label="5 out of 5">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="size-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="text-[15.5px] leading-relaxed">{review.body}</blockquote>
                  <div className="mt-auto flex items-center gap-3 pt-1">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-foreground text-[13px] font-bold text-background">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <b className="block text-sm">{review.name}</b>
                      <span className="text-[12.5px] text-muted-foreground">{review.meta}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
