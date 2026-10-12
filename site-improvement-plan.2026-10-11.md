# pixodesk.com — review and improvement plan (2026-10-11)

What the site has today, what holds it back, and a ranked plan to make the landing pages
*mean* something — with the current design, illustrations and animations kept.

**Method.** Read every page source (`src/pages`, `src/layouts`, `src/data/**/*.yaml`), fetched the
rendered pages from the local dev server (127.0.0.1:4321) and the live site, measured page
weight, checked metadata, links and copy. No browser screenshots were taken, so this review
is about **content, structure, proof, calls to action, metadata and weight** — not spacing,
typography or mobile layout.

---

## 1. What the site has

| Route | What it is | Rendered HTML | Of which inline SVG animations |
|---|---|---|---|
| `/` | hero (astronaut + app screenshot) · 3 app cards · 4 "capability points" · "One Toolbox. Every Platform." · Shape Builder · Edit Colors · Gradient & Opacity | 0.8 MB | 548 KB |
| `/animator` (Lottie Animator) | hero + store buttons · browser demo (iframe, desktop only) · 6 capability points · Create / Animate / Export · Auto-animate · Easing · Animated icons · Splash screens · "Works everywhere" | **2.8 MB** | **2.5 MB** |
| `/svg-animator` | hero (no buttons) · browser demo · 6 capability points · Create / Animate / Export · Shape Builder · Patterns/Markers/Spray · Animated text · Auto-animate · Easing · Animated icons · Repeater · "Only your SVG and CSS in your file" (code comparison) | **1.5 MB** | 1.2 MB |
| `/svg-editor` | hero ("Free and Easy") + store buttons · browser demo · 6 capability points · Shape Builder · Color control · Gradient · Vector text · Patterns/Markers/Spray · Clone/Repeat · "Only your SVG tags in your file" | 0.6 MB | 297 KB |
| `/pricing` | SVG Editor free · Lottie Animator $4.99/mo or $29.99/yr · SVG Animator "Coming Soon" | 0.2 MB | – |
| per app: `/features`, `/releases`, `/download`, `/player` | feature matrices (good), release notes (**last entries 2024**), store buttons (SVG Animator: "Coming Soon"), the unified preview player | | |
| `/animator/lottie-animation`, `/animator/tutorials` | a "what is Lottie / where it plays" page with player links; 4 YouTube tutorials | | |
| `/docs` | one Starlight tree: SVG Animator (Get Started, Editor manual, Player Library, Pre-rendered SVG, JSON Format, diagnostics) · Lottie Animator | | |
| `/player`, `/player/examples` | the unified preview player; inline-player examples | | |
| legal, 404 | EULA / privacy per app | | |

Assets worth noticing: **every illustration on the site is a real export of the product**
(the cat, the bird, the jar, the girl on the bike, the astronaut, the yoga figure, the devices).
The docs are extensive and good. The player library is public on npm and GitHub. The browser
demo is a real editor. None of this is *used* by the landing pages as proof or as a path.

## 2. Diagnosis — why the pages feel like "some images and lists"

1. **They describe tools, not outcomes.** After the hero, every page is a list of features
   ("Shape Builder", "Gradient and Opacity Tool", "Easing") with 4–5 bullets each. Nothing
   says what the visitor *ends up with*, *where it will run*, or *what they do next*.
2. **The same generic block is on every page.** The six "capability points" ("Works
   Everywhere", "Ultra-Small File Size", "All Essential Tools", "All in One App", "… File
   Format", "Different Export Options") appear on `/animator`, `/svg-animator`, `/svg-editor`
   and (four of them) on `/`, with near-identical wording. Interchangeable claims read as
   filler; the visitor's eye learns to skip the page.
3. **No narrative.** There is no "how it fits together" (draw → one file → it plays here).
   The docs have exactly that page; the landing pages never say it.
4. **No proof.** Illustrations sit next to bullets with no caption. The reader cannot tell
   that the moving cat *is* the product's output, that the file is 36 KB, or that they could
   open it.
5. **No primary call to action.** `/svg-animator` has no button at all (no store, no docs,
   no npm, no demo link beyond the frame). `/` ends on "Gradient and Opacity Tool". App cards
   say "Read More". The one free product (SVG Editor) is not called free on the home page.
6. **The developer story is missing** where it matters most. SVG Animator's audience is
   front-end developers; the page never shows `npm install`, a React/Vue snippet, the
   "paste a pre-rendered SVG, no code" path, the player's GitHub repo or the Get Started doc.
   `npm`, `@pixodesk/…` and the player repo occur on no marketing page (the only GitHub links
   are to third-party Lottie players on `/animator/lottie-animation`; "React Native" appears
   once, in the Lottie copy).
7. **Contradictory status.** The home card, pricing and download page say SVG Animator is
   "Coming Soon"; the `/svg-animator` page itself, the demo and the docs act as if it ships.
   Release notes stop in **May 2024 (Lottie) and August 2024 (SVG Editor)** while the apps
   are at 1.8.x in 2026 — the site looks unmaintained.
8. **Weight.** `/animator` is a 2.8 MB HTML document (2.5 MB of inline animations, each
   carrying its own script runtime: 21–86 KB of script per file). `/svg-animator` 1.5 MB.
   The demo iframe loads a full editor on every visit, eagerly, hidden on mobile.
9. **Metadata.** No `<meta name="description">`, no Open Graph / Twitter tags, no canonical
   on any page. Taglines are `<h5>`/`<h6>` elements (headings used as styling).
10. **Copy filler.** "A must-have for every designer", "A handy tool for all your creative
    projects", "Can be used in various design contexts", "Perfect for clean, balanced, and
    complex designs", "Don't feel like starting from scratch? No worries!" — lines that
    carry no information. On `/animator` the demo caption says "to create and modify
    **SVGs**" (copied from the SVG page).

## 3. The plan, ranked

Effort: S = an hour or two, M = half a day to a day, L = several days. "I build" = things I
am confident producing myself (Astro sections, copy, inline SVG diagrams, code tabs, tables,
metadata, lazy-loading, measurements). Illustrations, video, brand decisions, pricing and
naming stay with you.

| # | Improvement | Pages | Effort | Who |
|---|---|---|---|---|
| **1** | **Give each landing page a story and one primary action**: what it is → for whom → how it fits together → proof → start here. Rewrite the section order and the copy; keep hero, cards, illustrations, colours. | `/`, `/svg-animator` first; then `/animator`, `/svg-editor` | L | I build, you approve copy |
| **2** | **Developer path on `/svg-animator`**: "three ways to put it on your site" with real code (React · Vue · plain HTML · pre-rendered SVG, no code), `npm install`, GitHub, Get Started link — and an **honest status line** with a CTA that works today (demo, docs, npm). | `/svg-animator`, `/` | M | I build |
| **3** | **Turn the illustrations into proof**: a caption under every animation — "made in SVG Animator · 36 KB · view the file" (link to the actual `.svg`, it is already there), plus one line on `/`: "everything moving on this page is an export from these editors". | all four | S–M | I build |
| **4** | **"How it fits together" diagram** (inline SVG, brand colours): editor → one file (`.svg` / `.json` / Lottie) → where it plays (any web page · React/Vue/HTML via the player · iOS/Android/React Native via Lottie). Reused on `/` and the app pages with the relevant branch highlighted. | `/`, app pages | M | I build |
| **5** | **Replace the generic capability blocks** with a *"Which app do I need?"* table on `/` (need → app → output → price) and **three specific proof points** per app page (e.g. SVG Animator: "plain SVG + CSS, no runtime" · "triggers travel in the file: load, hover, click, scroll" · "one file, every browser"). | all four | M | I build |
| **6** | **Freshness and consistency**: release notes from the real version history (1.8.x), one clear SVG Animator status everywhere, one product name per app (site says "Lottie Animator", store says "Pixodesk Animator", the pricing doc plans "2D Animator"). | releases, `/`, pricing, download | S–M | you decide names/status; I apply |
| **7** | **Weight**: demo iframe → click-to-load with a poster image (`loading="lazy"`, `title`); mobile gets the poster + "open on a desktop". Load the heaviest animations only when near the viewport (`<object>`/player frame on scroll) or re-export them lighter; measure before/after with Lighthouse. | `/animator`, `/svg-animator`, `/` | M | I build + measure |
| **8** | **Metadata**: per-page `description`, Open Graph + Twitter card (title, description, image = the hero screenshot), canonical; taglines as `<p>` not `<h5>`; iframe titles. | all | S | I build |
| **9** | **`/animator` specifics**: fix the "SVGs" caption, tighten the chatty "Explore features" paragraphs, embed one tutorial video on the page (they exist, nobody sees them), add a "where Lottie plays" strip with the player links that already live on `/animator/lottie-animation`, say the price near the buttons. | `/animator` | M | I build |
| **10** | **`/svg-editor` specifics**: lead with **Free** (home card too), move the "only your SVG tags in your file" comparison up as proof with real byte counts, keep the feature sections but 2–3 outcome bullets each. | `/svg-editor`, `/` | S–M | I build |
| **11** | **Polish**: "Read More" → "Explore SVG Editor →" etc.; footer: GitHub, npm, Get Started, contact; every app page ends with the same "Start here" band (download / try / docs / pricing). | all | S | I build |

Items 1–5 are what fixes "not very expressive". Items 6–8 are what makes the site look alive
and findable. 9–11 are the per-page passes once the pattern exists.

## 4. Page blueprints (what each page would become)

Section components already exist for all of this (`HeroSection`, `ListApp`,
`TitledSplitSecton`, `Code`, `Section`); new pieces are one diagram component, one code-tabs
component and one "proof caption" component.

### `/` — home

| Order | Section | Keep / change |
|---|---|---|
| 1 | **Hero** — astronaut + screenshot | keep. Headline keep. Replace the two taglines with one sentence of *what* and one of *for whom*: "Desktop editors for vector graphics and animation — and the players that run the result on any web page or in any app." / "For designers who want clean files, and developers who want to ship them." Two buttons: **Download SVG Editor — free** · **See how it works ↓** |
| 2 | **Three app cards** | keep the cards; add status and price in each (Free · $4.99/mo · Coming soon), and one "pick it when…" line: *icons, logos, illustrations as clean SVG* / *animations for web pages: SVG + CSS, or the player* / *animations for iOS, Android, React Native: Lottie*. "Read More" → "Explore →". |
| 3 | **How it fits together** (new, diagram #4) | three steps: draw & animate → save one file → it plays. Under it the proof line: "Everything moving on this page was made with these editors — the files are the illustrations, view any of them." |
| 4 | **Which app do I need?** (new, replaces the 4 capability points + "One Toolbox") | a 3-row table (need / app / you get / price) + one trust line: "Mac App Store and Microsoft Store, auto-updates." |
| 5 | **Shared drawing tools** — Shape Builder · Edit Colors · Gradient | keep all three illustrations (the colour one animates itself — good); reframe the heading as "The same drawing tools in all three apps"; 2–3 outcome bullets each, not 5; link "all SVG Editor features". |
| 6 | **Start here** (new band) | Download (free editor) · Try the demo (links to the app pages) · Get Started docs · `npm install @pixodesk/svg-animator-react` · Pricing |

### `/svg-animator`

| Order | Section | Keep / change |
|---|---|---|
| 1 | **Hero** — astronaut | keep. Add the status line (your call on wording): "The desktop app is in beta and coming to the Mac App Store and Microsoft Store. The browser demo, the player library and the docs are available today." Buttons: **Try it in the browser** (scrolls to the demo) · **Get started (docs)** · **npm / GitHub** |
| 2 | **Browser demo** | keep; click-to-load poster (#7); caption: what you can and cannot do in it. |
| 3 | **Three ways to put it on your site** (new, code tabs) | **Pre-rendered SVG, no code** — paste the file; starts on load, hover, click or scroll; 36 KB cat as the example. **Player library** — `npm install @pixodesk/svg-animator-react` + the 6-line component (also Vue, plain HTML). **Lottie** — export for the Lottie players. Each tab links to its docs page. The snippets are the ones from the docs, verbatim. |
| 4 | **What you get in the file** | the existing "Only your SVG and CSS animation" code comparison, moved up, with real byte counts from real site assets. |
| 5 | **Three proof points** (replaces the 6 capability points) | "Plain SVG + CSS — no runtime, no library" · "Triggers travel inside the file: load, hover, click, scroll into view" · "One file, every browser; the player when you need control from code". |
| 6 | **Animation features** — Auto-animate · Easing · Animated text · Patterns/Markers/Spray · Repeater · Icons | keep the illustrations with proof captions (#3); 2–3 bullets each written as results ("the clock's 60 ticks are one shape animated once"). Drop Shape Builder here (it is a drawing feature; one line + link to SVG Editor). |
| 7 | **Made with it** (new strip) | the cat, bird, jar, envelope, girl on the bike — each with size + "view file". |
| 8 | **Start here** band | demo · docs Get Started · npm · pricing/notify (see §6). |

### `/animator` (Lottie Animator)

Hero and store buttons stay. Fix the demo caption. Then: *where Lottie plays* strip (web ·
iOS · Android · React Native · Windows, with the player links) → proof points (3, Lottie-
specific: "standard Lottie JSON — plays in lottie-web, iOS, Android, RN" · "auto-animate +
easing charts" · "exports SVG/GIF/MP4 too") → one embedded tutorial video + "4 more" → the
feature sections (tightened) → "Made with it" captions → price + Start here band.

### `/svg-editor`

Hero stays ("Free" is the hook — repeat it in the home card and the Start band). Move the
"only your SVG tags" comparison right after the demo as proof. Three proof points: "clean
SVG, nothing proprietary" · "free, Mac and Windows" · "the same tools as the animators, so
files move between them". Feature sections stay with proof captions and shorter bullets.

## 5. Visual elements I would add (and am sure I can make well)

- **"How it fits together" diagram** — inline SVG, three columns with arrows, brand gradient,
  dark-theme friendly, ~6 KB, static (no animation needed; the page has enough motion).
  Per app page the relevant branch is highlighted (`.svg` / player / Lottie).
- **Code tabs** — React · Vue · HTML · pre-rendered SVG; a few lines of JS or pure CSS
  (`:target`/radio) so the page stays static; code from the docs, checked by the existing
  link check.
- **Decision table** "Which app do I need?" and a per-app **"you get"** table (file type ·
  where it plays · runtime needed · size of a real example).
- **Proof captions** on every illustration: name · made in which app · bytes · "view file"
  (links to the real `.svg` already in `public/assets`).
- **Format comparison** — the three export flavours of SVG Animator (SVG + CSS / + JS
  triggers / + JS animation) and JSON for the player, as a compact table taken from the
  "Choosing a format" doc.
- **Timeline schematic** (optional) — a small static SVG showing keyframes → easing curve →
  result, for the Auto-animate / Easing sections.

What I would *not* produce: new characters or illustrations, photography, video, brand or
colour changes, testimonials (need real ones), and the naming/pricing decisions.

## 6. Decisions only you can make (needed before 1, 2 and 6)

1. **SVG Animator status and wording** — beta? pre-order? "coming Q4 2026"? Is there a
   notify/beta channel (an email to `support@`, a GitHub Discussions link, a store waitlist)?
   The page needs one honest sentence and one working button.
2. **Product names** — "Lottie Animator" (site) vs "Pixodesk Animator" (stores, several
   headings) vs "2D Animator" (pricing plan doc). Pick one per app; I apply it everywhere.
3. **Release notes** — the real 2025–2026 history for the two shipped apps (or drop the
   dated version list and show "current version x.y.z, updated via the stores").
4. **Tone** — the proposed copy is plain and concrete (outcomes, numbers, file sizes). Say
   if you want it warmer.

## 7. Execution order

- **Batch A (first):** #8 metadata, #7 demo click-to-load, #3 proof captions — small,
  safe, visible. Then #1 + #2 + #4 + #5 on `/` and `/svg-animator` as one pass (new
  components: diagram, code tabs, decision table, proof caption, start band).
- **Batch B:** `/animator` and `/svg-editor` passes (#9, #10) reusing the components;
  #6 once the decisions in §6 are made; weight measurement and the animation loading
  change (#7, second half).
- **Batch C:** #11 polish; Lighthouse run and a mobile check in a browser (not covered here).

Each batch is reviewable on the local dev server before it goes live; the existing
`yarn build` link check guards the new links.

---

## 8. Further findings (running log — misc. items for later)

Things noticed while building the `/new-design/` previews; none are blockers, all are cheap.

| # | Finding | Where | Suggested action |
|---|---|---|---|
| F1 | The "Only your SVG and CSS animation in your file" code comparison is **commented out** on `/svg-animator` and renders **without images** on `/svg-editor`: the `Code` component expects `subSections[].image`, and both YAML files have only `header` / `footer`. | `src/pages/svg-animator.astro` (bottom), `src/pages/svg-editor.astro` ~l.304, `svga-index-text-content.yaml` / `svg-index-text-content.yaml` `section_08` | The previews replace it with `SourceExcerpt` (real file, real bytes). Delete the old section or give it images. |
| F2 | The SVG Editor page's **Repeater / Clone** section points at `../assets/svg/sections/clock-face-repeater.svg`, which **does not exist**; the illustration markup is commented out, so the section shows text only. | `svg-index-text-content.yaml` `section_07`, `svg-editor.astro` ~l.290 | Export a repeater illustration from SVG Editor (the clock face), or keep the preview's merge into the patterns section. |
| F3 | The SVG Animator page demonstrates **auto-animate and easing with Lottie Animator exports** (`public/assets/lottie/sections/auto-animate.svg` 376 KB, `easing.svg` 272 KB — each embeds a Lottie runtime). | `svg-animator.astro` imports from `assets/lottie/` | Re-export both from SVG Animator as SVG + CSS: smaller files, and the "made in" caption becomes true. The preview shows no caption on those two for that reason. |
| F4 | `animated-icons-watch.svg` is **868 KB** — the single heaviest asset on the site, on `/animator`. | `public/assets/lottie/sections/` | Re-export lighter (CSS flavour, fewer frames) or load it on scroll. |
| F5 | Lottie Animator (2D) exports carry **21–86 KB of script each**; the `/animator` page inlines nine of them, i.e. several copies of the same runtime. | `public/assets/lottie/**` | One shared runtime (the unified player) or CSS-flavour exports; measure with Lighthouse after. |
| F6 | The cat (`cat-and-butterfly.svg`, SVG + CSS flavour) contains a ~1 KB trigger script for scroll-into-view — correct per the site rule, but a visitor reading "no script" would be surprised. | pre-rendered exports with scroll trigger | The preview's file footer states it ("1 trigger script of 1.x KB — no library"). Keep saying it. |
| F7 | `BaseLayout` had **no description / Open Graph / canonical** support at all. | `src/layouts/BaseLayout.astro` | Added as optional props (old pages unchanged). Each old page can pass a `description` once the copy is agreed. |
| F8 | Relative asset paths in YAML (`../assets/...`) only work from top-level routes; under `/new-design/` they break. | `*.yaml` `svg.src`, `image` | Use root-relative `/assets/...` everywhere. |
| F9 | The Astro compiler rejects an object key named `export` in `.astro` frontmatter ("Unexpected ':'"), which the `AppDescription` type requires. | `src/pages/new-design/index.astro` | Cards live in `src/data/new-design/home-cards.json`; the YAML route the old pages use has the same effect. |
| F10 | The app demos load the **whole editor eagerly** on three pages, hidden on phones; no `title` on the iframes. | `app-iframe` sections | Preview uses click-to-load (`DemoFrame`) — the editor loads only when asked. Note: the demo is **not served by the local dev server** (`public/app/demo` is published from the private repo), so the button on 127.0.0.1 opens an empty frame; it works on pixodesk.com. |
| F11 | `Browserslist: caniuse-lite is 13 months old` warning on every dev start. | repo | `npx update-browserslist-db@latest` once. |
| F12 | The "Lottie Animator" ↔ "Pixodesk Animator" naming also appears in the **hero copy and section titles** of `/animator` (`section_01`, `section_02`, `section_08`), not only in the stores. | `lottie-index-text-content.yaml` | Part of decision §6-2. |

### What the previews are (for the side-by-side)

| Preview | Current page | New pieces |
|---|---|---|
| `/new-design/` | `/` | hero taglines as paragraphs + two buttons · cards with price/status and "Explore" · **How it fits together** diagram + proof line · **Which app do I need?** table · the three drawing tools with proof captions · **Start here** band |
| `/new-design/svg-animator` | `/svg-animator` | status pill + three buttons · click-to-load demo · **Three ways to put it on your site** (code tabs: pre-rendered SVG / React / Vue / plain HTML) · **What you get in the file** (cat + its real source) · three proof points · six animation features with captions · **Made with it** strip · Start band with npm / GitHub / "tell me when it ships" |
| `/new-design/animator` | `/animator` | store buttons kept + demo/docs/tutorials buttons · click-to-load demo (caption fixed) · **Where it plays** diagram + player links · three proof points · one embedded tutorial · five features with captions · devices closing · Start band with price |
| `/new-design/svg-editor` | `/svg-editor` | "Free" in the tagline + buttons · click-to-load demo · three proof points · **What you get in the file** (vector text + its source) · five features with captions · Start band |

Shared components: `src/layouts/new-design/` — `HeroNew`, `PreviewBanner`, `FlowDiagram`, `DecisionTable`, `CodeTabs`, `SourceExcerpt`, `ProofCaption`, `DemoFrame`, `StartBand`, `buttons.ts`. The previews are `noindex` and their canonical points at the current page, so deploying them is harmless.

### The engagement system used on the previews (2026-10-12)

The same four devices on every feature, so the pages stay consistent and nothing is one-off:

| Device | What it is | Component |
|---|---|---|
| **Mechanism schematic** | a small diagram of *how* the feature works (pin → move → keyframes; the four easing curves; one petal → eight clones). Static at rest; **hover or tap plays it** (SMIL inside the SVG, user-started, so the "nothing animates on load" rule holds). | `Schema.astro` + `schemas.ts` (12 kinds) |
| **Fact rows** | three facts per feature instead of bullets: a glyph tile, a bold lead of a few words, one line with the key phrase in colour (`<b class="text-cyan-200">`, violet for the second accent). | `Facts.astro`, `Glyph.astro` + `glyphs.ts` (40 glyphs) |
| **Stat cards** | the three proof points of a page as figures, not paragraphs: `0 KB` of library · `4` triggers · `1` file; `Free` · `100%` · `3`; `1` · `2` · `7`. Chips name the concrete things. | `StatCard.astro` |
| **Proof captions** | "made in … · 35 KB · view file" under every illustration. | `ProofCaption.astro` |

Feature layout = illustration + caption on one side; title, one-line hook with one coloured phrase, schematic, three fact rows on the other (`FeatureSection.astro`). Proof = three stat cards. Every page ends with the Start band. Copy rules: a verb and a concrete noun in every lead, one coloured phrase per line, no adjectives like "powerful" or "essential".

Other techniques considered for later, if these are not enough: a before/after slider on the illustrations (drag to compare the static SVG and the animated one); a 30-second "make a bouncing ball" stepper using the editor screenshots from the docs; a live file-size counter that reads the real asset next to each example.
