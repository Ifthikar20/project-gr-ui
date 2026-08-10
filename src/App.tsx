import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { StatsBand } from '@/components/sections/StatsBand'
import { WhatIs } from '@/components/sections/WhatIs'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Zones } from '@/components/sections/Zones'
import { CardTypes } from '@/components/sections/CardTypes'
import { Rarity } from '@/components/sections/Rarity'
import { FitnessBanner } from '@/components/sections/FitnessBanner'
import { Track } from '@/components/sections/Track'
import { Privacy } from '@/components/sections/Privacy'
import { Reviews } from '@/components/sections/Reviews'
import { Faq } from '@/components/sections/Faq'
import { JoinCta } from '@/components/sections/JoinCta'
import { Footer } from '@/components/sections/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <StatsBand />
        <WhatIs />
        <HowItWorks />
        <Zones />
        <CardTypes />
        <Rarity />
        <FitnessBanner />
        <Track />
        <Privacy />
        <Reviews />
        <Faq />
        <JoinCta />
      </main>
      <Footer />
    </>
  )
}
