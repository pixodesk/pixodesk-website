# pixodesk-website

The pixodesk.com site (Astro + Starlight). `yarn dev` · `yarn build`.

## The documentation, and where it lives

Public docs are served under `/docs`, split per application, with a cards landing
at [/docs](https://pixodesk.com/docs):

| Docs | URL | Source of truth |
|---|---|---|
| **SVG Animator — editor manual** | `/docs/svga` + `/docs/svga/editor/…` | authored here: `src/content/docs/svga/editor/` (includes the former player-repo *start* pages: how-it-fits-together, playback-settings, choosing-a-format) |
| **SVG Animator — player library** | `/docs/svga/player-library/…` | **synced** from `pixodesk-svg-animator/docs/library` |
| **SVG Animator — JSON format** | `/docs/svga/format` | **synced** from `pixodesk-svg-animator/docs/format` |
| **SVG Animator — pre-rendered SVG** | `/docs/svga/prerendered-svg/…` | authored here: `src/content/docs/svga/prerendered-svg/` (moved out of the player repo — only JSON concerns the player library) |
| **Lottie Animator** | `/docs/2d-lottie/…` | authored here: `src/content/docs/2d-lottie/` |

The player-repo docs (`library/`, `format/`) stay in that repo because they are read
on GitHub next to the packages; `yarn sync:svga-docs` copies them in from the local
sibling checkout (`yarn sync:svga-docs:github` pulls GitHub main instead — pushed
state only). The synced copy is committed; the build never runs the sync. Details:
`scripts/sync-svga-docs.mjs`.

Sidebar and section structure are generated from the content folders
(`src/plugins/docs-sidebar.mjs`); relative links in the synced pages are resolved
to site routes at render time (`src/plugins/remark-svga-doc-links.mjs`); per-app
sidebar filtering lives in `src/routeData.ts`.

## Animations on the pages: play only when in view

Every animation inlined into a page (`?raw` imports of `public/assets/**`) must start only once at least
**50 %** of it is in the viewport, and must not run while it is off-screen. Nothing may start "on load".

| Kind | Where the rule lives | How to check a file |
|---|---|---|
| Pixodesk SVG + CSS export | `data-px-meta` `trigger:{startOn:'scrollIntoView',scrollIntoViewThreshold:0.5}` **and** the export's own `<script data-px-script>` (`startOnScrollIntoView(id, 0.5)`); the root must NOT carry a static `_px_animate` class | root has an `id`, the script names that id |
| Pixodesk SVG + JS export | same meta; the embedded runtime reads it (`outAction: pause`) | `"startOn":"scrollIntoView"` in the script |
| Lottie Animator (2D) SVG + JS export | the export's own `whenVisible` starts at the first visible pixel and only re-checks on scroll, so the file's `loadAnimation` call is wrapped: `"st":"none"` + a `startOnScrollIntoView(handle, id, 0.5)` IntersectionObserver (see the tail of `assets/lottie/sections/easing.svg`) | one `Visibility gate (website)` block per file |
| Unified player embeds (Pixodesk JSON, Lottie, dotLottie, pre-rendered) | inside the player itself (`playWhenVisible.ts` in the private `unified-preview-player`, published by `yarn website:player`) — no page-side code | scroll an embed off-screen: its transport shows paused |

A re-exported file loses the rule unless the export was made with the scroll-into-view trigger (Pixodesk) — for a
2D export, re-apply the wrapper. `astro dev` shows what is playing in the bottom-left monitor (`src/scripts/px-anim-monitor.ts`).
