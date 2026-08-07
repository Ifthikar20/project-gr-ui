# GemRun — Landing Page

The marketing landing page for **[GemRun](https://github.com/ifthikar20/project-gr)**,
the iPhone app that turns any running route into a treasure hunt: the system
drops gems on real streets, you run within 200 ft to claim them, first one
there takes it.

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
changelog.html    TestFlight beta changelog (linked from the nav)
privacy.html      Real privacy policy matching the app architecture
terms.html        Terms & fair play
press.html        Press kit: boilerplate, facts, brand swatches, logo
404.html          On-brand not-found page
llms.txt          Structured site summary for AI crawlers (llmstxt.org format)
css/styles.css    Design tokens & every component (shared by all pages)
js/main.js        Interactions (no dependencies; landing page only)
assets/           favicon.svg, og-card.jpg, apple-touch-icon.png,
                  running-background.jpg (the real photo)
```

The nav mixes in-page anchors with one real route (Changelog) plus the
Log in action; the footer carries the rest of the real routes — no dead
`#` links anywhere except the App Store badge, which is intentionally
pending a real store URL.

## Design system

**Two accents × black (test).** Map/app graphics — routes, gems, pins,
the FAB, mockup UI — use the `--map` token; site chrome — buttons,
ticker, links — uses `--pulse`; text stays ink (black) on light and
snow on dark. Swap the tokens in `css/styles.css` (and delete the
"Two-accent test overrides" block to fall back to single-accent):

| Token | Value | Role |
|---|---|---|
| Snow  | `#FAFAF8` bg / `#FFFFFF` cards | Surfaces |
| Ink   | `#16181D` (+ 0.55 gray text, + 0.12 hairlines) | Text, icons, dark bands |
| Map   | `#61FF00` (+ opacity ramp) | Map & app graphics: routes, gems, pins, FAB, tabs |
| Pulse | `#5F40BF` | Site chrome: CTAs, ticker, links, focus |

Grays are opacity steps of ink — never another hue. Gem rarity uses real
per-tier stone colors (`--gem-q` … `--gem-m`): Quartz white, Emerald green,
Sapphire blue, Amethyst purple, Ember gold-ruby — consistently across the
rarity showcase, hero replica, demo, scenes and mockups.

## Graphics: animated scenes & drawn mockups (no placeholder boxes)

Every visual slot renders real graphics today — animated SVG scenes and
hand-drawn app-UI mockups — and each is still tagged with a
`data-placeholder` attribute so a real screenshot can replace it later:

| `data-placeholder` | What renders now |
|---|---|
| *(hero phone)* | Replica of the app's Explore screen (docs/03 in the app repo): status bar, light map with route polyline + origin gem-count marker, tier-colored gems inside their 200 ft capture-zone rings, location puck, "Search this area", recenter, green ➕ FAB, swipeable route card, 4-tab bar |
| `feature-living-map` | Animated: gems spawn around a radar-pinging location puck |
| `feature-active-run` | Animated: breadcrumb trail draws toward a pulsing gem (dark) |
| `feature-route-editor` | Animated: tapped waypoints ripple, segments snap in, a gem drops |
| `feature-fair-play` | Animated: track replays with checks; a teleport branch gets rejected; verified seal |
| `screen-explore` … `screen-profile` | Six drawn phone mockups, one per app screen |
| `app-store-badge` | Styled badge — needs the real App Store link |

The "How you collect a gem" map in How It Works is the interactive JS
demo: it auto-plays on scroll, loops while visible, fills the on-map stash
tray as gems are claimed, and shows live gem/XP counters.

## Sample content to replace before launch

- **Reviews** ("The streets are talking") are written sample quotes for the
  beta-marketing voice (no star ratings by design — quotes only) — swap in
  real TestFlight feedback.
- **Changelog entries** are grounded in the app repo's real feature history
  but carry invented build numbers/dates — sync with actual TestFlight
  builds.
- **Contact email** `hello@gemrun.app` is a placeholder domain — search and
  replace once the real domain exists.
- **Login** is a working preview flow: full validation, loading state, and a
  local demo session in `localStorage` (`gemrun-web-session`), restored on
  reload with a header session chip + logout. The `TODO` in `js/main.js`
  marks where the real `POST /v1/auth/login` call goes.

### Hero / CTA background photo

The hero and final-CTA sections use `assets/running-background.jpg` as a
full-bleed photo (the real shot is committed). To change it, overwrite that
one file — no code changes needed; an ink gradient scrim above the image
keeps text readable on any reasonably dark photo.

## Interactions implemented

Overlay-to-solid sticky header, mobile drawer nav, scroll-spy,
Framer-style blur/scale reveal-on-scroll, animated stat counters, the
self-looping gem-capture demo with its stash tray, hero-phone mouse tilt,
the full-width screens carousel (scroll-snap + arrows + keyboard),
hidden-stone rarity reveals with XP chips, the auto-scrolling reviews
marquee (pauses on hover), single-open FAQ, waitlist validation, a **cookie-consent popup
modal** (Accept all / Essential only, persisted as `gemrun-consent`,
reopenable from the footer), and a **login modal** (validation, loading
state, demo session with header chip + logout) — all gated on
`prefers-reduced-motion` (animated scenes settle into their finished
state) and fully functional without JavaScript (content is never hidden
when JS is off).
