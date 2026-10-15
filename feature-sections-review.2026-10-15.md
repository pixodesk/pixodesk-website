# Feature sections on the `/new-design/` pages — review and rework

2026-10-15. Scope: the left/right **feature sections** that follow the hero, the video and the demo on the four
previews (`FeatureSection.astro`: illustration + proof caption on one side; title, hook line, mechanism schematic and
fact rows on the other). Companion to `site-improvement-plan.2026-10-11.md` (§5, the engagement system).

**Method.** Every section screenshotted at 1440 px from the dev server; every claim checked against the editor
manual (`src/content/docs/svga/editor/**`), the owner's copy on the old pages (`src/data/*/*-index-text-content.yaml`)
and, where those were silent, the app source (kf `app/src`). Sources are named next to each finding.

---

## 1. Inventory — 19 sections, 12 schematic kinds

| Page | # | Section | Illustration (made in · size) | Schematic | Facts |
|---|---|---|---|---|---|
| `/new-design/` | 1 | Shape Builder | `px-shape-builder.svg` (SVG Editor · `<img>`) — three rings, region mesh, the real +/− toolbar | `shapeBuilder` | 2 |
| | 2 | Edit colours | `px-edit-color-anim.svg` (SVG Editor · 136 KB) — recolouring a drawing | `editColors` | 2 |
| | 3 | Gradients and opacity | `mango-juice.svg` (SVG Editor · 86.6 KB) | `gradient` | 2 |
| `/new-design/svg-animator` | 1 | Auto-animate | `lottie/…/auto-animate.svg` (**Lottie Animator** export, no caption) | `autoAnimate` | 3 |
| | 2 | Easing | `lottie/…/easing.svg` (**Lottie Animator** export, no caption) | `easing` | 3 |
| | 3 | Animated vector text | `vector-text-anim.svg` (SVG Animator · 33 KB) | `textPath` | 3 |
| | 4 | Patterns, markers and spray — animated | `Eiffel-tower-anim.svg` (SVG Animator · 100 KB) | `patternMarkerSpray` | 3 |
| | 5 | Repeater | `animated-repeater.svg` (SVG Animator · 32.8 KB) — phone loader | `repeater` | 3 |
| | 6 | Animated icons | `animated-icons.svg` (SVG Animator · 52 KB) — light bulb | `iconMotion` | 3 |
| `/new-design/animator` | 1 | Create, animate, export — one app | `yoga-bright.svg` (Lottie Animator · 93.3 KB) | `createAnimateExport` | 3 |
| | 2 | Auto-animate | `auto-animate.svg` (Lottie Animator · 376 KB) | `autoAnimate` | 3 |
| | 3 | Easing | `easing.svg` (Lottie Animator · 272 KB) | `easing` | 3 |
| | 4 | Animated icons | `animated-icons-watch.svg` (Lottie Animator · 868 KB) | `iconMotion` | 3 |
| | 5 | Splash screens | `splash-screen.svg` (Lottie Animator · 223 KB) | `splash` | 3 |
| `/new-design/svg-editor` | 1 | Shape Builder | `bird-twitting-svg.svg` (SVG Editor · 25.3 KB) — bird built from circles | `shapeBuilder` | 3 |
| | 2 | Edit colours | `edit-colors-static.svg` (SVG Editor · 85.8 KB) — with the Used Colors panel | `editColors` | 3 |
| | 3 | Gradients and opacity | `mango-juice.svg` (SVG Editor · 86.6 KB) | `gradient` | 3 |
| | 4 | Vector text | `vector-text.svg` (SVG Editor · 16 KB) | `vectorText` | 3 |
| | 5 | Patterns, markers, spray and repeater | `Eiffel-tower.svg` (SVG Editor · 83.8 KB) | `patternMarkerSpray` | 3 |

## 2. Diagnosis — what all sections share

| # | Problem | Evidence |
|---|---|---|
| D1 | **The schematics show a taxonomy, not the tool.** Most are a row of variants (union · subtract · intersect; linear · ease · bounce · custom; trim · dash · rotate · scale) instead of what you *do* in the app and what you get. Shape Builder is the clearest case: the tool is "click the regions of overlapping shapes, add them as a new shape or cut them out", the schematic shows textbook booleans. | every `schemas.ts` builder except `autoAnimate` |
| D2 | **Almost nobody sees the motion.** The schematics play only on hover; most visitors scroll past a still diagram. The chip "▶ hover to play" is the only hint. | `on(uid)` = `begin="uid.mouseover;uid.click"` |
| D3 | **Legibility.** 11–12 px labels; three schematics overflow their boxes (`patternMarkerSpray`, `createAnimateExport`, `gradient` at the edge); the chip covers content (`vectorText` circle text runs under it). | screenshots `svg-animator-04`, `animator-01`, `svg-editor-04` |
| D4 | **Claims that are wrong or contradict the caption** — see §3. | |
| D5 | **The fact rows repeat the title or the schematic** and give no "how": no shortcut, no menu name, no link to the manual. A visitor cannot tell how long the feature takes to learn. | e.g. "Click the regions" under a schematic about regions |
| D6 | **Illustrations.** Auto-animate and Easing on the SVG Animator page are Lottie Animator exports (each embeds a Lottie runtime; captions hidden, F3 in the plan). The repeater illustration reads as an empty phone until it plays. | `svg-animator.astro` imports from `assets/lottie/` |

## 3. Claims checked

| Section | Claim on the page | What is true | Source |
|---|---|---|---|
| Easing (both pages) | presets: "gravity › fall, **bounce** for a landing"; schematic panel "gravity · bounce" | there is **no bounce preset**: presets are single cubic curves (linear, gravity, ease, sine, ease²…⁵, circle, expo × in / out / in-out). A bounce is several keyframes — gravity fall down, gravity rise up — which is exactly what the easing illustration shows | manual `easing-charts#easing-presets`; kf `timeline/parts/EasingUtil.ts` |
| Shape Builder (SVG Editor) | "One clean path — **no leftover groups, no hidden shapes under the result**" | **Add** puts a **new** shape on top and leaves the originals where they were; **Remove** cuts the clicked regions out of the originals | kf `tool/shapebuilder/ShapeBuilderControls.tsx` `applyAction` |
| Shape Builder | "Union, subtract, intersect — by clicking the overlaps" | close; the real vocabulary is **Add (+) / Remove (−)** plus quick selections **All · Subtract · Intersect · Exclude · Deselect** | manual `object-creation-tools#shape-builder` |
| Gradients (home) | "the file stays **a few kilobytes**" | the caption right below says **86.6 KB** | `ProofCaption` |
| Gradients (SVG Editor) | "Still a small file — a gradient is three lines of SVG" | true for one gradient; the example file is 86.6 KB — the line invites the comparison | |
| Splash screens | "weighs **a few kilobytes**" | caption: **223 KB** | `ProofCaption` |
| Animated icons (SVG Animator) | "Export as SVG + CSS — **same size, same markup**, now it moves on hover" | the export adds the CSS (and a small trigger script for scroll); it is a drop-in replacement, not the same size | manual `save` |
| Vector text (SVG Editor) | "Style, size and **kerning** as live text" | letter spacing and word spacing; no kerning control | manual `text#text-objects` |
| Animated vector text | "Rotate, flip, scale — the whole word **or each glyph on its own**" | per letter only after **Text to Bezier Shape** (one path per letter) | manual `text#text-as-outlines` |
| Patterns (animated) | "scattered copies **with their own motion**" (spray) | sprayed copies are clones of one original — animate the original and all copies move, each at its own random size, angle and opacity | manual `object-creation-tools#spray` |
| Edit colours | "Keep the variations — save each theme as its own file" | true but empty (Save As does that in any app); the real strengths are missing: the list covers **fills, strokes and gradient stops**, and a swatch click **reuses** a colour | manual `color#used-colors` |
| Auto-animate | "Press **Pin** and the object's position, size and colour are fixed" | **Pin Animation State at Frame**, `Alt + A`; the playhead then jumps one second ahead; keyframes appear for whatever changed | manual `animation#auto-animation`; kf `HotkeysConst.ts` |

## 4. The new pattern (applies to every section)

1. **Schematic = a storyboard of the real interaction.** A mini canvas in the app's own vocabulary (cursor, region
   mesh, handles, swatch row, timeline with playhead and diamonds) acts the steps out; under it, **numbered steps**
   with the real controls (`B`, `G`, `Y`, `Shift T`, `Alt A`, menu names) light up in sync. The steps are HTML text,
   so they stay readable on phones and are indexable.
2. **It plays once when it scrolls into view** (≥ 50 % visible — the site's rule for animations), and on **Replay**
   or a click on the scene. Reduced motion: no autoplay. At rest (before playing, without JS) the scene shows the
   **result**, so it still reads as a diagram.
3. **Facts = outcomes**, never a repeat of the steps: what you can make with it, what it saves you, a rule of thumb.
   No numbers that a caption on the same screen contradicts.
4. **One link to the manual** per section (`In the manual: …`), where the manual covers the tool.

## 5. Section by section

### 5.1 Shape Builder — home #1, SVG Editor #1
- **Intent.** Complex shapes from simple ones without drawing curves: the selling point for icons and logos.
- **Says now.** "Simple shapes in, finished artwork out"; click the regions; a crescent in seconds.
- **Looks.** Strong illustrations (the home one *is* the tool: rings, mesh, +/− toolbar). Schematic: two circles and
  three booleans — the one thing the tool is *not* about.
- **Rework.** Scene: three overlapping circles → `B`, the mesh splits them into regions → the cursor clicks three
  regions → **＋ Add**: they lift off as a new shape (the originals stay) → **− Remove**: the centre region is cut
  out of the originals. Steps: select + `B` · click or drag across regions · ＋ Add = one new shape, originals stay ·
  − Remove = cut it out. Facts: shapes you can't draw in one go; quick selections (All, Subtract, Intersect,
  Exclude) = the classic booleans in one click; the result is an ordinary path (edit nodes, recolour, animate).

### 5.2 Edit colours — home #2, SVG Editor #2
- **Intent.** A theme change on a whole drawing in one move.
- **Says now.** One colour, every element that uses it; "keep the variations".
- **Looks.** Good illustrations (the static one shows the real Used Colors panel). Schematic: three shapes joined by
  lines, then orange — abstract; it never shows *where* you click.
- **Rework.** Scene: a small drawing that uses one colour as a fill, a stroke and a gradient stop + the **Used
  Colors** swatch row → click the swatch (nothing selected) → the Edit Color wheel → pick orange → all three uses
  change together. Steps: Used Colors lists every colour · nothing selected, click a swatch · pick the new colour ·
  every fill, stroke and gradient stop using it changes. Facts: a theme in one click; nothing missed (stops and
  strokes too); reuse a document colour with one click.

### 5.3 Gradients and opacity — home #3, SVG Editor #3
- **Intent.** Depth (light, shadow, glass) while staying vector.
- **Says now.** Linear/radial, any stops, dragged on canvas; opacity per shape; "a few kilobytes" (contradicted).
- **Looks.** The mango juice shows the gradient handles on canvas — good. Schematic: three swatches (linear, radial,
  two squares) — a legend, not a mechanism.
- **Rework.** Scene: a flat disc → **Radial** → `G`, handles appear → the cursor drags the **focal point** up-left and
  the disc turns into a lit ball → a shadow whose last stop has **alpha 0** fades in under it. Steps: Linear or
  Radial on the Fill tab · `G`, drag the handles · move the focal point · a stop with alpha = soft edge. Facts: any
  number of stops (pad · reflect · repeat); three opacities that multiply (colour alpha, fill/stroke, object); stays
  vector (sharp at any size).

### 5.4 Vector text — SVG Editor #4
- **Intent.** Brand fonts, text on curves, and outlines when the font can't ship.
- **Says now.** Import TTF; to outlines in one command; on any path. "Kerning" is wrong.
- **Looks.** The schematic's circle text runs under the chip.
- **Rework.** Scene: a `.ttf` chip comes in → `Shift T`, the word is typed → a wave path → the word moves onto it
  (**Put Text on Path**) → a big "A" turns into an outline with its nodes (**Text to Bezier Shape**). Steps
  accordingly. Facts: live text until you decide (size, spacing, decoration, case); outlines when the font must not
  travel (one path per letter); edit the path's nodes and the text re-flows.

### 5.5 Animated vector text — SVG Animator #3
- **Intent.** Moving text — titles that travel along a curve.
- **Rework.** Scene: text on a wave + a mini timeline with an **Offset** row: a diamond at 0, the playhead jumps,
  Offset 40 % = a second diamond, then playback slides the words along the wave in sync with the playhead. Steps: put
  the text on a path · keyframe Offset · play. Facts: animate the path's nodes too — the text follows the moving
  curve; around a circle, Offset 0 → 100 % = one orbit; per-letter motion after Text to Bezier Shape.

### 5.6 Auto-animate — SVG Animator #1, Lottie Animator #2
- **Intent.** The fastest way to animate: pose to pose, no keyframe bookkeeping.
- **Says now.** Pin, move, keyframes appear — accurate in spirit, the only schematic that is a process.
- **Rework.** Scene: canvas + a mini timeline (Position, Scale, Fill rows). `Alt A` drops a pin at 0 → the playhead
  jumps to 1 s → the cursor drags the ball (motion path draws), grows it, recolours it — a diamond pops on each row
  as it changes → playback runs the whole thing. Steps: `Alt A` pins · the playhead jumps one second · move,
  resize, recolour · play. Facts: pose to pose (pin the key moments, refine later); several properties in one move;
  pins are a working mode — what's saved is ordinary keyframes.

### 5.7 Easing — SVG Animator #2, Lottie Animator #3
- **Intent.** Motion that feels physical; understanding it through the charts.
- **Says now.** Presets incl. a non-existent **bounce**; handles; velocity/acceleration charts.
- **Rework.** Scene: the curve editor, a 3 × 3 preset grid and a falling ball with its velocity chart. The cursor
  picks **gravity · in** → the curve morphs, the ball falls accelerating, the velocity chart is a ramp → the cursor
  drags a handle → ease in-out, the ball eases, the chart becomes a hill. Steps: click the segment between two
  keyframes · pick a preset · or drag the two handles · the velocity chart shows where it speeds up. Facts: **a
  real bounce = gravity fall down + gravity rise up, keyframe after keyframe**; the manual's rule of thumb (out for
  arrivals, in for exits, in-out for moves); exact values (outX, outY, inX, inY) to copy an easing.

### 5.8 Patterns, markers and spray — SVG Editor #5 (+ repeater), SVG Animator #4 (animated)
- **Intent.** Detail and texture from one shape.
- **Looks.** Labels overflow all three boxes ("ern — the tile moves, the fill mo…").
- **Rework.** One scene, three zones with **short** labels: a tile → **Make Pattern** fills a blob; a path gets
  **Start · Mid · End** markers on its nodes; the **Spray** brush drags and copies pop at random size, angle and
  opacity. The SVG Animator version adds a fourth beat: the tile slides, the markers pulse, the original star turns —
  every copy follows. Facts (editor): your tile or the library's, recoloured and scaled per object; hundreds of
  copies stay light (clones of one original); Repeater (`Y`) for rows, rings and grids. Facts (animator): a
  pattern that flows; particles without plug-ins (animate the original, all copies move); markers stay on the nodes
  while the path moves.

### 5.9 Repeater — SVG Animator #5
- **Intent.** Symmetric sets from one object, animated from one place.
- **Rework.** Scene: a petal + a mini Repeater panel (Copies, Rotation, Scale). `Y` → Copies counts 1 → 8 and the
  ring builds → Scale per copy 100 → 88 % and the ring becomes a spiral → a Rotation keyframe row, playback turns the
  set. Steps: group, press `Y` · copies, rotation, scale per copy · change a number, the layout rebuilds · keyframe
  them. Facts: edit the source, every copy follows; Circle and Line presets, Add one / Remove one; one keyframe row
  for the whole set.

### 5.10 Animated icons — SVG Animator #6, Lottie Animator #4
- **Intent.** The common icon motions, quickly, as a drop-in file.
- **Says now.** "Same size, same markup" (not true).
- **Rework.** Scene: three real icons, each with its property tag — a check circle that **draws itself** (Trim
  Stroke End 0 → 100 %), a bell that **swings** (rotation, ease-out), a heart that **pops** (scale + colour). The
  SVG Animator version ends with the cursor hovering the bell: it plays — the trigger is in the file. Steps: draw or
  import · Trim Stroke End 0 → 100 % · rotate, scale, fade with easing · save with a trigger (SVG) / one Lottie file
  for every size (Lottie). Facts: spinners from one ring (Start/End 0/20 %, animate Offset); drop-in replacement
  (SVG + CSS, trigger saved) or no @2x/@3x (Lottie); grid and snapping.

### 5.11 Splash screens — Lottie Animator #5
- **Says now.** "A few kilobytes" (caption: 223 KB).
- **Rework.** Scene: a phone; the logo assembles (pieces fly in, a small overshoot), the title fades in, the app
  screen follows; then `splash.json` goes to a phone, a tablet and a desktop at once. Steps: draw the logo or title ·
  animate (scale, fade, easing) · save Lottie JSON or a video · the app's Lottie player shows it on every screen.
  Facts: the native players by name; sharp on every screen (vector); timed with real easing and previewed.

### 5.12 Create, animate, export — Lottie Animator #1
- **Looks.** All three labels overflow and overlap.
- **Rework.** Three stages with short in-box labels: **Draw** (the pen draws a curve; SVG · PNG · TTF · Lottie chips
  come in) → **Animate** (Watch + Diamond; keyframes pop; a dot travels) → **Export** (.json · .lottie · .svg ·
  .mp4 · .gif · .png pop out). Facts: start from a community Lottie (LottieFiles, IconScout) and change it; scenes
  from reusable blocks; one document, many files.

## 6. Accepted limits and owner decisions

| Item | Status |
|---|---|
| Illustrations stay as they are (real exports). Auto-animate and Easing on the SVG Animator page are still Lottie Animator exports (F3) — re-export from SVG Animator to give them a true caption. | owner |
| SVG Editor #5 merges four tools; the old page had a separate repeater section whose illustration (`clock-face-repeater.svg`) never existed (F2). A repeater export from SVG Editor would allow splitting it. | owner |
| Manual links point at the SVG Animator manual — the drawing tools are the same in SVG Editor; there is no separate SVG Editor manual. | owner: keep the links on the SVG Editor page? |
| "Edit colours" (page) vs "Used Colors" (app UI): British vs American spelling on the same screen. | owner |
| Schematics now play once when scrolled into view — previously hover-only ("nothing animates on load" still holds: they start in view, like every other animation on the site). | done; revert = one line in `Schema.astro` |

## 7. Status (2026-10-15)

| Item | State |
|---|---|
| Schematics: 14 scenes (12 kinds; `patternMarkerSpray` and `iconMotion` have an animated / Lottie variant), steps with real controls, play in view + Replay | done — `schemas.ts`, `Schema.astro` |
| Copy: every claim in §3 corrected; fact rows rewritten as outcomes; manual links on home, SVG Animator and SVG Editor | done — the four pages |
| Position words ("on the left") removed from feature copy — sides alternate and stack on phones | done; one left in "What you get in the file" (not a feature section) |
| Checks: contact sheet of every scene (rest + paused moments), every section at 1440 px at rest and while playing, SVG Editor at 390 px; `yarn build` link check (the new manual anchors resolve); strict `tsc` of `schemas.ts` | done |
| Safari: SMIL `fx`/`fy` on a radial gradient (gradient scene) and `d` morphs (easing) — expected to work; not checked in Safari here | open — check once in Safari |
| §6 owner decisions | open |
