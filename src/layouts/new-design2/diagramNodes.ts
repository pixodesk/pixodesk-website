/** Nodes more than one diagram shows — one definition each (the home's "How it fits together", the SVG Animator's "Where it plays"):
 *  the animated SVG and its flavours, the Pixodesk JSON file, the browser, the places a file runs. */
import type { GlyphName } from "../new-design/glyphs";
import { FileExt, Mechanism, type Text, ext, tech } from "./home/marks";

export interface NodeBox { id: string; label: string; sub: Text; href?: string }
export interface PlaceBox extends NodeBox { glyph: GlyphName }

/** The pre-rendered SVG docs: the flavours, on the web. */
export const PRERENDERED_DOC = "/docs/svga/prerendered-svg/on-the-web";

const SVG = ext(FileExt.svg), JSON_FILE = ext(FileExt.json), CSS = tech(Mechanism.css), JS = tech(Mechanism.js);

// ── files ────────────────────────────────────────────────────────────────────────────────────────────────────────
/** The group the flavours sit in. */
export const ANIMATED_SVG: NodeBox = { id: "animated-svg", label: "Pre-rendered animated SVG", sub: [SVG, " — the animation inside the file"], href: "/docs/svga/editor/choosing-a-format" };
export const SVG_FLAVOURS: Array<NodeBox> = [
  { id: "svg-css", label: "CSS keyframes", sub: [SVG, " · pure ", tech("CSS @keyframes"), ", no JavaScript"], href: `${PRERENDERED_DOC}#flavour-1--svg--css-animation` },
  { id: "svg-triggers", label: "CSS + JS triggers", sub: [SVG, " · ", CSS, " + a few inline lines of ", JS, ": click, scroll"], href: `${PRERENDERED_DOC}#flavour-2--svg--css-animation--js-triggers` },
  { id: "svg-js", label: "JS animation", sub: [SVG, " · our player inside: ", tech("WAAPI"), " or a ", tech("frame loop")], href: `${PRERENDERED_DOC}#flavour-3--svg--js-animation` },
];
export const PX_JSON: NodeBox = { id: "px-json", label: "Pixodesk JSON", sub: [JSON_FILE, " — the source, for our player"], href: "/docs/svga/format" };

// ── what plays them ──────────────────────────────────────────────────────────────────────────────────────────────
// how a pre-rendered SVG gets into a page (owner, 2026-10-18: say HOW, not "the browser"): inline — or its own document (docs: on the web)
export const BROWSER: NodeBox = { id: "browser", label: "Inline SVG", sub: ["nothing to install: ", tech("<svg>"), " in the HTML — or ", tech("<object>"), " / ", tech("<iframe>")], href: PRERENDERED_DOC };

// ── where they run ───────────────────────────────────────────────────────────────────────────────────────────────
export enum PlaceKey { web = "web", react = "react", vue = "vue", rn = "react-native", ios = "ios", android = "android", windows = "windows", anywhere = "anywhere" }
export const PLACES: Record<PlaceKey, PlaceBox> = {
  [PlaceKey.web]: { id: PlaceKey.web, glyph: "browser", label: "HTML", sub: "any page or CMS" },
  [PlaceKey.react]: { id: PlaceKey.react, glyph: "react", label: "React", sub: "and Next.js" },
  [PlaceKey.vue]: { id: PlaceKey.vue, glyph: "vue", label: "Vue", sub: "and Nuxt" },
  [PlaceKey.rn]: { id: PlaceKey.rn, glyph: "phone", label: "React Native", sub: "and Expo" },
  [PlaceKey.ios]: { id: PlaceKey.ios, glyph: "apple", label: "iOS", sub: "native apps" },
  [PlaceKey.android]: { id: PlaceKey.android, glyph: "android", label: "Android", sub: "native apps" },
  [PlaceKey.windows]: { id: PlaceKey.windows, glyph: "windows", label: "Windows", sub: "native apps" },
  [PlaceKey.anywhere]: { id: PlaceKey.anywhere, glyph: "image", label: "Anywhere", sub: "posts, slides, email" },
};
