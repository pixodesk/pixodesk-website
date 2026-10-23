/**
 * Mini scenes (new-design/schemas.ts `MiniScene`): an `svg[data-mini-scene]` holding one SMIL clock (`[data-clock]`). It plays once when
 * half in view (play-in-view.ts) and again when the pointer enters its diagram node; under reduced motion it keeps its end state
 * (the scene at rest) unless hovered.
 */
import { onceInView } from "./play-in-view";

const play = (svg: Element) => { const clock = svg.querySelector("[data-clock]"); if (clock instanceof SVGAnimationElement) clock.beginElement(); };
document.querySelectorAll("svg[data-mini-scene]").forEach((svg) => {
  onceInView(svg, () => play(svg));
  svg.closest("[data-node]")?.addEventListener("mouseenter", () => play(svg));
});
