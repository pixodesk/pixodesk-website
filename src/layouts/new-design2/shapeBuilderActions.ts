/**
 * "Shape Builder actions" under the shape-builder art (owner, 2026-10-17: instead of the schematic in the text column) — the
 * toolbar's actions in the order they are used, each on two overlapping circles (the first selected on the left):
 *   1. pick regions — click or drag, or let a button pick them: All · Subtract · Intersect · Exclude · Deselect
 *   2. apply — + Add (the picked regions become a new shape) · − Remove (they are cut out of the originals)
 * Static: picked regions cyan, shapes lavender (the art's colours). The buttons' behaviour: kf ShapeBuilderControls.onSelect / applyAction.
 */
const CYAN = "#67e8f9", LAV = "#c4b5fd";

// two circles of radius R, centres A and B on one line; T / U = where they cross (top / bottom)
const R = 15, AX = 24, BX = 40, CY = 22, MX = (AX + BX) / 2, HALF = Math.sqrt(R * R - ((BX - AX) / 2) ** 2);
const f = (n: number) => String(Math.round(n * 100) / 100);
const T = `${f(MX)} ${f(CY - HALF)}`, U = `${f(MX)} ${f(CY + HALF)}`;
enum Region { first = "first", both = "both", second = "second" }
/** Arcs: screen clockwise = sweep 1; a region's outer edge is the large arc of its own circle. */
const REGION_D: Record<Region, string> = {
  [Region.first]: `M${T}A${R} ${R} 0 1 0 ${U}A${R} ${R} 0 0 1 ${T}Z`,
  [Region.both]: `M${T}A${R} ${R} 0 0 0 ${U}A${R} ${R} 0 0 0 ${T}Z`,
  [Region.second]: `M${T}A${R} ${R} 0 1 1 ${U}A${R} ${R} 0 0 0 ${T}Z`,
};
const ALL_REGIONS = [Region.first, Region.both, Region.second];

const circles = (fill: number) => [AX, BX].map((x) => `<circle cx="${x}" cy="${CY}" r="${R}" fill="${LAV}" fill-opacity="${fill}" stroke="${LAV}" stroke-opacity=".65" stroke-width="1"/>`).join("");
const mesh = [AX, BX].map((x) => `<circle cx="${x}" cy="${CY}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".8" stroke-dasharray="2 2"/>`).join("");
const paint = (regions: Array<Region>, fill: string, extra = "") => regions.map((r) => `<path d="${REGION_D[r]}" fill="${fill}"${extra}/>`).join("");
const venn = (body: string) => `<svg viewBox="0 6 64 32" width="64" height="32" aria-hidden="true" style="display:block;width:100%;max-width:76px;height:auto;margin:0 auto">${body}</svg>`;

/** Before: the circles with the overlap picked. */
const picked = venn(circles(0.14) + paint([Region.both], CYAN, ' fill-opacity=".75"') + mesh);
const PICKS: Array<{ name: string; hint: string; regions: Array<Region> }> = [
  { name: "All", hint: "every region", regions: ALL_REGIONS },
  { name: "Subtract", hint: "the first minus the rest", regions: [Region.first] },
  { name: "Intersect", hint: "only the overlap", regions: [Region.both] },
  { name: "Exclude", hint: "all but the overlap", regions: [Region.first, Region.second] },
  { name: "Deselect", hint: "clear the picks", regions: [] },
];
const APPLY: Array<{ name: string; hint: string; after: string }> = [
  { name: "+ Add", hint: "the picked regions become one new shape; the circles stay", after: venn(circles(0.14) + paint([Region.both], LAV)) },
  { name: "− Remove", hint: "the picked regions are cut out of the circles", after: venn(paint([Region.first, Region.second], LAV, ` fill-opacity=".14" stroke="${LAV}" stroke-opacity=".65" stroke-width="1"`)) },
];

const step = (n: number, text: string) => `<div class="mb-1.5 mt-2.5 flex items-center gap-2 text-[13px] leading-snug text-custom-grey-200"><span class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 text-[11px] font-semibold text-slate-300">${n}</span><span>${text}</span></div>`;
const tile = (art: string, name: string, hint: string) => `<div class="rounded-lg border border-white/10 px-1.5 py-2 text-center" style="background: rgb(255 255 255 / 0.03)">${art}<div class="mt-1.5 text-[12.5px] font-semibold text-white">${name}</div><div class="text-[11px] leading-snug text-slate-400">${hint}</div></div>`;
const arrow = `<span class="text-slate-400" aria-hidden="true">→</span>`;

/** The panel, inset like the art's own card (`inset` = the card's margin in the art, in %). */
export const shapeBuilderActions = (inset: string): string =>
  `<div class="rounded-xl border border-white/10 bg-black/30 px-4 pb-3 pt-2.5 text-white" style="margin: 0 ${inset}">` +
  `<div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Shape Builder actions</div>` +
  step(1, "Pick regions: click them, drag across several — or let a button pick:") +
  `<div class="grid gap-2" style="grid-template-columns: repeat(auto-fit, minmax(92px, 1fr))">${PICKS.map((p) => tile(venn(circles(0.14) + paint(p.regions, CYAN, ' fill-opacity=".75"') + mesh), p.name, p.hint)).join("")}</div>` +
  step(2, "Then apply:") +
  `<div class="grid gap-2" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))">${APPLY.map((a) => tile(`<div class="flex items-center justify-center gap-2"><div style="width: 76px">${picked}</div>${arrow}<div style="width: 76px">${a.after}</div></div>`, a.name, a.hint)).join("")}</div>` +
  `</div>`;
