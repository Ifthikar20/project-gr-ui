import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Container, Kicker, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'

const faqs = [
  {
    q: 'Do I have to run to get cards?',
    a: "Yes — that's the whole point. Cards surface in zones out in the world, and the only way to collect one is to reach it on foot. Walk it if you like; the app tracks the distance either way.",
  },
  {
    q: "What's a zone?",
    a: "A zone is a patch of the real map that's been activated by a run — yours or another runner's who passed through before you. Active zones are where cards appear, so busier areas have more to find.",
  },
  {
    q: 'What kinds of cards are there?',
    a: 'Five types. Gems are valuable stones with a trade value. Gear — golden shoes, running boots, storm shells — can be equipped to change your next run. Creatures are animals that live along the routes and show only at certain hours. Artifacts are one-of-a-kind discoveries, credited to their first finder forever. Facts are real, verifiable snippets you collect into sets.',
  },
  {
    q: 'Is it free?',
    a: 'FindRun is free to play during the beta. There are no packs to buy — the only way to get a card is to go find it.',
  },
  {
    q: 'Does it actually track my fitness?',
    a: 'It does. Distance, pace, day streak and cards-per-mile are logged on every run, so it works as a genuine running tracker even on the days the drops are quiet.',
  },
  {
    q: 'When can I play?',
    a: "We're rolling out on iPhone (iOS 17+) through TestFlight. Drop your email below and we'll send an invite as spots open in your city.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal className="text-center">
          <Kicker center>FAQ</Kicker>
          <SectionTitle>Questions, answered.</SectionTitle>
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-[740px]">
          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="rounded-[20px] border border-border/60 bg-card px-6 shadow-sm last:border-b"
              >
                <AccordionTrigger className="py-5 font-display text-[17px] font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[64ch] pb-5 text-[15px] leading-relaxed text-foreground/70">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
