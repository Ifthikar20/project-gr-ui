import { useState } from 'react'
import { Plus } from 'lucide-react'
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

const navLinks = [
  { href: '#what', label: 'About' },
  { href: '#track', label: 'Track' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#community', label: 'Community' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      {/* floating brand chip, top-left */}
      <a
        href="#top"
        aria-label="FindRun home"
        className="fixed top-4 left-4 z-50 flex h-11 items-center gap-2 rounded-full border border-border/60 bg-background/85 pr-3.5 pl-3 shadow-[0_4px_18px_rgba(16,18,22,0.08)] backdrop-blur-md md:top-5 md:left-6"
      >
        <BrandMark className="size-6" />
        <span className="font-display text-[15px] font-bold tracking-[-0.02em]">
          Find<b>Run</b>
        </span>
        <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[8.5px] font-extrabold tracking-[0.08em] uppercase text-muted-foreground">
          beta
        </span>
      </a>

      {/* floating menu pill, top-right */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="fixed top-4 right-4 z-50 h-11 rounded-full px-5 text-[14.5px] shadow-[0_6px_22px_rgba(16,18,22,0.22)] md:top-5 md:right-6">
            Menu
            <Plus className={`size-4 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
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
          <nav aria-label="Primary" className="px-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[17px] font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-5 w-full rounded-full">
              <a href="#join" onClick={() => setOpen(false)}>
                Join the beta
              </a>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
