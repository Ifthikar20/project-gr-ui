import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { AboutBento } from '@/components/sections/AboutBento'
import { Track } from '@/components/sections/Track'
import { Privacy } from '@/components/sections/Privacy'
import { Reviews } from '@/components/sections/Reviews'
import { Community } from '@/components/sections/Community'
import { Pricing } from '@/components/sections/Pricing'
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
        <AboutBento />
        <Track />
        <Privacy />
        <Reviews />
        <Community />
        <Pricing />
        <Faq />
        <JoinCta />
      </main>
      <Footer />
    </>
  )
}
