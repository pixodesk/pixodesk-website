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
| **2D Animator (Lottie)** | `/docs/2d-lottie/…` | authored here: `src/content/docs/2d-lottie/` |

The player-repo docs (`library/`, `format/`) stay in that repo because they are read
on GitHub next to the packages; `yarn sync:svga-docs` copies them in from the local
sibling checkout (`yarn sync:svga-docs:github` pulls GitHub main instead — pushed
state only). The synced copy is committed; the build never runs the sync. Details:
`scripts/sync-svga-docs.mjs`.

Sidebar and section structure are generated from the content folders
(`src/plugins/docs-sidebar.mjs`); relative links in the synced pages are resolved
to site routes at render time (`src/plugins/remark-svga-doc-links.mjs`); per-app
sidebar filtering lives in `src/routeData.ts`.
