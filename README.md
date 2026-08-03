# GemRun — Landing Page

The marketing landing page for **[GemRun](https://github.com/ifthikar20/project-gr)**,
the iPhone app that turns any running route into a treasure hunt: the system
drops gems on real streets, you run within 100 ft to claim them, first one
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
index.html        All sections + copy
css/styles.css    Design tokens & every component
js/main.js        Interactions (no dependencies)
assets/           favicon.svg (real images land here later)
```

## Design system

**Ember red-orange × black.** The brand accent is the app's pulse color —
`#EF3B23`, deliberately red-shifted off Strava's orange — set against a
black-forward frame, so the identity reads as red-orange *with* black
rather than Strava's orange-on-white:

| Token | Value | Role |
|---|---|---|
| Snow  | `#FAFAF8` bg / `#FFFFFF` cards | Surfaces |
| Ink   | `#16181D` (+ 0.55 gray text, + 0.12 hairlines) | Text, icons, dark bands (hero, ticker, rarity, CTA) |
| Pulse | `#EF3B23` (+ opacity ramp) | THE accent: CTAs, kickers, gems, live stats |

Grays are opacity steps of ink — never another hue. The ticker strip is the
mix in one line: black band, red type. Gem rarity is a pulse-opacity ramp
(0.30 → 1.0) plus a distinct glyph per tier, so tiers stay readable by shape
even in grayscale.

## Graphics: animated scenes & drawn mockups (no placeholder boxes)

Every visual slot renders real graphics today — animated SVG scenes and
hand-drawn app-UI mockups — and each is still tagged with a
`data-placeholder` attribute so a real screenshot can replace it later:

| `data-placeholder` | What renders now |
|---|---|
| *(hero phone)* | Animated phone: route draws itself, gems pop in, runner travels it, looping |
| `feature-living-map` | Animated: gems spawn around a radar-pinging location puck |
| `feature-active-run` | Animated: breadcrumb trail draws toward a pulsing gem (dark) |
| `feature-route-editor` | Animated: tapped waypoints ripple, segments snap in, a gem drops |
| `feature-fair-play` | Animated: track replays with checks; a teleport branch gets rejected; verified seal |
| `feature-wallet` | Animated: a gem hops from the wallet card to a dashed drop zone |
| `feature-run-summary` | Drawn mockup: calories, split bars, gems, Health chip |
| `screen-explore` … `screen-profile` | Six drawn phone mockups, one per app screen |
| `app-store-badge` | Styled badge — needs the real App Store link |

The "Watch a gem get taken" map in How It Works remains the interactive
JS demo (auto-play, replay button, live gem/XP counters).

## Sample content to replace before launch

- **Reviews** ("The streets are talking") are written sample quotes for the
  beta-marketing voice — swap in real TestFlight feedback.
- **Login** is a working preview flow: full validation, loading state, and a
  local demo session in `localStorage` (`gemrun-web-session`), restored on
  reload with a header session chip + logout. The `TODO` in `js/main.js`
  marks where the real `POST /v1/auth/login` call goes.
- **Head-to-head** numbers are illustrative (labeled in the UI).

### Hero / CTA background photo

The hero and final-CTA sections use `assets/running-background.jpg` as a
full-bleed photo. The committed file is a **generated stand-in** (dark
asphalt tones with light streaks) — replace it with the real photo
(`running-background.jpg` from the project-gr folder on the design machine)
by overwriting that one file; no code changes needed. An ink gradient scrim
sits above the image, so any reasonably dark photo keeps text readable.

To swap one in, replace the `.ph` div with an `<img>` (keep the surrounding
`*__media` wrapper). Footer links marked `data-placeholder-link` and the
waitlist form's endpoint (`TODO` in `js/main.js`) also need real destinations
before launch.

## Interactions implemented

Overlay-to-solid sticky header, mobile drawer nav, scroll-spy, marquee
ticker, Framer-style blur/scale reveal-on-scroll, animated stat counters,
the interactive gem-capture map demo, hero-phone mouse tilt, the screens
carousel (scroll-snap + arrows + keyboard), rarity-tier tabs, the calorie
estimator, head-to-head bars, the auto-scrolling reviews marquee (pauses on
hover), single-open FAQ, waitlist validation, a **cookie-consent popup
modal** (Accept all / Essential only, persisted as `gemrun-consent`,
reopenable from the footer), and a **login modal** (validation, loading
state, demo session with header chip + logout) — all gated on
`prefers-reduced-motion` (animated scenes settle into their finished
state) and fully functional without JavaScript (content is never hidden
when JS is off).
