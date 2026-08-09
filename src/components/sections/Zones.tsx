import { Container, Kicker, SectionLead, SectionTitle } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { ZoneMapArt } from '@/components/cards/art/ZoneMapArt'

export function Zones() {
  return (
    <section id="zones" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <div className="grid place-items-center rounded-[30px] bg-gradient-to-b from-wash-blue to-[#eef3fb] p-6 shadow-sm md:p-10">
              <ZoneMapArt />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <Kicker>Zones</Kicker>
            <SectionTitle>Cards live where runners have been.</SectionTitle>
            <SectionLead>
              A zone is a patch of the real map that's been activated by a run — yours, or someone else's who came
              through before you. Active zones are where cards surface, so the more your city runs, the more there is to
              find.
            </SectionLead>
            <SectionLead className="mt-3.5">
              Reach an active zone on foot and its card is in range. No zone, no card — which means every collection is
              a map of the ground you've actually covered.
            </SectionLead>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
