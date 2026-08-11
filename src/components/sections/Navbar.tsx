import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/BrandMark'

const navLinks = [
  { href: '#what', label: 'About' },
  { href: '#track', label: 'Track' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#community', label: 'Community' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  return (
    <header>
      {/* floating brand chip, top-left */}
      <a
        href="#top"
        aria-label="RunnerCard home"
        className="fixed top-4 left-4 z-50 flex h-11 items-center gap-2 rounded-full border border-border/60 bg-background/85 pr-3.5 pl-3 shadow-[0_4px_18px_rgba(16,18,22,0.08)] backdrop-blur-md transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(16,18,22,0.14)] md:top-5 md:left-6"
      >
        <BrandMark className="size-6" />
        <span className="text-[15px] font-semibold text-black">RunnerCard</span>
        <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[8.5px] font-extrabold tracking-[0.08em] uppercase text-muted-foreground">
          beta
        </span>
      </a>

      {/* floating nav pills, top-right: the headers inline + the CTA */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 md:top-5 md:right-6">
        <nav
          aria-label="Primary"
          className="hidden h-11 items-center rounded-full border border-border/60 bg-background/85 px-2 shadow-[0_4px_18px_rgba(16,18,22,0.08)] backdrop-blur-md md:flex"
        >
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild className="h-11 rounded-full px-5 text-[14.5px] shadow-[0_6px_22px_rgba(16,18,22,0.22)]">
          <a href="#join">
            Join the beta
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </header>
  )
}
