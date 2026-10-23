/** What plays a saved file — one list for the app pages' "Where it plays" and the home's "How it fits together". */
export interface Link { label: string; href: string }
/** Lottie players: other people's, one per platform. */
export const LOTTIE_PLAYERS: Array<Link> = [
  { label: "lottie-web", href: "https://github.com/airbnb/lottie-web" },
  { label: "lottie-ios", href: "https://github.com/airbnb/lottie-ios" },
  { label: "lottie-android", href: "https://github.com/airbnb/lottie-android" },
  { label: "lottie-react-native", href: "https://github.com/lottie-react-native/lottie-react-native" },
  { label: "Windows Community Toolkit", href: "https://learn.microsoft.com/en-us/windows/communitytoolkit/animation" },
];
const npm = (p: string) => `https://www.npmjs.com/package/${p}`;
/** Our npm scope: a way named with it is a player package. */
export const PX_SCOPE = "@pixodesk/";
/** The SVG Animator's ways to play a file: what each is (`short`: its name in a diagram; `status`: e.g. not released yet), what it is
 *  for, where to read more. */
export interface SvgaWay { name: string; short: string; status?: string; what: string; forWhat: string; links: Array<Link> }
export const SVGA_WAYS: Array<SvgaWay> = [
  { name: "Pre-rendered SVG", short: "Pre-rendered SVG", what: "no library", forWhat: "Any web page, static site or CMS: the CSS or JS animation is inside the .svg file. Triggers still work.", links: [{ label: "On the web", href: "/docs/svga/prerendered-svg/on-the-web" }, { label: "Static sites & CMS", href: "/docs/svga/prerendered-svg/static-sites-and-cms" }] },
  { name: "@pixodesk/svg-animator-react", short: "React component", what: "React component", forWhat: "React and Next.js: one component, props for the trigger, a ref for control.", links: [{ label: "React", href: "/docs/svga/player-library/react" }, { label: "Next.js", href: "/docs/svga/player-library/nextjs" }, { label: "npm", href: npm("@pixodesk/svg-animator-react") }] },
  { name: "@pixodesk/svg-animator-vue", short: "Vue component", what: "Vue component", forWhat: "Vue 3 and Nuxt: the same component and props.", links: [{ label: "Vue", href: "/docs/svga/player-library/vue" }, { label: "Nuxt", href: "/docs/svga/player-library/nuxt" }, { label: "npm", href: npm("@pixodesk/svg-animator-vue") }] },
  { name: "@pixodesk/svg-animator-rn", short: "React Native", status: "in development", what: "React Native — in development", forWhat: "iOS and Android apps built with React Native.", links: [{ label: "Docs", href: "/docs/svga/player-library/react-native" }] },
  { name: "@pixodesk/svg-animator-web", short: "Web player", what: "the web player", forWhat: "Plain HTML (one script tag) or any framework: plays the JSON file; play, pause and seek from code.", links: [{ label: "Docs", href: "/docs/svga/player-library/web-player" }, { label: "npm", href: npm("@pixodesk/svg-animator-web") }] },
];
/** Our player packages, as ways (React, Vue, React Native, web — in this order: React first, owner 2026-10-18). */
export const pxPackageWays = (): Array<SvgaWay> => SVGA_WAYS.filter((w) => w.name.startsWith(PX_SCOPE));
/** Our player packages, full npm names (@pixodesk/svg-animator-web, …). */
export const pxPackages = (): Array<string> => pxPackageWays().map((w) => w.name);
