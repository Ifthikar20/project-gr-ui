import { Container } from '@/components/Bits'

const columns = [
  {
    title: 'Play',
    links: [
      { href: '#what', label: 'About' },
      { href: '#community', label: 'Community' },
    ],
  },
  {
    title: 'App',
    links: [
      { href: '#track', label: 'Fitness tracking' },
      { href: '#faq', label: 'FAQ' },
      { href: 'changelog.html', label: 'Changelog' },
      { href: 'press.html', label: 'Press' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: 'privacy.html', label: 'Privacy' },
      { href: 'terms.html', label: 'Terms' },
      { href: 'mailto:hey@runnercard.app', label: 'Contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <Container>
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[320px]">
            <a href="#top" aria-label="RunnerCard home" className="inline-block">
              <span className="text-[17px] font-semibold text-black">RunnerCard</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Run to find. Collect the cards no one else has. Built for runners on iPhone.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-[11.5px] font-semibold tracking-[0.1em] uppercase text-foreground/40">
                  {col.title}
                </h4>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block py-1 text-sm text-foreground/70 transition-[color,transform] duration-200 hover:translate-x-1 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t pt-5 text-[12.5px] text-foreground/40">
          <span>© 2026 RunnerCard · runnercard.app</span>
          <span>Made for people who'd rather be running.</span>
        </div>
      </Container>
    </footer>
  )
}
