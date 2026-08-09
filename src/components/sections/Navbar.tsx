import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { BrandMark } from '@/components/BrandMark'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#how', label: 'How it works' },
  { href: '#zones', label: 'Zones' },
  { href: '#cards', label: 'Cards' },
  { href: '#rarity', label: 'Rarity' },
  { href: '#track', label: 'Track' },
  { href: '#faq', label: 'FAQ' },
]

function Brand() {
  return (
    <a href="#top" aria-label="FindRun home" className="flex items-center gap-2">
      <BrandMark />
      <span className="font-display text-[17px] font-bold tracking-[-0.02em]">
        Find<b>Run</b>
      </span>
      <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[9.5px] font-extrabold tracking-[0.08em] uppercase text-muted-foreground">
        beta
      </span>
    </a>
  )
}

export function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-[border-color,box-shadow]',
        stuck ? 'border-border shadow-[0_8px_30px_rgba(16,18,22,0.06)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between gap-4 px-6">
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-full px-4">
            <a href="#join">Join the beta</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <span className="flex items-center gap-2 font-display text-[17px] font-bold tracking-[-0.02em]">
                    <BrandMark className="size-7" />
                    <span>
                      Find<b>Run</b>
                    </span>
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-4 w-full rounded-full">
                  <a href="#join" onClick={() => setOpen(false)}>
                    Join the beta
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
