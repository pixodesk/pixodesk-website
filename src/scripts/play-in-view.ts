/**
 * The one way the new-design2 pages keep page animations to the screen (the site's rule: animations play only in view). Use it for
 * every new diagram, scene or effect — never a private IntersectionObserver:
 *   • `playInView(el)` (or `data-play-in-view` in the markup + `playInViewAll()`): the CSS animations inside `el` run only while any
 *     of it is on screen — `el` gets `data-in-view`, one injected rule pauses everything inside a watched element that lacks it;
 *   • `onceInView(el, play, threshold)`: a one-shot (a SMIL scene, step lights) — `play()` once when `threshold` of `el` is visible;
 *     not under reduced motion (the scene's rest state is its result).
 * Pixodesk players gate themselves (their timeline's `outOfViewAction`); this is for the page's own animations.
 */
const STYLE_ID = "play-in-view-css";
// the element, everything inside, and their ::before / ::after (a gradient text effect lives there)
const OFF = "[data-play-in-view]:not([data-in-view])";
const PAUSED_OFF_SCREEN = `${OFF}, ${OFF}::before, ${OFF}::after, ${OFF} *, ${OFF} *::before, ${OFF} *::after { animation-play-state: paused !important; }`;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let watcher: IntersectionObserver | undefined;
const watch = () => (watcher ??= new IntersectionObserver((entries) => entries.forEach((e) => e.target.toggleAttribute("data-in-view", e.isIntersecting))));

/** CSS animations inside `el` run only while it is on screen. */
export function playInView(el: Element): void {
  if (!document.getElementById(STYLE_ID)) document.head.append(Object.assign(document.createElement("style"), { id: STYLE_ID, textContent: PAUSED_OFF_SCREEN }));
  el.setAttribute("data-play-in-view", "");
  watch().observe(el);
}

/** Every `[data-play-in-view]` under `root`. */
export function playInViewAll(root: ParentNode = document): void {
  root.querySelectorAll("[data-play-in-view]").forEach(playInView);
}

/** `play()` once, when `threshold` of `el` is on screen (not under reduced motion). */
export function onceInView(el: Element, play: () => void, threshold = 0.5): void {
  if (reduced()) return;
  const seen = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    seen.disconnect();
    play();
  }, { threshold });
  seen.observe(el);
}
