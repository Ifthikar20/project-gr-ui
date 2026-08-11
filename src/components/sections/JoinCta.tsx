import { AppStoreButton } from '@/components/AppStoreButton'
import { RunPhoto } from '@/components/RunPhoto'
import { Reveal } from '@/components/Reveal'

/* The closing CTA as a full-width photo banner: headline and the
   App Store button over the photo. */

export function JoinCta() {
  return (
    <section id="join" className="scroll-mt-24 px-3 py-8 md:px-6 md:py-12">
      <Reveal>
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] md:rounded-[40px]">
          <div className="relative min-h-[480px] md:aspect-[1200/560]">
            <div className="absolute inset-0">
              <RunPhoto n={9} align="right" />
            </div>
            {/* legibility scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,12,22,0.8)_0%,rgba(16,12,22,0.45)_42%,transparent_70%)]"
            />
            <div className="absolute inset-0 z-10 flex flex-col justify-center p-7 md:p-14">
              <div className="max-w-[560px] text-left">
                <h2 className="font-display text-[clamp(30px,4.4vw,52px)] leading-[1.06] font-bold tracking-[-0.028em] text-white">
                  Your city is full of cards you haven't found yet.
                </h2>
                <p className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-white/75">
                  Download RunnerCard and start collecting the ground you cover.
                </p>
                <div className="mt-7">
                  <AppStoreButton className="bg-volt text-[#101216] hover:bg-volt/90" />
                </div>
                <p className="mt-4 text-[12.5px] font-medium text-white/55">
                  iPhone · iOS 17+ · Free to play · No packs to buy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
