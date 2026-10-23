/**
 * What the home page says about each app (owner, 2026-10-17: "tell the user about the apps and send them to the page they need"):
 * its pitch, its price, its hero art, its accent colour. Names and pages come from the catalogue; prices are written once, here.
 */
import { AppKey, appInfo } from "./catalogue";
import { FileExt, Mechanism, type Text, ext, joined, tech } from "./home/marks";

/** `chips`: the files it makes (marked words: Marked.astro) */
export interface AppPitch { key: AppKey; tagline: string; line: Text; chips: Array<Text>; price: string; art: { src: string; ratio: string }; accent: string }
export const PITCHES: Array<AppPitch> = [
  { key: AppKey.svgEditor, tagline: "Static graphics", line: ["Icons, logos and illustrations, saved as clean ", ext(FileExt.svg), " files."], chips: [[ext(FileExt.svg)], joined([FileExt.png, FileExt.jpeg, FileExt.webp, FileExt.gif].map(ext), " ")], price: "Free",
    art: { src: "/assets/svg/hero/rocket.json", ratio: "2880 / 1400" }, accent: "#22d3ee" },
  { key: AppKey.svgAnimator, tagline: "Animation for the web", line: ["One pre-rendered ", ext(FileExt.svg), " that plays with no library — or the Pixodesk ", ext(FileExt.json), " for the React, Vue and HTML player."], chips: [[ext(FileExt.svg), " + ", tech(Mechanism.css), " / ", tech(Mechanism.js)], [ext(FileExt.json), " + player"]], price: "Coming soon",
    art: { src: "/assets/svga/hero/astronaut.json", ratio: "2880 / 1550" }, accent: "#a78bfa" },
  { key: AppKey.animator2d, tagline: "Lottie for apps", line: "Standard Lottie for iOS, Android, React Native, Windows and the web.", chips: [["Lottie ", ext(FileExt.json)], [ext(FileExt.lottie)]], price: "Available now",   // no figure on the home page (owner)
    art: { src: "/assets/lottie/hero/astronaut.json", ratio: "2880 / 1400" }, accent: "#f472b6" },
];
// Animator Studio = both animators in one app (owner, 2026-10-17; kf app/docs/product/app-names-and-pricing.md: everything included)
// `includes` = the apps in it (the home shows them as badges: "[2D Animator (Lottie)] and [SVG Animator] in one app"; owner, 2026-10-17)
const STUDIO_INCLUDES = [AppKey.animator2d, AppKey.svgAnimator];
const STUDIO_JOINER = "and", STUDIO_IN_ONE_APP = "in one app";
export const STUDIO = { name: "Animator Studio", page: "/new-design2/animator-studio", includes: STUDIO_INCLUDES, joiner: STUDIO_JOINER, inOneApp: STUDIO_IN_ONE_APP,
  tagline: `${STUDIO_INCLUDES.map((k) => appInfo(k).name).join(` ${STUDIO_JOINER} `)} ${STUDIO_IN_ONE_APP}`, line: "The SVG Editor, the SVG Animator and the 2D Animator (Lottie) in one studio — one timeline, every format.", price: "Coming soon", accent: "#fbbf24",
  art: { src: "/assets/studio/station.json", ratio: "2880 / 1500" } };
export const pitchOf = (key: AppKey): AppPitch => { const p = PITCHES.find((x) => x.key === key); if (!p) throw new Error(`no pitch for ${key}`); return p; };
