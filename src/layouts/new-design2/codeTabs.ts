/**
 * The code tabs: how a saved file gets into a project (owner, 2026-10-17: Frameworks merged into Where it plays).
 * - SVG Animator: one tab per place in the Where it plays diagram, in its order (React, Vue, React Native, Web page — labels and glyphs from
 *   diagramNodes, so the tabs are the diagram's right-hand column); the code is the quick-start videos' code and the player docs'.
 * - 2D Animator: the four Lottie players our quick-start videos use (kf tests/video/scripts/quick-start-*.2da.data).
 * - SVG Editor: a static SVG is an ordinary web image — three ways in (its own Frameworks section).
 */
import type { TabInfo } from "../new-design/tabs";
import { PLACES, PlaceKey } from "./diagramNodes";

export interface CodeTab extends TabInfo { lang: "tsx" | "vue" | "html" | "xml" | "bash"; code: string; note?: string; docs?: { label: string; href: string } }
const place = (k: PlaceKey) => ({ id: k, label: PLACES[k].label, glyph: PLACES[k].glyph });

export const SVGA_TABS: Array<CodeTab> = [
  { ...place(PlaceKey.react), hint: "component + ref", lang: "tsx",
    note: "Save as <b>JSON</b>, install one package, render the file. The component plays the document's own trigger and gives you play, pause and seek through a ref.",
    code: `// npm install @pixodesk/svg-animator-react
import { SvgAnimationPlayer } from '@pixodesk/svg-animator-react';
import animation from './animation.json';

export function Hero() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <SvgAnimationPlayer doc={animation} playOnTrigger />
    </div>
  );
}`,
    docs: { label: "Get started with the player library", href: "/docs/svga/player-library/get-started" } },
  { ...place(PlaceKey.vue), hint: "component + ref", lang: "vue",
    note: "The same component for Vue 3.",
    code: `<!-- npm install @pixodesk/svg-animator-vue -->
<script setup>
import { SvgAnimationPlayer } from '@pixodesk/svg-animator-vue';
import animation from './animation.json';
</script>

<template>
  <div style="width: 300px; height: 300px">
    <SvgAnimationPlayer :doc="animation" playOnTrigger />
  </div>
</template>`,
    docs: { label: "Vue component", href: "/docs/svga/player-library/vue" } },
  { ...place(PlaceKey.rn), hint: "in development", lang: "tsx",
    note: "In development — the API may still change. It draws with <b>react-native-svg</b> and <b>react-native-reanimated</b>.",
    code: `// npm install @pixodesk/svg-animator-rn
// npx expo install react-native-svg react-native-reanimated
import { View } from 'react-native';
import { SvgAnimationPlayer } from '@pixodesk/svg-animator-rn';
import animation from './animation.json';

export function Hero() {
  return (
    <View style={{ width: 300, height: 300 }}>
      <SvgAnimationPlayer doc={animation} playOnTrigger />
    </View>
  );
}`,
    docs: { label: "React Native", href: "/docs/svga/player-library/react-native" } },
  { ...place(PlaceKey.web), hint: "pre-rendered .svg, or the web player", lang: "html",
    note: "A <b>pre-rendered .svg</b> needs nothing: put its markup in the page (your framework can inline it when the site is built) or show the file in an <b>&lt;iframe&gt;</b>. The <b>Pixodesk JSON</b> plays with the web player: one command copies it into your site, one script tag loads it.",
    code: `<!-- the pre-rendered .svg: nothing to install -->
<iframe src="ball.svg" width="300" height="300" title="A bouncing ball" style="border: none"></iframe>

<!-- or the Pixodesk JSON, with the web player (npx @pixodesk/svg-animator-web copy-player-library) -->
<div data-px-animation-src="animation.json" style="width: 300px; height: 300px"></div>
<script src="pixodesk-svg-animator.umd.min.js"></script>
<script>Pixodesk.SvgAnimator.createSvgAnimationPlayersFromPage();</script>`,
    docs: { label: "Pre-rendered SVG on the web", href: "/docs/svga/prerendered-svg/on-the-web" } },
];

const lottieDocs = { label: "Add a Lottie animation to your project", href: "/animator/lottie-animation" };
export const LOTTIE_TABS: Array<CodeTab> = [
  { id: "lottie-react", label: "React", hint: "lottie-react", glyph: "code", lang: "tsx",
    note: "Save as <b>Lottie JSON</b>, install one package, render the file.",
    code: `// npm install lottie-react
import { Lottie } from 'lottie-react';
import animation from './animation.json';

export function App() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie src={animation} autoplay loop />
    </div>
  );
}`, docs: lottieDocs },
  { id: "dotlottie-react", label: "React (.lottie)", hint: "@lottiefiles/dotlottie-react", glyph: "code", lang: "tsx",
    note: "Save as <b>.lottie</b> — the compact zipped format — and point the component at it.",
    code: `// npm install @lottiefiles/dotlottie-react
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function App() {
  return (
    <DotLottieReact src="/animation.lottie" loop autoplay
      style={{ width: 300, height: 300 }} />
  );
}`, docs: lottieDocs },
  { id: "lottie-web", label: "Plain HTML", hint: "lottie-web, no build", glyph: "browser", lang: "html",
    note: "No bundler: load lottie-web with a script tag and name the JSON file.",
    code: `<div id="ball" style="width: 300px; height: 300px"></div>

<script src="lottie.min.js"></script>
<script>
  lottie.loadAnimation({
    container: document.getElementById('ball'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation.json',
  });
</script>`, docs: lottieDocs },
  { id: "dotlottie-web", label: "JavaScript", hint: "@lottiefiles/dotlottie-web, canvas", glyph: "code", lang: "tsx",
    note: "A canvas and four lines of JavaScript.",
    code: `// npm install @lottiefiles/dotlottie-web
import { DotLottie } from '@lottiefiles/dotlottie-web';

new DotLottie({
  canvas: document.querySelector('#ball'),
  src: '/animation.lottie',
  loop: true,
  autoplay: true,
});`, docs: lottieDocs },
];

export const SVG_TABS: Array<CodeTab> = [
  { id: "img", label: "Image", hint: "<img>, cached", glyph: "browser", lang: "html",
    note: "The simplest: an image tag. The browser caches it; the page's CSS does not reach inside it.",
    code: `<img src="icon.svg" alt="Weather" width="64" height="64">` },
  { id: "inline", label: "Inline", hint: "markup in the page", glyph: "code", lang: "html",
    note: "Paste the file's markup into the page — or let your framework inline it — and the page's CSS can style it (for example <b>fill: currentColor</b>).",
    code: `<button class="weather">
  <svg viewBox="0 0 64 64" width="24" height="24" aria-hidden="true">
    <!-- the file's content -->
  </svg>
  Weather
</button>` },
  { id: "css", label: "CSS background", hint: "url() in a stylesheet", glyph: "file", lang: "html",
    note: "As a background: decoration that scales with the box.",
    code: `<style>
  .hero { background: url(pattern.svg) center / cover no-repeat; }
</style>
<section class="hero">…</section>` },
];
