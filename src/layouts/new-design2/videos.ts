/**
 * The website's scripted videos (kf `yarn website:videos`, recorded from kf app/tests/video/scripts): ONE list for the pages that
 * show them — the learn gallery (svg-animator/learn) and each app's Quick start section — and for their article pages
 * (/new-design2/videos/<name>: the video, its transcript and screenshots; owner, 2026-10-18 — data by kf
 * tests/video/video-article.mjs into src/data/video-articles/<name>.json, read in videoArticles.ts).
 */
import type { GlyphName } from "../new-design/glyphs";
import { AppKey, Slug, appInfo, sectionHref } from "./catalogue";

// ── the learn gallery (SVG Animator) ──
export const LEARN = { title: "Learn SVG Animator", page: "/new-design2/svg-animator/learn" };
export interface LearnVideo { name: string; title: string; line: string; docs: string }
export interface LearnCategory { id: string; title: string; line: string; videos: Array<LearnVideo> }

// where each video's topic is written up in the docs (the link under the card)
const DOCS = {
  react: "/docs/svga/player-library/react", autoplay: "/docs/svga/player-library/react#autoplay", state: "/docs/svga/player-library/react#declarative-playback--play-pause-playmode-completeiteration",
  apiRef: "/docs/svga/player-library/react#imperative-api-apiref", web: "/docs/svga/player-library/web-player#the-playback-api", callbacks: "/docs/svga/player-library/web-player#callbacks",
  triggers: "/docs/svga/player-library/playback-and-triggers", editorTriggers: "/docs/svga/editor/animation#playback-and-triggers",
  prerendered: "/docs/svga/prerendered-svg/on-the-web", exporting: "/docs/svga/editor/export",
};
export const LEARN_CATEGORIES: Array<LearnCategory> = [
  { id: "react", title: "The player in React", line: "Three ways to control the player, from the simplest to full control: play on trigger, React state and apiRef.", videos: [
    { name: "learn-react-autoplay", title: "1. The simplest way: play on trigger", line: "One line of code, playing as set up in the editor — and properties that override it: start on hover or click, reset when the pointer leaves, play just once.", docs: DOCS.autoplay },
    { name: "learn-react-props", title: "2. Declarative control: React state", line: "Play, restart and progress bound to React state — Play and Pause buttons, a Restart that gives the player a new key, and a slider that picks the moment.", docs: DOCS.state },
    { name: "learn-react-apiref", title: "3. Imperative control: apiRef", line: "Play, pause, restart, a slider for any moment, double speed and reverse — each one a single call on the player.", docs: DOCS.apiRef },
  ] },
  { id: "web", title: "The player on the web", line: "No framework: the web player and its calls, in plain JavaScript.", videos: [
    { name: "learn-web-api", title: "1. Control it from your code", line: "One call creates the player; a slider that sets the moment and follows the animation, a jump, and speed buttons — each one call.", docs: DOCS.web },
    { name: "learn-web-events", title: "2. Events and problems", line: "onFinish moves the page on; warnings and errors arrive with a code and a kind, so the console stays quiet.", docs: DOCS.callbacks },
  ] },
  { id: "triggers", title: "Triggers: when it plays by itself", line: "The trigger saved in the file decides when an animation starts and what it does when you look away. With play, progress or time, your code decides instead.", videos: [
    { name: "learn-triggers-ball", title: "1. Every trigger on one ball", line: "Load, mouse over, click and none; then pause, reset, reverse or continue when the pointer leaves, and what happens when it scrolls away.", docs: DOCS.triggers },
    { name: "learn-triggers-practice", title: "2. Triggers in practice", line: "Each trigger where it fits: a courier on load, a Delete lid on hover, a like on click, a reminder once, a payment step left to the code.", docs: DOCS.triggers },
  ] },
  { id: "prerendered", title: "Pre-rendered SVG", line: "The file is the animation — no library at all.", videos: [
    { name: "learn-prerendered-flavours", title: "1. Which file: CSS, CSS + script, or JS?", line: "The same ball saved three ways, embedded with an iframe — pick the smallest file that does what you need.", docs: DOCS.prerendered },
    { name: "learn-prerendered-control", title: "2. No library: just two classes", line: "Fetch the file into the page, then play, pause or reset it by adding and removing two classes.", docs: DOCS.prerendered },
  ] },
  { id: "editor", title: "From the editor", line: "One document, every place it can go.", videos: [
    { name: "learn-editor-export", title: "One animation, every format", line: "Lottie JSON or dotLottie, a video, a GIF or a still image — exported from the same document.", docs: DOCS.exporting },
  ] },
  { id: "ui", title: "In real interfaces (React)", line: "Where animation earns its place in an app.", videos: [
    { name: "learn-ui-flight", title: "Flight search", line: "A plane flies for as long as the search runs, and the results stay when it ends.", docs: DOCS.react },
    { name: "learn-ui-delivery", title: "A delivery tracker", line: "The courier rides while the order is on the way, and rests when the tracker scrolls away.", docs: DOCS.react },
    { name: "learn-ui-payment", title: "Payment, stage by stage", line: "One icon per stage: a still frame when done or waiting, motion while it runs.", docs: DOCS.react },
    { name: "learn-ui-pipeline", title: "A pipeline run", line: "Records flow while the job runs, and stop where they are when it succeeds.", docs: DOCS.react },
    { name: "learn-ui-weather", title: "A weather widget", line: "The forecast data picks each day's icon, and one component plays them all.", docs: DOCS.react },
    { name: "learn-ui-wellness", title: "A wellness app", line: "The meditation figure breathes while the session runs, and holds still when you pause.", docs: DOCS.react },
    { name: "learn-ui-dashboard", title: "A dashboard list", line: "Icons that draw themselves once when the list comes into view, then stay.", docs: DOCS.react },
    { name: "learn-ui-notfound", title: "A 404 page", line: "A boat on a moving sea: two animations layered with a few lines of CSS.", docs: DOCS.react },
    { name: "learn-ui-hover", title: "Icons that move on hover", line: "Delete, Cancel and OK: each icon plays forward on hover and back on leave.", docs: DOCS.react },
    { name: "learn-ui-background", title: "An animated background", line: "A glowing dot grid behind a landing page, covering its box like an image.", docs: DOCS.react },
  ] },
];

// ── the Quick start sections: one tab per video ──
export interface QuickStartVideo { id: string; label: string; hint?: string; glyph?: GlyphName; name: string }
export const QUICK_STARTS: Record<AppKey, Array<QuickStartVideo>> = {
  [AppKey.svgAnimator]: [
    { id: "react", label: "React", hint: "Vite + React", glyph: "code", name: "quick-start-react" },
    { id: "vue", label: "Vue", hint: "Vite + Vue", glyph: "code", name: "quick-start-vue" },
    { id: "html", label: "Plain HTML", hint: "static page", glyph: "browser", name: "quick-start-html" },
    { id: "svg-astro", label: "Pre-rendered SVG (in Astro)", hint: "inlined at build", glyph: "file", name: "quick-start-svg-astro" },
    { id: "svg-iframe", label: "Pre-rendered SVG (in iframe)", hint: "no build step", glyph: "file", name: "quick-start-svg-iframe" },
  ],
  // one per popular Lottie player library
  [AppKey.animator2d]: [
    { id: "lottie-react", label: "React (lottie-react)", hint: "Lottie JSON", glyph: "code", name: "quick-start-lottie-react" },
    { id: "dotlottie-react", label: "React (dotlottie-react)", hint: ".lottie file", glyph: "code", name: "quick-start-dotlottie-react" },
    { id: "lottie-web", label: "Plain HTML (lottie-web)", hint: "static page", glyph: "browser", name: "quick-start-lottie-web" },
    { id: "dotlottie-web", label: "JavaScript (dotlottie-web)", hint: "canvas, Vite", glyph: "code", name: "quick-start-dotlottie-web" },
  ],
  [AppKey.svgEditor]: [{ id: "icon", label: "Weather icon", name: "quick-start-svg-editor" }],
};

// ── the article pages ──
/** An article page's context: its title, an optional line, where the video is listed (the way back), the docs. */
export interface VideoArticleInfo { name: string; title: string; line?: string; listedAt: { label: string; href: string }; docs?: string }
const APP_KEYS = [AppKey.svgAnimator, AppKey.animator2d, AppKey.svgEditor];
export const VIDEO_ARTICLE_INFOS: Array<VideoArticleInfo> = [
  ...LEARN_CATEGORIES.flatMap((c) => c.videos.map((v) => ({ name: v.name, title: v.title, line: v.line, docs: v.docs,
    listedAt: { label: `${LEARN.title} · ${c.title}`, href: `${LEARN.page}#${c.id}` } }))),
  ...APP_KEYS.flatMap((app) => QUICK_STARTS[app].map((v) => ({ name: v.name, title: `Quick start: ${v.label}`, line: v.hint,
    listedAt: { label: `${appInfo(app).name} · Quick start`, href: sectionHref(Slug.quickStart, app) } }))),
];
/** The article page of a video. */
export const articleHref = (name: string): string => `/new-design2/videos/${name}`;
