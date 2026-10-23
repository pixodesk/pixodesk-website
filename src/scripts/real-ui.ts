/**
 * The "In real interfaces" cards (and the hero, also a `data-rui-card` box) on /new-design2 pages: when a card nears the screen, load the web player once
 * (the published @pixodesk/svg-animator-web, copied by kf `yarn website:real-ui`) and play every box of the card.
 * Each file keeps its own trigger (start, off screen, threshold), so the site rule "play only while seen" holds as is.
 * The card's behaviour (data-rui-behaviour) adds only what the video's code does:
 *   stills  — a player held at a progress (`progress={n}` in the code)
 *   hover   — a button plays its icon forward on enter, backward on leave (the video's HoverButton)
 *   toggle  — a Pause / Resume button pair (`play={!paused}`)
 */

interface PlayerApi {
  isReady(): boolean;
  play(): void;
  pause(): void;
  setPlaybackRate(rate: number): void;
  setCurrentProgress(progress: number): void;
}
interface PlayerLibrary { createAnimator(options: { src: string; container: Element; timeline?: string }): PlayerApi }
interface Behaviour { stills?: Record<string, number>; hover?: boolean; toggle?: { player: string; pause: string; resume: string } | null }

const PLAYER_URL = "/app/real-ui/pixodesk-svg-animator.umd.min.js";
let library: Promise<PlayerLibrary> | undefined;

function loadPlayer(): Promise<PlayerLibrary> {
  library ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PLAYER_URL;
    script.onload = () => {
      const lib = (window as unknown as { PixodeskAnimator?: PlayerLibrary }).PixodeskAnimator;
      if (lib) resolve(lib); else reject(new Error("the player did not load"));
    };
    script.onerror = () => reject(new Error(`cannot load ${PLAYER_URL}`));
    document.head.appendChild(script);
  });
  return library;
}

async function whenReady(api: PlayerApi): Promise<void> {
  for (let i = 0; i < 200 && !api.isReady(); i++) await new Promise((r) => setTimeout(r, 25));
}

async function mount(card: HTMLElement): Promise<void> {
  const lib = await loadPlayer();
  const behaviour: Behaviour = JSON.parse(card.dataset.ruiBehaviour ?? "{}");
  const players = new Map<string, PlayerApi>();
  for (const box of Array.from(card.querySelectorAll<HTMLElement>("[data-rui-src]"))) {
    const api = lib.createAnimator({ src: box.dataset.ruiSrc ?? "", container: box, timeline: box.dataset.ruiTimeline });
    players.set(box.dataset.ruiPlayer ?? "", api);
  }
  for (const [name, progress] of Object.entries(behaviour.stills ?? {})) {
    const api = players.get(name);
    if (!api) continue;
    await whenReady(api);
    api.pause();
    api.setCurrentProgress(progress);
  }
  if (behaviour.hover) {
    for (const button of Array.from(card.querySelectorAll<HTMLElement>("button"))) {
      const api = players.get(button.querySelector<HTMLElement>("[data-rui-player]")?.dataset.ruiPlayer ?? "");
      if (!api) continue;
      const run = (rate: number) => { api.setPlaybackRate(rate); api.play(); };
      button.addEventListener("mouseenter", () => run(1));
      button.addEventListener("mouseleave", () => run(-1));
      button.addEventListener("focus", () => run(1));
      button.addEventListener("blur", () => run(-1));
    }
  }
  const toggle = behaviour.toggle;
  if (toggle) {
    const api = players.get(toggle.player);
    const pause = card.querySelector<HTMLElement>(toggle.pause), resume = card.querySelector<HTMLElement>(toggle.resume);
    if (api && pause && resume) {
      pause.addEventListener("click", () => { api.pause(); pause.hidden = true; resume.hidden = false; });
      resume.addEventListener("click", () => { api.play(); resume.hidden = true; pause.hidden = false; });
    }
  }
}

/**
 * Scale a card (or a whole collage, `data-rui-fit`) down as a whole when its box is narrower than its designed width.
 * `data-rui-contain`: the box has its own height (a bento tile) — scale to fit both, centred, and leave the height alone.
 */
function fit(box: HTMLElement): void {
  const inner = box.querySelector<HTMLElement>(":scope > .rui-fit-inner");
  if (!inner || box.hasAttribute("data-rui-fill")) return;
  const contain = box.hasAttribute("data-rui-contain");
  const apply = () => {
    box.setAttribute("data-rui-sized", "");
    const scale = Math.min(1, box.clientWidth / inner.offsetWidth, contain ? box.clientHeight / inner.offsetHeight : 1);
    inner.style.transform = contain ? `translate(-50%, -50%) scale(${scale})` : `translateX(-50%) scale(${scale})`;
    if (!contain) box.style.height = `${inner.offsetHeight * scale}px`;
  };
  new ResizeObserver(apply).observe(box);
  new ResizeObserver(apply).observe(inner);
  apply();
}

const mounted = new WeakSet<Element>();
const near = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting || mounted.has(e.target)) continue;
    mounted.add(e.target);
    near.unobserve(e.target);
    mount(e.target as HTMLElement).catch((err) => console.warn("[real-ui]", err));
  }
}, { rootMargin: "300px 0px" });

for (const box of Array.from(document.querySelectorAll<HTMLElement>("[data-rui-fit]"))) fit(box);
for (const card of Array.from(document.querySelectorAll<HTMLElement>("[data-rui-card]"))) {
  fit(card);
  near.observe(card);
}
