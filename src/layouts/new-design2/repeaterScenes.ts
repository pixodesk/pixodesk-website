/**
 * "How it works" for the repeater section (owner, 2026-10-16): four small scenes, one way each to lay copies out — in a line, in a
 * grid, in a circle, and turning + growing (the spiral the burst above uses). The original is peach, the copies lavender; they appear
 * one by one on the card's clock (SMIL, started by SchemaCards), and before playing every card shows the result.
 */
const CANVAS = "#172036", LAV = "#c4b5fd", PEACH = "#fdba74", MUTED = "rgba(255,255,255,.55)";
const f = (n: number) => String(Math.round(n * 10) / 10);
export interface SceneCard { title: string; view: [number, number, number, number]; svg: (uid: string) => string }

const panel = `<rect x="4" y="4" width="132" height="132" rx="12" fill="${CANVAS}" stroke="rgba(255,255,255,.14)"/>`;
const label = (t: string) => `<text x="70" y="124" font-size="9.5" fill="${MUTED}" text-anchor="middle">${t}</text>`;
const clock = (uid: string, total: number) => `<g><animate id="${uid}t" data-clock attributeName="opacity" values="1;1" dur="${total}s" begin="indefinite"/></g>`;
/** Hidden from the clock's start until `at` s, then shown (fill freeze); without a run the base opacity (1) shows the result. */
const appear = (uid: string, total: number, at: number) =>
  `<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(at / total).toFixed(3)};${((at + 0.12) / total).toFixed(3)};1" dur="${total}s" begin="${uid}t.begin" fill="freeze"/>`;
/** One tile (a rounded square) at x, y; the original is peach with a light edge, a copy lavender. */
const tile = (x: number, y: number, o: { rot?: number; s?: number; original?: boolean; anim?: string } = {}) =>
  `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(o.rot ?? 0)}) scale(${(o.s ?? 1).toFixed(3)})">` +
  `<rect x="-7" y="-7" width="14" height="14" rx="3.5" fill="${o.original ? PEACH : LAV}" fill-opacity="${o.original ? 1 : 0.9}"${o.original ? ' stroke="#fff" stroke-opacity=".85" stroke-width="1.2"' : ""}>${o.anim ?? ""}</rect></g>`;

const line: SceneCard = {
  title: "In a line", view: [0, 0, 140, 140],
  svg: (uid) => {
    const T = 3.2, n = 6, x0 = 22, dx = 19, y = 62;
    const tiles = Array.from({ length: n }, (_, i) => tile(x0 + i * dx, y, { original: i === 0, anim: i ? appear(uid, T, 0.35 + (i - 1) * 0.28) : "" })).join("");
    return clock(uid, T) + panel + tiles + label(`${n} copies · offset ${dx}`);
  },
};
const grid: SceneCard = {
  title: "In a grid", view: [0, 0, 140, 140],
  svg: (uid) => {
    const T = 3.2, cols = 4, rows = 3, x0 = 31, y0 = 34, d = 26;
    const tiles = Array.from({ length: cols * rows }, (_, k) => tile(x0 + (k % cols) * d, y0 + Math.floor(k / cols) * d, { original: k === 0, anim: k ? appear(uid, T, 0.3 + (k - 1) * 0.16) : "" })).join("");
    return clock(uid, T) + panel + tiles + label(`${cols} × ${rows}`);
  },
};
const circle: SceneCard = {
  title: "In a circle", view: [0, 0, 140, 140],
  svg: (uid) => {
    const T = 3.2, n = 8, c = [70, 60], r = 34;
    const tiles = Array.from({ length: n }, (_, i) => {
      const a = (i * 360) / n, rad = (a * Math.PI) / 180;
      return tile(c[0] + r * Math.sin(rad), c[1] - r * Math.cos(rad), { rot: a, original: i === 0, anim: i ? appear(uid, T, 0.3 + (i - 1) * 0.22) : "" });
    }).join("");
    return clock(uid, T) + panel + `<circle cx="${c[0]}" cy="${c[1]}" r="2.5" fill="${LAV}" fill-opacity=".6"/>` + tiles + label(`${n} copies · ${360 / n}°`);
  },
};
const spiral: SceneCard = {
  title: "Spiral", view: [0, 0, 140, 140],
  svg: (uid) => {
    // each copy turns 36° and grows 17 % about the centre — the original sits just above it
    const T = 3.6, n = 10, c = [70, 60], turn = 36, grow = 1.17, d = 12, s0 = 0.45;
    const tiles = Array.from({ length: n }, (_, i) => {
      const a = i * turn, rad = (a * Math.PI) / 180, k = Math.pow(grow, i);
      return tile(c[0] + d * k * Math.sin(rad), c[1] - d * k * Math.cos(rad), { rot: a, s: s0 * k, original: i === 0, anim: i ? appear(uid, T, 0.3 + (i - 1) * 0.22) : "" });
    }).join("");
    return clock(uid, T) + panel + tiles + label(`turn ${turn}° · grow ${Math.round((grow - 1) * 100)} %`);
  },
};
export const REPEATER_SCENES: Array<SceneCard> = [line, grid, circle, spiral];
