# RunnerCard — Landing Page

The marketing landing page for **[RunnerCard](https://github.com/ifthikar20/project-gr)**,
the iPhone app that turns any running route into a treasure hunt: collectible
cards surface in real-world zones, you run within reach on foot to claim them,
first one there takes it.

Built with **Vite + React + TypeScript**, styled with **Tailwind CSS v4** and
**[shadcn/ui](https://ui.shadcn.com)** components (vendored under
`src/components/ui/`). Light theme only, system font stack, zero runtime
requests to third parties.

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```sh
npm run build      # type-checks and builds to dist/
npm run preview    # serves the production build locally
npm run lint       # oxlint
```

## Structure

```
index.html                     Vite entry — carries the real <head> meta/OG tags
src/
  App.tsx                      Assembles the landing page sections
  index.css                    Tailwind v4 theme: RunnerCard palette on shadcn vars
  components/
    sections/                  Navbar, Hero, StatsBand, … Footer (one per section)
    cards/                     The collectible-card system:
      CollectibleCard.tsx      full run-card chrome (data-driven)
      MiniCard.tsx             binder minis
      cards.css                the bevel/sheen card chrome (ported hand-written CSS)
      data.tsx                 all card copy
      art/                     every SVG illustration as a component
    ui/                        vendored shadcn/ui primitives
  hooks/                       useCardTilt (3D tilt + sheen), useReveal
public/                        legacy static pages, served unchanged at the same URLs:
  changelog.html  press.html  privacy.html  terms.html  404.html  llms.txt
  css/styles.css               stylesheet for those legacy pages only
  assets/                      favicon.svg, og-card.jpg, apple-touch-icon.png
```

The secondary pages (changelog, press, privacy, terms, 404) are intentionally
untouched legacy HTML: Vite copies `public/` into the build verbatim, so they
keep working at `/changelog.html` etc. with their own stylesheet.

## Deploying

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to
GitHub Pages on every push to `main`. One-time setup: in the repo's
**Settings → Pages**, set **Source** to **GitHub Actions**. The build uses a
relative base (`base: './'` in `vite.config.ts`), so the same output works
under a project path (`/project-gr-ui/`), a custom domain, and local preview.

## Sample content to replace before launch

- **Photos**: every slot loads from `public/assets/` and falls back to a
  labeled placeholder until the file exists. The full map — hero deck:
  `run-1.jpg`, `run-2.jpg`, `run-7.jpg`; community strip: `run-3.jpg` …
  `run-6.jpg` plus `run-8.jpg`; closing CTA banner: `run-9.jpg`. The two
  gem card tiles also try `gem-1.png` (hero) and `gem-2.png` (community)
  before falling back to the illustrated gem art.
- **Social handle** `@runnercardapp` in the community section is invented —
  point it at the real account.

- **Reviews** are written sample quotes for the beta-marketing voice — swap in
  real TestFlight feedback.
- **Changelog entries** carry invented build numbers/dates — sync with actual
  TestFlight builds.
- **Waitlist form** shows a local success state only; wire it to a real
  endpoint in `src/components/sections/JoinCta.tsx`.
- **Contact email** `hey@runnercard.app` is a placeholder domain — search and
  replace once the real domain exists.
