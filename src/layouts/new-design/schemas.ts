// Mechanism schematics: small inline SVGs (viewBox 520×160) that show HOW a feature works, next to the facts.
// Static at rest; hovering (or tapping) the schematic plays a short SMIL animation of the mechanism — user-started,
// so the site rule "nothing animates on load" holds. Pure string builders, so they are type-checked and reusable.
export type SchemaKind =
  | "autoAnimate" | "easing" | "textPath" | "patternMarkerSpray" | "repeater" | "iconMotion"
  | "shapeBuilder" | "editColors" | "gradient" | "vectorText" | "splash" | "createAnimateExport";

const CYAN = "#67e8f9", VIOLET = "#c4b5fd", ORANGE = "#fdba74";
const LINE = "rgba(255,255,255,.45)";
const box = (x: number, y: number, w: number, h: number) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.16)"/>`;
const label = (x: number, y: number, t: string, size = 12, opacity = 0.85) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="currentColor" fill-opacity="${opacity}">${t}</text>`;
const arrow = (x: number, y: number) => `<path d="M${x} ${y}h20m-6-6 6 6-6 6" fill="none" stroke="${LINE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
const diamond = (x: number, y: number, r: number, fill: string, inner = "") => `<path d="M${x} ${y - r}l${r} ${r}-${r} ${r}-${r}-${r}z" fill="${fill}">${inner}</path>`;
const pinMark = (x: number, y: number) => `<path d="M${x} ${y - 24}v12" stroke="${VIOLET}" stroke-width="2" stroke-linecap="round"/><circle cx="${x}" cy="${y - 26}" r="3.5" fill="${VIOLET}"/>`;
/** The hover/tap trigger every animation shares: starts on the root svg's mouseover or click, ends frozen, restarts on the next hover. */
const on = (uid: string, dur = "1s", extra = "") => `begin="${uid}.mouseover;${uid}.click" dur="${dur}" fill="freeze" restart="whenNotActive" ${extra}`;
/** Point on a cubic bezier (markers along a path). */
const bz = (p: Array<[number, number]>, t: number): [number, number] => {
  const u = 1 - t;
  return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]];
};
const B3 = [10, 185, 360];
const three = (parts: string[], labels: string[]) => B3.map((x, i) => box(x, 8, 150, 118) + parts[i] + label(x + 75, 112, labels[i])).join("") + arrow(162, 67) + arrow(337, 67);
const B4 = [10, 140, 270, 400];
const four = (parts: string[], labels: string[]) => B4.map((x, i) => box(x, 8, 112, 118) + parts[i] + label(x + 56, 112, labels[i])).join("");

export const SCHEMAS: Record<SchemaKind, (uid: string) => string> = {
  autoAnimate: (uid) => three([
    `<circle cx="50" cy="52" r="13" fill="${CYAN}"/>${pinMark(50, 52)}${label(100, 58, "0 s", 11, 0.6)}`,
    `<circle cx="225" cy="40" r="13" fill="${CYAN}" fill-opacity=".25"/><path d="M225 40C262 40 280 86 305 88" fill="none" stroke="${CYAN}" stroke-dasharray="4 4"/>
     <circle cx="225" cy="40" r="13" fill="${CYAN}"><animateMotion path="M0 0C37 0 55 46 80 48" ${on(uid, "1.1s", 'calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"')}/></circle>${pinMark(305, 88)}${label(240, 95, "1 s", 11, 0.6)}`,
    `<path d="M380 62H490" stroke="${LINE}" stroke-width="2"/><path d="M380 56v12M435 58v8M490 56v12" stroke="${LINE}"/>${diamond(380, 62, 8, VIOLET)}${diamond(490, 62, 8, VIOLET, `<animate attributeName="fill-opacity" from="0" to="1" ${on(uid, "1.1s")}/>`)}
     <circle cx="380" cy="62" r="3" fill="#fff"><animate attributeName="cx" from="380" to="490" ${on(uid, "1.1s")}/></circle>${label(435, 90, "+ the motion path", 11, 0.6)}`,
  ], ["1 · Pin the state", "2 · Move time, change it", "3 · Keyframes appear"]),

  easing: (uid) => {
    const axes = (x: number) => `<path d="M${x + 16} 94V26M${x + 16} 94h80" stroke="rgba(255,255,255,.25)"/>`;
    const dot = (x: number, spline: string) => `<circle cx="${x + 16}" cy="100" r="4" fill="#fff"><animate attributeName="cx" from="${x + 16}" to="${x + 96}" ${on(uid, "1.2s", `calcMode="spline" keySplines="${spline}" keyTimes="0;1"`)}/></circle>`;
    return four([
      `${axes(10)}<path d="M26 94L106 26" fill="none" stroke="${CYAN}" stroke-width="2.5"/>${dot(10, "0 0 1 1")}`,
      `${axes(140)}<path d="M156 94C196 94 196 26 236 26" fill="none" stroke="${CYAN}" stroke-width="2.5"/>${dot(140, "0.5 0 0.5 1")}`,
      `${axes(270)}<path d="M286 30Q306 94 326 94Q340 44 350 94Q358 72 366 94" fill="none" stroke="${CYAN}" stroke-width="2.5"/><circle cx="276" cy="30" r="4" fill="#fff"><animate attributeName="cy" values="30;94;44;94;72;94" keyTimes="0;.4;.6;.8;.9;1" ${on(uid, "1.2s")}/></circle>`,
      `${axes(400)}<path d="M416 94C470 94 442 26 496 26" fill="none" stroke="${CYAN}" stroke-width="2.5"/><path d="M416 94h54M496 26h-54" stroke="${VIOLET}" stroke-width="1.5"/><circle cx="470" cy="94" r="4" fill="${VIOLET}"/><circle cx="442" cy="26" r="4" fill="${VIOLET}"/>${dot(400, "0.7 0 0.3 1")}`,
    ], ["linear", "ease in-out", "gravity · bounce", "your own curve"]);
  },

  textPath: (uid) => `<defs><path id="${uid}w" d="M30 96C110 26 190 166 270 96S430 36 495 96"/></defs>
<use href="#${uid}w" fill="none" stroke="rgba(255,255,255,.3)" stroke-dasharray="4 4"/>
<circle cx="30" cy="96" r="4" fill="${VIOLET}"/><circle cx="495" cy="96" r="4" fill="${VIOLET}"/>
<text font-size="21" font-weight="700" fill="${CYAN}"><textPath href="#${uid}w" startOffset="3%">animated text on a path<animate attributeName="startOffset" from="3%" to="38%" ${on(uid, "1.6s", 'calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"')}/></textPath></text>
${label(260, 150, "start and offset animate along the path — a line, a wave or a circle", 12, 0.75)}`,

  patternMarkerSpray: (uid) => {
    const tiles = [0, 1, 2].flatMap((j) => [0, 1, 2].map((i) => `<path d="M${38 + i * 36} ${28 + j * 26}l7 12h-14z" fill="${CYAN}" fill-opacity="${0.55 + 0.2 * ((i + j) % 3)}"><animateTransform attributeName="transform" type="rotate" from="0 ${38 + i * 36} ${34 + j * 26}" to="180 ${38 + i * 36} ${34 + j * 26}" ${on(uid, "1s")}/></path>`)).join("");
    const curve: Array<[number, number]> = [[200, 92], [235, 6], [300, 118], [325, 30]];
    const marks = [0.08, 0.26, 0.44, 0.62, 0.8].map((t) => { const [x, y] = bz(curve, t); const [nx, ny] = bz(curve, t + 0.12); return `<g transform="translate(${x} ${y})">${diamond(0, 0, 7, VIOLET)}<animateTransform attributeName="transform" type="translate" from="${x} ${y}" to="${nx} ${ny}" ${on(uid, "1s")}/></g>`; }).join("");
    const dots = [[392, 40, 4], [420, 28, 2.5], [452, 46, 5], [480, 30, 3], [405, 70, 2.5], [438, 66, 6], [470, 74, 3.5], [496, 60, 2], [398, 96, 3], [430, 92, 2.5], [462, 98, 4.5], [490, 90, 3]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${CYAN}" fill-opacity=".75"><animate attributeName="cy" from="${y}" to="${y - 6 - (i % 3) * 5}" ${on(uid, "1s")}/></circle>`).join("");
    return three([tiles, `<path d="M${curve[0][0]} ${curve[0][1]}C${curve[1][0]} ${curve[1][1]} ${curve[2][0]} ${curve[2][1]} ${curve[3][0]} ${curve[3][1]}" fill="none" stroke="${LINE}"/>${marks}`, dots], ["pattern — the tile moves, the fill moves", "markers — copies along a path", "spray — scattered copies"]);
  },

  repeater: (uid) => {
    const clones = Array.from({ length: 8 }, (_, i) => `<use href="#${uid}p" transform="rotate(${i * 45})" fill-opacity="${0.5 + (i % 2) * 0.4}"/>`).join("");
    return `<defs><ellipse id="${uid}p" cx="0" cy="-36" rx="9" ry="22" fill="${CYAN}"/></defs>
<use href="#${uid}p" transform="translate(90 82)"/><circle cx="90" cy="82" r="3" fill="${VIOLET}"/>
${arrow(175, 80)}${label(230, 70, "count · spacing · rotation", 11, 0.65)}
<g transform="translate(380 82)"><g>${clones}<animateTransform attributeName="transform" type="rotate" from="0" to="90" ${on(uid, "1.2s", 'calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"')}/></g></g><circle cx="380" cy="82" r="3" fill="${VIOLET}"/>
${label(90, 150, "1 source shape")}${label(380, 150, "8 clones — animated as one")}`;
  },

  iconMotion: (uid) => four([
    `<circle cx="66" cy="60" r="24" fill="none" stroke="${CYAN}" stroke-width="4" stroke-dasharray="110 60" stroke-linecap="round" transform="rotate(-90 66 60)"><animate attributeName="stroke-dasharray" from="0 170" to="110 60" ${on(uid, "1s")}/></circle>`,
    `<circle cx="196" cy="60" r="24" fill="none" stroke="${CYAN}" stroke-width="4" stroke-dasharray="9 7" stroke-linecap="round"><animate attributeName="stroke-dashoffset" from="0" to="-32" ${on(uid, "1s")}/></circle>`,
    `<g><path d="M302 60A24 24 0 1 1 326 84" fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round"/><path d="M318 84h9v-9" fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><animateTransform attributeName="transform" type="rotate" from="0 326 60" to="360 326 60" ${on(uid, "1s", 'calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"')}/></g>`,
    `<rect x="444" y="48" width="24" height="24" rx="4" fill="${CYAN}"><animate attributeName="x" from="444" to="434" ${on(uid, "0.8s")}/><animate attributeName="y" from="48" to="38" ${on(uid, "0.8s")}/><animate attributeName="width" from="24" to="44" ${on(uid, "0.8s")}/><animate attributeName="height" from="24" to="44" ${on(uid, "0.8s")}/></rect><rect x="434" y="38" width="44" height="44" rx="6" fill="none" stroke="${VIOLET}" stroke-width="2" stroke-dasharray="4 3"/>`,
  ], ["trim path", "dash array", "rotate", "scale · skew · fade"]),

  shapeBuilder: (uid) => {
    const xs = [10, 160, 280, 400];
    const y0 = 60, top = (y0 - 18.76).toFixed(2), bot = (y0 + 18.76).toFixed(2);
    const circles = (x: number) => `<circle cx="${x + 40}" cy="${y0}" r="26" fill="none" stroke="${CYAN}" stroke-width="2"/><circle cx="${x + 76}" cy="${y0}" r="26" fill="none" stroke="${CYAN}" stroke-width="2"/>`;
    const shape = (x: number, d: string, delay: number) => `<g transform="translate(${x} 0)"><path d="${d}" fill="${CYAN}" fill-opacity=".85"><animate attributeName="fill-opacity" values=".85;.15;.85" keyTimes="0;${(0.2 + delay).toFixed(2)};1" ${on(uid, "1.2s")}/></path>${circles(0)}</g>`;
    const union = `M58 ${top}A26 26 0 1 0 58 ${bot}A26 26 0 1 0 58 ${top}Z`;
    const subtract = `M58 ${top}A26 26 0 1 0 58 ${bot}A26 26 0 0 1 58 ${top}Z`;
    const intersect = `M58 ${top}A26 26 0 0 1 58 ${bot}A26 26 0 0 1 58 ${top}Z`;
    return xs.map((x) => box(x, 8, 110, 118)).join("") + circles(10) + shape(160, union, 0) + shape(280, subtract, 0.2) + shape(400, intersect, 0.4) + arrow(124, 60) +
      [["two shapes", 10], ["union", 160], ["subtract", 280], ["intersect", 400]].map(([t, x]) => label(Number(x) + 55, 112, String(t))).join("");
  },

  editColors: (uid) => {
    const half = (x: number, color: string, anim: string) => `${box(x, 8, 230, 118)}<rect x="${x + 22}" y="24" width="30" height="30" rx="6" fill="${color}">${anim}</rect>
<path d="M${x + 52} 39H${x + 108}M${x + 52} 39L${x + 150} 30M${x + 52} 39L${x + 192} 72" stroke="${color}" stroke-opacity=".5" stroke-width="1.5"/>
<circle cx="${x + 122}" cy="42" r="14" fill="${color}">${anim}</circle><rect x="${x + 150}" y="16" width="26" height="26" rx="4" fill="${color}" transform="rotate(12 ${x + 163} 29)">${anim}</rect><path d="M${x + 192} 56l16 28h-32z" fill="${color}">${anim}</path>`;
    const swap = `<animate attributeName="fill" values="${CYAN};${ORANGE}" ${on(uid, "0.9s")}/>`;
    return half(10, CYAN, "") + half(280, ORANGE, swap) + arrow(250, 60) + label(125, 112, "one shared colour") + label(395, 112, "change it once — everything follows");
  },

  gradient: (uid) => `<defs><linearGradient id="${uid}l" x1="0" x2="1"><stop offset="0" stop-color="${CYAN}"/><stop offset="1" stop-color="${VIOLET}"><animate attributeName="offset" values="1;.35;1" ${on(uid, "1.4s")}/></stop></linearGradient><radialGradient id="${uid}r"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${CYAN}"><animate attributeName="offset" values=".55;.2;.55" ${on(uid, "1.4s")}/></stop><stop offset="1" stop-color="${VIOLET}"/></radialGradient></defs>` +
    three([
      `<rect x="40" y="28" width="90" height="58" rx="8" fill="url(#${uid}l)"/>`,
      `<circle cx="260" cy="57" r="32" fill="url(#${uid}r)"/>`,
      `<rect x="395" y="26" width="48" height="48" rx="6" fill="${CYAN}" fill-opacity=".55"/><rect x="425" y="44" width="48" height="48" rx="6" fill="${VIOLET}" fill-opacity=".55"><animate attributeName="fill-opacity" values=".55;1;.55" ${on(uid, "1.4s")}/></rect>`,
    ], ["linear — any number of stops", "radial", "opacity per shape"]),

  vectorText: (uid) => `<defs><path id="${uid}c" d="M435 88a40 40 0 1 1 .1 0"/></defs>` + three([
    `<text x="85" y="78" text-anchor="middle" font-size="58" font-weight="700" fill="${CYAN}">Aa</text>`,
    `<text x="260" y="78" text-anchor="middle" font-size="58" font-weight="700" fill="none" stroke="${VIOLET}" stroke-width="1.5" stroke-dasharray="3 3">Aa<animate attributeName="stroke-dashoffset" from="0" to="-24" ${on(uid, "1.2s")}/></text><circle cx="232" cy="78" r="3" fill="${VIOLET}"/><circle cx="262" cy="36" r="3" fill="${VIOLET}"/><circle cx="289" cy="78" r="3" fill="${VIOLET}"/>`,
    `<use href="#${uid}c" fill="none" stroke="rgba(255,255,255,.25)" stroke-dasharray="3 3"/><text font-size="12" font-weight="700" fill="${CYAN}"><textPath href="#${uid}c" startOffset="0%">text on a circle · text on a circle ·<animate attributeName="startOffset" from="0%" to="30%" ${on(uid, "1.4s")}/></textPath></text>`,
  ], ["your TTF fonts", "to outlines", "on any path"]),

  splash: (uid) => {
    const phone = (x: number, r: number, t: string, anim = "") => `<rect x="${x}" y="14" width="56" height="100" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)"/><circle cx="${x + 28}" cy="60" r="${r}" fill="${CYAN}">${anim}</circle><path d="M${x + 20} 104h16" stroke="rgba(255,255,255,.35)" stroke-linecap="round"/>${label(x + 28, 140, t, 11, 0.7)}`;
    return phone(70, 7, "0.0 s", `<animate attributeName="r" values="7;23;7" ${on(uid, "1.2s")}/>`) + arrow(146, 64) + phone(190, 15, "0.4 s") + arrow(266, 64) + phone(310, 23, "0.8 s") + arrow(386, 64) + `<rect x="430" y="14" width="56" height="100" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)"/><path d="M440 36h36M440 48h26M440 60h32M440 72h20" stroke="${VIOLET}" stroke-width="3" stroke-linecap="round"/>${label(458, 140, "the app", 11, 0.7)}`;
  },

  createAnimateExport: (uid) => three([
    `<path d="M30 92C60 20 100 110 140 40" fill="none" stroke="${CYAN}" stroke-width="2.5"/><path d="M84 66l24-26" stroke="${VIOLET}" stroke-width="1.5"/><rect x="80" y="62" width="8" height="8" fill="#fff"><animateMotion path="M0 0C20 -40 40 30 56 -26" ${on(uid, "1.2s")}/></rect><circle cx="108" cy="40" r="3.5" fill="${VIOLET}"/>`,
    `<path d="M205 60H340" stroke="${LINE}" stroke-width="2"/>${diamond(210, 60, 8, VIOLET)}${diamond(262, 60, 8, VIOLET)}${diamond(335, 60, 8, VIOLET)}<circle cx="210" cy="60" r="3" fill="#fff"><animate attributeName="cx" from="210" to="335" ${on(uid, "1.2s", 'calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"')}/></circle><path d="M236 60v-14M300 60v-14" stroke="${LINE}"/>${label(236, 40, "ease", 10, 0.6)}${label(300, 40, "ease", 10, 0.6)}`,
    [".json", ".svg", ".mp4", ".gif"].map((t, i) => `<g><rect x="${378 + (i % 2) * 62}" y="${26 + Math.floor(i / 2) * 36}" width="54" height="26" rx="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.25)"/>${label(405 + (i % 2) * 62, 43 + Math.floor(i / 2) * 36, t, 12, 0.95)}<animate attributeName="opacity" values="1;.2;1" keyTimes="0;${(0.15 + i * 0.15).toFixed(2)};1" ${on(uid, "1.2s")}/></g>`).join(""),
  ], ["Draw — or import SVG, images, fonts", "Animate — keyframes, auto-animate, easing", "Export — one document, many files"]),
};
