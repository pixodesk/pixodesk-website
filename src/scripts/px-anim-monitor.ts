/*-----------------------------------------------------------------------------
 *  DEV-ONLY animation monitor — how many animations are playing on this page, by kind.
 *
 *  Injected on every page by `src/plugins/px-anim-monitor.mjs` under `astro dev` only, and
 *  self-gated to localhost / 127.0.0.1 (or `?pxdebug=1` anywhere; `?pxdebug=0` turns it off).
 *  Polls every 500 ms and draws ONE small line bottom-left: a chip per animation that is
 *  playing right now — `js1 js2 js3 lottie1 lottie2` — or `no animation`. A chip's number is
 *  its position among ALL animations of that kind on the page (document order), so `js2` stays
 *  `js2` while others start and stop. Click a chip to scroll that animation into view (through
 *  its iframes, with a short outline flash); click `⋯` for the full breakdown.
 *  `window.__pxAnimMonitor` exposes `snapshot()`, `report()`, `reveal(label)`, `stop()`, `start()`.
 *
 *  What is counted, and how (every same-origin document: the page + every iframe, nested):
 *
 *   pre-rendered SVG + CSS keyframes   `document.getAnimations()` → CSSAnimation whose target
 *                                      sits in an <svg data-px-meta> without an embedded script;
 *                                      "playing" = playState 'running'. The native events
 *                                      (`animationstart` / `animationend` / `animationcancel` on
 *                                      the document, `finish` / `cancel` on each WAAPI Animation)
 *                                      refresh the panel at once; the poll remains because NO
 *                                      event reports a pause or resume (`animation-play-state`)
 *   pre-rendered SVG + JS (Pixodesk)   the old embedded player (<script data-px-script>) drives
 *                                      WAAPI `Animation`s (KeyframeEffect) — the same list, plain
 *                                      Animation, target inside such an <svg>; a frame loop that
 *                                      writes attributes instead shows up through the
 *                                      MutationObserver fallback (attribute writes in the last poll)
 *   pre-rendered SVG + JS (2D export)  the Lottie Animator's SVG export: an <svg> with a plain
 *                                      embedded <script> (no data-px-*) writing attributes per frame
 *   lightweight JSON + Pixodesk player FIRST CHOICE: the player's own page-wide registry —
 *                                      `globalThis.__pixodeskAnimators` (`getAll()` with
 *                                      `isPlaying()` / `getRootElement()`, `subscribe()` for the
 *                                      play/pause events) — in every reachable document that has
 *                                      it. Where the registry is absent (an older player build)
 *                                      the fallback is what the DOM shows: an <svg> WITHOUT
 *                                      data-px-meta animated by WAAPI (native engine) or attribute
 *                                      writes (frame-loop engine), only inside the unified player's
 *                                      documents (/app/player/…: the player pages' iframe and the
 *                                      `[data-px-player]` embeds)
 *   pre-rendered SVG in Pixodesk player a <svg data-px-meta> animated by WAAPI from outside
 *                                      (the player loading a pre-rendered file)
 *   Lottie — lottie-web                `lottie.getRegisteredAnimations()` where the global is
 *                                      reachable (playing = loaded && !isPaused); otherwise its
 *                                      SVG renderer is recognised by its `__lottie_element_*` ids
 *                                      and counted as playing while it writes attributes
 *   Lottie — dotLottie (canvas)        no registry: a visible <canvas> whose pixels changed since
 *                                      the last poll (one row sampled) counts as playing
 *   other                              CSS/WAAPI animations outside any Pixodesk <svg> (page UI),
 *                                      and everything inside the editor demo iframe (/app/demo/…)
 *
 *  The unified player runs its "Web" player (Pixodesk JSON, pre-rendered SVG, lottie-web) in a
 *  `srcdoc` iframe sandboxed WITHOUT allow-same-origin — no script can look inside. It does post
 *  `{kind:'state', isPlaying}` to its host document (same-origin) while it plays, so the monitor
 *  listens for those messages on every player host window and classifies such a frame by
 *  sniffing the `srcdoc` attribute (lottie-web / pre-rendered SVG / Pixodesk JSON).
 *
 *  Blind spots: SVGs shown through <img> are opaque (counted separately as "img svg"); a
 *  cross-origin iframe cannot be inspected; a canvas without a 2D context (WebGL) is "unknown".
 *-----------------------------------------------------------------------------*/

const POLL_MS = 500;
const PANEL_ID = 'px-anim-monitor';

type Kind = 'preCss' | 'preJs' | 'preJs2d' | 'prePlayer' | 'jsonPlayer' | 'lottieWeb' | 'dotLottie' | 'other';

/** Where a document comes from decides what a bare <svg> in it means. */
type DocContext = 'page' | 'player' | 'demo';

interface Tally {
    /** Distinct animated roots (an <svg>, a lottie item, a canvas) with something playing. */
    playing: number;
    /** Distinct roots that carry animations at all. */
    roots: number;
    /** Animation objects currently running (CSS/WAAPI) or items playing (lottie). */
    running: number;
    /** Animation objects in total. */
    total: number;
    /** Roots driven by a frame loop (attribute writes), not by CSS/WAAPI. */
    frameLoop: number;
    /** Outermost <svg>s (or canvases / lottie items) of this kind found in the documents. */
    present: number;
}

export interface DocInfo {
    url: string;
    context: DocContext;
    svgs: number;
    canvases: number;
    lottieItems: number;
    animations: number;
}

export interface Snapshot {
    at: number;
    documents: number;
    imgSvg: number;
    kinds: Record<Kind, Tally>;
    docs: Array<DocInfo>;
    instances: Array<Instance>;
}

interface LottieItem { isPaused?: boolean; isLoaded?: boolean; wrapper?: Element | null; renderer?: { svgElement?: Element | null } }
interface LottieGlobal { getRegisteredAnimations?: () => Array<LottieItem> }

interface FrameState { at: number; playing: boolean }

/** The player's page-wide registry (`@pixodesk/svg-animator-web`: `getAllAnimators()`),
 *  as it hangs off `globalThis.__pixodeskAnimators` in a document that loaded the player. */
interface PxRegistryAnimator { isReady(): boolean; isPlaying(): boolean; getRootElement(): Element | null }
interface PxRegistry { getAll(): ReadonlyArray<PxRegistryAnimator>; subscribe(listener: () => void): () => void }

interface DocState {
    observer: MutationObserver;
    /** Last attribute write inside each outermost <svg>. */
    lastWrite: WeakMap<Element, number>;
    /** Last sampled row of each canvas. */
    canvasRow: WeakMap<HTMLCanvasElement, string>;
    /** Last `state` message from each child frame window (the sandboxed players). */
    frames: WeakMap<object, FrameState>;
    /** WAAPI animations already given finish/cancel listeners. */
    hooked: WeakSet<Animation>;
    /** The registry's unsubscribe, once found in this document. */
    unsubscribe?: () => void;
}

/** A refresh soon after an animation event — coalesced, so a burst is one repaint. */
let scheduled: number | undefined;
function scheduleTick(): void {
    if (scheduled !== undefined || timer === undefined) return;
    scheduled = window.setTimeout(() => { scheduled = undefined; tick(); }, 50);
}

/** The player protocol's marker on every event it posts to its host. */
const PREVIEW_EVENT_FLAG = '__pxPreviewEvt';
/** A frame that stopped posting for this long is not playing (states come every few frames). */
const FRAME_STATE_TTL_MS = 1500;

const docStates = new WeakMap<Document, DocState>();

function emptyTally(): Tally { return { playing: 0, roots: 0, running: 0, total: 0, frameLoop: 0, present: 0 }; }

/** A document's context from its URL; a `srcdoc` / `about:blank` frame (the unified player
 *  runs its "Web" player in one) has no path of its own and takes its parent's. */
function contextOf(doc: Document, parent: DocContext): DocContext {
    const href = doc.location?.href ?? '';
    if (!/^https?:/.test(href)) return parent;
    const path = doc.location.pathname;
    if (path.startsWith('/app/player/')) return 'player';
    if (path.startsWith('/app/demo/') || path.startsWith('/app/animator/')) return 'demo';
    return 'page';
}

/** The outermost <svg> around an element (an inlined pre-rendered SVG can nest <svg>s). */
function outermostSvg(el: Element | null): SVGSVGElement | null {
    let cur: SVGSVGElement | null = el ? el.closest('svg') : null;
    while (cur) {
        const up = cur.parentElement ? cur.parentElement.closest('svg') : null;
        if (!up) break;
        cur = up;
    }
    return cur;
}

interface DocEntry {
    doc: Document;
    context: DocContext;
    /** The <iframe> (in `parent.doc`) that hosts this document; none for the page itself. */
    hostFrame?: HTMLIFrameElement;
    parent?: DocEntry;
}

/** The page plus every same-origin iframe document, nested, each with its context and the
 *  chain of iframes that leads to it (what "scroll into view" has to scroll). */
function documentsOf(doc: Document, parent: DocEntry | undefined, hostFrame: HTMLIFrameElement | undefined, out: Array<DocEntry> = []): Array<DocEntry> {
    const entry: DocEntry = { doc, context: contextOf(doc, parent?.context ?? 'page'), hostFrame, parent };
    out.push(entry);
    for (const frame of Array.from(doc.querySelectorAll('iframe'))) {
        try {
            const inner = frame.contentDocument;
            if (inner && inner !== doc && inner.readyState !== 'loading') documentsOf(inner, entry, frame, out);
        } catch { /* cross-origin */ }
    }
    return out;
}

function stateFor(doc: Document): DocState {
    let st = docStates.get(doc);
    if (st) return st;
    const lastWrite = new WeakMap<Element, number>();
    const observer = new MutationObserver(records => {
        const now = performance.now();
        for (const r of records) {
            const root = outermostSvg(r.target instanceof Element ? r.target : null);
            if (root) lastWrite.set(root, now);
        }
    });
    observer.observe(doc.documentElement, { attributes: true, subtree: true });
    const frames = new WeakMap<object, FrameState>();
    doc.defaultView?.addEventListener('message', (e: MessageEvent) => {
        const data: unknown = e.data;
        if (!data || typeof data !== 'object' || !(PREVIEW_EVENT_FLAG in data)) return;
        const evt = data as { kind?: string; isPlaying?: boolean };
        // `e.source` is another realm's WindowProxy — never `instanceof` this realm's Window.
        const source: object | null = e.source && typeof e.source === 'object' ? e.source : null;
        if (evt.kind !== 'state' || !source) return;
        frames.set(source, { at: performance.now(), playing: evt.isPlaying === true });
    });
    // The native animation events: a CSS animation starting or ending anywhere in the document
    // repaints the panel now, not at the next poll. (Nothing fires on pause/resume — the poll.)
    for (const type of ['animationstart', 'animationend', 'animationcancel'] as const) {
        doc.addEventListener(type, scheduleTick, true);
    }
    st = { observer, lastWrite, canvasRow: new WeakMap(), frames, hooked: new WeakSet() };
    docStates.set(doc, st);
    return st;
}

/** The player's registry in this document, if the player that built it has one. */
function registryOf(doc: Document): PxRegistry | undefined {
    const reg = (doc.defaultView as (Window & { __pixodeskAnimators?: PxRegistry }) | null)?.__pixodeskAnimators;
    return reg && typeof reg.getAll === 'function' ? reg : undefined;
}

/** Which player a sandboxed `srcdoc` frame runs, from the markup the host gave it. */
function sandboxedFrameKind(frame: HTMLIFrameElement): Kind {
    const html = frame.getAttribute('srcdoc') ?? '';
    if (/bodymovin|loadAnimation\(|__lottie_element_/.test(html)) return 'lottieWeb';
    // A pre-rendered file brings its own CSS keyframes / embedded script / meta.
    if (/@keyframes|data-px-script|data-px-meta=|data-px-attrs=/.test(html)) return 'prePlayer';
    return 'jsonPlayer';
}

/** What an outermost <svg> is: a Pixodesk pre-rendered file (meta and/or embedded player),
 *  a 2D (Lottie Animator) export with its embedded player, lottie-web's own render, the
 *  Pixodesk player's render inside a player document, or a bare <svg>. */
function rootKindOf(root: SVGSVGElement, context: DocContext): 'pre' | 'preJs2d' | 'player' | 'lottieSvg' | 'bare' {
    if (root.hasAttribute('data-px-meta') || root.hasAttribute('data-px-attrs') || root.querySelector('script[data-px-script]')) return 'pre';
    if (root.querySelector('[id^="__lottie_element_"]')) return 'lottieSvg';   // lottie-web's SVG renderer
    if (root.querySelector('script')) return 'preJs2d';
    // The player UI's own icon <svg>s (transport bar) are not animations: no viewBox-sized
    // artwork, or inside a control.
    if (context === 'player') return isArtwork(root) ? 'player' : 'bare';
    return 'bare';
}

/** A Pixodesk pre-rendered file carries its CSS keyframes in its own <style>. */
function hasCssKeyframes(root: SVGSVGElement): boolean {
    return Array.from(root.querySelectorAll('style')).some(st => (st.textContent ?? '').includes('@keyframes'));
}

/** An <svg> that is artwork rather than an icon: not inside a control, and at least 48px. */
function isArtwork(root: SVGSVGElement): boolean {
    if (root.closest('button, a, nav, [role="button"], label')) return false;
    const r = root.getBoundingClientRect();
    return r.width >= 48 && r.height >= 48;
}

type Via = 'css' | 'waapi' | 'frame-loop' | 'idle';

/** The tally kind for an <svg> root, from what it is and HOW it is being animated. A Pixodesk
 *  pre-rendered file is "+ CSS" when its own keyframes run and "+ JS" when its embedded script
 *  drives it (WAAPI / frame loop); one driven from outside inside a player document is the
 *  player playing a pre-rendered file. Idle, it is sorted by what it carries. */
function kindFor(rk: ReturnType<typeof rootKindOf>, root: SVGSVGElement, via: Via, context: DocContext): Kind {
    if (rk === 'preJs2d') return 'preJs2d';
    if (rk === 'lottieSvg') return 'lottieWeb';
    if (rk === 'player') return 'jsonPlayer';
    if (rk === 'bare') return 'other';
    if (via === 'css') return 'preCss';
    if (via === 'idle') return hasCssKeyframes(root) ? 'preCss' : 'preJs';
    if (root.querySelector('script')) return 'preJs';
    return context === 'player' ? 'prePlayer' : 'preJs';
}

function isVisible(el: Element): boolean {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
}

/** One sampled pixel row, as a short string — enough to see whether a frame changed. */
function canvasRowSignature(canvas: HTMLCanvasElement): string | null {
    try {
        const ctx = canvas.getContext('2d');
        if (!ctx || !canvas.width || !canvas.height) return null;
        const row = ctx.getImageData(0, Math.floor(canvas.height / 2), canvas.width, 1).data;
        let sig = '';
        for (let i = 0; i < row.length; i += Math.max(4, Math.floor(row.length / 64))) sig += row[i].toString(36);
        return sig;
    } catch { return null; }
}

/** One animated thing on the page: an <svg> root, a lottie-web item, a canvas, a sandboxed
 *  player frame — or, for page UI, the animated element itself. */
export interface Instance {
    kind: Kind;
    /** Position among all instances of this kind, in document order (stable while others start/stop). */
    n: number;
    /** `js2`, `lottie1`, … */
    label: string;
    el: Element;
    entry: DocEntry;
    playing: boolean;
    /** How it is being driven: `css`, `waapi`, `frame-loop`, `registry`, `canvas`, `state msg`. */
    via: string;
}

const ABBR: Record<Kind, string> = {
    preCss: 'css', preJs: 'js', preJs2d: '2d', jsonPlayer: 'json', prePlayer: 'pre',
    lottieWeb: 'lottie', dotLottie: 'dotlottie', other: 'other',
};

export function snapshot(): Snapshot {
    const now = performance.now();
    const kinds: Record<Kind, Tally> = {
        preCss: emptyTally(), preJs: emptyTally(), preJs2d: emptyTally(), prePlayer: emptyTally(), jsonPlayer: emptyTally(),
        lottieWeb: emptyTally(), dotLottie: emptyTally(), other: emptyTally(),
    };
    const docs = documentsOf(document, undefined, undefined);
    const docInfos: Array<DocInfo> = [];
    const instances: Array<Instance> = [];
    let imgSvg = 0;

    // Numbered later, once every instance is known; `n`/`label` are placeholders here.
    const add = (kind: Kind, el: Element, entry: DocEntry, playing: boolean, via: string): void => {
        instances.push({ kind, n: 0, label: '', el, entry, playing, via });
    };

    for (const entry of docs) {
        const { doc, context } = entry;
        const st = stateFor(doc);
        const win = doc.defaultView;
        const info: DocInfo = { url: doc.location?.href?.replace(/^https?:\/\/[^/]+/, '') ?? '?', context, svgs: 0, canvases: 0, lottieItems: 0, animations: 0 };
        docInfos.push(info);

        // ── lottie-web: its registry, and its own <svg>/<canvas> roots (excluded from the rest)
        const lottieRoots = new Set<Element>();
        const lottie: LottieGlobal | undefined = win ? (win as Window & { lottie?: LottieGlobal; bodymovin?: LottieGlobal }).lottie
            ?? (win as Window & { bodymovin?: LottieGlobal }).bodymovin : undefined;
        const items = lottie?.getRegisteredAnimations?.() ?? [];
        info.lottieItems = items.length;
        for (const item of items) {
            const playing = item.isLoaded !== false && item.isPaused === false;
            kinds.lottieWeb.total++;
            if (playing) kinds.lottieWeb.running++;
            const el = item.renderer?.svgElement ?? item.wrapper;
            if (el) { lottieRoots.add(el); add('lottieWeb', el, entry, playing, 'registry'); }
        }
        const underLottie = (el: Element | null): boolean => {
            for (let cur = el; cur; cur = cur.parentElement) if (lottieRoots.has(cur)) return true;
            return false;
        };

        // ── the Pixodesk player's own registry: exact, event-driven, and it knows its roots
        const registered = new Set<Element>();
        const reg = registryOf(doc);
        if (reg) {
            if (!st.unsubscribe) st.unsubscribe = reg.subscribe(scheduleTick);
            for (const a of reg.getAll()) {
                const root = a.getRootElement();
                if (!root || !a.isReady()) continue;                  // still loading, or failed
                const outer = outermostSvg(root) ?? root;
                registered.add(outer);
                const isPre = outer.hasAttribute('data-px-meta') || outer.hasAttribute('data-px-attrs');
                add(isPre ? 'prePlayer' : 'jsonPlayer', outer, entry, a.isPlaying(), 'registry');
            }
        }
        const underRegistered = (el: Element | null): boolean => {
            for (let cur = el; cur; cur = cur.parentElement) if (registered.has(cur)) return true;
            return false;
        };

        // ── CSS + WAAPI animations, attributed to their outermost <svg> (or, outside any, the target)
        const seen = new Map<Element, { kind: Kind; playing: boolean; via: string }>();
        let anims: Array<Animation> = [];
        try { anims = doc.getAnimations(); } catch { /* not supported */ }
        info.animations = anims.length;
        for (const anim of anims) {
            // A WAAPI animation ending is an event too — hook it once.
            if (!st.hooked.has(anim)) {
                st.hooked.add(anim);
                try { anim.addEventListener('finish', scheduleTick); anim.addEventListener('cancel', scheduleTick); } catch { /* not an EventTarget */ }
            }
            // `effect.target` lives on KeyframeEffect; the class is per-realm, so duck-type it.
            const effect = anim.effect as (AnimationEffect & { target?: Element | null }) | null;
            const target = effect?.target ?? null;
            if (!target || underLottie(target) || underRegistered(target)) continue;
            const byCss = anim.constructor.name === 'CSSAnimation' || anim.constructor.name === 'CSSTransition';
            const root = outermostSvg(target);
            const via: Via = byCss ? 'css' : 'waapi';
            const kind: Kind = context === 'demo' || !root ? 'other' : kindFor(rootKindOf(root, context), root, via, context);
            const running = anim.playState === 'running';
            kinds[kind].total++;
            if (running) kinds[kind].running++;
            const key: Element = root ?? target;
            const prev = seen.get(key);
            if (!prev) seen.set(key, { kind, playing: running, via });
            else if (running) prev.playing = true;
        }

        // ── every outermost <svg>: present, and playing by CSS/WAAPI or by frame loop
        //    (attributes written during the last poll without any CSS/WAAPI animation running).
        for (const root of Array.from(doc.querySelectorAll('svg'))) {
            if (root.parentElement?.closest('svg')) continue;          // only outermost
            if (underLottie(root) || underRegistered(root) || !isVisible(root)) continue;
            const rk = rootKindOf(root, context);
            const s = seen.get(root);
            if (context === 'demo' || (rk === 'bare' && !s)) continue; // the editor demo, plain static SVG
            info.svgs++;
            const last = st.lastWrite.get(root);
            const frameLoop = !s?.playing && last !== undefined && now - last <= POLL_MS * 1.5;
            const via: Via = frameLoop ? 'frame-loop' : s?.playing ? (s.via as Via) : 'idle';
            const kind: Kind = s?.playing ? s.kind : kindFor(rk, root, via, context);
            if (frameLoop) kinds[kind].frameLoop++;
            add(kind, root, entry, !!s?.playing || frameLoop, via);
            seen.delete(root);
        }
        // Page UI animations that sit on no <svg> at all.
        for (const [el, v] of seen) if (!(el instanceof SVGElement)) add('other', el, entry, v.playing, v.via);

        // ── dotLottie (and any other canvas animation): pixels changed since the last poll
        for (const canvas of Array.from(doc.querySelectorAll('canvas'))) {
            if (!isVisible(canvas) || underLottie(canvas) || context === 'demo') continue;
            info.canvases++;
            kinds.dotLottie.total++;
            const sig = canvasRowSignature(canvas);
            const prev = sig === null ? undefined : st.canvasRow.get(canvas);
            if (sig !== null) st.canvasRow.set(canvas, sig);
            const playing = sig !== null && prev !== undefined && prev !== sig;
            if (playing) kinds.dotLottie.running++;
            add('dotLottie', canvas, entry, playing, sig === null ? 'canvas (no 2d ctx)' : 'canvas');
        }

        // ── sandboxed child frames (the unified player's "Web" player): known only through the
        //    `state` messages they post to this document.
        for (const frame of Array.from(doc.querySelectorAll('iframe'))) {
            let reachable = false;
            try { reachable = !!frame.contentDocument; } catch { /* cross-origin */ }
            if (reachable || !frame.contentWindow || !isVisible(frame)) continue;
            const kind = sandboxedFrameKind(frame);
            kinds[kind].total++;
            const fs = st.frames.get(frame.contentWindow);
            const playing = !!fs && fs.playing && now - fs.at < FRAME_STATE_TTL_MS;
            if (playing) kinds[kind].running++;
            add(kind, frame, entry, playing, 'state msg');
        }

        imgSvg += Array.from(doc.querySelectorAll('img')).filter(i => /\.svg(\?|$)/i.test(i.getAttribute('src') ?? '')).length;
    }

    // Number within each kind, in document order; tallies follow from the instances.
    const counters: Partial<Record<Kind, number>> = {};
    for (const i of instances) {
        i.n = (counters[i.kind] ?? 0) + 1;
        counters[i.kind] = i.n;
        i.label = ABBR[i.kind] + i.n;
        kinds[i.kind].present++; kinds[i.kind].roots++;
        if (i.playing) kinds[i.kind].playing++;
    }

    return { at: Date.now(), documents: docs.length, imgSvg, kinds, docs: docInfos, instances };
}

const LABELS: Record<Kind, string> = {
    preCss: 'pre-rendered SVG + CSS keyframes',
    preJs: 'pre-rendered SVG + JS (Pixodesk player)',
    preJs2d: 'pre-rendered SVG + JS (2D animator export)',
    jsonPlayer: 'lightweight JSON + Pixodesk player',
    prePlayer: 'pre-rendered SVG in Pixodesk player',
    lottieWeb: 'Lottie (lottie-web)',
    dotLottie: 'Lottie (dotLottie / canvas)',
    other: 'other (page UI, plain SVG)',
};

/** The playing chips as text: `js1 js2 lottie1`, or `no animation`. */
export function renderLine(s: Snapshot): string {
    const chips = s.instances.filter(i => i.playing).map(i => i.label);
    return chips.length ? chips.join(' ') : 'no animation';
}

/** `● label   playing / present   (running/total anim objects, frame-loop roots)` */
function formatLine(kind: Kind, t: Tally): string {
    const parts: Array<string> = [];
    if (kind !== 'lottieWeb' && kind !== 'dotLottie') parts.push(`${t.running}/${t.total} anims`);
    if (t.frameLoop) parts.push(`${t.frameLoop} frame-loop`);
    const marker = t.playing ? '●' : '○';
    return `${marker} ${LABELS[kind].padEnd(44)} ${String(t.playing).padStart(2)} / ${String(t.present).padEnd(2)} playing${parts.length ? '  (' + parts.join(', ') + ')' : ''}`;
}

/** The full breakdown (behind `⋯`, and `__pxAnimMonitor.report()`). */
export function render(s: Snapshot): string {
    const lines = [
        `${renderLine(s)}   · ${s.documents} document(s) · poll ${POLL_MS}ms · ${new Date(s.at).toLocaleTimeString()}`,
        '  playing / present  (present = animations of that kind on the page, playing or not)',
        ...(Object.keys(LABELS) as Array<Kind>).map(k => formatLine(k, s.kinds[k])),
        ...s.instances.map(i => `    ${(i.playing ? '▶ ' : '  ') + i.label.padEnd(11)} ${i.via.padEnd(11)} <${i.el.tagName.toLowerCase()}${i.el.id ? '#' + i.el.id : ''}>  in ${i.entry.doc.location?.pathname ?? '?'}`),
    ];
    if (s.imgSvg) lines.push(`  <img> svg (opaque, not inspectable): ${s.imgSvg}`);
    for (const d of s.docs) lines.push(`  ${d.context.padEnd(6)} ${d.url.slice(0, 70)}  svg:${d.svgs} canvas:${d.canvases} lottie:${d.lottieItems} anims:${d.animations}`);
    return lines.join('\n');
}

/** Scrolls an instance into view — inside its own document, then every iframe on the way up
 *  to the page — and flashes an outline on it (and on the outermost iframe, when there is one). */
export function reveal(i: Instance): void {
    const chain: Array<Element> = [i.el];
    for (let e: DocEntry | undefined = i.entry; e?.hostFrame; e = e.parent) chain.push(e.hostFrame);
    for (const el of chain) {
        try { el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' }); } catch { /* detached */ }
    }
    flash(i.el);
    if (chain.length > 1) flash(chain[chain.length - 1]);
}

function flash(el: Element): void {
    if (!(el instanceof HTMLElement || el instanceof SVGElement)) return;
    const style = el.style;
    const prev = { outline: style.outline, offset: style.outlineOffset, transition: style.transition };
    style.outline = '3px solid #4c8dff';
    style.outlineOffset = '2px';
    window.setTimeout(() => { style.outline = prev.outline; style.outlineOffset = prev.offset; style.transition = prev.transition; }, 1500);
}

let timer: number | undefined;
let expanded = false;
let last: Snapshot | undefined;
let lastChips = '';

function panel(): HTMLElement {
    let el = document.getElementById(PANEL_ID);
    if (el) return el;
    el = document.createElement('div');
    el.id = PANEL_ID;
    el.title = 'animations playing (dev monitor) — click a chip to scroll to it, ⋯ for the breakdown';
    el.style.cssText = 'position:fixed;left:6px;bottom:6px;z-index:2147483647;margin:0;padding:2px 6px;'
        + 'font:10px/1.4 ui-monospace,Menlo,monospace;color:#bbb;background:rgba(0,0,0,.55);'
        + 'border-radius:4px;white-space:pre;cursor:default;pointer-events:auto;max-width:96vw;overflow:auto;opacity:.85';
    document.body.appendChild(el);
    return el;
}

function chip(text: string, title: string, onClick: () => void): HTMLSpanElement {
    const c = document.createElement('span');
    c.textContent = text;
    c.title = title;
    c.style.cssText = 'cursor:pointer;margin-right:7px;text-decoration:underline dotted;color:#cfc';
    c.addEventListener('click', e => { e.stopPropagation(); onClick(); });
    return c;
}

function tick(): void {
    if (document.hidden) return;
    const s = snapshot();
    last = s;
    const el = panel();
    const playing = s.instances.filter(i => i.playing);
    const key = playing.map(i => i.label).join(' ') + (expanded ? ' +' : '');
    if (key !== lastChips) {
        // Rebuild the chips only when the set changed (keeps hovers/clicks stable between polls).
        lastChips = key;
        el.replaceChildren();
        if (!playing.length) el.append('no animation ');
        for (const i of playing) el.append(chip(i.label, `${LABELS[i.kind]} · ${i.via} — click to scroll into view`, () => reveal(i)));
        el.append(chip('⋯', 'breakdown', () => { expanded = !expanded; lastChips = ''; tick(); }));
        if (expanded) { const pre = document.createElement('pre'); pre.id = PANEL_ID + '-detail'; pre.style.cssText = 'margin:4px 0 0;color:#aaa'; el.append(pre); }
    } else {
        // Same chips: keep the click targets pointing at THIS snapshot's elements.
        let k = 0;
        for (const c of Array.from(el.querySelectorAll('span'))) {
            if (c.textContent === '⋯') continue;
            const i = playing[k++];
            if (i) c.onclick = e => { e.stopPropagation(); reveal(i); };
        }
    }
    const detail = document.getElementById(PANEL_ID + '-detail');
    if (detail) detail.textContent = render(s);
}

export function start(): void {
    if (timer !== undefined) return;
    tick();
    timer = window.setInterval(tick, POLL_MS);
}

export function stop(): void {
    if (timer !== undefined) { clearInterval(timer); timer = undefined; }
    if (scheduled !== undefined) { clearTimeout(scheduled); scheduled = undefined; }
    lastChips = '';
    document.getElementById(PANEL_ID)?.remove();
}

function enabled(): boolean {
    const q = new URLSearchParams(location.search).get('pxdebug');
    if (q === '0') return false;
    if (q === '1') return true;
    return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
}

declare global {
    interface Window {
        __pxAnimMonitor?: {
            snapshot: () => Snapshot; report: () => string; reveal: (label: string) => boolean;
            start: () => void; stop: () => void;
        };
    }
}

if (enabled()) {
    window.__pxAnimMonitor = {
        snapshot,
        report: () => render(snapshot()),
        // `reveal('js2')` from the console — any instance, playing or not.
        reveal: (label: string) => { const i = (last ?? snapshot()).instances.find(x => x.label === label); if (i) reveal(i); return !!i; },
        start, stop,
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
    // Astro view transitions swap the body: put the panel back.
    document.addEventListener('astro:page-load', () => { stop(); start(); });
}
