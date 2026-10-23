/**
 * Diagrams of nodes joined by glowing wires (new-design2 home: the decision tree, how it fits together). A `[data-diagram]` container
 * holds `[data-node]` elements and an `svg.wires`; `data-edges` = JSON [from, to, kind?] triples. The wires are drawn from the nodes'
 * positions — left → right when the target sits to the right, top → bottom otherwise (the same markup as columns on desktop, a column on
 * phones) — and redrawn on resize. Hovering a node lights everything connected to it (its way in and its way on) and dims the rest;
 * what it reaches only through a secondary route is marked limited.
 */
import { playInView } from "./play-in-view";

const SVG_NS = "http://www.w3.org/2000/svg";

/** An edge's kind; none = a main wire. */
export enum WireKind {
  /** a secondary route (an export): a faint wire; what is reached only through it traces as limited */
  secondary = "secondary",
  /** a node inside a group: no wire, followed when tracing */
  inner = "inner",
}
type Edge = [string, string, WireKind?];
/** How a traced node or wire is connected to the hovered node (its class). */
enum TraceClass { full = "lit", limited = "limited" }

function wire(diagram: HTMLElement): void {
  const svg = diagram.querySelector("svg.wires");
  const edges: Array<Edge> = JSON.parse(diagram.dataset.edges ?? "[]");
  const node = (id: string) => diagram.querySelector<HTMLElement>(`[data-node="${id}"]`);
  const flows = new Map<string, SVGPathElement>();
  const draw = () => {
    if (!svg) return;
    svg.querySelectorAll("path").forEach((p) => p.remove());
    flows.clear();
    const box = diagram.getBoundingClientRect();
    for (const [from, to, kind] of edges) {
      if (kind === WireKind.inner) continue;
      const a = node(from)?.getBoundingClientRect(), b = node(to)?.getBoundingClientRect();
      if (!a || !b) continue;
      const across = b.left >= a.right - 1;
      const [x1, y1, x2, y2] = across
        ? [a.right - box.left, a.top + a.height / 2 - box.top, b.left - box.left, b.top + b.height / 2 - box.top]
        : [a.left + a.width / 2 - box.left, a.bottom - box.top, b.left + b.width / 2 - box.left, b.top - box.top];
      const d = across ? `M${x1},${y1}C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}` : `M${x1},${y1}C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`;
      for (const cls of ["base", "flow"]) {
        const p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", d); p.classList.add(cls); if (kind) p.classList.add(kind); svg.appendChild(p);
        if (cls === "flow") flows.set(`${from}>${to}`, p);
      }
    }
  };
  // the edges connected to a node one way; `viaSecondary: false` = only along paths that never take a secondary route
  const reach = (start: string, forward: boolean, viaSecondary: boolean, out: Set<string>) => {
    for (const [from, to, kind] of edges) {
      const [here, next] = forward ? [from, to] : [to, from];
      const key = `${from}>${to}`;
      if (here !== start || out.has(key) || (!viaSecondary && kind === WireKind.secondary)) continue;
      out.add(key);
      reach(next, forward, viaSecondary, out);
    }
    return out;
  };
  const both = (id: string, viaSecondary: boolean) => reach(id, true, viaSecondary, reach(id, false, viaSecondary, new Set<string>()));
  const ends = (keys: Set<string>) => new Set([...keys].flatMap((key) => key.split(">")));
  // full = connected without a secondary route (class lit); limited = only through one (class limited)
  const light = (id: string | null) => {
    for (const cls of [TraceClass.full, TraceClass.limited]) {
      flows.forEach((p) => p.classList.remove(cls));
      diagram.querySelectorAll(`.${cls}`).forEach((n) => n.classList.remove(cls));
    }
    diagram.classList.toggle("tracing", id !== null);
    if (!id) return;
    const full = both(id, false), all = both(id, true);
    const fullNodes = ends(full).add(id);
    const traceClass = (isFull: boolean) => (isFull ? TraceClass.full : TraceClass.limited);
    all.forEach((key) => flows.get(key)?.classList.add(traceClass(full.has(key))));
    ends(all).add(id).forEach((n) => node(n)?.classList.add(traceClass(fullNodes.has(n))));
  };
  // the innermost node under the pointer (a node inside a group traces itself, not the group); a gap clears the trace
  let current: string | null = null;
  const traceAt = (target: EventTarget | null) => {
    const id = (target instanceof Element ? target.closest<HTMLElement>("[data-node]") : null)?.dataset.node ?? null;
    if (id !== current) { current = id; light(id); }
  };
  diagram.addEventListener("mouseover", (e) => traceAt(e.target));
  diagram.addEventListener("mouseleave", () => traceAt(null));
  draw();
  new ResizeObserver(draw).observe(diagram);
  // the wires flow only while the diagram is on screen (play-in-view.ts)
  playInView(diagram);
}

/** Wires every `[data-diagram]` on the page. */
export function wireAll(): void {
  document.querySelectorAll<HTMLElement>("[data-diagram]").forEach(wire);
}
