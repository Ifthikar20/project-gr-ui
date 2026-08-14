import { AppStoreButton } from '@/components/AppStoreButton'

const navLinks = [
  { href: '#what', label: 'About' },
  { href: '#track', label: 'Track' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#community', label: 'Community' },
  { href: '#faq', label: 'FAQ' },
]

/* A chrome-free floating bar: the wordmark as plain text, plain inline
   links, and the single CTA button. */

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <a href="#top" aria-label="RunnerCard home" className="flex items-baseline gap-2">
          <span className="text-[22px] font-semibold tracking-[-0.015em] text-black lg:text-[25px]">RunnerCard</span>
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-black/40">beta</span>
        </a>

        <div className="flex items-center gap-6 lg:gap-7">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] font-medium text-black/55 transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <AppStoreButton label="Get the app" className="h-10 px-5 text-[14px]" />
        </div>
      </div>
    </header>
  )
}
