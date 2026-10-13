# pixodesk.com — review, improvement plan and the `/new-design/` previews

Started 2026-10-11 (review), updated 2026-10-12 (previews built, engagement system). This is the one document for
the website work: what the site has, what holds it back, the ranked plan with its status, the parallel previews
under `/new-design/`, the component system they use, how to work on them, and every finding picked up on the way.

**Method.** Every page source was read (`src/pages`, `src/layouts`, `src/data/**/*.yaml`); the rendered pages
were fetched from the local dev server (127.0.0.1:4321) and the live site; page weight, metadata, links and copy
were measured. No browser screenshots were taken, so visual judgements (spacing, typography, phone layout) are
**not** covered — the owner reviews those in the browser.

---

## 1. What the site has (inventory)

| Route | What it is | Rendered HTML | Of which inline SVG animations |
|---|---|---|---|
| `/` | hero (astronaut + app screenshot) · 3 app cards · 4 "capability points" · "One Toolbox. Every Platform." · Shape Builder · Edit Colors · Gradient & Opacity | 0.8 MB | 548 KB |
| `/animator` (Lottie Animator) | hero + store buttons · browser demo (iframe, desktop only) · 6 capability points · Create / Animate / Export · Auto-animate · Easing · Animated icons · Splash screens · "Works everywhere" | **2.8 MB** | **2.5 MB** |
| `/svg-animator` | hero (no buttons) · browser demo · 6 capability points · Create / Animate / Export · Shape Builder · Patterns/Markers/Spray · Animated text · Auto-animate · Easing · Animated icons · Repeater · code comparison (commented out) | **1.5 MB** | 1.2 MB |
| `/svg-editor` | hero ("Free and Easy") + store buttons · browser demo · 6 capability points · Shape Builder · Color control · Gradient · Vector text · Patterns/Markers/Spray · Clone/Repeat · "Only your SVG tags in your file" | 0.6 MB | 297 KB |
| `/pricing` | SVG Editor free · Lottie Animator $4.99/mo or $29.99/yr · SVG Animator "Coming Soon" | 0.2 MB | – |
| per app: `/features`, `/releases`, `/download`, `/player` | feature matrices (good) · release notes (**last entries 2024**) · store buttons (SVG Animator: "Coming Soon") · the unified preview player | | |
| `/animator/lottie-animation`, `/animator/tutorials` | "what is Lottie / where it plays" with player links; 4 YouTube tutorials | | |
| `/docs` | one Starlight tree: SVG Animator (Get Started, Editor manual, Player Library, Pre-rendered SVG, JSON Format, diagnostics) · Lottie Animator | | |
| `/player`, `/player/examples` | the unified preview player; inline-player examples | | |
| legal, 404 | EULA / privacy per app | | |

Assets worth noticing: **every illustration on the site is a real export of the product** (the cat, the bird, the
jar, the girl on the bike, the astronaut, the yoga figure, the devices). The docs are extensive and good. The
player library is public on npm and GitHub. The browser demo is a real editor. Before this work none of it was
*used* by the landing pages as proof or as a path.

Copy lives in YAML (`src/data/<app>/*-text-content.yaml`) typed by sibling `.ts` files; pages are `.astro`
with Tailwind classes; layouts in `src/layouts/`. Analytics: umami. `site` is set in `astro.config.mjs`;
`robots.txt` points at `sitemap-index.xml`.

## 2. Diagnosis — why the pages felt like "some images and lists"

1. **They describe tools, not outcomes.** After the hero, every page is a list of features with 4–5 bullets each.
   Nothing says what the visitor *ends up with*, *where it will run*, or *what they do next*.
2. **The same generic block is on every page.** Six "capability points" ("Works Everywhere", "Ultra-Small File
   Size", "All Essential Tools", "All in One App", "… File Format", "Different Export Options") repeat on all
   three app pages and (four of them) on `/`, nearly word for word. Interchangeable claims read as filler.
3. **No narrative** — no "draw → one file → it plays here" anywhere on the marketing pages (the docs have it).
4. **No proof** — illustrations with no caption; the reader cannot tell the moving cat *is* the product's output.
5. **No primary call to action.** `/svg-animator` had no button at all; `/` ended on "Gradient and Opacity Tool";
   the free product was not called free on the home page.
6. **The developer story was missing.** `npm`, `@pixodesk/…`, the player repo, a React snippet, the no-code
   pre-rendered path: none on any marketing page (the only GitHub links are to third-party Lottie players on
   `/animator/lottie-animation`).
7. **Contradictory status.** Home card, pricing and download say SVG Animator is "Coming Soon"; its own page,
   the demo and the docs act as if it ships. Release notes stop in **May 2024 / August 2024** while the apps are
   at 1.8.x in 2026.
8. **Weight.** `/animator` is a 2.8 MB document (2.5 MB inline animations, 21–86 KB of script *each*);
   `/svg-animator` 1.5 MB. The demo iframe loads a whole editor eagerly, hidden on phones.
9. **Metadata.** No `description`, Open Graph, Twitter or canonical on any page; taglines as `<h5>`/`<h6>`.
10. **Copy filler.** "A must-have for every designer", "A handy tool for all your creative projects", "Can be used
    in various design contexts", "Don't feel like starting from scratch? No worries!"; the `/animator` demo
    caption said "SVGs".

## 3. The plan, ranked — with status

Effort: S = an hour or two, M = half a day to a day, L = several days. Status: **done** = built in the previews;
**part** = partly; **open** = not started; **decide** = waits for an owner decision (§8).

| # | Improvement | Pages | Effort | Status |
|---|---|---|---|---|
| **1** | **A story and one primary action per landing page**: what → for whom → how it fits together → proof → start here. Hero, cards, illustrations, colours kept. | all four | L | **done** in `/new-design/*` |
| **2** | **Developer path on `/svg-animator`**: code tabs (pre-rendered SVG · React · Vue · plain HTML), `npm install`, GitHub, Get Started link, an honest status line with a button that works today. | `/svg-animator`, `/` | M | **done**; status wording = placeholder (§8) |
| **3** | **Illustrations as proof**: "made in … · 35 KB · view file" under every animation, computed from the real file. | all four | S–M | **done** (two Lottie-made assets on the SVGA page uncaptioned, F3) |
| **4** | **"How it fits together" diagram** + per-feature mechanism schematics. | `/`, app pages | M | **done** (FlowDiagram + 12 schematics with hover-to-play) |
| **5** | **Replace the generic capability blocks** with a *"Which app do I need?"* table on `/` and three specific proof points per app page. | all four | M | **done** (DecisionTable; StatCards) |
| **6** | **Freshness and consistency**: release notes from the real history, one SVG Animator status everywhere, one product name per app. | releases, `/`, pricing, download | S–M | **decide** |
| **7** | **Weight**: demo click-to-load with a poster; heaviest animations loaded near the viewport or re-exported lighter; Lighthouse before/after. | `/animator`, `/svg-animator`, `/` | M | **part** — click-to-load done; animation loading + Lighthouse open |
| **8** | **Metadata**: per-page description, Open Graph + Twitter card, canonical; taglines as `<p>`; iframe titles. | all | S | **done** for previews (BaseLayout props); old pages still pass nothing |
| **9** | **`/animator` specifics**: fix the "SVGs" caption, tighten the chatty paragraphs, embed one tutorial, "where Lottie plays" strip, price near the buttons. | `/animator` | M | **done** in preview |
| **10** | **`/svg-editor` specifics**: lead with **Free**, file comparison as proof with real byte counts, 2–3 outcome facts per feature. | `/svg-editor`, `/` | S–M | **done** in preview |
| **11** | **Polish**: "Read More" → "Explore"; footer with GitHub, npm, Get Started, contact; the same Start band on every page. | all | S | **part** — bands and labels done; footer untouched |

## 4. The previews — what each page is now

Parallel pages, the current ones untouched. Each starts with an amber bar linking to its current page and the
other previews. `noindex`, canonical → the current page, so deploying them is harmless.

| Preview | Current | Section order |
|---|---|---|
| `/new-design/` | `/` | hero (astronaut, two paragraph taglines, **Download SVG Editor — free** / **See how it works**) · 3 cards with price and status, "Explore" · **How it fits together** (FlowDiagram) + girl-on-bike with the proof line · **Which app do I need?** (DecisionTable, light section) · **The same drawing tools in all three apps**: Shape Builder, Edit colours, Gradients as FeatureSections · **Start here** |
| `/new-design/svg-animator` | `/svg-animator` | hero (girl on bike, status pill, **Try it in the browser** / **Get started — docs** / `npm i …`) · **Watch it first** (quick-start videos, tabs React · Vue · Plain HTML · Pre-rendered SVG (in Astro) · Pre-rendered SVG (in iframe): editor → app page, `VideoSection` + `TabStrip`) · click-to-load demo · **Three ways to put it on your site** (CodeTabs: React · Vue · plain HTML · pre-rendered SVG) · **What you get in the file** (cat + SourceExcerpt) · 3 StatCards (0 KB · 4 · 1) · 6 FeatureSections: Auto-animate, Easing, Animated vector text, Patterns/markers/spray, Repeater, Animated icons · **Made with it** (bird, jar, envelope) · Start band (demo, docs, player library, npm, GitHub, "tell me when the app ships" mailto) |
| `/new-design/animator` | `/animator` | hero (plane + city, store buttons kept, **Try it in the browser** / **Docs** / **Tutorials**) · **Watch it first** (Lottie quick-start videos, tabs React (lottie-react) · React (dotlottie-react) · Plain HTML (lottie-web) · JavaScript (dotlottie-web)) · click-to-load demo (caption fixed) · **Where it plays** (FlowDiagram highlight=lottie + player links) · 3 StatCards (1 · 2 · 7) · **See it done in four minutes** (one YouTube embed, lazy) · 5 FeatureSections: Create/animate/export, Auto-animate, Easing, Animated icons, Splash screens · devices closing · Start band with the price |
| `/new-design/svg-editor` | `/svg-editor` | hero (origami bird, store buttons, **Try it in the browser** / **All features**; "Free" in the tagline) · **Watch it first** (one video: a weather icon — shapes united, gradient, saved, used as `<img>`) · click-to-load demo · 3 StatCards (Free · 100% · 3) · **What you get in the file** (vector text + source) · 5 FeatureSections: Shape Builder, Edit colours, Gradients, Vector text, Patterns/markers/spray/repeater · Start band |

## 5. The engagement system (consistent on every page)

The same four devices on every feature, so nothing is one-off and the pages do not get messy.

| Device | What it is | Component |
|---|---|---|
| **Mechanism schematic** | a small diagram of *how* the feature works (pin → move → keyframes; the four easing curves; two circles → union / subtract / intersect; one petal → eight clones; text riding a wave). Static at rest; **hover or tap plays it** — SMIL `<animate>` elements inside the SVG with `begin="<svgId>.mouseover;<svgId>.click"`, `fill="freeze"`, `restart="whenNotActive"`. User-started, so the site rule "nothing animates on load" holds. A "▶ hover to play" chip sits in the corner. | `Schema.astro` + `schemas.ts` (12 kinds: autoAnimate, easing, textPath, patternMarkerSpray, repeater, iconMotion, shapeBuilder, editColors, gradient, vectorText, splash, createAnimateExport) |
| **Fact rows** | three facts per feature instead of bullets: a glyph tile, a bold lead of a few words, one line with the key phrase coloured (`<b class="text-cyan-200">`; violet `text-violet-200` for a second accent; `<i>` for a nuance). | `Facts.astro`, `Glyph.astro` + `glyphs.ts` (40 line glyphs) |
| **Stat cards** | the page's three proof points as figures, not paragraphs, with chips naming the concrete things. | `StatCard.astro` |
| **Proof captions** | "made in … · 35.2 KB · view file" under every illustration; app detected from the file (`"st":"none"`/lottie → Lottie Animator; `@keyframes`/`px-anim` → SVG Animator; else SVG Editor), size from disk. | `ProofCaption.astro` |

Layouts: `FeatureSection.astro` = illustration + caption on one side; title, one-line hook with one coloured
phrase, schematic, three fact rows on the other, alternating sides. `FlowDiagram.astro` = draw → one file → it
plays, with `highlight="svg" | "player" | "lottie"`. `DecisionTable.astro` (`light` variant), `CodeTabs.astro`
(card-style tabs with glyph + hint; Astro's `Code` from `astro:components` highlights at build time; a few lines
of script switch panels), `SourceExcerpt.astro` (first lines of a real export, `data-px-meta` stripped, honest
footer: lines · KB · "1 trigger script of 1.8 KB — no library" / "embedded player script"), `DemoFrame.astro`
(poster + button; the iframe is created on click, `loading="lazy"`, `title`; phones get a note), `HeroNew.astro`
(title, `<p>` taglines, status pill, buttons, store buttons, art slot), `StartBand.astro`, `PreviewBanner.astro`,
`buttons.ts` (the three button classes).

**Copy rules:** a verb and a concrete noun in every lead; one coloured phrase per line; numbers where they exist
(`1 s`, `eight`, `0 KB`); "you" phrasing ("Drag the playhead to 1 s, drop the ball at the bottom. That is the
whole instruction."); no "powerful", "essential", "seamless", "must-have".

**Other techniques considered** (not built): a before/after slider on illustrations (static SVG vs animated);
a 30-second "make a bouncing ball" stepper from the docs' screenshots; a live size counter next to examples.
What I would *not* produce: new characters or illustrations, photography, video, brand or colour changes,
testimonials (need real ones), naming and pricing decisions.

## 6. Working on the previews

- **Run:** `yarn dev` in the website root → http://127.0.0.1:4321/new-design/ (…/svg-animator, /animator,
  /svg-editor). The browser **demo is not served locally** (`public/app/demo` is published from the private
  repo), so the demo button opens an empty frame here; it works on pixodesk.com.
- **Verify without a browser:** fetch each preview with `curl` and check for 200; the dev server returns a
  bare 500 page on an error — the real message is in the dev server's terminal (or start a second server
  `npx astro dev --port 4399` and read its stdout). Every schematic SVG can be parsed as XML from the fetched
  HTML (`<svg id="s…">…</svg>`) to catch unbalanced markup. `yarn build` runs the link check (offline) —
  **not yet run with the previews**; do it before deploying.
- **Rules that bit:** the Astro compiler rejects an object key named `export` in `.astro` frontmatter
  ("Unexpected ':'") → the home cards live in `src/data/new-design/home-cards.json`. Relative asset paths from
  YAML (`../assets/...`) break under `/new-design/` → always root-relative `/assets/...`. `ProofCaption` and
  `SourceExcerpt` resolve `public/` through `new URL("../../../public" + file, import.meta.url)`, which works
  in dev and build. No animation may start on load (README rule) → schematics animate on hover/click only.
- **Adding a feature:** a `FeatureSection` with `schema` from `SchemaKind`, three `facts` (`icon` from
  `GlyphName`), `html` (a `?raw` import of the real export) + `file` (its public path) for the caption. A new
  schematic = one builder in `schemas.ts` (use `three`/`four` for the box layouts, `on(uid)` for the hover
  trigger); a new glyph = one entry in `glyphs.ts` (24×24, stroke paths).
- **Promoting a preview to the live page:** move the page over the old one, drop `PreviewBanner`, `noindex`
  and `canonical`, keep `description`; delete the old page's unused YAML sections and imports; re-run the link
  check; add `description` to the remaining old pages via the new `BaseLayout` props.

## 7. Facts about the assets (measured)

| File | Size | Note |
|---|---|---|
| `lottie/sections/animated-icons-watch.svg` | **868 KB** | heaviest asset on the site (`/animator`) |
| `lottie/sections/auto-animate.svg`, `easing.svg` | 376 KB, 272 KB | Lottie Animator exports, also used on the **SVG Animator** page |
| `lottie/sections/splash-screen.svg`, `devices.svg` | 224 KB, 208 KB | |
| `svga/hero/girl-on-bike.svg`, `index/sections/all-platforms-girl-on-bike.svg` | 192 KB, 168 KB | |
| `index/hero/px-astronaut.svg`, `index/sections/px-edit-color-anim.svg` | 164 KB, 136 KB | |
| `svga/sections/cat-and-butterfly.svg` | 36 KB | SVG + CSS flavour, 277 lines, one 1.8 KB scroll-trigger script |
| `svga/sections/{bird-twitting-svga,animated-repeater,vector-text-anim}.svg` | 36 KB each | |
| `svg/sections/vector-text.svg` | 16 KB, 92 lines, no script | the SVG Editor "what you get" example |
| Lottie Animator (2D) exports | 21–86 KB of script **each** | `/animator` inlines nine → several runtime copies |

## 8. Decisions only the owner can make

1. **SVG Animator status and wording** — beta? pre-order? a date? The preview says *"Desktop app coming to the
   Mac App Store and Microsoft Store. The browser demo, the player library and the docs are available today."*
   (marked `TODO(owner)` in `svg-animator.astro`) and offers a `mailto:support@pixodesk.com` "tell me when the
   app ships" button. A store waitlist or a GitHub Discussions link would replace it.
2. **Product names** — "Lottie Animator" (site, menu) vs "Pixodesk Animator" (stores, several YAML headings) vs
   "2D Animator" (pricing plan doc). One per app; then it is applied everywhere.
3. **Release notes** — the real 2025–2026 history for the two shipped apps, or drop the dated list and show
   "current version x.y.z, updated through the stores".
4. **Tone** — the preview copy is plain and concrete (outcomes, numbers, file sizes). Say if it should be warmer.
5. **Go / no-go on the previews** — which of the four replace their current pages, and whether the engagement
   system (schematics, fact rows, stat cards) is the house style from now on.

## 9. What is left (in order)

1. Owner review of the four previews in a browser, including phone width (not checked here).
2. Decisions in §8; apply names, status and release notes (plan item 6).
3. `yarn build` with the previews → link check; fix anything it flags.
4. Promote the approved previews over the current pages (§6); add `description` to every remaining page.
5. Weight: load the heaviest inline animations near the viewport or re-export them lighter (F3–F5); run
   Lighthouse before/after; update `caniuse-lite` (F11).
6. Footer: GitHub, npm, Get Started, contact (item 11); per-app `/features` pages could reuse the fact rows.
7. If still wanted: the before/after slider and the bouncing-ball stepper (§5).

## 10. Findings log (misc., for later)

| # | Finding | Where | Suggested action |
|---|---|---|---|
| F1 | The "Only your SVG and CSS animation in your file" code comparison is **commented out** on `/svg-animator` and renders **without images** on `/svg-editor`: `Code` expects `subSections[].image`, the YAML has only `header`/`footer`. | `svg-animator.astro` (bottom), `svg-editor.astro` ~l.304, `*-index-text-content.yaml` `section_08` | Previews replace it with `SourceExcerpt`. Delete the old section or give it images. |
| F2 | The SVG Editor **Repeater / Clone** section points at `../assets/svg/sections/clock-face-repeater.svg`, which **does not exist**; its markup is commented out, so the section is text only. | `svg-index-text-content.yaml` `section_07`, `svg-editor.astro` ~l.290 | Export a repeater illustration (the clock face) from SVG Editor, or keep the preview's merge into the patterns section. |
| F3 | The SVG Animator page demonstrates **auto-animate and easing with Lottie Animator exports** (each embeds a Lottie runtime). | `svg-animator.astro` imports from `assets/lottie/` | Re-export both from SVG Animator as SVG + CSS; smaller, and the caption becomes true. The preview shows no caption on those two. |
| F4 | `animated-icons-watch.svg` is **868 KB**. | `/animator` | Re-export lighter or load on scroll. |
| F5 | 2D exports carry **21–86 KB of script each**; `/animator` inlines nine. | `public/assets/lottie/**` | One shared runtime (the unified player) or CSS-flavour exports; measure with Lighthouse. |
| F6 | The cat (SVG + CSS) contains a ~1.8 KB scroll-into-view trigger script — correct per the site rule; a visitor reading "no script" would be surprised. | pre-rendered exports with a scroll trigger | The preview's footer states it. Keep saying it. |
| F7 | `BaseLayout` had no description / Open Graph / canonical support. | `src/layouts/BaseLayout.astro` | Added as optional props (`description`, `ogImage`, `canonical`, `noindex`); old pages unchanged until they pass one. |
| F8 | Relative asset paths in YAML (`../assets/...`) only work from top-level routes. | `*.yaml` `svg.src`, `image` | Root-relative `/assets/...` everywhere. |
| F9 | The Astro compiler rejects an object key named `export` in frontmatter, which `AppDescription` requires. | `new-design/index.astro` | Cards in `src/data/new-design/home-cards.json` (the YAML route has the same effect). |
| F10 | The demos load the **whole editor eagerly** on three pages, hidden on phones; no `title` on the iframes. | `app-iframe` sections | Preview: `DemoFrame` click-to-load. The demo is not served by the local dev server. |
| F11 | `Browserslist: caniuse-lite is 13 months old` on every dev start. | repo | `npx update-browserslist-db@latest`. |
| F12 | The "Lottie Animator" ↔ "Pixodesk Animator" naming also appears in hero copy and section titles of `/animator`. | `lottie-index-text-content.yaml` `section_01/02/08` | Decision §8-2. |
| F13 | `TextListCheck` renders every feature bullet at `text-xs` with a check icon — the visual reason the old lists read as filler, independent of the copy. | `src/layouts/TextListCheck.astro` | Superseded by `Facts.astro` in the previews. |
| F14 | SMIL animations in inline SVG (`<animate>`, `<animateMotion>`, `<animateTransform>`) play in Chrome, Safari and Firefox and need no script; `begin="id.mouseover;id.click"` makes them user-started. `startOffset` of `<textPath>` and gradient `<stop offset>` are animatable this way. | `schemas.ts` | The cheapest "hover to play" on the site; reuse for any future diagram. |
| F15 | Astro's built-in `Code` component (`astro:components`, shiki, theme `github-dark`) gives highlighted code with zero client JS. | `CodeTabs.astro`, `SourceExcerpt.astro` | Use it for every code sample on marketing pages. |
| F16 | Tailwind `aria-selected:` variants work in this setup (v3), so tab states need no extra CSS. | `CodeTabs.astro` | — |

## 11. Explanation videos — the pipeline that made the tutorials (found 2026-10-12)

**Update 2026-10-13:** the pipeline is rebuilt and routine (doc: `kf/app/docs/testing/video-recording.md`). The first
website video, `quick-start-react` (SVG Animator + React quick start), is on `/new-design/svg-animator` between the hero
and the demo: watching first costs the visitor nothing and shows how fast it is; the demo right below lets them repeat
it. Regenerate after any editor UI change with kf `yarn website:videos` (re-records from the script, publishes
`public/videos/<name>.{mp4,vtt,poster.png}`); add a video by listing it in `kf/app/scripts/website/videos.mjs`.

The four YouTube tutorials on `/animator/tutorials` were **scripted as atests** and recorded by the editor itself; no
screen-recording app, no human narrator. Everything is still in the repo, parked under a disabled folder.

| Piece | Where | What it does |
|---|---|---|
| The scripts | `kf/app/tests/atest/screenshot.disabled/` — `01-basic-shapes.js`, `02-bezier-tool.js` (pen & node tools), `03-bool-ops.js`, `earth-plane*.js` (earth and paper plane), plus unpublished `firework.js`, `office.js`, `fountain.js`, `create-shapes.js` | ordinary DSL (`click`, `input`, `mouse down/move/up`, `dnd`, `key`, timeline commands) interleaved with the narration and recording commands; 100–500 lines each, `earth-plane.js` has 117 `say` lines |
| `say("sync" \| "async" \| "wait", "<prefix>-", "text")` | `TestSayAction.tsx` | narration. `sync` waits for the clip, `async` keeps acting while it plays, `wait` catches up. While recording, the clip is **not played**: its duration is fetched and its start time is logged against the video clock (`SayInfo {fileName, start, duration}`) |
| `screenshotRecording("start", scale, timeMult, fps, quality)` / `("sleep", ms)` / `("stop", "name")` / `("animation", from, to, step, count, name, …)` | `TestScreenshotRecordingAction.tsx` + `kf/export/ScreenshotRecorder.ts` | frame-by-frame capture of the app window into a WebM (`webm-muxer` + `VideoEncoder`); the video clock is the frame counter, so a `sleep` adds exactly the right number of frames; `"animation"` renders a document's frames one by one for a clean animation video |
| `goTo(id, x, y)`, `ws(x, y, w, h)`, `config({mouseStepDistance, beforeClickDelay, clickEffectSteps, …})` | `TestGoToAction`, `TestWsAction`, `TestConfigAction`, `kf/test/TestMouse.tsx` | the visible cursor (an SVG overlay) travels to a control, the workspace pans/zooms smoothly, every click gets a ripple, and all actions are slowed to a watchable pace |
| Speech | `kf/app/tests/SayUtil.js` + dev-server routes `POST /api/say/info/:name`, `/api/say/:name` | macOS `say -o <prefix><md5(text)>.aiff` → ffmpeg → mp3 in `tests/_say_cache/` (116 clips cached); ffprobe gives the duration the recorder needs |
| Assembly | `POST /api/sayForScreenshotVideo` → `mergeSayFiles` | builds an ffmpeg concat list of silence + clips at the logged start times, muxes the mp3 onto the WebM, transcodes to **mp4**; outputs in `tests/webm/` (`01-basic-shapes.webm`, `.mp3`, `-ready.webm`, `.mp4` still there from March 2026) |
| Capture source | `ScreenshotRecorder.start()` | web build: `getDisplayMedia({displaySurface:"window"})` (a browser permission prompt → run from the in-app TestPicker, not headless); Electron dev build: `desktopCapturer` via `getMediaSourceId`, no prompt; `index-lottie-mac-dev.ts` takes `--pxarg-say-info-file=` for pre-built narration |
| Alternative narration | `/Users/admin2/projects/pp/audio-tools` (`say.ts`, `SayBuilder.ts`, `_input/tts.yml`) | Google Cloud TTS (Chirp HD voices) + ffmpeg: markdown/SSML text → cached mp3 → merged track; `tts.yml` already holds an "export to browser" episode script (`ep-browser01…10`). Better voices than macOS `say`; not wired into the recorder — a `sayDir` parameter in `mergeSayFiles` is the hook |

**To make a new explanation video** (e.g. the React journey, or "from the editor to your page"): write a script in the same
shape — `setup`, `config({...slow pacing})`, `screenshotRecording("start", 1.5, 1, 30, 100)`, then `say` + actions
with `goTo`/`ws` for the camera work, `screenshotRecording("stop", "<name>")` — put it in a non-disabled folder (or run it
from the TestPicker), let the dev server generate the clips and the mp4, then review `tests/webm/<name>.mp4`.
Open points before the first new one: the folder is `screenshot.disabled`, so the runner never plays them (on purpose,
they take minutes and need a screen-capture source); voices (macOS `say` vs Google TTS from audio-tools); `_say_cache`
and `webm` are git-ignored, so the cached narration and old renders live only on this machine.
