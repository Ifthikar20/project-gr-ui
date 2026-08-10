import { ChartNoAxesColumn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { Reveal } from '@/components/Reveal'

/* The fitness statement — a wide photo-card panel with the caption
   bottom-left and pill buttons below. The image slot holds a placeholder
   until real photography lands. */

export function FitnessBanner() {
  return (
    <section id="fitness" className="scroll-mt-24 px-3 py-8 md:px-6 md:py-12">
      <Reveal>
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] md:rounded-[40px]">
          <div className="relative aspect-[1200/520] min-h-[360px]">
            <PhotoPlaceholder label="Runner photo here" />
            {/* caption scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,10,14,0.72),rgba(8,10,14,0.12)_45%,transparent_65%)]"
            />
            <div className="absolute bottom-0 left-0 z-10 max-w-[520px] p-7 text-left md:p-11">
              <ChartNoAxesColumn className="size-8 text-white" strokeWidth={2.4} />
              <p className="mt-4 text-[clamp(17px,2vw,22px)] leading-snug font-semibold text-white">
                Keep the fitness level up — distance, pace, splits and streaks, tracked on every hunt.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={1}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild className="h-12 rounded-full px-7 text-[15px]">
            <a href="#join">Join the beta</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-12 rounded-full border-transparent bg-card px-7 text-[15px] shadow-sm"
          >
            <a href="#track">Check the tracker</a>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
