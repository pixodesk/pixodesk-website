/**
 * The feature sections' content, ONE place for every app page (owner, 2026-10-17: no duplicated copy). A feature has one content,
 * or one per group of apps where the content really differs (animated art in the animators, static in the SVG Editor).
 * - `art`: the illustration (HTML) — sections without art render as a text card (the Misc group).
 * - `docs`: the editor manual (shown on the pages of the editors it covers — catalogue `showsManual`).
 */
import type { FactItem } from "../new-design/Facts.astro";
import type { SchemaKind } from "../new-design/schemas";
import type { SchemaCard } from "./SchemaCards.astro";
import { REPEATER_SCENES } from "./repeaterScenes";
import { shapeBuilderActions } from "./shapeBuilderActions";
import { AppKey, Slug } from "./catalogue";
import { b, manual, v, w } from "./text";


/** `file`: the illustration's own file (for the proof caption); `cards`: "how it works" panels under it. */
export interface FeatureArt { html: string; file?: string; schema?: SchemaKind; cards?: { kind?: SchemaKind; items: Array<SchemaCard> } }
export interface FeatureContent { line: string; facts: Array<FactItem>; art?: FeatureArt; docs?: { label: string; href: string } }
interface Feature { slug: Slug; variants: Array<{ apps: Array<AppKey>; content: FeatureContent }> }

const ANIMATORS = [AppKey.svgAnimator, AppKey.animator2d];
const ALL = [AppKey.svgAnimator, AppKey.animator2d, AppKey.svgEditor];

/** An animation played by the site's player (src/scripts/real-ui.ts), as the hero is. */
const played = (id: string, src: string, ratio: string): string =>
  `<div data-rui-card="${id}" data-rui-behaviour="{}" style="width: 100%"><div data-rui-player="${id}" data-rui-src="${src}" style="width: 100%; aspect-ratio: ${ratio}"></div></div>`;

// the Christmas tree (patterns, markers, spray) with its minimal "How it works" steps under it, inset like the art's own card;
// the SVG Editor shows the still version (kf section-detail.mjs writes both files: no motion, no timeline strip), no "animate" step
const howItWorks = (steps: Array<string>): string => `<div class="rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-white" style="margin: 0 ${(20 / 760 * 100).toFixed(2)}%"><div class="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">How it works</div><ol class="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">${steps.map((t, i) => `<li class="flex gap-2 text-[13px] leading-snug text-custom-grey-200"><span class="mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 text-[11px] font-semibold text-slate-300">${i + 1}</span><span>${t}</span></li>`).join("")}</ol></div>`;
const treeArt = (animated: boolean): string => `<div class="mx-auto flex w-full flex-col gap-1" style="max-width: calc(50vh * 760 / ${animated ? 554 : 452})">${animated ? played("detail", "/assets/svga/sections/detail.json", "760 / 554") : played("detail-static", "/assets/svga/sections/detail-static.json", "760 / 452")}${howItWorks([
  `${w("Make Pattern")}: one tile fills any shape — snow, needles, paper`,
  `${w("Markers")}: a shape on every node of a path — the lights`,
  `${w("Spray")}: copies of one shape, each its own size and angle`,
  ...(animated ? [`${w("Animate")} the tile, the path or the original — copies follow`] : []),
])}</div>`;
const shapeBuilderArt = `<div class="mx-auto flex w-full flex-col gap-1" style="max-width: calc(50vh * 760 / 520)">${played("shape-builder", "/assets/svga/sections/shape-builder.json", "760 / 520")}${shapeBuilderActions(`${(20 / 760 * 100).toFixed(2)}%`)}</div>`;
const COLOR_DOCS = manual("Color", "/docs/svga/editor/color");
const COLOR_FACTS: Array<FactItem> = [
  { icon: "sync", lead: "Change a colour everywhere", text: `Edit one of the ${b("Used Colors")}: every fill, stroke and gradient stop using it follows.` },
  { icon: "click", lead: "Pick it your way", text: `Wheel, HEX, RGB or HSL with alpha, the ${v("eyedropper")}, or a click on a used colour.` },
];
const GRADIENTS_DOCS = manual("Gradients", "/docs/svga/editor/color#linear-and-radial-gradients");
const GRADIENTS_FACTS: Array<FactItem> = [
  { icon: "gradient", lead: "Dragged on the canvas", text: `Press <b>G</b>: a linear gradient moves, turns and stretches by its handles; a circular one by ${v("its centre and radius")}.` },
  { icon: "opacity", lead: "A glow without a blur", text: `A stop that fades to alpha 0 gives soft light — ${b("still vector")}, sharp at any size.` },
];
const PATTERNS_LINE = `Patterns, markers and spray: one shape becomes hundreds.`;
const PATTERNS_DOCS = manual("Patterns", "/docs/svga/editor/patterns");
// masks, clones & spray, filters: the same copy on the SVG Animator (with animated art) and the SVG Editor (a text card)
const MASKS: FeatureContent = {
  line: `Mask, mask effect, clip path: ${b("show only part of a drawing")}.`,
  docs: manual("Masks", "/docs/svga/editor/masks"),
  facts: [
    { icon: "opacity", lead: "Mask", text: `A shape above the content; its fill and opacity fade what shows through.` },
    { icon: "sync", lead: "Mask effect", text: `The shape stays an ordinary object — ${v("animate, restyle, reuse it")}.` },
    { icon: "union", lead: "Clip path", text: `A hard-edged cut to the top shape's outline.` },
  ] };
const CLONES: FeatureContent = {
  line: `Linked copies of one object: ${b("edit the original, every copy follows")}.`,
  docs: manual("Clones", "/docs/svga/editor/edit-objects#clones"),
  facts: [
    { icon: "clone", lead: "Clones", text: `A linked copy costs almost nothing in the file.` },
    { icon: "spray", lead: "Spray", text: `Scatter copies — leaves, stars, confetti — each ${v("its own size, angle and opacity")}.` },
  ] };
const FILTERS: FeatureContent = {
  line: `Drop shadow, blur, glow, outline — ${b("or build your own")} from the primitives.`,
  docs: manual("Filters", "/docs/svga/editor/filters"),
  facts: [
    { icon: "blocks", lead: "Presets", text: `Fifteen presets, several on one object, shared between objects.` },
    { icon: "handles", lead: "The filter editor", text: `A chain of primitives: sources, modifiers, combiners, lighting.` },
  ] };

const FEATURES: Array<Feature> = [
  // ---- Animate
  // the first way to animate (owner, 2026-10-17): the clock next to a property — the manual's "Keyframes by hand"
  { slug: Slug.keyframes, variants: [{ apps: ANIMATORS, content: {
    line: `Switch on a property's ${w("clock")}, move the playhead, change the value: ${b("a keyframe")}.`,
    // schematic: the site's boat on the waves, a two-row properties panel beside it, a two-row timeline under both — the pointer clicks
    // the boat's Rotation clock, then the waves' Position clock; each turns blue and starts animating. No pins (kf section-keyframes.mjs)
    art: { html: played("keyframes", "/assets/svga/sections/keyframes.json", "600 / 430") },
    docs: manual("Add keyframes", "/docs/svga/editor/keyframes#add-keyframes"),
    facts: [
      { icon: "clock", lead: "A clock on every property", text: `Position, rotation, colour, opacity, stroke, shape: ${v("anything with a clock")} animates.` },
      { icon: "keyframe", lead: "Two values, one motion", text: `Change it at one time, then at another: everything in between is animated.` },
      { icon: "chart", lead: "One row per property", text: `Each animated property gets its own timeline row, its keyframes and the easing between them.` },
    ] } }] },
  { slug: Slug.autoAnimate, variants: [{ apps: ANIMATORS, content: {
    line: `Auto-animate: you set the states. ${b("The keyframes are written for you.")}`,
    art: { html: played("auto-animate", "/assets/svga/sections/auto-animate.json", "737 / 528") },
    docs: manual("Auto animation", "/docs/svga/editor/animation#auto-animation"),
    facts: [
      { icon: "pin", lead: "Pose to pose", text: `Pin each key moment first; refine timing and easing ${b("afterwards")}.` },
      { icon: "move", lead: "Several properties in one move", text: `Position, size, rotation, colour, shape: ${v("one change")} records them all.` },
      { icon: "keyframe", lead: "Ordinary keyframes in the file", text: `Pins are a working mode; what is saved is keyframes you can edit later.` },
    ] } }] },
  { slug: Slug.easing, variants: [{ apps: ANIMATORS, content: {
    line: `Timing is what makes motion feel real. ${b("Pick it, or draw it.")}`,
    // a bit smaller than the column (owner): the whole drawing, contained, centred
    art: { html: `<div class="mx-auto w-full" style="max-width: 86%">${played("easing", "/assets/svga/sections/easing.json", "1070 / 728")}</div>`,
      cards: { kind: "easingPresets", items: [{ title: "Easing chart", view: [10, 10, 182, 176] }, { title: "Easing presets", view: [200, 10, 132, 176] }, { title: "Velocity chart", view: [340, 10, 170, 176] }] } },
    docs: manual("Easing and charts", "/docs/svga/editor/easing-charts"),
    facts: [
      { icon: "curve", lead: "A real bounce", text: `${b("Gravity fall")} on the way down, ${b("gravity rise")} on the way up — keyframe after keyframe.` },
      { icon: "chart", lead: "A mini chart on every segment", text: `Velocity on the timeline itself, so you see <i>where it speeds up</i> before you play it.` },
      { icon: "handles", lead: "The rule of thumb", text: `${v("Out")} for things that arrive, ${v("in")} for things that leave, ${v("in-out")} for moves that stay in view.` },
    ] } }] },
  { slug: Slug.textAnimation, variants: [{ apps: ANIMATORS, content: {
    line: `Animated vector text: your fonts, on any path, ${b("moving")}.`,
    // generated by kf `node scripts/website/section-vector-text.mjs`
    art: { html: played("vector-text", "/assets/svga/sections/vector-text.json", "760 / 588") },
    docs: manual("Text along a path", "/docs/svga/editor/animation-techniques#text-along-a-path"),
    facts: [
      { icon: "path", lead: "Animate the path too", text: `Move its nodes with auto-pin and ${b("the text follows")} the moving curve.` },
      { icon: "rotate", lead: "Around a circle", text: `On a closed path, Offset 0 → 100 % is ${v("one orbit")}.` },
      { icon: "font", lead: "Letter by letter", text: `Text to Bezier Shape makes each letter a path — animate them one by one.` },
    ] } }] },
  // ---- Draw (static art: the same drawing tools in every editor)
  { slug: Slug.shapes, variants: [{ apps: ALL, content: {
    line: `Shape Builder: overlap simple shapes, ${b("keep the parts you want")}.`,
    // a bird built from circles, part by part (generated by kf `node scripts/website/section-shape-builder.mjs`), the toolbar's actions under it
    art: { html: shapeBuilderArt },
    docs: manual("Shape Builder", "/docs/svga/editor/object-creation-tools#shape-builder"),
    facts: [
      { icon: "union", lead: "Shapes you can't draw in one go", text: `A crescent, a ring, a cut-out letter: overlap circles and rectangles, ${b("pick the regions")}.` },
      { icon: "star", lead: "The classic booleans, one click each", text: `<b>All</b>, <b>Subtract</b>, <b>Intersect</b> and <b>Exclude</b> pick the regions for you.` },
      { icon: "path", lead: "An ordinary path as the result", text: `Edit its nodes, recolour it, ${v("reuse it")} — like the bird, built from circles.` },
    ] } }] },
  // the colour types on one circle (fill, then stroke) and Used Colors recolouring an app mockup (kf section-color.mjs;
  // the 2D Animator's art has no Pattern: a Lottie file has none)
  { slug: Slug.color, variants: [
    { apps: [AppKey.svgAnimator, AppKey.svgEditor], content: {
      line: `Flat, gradient or pattern, for fill and stroke — and ${b("Used Colors")} to change one everywhere.`,
      art: { html: played("color", "/assets/svga/sections/color.json", "760 / 580") },
      docs: COLOR_DOCS,
      facts: [
        { icon: "palette", lead: "Every kind of colour", text: `Flat, linear or circular ${b("gradient")}, pattern — or none; the fill and the stroke each get their own.` },
        ...COLOR_FACTS,
      ] } },
    { apps: [AppKey.animator2d], content: {
      line: `Flat or gradient, for fill and stroke — and ${b("Used Colors")} to change one everywhere.`,
      art: { html: played("color-2d", "/assets/svga/sections/color-2d.json", "760 / 580") },
      facts: [
        { icon: "palette", lead: "Every kind of colour", text: `Flat, linear or circular ${b("gradient")} — or none; the fill and the stroke each get their own.` },
        ...COLOR_FACTS,
      ] } },
  ] },
  // a sunset made of gradients only, with the gradient tool's handles and each gradient's stops (kf section-gradients.mjs):
  // the animators' eases day → dusk → day over a keyframe strip, the SVG Editor's is the dusk still
  { slug: Slug.gradients, variants: [
    { apps: ANIMATORS, content: {
      line: `Light and shadow from gradients: ${b("any number of stops")}, each with its own alpha — ${v("and they animate")}.`,
      art: { html: played("gradients", "/assets/svga/sections/gradients.json", "760 / 452") },
      docs: GRADIENTS_DOCS,
      facts: [
        ...GRADIENTS_FACTS,
        { icon: "keyframe", lead: "Stops and handles animate", text: `Keyframe the stop colours, their alpha and the gradient's position: ${b("day turns to dusk")}.` },
      ] } },
    { apps: [AppKey.svgEditor], content: {
      line: `Light and shadow from gradients: ${b("any number of stops")}, each with its own alpha.`,
      art: { html: played("gradients-static", "/assets/svga/sections/gradients-static.json", "760 / 332") },
      docs: GRADIENTS_DOCS,
      facts: [
        ...GRADIENTS_FACTS,
        { icon: "scale", lead: "Pad, reflect or repeat", text: `The spread method decides what lies past the ends; the units follow ${v("the shape or the document")}.` },
      ] } },
  ] },
  { slug: Slug.fonts, variants: [{ apps: ALL, content: {
    line: `Vector text: your fonts, ${b("on any path")}.`,
    // what the manual's Text page covers: font sources, Use Glyphs, text on a path, Text to Bezier (kf section-fonts.mjs)
    art: { html: played("fonts", "/assets/svga/sections/fonts.json", "520 / 600") },   // no schematic in the text (owner)
    docs: manual("Text", "/docs/svga/editor/text#text-objects"),
    facts: [
      { icon: "font", lead: "Live text until you decide", text: `Size, letter and word spacing, decoration and case stay editable.` },
      { icon: "outline", lead: "Outlines when the font can't travel", text: `Text to Bezier Shape: ${b("one path per letter")}, fill and stroke kept.` },
      { icon: "path", lead: "Re-flows with the path", text: `Edit the path's nodes and the text follows the new curve.` },
    ] } }] },
  { slug: Slug.patterns, variants: [
    { apps: [AppKey.svgAnimator], content: {
      line: `${PATTERNS_LINE} ${b("Then they all move.")}`,
      art: { html: treeArt(true) },
      docs: PATTERNS_DOCS,
      facts: [
        { icon: "pattern", lead: "A fill that flows", text: `Animate the tile's translation, rotation or scale: ${b("the whole fill")} moves.` },
        { icon: "marker", lead: "Markers ride the path", text: `Arrowheads and dots stay on the nodes while the path moves.` },
        { icon: "spray", lead: "Particles without plug-ins", text: `Animate the original: every sprayed copy moves, each at ${v("its own size, angle and opacity")}.` },
      ] } },
    { apps: [AppKey.svgEditor], content: {
      line: PATTERNS_LINE,
      art: { html: treeArt(false) },
      docs: PATTERNS_DOCS,
      facts: [
        { icon: "pattern", lead: "Your tile or the library's", text: `Recolour, rotate and scale the tile per object; edit it once and ${v("every user updates")}.` },
        { icon: "marker", lead: "A marker on every node", text: `Arrowheads, dots, lights: reshape the path and ${b("they follow")}.` },
        { icon: "spray", lead: "Hundreds of copies, still light", text: `Sprayed copies are clones of one original — ${b("change it, all follow")}.` },
      ] } },
  ] },
  // ---- Effects
  { slug: Slug.repeater, variants: [{ apps: ANIMATORS, content: {
    line: `Draw one. Get a ring, a row, a grid — ${b("and animate them as one")}.`,
    art: { html: played("repeater", "/assets/svga/sections/repeater.json", "560 / 360"), cards: { items: REPEATER_SCENES } },   // landscape (owner)
    docs: manual("Repeater", "/docs/svga/editor/object-creation-tools#repeater"),
    facts: [
      { icon: "sync", lead: "Edit the source, every copy follows", text: `Change the original — its shape, colour or size — and ${b("every copy")} changes with it.` },
      { icon: "clone", lead: "Circle and Line presets", text: `A radial array or a straight row in one click; add or remove one copy at a time.` },
      { icon: "move", lead: "One keyframe row for the whole set", text: `Position, scale, rotation and origin — ${v("animated from one place")}.` },
    ] } }] },
  // ---- Misc: no art yet (text cards), or in doubt
  { slug: Slug.triggers, variants: [
    { apps: [AppKey.svgAnimator], content: {
      line: `How it starts on the page: ${b("set once in the editor, saved in the file")}.`,
      docs: manual("Playback and triggers", "/docs/svga/editor/animation#playback-and-triggers"),
      // Start and Out of view are the diagram's (sections/TriggerGraph.astro)
      facts: [
        { icon: "file", lead: "Saved in the file", text: `Every export and the player honour it; the player's props can override it.` },
      ] } },
    { apps: [AppKey.animator2d], content: {
      line: `A Lottie file carries no trigger: ${b("your player starts it")}.`,
      facts: [
        { icon: "code", lead: "Set in the player", text: `Autoplay and loop are the player's props; hover, click or scroll call ${v("play()")} from your code.` },
      ] } },
  ] },
  { slug: Slug.scrollAnimation, variants: [{ apps: [AppKey.svgAnimator], content: {
    line: `Instead of time, ${b("the page scroll")} drives the animation: parallax, progress, stories that unfold as you read.`,
    docs: manual("Scroll-driven animation", "/docs/svga/editor/animation#scroll-driven-animation"),
    facts: [
      { icon: "scroll", lead: "Timeline: Scroll", text: `Switch the document's timeline from time to scroll.` },
      { icon: "chart", lead: "Presets", text: `Enter, journey, exit: ${v("where on the screen")} it starts and ends.` },
    ] } }] },
  { slug: Slug.motionPath, variants: [{ apps: ANIMATORS, content: {
    line: `A car on a road, a plane on a dotted arc: ${b("the object follows a route")}.`,
    // two cars lapping a race track from above, the Properties panel (Along Path, Auto Orient) beside it and the
    // timeline under both (kf section-motion-path.mjs)
    art: { html: played("motion-path", "/assets/svga/sections/motion-path.json", "760 / 402") },
    docs: manual("Motion along a path", "/docs/svga/editor/animation-techniques#motion-along-a-path"),
    facts: [
      { icon: "path", lead: "Draw the route", text: `Select the object and the path: ${v("Move Element Along Path")}.` },
      { icon: "keyframe", lead: "Position = distance", text: `Keyframe it from the start to the end and add easing.` },
      { icon: "rotate", lead: "Nose first", text: `${b("Auto Orient")} turns the object with the curve — no rotation keyframes.` },
    ] } }] },
  { slug: Slug.shapeMorph, variants: [{ apps: ANIMATORS, content: {
    line: `A logo into another, an icon between states, a blob that breathes: ${b("the nodes are animated")}.`,
    // full width (AppPage OWN_SECTION): four morphs — play / pause, a breathing blob, circle → star, corner radius — a dot riding every
    // node, a Path row each (kf section-shape-morph.mjs)
    art: { html: played("shape-morph", "/assets/svga/sections/shape-morph.json", "1200 / 316") },
    docs: manual("Path morphing", "/docs/svga/editor/animation-techniques#path-morphing"),
    facts: [
      { icon: "pin", lead: "Pin, move, drag", text: `Pin the shape, move the playhead, drag nodes and handles into the new shape.` },
      { icon: "star", lead: "Round corners and presets", text: `Corner radius and star, polygon and spiral ${v("points")} animate too.` },
    ] } }] },
  // the 2D Animator's own section: Lottie masks and track mattes — its own art (owner, 2026-10-18): Add / Subtract / Intersect on a
  // sunburst, Alpha / Inverted track mattes over moving stripes (kf section-lottie-masks.mjs)
  { slug: Slug.lottieMasks, variants: [{ apps: [AppKey.animator2d], content: {
    line: `Masks and mattes: ${b("show only part of a layer")}.`,
    art: { html: played("lottie-masks", "/assets/svga/sections/lottie-masks.json", "760 / 408") },
    facts: [
      { icon: "union", lead: "Masks", text: `A path that adds, subtracts or intersects — feathered and expanded if you like.` },
      { icon: "opacity", lead: "Track mattes", text: `One layer's alpha or luma decides where the next one shows.` },
    ] } }] },
  { slug: Slug.masks, variants: [
    // the SVG Animator: one sunset three times — a soft spotlight, a spinning star, a hard-edged iris (kf section-masks.mjs)
    { apps: [AppKey.svgAnimator], content: { ...MASKS, art: { html: played("masks", "/assets/svga/sections/masks.json", "760 / 408") } } },
    // the SVG Editor: the same panels, still (owner: static SVG) — kf section-masks.mjs writes both
    { apps: [AppKey.svgEditor], content: { ...MASKS, art: { html: played("masks-static", "/assets/svga/sections/masks-static.json", "760 / 304") } } },
  ] },
  { slug: Slug.clonesSpray, variants: [
    // the SVG Animator: one flower as the original, six clones, sixteen sprayed copies — all spin and recolour with the
    // original (kf section-clones-spray.mjs)
    { apps: [AppKey.svgAnimator], content: { ...CLONES, art: { html: played("clones-spray", "/assets/svga/sections/clones-spray.json", "760 / 380") },
      facts: [...CLONES.facts, { icon: "move", lead: "Animate the original", text: `Spin it, recolour it, move it: ${b("every copy plays it")}.` }] } },
    { apps: [AppKey.svgEditor], content: { ...CLONES, art: { html: played("clones-spray-static", "/assets/svga/sections/clones-spray-static.json", "760 / 304") } } },
  ] },
  { slug: Slug.filters, variants: [
    // the SVG Animator: one heart, four filters, one value of each animated (kf section-filters.mjs)
    { apps: [AppKey.svgAnimator], content: { ...FILTERS, art: { html: played("filters", "/assets/svga/sections/filters.json", "760 / 436") },
      facts: [...FILTERS.facts, { icon: "play", lead: "Filters animate too", text: `Shadow offset, blur, glow size: ${v("keyframe the values")} like any property.` }] } },
    { apps: [AppKey.svgEditor], content: { ...FILTERS, art: { html: played("filters-static", "/assets/svga/sections/filters-static.json", "760 / 304") } } },
  ] },
];

export const featureFor = (slug: Slug, app: AppKey): FeatureContent | undefined =>
  FEATURES.find((f) => f.slug === slug)?.variants.find((x) => x.apps.includes(app))?.content;
