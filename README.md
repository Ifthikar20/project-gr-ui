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

The page is a web adaptation of the app's **"Daybreak Pulse"** design language
(`docs/03-ux-spec.md` in the app repo) — exactly three colors, with layout
energy referenced from Strava's get-started page:

| Token | Value | Role |
|---|---|---|
| Snow  | `#FAFAF8` bg / `#FFFFFF` cards | Surfaces |
| Ink   | `#16181D` (+ 0.55 gray text, + 0.12 hairlines) | Text, icons, dark bands |
| Pulse | `#EF3B23` ember red (+ opacity ramp) | THE accent: CTAs, gems, stats |

Grays are opacity steps of ink — never a fourth hue. Gem rarity is rendered as
a pulse-opacity ramp (0.30 → 1.0) plus a distinct glyph per tier, matching the
app.

## Image placeholders

There are no real screenshots yet. Every spot that needs one is a styled
`.ph` block tagged with a `data-placeholder` attribute naming the asset:

| `data-placeholder` | Section | Suggested asset |
|---|---|---|
| `screen-explore` … `screen-profile` | Screens carousel | One screenshot per app screen (Explore, Route Detail, Active Run, Stash, Compete, Profile) |
| `feature-living-map` | Features | Map stocked with system gems |
| `feature-active-run` | Features | Active run chase-camera view |
| `feature-route-editor` | Features | Route drawing + gem placement |
| `feature-fair-play`  | Features | GPS-verification illustration |
| `feature-run-summary` | Track | Run summary: calories, splits, gems |
| `feature-wallet`     | Track | Stash / wallet screen |
| `app-store-badge`    | Final CTA | Real App Store link |

The "Watch a gem get taken" map is **not** a placeholder — it's a built-in
animated SVG demo (street grid, route, four gems, a runner with the 100 ft
claim ring) that plays automatically on scroll and can be replayed.

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

Overlay-to-solid sticky header (white over the hero photo, snow once
scrolled), mobile drawer nav, scroll-spy nav highlighting, marquee ticker,
reveal-on-scroll, animated stat counters, the animated gem-capture map demo
(auto-play + replay, synced step highlights, XP/gem counters), the screens
carousel (scroll-snap + arrow buttons + keyboard), interactive rarity-tier
tabs (keyboard-navigable), an interactive calorie estimator (weight ×
distance sliders), animated head-to-head friend comparison bars, single-open
FAQ accordion, client-side waitlist validation, and a cookie-consent banner
("Accept all" / "Essential only", choice stored in `localStorage` under
`gemrun-consent`, reopenable from the footer's "Cookie preferences" link) —
all gated on `prefers-reduced-motion` and fully functional without
JavaScript (content is never hidden when JS is off).
