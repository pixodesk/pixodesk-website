// Copy-paste code samples for the new-design /svg-animator page.
//
// These live in a .ts module, not in the .astro page, on purpose. Vite's
// dependency pre-bundling scanner (dev only) treats .astro as an HTML type and
// regex-scans the raw file for <script> tags, so the <script setup> and
// <script src="..."> *inside these sample strings* were picked up as real
// imports and reported as unresolved dependencies. A .ts file is parsed as
// JavaScript, so the samples stay plain strings.

export const codeTabs = [
  {
    id: "react", label: "React", hint: "component + ref", glyph: "code" as const, lang: "tsx" as const,
    note: "Save as <b>JSON</b>, install one package, render the file. The component plays the document's own trigger and gives you play, pause and seek through a ref.",
    code: `// npm install @pixodesk/svg-animator-react
import { PixodeskSvgAnimator } from '@pixodesk/svg-animator-react';
import animation from './animation.json';

export function Hero() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <PixodeskSvgAnimator doc={animation} autoplay />
    </div>
  );
}`,
    docs: { label: "Get started with the player library", href: "/docs/svga/player-library/get-started" },
  },
  {
    id: "vue", label: "Vue", hint: "component + ref", glyph: "code" as const, lang: "vue" as const,
    note: "The same component for Vue 3.",
    code: `<!-- npm install @pixodesk/svg-animator-vue -->
<script setup>
import { PixodeskSvgAnimator } from '@pixodesk/svg-animator-vue';
import animation from './animation.json';
</script>

<template>
  <div style="width: 300px; height: 300px">
    <PixodeskSvgAnimator :doc="animation" autoplay />
  </div>
</template>`,
    docs: { label: "Vue component", href: "/docs/svga/player-library/vue" },
  },
  {
    id: "html", label: "Plain HTML", hint: "one script tag, no build", glyph: "browser" as const, lang: "html" as const,
    note: "No bundler: copy the player library into your site with <b>one command</b>, then load it with a script tag and name the JSON file on an element.",
    code: `<!-- npx @pixodesk/svg-animator-web copy-player-library -->
<div data-px-animation-src="animation.json" style="width: 300px; height: 300px"></div>

<script src="pixodesk-svg-animator.umd.min.js"></script>
<script>PixodeskAnimator.loadTagAnimators();</script>`,
    docs: { label: "Web player", href: "/docs/svga/player-library/web-player" },
  },
  {
    id: "svg", label: "Pre-rendered SVG", hint: "no code — inline the file", glyph: "file" as const, lang: "html" as const,
    note: "Save as <b>SVG + CSS animation</b> and put the file's markup in the page: your framework inlines it when the site is built (Astro, Next.js, Hugo, Eleventy…), or paste it. No build step? An <b>&lt;iframe&gt;</b> shows it too, though the page cannot reach into it. Not an <b>&lt;img&gt;</b> — an image runs no triggers.",
    code: `<!-- Astro, src/pages/index.astro: the file inlined when the site is built -->
---
import ball from '../assets/ball.svg?raw';
---
<div class="ball" set:html={ball} />

<!-- no build step: the file in its own frame -->
<iframe src="ball.svg" width="300" height="300" title="A bouncing ball" style="border: none"></iframe>`,
    docs: { label: "Pre-rendered SVG on the web", href: "/docs/svga/prerendered-svg/on-the-web" },
  },
];
