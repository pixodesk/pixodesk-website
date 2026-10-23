/**
 * The app pages of new-design2 (owner, 2026-10-17): ONE catalogue of sections for the three editors' pages.
 * - Order here = order on every page; a page shows the sections whose `apps` include it.
 * - A section on several pages has the same slug (its anchor), title and subtitle everywhere; its header links to the others.
 * - Titles are one to three words; the subtitle says more.
 * - Misc: sections still waiting for their art (or in doubt) — sorted later.
 */

export enum AppKey { svgAnimator = "svgAnimator", animator2d = "animator2d", svgEditor = "svgEditor" }

export interface AppInfo { key: AppKey; name: string; page: string }
export const APPS: Array<AppInfo> = [
  { key: AppKey.svgAnimator, name: "SVG Animator", page: "/new-design2/svg-animator" },
  { key: AppKey.animator2d, name: "2D Animator (Lottie)", page: "/new-design2/animator" },
  { key: AppKey.svgEditor, name: "SVG Editor", page: "/new-design2/svg-editor" },
];

export enum GroupKey { intro = "intro", use = "use", animate = "animate", draw = "draw", effects = "effects", files = "files", getStarted = "get-started" }

/** `band`: the group opens with a band (name, line, chips to its sections); the intro and the closing band have none. */
export interface GroupInfo { key: GroupKey; name: string; line: string; band: boolean }
export const GROUPS: Array<GroupInfo> = [
  { key: GroupKey.intro, name: "Intro", line: "", band: false },
  { key: GroupKey.use, name: "Use", line: "Where it goes, and how it gets there.", band: true },
  { key: GroupKey.animate, name: "Animate", line: "Keyframes, easing and the techniques that make things move.", band: true },
  { key: GroupKey.draw, name: "Draw", line: "The vector editor underneath: shapes, colour, text and patterns.", band: true },
  { key: GroupKey.effects, name: "Effects", line: "One source shape, built into many.", band: true },
  { key: GroupKey.files, name: "Files", line: "What you save, and what reads it.", band: true },
  { key: GroupKey.getStarted, name: "Get started", line: "", band: false },
];

export enum Slug {
  hero = "hero", quickStart = "quick-start", tryIt = "try-it",
  useCases = "use-cases", frameworks = "frameworks", whereItPlays = "where-it-plays",
  keyframes = "keyframes", autoAnimate = "auto-animate", easing = "easing", textAnimation = "text-animation",
  shapes = "shapes", color = "color", gradients = "gradients", fonts = "fonts", patterns = "patterns-markers",
  repeater = "repeater",
  fileFormat = "file-format",
  triggers = "triggers", scrollAnimation = "scroll-animation", motionPath = "motion-path", shapeMorph = "shape-morph", masks = "masks",
  lottieMasks = "masks-and-mattes", clonesSpray = "clones-spray", filters = "filters",
  start = "start",
}

/** `head: false` — no catalogue header (the hero and the closing band keep their own). `subtitleFor` — an app's own wording. */
/** `perApp`: different on every app's page — its header links to no other app (owner, 2026-10-17) */
export interface SectionInfo { slug: Slug; group: GroupKey; title: string; subtitle: string; apps: Array<AppKey>; subtitleFor?: Array<{ app: AppKey; text: string }>; head?: boolean; perApp?: boolean }

const ALL = [AppKey.svgAnimator, AppKey.animator2d, AppKey.svgEditor];
const ANIMATORS = [AppKey.svgAnimator, AppKey.animator2d];
/** The SVG apps (the 2D Animator draws for Lottie, which has no clones, spray or SVG filters). */
const SVG_APPS = [AppKey.svgAnimator, AppKey.svgEditor];

export const SECTIONS: Array<SectionInfo> = [
  // Intro
  { slug: Slug.hero, group: GroupKey.intro, title: "", subtitle: "", apps: ALL, head: false },
  { slug: Slug.quickStart, group: GroupKey.intro, title: "Quick start", subtitle: "From the editor to your app in a minute", apps: ALL,
    subtitleFor: [{ app: AppKey.svgEditor, text: "An icon in under a minute" }] },
  { slug: Slug.tryIt, group: GroupKey.intro, title: "Try it", subtitle: "The real editor, in your browser", apps: ALL },
  // Use
  { slug: Slug.whereItPlays, group: GroupKey.use, title: "Where it plays", subtitle: "What plays your file — and the code to add it", apps: ANIMATORS, perApp: true,
    subtitleFor: [{ app: AppKey.animator2d, text: "Each platform's own Lottie player — and the code to add it" }] },   // first in Use (owner)
  { slug: Slug.frameworks, group: GroupKey.use, title: "Frameworks", subtitle: "Into your page: an image, inline markup or a CSS background", apps: [AppKey.svgEditor] },   // the animators': in Where it plays (owner)
  // every file it opens and saves, imports and exports — one section, before Use cases (owner, 2026-10-17: was File format + Export & import)
  { slug: Slug.fileFormat, group: GroupKey.use, title: "File formats", subtitle: "Open and save, import and export", apps: ALL },
  { slug: Slug.useCases, group: GroupKey.use, title: "Use cases", subtitle: "Animation your users notice, in your app or website", apps: [AppKey.svgAnimator] },
  // Animate
  { slug: Slug.keyframes, group: GroupKey.animate, title: "Keyframes", subtitle: "Switch on a property's clock, change its value", apps: ANIMATORS },
  { slug: Slug.autoAnimate, group: GroupKey.animate, title: "Auto animate", subtitle: "From one state to the next", apps: ANIMATORS },
  { slug: Slug.easing, group: GroupKey.animate, title: "Easing", subtitle: "Motion that feels right", apps: ANIMATORS },
  { slug: Slug.textAnimation, group: GroupKey.animate, title: "Text animation", subtitle: "Animated headlines and banners", apps: ANIMATORS },
  // (no art yet: shown as cards; owner, 2026-10-17: moved here from Misc)
  { slug: Slug.triggers, group: GroupKey.animate, title: "Triggers", subtitle: "Load, hover, click, scroll into view", apps: ANIMATORS },
  { slug: Slug.scrollAnimation, group: GroupKey.animate, title: "Scroll animation", subtitle: "The timeline follows the page's scroll", apps: [AppKey.svgAnimator] },
  { slug: Slug.motionPath, group: GroupKey.animate, title: "Motion path", subtitle: "Move anything along a curve", apps: ANIMATORS },
  { slug: Slug.shapeMorph, group: GroupKey.animate, title: "Shape morph", subtitle: "One shape into another", apps: ANIMATORS },
  // Draw
  { slug: Slug.shapes, group: GroupKey.draw, title: "Shape builder", subtitle: "Overlap simple shapes, keep the parts you want", apps: ALL },
  { slug: Slug.color, group: GroupKey.draw, title: "Color", subtitle: "Every kind of colour, and the ones in use", apps: ALL },
  { slug: Slug.gradients, group: GroupKey.draw, title: "Gradients", subtitle: "Light and shadow, still vector", apps: ALL },
  { slug: Slug.fonts, group: GroupKey.draw, title: "Fonts", subtitle: "Your fonts, on any path", apps: ALL },
  { slug: Slug.patterns, group: GroupKey.draw, title: "Patterns & markers", subtitle: "One shape becomes hundreds", apps: [AppKey.svgAnimator, AppKey.svgEditor] },
  // (owner, 2026-10-17: moved here from Misc)
  { slug: Slug.masks, group: GroupKey.draw, title: "Masks", subtitle: "Reveal and cut out", apps: SVG_APPS },
  // the 2D Animator's own: Lottie masks and track mattes (owner, 2026-10-18)
  { slug: Slug.lottieMasks, group: GroupKey.draw, title: "Masks & mattes", subtitle: "Show only part of a layer", apps: [AppKey.animator2d] },
  { slug: Slug.clonesSpray, group: GroupKey.draw, title: "Clones & spray", subtitle: "One shape, many copies", apps: SVG_APPS },
  { slug: Slug.filters, group: GroupKey.draw, title: "Filters", subtitle: "Blur, shadow, glow — or your own", apps: SVG_APPS },
  // Effects
  { slug: Slug.repeater, group: GroupKey.effects, title: "Repeater", subtitle: "One shape, a whole grid", apps: ANIMATORS },
  // Files
  // Misc — waiting for art, or in doubt
  // Get started
  { slug: Slug.start, group: GroupKey.getStarted, title: "Start here", subtitle: "", apps: ALL, head: false },
];

export const appInfo = (key: AppKey): AppInfo => { const a = APPS.find((x) => x.key === key); if (!a) throw new Error(`no app ${key}`); return a; };
export const groupInfo = (key: GroupKey): GroupInfo => { const g = GROUPS.find((x) => x.key === key); if (!g) throw new Error(`no group ${key}`); return g; };
/** Whether a section's header shows the app tabs: on several apps' pages, and the same there. */
export const showsAppTabs = (s: SectionInfo): boolean => !s.perApp && s.apps.length > 1;
export const sectionInfo = (slug: Slug): SectionInfo => { const s = SECTIONS.find((x) => x.slug === slug); if (!s) throw new Error(`no section ${slug}`); return s; };
export const sectionsFor = (app: AppKey): Array<SectionInfo> => SECTIONS.filter((s) => s.apps.includes(app));
export const subtitleOf = (s: SectionInfo, app: AppKey): string => s.subtitleFor?.find((x) => x.app === app)?.text ?? s.subtitle;
/** The section's link on an app's page (the same anchor on every page). */
export const sectionHref = (slug: Slug, app: AppKey): string => `${appInfo(app).page}#${slug}`;
/** The editor manual (the SVGA docs) covers the SVG editors; the 2D Animator has its own docs, so its page shows no manual links. */
export const showsManual = (app: AppKey): boolean => app !== AppKey.animator2d;
