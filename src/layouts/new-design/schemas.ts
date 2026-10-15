// Mechanism schematics: a small scene (inline SVG, viewBox 520×190) that ACTS OUT how a feature is used in the app —
// cursor, handles, panels, timeline — plus numbered steps with the real controls, shown as HTML under it (Schema.astro).
// All motion runs on one clock per scene (`<uid>t`, SMIL, started by script when the scene scrolls into view or on
// Replay). Every track ends on the element's own attributes, so a scene that never plays shows the RESULT.
// Review: feature-sections-review.2026-10-15.md (website root).
export type SchemaKind =
  | "shapeBuilder" | "editColors" | "gradient" | "vectorText" | "textPath" | "autoAnimate" | "easing"
  | "patternMarkerSpray" | "patternMarkerSprayAnimated" | "repeater" | "iconMotion" | "iconMotionLottie" | "splash"
  | "createAnimateExport";

/** One numbered step under the scene (HTML: `<b>` for UI names, `<kbd>` for keys), lit from `at` seconds until the next one. */
export interface SchemaStep { at: number; text: string }
export interface SchemaDef { total: number; steps: Array<SchemaStep>; svg: (uid: string) => string }

export const SCENE_W = 520, SCENE_H = 190;
const CYAN = "#67e8f9", VIOLET = "#c4b5fd", ORANGE = "#fdba74", PINK = "#f9a8d4", NAVY = "#1e1b4b";
const CANVAS = "#172036", INK = "#0b1220", LINE = "rgba(255,255,255,.45)", MUTED = "rgba(255,255,255,.6)";
const f = (n: number) => String(Math.round(n * 10) / 10);

// ── one clock per scene ──────────────────────────────────────────────────────────────────────────────────────────
type Val = string | number;
/** [time s, value, easing of the segment that ENDS at this key] */
type Key = [number, Val, string?];
const EASE: Record<string, string> = {
  lin: "0 0 1 1", io: "0.45 0 0.55 1", in: "0.5 0 0.9 0.6", out: "0.1 0.4 0.5 1",
  fall: "0.33 0 0.67 0.33", rise: "0.33 0.67 0.67 1",
};
interface Story {
  clock: string;
  /** `<animate>` of one attribute */
  a: (attr: string, keys: Array<Key>) => string;
  /** `<animateTransform>` (translate "x y", rotate "deg cx cy", scale "sx sy") of `transform` — or `patternTransform` */
  t: (type: "translate" | "rotate" | "scale", keys: Array<Key>, attr?: string) => string;
  /** fade in at `from`, out at `to` (both optional) — the element's base opacity is its state at rest */
  show: (from?: number, to?: number, ms?: number) => string;
}
function story(uid: string, total: number): Story {
  const attrs = (keys: Array<Key>) => {
    const k: Array<Key> = [...keys].sort((x, y) => x[0] - y[0]);
    if (k[0][0] > 0) k.unshift([0, k[0][1]]);
    if (k[k.length - 1][0] < total) k.push([total, k[k.length - 1][1]]);
    const times = k.map((x) => Math.min(1, Math.max(0, x[0] / total)).toFixed(4));
    const splines = k.slice(1).map((x) => EASE[x[2] ?? "io"] ?? x[2]);
    return `begin="${uid}t.begin" dur="${total}s" fill="freeze" calcMode="spline" values="${k.map((x) => x[1]).join(";")}" keyTimes="${times.join(";")}" keySplines="${splines.join(";")}"`;
  };
  return {
    clock: `<g><animate id="${uid}t" data-clock attributeName="opacity" values="1;1" dur="${total}s" begin="indefinite"/></g>`,
    a: (attr, keys) => `<animate attributeName="${attr}" ${attrs(keys)}/>`,
    t: (type, keys, attr = "transform") => `<animateTransform attributeName="${attr}" type="${type}" ${attrs(keys)}/>`,
    show: (from, to, ms = 0.25) => {
      const k: Array<Key> = [];
      if (from !== undefined) k.push([Math.max(0, from - ms), 0], [from, 1]); else k.push([0, 1]);
      if (to !== undefined) k.push([to, 1], [to + ms, 0]);
      return `<animate attributeName="opacity" ${attrs(k)}/>`;
    },
  };
}

// ── furniture ────────────────────────────────────────────────────────────────────────────────────────────────────
const canvas = (x: number, y: number, w: number, h: number) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${CANVAS}" stroke="rgba(255,255,255,.14)"/>`;
const text = (x: number, y: number, t: string, o: { size?: number; color?: string; anchor?: string; weight?: number; extra?: string } = {}) =>
  `<text x="${f(x)}" y="${f(y)}" font-size="${o.size ?? 12}" fill="${o.color ?? "currentColor"}" text-anchor="${o.anchor ?? "middle"}"${o.weight ? ` font-weight="${o.weight}"` : ""}${o.extra ?? ""}>${t}</text>`;
/** A small rounded label; `inner` = animations for the whole chip */
const chip = (x: number, y: number, w: number, t: string, inner = "", o: { fill?: string; color?: string; opacity?: number } = {}) =>
  `<g opacity="${o.opacity ?? 1}">${inner}<rect x="${f(x)}" y="${f(y)}" width="${w}" height="20" rx="6" fill="${o.fill ?? "rgba(255,255,255,.08)"}" stroke="rgba(255,255,255,.22)"/>${text(x + w / 2, y + 14, t, { size: 11.5, color: o.color })}</g>`;
/** Key caps shown around `t` and pressed at `t` */
function keys(S: Story, x: number, y: number, labels: Array<string>, t: number): string {
  let cx = x;
  const caps = labels.map((l) => {
    const w = Math.max(22, l.length * 7.5 + 12);
    const cap = `<g><rect x="${cx}" y="${y}" width="${w}" height="22" rx="5" fill="#e2e8f0" stroke="#94a3b8"/>${text(cx + w / 2, y + 15.5, l, { size: 12, color: INK, weight: 600 })}${S.t("translate", [[t - 0.05, "0 0"], [t, "0 2"], [t + 0.25, "0 0"]])}</g>`;
    cx += w + 4;
    return cap;
  }).join("");
  return `<g opacity="0">${S.show(t - 0.4, t + 0.9)}${caps}</g>`;
}
const CURSOR = `<path d="M0 0V17l4.6-4.2 3 6.6 2.8-1.2-3-6.4h6.2z" fill="#fff" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
/** The pointer: [time, x, y] waypoints (segments ease in-out); visible while it moves */
function cursor(S: Story, pts: Array<[number, number, number]>): string {
  const first = pts[0], last = pts[pts.length - 1];
  return `<g opacity="0">${S.show(first[0] + 0.15, last[0] - 0.1)}<g transform="translate(${last[1]} ${last[2]})">${S.t("translate", pts.map(([t, x, y]) => [t, `${x} ${y}`]))}${CURSOR}</g></g>`;
}
/** A click ripple at x,y at time t */
const ripple = (S: Story, x: number, y: number, t: number) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="4" fill="none" stroke="#fff" stroke-width="1.5" opacity="0">${S.a("r", [[t, 4], [t + 0.4, 15, "out"]])}${S.a("opacity", [[t - 0.01, 0], [t, 0.9], [t + 0.4, 0]])}</circle>`;
const diamond = (x: number, y: number, r: number, fill: string) => `<path d="M${f(x)} ${f(y - r)}l${r} ${r}-${r} ${r}-${r}-${r}z" fill="${fill}"/>`;
/** Pops in (scale from 0) at `t`, around x,y */
const pop = (S: Story, x: number, y: number, t: number, inner: string) =>
  `<g transform="translate(${f(x)} ${f(y)})"><g>${S.t("scale", [[t - 0.01, "0 0"], [t + 0.2, "1.25 1.25", "out"], [t + 0.35, "1 1"]])}<g transform="translate(${f(-x)} ${f(-y)})">${inner}</g></g></g>`;
const arrowRight = (x: number, y: number, len = 20) => `<path d="M${x} ${y}h${len}m-6-6 6 6-6 6" fill="none" stroke="${LINE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

// ── geometry ─────────────────────────────────────────────────────────────────────────────────────────────────────
type P = [number, number];
interface Circle { c: P; r: number }
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const inside = (p: P, k: Circle) => dist(p, k.c) < k.r - 0.01;
function meet(a: Circle, b: Circle): [P, P] {
  const d = dist(a.c, b.c), l = (a.r * a.r - b.r * b.r + d * d) / (2 * d), h = Math.sqrt(a.r * a.r - l * l);
  const ux = (b.c[0] - a.c[0]) / d, uy = (b.c[1] - a.c[1]) / d, mx = a.c[0] + ux * l, my = a.c[1] + uy * l;
  return [[mx - uy * h, my + ux * h], [mx + uy * h, my - ux * h]];
}
/** SVG arc from p to q along circle k — the way round whose midpoint passes `ok` */
function arc(k: Circle, p: P, q: P, ok: (m: P) => boolean): string {
  const a0 = Math.atan2(p[1] - k.c[1], p[0] - k.c[0]), a1 = Math.atan2(q[1] - k.c[1], q[0] - k.c[0]);
  for (const sweep of [1, 0]) {
    let d = sweep ? a1 - a0 : a0 - a1;
    while (d <= 0) d += 2 * Math.PI;
    const mid = a0 + (sweep ? d / 2 : -d / 2);
    if (ok([k.c[0] + k.r * Math.cos(mid), k.c[1] + k.r * Math.sin(mid)])) return `A${k.r} ${k.r} 0 ${d > Math.PI ? 1 : 0} ${sweep} ${f(q[0])} ${f(q[1])}`;
  }
  throw new Error("arc: no side passes");
}
/** Point on a cubic bezier */
const bz = (p: Array<P>, t: number): P => {
  const u = 1 - t;
  return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]];
};
/** Deterministic pseudo-random numbers (the same scatter on every build) */
function rnd(seed: number) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

// ── the scenes ───────────────────────────────────────────────────────────────────────────────────────────────────
function shapeBuilder(): SchemaDef {
  const total = 7;
  const A: Circle = { c: [152, 86], r: 40 }, B: Circle = { c: [200, 86], r: 40 }, C: Circle = { c: [176, 127], r: 40 };
  const pair = (x: Circle, y: Circle, z: Circle) => { const [p, q] = meet(x, y); return inside(p, z) ? { in: p, out: q } : { in: q, out: p }; };
  const AB = pair(A, B, C), BC = pair(B, C, A), CA = pair(C, A, B);
  const pts = (x: Circle, y: Circle) => (x === A && y === B) || (x === B && y === A) ? AB : (x === B && y === C) || (x === C && y === B) ? BC : CA;
  const M = (p: P) => `M${f(p[0])} ${f(p[1])}`;
  const only = (x: Circle, y: Circle, z: Circle) => M(pts(x, y).out) + arc(x, pts(x, y).out, pts(z, x).out, (m) => !inside(m, y) && !inside(m, z)) + arc(z, pts(z, x).out, pts(y, z).in, (m) => inside(m, x) && !inside(m, y)) + arc(y, pts(y, z).in, pts(x, y).out, (m) => inside(m, x) && !inside(m, z)) + "Z";
  const two = (x: Circle, y: Circle, z: Circle) => M(pts(x, y).out) + arc(x, pts(x, y).out, pts(z, x).in, (m) => inside(m, y) && !inside(m, z)) + arc(z, pts(z, x).in, pts(y, z).in, (m) => inside(m, x) && inside(m, y)) + arc(y, pts(y, z).in, pts(x, y).out, (m) => inside(m, x) && !inside(m, z)) + "Z";
  const centre = M(AB.in) + arc(B, AB.in, BC.in, (m) => inside(m, A) && inside(m, C)) + arc(C, BC.in, CA.in, (m) => inside(m, A) && inside(m, B)) + arc(A, CA.in, AB.in, (m) => inside(m, B) && inside(m, C)) + "Z";
  const regions = [only(A, B, C), only(B, C, A), only(C, A, B), two(A, B, C), two(B, C, A), two(C, A, B), centre];
  // the picked regions: A only, A∩B, B only = (A ∪ B) − C as one outline
  const picked = M(AB.out) + arc(A, AB.out, CA.out, (m) => !inside(m, B) && !inside(m, C)) + arc(C, CA.out, BC.out, (m) => inside(m, A) || inside(m, B)) + arc(B, BC.out, AB.out, (m) => !inside(m, A) && !inside(m, C)) + "Z";
  const centroid = (k: Circle, away: P): P => { const dx = k.c[0] - away[0], dy = k.c[1] - away[1], l = Math.hypot(dx, dy); return [k.c[0] + dx / l * 20, k.c[1] + dy / l * 20]; };
  const G: P = [(A.c[0] + B.c[0] + C.c[0]) / 3, (A.c[1] + B.c[1] + C.c[1]) / 3];
  const pA = centroid(A, G), pB = centroid(B, G), pAB: P = [(A.c[0] + B.c[0]) / 2, AB.out[1] + 9];
  const clicks: Array<[P, number]> = [[pA, 1.6], [pAB, 2.0], [pB, 2.4]];
  const MOVE = 216;
  return {
    total,
    steps: [
      { at: 0, text: "Select the shapes, press <kbd>B</kbd>: a mesh splits every overlap into regions" },
      { at: 1.4, text: "Click the regions you want — or drag across several" },
      { at: 3.0, text: "<b>+ Add</b>: they become one new shape; the originals stay" },
      { at: 4.3, text: "<b>− Remove</b>: click a region to cut it out of the originals" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const fills = [[A, CYAN], [B, VIOLET], [C, ORANGE]] as const;
      const shapes = fills.map(([k, c]) => `<circle cx="${k.c[0]}" cy="${k.c[1]}" r="${k.r}" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="1.5"/>`).join("");
      const mesh = `<g opacity="0">${S.show(1.0, 5.9)}${regions.map((d) => `<path d="${d}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-dasharray="3 3"/>`).join("")}</g>`;
      const picks = [regions[0], regions[3], regions[1]].map((d, i) => `<path d="${d}" fill="${CYAN}" opacity="0">${S.a("opacity", [[clicks[i][1] + 0.05, 0], [clicks[i][1] + 0.2, 0.85], [3.05, 0.85], [3.3, 0]])}</path>`).join("");
      const hole = `<path d="${centre}" fill="${CANVAS}" stroke="#fff" stroke-opacity=".5" stroke-dasharray="3 3">${S.a("opacity", [[5.0, 0], [5.2, 1]])}</path>`;
      const result = `<g transform="translate(${MOVE} 0)">${S.t("translate", [[3.0, "0 0"], [3.8, `${MOVE} 0`]])}<path d="${picked}" fill="${CYAN}" stroke="#fff" stroke-width="1.5">${S.a("opacity", [[2.95, 0], [3.05, 1]])}</path></g>`;
      const tools = chip(24, 20, 50, "+ Add", `<rect x="24" y="20" width="50" height="20" rx="6" fill="${CYAN}" opacity="0">${S.a("opacity", [[1.3, 0], [1.45, 0.35], [4.2, 0.35], [4.3, 0]])}</rect>`, { opacity: 1 }) +
        chip(80, 20, 64, "− Remove", `<rect x="80" y="20" width="64" height="20" rx="6" fill="${PINK}" opacity="0">${S.a("opacity", [[4.3, 0], [4.45, 0.35], [5.8, 0.35], [5.9, 0]])}</rect>`);
      const ptr = cursor(S, [[0.6, 300, 176], [1.5, pA[0], pA[1]], [2.0, pAB[0], pAB[1]], [2.4, pB[0], pB[1]], [2.85, 49, 30], [3.3, 49, 30], [4.25, 112, 30], [4.9, G[0], G[1]], [5.6, 300, 176]]);
      const labels = `<g>${S.show(3.9)}${text(MOVE + 176, 178, "new shape", { size: 12, color: MUTED })}</g><g>${S.show(5.3)}${text(176, 182, "cut out of the originals", { size: 12, color: MUTED })}</g>`;
      return S.clock + canvas(10, 10, 500, 176) + tools + shapes + picks + hole + mesh + result + arrowRight(262, 100, 30) + labels +
        keys(S, 160, 20, ["B"], 0.7) + clicks.map(([p, t]) => ripple(S, p[0], p[1], t)).join("") + ripple(S, 49, 30, 3.0) + ripple(S, 112, 30, 4.4) + ripple(S, G[0], G[1], 5.0) + ptr;
    },
  };
}

function editColors(): SchemaDef {
  const total = 6.6, T = 3.1;
  const swap = (S: Story, attr: string) => S.a(attr, [[T, CYAN], [T + 0.5, ORANGE]]);
  const hue = (h: number, r: number): P => [420 + r * Math.cos((h - 90) * Math.PI / 180), 92 + r * Math.sin((h - 90) * Math.PI / 180)];
  return {
    total,
    steps: [
      { at: 0, text: "<b>Used Colors</b> lists every colour in the document" },
      { at: 1.2, text: "With nothing selected, click a swatch" },
      { at: 2.4, text: "Pick the new colour on the wheel, or type a HEX" },
      { at: T, text: "Every fill, stroke and gradient stop using it changes at once" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const sky = `<defs><linearGradient id="${uid}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ORANGE}">${swap(S, "stop-color")}</stop><stop offset="1" stop-color="${NAVY}"/></linearGradient></defs>`;
      const drawing = `<rect x="26" y="22" width="276" height="104" rx="8" fill="url(#${uid}sky)"/>
<circle cx="236" cy="56" r="15" fill="${ORANGE}">${swap(S, "fill")}</circle>
<path d="M26 126C80 84 130 104 170 96S250 82 302 98V126H26Z" fill="#7c6fd6"/>
<path d="M40 116C80 108 116 122 156 113S236 106 288 117" fill="none" stroke="${ORANGE}" stroke-width="3.5" stroke-linecap="round">${swap(S, "stroke")}</path>`;
      const sw = [ORANGE, "#7c6fd6", NAVY, "#ffffff", "#94a3b8"];
      const swatches = text(30, 154, "Used Colors", { size: 11.5, color: MUTED, anchor: "start" }) + sw.map((c, i) => `<rect x="${104 + i * 28}" y="141" width="22" height="22" rx="5" fill="${c}" stroke="rgba(255,255,255,.3)">${i === 0 ? swap(S, "fill") : ""}</rect>`).join("") +
        `<rect x="101" y="138" width="28" height="28" rx="7" fill="none" stroke="#fff" stroke-width="2">${S.a("opacity", [[1.2, 0], [1.3, 1]])}</rect>`;
      const ring = Array.from({ length: 12 }, (_, i) => { const a = i * 30, p0 = hue(a, 44), p1 = hue(a + 30, 44); return `<path d="M${f(p0[0])} ${f(p0[1])}A44 44 0 0 1 ${f(p1[0])} ${f(p1[1])}" stroke="hsl(${a + 15} 90% 65%)" stroke-width="14" fill="none"/>`; }).join("");
      const pc = hue(187, 44), po = hue(32, 44);
      const popup = `<g opacity="1">${S.show(1.45)}<rect x="334" y="14" width="172" height="164" rx="10" fill="#0f172a" stroke="rgba(255,255,255,.2)"/>${text(420, 34, "Edit Color", { size: 12, color: MUTED })}${ring}
<circle cx="${f(po[0])}" cy="${f(po[1])}" r="7" fill="none" stroke="#fff" stroke-width="2.5">${S.a("cx", [[2.5, f(pc[0])], [3.0, f(po[0])]])}${S.a("cy", [[2.5, f(pc[1])], [3.0, f(po[1])]])}</circle>
<circle cx="420" cy="92" r="20" fill="${ORANGE}">${swap(S, "fill")}</circle><g opacity="0">${S.a("opacity", [[T - 0.01, 1], [T, 0]])}${text(420, 166, "#67E8F9", { size: 11.5, color: MUTED, extra: ' font-family="ui-monospace,monospace"' })}</g><g>${S.a("opacity", [[T - 0.01, 0], [T, 1]])}${text(420, 166, "#FDBA74", { size: 11.5, color: MUTED, extra: ' font-family="ui-monospace,monospace"' })}</g></g>`;
      const links = `<g opacity="0">${S.show(1.6, 4.0)}${[[236, 72], [156, 112], [150, 30]].map(([x, y]) => `<path d="M115 141L${x} ${y}" stroke="#fff" stroke-opacity=".7" stroke-dasharray="3 3" fill="none"/>`).join("")}</g>`;
      const tags = `<g opacity="1">${S.show(T + 0.6)}${chip(250, 42, 40, "fill")}${chip(176, 100, 50, "stroke")}${chip(40, 28, 92, "gradient stop")}</g>`;
      const ptr = cursor(S, [[0.5, 300, 182], [1.1, 115, 152], [1.8, 230, 170], [2.5, pc[0], pc[1]], [3.0, po[0], po[1]], [3.9, 470, 182]]);
      return S.clock + sky + canvas(10, 10, 308, 176) + drawing + swatches + links + tags + popup + ripple(S, 115, 152, 1.2) + ripple(S, po[0], po[1], 3.0) + ptr;
    },
  };
}

function gradient(): SchemaDef {
  const total = 6.6;
  const c: P = [150, 100], focal: P = [128, 78];
  return {
    total,
    steps: [
      { at: 0, text: "Fill tab: <b>Linear</b> or <b>Radial</b> gradient" },
      { at: 1.4, text: "Press <kbd>G</kbd> and drag the handles on the canvas" },
      { at: 2.0, text: "Move the focal point: the light moves with it" },
      { at: 4.0, text: "A stop with alpha fades out: soft shadows, glass" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const defs = `<defs><radialGradient id="${uid}b" gradientUnits="userSpaceOnUse" cx="${c[0]}" cy="${c[1]}" r="62" fx="${focal[0]}" fy="${focal[1]}">${S.a("fx", [[2.0, c[0]], [3.0, focal[0]]])}${S.a("fy", [[2.0, c[1]], [3.0, focal[1]]])}<stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${CYAN}"/><stop offset="1" stop-color="#1d4ed8"/></radialGradient>
<radialGradient id="${uid}s"><stop offset="0" stop-color="#000" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="${uid}bar"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${CYAN}"/><stop offset="1" stop-color="#1d4ed8"/></linearGradient>
<linearGradient id="${uid}alpha"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<pattern id="${uid}chk" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#cbd5e1"/><rect width="4" height="4" fill="#94a3b8"/><rect x="4" y="4" width="4" height="4" fill="#94a3b8"/></pattern></defs>`;
      const tabs = ["Solid", "Linear", "Radial"].map((t, i) => chip(24 + i * 52, 20, 48, t, i === 2 ? `<rect x="${24 + i * 52}" y="20" width="48" height="20" rx="6" fill="${CYAN}" opacity=".35">${S.a("opacity", [[0.55, 0], [0.7, 0.35]])}</rect>` : "")).join("");
      const ball = `<ellipse cx="${c[0]}" cy="170" rx="50" ry="8" fill="url(#${uid}s)">${S.a("opacity", [[4.0, 0], [4.8, 1]])}</ellipse>
<circle cx="${c[0]}" cy="${c[1]}" r="52" fill="url(#${uid}b)">${S.a("opacity", [[0.6, 0], [1.0, 1]])}</circle>
<circle cx="${c[0]}" cy="${c[1]}" r="52" fill="${CYAN}" opacity="0">${S.a("opacity", [[0, 1], [0.6, 1], [1.0, 0]])}</circle>`;
      const handles = `<g opacity="0">${S.show(1.5, 3.6)}<path d="M${c[0]} ${c[1]}H${c[0] + 62}" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 3"/><rect x="${c[0] + 58}" y="${c[1] - 4}" width="8" height="8" fill="#fff" stroke="${INK}"/><circle cx="${c[0]}" cy="${c[1]}" r="5" fill="none" stroke="#fff" stroke-width="2"/>
<circle cx="${focal[0]}" cy="${focal[1]}" r="5" fill="#fff" stroke="${INK}">${S.a("cx", [[2.0, c[0]], [3.0, focal[0]]])}${S.a("cy", [[2.0, c[1]], [3.0, focal[1]]])}</circle></g>`;
      const strip = `${text(338, 40, "Stops", { size: 11.5, color: MUTED, anchor: "start" })}<rect x="338" y="48" width="160" height="14" rx="3" fill="url(#${uid}bar)"/>${[338, 394, 498].map((x) => `<path d="M${x} 64l5 8h-10z" fill="#fff"/>`).join("")}
<g opacity="1">${S.show(4.0)}${text(338, 104, "Shadow — last stop alpha 0", { size: 11.5, color: MUTED, anchor: "start" })}<rect x="338" y="112" width="160" height="14" rx="3" fill="url(#${uid}chk)"/><rect x="338" y="112" width="160" height="14" rx="3" fill="url(#${uid}alpha)"/>${[338, 498].map((x) => `<path d="M${x} 128l5 8h-10z" fill="#fff"/>`).join("")}</g>`;
      const tag = `<g opacity="0">${S.show(3.0, 3.9)}${chip(36, 60, 82, "focal point")}</g>`;
      const ptr = cursor(S, [[0.2, 300, 182], [0.6, 128, 30], [1.8, c[0], c[1]], [3.0, focal[0], focal[1]], [3.8, 260, 170], [4.6, 470, 140], [5.4, 470, 182]]);
      return S.clock + defs + canvas(10, 10, 314, 176) + tabs + ball + handles + tag + strip + keys(S, 270, 20, ["G"], 1.4) + ripple(S, 128, 30, 0.6) + ripple(S, c[0], c[1], 2.0) + ptr;
    },
  };
}

function vectorText(): SchemaDef {
  const total = 7;
  const word = "Pixodesk", cw = 17.4;
  const A = "M378 164L418 56H438L478 164H456L448 140H408L400 164ZM414 122H442L428 82Z";
  const nodes: Array<P> = [[378, 164], [418, 56], [438, 56], [478, 164], [456, 164], [448, 140], [408, 140], [400, 164], [414, 122], [442, 122], [428, 82]];
  return {
    total,
    steps: [
      { at: 0.2, text: "Import your TTF: <b>File › Import Font Files</b>" },
      { at: 1.0, text: "<kbd>Shift</kbd> <kbd>T</kbd>, click on the canvas and type" },
      { at: 2.6, text: "Select the text and a path: <b>Put Text on Path</b>" },
      { at: 4.6, text: "<b>Text to Bezier Shape</b>: every letter becomes a path" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const mono = ' font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-weight="700"';
      const wave = "M30 120C90 60 150 160 210 104S300 70 330 96";
      const ttf = `<g>${S.t("translate", [[0.2, "-60 0"], [0.7, "0 0", "out"]])}${S.a("opacity", [[0.15, 0], [0.4, 1]])}<rect x="24" y="20" width="84" height="22" rx="6" fill="rgba(255,255,255,.08)" stroke="${VIOLET}"/>${text(66, 35, "Brand.ttf", { size: 12, color: VIOLET })}</g>`;
      const typed = `<g>${S.a("opacity", [[3.2, 1], [3.6, 0]])}<text x="50" y="84" font-size="29"${mono} fill="${CYAN}">${[...word].map((ch, i) => `<tspan fill-opacity="0">${S.a("fill-opacity", [[1.3 + i * 0.12, 0], [1.34 + i * 0.12, 1]])}${ch}</tspan>`).join("")}</text>
<rect x="50" y="62" width="2" height="28" fill="#fff" opacity="0">${S.a("x", [[1.3, 50], [1.3 + word.length * 0.12, 50 + word.length * cw]])}${S.a("opacity", [[1.2, 0], [1.25, 1], [2.4, 1], [2.45, 0]])}</rect></g>`;
      const path = `<path d="${wave}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="300;0" keyTimes="0;1" begin="${uid}t.begin+2.6s" dur="0.5s" fill="freeze"/>${S.a("opacity", [[2.55, 0], [2.6, 1]])}</path>`;
      const onPath = `<path id="${uid}w" d="${wave}" fill="none"/><text font-size="29"${mono} fill="${CYAN}" opacity="1">${S.a("opacity", [[3.4, 0], [3.8, 1]])}<textPath href="#${uid}w" startOffset="9%">${word}</textPath></text>`;
      const glyph = `<g opacity="1">${S.show(4.3)}<path d="${A}" fill="${CYAN}" fill-opacity=".12" fill-rule="evenodd" stroke="${CYAN}" stroke-width="2">${S.a("fill-opacity", [[4.8, 1], [5.4, 0.12]])}</path>${nodes.map((p, i) => `<rect x="${p[0] - 3.5}" y="${p[1] - 3.5}" width="7" height="7" fill="#fff" stroke="${INK}">${S.a("opacity", [[5.2 + i * 0.05, 0], [5.25 + i * 0.05, 1]])}</rect>`).join("")}${text(431, 181, "one letter, now a path", { size: 11.5, color: MUTED })}</g>`;
      const cmd = `<g opacity="0">${S.show(3.0, 3.9)}${chip(210, 140, 116, "Put Text on Path")}</g><g opacity="0">${S.show(4.6, 5.8)}${chip(370, 20, 128, "Text to Bezier Shape")}</g>`;
      return S.clock + canvas(10, 10, 336, 176) + canvas(352, 10, 158, 176) + ttf + typed + path + onPath + glyph + cmd + keys(S, 240, 20, ["Shift", "T"], 1.0);
    },
  };
}

function textPath(): SchemaDef {
  const total = 6.6;
  const x0 = 120, x1 = 470;
  return {
    total,
    steps: [
      { at: 0, text: "Put the text on a path — a line, a wave or a circle" },
      { at: 0.5, text: "Keyframe <b>Offset</b> at 0, move the playhead, set 45 %" },
      { at: 2.4, text: "Play: the text travels along the curve" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const wave = "M24 90C100 20 180 130 260 72S420 30 498 80";
      const words = `<path id="${uid}w" d="${wave}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-dasharray="4 4"/><text font-size="19" font-weight="700" fill="${CYAN}"><textPath href="#${uid}w" startOffset="45%">${S.a("startOffset", [[1.75, "2%"], [1.8, "45%", "lin"], [2.35, "45%"], [2.4, "2%", "lin"], [4.1, "45%"]])}animated text on a path</textPath></text>`;
      const ruler = [0, 0.5, 1, 1.5].map((s, i) => { const x = x0 + i * (x1 - x0) / 3; return `<path d="M${f(x)} 128v6" stroke="${LINE}"/>${text(x, 124, `${s} s`, { size: 10.5, color: MUTED })}`; }).join("");
      const row = `${text(26, 160, "Offset", { size: 12, anchor: "start" })}<path d="M${x0} 156H${x1}" stroke="rgba(255,255,255,.2)"/>`;
      const field = `<g opacity="1">${S.show(1.8)}<rect x="64" y="166" width="44" height="18" rx="4" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.25)"/>${text(86, 179, "45 %", { size: 11.5 })}</g>`;
      const kf = pop(S, x0, 156, 0.5, diamond(x0, 156, 7, VIOLET)) + pop(S, x1, 156, 1.8, diamond(x1, 156, 7, VIOLET));
      const head = `<g transform="translate(${x1} 0)">${S.t("translate", [[1.0, `${x0} 0`], [1.3, `${x1} 0`], [2.35, `${x1} 0`], [2.4, `${x0} 0`, "lin"], [4.1, `${x1} 0`, "lin"]])}<path d="M0 132V182" stroke="${ORANGE}" stroke-width="2"/><path d="M-6 128h12l-6 7z" fill="${ORANGE}"/></g>`;
      const ptr = cursor(S, [[0.9, 300, 186], [1.5, 86, 175], [2.1, 200, 186]]);
      return S.clock + canvas(10, 10, 500, 104) + words + ruler + row + kf + head + field + ripple(S, 86, 175, 1.6) + ptr;
    },
  };
}

function autoAnimate(): SchemaDef {
  const total = 7.6;
  const x0 = 120, x1 = 440;
  const curve: Array<P> = [[80, 70], [150, 14], [260, 16], [330, 62]];
  const samples = [0, 0.25, 0.5, 0.75, 1].map((t) => bz(curve, t));
  const drag: Array<Key> = samples.map((p, i) => [1.7 + i * 0.22, `${f(p[0])} ${f(p[1])}`, "lin"]);
  const play: Array<Key> = samples.map((p, i) => [5.0 + i * 0.4, `${f(p[0])} ${f(p[1])}`, "lin"]);
  return {
    total,
    steps: [
      { at: 0.4, text: "<kbd>Alt</kbd> <kbd>A</kbd> pins the state at the playhead" },
      { at: 1.1, text: "Move the playhead — it jumps one second ahead" },
      { at: 1.6, text: "Move, resize, recolour: a keyframe for each change" },
      { at: 4.9, text: "Play: the motion path and the timing are already there" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const path = `<path d="M${curve[0].join(" ")}C${curve[1].join(" ")} ${curve[2].join(" ")} ${curve[3].join(" ")}" fill="none" stroke="${CYAN}" stroke-opacity=".7" stroke-dasharray="4 4" opacity="1">${S.a("opacity", [[1.65, 0], [1.75, 1]])}</path>`;
      const ball = `<g transform="translate(${curve[3].join(" ")})">${S.t("translate", [[1.7, `${curve[0].join(" ")}`], ...drag, [4.9, `${curve[3].join(" ")}`], [4.95, `${curve[0].join(" ")}`, "lin"], ...play])}<circle r="18" fill="${ORANGE}">${S.a("r", [[3.2, 12], [3.6, 18], [4.9, 18], [4.95, 12, "lin"], [6.6, 18, "lin"]])}${S.a("fill", [[4.0, CYAN], [4.2, ORANGE], [4.9, ORANGE], [4.95, CYAN, "lin"], [6.6, ORANGE, "lin"]])}</circle></g>`;
      const sel = `<g opacity="0">${S.show(3.0, 3.85, 0.15)}<rect x="318" y="50" width="24" height="24" fill="none" stroke="#fff" stroke-dasharray="3 2">${S.a("x", [[3.2, 318], [3.6, 312]])}${S.a("y", [[3.2, 50], [3.6, 44]])}${S.a("width", [[3.2, 24], [3.6, 36]])}${S.a("height", [[3.2, 24], [3.6, 36]])}</rect><rect x="339" y="71" width="6" height="6" fill="#fff">${S.a("x", [[3.2, 339], [3.6, 345]])}${S.a("y", [[3.2, 71], [3.6, 77]])}</rect></g>`;
      const sw = `${[CYAN, ORANGE, PINK].map((c, i) => `<rect x="${430 + i * 24}" y="20" width="18" height="18" rx="4" fill="${c}" stroke="rgba(255,255,255,.3)"/>`).join("")}`;
      const ruler = [0, 0.5, 1].map((s, i) => { const x = x0 + i * (x1 - x0) / 2; return `<path d="M${x} 128v5" stroke="${LINE}"/>${text(x, 125, `${s} s`, { size: 10.5, color: MUTED })}`; }).join("");
      const rows = ["Position", "Scale", "Fill"].map((r, i) => `${text(26, 150 + i * 16, r, { size: 11.5, anchor: "start" })}<path d="M${x0} ${146 + i * 16}H${x1}" stroke="rgba(255,255,255,.14)"/>`).join("");
      const kf = [[2.75, 0], [3.7, 1], [4.3, 2]].map(([t, row]) => pop(S, x0, 146 + row * 16, t, diamond(x0, 146 + row * 16, 5.5, VIOLET)) + pop(S, x1, 146 + row * 16, t + 0.08, diamond(x1, 146 + row * 16, 5.5, VIOLET))).join("");
      const pin = `<g opacity="1">${S.a("opacity", [[0.65, 0], [0.75, 1]])}<path d="M${x0} 118v-12" stroke="${VIOLET}" stroke-width="2"/><circle cx="${x0}" cy="104" r="4" fill="${VIOLET}"/></g>`;
      const head = `<g transform="translate(${x1} 0)">${S.t("translate", [[1.1, `${x0} 0`], [1.35, `${x1} 0`, "out"], [4.9, `${x1} 0`], [4.95, `${x0} 0`, "lin"], [6.6, `${x1} 0`, "lin"]])}<path d="M0 130V186" stroke="${ORANGE}" stroke-width="2"/><path d="M-6 128h12l-6 7z" fill="${ORANGE}"/></g>`;
      const ptr = cursor(S, [[1.2, 200, 100], [1.6, 82, 72], ...samples.map((p, i): [number, number, number] => [1.7 + i * 0.22, p[0] + 2, p[1] + 2]), [3.15, 342, 74], [3.6, 348, 80], [3.95, 457, 29], [4.6, 470, 100]]);
      return S.clock + canvas(10, 10, 500, 100) + sw + path + ball + sel + ruler + rows + kf + pin + head + keys(S, 400, 70, ["Alt", "A"], 0.5) + ripple(S, 457, 29, 4.0) + ptr;
    },
  };
}

function easing(): SchemaDef {
  const total = 8.2;
  const ox = 34, oy = 160, W = 136, H = 128;
  const P = (x: number, y: number) => `${f(ox + x * W)} ${f(oy - y * H)}`;
  const curve = (a: Array<number>) => `M${P(0, 0)}C${P(a[0], a[1])} ${P(a[2], a[3])} ${P(1, 1)}`;
  const LIN = [1 / 3, 1 / 3, 2 / 3, 2 / 3], GRAV = [0.33, 0, 0.67, 0.33], IO = [0.42, 0, 0.58, 1];
  const vel = { flat: "M410 105C430 105 450 105 470 105S490 105 504 105", ramp: "M410 168C430 150 450 115 470 85S490 50 504 38", hill: "M410 168C430 168 445 38 457 38S484 168 504 168" };
  return {
    total,
    steps: [
      { at: 0, text: "Click the segment between two keyframes" },
      { at: 0.6, text: "Pick a preset: linear, gravity, ease, sine, expo… in, out or in-out" },
      { at: 3.0, text: "Or drag the two handles to shape your own curve" },
      { at: 4.4, text: "The velocity chart shows where it speeds up" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const morph = (keysV: Array<Key>) => S.a("d", keysV);
      const editor = `${canvas(10, 10, 182, 176)}<path d="M${ox} 26V${oy}H${ox + W}" stroke="rgba(255,255,255,.3)" fill="none"/>
<path d="${curve(IO)}" fill="none" stroke="${CYAN}" stroke-width="2.5">${morph([[1.0, curve(LIN)], [1.3, curve(GRAV)], [3.3, curve(GRAV)], [4.0, curve(IO)]])}</path>
<path d="M${P(0, 0)}L${P(IO[0], IO[1])}M${P(1, 1)}L${P(IO[2], IO[3])}" stroke="${VIOLET}" stroke-width="1.5">${morph([[1.0, `M${P(0, 0)}L${P(LIN[0], LIN[1])}M${P(1, 1)}L${P(LIN[2], LIN[3])}`], [1.3, `M${P(0, 0)}L${P(GRAV[0], GRAV[1])}M${P(1, 1)}L${P(GRAV[2], GRAV[3])}`], [3.3, `M${P(0, 0)}L${P(GRAV[0], GRAV[1])}M${P(1, 1)}L${P(GRAV[2], GRAV[3])}`], [4.0, `M${P(0, 0)}L${P(IO[0], IO[1])}M${P(1, 1)}L${P(IO[2], IO[3])}`]])}</path>
${[[0, 1], [2, 3]].map(([i, j]) => `<circle cx="${f(ox + IO[i] * W)}" cy="${f(oy - IO[j] * H)}" r="5" fill="${VIOLET}">${S.a("cx", [[1.0, f(ox + LIN[i] * W)], [1.3, f(ox + GRAV[i] * W)], [3.3, f(ox + GRAV[i] * W)], [4.0, f(ox + IO[i] * W)]])}${S.a("cy", [[1.0, f(oy - LIN[j] * H)], [1.3, f(oy - GRAV[j] * H)], [3.3, f(oy - GRAV[j] * H)], [4.0, f(oy - IO[j] * H)]])}</circle>`).join("")}`;
      const rows = ["linear", "gravity", "ease"], cols = ["in", "out", "in-out"];
      const grid = `${canvas(200, 10, 132, 176)}${cols.map((c, i) => text(252 + i * 30, 30, c, { size: 10.5, color: MUTED })).join("")}${rows.map((r, j) => text(208, 56 + j * 34, r, { size: 10.5, color: MUTED, anchor: "start" }) + cols.map((_, i) => `<rect x="${240 + i * 30}" y="${40 + j * 34}" width="24" height="24" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.2)"/>`).join("")).join("")}
<rect x="238" y="72" width="28" height="28" rx="5" fill="none" stroke="${CYAN}" stroke-width="2" opacity="0">${S.a("opacity", [[0.85, 0], [0.95, 1], [3.2, 1], [3.3, 0]])}</rect>`;
      const ball = (keysY: Array<Key>) => `<circle cx="374" cy="160" r="9" fill="${ORANGE}">${S.a("cy", keysY)}</circle>`;
      const lane = `${canvas(340, 10, 170, 176)}<path d="M374 26V170" stroke="rgba(255,255,255,.12)"/><path d="M410 30V170H504" stroke="rgba(255,255,255,.3)" fill="none"/>${text(457, 182, "velocity", { size: 10.5, color: MUTED })}
${ball([[1.6, 30], [2.6, 160, EASE.fall], [3.0, 160], [3.05, 30, "lin"], [4.4, 30], [5.4, 160, EASE.io], [5.8, 160], [5.85, 30, "lin"], [6.45, 160, EASE.fall], [6.95, 96, EASE.rise], [7.45, 160, EASE.fall]])}
<path d="${vel.hill}" fill="none" stroke="${CYAN}" stroke-width="2">${morph([[1.0, vel.flat], [1.3, vel.ramp], [3.3, vel.ramp], [4.0, vel.hill]])}</path>`;
      const bounce = `<g opacity="1">${S.show(5.85)}${chip(206, 156, 120, "bounce = fall + rise", "", { fill: "rgba(15,23,42,.9)" })}</g>`;
      const h2: P = [ox + GRAV[2] * W, oy - GRAV[3] * H], h2b: P = [ox + IO[2] * W, oy - IO[3] * H];
      const ptr = cursor(S, [[0.3, 160, 186], [0.85, 252, 86], [2.8, 200, 150], [3.3, h2[0], h2[1]], [4.0, h2b[0], h2b[1]], [4.6, 170, 186]]);
      return S.clock + editor + grid + lane + bounce + ripple(S, 252, 86, 0.9) + ptr;
    },
  };
}

/** Patterns, markers and spray; `animated` adds the fourth beat: the tile, the path and the original move. */
function patternMarkerSpray(animated: boolean): SchemaDef {
  const total = animated ? 8.6 : 6.6;
  const node: Array<P> = [[200, 128], [240, 66], [292, 108], [332, 46]];
  const moved: Array<P> = [[200, 128], [240, 92], [292, 72], [332, 46]];
  const poly = (p: Array<P>) => `M${p.map((q) => `${q[0]} ${q[1]}`).join("L")}`;
  const r = rnd(7);
  const stars = Array.from({ length: 13 }, (_, i) => ({ x: 372 + r() * 124, y: 30 + r() * 112, s: 0.45 + r() * 0.7, rot: Math.round(r() * 72), o: 0.45 + r() * 0.55, t: 3.7 + i * 0.09 }));
  const steps: Array<SchemaStep> = [
    { at: 0.2, text: "<b>Make Pattern</b>: draw a tile, fill any shape with it" },
    { at: 1.8, text: "<b>Markers</b>: a shape on the start, middle and end nodes of a path" },
    { at: 3.6, text: "<b>Spray</b>: drag to scatter copies — size, angle and opacity in a range" },
  ];
  if (animated) steps.push({ at: 6.5, text: "Animate the tile, the path or the original: every copy follows" });
  return {
    total, steps,
    svg: (uid) => {
      const S = story(uid, total);
      const A = 6.5;
      const star = "M0 -9L2.6 -3.2 9 -2.8 4 1.4 5.6 7.6 0 4.2 -5.6 7.6 -4 1.4 -9 -2.8 -2.6 -3.2Z";
      const defs = `<defs><pattern id="${uid}p" width="18" height="18" patternUnits="userSpaceOnUse">${animated ? S.t("translate", [[A, "0 0"], [A + 1.6, "36 18", "lin"]], "patternTransform") : ""}<circle cx="5" cy="5" r="3" fill="${CYAN}"/><path d="M13 10l4 7h-8z" fill="${VIOLET}"/></pattern><path id="${uid}st" d="${star}" fill="${ORANGE}"/></defs>`;
      const tile = `<g opacity="1">${S.show(0.2)}<rect x="24" y="24" width="36" height="36" fill="none" stroke="#fff" stroke-opacity=".6" stroke-dasharray="3 3"/><circle cx="34" cy="34" r="5" fill="${CYAN}"/><path d="M48 44l7 12h-14z" fill="${VIOLET}"/>${text(42, 76, "tile", { size: 11, color: MUTED })}</g>`;
      const blob = `<path d="M84 64C96 34 150 30 162 58S170 128 130 132 72 94 84 64Z" fill="url(#${uid}p)" stroke="${CYAN}" stroke-width="1.5">${S.a("opacity", [[0.9, 0], [1.3, 1]])}</path>`;
      const zone2 = `<path d="${poly(node)}" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round">${S.a("opacity", [[1.75, 0], [1.9, 1]])}${animated ? S.a("d", [[A, poly(node)], [A + 0.8, poly(moved)], [A + 1.6, poly(node)]]) : ""}</path>` +
        node.map((p, i) => {
          const m = i === 0 ? `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${CYAN}"/>` : i === node.length - 1 ? `<path d="M${p[0] - 2} ${p[1] - 12}l10 -2-4 10z" fill="${CYAN}" transform="rotate(10 ${p[0]} ${p[1]})"/>` : diamond(p[0], p[1], 7, VIOLET);
          const mv = animated && i > 0 && i < node.length - 1 ? S.t("translate", [[A, "0 0"], [A + 0.8, `0 ${moved[i][1] - p[1]}`], [A + 1.6, "0 0"]]) : "";
          return `<g>${mv}${pop(S, p[0], p[1], 2.3 + i * 0.22, m)}</g>`;
        }).join("") + `<g opacity="1">${S.show(3.2)}${text(200, 150, "start", { size: 10.5, color: MUTED })}${text(266, 150, "mid", { size: 10.5, color: MUTED })}${text(332, 30, "end", { size: 10.5, color: MUTED })}</g>`;
      const spray = stars.map((s) => `<g transform="translate(${f(s.x)} ${f(s.y)}) rotate(${s.rot}) scale(${f(s.s)})" opacity="${f(s.o)}"><g>${animated ? S.t("rotate", [[A, "0"], [A + 1.6, "72"]]) : ""}${pop(S, 0, 0, s.t, `<use href="#${uid}st"/>`)}</g></g>`).join("");
      const brush = `<g opacity="0">${S.show(3.6, 5.0)}<g>${S.t("translate", [[3.6, "380 40"], [4.0, "470 70"], [4.4, "400 120"], [4.8, "480 132"]])}<circle r="22" fill="rgba(255,255,255,.06)" stroke="#fff" stroke-dasharray="3 3"/></g></g>`;
      const labels = text(93, 180, "pattern", { size: 12, color: MUTED }) + text(262, 180, "markers", { size: 12, color: MUTED }) + text(434, 180, "spray", { size: 12, color: MUTED });
      return S.clock + defs + canvas(10, 10, 164, 158) + canvas(180, 10, 164, 158) + canvas(350, 10, 160, 158) + tile + arrowRight(62, 42, 14) + blob + zone2 + spray + brush + labels +
        cursor(S, [[3.3, 330, 180], [3.6, 380, 40], [4.0, 470, 70], [4.4, 400, 120], [4.8, 480, 132], [5.4, 500, 186]]);
    },
  };
}

function repeater(): SchemaDef {
  const total = 7.4;
  const O: P = [170, 98];
  return {
    total,
    steps: [
      { at: 0.4, text: "Group the object, press <kbd>Y</kbd>" },
      { at: 1.0, text: "<b>Copies</b> 8, <b>Rotation</b> 45° per copy — numbers, not duplicates" },
      { at: 2.7, text: "Change a number and the set rebuilds: <b>Scale</b> 88 % per copy" },
      { at: 4.3, text: "Keyframe it: the whole set turns as one" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      // each petal: rotate(i·45) is static; its scale animates from 1 to 0.88^i (the attribute holds the end state)
      const ring = `<g transform="translate(${O[0]} ${O[1]})"><g>${S.t("rotate", [[4.7, "0"], [6.6, "360"]])}${Array.from({ length: 8 }, (_, i) => `<g transform="rotate(${i * 45})"><g transform="scale(${f(Math.pow(0.88, i))})">${S.t("scale", [[2.7, "1 1"], [3.3, `${f(Math.pow(0.88, i))} ${f(Math.pow(0.88, i))}`]])}<ellipse cx="0" cy="-42" rx="10" ry="25" fill="${CYAN}" fill-opacity="${i === 0 ? 1 : 0.7}">${i > 0 ? S.a("opacity", [[1.0 + i * 0.16, 0], [1.08 + i * 0.16, 1]]) : ""}</ellipse></g></g>`).join("")}</g><circle r="4" fill="${VIOLET}"/></g>`;
      const count = Array.from({ length: 8 }, (_, i) => `<text x="474" y="58" font-size="13" fill="currentColor" text-anchor="end" opacity="${i === 7 ? 1 : 0}">${S.a("opacity", i === 0 ? [[0, 1], [1.16, 1], [1.17, 0]] : i === 7 ? [[1.0 + i * 0.16, 0], [1.01 + i * 0.16, 1]] : [[1.0 + i * 0.16, 0], [1.01 + i * 0.16, 1], [1.16 + i * 0.16, 1], [1.17 + i * 0.16, 0]])}${i + 1}</text>`).join("");
      const val = (y: number, from: string, to: string, t: number) => `<text x="474" y="${y}" font-size="13" fill="currentColor" text-anchor="end" opacity="0">${S.a("opacity", [[t - 0.01, 1], [t, 0]])}${from}</text><text x="474" y="${y}" font-size="13" fill="currentColor" text-anchor="end">${S.a("opacity", [[t - 0.01, 0], [t, 1]])}${to}</text>`;
      const panel = `${canvas(344, 10, 166, 176)}${text(358, 32, "Repeater", { size: 12, color: MUTED, anchor: "start", weight: 600 })}
${["Copies", "Rotation", "Scale"].map((l, i) => `${text(358, 58 + i * 26, l, { size: 12.5, anchor: "start" })}<rect x="430" y="${44 + i * 26}" width="52" height="20" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.2)"/>`).join("")}
${count}${val(84, "0°", "45°", 1.0)}${val(110, "100 %", "88 %", 2.7)}
${text(358, 150, "Rotation", { size: 11.5, color: MUTED, anchor: "start" })}<path d="M412 146H498" stroke="rgba(255,255,255,.2)"/>${pop(S, 414, 146, 4.3, diamond(414, 146, 5.5, VIOLET))}${pop(S, 496, 146, 4.4, diamond(496, 146, 5.5, VIOLET))}
<g transform="translate(496 0)">${S.t("translate", [[4.7, "414 0"], [6.6, "496 0", "lin"]])}<path d="M0 136V158" stroke="${ORANGE}" stroke-width="2"/></g>`;
      const ptr = cursor(S, [[0.6, 300, 170], [1.0, 456, 82], [2.4, 456, 82], [2.7, 456, 108], [3.6, 456, 140], [4.3, 456, 150], [4.9, 300, 186]]);
      return S.clock + canvas(10, 10, 328, 176) + ring + panel + keys(S, 280, 22, ["Y"], 0.5) + ripple(S, 456, 82, 1.0) + ripple(S, 456, 108, 2.7) + ptr;
    },
  };
}

/** Three icon motions; `hover` (SVG Animator) ends with the cursor triggering the bell — the trigger is in the file. */
function iconMotion(hover: boolean): SchemaDef {
  const total = hover ? 7.2 : 5.6;
  const steps: Array<SchemaStep> = [
    { at: 0.5, text: "<b>Trim Stroke</b>: keyframe End from 0 to 100 % — it draws itself" },
    { at: 2.2, text: "<b>Rotation</b> with ease-out: a swing that settles" },
    { at: 3.9, text: "<b>Scale</b> and colour: a pop" },
  ];
  if (hover) steps.push({ at: 5.3, text: "Save with a trigger — here, on mouse over" });
  return {
    total, steps,
    svg: (uid) => {
      const S = story(uid, total);
      const circ = 2 * Math.PI * 34;
      const check = `<circle cx="90" cy="80" r="34" fill="none" stroke="${CYAN}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${f(circ)}" stroke-dashoffset="0" transform="rotate(-90 90 80)">${S.a("stroke-dashoffset", [[0.5, f(circ)], [1.5, 0]])}</circle>
<path d="M74 81l11 11 21-23" fill="none" stroke="${CYAN}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="48" stroke-dashoffset="0">${S.a("stroke-dashoffset", [[1.5, 48], [1.9, 0, "out"]])}</path>`;
      const swing = (t: number): Array<Key> => [[t, "0 260 44"], [t + 0.3, "20 260 44", "out"], [t + 0.6, "-15 260 44"], [t + 0.9, "9 260 44"], [t + 1.2, "-4 260 44"], [t + 1.5, "0 260 44"]];
      const bell = `<g>${S.t("rotate", hover ? [...swing(2.2), ...swing(5.5)] : swing(2.2))}<path d="M236 104h48c-6-6-8-14-8-26 0-14-7-24-16-26-9 2-16 12-16 26 0 12-2 20-8 26z" fill="none" stroke="${CYAN}" stroke-width="4.5" stroke-linejoin="round"/><path d="M253 112a7 7 0 0 0 14 0" fill="none" stroke="${CYAN}" stroke-width="4.5" stroke-linecap="round"/><circle cx="260" cy="44" r="4" fill="${CYAN}"/></g>`;
      const heart = `<g transform="translate(430 84)"><g>${S.t("scale", [[3.9, "1 1"], [4.15, "1.3 1.3", "out"], [4.4, "0.92 0.92"], [4.6, "1.06 1.06"], [4.8, "1 1"]])}<path d="M0 26C-40 0-28-34 0-16 28-34 40 0 0 26z" fill="${PINK}" stroke="${PINK}" stroke-width="3" stroke-linejoin="round">${S.a("fill", [[3.9, "#475569"], [4.1, PINK]])}${S.a("stroke", [[3.9, "#94a3b8"], [4.1, PINK]])}</path></g></g>`;
      const tags = text(90, 150, "Trim Stroke · End 0 → 100%", { size: 11, color: MUTED }) + text(260, 150, "Rotation · ease-out", { size: 11, color: MUTED }) + text(430, 150, "Scale + colour", { size: 11, color: MUTED });
      const trig = hover ? `<g opacity="1">${S.show(5.4)}${chip(214, 160, 92, "on mouse over")}</g>` + cursor(S, [[4.9, 330, 186], [5.4, 276, 92], [6.9, 300, 186]]) : "";
      return S.clock + canvas(10, 10, 160, 176) + canvas(180, 10, 160, 176) + canvas(350, 10, 160, 176) + check + bell + heart + tags + trig;
    },
  };
}

function splash(): SchemaDef {
  const total = 6.4;
  const logo = (s: number, x: number, y: number) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C-8-18-30-22-34-8S-18 14 0 6Z" fill="${PINK}"/><path d="M0 0C8-18 30-22 34-8S18 14 0 6Z" fill="${VIOLET}"/><ellipse cx="0" cy="2" rx="3" ry="14" fill="#fff"/></g>`;
  return {
    total,
    steps: [
      { at: 0, text: "Draw the logo or the title" },
      { at: 0.3, text: "Animate it: the wings fly in and settle, the title fades in" },
      { at: 2.6, text: "Save <b>Lottie JSON</b> — or a video" },
      { at: 3.2, text: "The app's Lottie player shows it on every screen size" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const fly = (from: string, t: number) => S.t("translate", [[t, from], [t + 0.6, "0 0", "out"]]);
      const phone = `<rect x="58" y="12" width="104" height="172" rx="16" fill="#0f172a" stroke="rgba(255,255,255,.4)" stroke-width="2"/><path d="M98 22h24" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<g transform="translate(110 88) scale(0.82)"><g>${S.t("scale", [[0.9, "0.6 0.6"], [1.2, "1.15 1.15", "out"], [1.45, "1 1"]])}
<g>${fly("-70 -40", 0.3)}<path d="M0 0C-12-27-45-33-51-12S-27 21 0 9Z" fill="${PINK}"/></g>
<g>${fly("70 -40", 0.45)}<path d="M0 0C12-27 45-33 51-12S27 21 0 9Z" fill="${VIOLET}"/></g>
<g>${fly("0 60", 0.6)}<ellipse cx="0" cy="3" rx="4.5" ry="21" fill="#fff"/></g></g></g>
<text x="110" y="148" font-size="15" font-weight="700" fill="#fff" text-anchor="middle" opacity="1">${S.a("opacity", [[1.5, 0], [2.0, 1]])}Wildlife</text>`;
      const file = `<g opacity="1">${S.show(2.6)}<rect x="192" y="82" width="100" height="26" rx="6" fill="rgba(255,255,255,.08)" stroke="${CYAN}"/>${text(242, 100, "splash.json", { size: 12, color: CYAN })}</g>`;
      const dev = (t: number, inner: string) => `<g opacity="1">${S.show(t)}${inner}</g>`;
      const devices = dev(3.2, `<path d="M294 95C306 95 308 70 318 70" fill="none" stroke="${LINE}" stroke-dasharray="3 3"/><rect x="320" y="56" width="32" height="58" rx="6" fill="#0f172a" stroke="rgba(255,255,255,.4)"/>${logo(0.36, 336, 84)}`) +
        dev(3.5, `<path d="M294 95H364" fill="none" stroke="${LINE}" stroke-dasharray="3 3"/><rect x="366" y="52" width="62" height="84" rx="7" fill="#0f172a" stroke="rgba(255,255,255,.4)"/>${logo(0.6, 397, 94)}`) +
        dev(3.8, `<path d="M294 95C330 95 400 89 440 89" fill="none" stroke="${LINE}" stroke-dasharray="3 3"/><rect x="440" y="66" width="66" height="46" rx="5" fill="#0f172a" stroke="rgba(255,255,255,.4)"/><path d="M462 120h22" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>${logo(0.45, 473, 89)}`);
      return S.clock + canvas(10, 10, 500, 176) + phone + file + devices + text(410, 158, "the same file on every screen", { size: 11.5, color: MUTED });
    },
  };
}

function createAnimateExport(): SchemaDef {
  const total = 6.6;
  const files = [".json", ".lottie", ".svg", ".mp4", ".gif", ".png"];
  return {
    total,
    steps: [
      { at: 0.3, text: "<b>Draw</b> — or import SVG, images, TTF fonts, a Lottie from the community" },
      { at: 2.2, text: "<b>Animate</b> — Watch and Diamond keyframes, or Pin for auto-animate" },
      { at: 4.2, text: "<b>Export</b> — Lottie, dotLottie, SVG, MP4, GIF, WebM, PNG, JPEG" },
    ],
    svg: (uid) => {
      const S = story(uid, total);
      const head = (x: number, t: string) => text(x, 32, t, { size: 13, weight: 700, anchor: "start" });
      const draw = `<path d="M30 110C52 46 94 130 150 58" fill="none" stroke="${CYAN}" stroke-width="3" stroke-linecap="round" stroke-dasharray="190" stroke-dashoffset="0">${S.a("stroke-dashoffset", [[0.3, 190], [1.3, 0]])}</path>` +
        ["SVG", "PNG", "TTF", "Lottie"].map((t, i) => pop(S, 38 + i * 36, 146, 1.4 + i * 0.12, chip(22 + i * 36 - (t.length > 3 ? 4 : 0), 136, t.length > 3 ? 40 : 32, t))).join("");
      const tl = `<path d="M214 120H330" stroke="rgba(255,255,255,.3)"/><circle cx="200" cy="120" r="8" fill="none" stroke="${ORANGE}" stroke-width="2"/><path d="M200 115v5l3.5 2.5" stroke="${ORANGE}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
        [228, 270, 318].map((x, i) => pop(S, x, 120, 2.3 + i * 0.2, diamond(x, 120, 7, VIOLET))).join("") +
        `<circle cx="318" cy="70" r="8" fill="${ORANGE}">${S.a("cx", [[2.9, 228], [3.9, 318]])}${S.a("cy", [[2.9, 96], [3.4, 56], [3.9, 70]])}</circle>`;
      const out = files.map((t, i) => pop(S, 392 + (i % 2) * 58, 62 + Math.floor(i / 2) * 34, 4.3 + i * 0.15, chip(368 + (i % 2) * 58, 52 + Math.floor(i / 2) * 34, 50, t))).join("");
      return S.clock + canvas(10, 10, 160, 176) + canvas(180, 10, 160, 176) + canvas(350, 10, 160, 176) + head(24, "1 · Draw") + head(194, "2 · Animate") + head(364, "3 · Export") + draw + tl + out + arrowRight(168, 96, 12) + arrowRight(338, 96, 12);
    },
  };
}

export const SCHEMAS: Record<SchemaKind, SchemaDef> = {
  shapeBuilder: shapeBuilder(), editColors: editColors(), gradient: gradient(), vectorText: vectorText(), textPath: textPath(),
  autoAnimate: autoAnimate(), easing: easing(), patternMarkerSpray: patternMarkerSpray(false), patternMarkerSprayAnimated: patternMarkerSpray(true),
  repeater: repeater(), iconMotion: iconMotion(true), iconMotionLottie: iconMotion(false), splash: splash(), createAnimateExport: createAnimateExport(),
};
