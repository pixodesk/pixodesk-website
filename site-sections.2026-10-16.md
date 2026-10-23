# Website sections — inventory and improvement plan (2026-10-16)

Goal: bring the app landing pages to one consistent level — every section with a clear intent, honest copy and an
animation that shows the point. Step 1 (this file, now): the list of sections per app, each with its title, intent,
the animation it shows and where that animation's editable source is. Step 2 (next): an improvement per section.

Scope: the four live pages (`src/pages/index.astro`, `svg-animator.astro`, `animator.astro`, `svg-editor.astro`; text in
`src/data/*/…-index-text-content.yaml`). The `/new-design/` previews are covered in
`src/layouts/new-design/feature-sections-review.2026-10-15.md`.

## How to read the tables

| Column | Meaning |
|---|---|
| Key | the section's key in the page's YAML (`sections.section_06`) |
| Animation | the file the section shows, under `public/assets/` |
| Made with | **SVG Animator** — an animated SVG that reopens in the SVG Animator · **Lottie Animator** — an SVG + JS export (old runtime); its source is a Lottie JSON · **SVG Editor** — a static SVG that reopens in the SVG Editor · **code** — an Astro component |
| Source | **repo** — the editable source is in kf (path given) · **file** — the shown file itself opens in the editor; no copy in the repo · **Downloads only** — the only source copy is in `~/Downloads` · **none** — not found · **—** — the section has no animation |

Repo paths: `demo/` = `kf/app/dev-public/demo-explorer-files/`, `seed/` = `kf/app/dev-public-seed/demo-explorer-files/`.

## Home — `/` (`index.astro`, `data/index/index-text-content.yaml`)

| # | Key | Title | Intent | Animation | Made with | Source |
|---|---|---|---|---|---|---|
| 1 | `section_00` | Create and Animate SVG and Lottie | Say what the app family does, in one line, with the mascot | `index/hero/px-astronaut.svg` (161 KB) | SVG Animator | **repo** `demo/svga/astronaut.svg` (+ `seed/`) |
| 2 | `section_02`–`04` | SVG Editor · Lottie Animator · SVG Animator | Send the visitor to the right app | logos (components) | code | — |
| 3 | `section_041` | One Toolbox. Every Platform. | Trust: official stores, always updated, all major formats | `index/sections/all-platforms-girl-on-bike.svg` (167 KB) | SVG Animator | **repo** `seed/svga/girl-on-bike-devices-9.svg` (seed only) |
| 4 | `section_05` | Pixodesk Makes Vector Design and Animation Simple | Four reasons: Windows + macOS, tiny files, all tools in one app, export options | icons | code | — |
| 5 | `section_06` | Shape Builder Tool: Build Shapes. Build Ideas. | Show a signature drawing tool | `index/sections/px-shape-builder.svg` (37 KB, `<img>`) | SVG Editor | **file** (an older `~/Downloads/__OLD/shape-builder-three-circles.svg`) |
| 6 | `section_07` | Edit Colors: One Change, Whole Design Transformed | One colour change recolours the whole design | `index/sections/px-edit-color-anim.svg` (134 KB) | SVG Animator | **repo** `demo/svga/edit-colors-anim.svg` |
| 7 | `section_08` | Gradient and Opacity Tool | Gradients and opacity for light and depth | `svg/sections/mango-juice.svg` (87 KB) | SVG Editor | **file** (an older `~/Downloads/__OLD/mango-juice-3.svg`) |

## SVG Animator — `/svg-animator` (`svg-animator.astro`, `data/svga/svga-index-text-content.yaml`)

| # | Key | Title | Intent | Animation | Made with | Source |
|---|---|---|---|---|---|---|
| 1 | `section_00` | From Static to Motion: Advanced SVG Animation Application | Promise: turn static SVG into animation | `svga/hero/girl-on-bike.svg` (191 KB) | SVG Animator | **repo** `demo/svga/girl-on-bike.svg` |
| 2 | `section_001` | Try the app features now | Let the visitor try the editor in the page | the embedded demo app | code | — |
| 3 | `section_01` | Pixodesk SVG Animator Makes Vector Web Design and Animation Easy | Six reasons: works everywhere, tiny files, all tools, one app, SVG format, export options | icons | code | — |
| 4 | `section_02` | Explore Pixodesk SVG Animator Features | Overview: draw, animate, export in one tool | `svga/sections/cat-and-butterfly.svg` (35 KB) | SVG Animator | **repo** `demo/svga/cat-and-butterfly.svg` (+ `cat-and-butterfly-pxJjson-1.json`) |
| 5 | `section_03` | Create · Animate · Export | The workflow in three steps | `bird-twitting-svga-features.svg` (24 KB) · `jar-with-hearts.svg` (18 KB) · `envelope-open.svg` (23 KB) | SVG Animator ×3 | bird: **Downloads only** `~/Downloads/animations/bird-twitting-svga-features.svg` · jar, envelope: **repo** `demo/svga/` |
| 6 | `section_030` | Shape Builder Tool: From Simple to Sophisticated. | Build complex art from simple shapes | `svga/sections/bird-twitting-svga.svg` (34 KB) | SVG Animator | **repo** `demo/svga/bird-twitting-svga.svg` |
| 7 | `section_031` | Animate Patterns, Markers & Spray | Patterns, markers and spray, animated | `svga/sections/Eiffel-tower-anim.svg` (100 KB) | SVG Animator | **repo** `seed/svga/Eiffel-tower-anim.svg` (seed only) |
| 8 | `section_060` | Animated Vector Text | Animate text and run it along paths | `svga/sections/vector-text-anim.svg` (33 KB) | SVG Animator | **repo** `demo/svga/vector-text-anim.svg` |
| 9 | `section_04` | Auto-Animate: Automatically Animate Between States | Set states, the app builds the motion | `lottie/sections/auto-animate.svg` (374 KB) | **Lottie Animator** | **repo** `demo/lottie/auto-animate.json` |
| 10 | `section_05` | Easing: Tools for Smoother Motion | Easing presets, curves and motion charts | `lottie/sections/easing.svg` (269 KB) | **Lottie Animator** | **repo** `demo/lottie/easing.json` |
| 11 | `section_06` | Create Animated Icons | Icons with motion for web and apps | `svga/sections/animated-icons.svg` (52 KB) | SVG Animator | **repo** `demo/svga/animated-icons.svg` |
| 12 | `section_07` | Animated Repeater: Animate Multiple Elements at Once | Animate every copy of a repeated element at once | `svga/sections/animated-repeater.svg` (33 KB) | SVG Animator | **Downloads only** `~/Downloads/animations/animated-repeater.svg` |
| 13 | `section_08` | Only your SVG and CSS animation in your file | Proof of clean output: the exported markup | code sample | code | — |

## Lottie Animator — `/animator` (`animator.astro`, `data/2d-animator/lottie-index-text-content.yaml`)

| # | Key | Title | Intent | Animation | Made with | Source |
|---|---|---|---|---|---|---|
| 1 | `section_00` | Design, Animate, and Export Lottie Graphics for Every Device | Promise: Lottie for every device | `lottie/hero/plane-and-banner-only.svg` (47 KB) + `plane-and-banner-wind.svg` (22 KB) + `city-outline.svg` (3 KB) | Lottie Animator ×2 + a plain SVG | plane: **repo** `demo/lottie/plane-and-banner.json` (also `kf/__LOTTIE_FILES/ANIMATIONS/PLANE-BANNER/READY/`) · wind + city: **Downloads only** `~/Downloads/plane-and-banner-wind-city.json` (layers `city`, `Wind`, plane, banner — the likely source of all three) |
| 2 | `section_001` | Try the app features now | Let the visitor try the editor in the page | the embedded demo app | code | — |
| 3 | `section_01` | Pixodesk Animator Makes Animation for Native Devices Simple | Six reasons: works everywhere, tiny files, all tools, one app, Lottie formats, export options | icons | code | — |
| 4 | `section_02` | Explore Pixodesk Animator Features | Overview: draw, animate, export lightweight Lottie | `lottie/sections/yoga-bright.svg` (93 KB) | Lottie Animator | **repo** `demo/lottie/yoga-bright.json` |
| 5 | `section_03` | Create · Animate · Export | The workflow in three steps | `features-2d-create.svg` (90 KB) · `features-2d-animate.svg` (147 KB) · `features-2d-export.svg` (160 KB) | **SVG Animator** ×3 | **repo** `demo/lottie/features-2d-{create,animate,export}.json` (the Lottie originals) |
| 6 | `section_04` | Auto-Animate: Set the States - We Animate the Rest | Set states, the app builds the motion | `lottie/sections/auto-animate.svg` (374 KB, same file as SVG Animator #9) | Lottie Animator | **repo** `demo/lottie/auto-animate.json` |
| 7 | `section_05` | Easing: Control Speed, Flow, and Motion | Easing presets, curves, velocity and acceleration charts | `lottie/sections/easing.svg` (269 KB, same file as SVG Animator #10) | Lottie Animator | **repo** `demo/lottie/easing.json` |
| 8 | `section_06` | Create Animated Icons | Static icons come alive | `lottie/sections/animated-icons-watch.svg` (**866 KB**) | Lottie Animator | **repo** `demo/lottie/animated-icons-watch.json` |
| 9 | `section_07` | Create Animated Splash Screens | Engage users from the first second | `lottie/sections/splash-screen.svg` (223 KB) | Lottie Animator | **repo** `demo/lottie/splash-screen.json` |
| 10 | `section_08` | Make It Once - Works Everywhere | One file for React Native, iOS, Android, Windows and the web | `lottie/sections/devices.svg` (208 KB) | Lottie Animator | **repo** `demo/lottie/devices.json` |

## SVG Editor — `/svg-editor` (`svg-editor.astro`, `data/svg/svg-index-text-content.yaml`)

| # | Key | Title | Intent | Animation | Made with | Source |
|---|---|---|---|---|---|---|
| 1 | `section_00` | Create, Customize, and Export SVG Graphics — Free and Easy | Promise: a free, easy SVG editor | `svg/hero/bird-origami.svg` (6 KB, `<img>`, static) | SVG Editor | **Downloads only** `~/Downloads/bird-origami.svg` (the shown file also opens in the editor) |
| 2 | `section_001` | Try the app features now | Let the visitor try the editor in the page | the embedded demo app | code | — |
| 3 | `section_01` | Pixodesk SVG Editor Makes Vector Design Easy | Six reasons: works everywhere, tiny files, all tools, one app, SVG format, export options | icons | code | — |
| 4 | `section_02` | Shape Builder Tool: Build, Merge, Create. | Build complex art from simple shapes | `svg/sections/bird-twitting-svg.svg` (25 KB, static) | SVG Editor | **file** — the static twin of `demo/svga/bird-twitting-svga.svg` |
| 5 | `section_03` | Color Control Made Easy | One shared colour updates everywhere; quick themes | `svg/sections/edit-colors-static.svg` (86 KB, static) | SVG Editor | **file** — the static twin of `demo/svga/edit-colors-anim.svg` |
| 6 | `section_04` | Gradient and Opacity Tool | Depth and shading with gradients and opacity | `svg/sections/mango-juice.svg` (87 KB, static, same file as Home #7) | SVG Editor | **file** |
| 7 | `section_05` | Vector Text | Fonts, styling, text to shapes, text on a path | `svg/sections/vector-text.svg` (16 KB, static) | SVG Editor | **file** — the static twin of `demo/svga/vector-text-anim.svg` |
| 8 | `section_06` | Pattern, Markers & Spray: Add Detail to Your Designs | Repeating detail with patterns, markers and spray | `svg/sections/Eiffel-tower.svg` (84 KB, static) | SVG Editor | **repo** `demo/svga/Eiffel-tower.svg` |
| 9 | `section_07` | Clone, Repeat, and Arrange: Perfect Symmetry Every Time | Duplicate and arrange for symmetry (Repeater / Clone) | `RealTimeClock` — a live clock drawn in code | code | — (the page also refers to a `clockFaceRepeater` that is never imported) |
| 10 | `section_08` | Only Your SVG Tags in Your SVG File | Proof of clean output: the exported markup | code sample | code | — |

## What the list already shows

| Finding | Where | Why it matters |
|---|---|---|
| The SVG Animator page shows two **Lottie Animator** exports | SVG Animator #9 Auto-Animate, #10 Easing | the page about SVG animation proves its points with the other app's files, on the old runtime (374 + 269 KB) |
| The Lottie Animator page shows three **SVG Animator** files | Lottie Animator #5 Create · Animate · Export | the mismatch the other way |
| Heavy files | `animated-icons-watch.svg` 866 KB, `auto-animate.svg` 374 KB, `easing.svg` 269 KB, `splash-screen.svg` 223 KB, `devices.svg` 208 KB | slow first view; all are Lottie Animator exports on the old runtime |
| Sources outside the repo | `bird-twitting-svga-features`, `animated-repeater`, `bird-origami`, the hero's wind + city (`plane-and-banner-wind-city.json`); `px-shape-builder` and `mango-juice` exist only as the shown files | anyone remaking them needs the source; copy into `demo/` |
| Same artwork on two pages | `mango-juice.svg` (Home #7, SVG Editor #6); `auto-animate.svg` and `easing.svg` (SVG Animator and Lottie Animator) | consistent, but the copy differs per page |
| Stale YAML keys | `svga section_00.svg` (astronaut), `lottie section_00.svg` (girl-on-bike), `lottie section_02.image`, `lottie section_04.image`, `svga section_07.image` (clock-face-repeater) | the pages import other files; the keys mislead whoever edits the copy |
| A Lottie conversion path now exists | `kf/app/src/svgeditor/convertor/realInterfacesAssets.claudePlayground.spec.ts` | any Lottie source above can become an SVG Animator file (used for the "In real interfaces" videos, frame-checked against lottie-web) |

## Step 2 — do the sections attract and engage? (analysis, 2026-10-16)

**Verdict: well made, aimed at the wrong question.** The pages describe the editor — its tools, formats and benefits —
and leave the visitor to imagine the use. Nothing answers "what would this look like in MY app or site?" before the
tool list starts. The `/new-design/` previews fixed the proof (stat cards, code tabs, demo, "watch it first") but kept
the same tool-first order.

### What works — keep

- One skeleton per app page; clean, high-quality art.
- The live demo near the top ("Try the app features now"), and the new-design "watch it first" video.
- Proof of clean output: the markup sample, file sizes on the new-design stat cards, proof captions.

### What does not work

| Problem | Evidence (the inventory above) | What the visitor does |
|---|---|---|
| Feature-first headlines | most titles name a tool or claim ease: "Shape Builder Tool…", "…Makes … Easy", "Color Control Made Easy", "Gradient and Opacity Tool" | reads "another editor", keeps scrolling |
| Decorative art, no product around it | girl on a bike, cat and butterfly, Eiffel tower, jar of hearts, origami bird | admires the drawing; cannot picture it in a product |
| The same six reasons on three pages | works everywhere · ultra-small · all tools · one app · format · exports — with no numbers on the live pages | skims them as filler |
| No story | hero → demo → six reasons → 8–11 tool sections → code sample | no build-up from "see it" to "want it" to "how do I add it" |
| Proof and integration come last, or not at all | the markup sample is the last section; "one line of React" is not on the live pages | the developer leaves before the answer to their first question |
| The files contradict the claims | Lottie exports on the SVG Animator page, SVG Animator files on the Lottie page; 866 / 374 / 269 KB illustrations next to "ultra-small" | trust drops if they look |
| Home leads with distribution | "One Toolbox. Every Platform." (stores, updates); the apps are chosen by product name | no reason given to pick any of them |

### Who we want to catch, and the hook for each

| Visitor | Arrives asking | Hook |
|---|---|---|
| Developer / product builder (React, web) | "Would this make my app feel better, and how much work is it?" | a real piece of UI that moves, its size in KB, the one line that adds it |
| Mobile app team (Lottie) | "Does it fit our stack and players?" | phone screens (splash, onboarding, tab bar), Lottie / dotLottie, any player |
| Designer / marketer | "Can I make this, and will the developers take it?" | the same piece made in the editor, then live in a site |

## Step 3 — ideas

### 1. Show where it lives first, then how it is made

A new arc for each app page. The old sections are kept, re-titled by what they give, and move to part 5.

| # | Part | What it holds |
|---|---|---|
| 1 | Hero | a living product composite instead of decoration (a browser or phone with real screens moving: the flight search, payment stages, the hover dialog); the promise in outcome words, e.g. "Animations your users notice, in your React app, site or mobile app, from a few KB" |
| 2 | In real interfaces | an interactive gallery of the 10 mockups: hover and click work; per card one line "where it fits", a KB chip, "watch the 1-minute video", a "show code" toggle with its 1–3 lines |
| 3 | Where animation earns its place | a use-case map: loading and waiting · progress and status · feedback (success, like) · attention (reminder, new) · micro-interactions (hover icons, toggles) · empty and error states (404) · hero backgrounds · onboarding and splash; each tile a tiny moving example |
| 4 | Into your app in one line | code tabs (React / Vue / web / pre-rendered SVG); a trigger strip the visitor can try (hover, click, scroll); "plays only while visible", reduced motion respected; numbers: KB, lines of code |
| 5 | Made in the editor | the existing tool sections, each tied to a piece from part 2 (table below) |
| 6 | Try it | the embedded demo, so the arc reads see → want → try → add |
| 7 | Proof | the file-size table, "only your SVG and CSS in your file", performance |
| 8 | Learn and start | the learn gallery, the docs, download |

### 2. Let the visitor touch something within five seconds

- Hover and click on the hero and gallery pieces: the Delete lid opens, the heart likes, the meditation pauses — with a small "point at it" hint.
- A "without motion / with motion" switch on one screen, so the value is obvious at once.
- Pieces that start when they scroll into view (the dashboard icons): the engagement also shows the trigger.

### 3. Speak the visitor's domain

- Domain tabs on the gallery: e-commerce (cart, payment, delivery) · travel and booking (search) · SaaS and dashboards (pipeline, reminders, hover icons) · consumer and wellness (meditation, weather) · websites (hero backgrounds, 404).
- Outcome words in the copy: "Keep people company while the search runs", not "Animated Vector Text".

### 4. Home as a chooser by need

- The hero: the same product composite, across the three apps.
- "What are you making?" → For your web app or site (SVG Animator) · For your mobile app (Lottie Animator) · Icons and illustrations (SVG Editor), each card showing a real-interface piece instead of only the logo.
- Distribution and updates ("official stores, always updated") become a small trust strip near the start band.
- The three tool tours (Shape Builder, Edit Colors, Gradient) move to the app pages; Home does not tour tools.

### 5. Showcase content per app

| Page | Pieces | Have / need |
|---|---|---|
| SVG Animator | the 10 real-interface pieces: flight search, delivery tracker, payment, pipeline, weather, wellness, dashboard list, 404, hover dialog, dotted background | **have** — SVGA files in `kf/app/tests/video/learn-assets/ui-*.json`, the mockups (artifact) and the learn videos |
| Lottie Animator | phone screens: splash, onboarding, tab-bar icons, pull to refresh, success, empty state | **need** — phone frames around existing Lottie sources (`splash-screen.json`, `animated-icons-watch.json`, `yoga-bright.json`, `devices.json`) plus a few new pieces |
| SVG Editor | an icon set in a nav bar, an illustration in an empty-state card, a badge or logo, a themed UI (light / dark from one colour) | **need** — the existing static SVGs placed in UI frames; most sources exist (see the inventory) |

### 6. Where each old section goes

| Page | Old section | New place |
|---|---|---|
| SVG Animator | #1 hero (girl on bike) | hero composite — the bike lives on as the delivery-tracker screen |
| | #2 try the app · #3 six reasons | Try it · the reasons become the numbers in Proof |
| | #4 Explore features (cat and butterfly) | drop, or the intro of "Made in the editor" |
| | #5 Create · Animate · Export | the intro of "Made in the editor", compact |
| | #6 Shape Builder | "Draw the icons your app needs" → the hover dialog |
| | #7 Patterns, markers, spray | "Backgrounds that move" → the dotted hero |
| | #8 Animated vector text | "Animated headlines and banners" → the SEARCHING FLIGHTS banner |
| | #9 Auto-Animate (Lottie export) | "From one state to the next" → the payment stages; remake as SVG Animator |
| | #10 Easing (Lottie export) | "Motion that feels native" → a toggle or switch; remake as SVG Animator |
| | #11 Animated icons | the gallery: dashboard list, hover dialog |
| | #12 Repeater | "Loaders and progress from one shape" → a loader in a button |
| | #13 markup sample | Into your app / Proof |
| Lottie Animator | #1 hero (plane and banner) | keep — it already is a travel use case |
| | #4 Explore (yoga) | gallery: the wellness screen in a phone |
| | #5 Create · Animate · Export (SVG Animator files) | remake from `features-2d-*.json` as Lottie exports, in "Made in the editor" |
| | #6–7 Auto-Animate, Easing | "Made in the editor" |
| | #8 Animated icons (866 KB) | gallery: tab-bar icons in a phone; remake lighter |
| | #9 Splash screens | gallery: app launch in a phone |
| | #10 Make it once (devices) | Into your app: React Native, iOS, Android, web |
| SVG Editor | #1 hero (origami bird) | hero: the icon and the illustration inside a UI |
| | #4 Shape Builder | "Draw your app's icons" |
| | #5 Color control | "Themes and dark mode from one colour change" — a strong use case |
| | #6 Gradient and opacity | "Illustrations with depth" → an empty-state card |
| | #7 Vector text | "Logos and badges" |
| | #8 Pattern, markers, spray | "Backgrounds and textures" |
| | #9 Clone, repeat (clock) | "Symmetric icons and diagrams" |
| Home | astronaut hero · app cards · One Toolbox · four reasons · three tool tours | showcase hero · "What are you making?" chooser · trust strip · Proof numbers · tool tours move to the app pages |

### 7. Fix the mismatches while re-organising

- No Lottie export on the SVG Animator page and no SVG Animator file on the Lottie page (convert with the playground in `kf/app/src/svgeditor/convertor/`).
- Every illustration states its size; anything over ≈ 150 KB is remade, converted or dropped.

### Owner decision (2026-10-16): reuse what the videos made — do not reinvent

The new parts are assembled from the "In real interfaces" and "Triggers" video work, not designed again:

| New part | Reused from (kf repo unless noted) |
|---|---|
| Gallery cards: the animations | `app/tests/video/learn-assets/ui-*.json` — the SVGA files the videos play (validated, frame-checked) |
| Gallery cards: the UI around them | the videos' preview pages `app/tests/video/scripts/learn-ui-*.svga.data/preview-N.html` + each project's `src/App.css` — static markup with `data-px-player` boxes, already sized for a ≈ 560 px column; on the site the web player fills the boxes, as `VscPreviewApp` does |
| "Show code" on a card | the lines each video types: `App.tsx` in `learn-ui-*.svga.data/<project>/src/` |
| One line per card ("where it fits") | the videos' intros and outros (generator `app/tests/video/learn/generate-learn-videos.mjs`), already checked against what the player does |
| "Watch the 1-minute video" | website `public/videos/learn-ui-*.mp4` + `.poster.png` + `.en.vtt` |
| Card titles and captions | the learn gallery entries, `src/pages/new-design2/svg-animator/learn.astro` (category `ui`) |
| The trigger strip (part 4) | `learn-triggers-practice` (tiles with their trigger in words) and `learn-triggers-ball` (labelled cards) |
| Domain tabs (idea 3) | groupings of the same ten pieces |

## Step 4 — concrete plan (SVG Animator page first)

### What the plan rests on (feasibility checked 2026-10-16)

| Question | Answer | Why |
|---|---|---|
| How do the cards play on the site? | the web player on the page — `@pixodesk/svg-animator-web` from npm, ≈ 41 KB gz once per page, loaded when the first card nears the screen | the same files and calls as the videos (`createAnimator`, `setPlaybackRate(-1)` for the hover lid); the files' own triggers already follow the site rule (start at 50 % visible, pause off screen) |
| Why not the site's preview player (`/app/player/embed.js`)? | it plays each file in its own sandboxed frame, with player chrome | a card needs the animation inside its own markup |
| Why not pre-rendered SVG exports, as the old pages do? | a possible fallback, but the hover reverse and the pause / resume button need the player's commands anyway | — |
| Where do the cards come from? | generated, never copied by hand: a kf script (`yarn website:real-ui`, next to `website:videos`) reads each learn-ui video's final preview page, its `App.css` and its `App.tsx` animation lines, then writes `src/components/real-ui/<Name>.astro` (Astro scopes the CSS; the `main {}` rules become the card root), copies the files to `public/assets/real-ui/`, and writes a manifest `src/data/real-ui.json` (title, use, one-liner, KB, video, code lines, held state) | change a video, re-run, the site follows |
| What does a card show? | one held moment of its situation; only the animation moves (the owner's direction on the mockup board, rounds 7–9) | no state machines; nothing jumps |
| Size budget | ≤ 15 KB gz per card, except the courier (44 KB gz). The payment bank icon must change first: it is four embedded PNG images (60 KB gz), not vector | a vector-animation site cannot show a raster icon |
| Phones | cards are designed 560 px wide; narrower screens scale the whole card down (a measured wrapper with a CSS transform) | the UI inside stays as designed |

### The page, top to bottom

Today's preview order: hero (girl on bike) → "Watch it first" video → demo → three ways (code) → what you get in the file
→ stat cards → six feature sections → "Made with it" → start. New order below; **new** = to build, **reused** = moves or stays.

#### 1. Hero — the animation doing its job in a product (**new** composition of **reused** cards)

- **"In context" means**: the animation is shown at work inside a product screen — a flight search that is waiting
  for results — instead of as an illustration standing on its own.
- **Left**: headline, one subline, the three existing buttons (Try it in the browser · Get started · `npm i …`), and
  three proof chips: "7 KB file" · "one line of React" · "plays only when seen".
- **Right**: a browser window drawn in CSS (three dots, address bar `yourapp.com/flights`) holding the **Flight search
  card** exactly as the video ends: route header, the plane with its SEARCHING FLIGHTS banner over the night sky, the
  search line, two results. Overlapping its lower-right corner, at 85 %, the **file dialog** (Delete · Cancel · OK)
  with a chip "point at it": the Delete lid opens on hover and closes on leave.
- **Phones**: the browser window only, the dialog below it.
- **Files**: `ui-flight-plane.json` (7 KB gz), `ui-hover-{delete,cancel,ok}.json` (< 1 KB each).
- **Headline drafts** (owner picks): "Animation your users notice — in your React app or website" · "Make your
  interface move — a few KB, one line of code". Subline: "Draw it, animate it, drop it into React, Vue or plain HTML.
  Every animation on this page is a Pixodesk file, played by the same open-source player."
- **The girl on the bike** leaves the hero: she becomes the delivery-tracker card (part 2) and stays in "Made with it".
- Effort: small–medium.

#### 2. In real interfaces — the gallery (**new** shell, **reused** cards; the use-case map is merged into its tabs)

- **What**: title and one subline; a tab strip (the existing `TabStrip`) with one tab per use; the open tab shows the
  live card on the left and a panel on the right: title, the one-liner, chips (KB gz · its trigger in words), the
  2–4 lines that add it (with copy), "Watch the 1-minute video" (the existing `VideoPlayer`, the published mp4) and
  "How it works" (docs).
- **Phones**: the tabs scroll sideways; the card scales; the panel goes under it.
- **Loading**: a tab's files load when it opens; the first tab with the page.

| Tab (use) | Card | Held moment | Interaction | Files (gz) | One-liner (from the video) | Code shown |
|---|---|---|---|---|---|---|
| Waiting | Flight search | searching, two results in | — | 7 KB | plays for as long as the wait lasts; the results appear under it | `{searching && <PixodeskSvgAnimator doc={plane} autoplay />}` |
| Order status | Delivery tracker | on the way | scroll pauses it | 44 KB | the courier rides while the order is on the way | `<PixodeskSvgAnimator doc={courier} autoplay />` |
| Steps | Payment | bank done · identity running · receipt next | — | ≈ 7 KB after the bank swap | each stage's state decides whether its icon moves or stands still | `progress={1}` · `autoplay` · `progress={0.5}` |
| Background job | Pipeline | running, 58 % | — | < 1 KB | moves while the job runs, stops when it is done | `play={running}` |
| Data-driven icons | Weather | partly cloudy, five days | — | 5 KB | the data picks each day's icon | `doc={ICONS[day.sky]}` |
| Pause and resume | Wellness | session running | Pause / Resume buttons work | 12 KB | breathes while the session runs, holds when you pause | `play={!paused}` |
| Seen once | Dashboard list | icons drawn | they draw in when the tab opens | 4 KB | plays once when the list comes into view, then stays | `doc={item.icon} autoplay` (file: once) |
| Error pages | 404 | the boat on the sea | — | < 1 KB | two animations, layered with a few lines of CSS | the sea and the boat lines |
| Hover icons | File dialog | at rest | hover plays, leave reverses | < 1 KB | forward when you point at it, back when you leave | the `HoverButton` core: `setPlaybackRate(1 / -1)` + `play()` |
| Backgrounds | Landing hero | lights drifting | — | < 1 KB | an animation behind your text, covering its box | `className="backdrop" … autoplay` + its CSS line |

- Effort: medium (the generator script + the shell). Risk: the 560 px cards on phones — the scaling must be checked on a real phone.

#### 3. Into your app (**reused**: the existing "three ways" code tabs; **new**: a trigger row from the triggers video)

- Keep "Three ways to put it on your site" (`CodeTabs`).
- Under it, "When it plays — saved in the file": the five tiles of `learn-triggers-practice`, live: Order on the way
  (load · pause off screen) · Delete (mouse over · reverse on leave) · Like (click · once) · Trial reminder (load ·
  once) · Payment step (none · the code decides). Each tile works as in the video; a link "Watch: triggers in practice".
- Files: the same as the gallery (cached) + `heart.json` (< 1 KB). Effort: small.

#### 4. Made in the editor (**reused**: the six feature sections and the "Watch it first" video, re-titled, each linked to a card)

| Feature section today | New title | "Used in" chip → gallery tab |
|---|---|---|
| Auto-animate | From one state to the next | Steps (payment) |
| Easing | Motion that feels right | Pause and resume (the breathing) |
| Animated vector text | Animated headlines and banners | Waiting (the SEARCHING FLIGHTS banner) |
| Patterns, markers and spray — animated | Detail that moves | — |
| Repeater | One shape, a whole grid | Backgrounds (the dot grid is two repeaters) |
| Animated icons | Icons that move | Hover icons, Seen once |

- The "Watch it first: from the editor to your app" video opens this part (how the cards were made).
- Fix on the way: Auto-animate and Easing still show Lottie Animator exports (374 + 269 KB) — keep the schematic only, or convert.
- Effort: small (titles + one prop on `FeatureSection`).

#### 5. Try it in the browser (**reused**: `DemoFrame`)

Moves here: the visitor has seen what it makes and how; now they make one. Effort: none.

#### 6. What you get in the file (**reused**: `SourceExcerpt`, `StatCard`)

- The excerpt shows a gallery file (the pipeline: < 1 KB, readable) instead of the cat and butterfly.
- New: a small table "Every animation on this page" — name · KB gz — generated from the manifest. Effort: small.

#### 7. Made with it (**reused**)

The old illustrations (girl on bike, cat and butterfly, Eiffel tower, …) stay here as the art showcase. Effort: none.

#### 8. Start here (**reused**: `StartBand`) + a link "21 learn videos".

### The other pages (after the SVG Animator page is judged)

| Page | What it gets | Reused | New — and the honest catch |
|---|---|---|---|
| Lottie Animator | hero stays (the plane already is a travel scene); a gallery "In mobile apps": phone frames with Wellness, Weather, Payment steps, tap icons, and a splash screen | the card markup of wellness / weather / payment / dialog (they fit a 360–400 px phone); the Lottie originals (`yoga-bright.json`, meteocons, LottieFiles, useAnimations, `splash-screen.json`) | a phone frame; a launch screen around the splash; Lottie playback (`lottie-web` ≈ 70 KB gz, or dotLottie); code lines for lottie-react — there are no Lottie card videos, the "watch" links go to the Lottie quick starts |
| SVG Editor | "In your interface", static: icons in a menu (the dialog icons' first frames), an empty-state card (the 404 boat, still), a badge (vector text), themes from one colour (light / dark) | the static SVGs and the card markup | a dark variant of `edit-colors-static` (one colour changed in the editor); exporting the icons' first frames |
| Home | hero: the browser window + a phone (wellness) side by side — "web and mobile"; "What are you making?" — three cards with a live mini each (web: the flight card · mobile: the wellness phone · icons: the icon menu); a small trust strip (stores, updates); the tool tours move to the app pages | everything from the three app pages | composition only, once the app pages exist |

### Build order and effort

| # | Step | Effort |
|---|---|---|
| 1 | Replace the bank icon with a vector one (and re-record the payment video, or keep the video and use the vector icon only on the site) | small |
| 2 | `yarn website:real-ui`: cards, files and manifest from the ten videos | medium |
| 3 | Player on the site (npm dependency + one mount script) | small |
| 4 | SVG Animator preview: hero (part 1) | small–medium |
| 5 | Gallery (part 2) | medium |
| 6 | Trigger row, re-titles and "used in" chips, file table (parts 3, 4, 6) | small |
| 7 | Check on a phone; owner review | — |
| 8 | Lottie Animator, SVG Editor, Home — in that order, each judged before the next | medium each |

### Open decisions for the owner

1. The hero headline (drafts in part 1).
2. Adding `@pixodesk/svg-animator-web` to the website (a player change then needs a publish before the site shows it).
3. The bank icon: a vector replacement for the video too, or only on the site.
4. Gallery tabs by use (this plan) or by domain (e-commerce, travel, SaaS …).
5. The "Watch it first" video: top of "Made in the editor" (this plan) or under the hero.

## Prototype (2026-10-16): `/new-design2/svg-animator`

The step-4 arc on one page; `/new-design/` is untouched, to compare against.

| Piece | Where |
|---|---|
| Page | `src/pages/new-design2/svg-animator.astro` — hero (the `/new-design` one without the status line, art = the astronaut over the editor `public/assets/svga/hero/astronaut.json`, restyled for the site: glass logo tiles, thin gradient bezel) → Watch it first (video) → Try it now (demo), both as on `/new-design` → "Animation your users notice" (the bento) → In real interfaces → Into your app (code + trigger row) → the six features, re-titled, "Used in" chips → What you get in the file (+ every file's size) → Made with it → Start here — owner, 2026-10-16 |
| Cards | `src/data/real-ui/cards.json` + `public/assets/real-ui/` — GENERATED by kf `yarn website:real-ui` (`app/scripts/website/real-ui.mjs`) from the learn videos; never edit them here |
| Components | `src/layouts/new-design2/` — `RealUiCard` (a card, scaled down as a whole on narrow screens), `RealUiGallery` (use tabs + panel), `RealUiBento` (dark bento: shiny-border tiles, each card fitted (`contain`) or edge to edge (`fill`), caption = playback pattern + size), `HeroProduct` (browser window + dialog), `RealUiStyles` (card CSS once per page) |
| Player | `src/scripts/real-ui.ts` loads `public/app/real-ui/pixodesk-svg-animator.umd.min.js` (the published npm player, copied by the generator) when a card nears the screen |
| Checked | hero hover (the Delete lid opens and closes), gallery tabs, phone width 390 px without sideways scroll; bento fill rules applied, captions fit their tiles |
| Auto-animate art | the old Lottie export's story (kf `dev-public/test/lottie-ours/auto-animate.json`) converted to SVGA by the editor and restyled in the schematics' language (a #172036 canvas, thin muted lines, soft-red pins, lavender keyframes, a peach playhead, a smaller play menu, the shape blue → red as the original, in soft tints, with an outline trail; no glows — owner: "more elegant"); the shape's lost loop restored (converter bug: Lottie loopOut on a path → no `loop` on `d`) → `public/assets/svga/sections/auto-animate.json`, played like the hero; the section's schematic removed — owner 2026-10-16 |
| Easing art | the old Lottie export's source (kf `dev-public/test/lottie-ours/easing.json`) converted to SVGA and restyled the same way (canvas + hairline, lavender velocity chart, soft-indigo acceleration band, soft-red ball on a muted dashed arc, peach playhead, lavender keyframes, ink shadow); the drawn footballer replaced by a small, stout astronaut (first a robot; owner: an astronaut in the hero's style — white suit, navy outline, orange pads, glass visor with a cyan reflection, chest box, backpack; short legs, calm: only the kick moves it; capsule limbs on round joints — the drawing could not be animated cleanly; owner chose a robot over a LottieFiles kicker): it stands on the chart's floor with its support foot planted on one spot all loop (owner: little walking), watches the ball, gets a new ball at its feet, swings and kicks it from the ground at 3.45 s; the ball rises along a gravity arc into the chart ball's start exactly at the loop point (the chart ball fades once at rest); follow-through, the kicking foot comes back down beside the support foot; shadow under its feet; solid fills (owner: not wiry); the charts start at the kick: the first arc becomes one symmetric hill — its rise is its own fall mirrored about the apex (same gravity), so the kick sits at x ≈ 222 and the flight takes 500 ms at the chart ball's 155 units/s; plus the velocity jump + line, gravity band, zero levels, floor, guide; the Position row in step: first keyframe at the kick, the rise's speed wedge (the fall's, mirrored), the playhead waits at the kick, runs with the flight and the bounces, holds at the end → `public/assets/svga/sections/easing.json`; the section's schematic kept — owner 2026-10-16 |
| Vector text art | "Animated headlines and banners": the old `vector-text-anim.svg` replaced by one JSON in the restyled sections' language (two #172036 cards, hairline, Caveat notes, lavender keyframes with their values above them, peach playhead, glyph text — Inter Bold, Montserrat Black, Roboto Bold, Caveat Bold embedded): card 1 = the schematic's "animated text on a path" sliding along a still dashed wave (Offset 0 → 388 → 0; Text Path and Position static); card 2 = the old two-line headline "PIXODESK SVG TEXT" / "ON A WAVY PATH" with the old technique — the waves slide right one period at a time (Position x 0 → 300 → 600) while the offset slides back by that period's arc length (796 → 491 → 186), so the letters stay put (≤ 0.8 px drift) and only ride the rolling wave; linear, seamless; edges faded by a mask. Card 1's eased slide is sampled keys (glyph-on-path bakes intervals linearly); its strip draws the design keys. Generated by kf `node scripts/website/section-vector-text.mjs` → `public/assets/svga/sections/vector-text.json` (68 KB), played like the hero; the section's schematic removed; the old SVG stays for `/svg-animator` and `/new-design/svg-animator` — owner 2026-10-16 |
| Shape builder art | Section "Shapes" renamed "Shape builder" (catalogue title; slug/anchor `shapes` kept). The old bird SVG (music notes, hand-drawn tail) replaced by one JSON in the restyled language: tinted guide circles first, then part by part — B, the stage's dashed mesh, cyan clicks, + Add — body (head + belly: 3 regions), wing (overlap of two circles), tail (overlap of two circles outside the belly: the tail redesigned as a feather lens so it is one click and meets the body exactly), beak (overlap outside the head); circles fade, the bird hops, loop (10.1 s). The real toolbar on top (B · + Add · − Remove │ All · Deselect │ Subtract · Intersect · Exclude). The right-column schematic removed; under the art a static "Shape Builder actions" panel (`shapeBuilderActions.ts`): 1 pick regions — All · Subtract · Intersect · Exclude · Deselect on two circles; 2 apply — + Add / − Remove before → after. Generated by kf `node scripts/website/section-shape-builder.mjs` → `public/assets/svga/sections/shape-builder.json` (68 KB, exact region outlines); the old SVG stays for `/new-design/` — owner 2026-10-17 |
| Color art | The old static art (not about colour) + the Used Colors schematic replaced by one JSON, two cards: (1) Fill │ Stroke tabs over the same circle in every colour type — No Color · Flat Color · Linear Gradient · Circular Gradient · Pattern, gradients with their tool handles; the pointer clicks Stroke and the circles become rings; (2) Used Colors: an app mockup (avatar, toggle, chart line + gradient area, button) beside the panel (All │ In selection, swatches); the pointer opens the violet swatch and drags Edit Color's hue to teal — fill, stroke and gradient stop follow, tagged — then back. 2D Animator: `color-2d.json` without Pattern (a Lottie file has none). Line + facts rewritten (types · change everywhere · pick it your way), subtitle "Every kind of colour, and the ones in use"; schematic removed. kf `node scripts/website/section-color.mjs` — owner 2026-10-17 |
| Gradients art | The mango-juice art + gradient schematic replaced by a sunset made of gradients only (sky linear 3 stops, sun circular, glow = circular stop fading to alpha 0, hill, sea, reflection) with the gradient tool's handles and a stops panel (Sky · Sun · Glow over a checker); the animators ease day → dusk → day over a keyframe strip (Sky stops · Sun Position · Glow stop alpha), the SVG Editor shows the dusk still (`gradients-static.json`). Opacity dropped from this section's facts (glow-by-alpha kept). kf `node scripts/website/section-gradients.mjs` — owner 2026-10-17 |
| Draw-on removed | The "Draw-on" section (trim-stroke icons, SVG + Lottie variants) removed from the new-design2 catalogue and features — "no use in it" (owner, 2026-10-17); the live `/animator` and `/svg-animator` pages and `/new-design/` keep their icons art |
| Use cases bento, consistent | Owner (2026-10-17): each card shows its animation, the rest is decoration — bento-only CSS in `RealUiBento.astro` (cards.json untouched): Wait = slate sky, plane lavender + banner cyan, no shadows/blur; Steps = the three steps side by side, bigger (header + order hidden), running step cyan-tinted; Mouse in / out = the three buttons stacked, bigger (file row hidden), OK cyan like the other primary buttons; Appear once = icon + one label each, bigger (header, titles, sentences hidden), warm dark plates; Progress = flow + names + bar (header, captions hidden); 404 sea toned to the slate family |
| Easing schematic | its three panels as a row of titled cards under the animation (Easing chart · Easing presets · Velocity chart; `SchemaCards.astro`: the same scene cropped and clipped per card, plays when in view, click replays); the presets card shows the editor's real velocity mini charts (kind `easingPresets` = `easing(true)`: linear band, gravity fall/rise wedges, ease in/out/in-out — only the presets the editor has); the "How it works" steps dropped (owner); `FeatureSection` got an optional `below-art` slot (renders nothing on /new-design) |
| Repeater art | the site's `animated-repeater.svg` export could not play the scene (a pre-rendered SVG+CSS export from an older editor; the JSON plays fine in the player — its native engine correctly falls back to the frame loop for the unitless rect width/height, but used to build every WAAPI effect first and flood the console: fixed in the player repo, effects are built only after the support check); opened by the editor → SVGA JSON, the burst kept (phone mock-up dropped), square 400 × 400, restyled (canvas, soft rays, peach dots, lavender + peach squares, thin non-scaling strokes, soft corners, translucent glass fills on the squares, a dark radial backdrop (indigo glow → near-black), masked to the rounded canvas; a circle swirl was tried and dropped), `engine: 'js'`, loop 4.9 s (was 6 s with 1.6 s empty); first fact reworded (no petals any more) → `public/assets/svga/sections/repeater.json`; "How it works" = four scene cards under it (In a line · In a grid · In a circle · Spiral, `repeaterScenes.ts` via `SchemaCards`); the schematic dropped — owner 2026-10-16 |
| /new-design2/animator | `src/pages/new-design2/animator.astro` (owner, 2026-10-17): hero with the /new-design/animator text and the Lottie astronaut (kf `app/tmp/austonaut-for-lottie-website-page.json` → `public/assets/lottie/hero/astronaut.json`: the screen frame restyled like the SVG Animator hero's, looping, the owner's own framing 2880 × 1400; no side logos) → Watch it first (the four Lottie quick starts) → the Lottie editor demo; nothing after yet |
| /new-design2/animator-studio | hero only (owner, 2026-10-17, round 2): a space station — a dark-glass core with a glowing heart, a halo ring, a dotted orbit ring, a disc with 18 pods riding round it (two slots per loop), a spire and a keel, a thruster on each side firing down, two arms with light pulses and an "AI chip" module out to the two editors as big screens (Lottie left: a rocket fuels up, counts down, lifts off slowly (unclipped: its nose just out past the screen's top, ≈ 2.4 s up), and comes slowly back down to its pad (≈ 2.7 s); SVG right: a satellite unfolds its wings, charges its battery, transmits, folds up), five small astronauts in different suits on tethers (one welding), stars, a Milky Way band, a big ringed giant rising past the box's top (the page sets `overflow: visible` on the station's SVG),  two small planets; `public/assets/studio/station.json` (kf scratch `studio-station2.mjs`; the document runs 16 s: every 8 s cycle carries `loop: true` and plays twice, the rocket launches once per 16 s). The big planet under it is a static full-width strip `public/assets/studio/planet.svg` (`studio-planet.mjs`; `preserveAspectRatio xMidYMin slice`, CSS height `clamp(184px, 35.4vw, 623px)`, its auras fade out before the strip's top edge; the big cratered golden moon (r 270) — the Lottie hero's palette, dimmed — rises from behind its horizon under the Lottie Animator screen, strip x ≈ 1040, the atmosphere glow drawn over it; the strip has 200 units of headroom for it, and the CSS height is 680/480 of what keeps the horizon in place; since 2026-10-17 the owner edits planet.svg in the editor — it is the source now, studio-planet.mjs would overwrite it; the moon has a warm atmospheric halo + a lit limb) |
| Collages tried | one app (removed), bento (kept), overlapping (removed) — owner, 2026-10-16 |
| Detail art | "Detail that moves", second take (owner: a Christmas tree instead of the Eiffel tower; the section demonstrates clones, patterns, markers): one #172036 card in the restyled language — the SNOW is one tile (enlarged top left, "the snow is one tile, sliding down") filling the sky, its Position sliding down two tiles per iteration (linear, seamless) — the moving pattern now has a reason; the tree's NEEDLES (mint chevrons) and the presents' WRAPPING PAPER (stripes, dots) are still tiles; three strings of LIGHTS across the tiers: bulb markers on the middle nodes, rings on the ends, the Path sways rest → sway → rest (eased) and the bulbs ride; ONE BAUBLE (a symbol) sprayed 14× over the tree — own size, angle, colour (the ball takes each copy's fill) — the original swings ±9° on its hook, so every bauble swings; strip rows Snow tile · Position, Lights · Path, Bauble · Rotation. "How it works" back, minimal: the four steps only (Make Pattern, Markers, Spray, Animate), a squat card under the art, inset to line up with the art's card — built in the page (the art's html), so the shared FeatureSection is untouched. Generated by kf `node scripts/website/section-detail.mjs` → `public/assets/svga/sections/detail.json` (63 KB); no static `patternTransform` on a pattern (the player writes the object literally → console error). Shared look in kf `scripts/website/sectionArt.mjs` (the vector-text script uses it too; its JSON regenerated byte-identical) — owner 2026-10-16 |
| Keyframes art | "Keyframes" (the first way to animate: the clock next to a property, no auto-animate pins) had text only; now the site's boat (the "Not found" card's `real-ui/notfound/boat.json` — the player's own example; its shapes are READ from that file, restyled: lavender sails, peach hull, pink flag) rocking on three cyan wave bands under a peach sun, in the restyled language; beside it (owner, 2026-10-17: "illustration of the right panel with attributes with watch icons") the editor's Properties panel for the boat, redrawn from a live look at the editor (BOAT / TRANSFORM, label · clock · value fields): Position, Skew and Scale with their clocks off, Rotation lit with its clock on and its value counting 6° → −6° → 6° in step with the boat (one label per run of the same rounded value, shown as steps), Caveat "click the clock: it animates"; three cards (scene, panel, a full-width timeline card); the timeline shows the editor's clocks (MDI timer / timer-outline, the editor's own icons): Boat · Rotation clock ON 6° → −6° → 6° (the boat file's easing), Boat · Position clock OFF (it stays), Waves · Position clock ON x 0 → −40 → 0; Caveat note "just the clock: switch it on, set a value at two times — it moves"; 5 s loop. The shared strip (sectionArt.mjs) gained an optional per-row `watch` (on / off) — the other arts regenerated byte-identical. Generated by kf `node scripts/website/section-keyframes.mjs` → `public/assets/svga/sections/keyframes.json` (75 KB); shown on both animator pages (features.ts ANIMATORS variant) — owner 2026-10-17 |
| Where it plays diagram | SVG Animator page (owner, 2026-10-17: "instead of Where it plays, a diagram like the Triggers one; highlight JS / CSS and file extensions as the home's diagrams do"): `sections/WhereItPlaysGraph.astro` replaces the five cards — Save (the pre-rendered SVG's three flavours, the Pixodesk JSON) → Play (the browser for the SVG; the web player, React, Vue and React Native packages for the JSON — React Native "in development") → Ship (web page, React & Next.js, Vue & Nuxt, React Native & Expo); `.svg` / `.json` / package names as green chips, CSS / JS in the paler green (home/Marked), wires + hover tracing (home/Wires, wired-diagram.ts), the look home/DiagramStyles; the lead (MIT, GitHub, the player docs) kept. The nodes it shares with the home's "How it fits together" (the flavours, Pixodesk JSON, the browser, the places) moved to `diagramNodes.ts` — the home diagram's HTML unchanged (compared). players.ts: `short` names, a `status`, `pxPackageWays()`. The 2D Animator page keeps its Lottie flow — owner 2026-10-17 |
| Shape morph art | "Shape morph" (owner, 2026-10-17: "add animated meaningful content and fill all width") had text only; now a full-width section (AppPage OWN_SECTION → new `sections/WideFeature.astro`: header + line, the content across the width, the facts and the manual link — Triggers now uses it too, its HTML unchanged) with four cards, each a path whose NODES are animated, a white dot riding every node (the path's markers), and a one-row Path timeline (blue clock, keyframes, peach playhead): Icon states (play ▶ ↔ pause ❚❚ — the triangle split in two, each half a 4-node quad that becomes a bar), A blob that breathes (8 nodes, each to its own radius, three states), One shape into another (a circle's 10 nodes pulled into a 5-point star — handles shrink to sharp tips — and back), Round corners (a square's corner radius 6 → 56 → 6: 8 nodes, two per corner). 4 s loop, eased. kf `node scripts/website/section-shape-morph.mjs` → `public/assets/svga/sections/shape-morph.json` (38 KB). The editor's clock blue is now one constant (sectionArt.mjs `CLOCK_BLUE`) — owner 2026-10-17 |
| Known | the payment bank icon is still the raster one (66 KB gz card); Auto-animate and Easing still show their Lottie exports; the new components use scoped CSS — Tailwind classes added in new files did not generate until the dev server restarts; the dev server once served a stale CSS module for an edited `<style is:global>` (rules in the HTML, missing in the browser) — touching the file refreshed it |

## The Lottie page — what belongs on it (2026-10-17)

The family: SVG Editor (static, free) · Lottie Animator (standard Lottie for the third-party players apps already ship) · SVG Animator
(SVG + our own player, web-first) · Animator Studio (both animators in one app; the existing Lottie subscription app becomes Studio (sub)).

| Section | Why on the Lottie page | Taken from |
|---|---|---|
| Hero · watch it first · try it | the same opening as the SVG page: see it, then do it | /new-design/animator |
| Into your app, with the Lottie player you already use | the Lottie buyer's first question is "does it work with my player?" — code for the four web players (the quick-start videos' code) + where it plays (web, iOS, Android, RN, Windows) | new; FlowDiagram from /new-design/animator |
| What you get in the file | one standard file, two ways to animate, seven exports | /new-design/animator |
| Features, titled by what they give | the shared editor features; auto-animate and easing use the restyled SVG-page art (editor features, no format claim) | /new-design/animator + /new-design2/svg-animator |
| See it done in four minutes | the long tutorial exists only for the Lottie Animator | /new-design/animator |
| Which app is for you? | a visitor who needs web SVG or both lands on the right page; Studio is introduced here | new (DecisionTable rows of /new-design home + Studio) |
| Start here | prices + stores | /new-design/animator |

Left out on purpose: the bento and the "In real interfaces" gallery — those cards are SVGA files in our player, the SVG Animator's
story (a Lottie version would need the cards' Lottie sources played by lottie-web); the repeater section — not checked that the Lottie
editor has it; the "All devices" band — the where-it-plays diagram says the same.


## App pages from one catalogue (2026-10-17)

Owner: sync the SVG Animator and 2D Animator (Lottie) pages, add the SVG Editor page; short titles (1–3 words), the long ones as
subtitles; group names; a section on several pages links to the same section on the others; no duplicated content.

| Piece | Where |
|---|---|
| Groups, sections, order, titles, subtitles, apps | `src/layouts/new-design2/catalogue.ts` (the one list) |
| Page body (bands, sections, backgrounds, flip) | `src/layouts/new-design2/AppPage.astro` |
| Feature copy + art (per-app variants only where content differs) | `src/layouts/new-design2/features.ts` |
| Other sections (hero, quick start, try it, frameworks, where it plays, file format, extras, start) | `src/layouts/new-design2/sections/` |
| Header (group, title, subtitle, app tabs) · group band | `SectionHead.astro` · `GroupBand.astro` |
| Pages | `src/pages/new-design2/{svg-animator,animator,svg-editor}.astro` — only the app |

Groups: Intro (hero, Quick start, Try it) · Use (Use cases, Frameworks, Where it plays) · Animate (How to animate, Easing, Text
animation, Draw-on) · Draw (Shapes, Color, Gradients, Fonts, Patterns & markers) · Effects (Repeater) · Files (File format) · Misc
(no art yet, text cards: Triggers, Scroll animation, Motion path, Shape morph, Masks, Clones & spray, Filters, Export & import; in
doubt: One app, Splash screens, Tutorial, Which app?, At a glance) · Start here. Hero titles kept (owner). Removed from the SVG
Animator page (owner): In real interfaces (and its "Used in" chips), Made with it, Every animation file on this page. New: the SVG
Animator's Where it plays (the player libraries, what each is for, links). Shared components changed additively only: optional `head`
slot on FeatureSection, VideoSection, DemoFrame; PreviewBanner lists the new SVG Editor page.

### SVG Editor hero (2026-10-17)

`public/assets/svg/hero/rocket-launch.json` (kf scratch `hero-svg-editor.mjs`, built from the 2D Animator hero's laptop, background and
stars): the SVG Editor's screenshot in the same glass frame on the keyboard bar; on its canvas a rocket on a pad, selected (blue box
and handles, gone while it flies); a gantry staircase from the keyboard bar — outside the app — up to the hatch; a small astronaut
(the hero's suit colours, an IK walker) climbs, boards, the rocket lifts off until its nose leaves the app and lands, the astronaut
climbs back down and turns. 21 s loop = 3 × the base's 6990 ms star loop (the stars loop seamlessly). The base image's
rounded-corner mask is re-fitted to the new screenshot (it would crop it to the old one's width).

Update (2026-10-17, owner: "this is static SVG"): the hero is a still — `public/assets/svg/hero/rocket.json` (`hero-svg-editor.mjs
--static`; the animated version is the same script without the flag) — the astronaut at the foot of the stairs on the keyboard bar;
the rocket (owner: the first palette, only a little cooler) — a fat, bulging hull, the nose cap cut from the hull's own curve (no
"hat" seam), a centred squat hatch, gloss and a faint rim light, a soft halo; a lattice launch tower with a red beacon, a service arm and
hose to the rocket; see-through steam at the base; solid stepped stairs with a glass railing that stops before the hatch. Behind the whole hero section: `public/assets/svg/hero/space-bg.svg` (`hero-bg.mjs`; waves, the Milky Way and
the studio's planets — Milky Way at 18 %, planets at 28 %; the cosmic wave (three blurred ribbons across the full width, no sharp crest line) and the stars (spread like the
studio's: small points, a few with halos and spikes, a few soft sparkles) moved here from the hero art; behind the art only, from 90 px
above it to its bottom, the page's full width, faded out at both edges (CSS mask); preserveAspectRatio xMidYMin slice). The Easing art's kicker is now this astronaut
(kick-robot.mjs re-skinned at 1.15 × the climber's units; poses and timing unchanged).

### Cosmic backgrounds for all three heroes (2026-10-17)

One recipe (kf scratch `hero-bg.mjs <variant>`): the cosmic wave, stars spread like the studio's, a faint Milky Way, planets. Each hero
art sits in `sections/HeroBackdrop.astro` (the background spans the page width, from 90 px above the art to its bottom, faded at both
edges). Variants: `public/assets/svg/hero/space-bg.svg` (SVG Editor: violet → pink → cyan, peach giant, golden moon),
`public/assets/svga/hero/space-bg.svg` (SVG Animator: cyan → indigo → violet, ice giant upper left, pale moon right),
`public/assets/lottie/hero/space-bg.svg` (2D Animator: orange → pink → violet, lavender giant upper right, red moon left). The 2D
Animator's art still carries its own wavy shape and sparkle stars (owner's file, untouched).

### `/new-design2/` home (2026-10-17)

`src/pages/new-design2/index.astro`, copied from `/new-design/` and trimmed: its job is to tell the visitor about the apps and send
them to the page they need. Removed (owner): the animation under "How it fits together", "The same drawing tools in all three apps",
"Edit colours", "Gradients and opacity", "Shape Builder" (the "All drawing features" link stays for now). The three cards (the
design-1 JSON) are named and linked from the catalogue; "Which app do I need?" rows = `layouts/new-design2/decisions.ts`, shared with
the app pages' Misc "Which app?"; the start band's demo links go to the app pages' Try it.

### Home openings to compare (2026-10-17)

Owner: impressive like the other heroes, show the apps, make the choice clear and get the visitor to the app page fast. Three openings
stacked on top of `/new-design2/` (each over the home's cosmic background, `hero-bg.mjs home` → `public/assets/index/space-bg.svg`),
ranked; the old opening follows, labelled:

| Rank | Option | Component | Idea |
|---|---|---|---|
| 1 | Three doors | `home/OptionDoors.astro` | headline + one tall card per app with that app's own hero art, playing; tagline, files, price, "Open …"; under them a wide Animator Studio card (SVG Editor + SVG Animator + 2D Animator = Animator Studio, the station playing) |
| 2 | What are you making? | `home/OptionChooser.astro` | the "Which app?" needs as choices; the matching app lights up ("Best match"), CSS only |
| 3 (removed: owner) | Made with Pixodesk | — | a bento of real work, each tile chipped with its editor and linking to it |
| 4 (not built) | Station hub | — | the studio's station with three screens (one per app) — the most spectacular, heavy (≈ 700 KB), echoes the Studio page |
| 5 (not built) | App orbit | — | the three app icons orbiting a centre — pretty, says little |

Pitches, prices, art and accents: `layouts/new-design2/apps.ts` (the "Which app?" rows take their prices from it).

Decision (2026-10-17, owner): the "three doors" variant is the opening (`home/HomeHero.astro`, was OptionDoors); option 2 and the
old opening removed. Its title is the old one, "Create and Animate SVG and Lottie"; the subtitle merges the old two lines; no
meaningless numbers ("Three editors", "All three" gone; Studio's tagline "2D Animator (Lottie) and SVG Animator in one app", owner).

### Home "Which app do I need?" as a decision tree (2026-10-17)

Owner: dark, engaging, a few big words lead to the forks, details optional and small, diagram-like, AI-modern. `home/DecisionTree.astro`:
Your graphic → Static → SVG Editor; → Animated → Lottie / SVG / Both → 2D Animator / SVG Animator / Animator Studio. Gradient wires
with light flowing along them (drawn from the nodes' positions, so the same markup is a row of columns on desktop and a column on
phones, the second level stepped in); hovering a choice lights its path from the root. App nodes: logo, name, one line (price · files).
The app pages keep the table (`decisions.ts`).

### Home "How it fits together" as a diagram (2026-10-17)

Owner: make a diagram of it like the decision tree; placed after "Which app do I need?". `home/FlowGraph.astro`: Draw → Save → Play
as three columns — the editors (catalogue + pitch taglines, link to their pages) → the files (.svg / .json / Lottie) → where they play
(any web page, your code, native apps; each links to its docs page). Wires show which editor makes which file and where it plays;
hovering any node lights everything connected to it, upstream and downstream. On phones the columns stack and the wires form a spine.

Shared between the two diagrams (single source): `home/Wires.astro` (wire layer, gradient, flow animation) +
`src/scripts/wired-diagram.ts` (draws wires from node positions, redraws on resize, hover lighting), `home/DiagramStyles.astro`
(the `dg-*` node look). Each diagram keeps only its grid in scoped CSS.

#### "How it fits together", more detail (2026-10-17)

Owner: add more to it — React, Vue; static vs animated SVG; animated SVG as its flavours (from the app, the formats and the player docs).
Draw → Save → Play → Ship:

| Column | Nodes | Source |
|---|---|---|
| Draw | SVG Editor · SVG Animator · 2D Animator (Lottie) | catalogue + apps.ts |
| Save | Static SVG · Animated SVG (group: CSS keyframes · CSS + JS triggers · JS animation) · Pixodesk JSON · Lottie · Images & video | docs "Choosing a format", app `SvgaFileType` / `LottieFileType` / `ExportType` |
| Play | The browser (nothing to install) · Pixodesk player · Lottie players | `layouts/new-design2/players.ts` |
| Ship | Web page · React · Vue · React Native · iOS · Android · Windows · Anywhere | player + Lottie docs |

- Main wires = what each editor saves; faint dotted wires = what it also exports (kf `getExportTypesFor`: SVG Editor → Lottie, images; SVG Animator → Lottie, video, GIF, images; 2D Animator → SVG Animator formats, video, GIF, images).
- Hover traces a node both ways and dims the rest (both diagrams). Phones: one column, every wire down the middle.
- Owner: what a hover reaches only through an export is not a full connection (`wired-diagram.ts` traces twice: main wires only = connected, all wires = reach; the difference = limited). First amber for limited — too loud (owner) → swapped: connected = gold (`--traced`: wires, card borders incl. the app cards — owner; their logo and arrow keep the accent; both diagrams), limited = the usual wire colours at .7 + cards at .9 opacity with a dashed border; unrelated = cards .2, wires .04 (owner tuned: unrelated fainter, limited brighter).
- `players.ts` = the player lists, moved out of `sections/WhereItPlays.astro` (which now imports them). Platform glyphs (react, vue, apple, android, windows, image) added to `new-design/glyphs.ts`.
- Gotcha: `WireKind.export` broke the Astro compiler (it hoists `export` from frontmatter) → the kind is `secondary`.
- Owner: mark the important words inside the blocks. `home/marks.ts` (`MarkKind` ext / tech / pkg + `ext()`, `tech()`, `pkg()`, `joined()`) + `home/Marked.astro`: extensions = code chips, bold green text #22c55e (owner: greener than the mechanisms; #86efac, #4ade80 not green enough) on a faint cyan background, padded 1px 6px (inline-block, so wrapped rows never overlap), no border (owner) (every Save block, each flavour shows its `.svg`), mechanisms = barely green #a7dfb9 (owner: pale pink read as white, lime too yellow, #4ade80 too green) (CSS @keyframes, CSS, JS, WAAPI, frame loop), packages = the same chips as extensions (owner; blue tried) (our player packages, the Lottie players). Gotcha: this site's scoped styles add no specificity (`:where`), so marks use two classes to beat `.dg-fork span`.
- Owner: Pixodesk player = the full npm names, one per line (`pxPackages()` in players.ts now returns full names; `stacked()` in marks.ts = marks with `block`).
- Owner: every big card title plain white (`.dg-fork b`, `.group-head b`; was the cyan → violet → pink gradient) — both diagrams.
- Owner: the same green chips in the hero cards and in "Which app do I need?" — extensions and CSS / JS alike (`<Marked chips>`). `apps.ts` pitches: `chips: Array<Text>`, `line: Text` (the SVG Animator's ".svg" marked); `FileExt` / `Mechanism` enums in `home/marks.ts` = one spelling of each extension and mechanism (hero, tree, diagram). The tree's files line wraps instead of being cut off; the hero's chips are a plain line with "·" between files (no pill borders).
- Owner: a format word that means the file is written as its extension, marked: "or `.json` for the React…", "saved as clean `.svg` files", the tree's SVG fork "pure `.svg`". Names stay words (headline "SVG and Lottie", "Standard Lottie", card names "Static SVG" / "Pixodesk JSON").
- Owner: the hero's Animator Studio card shows which apps it includes, under its title "[2D Animator (Lottie)] and [SVG Animator] in one app" — each name on a simple background in its accent (owner: no border, glow or logo — like the file chips) (`STUDIO.includes` in apps.ts; the tagline text is built from the same list). Replaced: the small uppercase tagline and the "SVG Editor + SVG Animator + 2D Animator = Animator Studio" row.

### App pages: Triggers, Scroll animation, Motion path, Shape morph → Animate (2026-10-17)

Owner (on the SVG Animator page): move them from Misc to the animation group. One catalogue → both animator pages (Scroll animation is
SVG Animator only). No art yet, so they show as one card grid after Draw-on.
- Then Masks, Clones & spray, Filters → Draw (after Patterns & markers), on all three pages (owner). Then Export & import → Files (after File format). Misc now holds only the 2D Animator / SVG Editor extras.
- Owner: no "Which app?" on the SVG Animator page → its Misc group is empty, so the page has no Misc band (2D Animator and SVG Editor keep both).
- Owner: "How to animate" → **Auto animate** (slug `auto-animate`); a new **Keyframes** section before it on both animator pages — the property's clock (the manual's "Keyframes by hand"; owner called it the watch button), link to /docs/svga/editor/keyframes#add-keyframes. No art yet → a single card (half width).

### App pages: Triggers full width + diagram (2026-10-17)

Owner: Triggers takes the whole width, with a diagram like the home's: how to choose the trigger, and where in a UI it is typically used.
- `sections/Triggers.astro` (full width via AppPage `OWN_SECTION`; text still from features.ts) + `sections/TriggerGraph.astro`:
  When (should it play?) → Trigger (the editor's start options; mouse-out / out-of-view choices: continue, pause or reset) → Where
  (loaders, hero intros, illustrations, counters, cards, buttons, toggles, app states). SVG Animator only — a Lottie file carries no
  trigger, so the 2D Animator page keeps its text (now full width too).
- The SVG Animator facts keep only "Saved in the file" (Start and Out of view are the diagram's).
- Shared diagram styles grew `dg-step`, `dg-place` (+ `dg-glyph`, `dg-pname`) and `dg-accent` (a node in its app's colour); the home's
  FlowGraph uses them. On stacked layouts a step's small line sits under its word, clear of the middle wires.
- Owner: schematic illustrations inside the trigger blocks (styled like Draw-on's schematic, smaller): `TRIGGER_SCENES` in
  new-design/schemas.ts (additive; `MiniScene` = one clock, 100×64) — load: the spinner turns · when visible: the page scrolls, the chart
  grows · mouse over: the card lifts and glows, settles when the pointer leaves · click: the heart fills, the next click empties it ·
  from JS: play() → the check draws. `src/scripts/mini-scenes.ts` plays each once in view and again when the pointer enters its block; at
  rest (and under reduced motion) a scene shows its end state. (A first try put one big five-panel schematic under the diagram — owner:
  inside the blocks.)

### Fonts art (2026-10-17)

Owner: replace the old strange art on the right with relevant content, from the text part and more. `public/assets/svga/sections/fonts.json`
(kf `node scripts/website/section-fonts.mjs [--preview <dir>]`; still, engine js; 520 wide so the page shows it about 1:1): four cards from
the manual's Text page — Your fonts (Montserrat Black, PT Serif Italic, Caveat; ".ttf travels with the file — or a browser font"),
Only the letters you use ("Pixodesk" + its Used Glyphs tiles), Text on a path (an arch with its nodes and handles), Text to Bezier
shape ("Aa" live → outlines with their real nodes; TrueType's implied points skipped). All glyph text. The "How it works" schematic
stays; the old `vector-text.svg` is no longer used by new-design2.
- Then (owner): the old "How it works" schematic (`vectorText`) removed from the Fonts text column.
- Repeater art (owner: gigantic next to the text, needn't be square): a 560 × 360 landscape canvas, the burst COVERS it (owner: cover, not contain — scale 1.4, centred, top and bottom cropped)
  (`repeater.json` reframed; the scratchpad repeater-restyle.mjs does the same on a re-run); the section's ratio 560 / 360.
- Repeater's scene cards (owner: more padding above and below than at the sides): SchemaCards' own-scene cards size to their view
  (`.sc-card > svg`: height auto, 6 px all round) instead of a fixed 150 px box that letterboxed the square scenes; panel cards (Easing) unchanged.
- Easing (owner): the art a bit smaller, contained (`max-width: 86%`, centred; the cards row keeps the full width). The ball flashed at
  the chart's end on every loop ("jumps to end and back"): the chart ball's opacity ramped 0 → 1 over 3749 → 3750 ms while it still sat
  at the end. Now it stays hidden until the loop wraps, and the kicked ball stays visible to the very end — the hand-off is at one point
  (probed: both at the same spot at 3749.9 / 3750). Fixed in easing.json and the scratchpad easing-restyle.mjs + kick-robot.mjs.
- Motion path (owner): headlights — two cones per car ahead of the nose, a radial white gradient from the lamp fading out
  (55 → 25 → 7 → 0 % alpha), a small lamp dot each; drawn under the car, turned with it by Auto Orient (kf section-motion-path.mjs).
- Export & import (owner): full width with a diagram like the page's others — In (SVG, Lottie, images, fonts: what every app opens or
  imports) → the app → Out (saves = main wires, "opens again"; exports = dotted), per app from the apps' own code (kf-el-app *MainApi
  dialog filters, TExportConfig getExportTypesFor). `sections/ExportImport.astro` + `sections/ExportGraph.astro`; the two facts dropped
  (the diagram says In and Out); `FileExt.ttf` added to marks.ts.
- Owner (the dev monitor showed "other … 3 / 3 playing" with no animation on screen): the diagrams' flowing wires (CSS keyframes)
  ran everywhere, all the time — 37 animations in Where it plays, Triggers, Export & import. Now paused unless their diagram is in view
  (wired-diagram.ts sets `data-in-view`; Wires.astro runs main wires, and a secondary one only when traced). Probed: 0 off-screen.
- Use cases "Wait" tile: the plane plain white again (owner; it was lavender). "Where it plays" first in the Use group (owner).
- Owner: ONE central way to keep page animations on screen — `src/scripts/play-in-view.ts` (`playInView` / `data-play-in-view`,
  `onceInView`); the diagram wires, mini scenes, scene cards and the home hero's gradient headline use it (README "Animations on the
  pages" + website skill). Probe (by container, every new-design2 page): nothing runs fully off-screen.
- Owner: never just "Animated SVG" — "Pre-rendered animated SVG" (the base format is Pixodesk JSON): diagramNodes.ts (the home's
  FlowGraph), ExportGraph; the SVG Animator pitch "One pre-rendered .svg … or the Pixodesk .json".
- Owner: ONE "File formats" section (subtitle "Open and save, import and export"), last in Use — was "File format" + "Export & import"
  (the Files group and Export & import are gone; the old stat cards dropped: they repeated the diagram or other sections). Its diagram:
  the app's OWN format on both sides with solid wires (SVG Animator: Pixodesk JSON + Pre-rendered animated SVG; 2D: Lottie; SVG Editor:
  SVG), imports and exports dotted; card titles 17 px so "Pre-rendered animated SVG" is one line; then "Inside the file" (a real file
  + its first lines) and the Save / Export manual links.
- Where it plays (owner: "where do we get all of them?"): ONE source on the left — a Draw column with the SVG Animator, wired into
  every saved file (like the decision tree's "Your graphic"). In WhereItPlaysGraph.astro — the other session's untracked file, so not
  staged; stage it with theirs.
- Where it plays: the source is a circle like the decision tree's "Your graphic", with no column header (owner). The circle is shared:
  `.dg-root` in DiagramStyles (was the tree's own `.root`; traced = gold edge).
- Owner: Frameworks merged into Where it plays (animators): under the diagram, code tabs — the SVG Animator's are the diagram's
  places (Web page = pre-rendered .svg or the web player, React, Vue, React Native — new, from the player docs), the 2D Animator's its
  four Lottie players. Frameworks stays for the SVG Editor only. Tab data: `codeTabs.ts` (labels and glyphs from diagramNodes).
  Where it plays differs per app → no app tabs in its header: catalogue `perApp` + `showsAppTabs()` (SectionHead).
- File formats: the app in the middle is the shared circle (`dg-root`), no column header (owner). Headers: In, Out.
- Unstaged (the other session's files): WhereItPlays.astro (the tabs sit on their diagram change), WhereItPlaysGraph.astro,
  diagramNodes.ts (codeTabs.ts imports it) — stage them together.
- File formats: the app's own formats' boxes are tinted in the app's colour (`dg-accent`, both sides) and the key shows a matching
  swatch — distinct from the imported / exported ones (owner).
- Where it plays: the three flavours in one "Pre-rendered animated SVG" box, as on the home (owner: consistent) — the group box is
  shared now (`dg-group`, `dg-group-head`, `dg-mini` in DiagramStyles; FlowGraph uses them too). The app wires into the box.
- File formats (SVG Animator): "Inside the files" = four tabs (Pixodesk JSON, CSS keyframes, CSS + JS triggers, JS animation —
  names from diagramNodes), the canonical ball in each format, playing in the unified player next to its first lines
  (`sections/FileExamples.astro`). The files (`public/assets/svga/file-formats/`) are written by the app's own writers and GUARDED by
  kf `src/specs/website/fileFormatExamples.spec.ts`: they must match what the current format writes (ids normalised, the inlined
  player library set aside), read back with zero warnings, and ball-js.svg must carry the player. Rewrite:
  `VITE_PX_REGEN_WEBSITE_FILES=1 npx vitest run --config vitest.browser.config.ts src/specs/website/fileFormatExamples.spec.ts` (kf/app).
  Known: the unified player shows "Player is busy…" for the two SCRIPTED files (no `ready` from its adapter) — the player's issue.
- Owner: JSON over SVG, React on top — Where it plays (JSON above the pre-rendered box; React, Vue, React Native, then the web page),
  its code tabs in the same order, the home's diagram (SVG Animator first, JSON first, React first); players.ts packages in that order.
- Owner ("The browser"? "Web page"?): the pre-rendered SVG's Play node says HOW it gets in — "Inline SVG: nothing to install:
  <svg> in the HTML — or <object> / <iframe>" (the docs' three ways; not <img>); the place is "HTML" (with React, Vue, React Native);
  the Play column's line is "how it plays" (both diagrams; diagramNodes.ts — the other session's file, unstaged).
- 2D Animator page (owner): its own "Masks & mattes" section (Lottie masks + track mattes; slug `masks-and-mattes`, 2D only — "Masks"
  is the SVG apps' now); "Clones & spray" and "Filters" are the SVG apps' only (catalogue `SVG_APPS`; the 2D filters text dropped);
  Misc gone from the 2D page — "One app", "Splash screens", "Tutorial" deleted (sections, content, art imports, Extras' tutorial),
  "Which app?" stays for the SVG Editor only (its Misc keeps "Which app?" and "At a glance").
- SVG Editor page (owner): "Inside an SVG file" removed; Misc removed — "Which app?" and "At a glance" gone, with GroupKey.misc,
  Extras.astro and decisions.ts (nothing else used them). Masks, Clones & spray, Filters show the SVG Animator's art STILL:
  kf sectionPanels.mjs `stillCard()` + `writeStillDocument()` (no strip, no `animate`, js engine); section-masks / -clones-spray /
  -filters write `*-static.json` too (notes without motion). Masks and Clones' SVG Editor lines in features.ts sit on the other
  session's unstaged MASKS / CLONES — stage with theirs; Filters' is staged.

### Animator Studio page content (2026-10-18)

Owner: "show how cool to have both editors in one app — diagrams, no repeats, links to the apps; buy this, less hassle later — but
don't say it". Below the hero of `/new-design2/animator-studio`:

| Section | What | Source of truth |
|---|---|---|
| One toolbox | a Venn: 2D Animator lobe (pink) · "In both" overlap · SVG Animator lobe (violet); each side = app (link), tagline, files it opens and saves, its own tools (links to the section on its page); phones: three stacked cards | `studio/StudioToolbox.astro`; tools = catalogue SECTIONS of the Animate / Draw / Effects groups; files = `fileFormats.ts` (moved out of ExportGraph, which now imports it) |
| One project | one animation through a growing brief, five stops in a gold "Animator Studio" frame: Website hero (SVG Animator, mouse over) → In the app (Export › Lottie → 2D Animator) → Stock Lottie (opens as it is) → Scroll story (Export › Pixodesk JSON/SVG → SVG Animator) → Launch video (either); a light runs the track and wakes each stop (play-in-view; phones: vertical, no light) | `studio/StudioStory.astro`; export tab names = kf ExportDialog; Studio opens a file in its format's editor = kf StudioAppFactory; places = diagramNodes PLACES |
| Start here | both demos + Pricing | StartBand |

### 2D Animator "Masks & mattes" art (2026-10-18)

Owner: "create an animated illustration for the Lottie Masks & mattes — it can differ from the SVG Animator's". One card, two groups,
the 2D Animator's own options (Object › Clipping and Masks): **Add · Subtract · Intersect** (Add / Subtract / Intersect Clip Path =
Lottie mask modes) — one circle and one sliding bar over a sunburst, the paths dashed as the editor outlines them; **Alpha matte ·
Inverted** (Alpha Mask / Inverted Alpha Mask (adjacent elements) = track mattes) — equalizer bars over moving stripes. Strip: Bar ·
Mask Path, Bars · Scale, Stripes · Position; 4 s loop. kf `node scripts/website/section-lottie-masks.mjs` →
`public/assets/svga/sections/lottie-masks.json` (77 KB); sectionPanels.mjs gained `groupedPanels([3, 2])`.
