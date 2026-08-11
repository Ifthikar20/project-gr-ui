import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
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
  { href: '#track', label: 'Track' },
  { href: '#faq', label: 'FAQ' },
]

function Brand() {
  return (
    <a href="#top" aria-label="FindRun home" className="flex items-center gap-2">
      <BrandMark className="size-7" />
      <span className="font-display text-[16px] font-bold tracking-[-0.02em]">
        Find<b>Run</b>
      </span>
      <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[9px] font-extrabold tracking-[0.08em] uppercase text-muted-foreground">
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
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4">
      <div
        className={cn(
          'mx-auto flex h-14 w-full max-w-[880px] items-center justify-between gap-4 rounded-full border bg-background/85 pr-2 pl-5 backdrop-blur-md transition-[box-shadow,border-color,background-color] duration-300',
          stuck
            ? 'border-border bg-background/95 shadow-[0_12px_36px_rgba(16,18,22,0.14)]'
            : 'border-border/60 shadow-[0_4px_18px_rgba(16,18,22,0.07)]',
        )}
      >
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
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

        <div className="flex items-center gap-1.5">
          <Button asChild size="sm" className="h-10 rounded-full px-4">
            <a href="#join">
              Join the beta
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Menu">
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
