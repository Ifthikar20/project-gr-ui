# RunnerCard — Landing Page

The marketing landing page for **[RunnerCard](https://github.com/ifthikar20/project-gr)**
(runnercard.app), the iPhone app that turns walking into a collection: every
day, large zones land on parks and trails near you — walk 1 km inside one and
a collectible Runner Card mints, stamped with the walk that earned it.

Static site — plain HTML, CSS, and vanilla JavaScript. No framework, no build
step, no external dependencies (fonts, icons, and the favicon are all inline
or local).

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8080
# or
npx serve .
```

## Structure

```
index.html        The landing page (all sections + copy)
changelog.html    TestFlight beta changelog (linked from the footer)
privacy.html      Real privacy policy matching the app architecture
terms.html        Terms & fair play
press.html        Press kit: boilerplate, facts, brand swatches, logo
404.html          On-brand not-found page
llms.txt          Structured site summary for AI crawlers (llmstxt.org format)
css/styles.css    Design tokens & every component (shared by all pages)
js/main.js        Interactions (no dependencies; landing page only)
assets/           favicon.svg, og-card.jpg, apple-touch-icon.png
```

The nav is in-page anchors (How it works · Zones · Cards · Rarity · Track ·
FAQ); the footer carries the real routes (changelog, press, privacy, terms).

## Design system

Light, bevel-soft: ink on a cool paper ground, volt green kept for small
accents, pastel washes for card art, and one `--edge` color per card rarity
driving every accent on a card (pip, band, ability icon, found-most bar,
sheen). Tokens live at the top of `css/styles.css`:

| Token | Value | Role |
|---|---|---|
| Paper | `#f6f8fb` bg / `#ffffff` cards | Surfaces |
| Ink | `#101216` (+ opacity steps .68/.52/.38 for text, .08 hairlines) | Text, icons |
| Volt | `#61ff00` (+ `--volt-deep #2c8f00` for focus/text-on-light) | Small accents, CTAs |
| Rarity | `--r-common #9a9ba1` → `--r-legendary #e0a63a` | Card edge colors |

Grays are opacity steps of ink — never another hue.

## The cards are the product shots

There are no phone mockups: the product visuals are the cards themselves,
rendered as real HTML/CSS/SVG — the hero card (Harbor Sapphire), the four
gallery cards (Golden Shoes, Harbor Fox, The Unmarked Obelisk, Runner's
High), and the binder wall of minis. Each card is the full nine-part
anatomy (stage, name + XP, art, rarity band, run-stat tiles, ability,
found-most bar, flavor, serialed footer) with a pointer-tracked sheen. The
Zones section carries the one map visual: a stylised dark map SVG with
glowing zone rings and a dashed route.

## Sample content to replace before launch

- **Changelog entries** are grounded in the app repo's real feature history
  but carry invented build numbers/dates — sync with actual TestFlight
  builds.
- **Card serials, found-most percentages and set counts** ("142 / 500",
  "500 cards at launch") are launch-target copy, not live data.
- **Waitlist form** stores nothing server-side yet — wire it to a real list
  before the beta opens.

## Interactions implemented

Overlay-to-solid sticky header, mobile drawer nav, scroll-spy, reveal-on-
scroll, pointer-tracked card tilt + sheen on every `data-card`, single-open
FAQ, and waitlist validation — all gated on `prefers-reduced-motion` and
fully functional without JavaScript (content is never hidden when JS is
off).
