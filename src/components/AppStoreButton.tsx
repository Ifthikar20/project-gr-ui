import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Placeholder listing — swap for the real one once the app ships. */
export const APP_STORE_URL = 'https://apps.apple.com/app/runnercard'

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M17.05 12.04c-.03-2.72 2.22-4.02 2.32-4.09-1.27-1.85-3.24-2.1-3.94-2.13-1.68-.17-3.28.99-4.13.99-.85 0-2.16-.97-3.55-.94-1.83.03-3.51 1.06-4.45 2.7-1.9 3.29-.48 8.16 1.36 10.83.9 1.31 1.98 2.78 3.39 2.73 1.36-.06 1.87-.88 3.52-.88 1.64 0 2.11.88 3.55.85 1.47-.02 2.4-1.33 3.3-2.65 1.04-1.52 1.47-2.99 1.49-3.07-.03-.01-2.86-1.1-2.89-4.34M14.5 4.5c.75-.91 1.25-2.17 1.11-3.43-1.08.04-2.38.72-3.15 1.62-.69.8-1.29 2.08-1.13 3.31 1.2.09 2.43-.61 3.17-1.5" />
    </svg>
  )
}

/** The one place the site sends people: the App Store listing. The label
    shortens on small screens so the button never outgrows its panel. */
export function AppStoreButton({
  className,
  label = 'Download on the App Store',
  shortLabel = 'Get the app',
}: {
  className?: string
  label?: string
  shortLabel?: string
}) {
  return (
    <Button asChild size="lg" className={cn('h-12 max-w-full rounded-full px-6 text-[15px]', className)}>
      <a href={APP_STORE_URL}>
        <AppleGlyph className="size-[17px] shrink-0" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{shortLabel}</span>
      </a>
    </Button>
  )
}
