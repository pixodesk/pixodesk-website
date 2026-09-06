# Public documentation review — 2026-09-06

> **Status update (later the same day):** issues **1, 2, 3, 5, 6, 8 and 9 are
> FIXED** — docs reachable (menu, footer, sitemap), everything unified under one
> Starlight tree at `/docs` (option A), Lottie editor separated into its own docs
> section, product names made canonical, player docs linking back to the editor
> manual, sync sourced locally, search enabled. Each fixed issue below is marked ✅
> with what was done. Still open: **4, 7, 10** — plus a freshness check for the sync
> (issue 8) and the player repo's docs restructure, which is **still unpushed**.

Scope: everything a **user** meets — someone who wants to *create vector graphics,
animate them, and integrate the result into their product* (a website or an app).

Surfaces reviewed:

| Surface | What it is | Size |
|---|---|---|
| `pixodesk.com/docs` | SVG Animator **editor manual** — Starlight, authored in `pixodesk-website/src/content/docs/docs` | 25 published pages + 7 drafts, ~42k words |
| `pixodesk.com/app/svga/docs` | **Player / format / pre-rendered SVG** docs — synced copy of `pixodesk-svg-animator/docs`, custom shell *(since unified into `/docs` — see issue 2)* | 18 pages, ~31k words |
| `pixodesk-svg-animator` repo | `README.md` (shop window), `docs/` (source of the above), `SCHEMA.md` (+ printable `SCHEMA.html`), package READMEs | — |
| Site marketing pages | `/animator` ("Animator (Lottie)"), `/svg-animator`, `/svg-editor` — each with features / releases / download; `/animator/tutorials`; `/lottie-react` | — |

The user's journey has four stages: **① discover → ② create & animate (editor) →
③ integrate (player / file) → ④ look things up (reference, troubleshooting)**.
The verdict per stage, in one line each:

- **① Discover: ~~broken~~ fixed ✅.** Docs entry in the menu and footer, docs in the sitemap.
- **② Create & animate: good content, one home.** The editor manual is comprehensive and well written.
- **③ Integrate: ~~two competing homes~~ one home ✅** (shells unified; the content
  duplication — issue 4 — is still open).
- **④ Reference: good for SVG Animator; Lottie editor now has a docs section ✅**
  (structure done; its feature pages are still drafts).

Issues below are ordered **most severe → least**. Each ends with a
**Decision** line — the choice that is yours to make. A consolidated decision
checklist is at the end.

---

## 1. The docs are unreachable from the site ✅ FIXED

Was: the main menu's Docs entry was commented out, the footer carried only
EULA / privacy / social links, and the hand-written `public/sitemap.xml`
(Feb 2026, 23 URLs) contained no docs pages — the automatic sitemap was skipped
because `site` sat inside the `vite:` block of `astro.config.mjs`.

**Done (2026-09-06):**

- Main menu **Docs** entry with a submenu: SVG Animator Docs (`/docs`) ·
  Player & Format Docs (`/docs/player`) · 2D Animator (Lottie) Docs (`/docs/lottie`)
  *(labels renamed by issue 5)*; it also lights up (and shows the subnav) on all
  docs pages.
- The site menu now renders on the docs pages themselves — the existing
  `starlight/Header.astro` override was enabled in `astro.config.mjs`.
- Footer row with the same three docs links.
- `site` moved to the top level of `astro.config.mjs` → the generated sitemap
  ships (45 `/docs` URLs); stale `public/sitemap.xml` deleted; `robots.txt`
  points at `sitemap-index.xml`.

## 2. Two disjoint documentation systems for one journey ✅ FIXED (option A)

**Done (2026-09-06):** option A implemented. The custom `/app/svga/docs` shell is
deleted; `scripts/sync-svga-docs.mjs` copies the player repo's `docs/` into the
Starlight collection (`src/content/docs/svga`), injecting frontmatter (title from
the H1, explicit `/docs/...` slugs) and stripping the GitHub-only nav lines. One
sidebar (always-open **Player & Formats** super-section), one look, one URL scheme
(`/docs/library/react`, `/docs/format`, `/docs/player` for the old index), one
search. Every old `/app/svga/docs/*` URL redirects to its new home. The source of
truth stays in `pixodesk-svg-animator/docs`, readable on GitHub as before.

*The original analysis, for the record:*

Why both exist (the honest answer to "I still don't understand how we have both"):

- `/docs` is the **editor manual**, authored directly in the website repo, rendered by
  **Starlight** (its own sidebar, search-ready, scroll-spy, prev/next).
- `/app/svga/docs` is the **player/format documentation**, whose source of truth must
  stay in the `pixodesk-svg-animator` repo (it documents that repo's packages and is
  read on GitHub too). It is *synced* to the site and rendered by a **hand-built shell**
  (`src/pages/app/svga/docs/[...slug].astro`) — separate sidebar, separate styling,
  separate scroll-spy, different URL namespace.

For the user the journey is one continuous line — *make it in the editor → put it in
your product* — but at the "Save" step they are handed from one site into what looks
like a different one: different sidebar, different look, no shared header, and a URL
that jumps from `/docs/...` to `/app/svga/docs/...`. Cross-links exist (added
recently, they help) but the shells don't acknowledge each other.

**Unification options:**

- **A — One engine (recommended).** Render everything with Starlight under one
  `/docs` tree: `/docs/editor/…` (or keep the current flat editor slugs),
  `/docs/player/…`, `/docs/format`, `/docs/prerendered-svg/…`, `/docs/start/…`.
  The player docs *source* stays in the player repo; the **sync script grows a small
  post-process** that injects frontmatter (title from the H1, sidebar order from the
  existing order tables) and drops the files into the Starlight content dir. One
  sidebar with top-level groups per documentation, one search, one look, one URL
  scheme. The custom shell, its scroll-spy and `svga-docs.scss` are retired.
  Redirects from `/app/svga/docs/*` to the new URLs.
- **B — Two engines, one chrome (cheapest).** Keep both shells, but give them a shared
  docs header: the section-switcher bar on `/app/svga/docs` gains an **Editor** tab, and
  `/docs` gains the same bar (Starlight allows a custom Header component — one already
  exists half-wired in `astro.config.mjs`). Align fonts/colours. Users still cross two
  systems, but it *looks* deliberate.
- **C — Landing-only unification (weakest).** A single `/docs` landing with cards to
  both systems, nothing else changes. Fast, but the seam remains on every page.

My recommendation is **A**: the maintenance cost moves once into the sync script and
then disappears, whereas B and C pay a styling/consistency tax forever. A also gives
the Lottie docs (issue 3) an obvious place to land, and one search over everything.

**Decision:** ~~A, B, or C~~ — **A chosen and implemented**; the editor manual's
current URLs (`/docs/canvas`, …) stayed as-is.

## 3. The Lottie editor has no documentation home ✅ FIXED (structure)

**Done (2026-09-06):** dedicated **Lottie Editor** docs section:
`src/content/docs/docs/lottie/` renders as its own always-open sidebar
super-section, with a landing page at `/docs/lottie` (what the app is, what's
here, pointers to the shared Vector/Animation editing chapters, tutorials,
download) plus the moved *Add Lottie Animation to Your Project* page (slug
unchanged — no links broke) and the moved *Lottie Supported Features* page.
Linked from the header (menu Docs submenu) and footer; the Lottie landing links
back to the SVG Animator editor docs at the documentation level only.

**Still open here:** *Lottie Supported Features* is still `draft: true` (flip
when ready); *SVG vs Lottie* stayed in `support-docs/` (it is about the SVG
editor's export limits — say the word to move it); the shared-manual-vs-copies
question was settled as **shared** (the Lottie landing links into the shared
Vector/Animation chapters); product naming is still issue 5.

*The original analysis, for the record:*

The menu sells **"Animator (Lottie)"** as a product — features, tutorials, releases,
download — but it has **no documentation at all**. What exists is scattered and
mislabelled as SVG Animator material:

| Lottie content today | Where it sits | Problem |
|---|---|---|
| *Export to Lottie, Video, Image* | `/docs/export` (SVG Animator manual) | correct place, but it's the only export path documented |
| *Add Lottie Animation to Your Project* | `/docs/add-lottie-animation-to-your-project` | generic "what is Lottie / list of players" article; thin and off-tone vs the rest of the manual |
| *Lottie Supported Features*, *SVG vs Lottie* | `support-docs/*` — **draft: true**, invisible | exactly what a Lottie-editor user needs, unpublished |
| React + Lottie tutorial | `/lottie-react` — an **orphan page** (nothing links to it) | duplicates the "add Lottie" article |
| Video tutorials titled "2D Animator" | `/animator/tutorials` | marketing page, not connected to any docs |

A user of the Lottie editor cannot assemble a journey from this.

**Fix:** create a dedicated **Lottie editor documentation** section (e.g.
`/docs/lottie/…` under option 2A): introduction, editor basics, export formats,
supported features (promote the two drafts), add-to-project (fold in `/lottie-react`,
rewrite the thin article once, delete the orphan page). The SVG Animator manual keeps
only its own *Export to Lottie* page, linking across.

**Open question you must settle first:** the two editors share the vector/animation
core. Do the shared chapters (Canvas, Draw, Edit Objects, Keyframes, …) get
**duplicated** per product, or stay **one product-neutral manual** that both product
docs link into? I recommend the latter — one shared "Editor" manual, with thin
per-product sections (SVG Animator: save/formats/player; Lottie editor:
export/features/players). Duplication here would be ~30 pages of drift risk.

**Decision:** ~~dedicated Lottie section~~ **done**; ~~shared vs copies~~ **shared**.
Remaining: publish the feature-support drafts, and fold in / delete `/lottie-react`.

## 4. Integration content exists twice (site vs player docs) 🟠

*Add SVG Animation to Your Project* (`/docs/add-svg-animation-to-your-project`)
restates per-framework installation and usage that the player docs own
(`library/installation`, `web-player`, `react`, `vue`, `react-native`,
`prerendered-svg/…`). Same for the format story: the manual's *Save, File Format*
page and the `/docs` index's "Which file should I save?" table overlap
`start/choosing-a-format` and `format/` in the player docs. The site pages now link
to the player docs (good), but they still restate enough detail to drift — this is
exactly the "one home per fact" problem the player-repo audit (S3) fixed *inside*
that repo, now recurring one level up.

**Fix:** make the site's two "Add … to your project" pages **thin routers** — the
journey step, which format for which situation, then hand off to the canonical player
docs per framework. Keep the editor manual authoritative only for what the *editor
does* (the Save dialog, the export options), not for what the *reader's page needs*.

**Decision:** thin-router the site pages (my recommendation), or declare the site
pages canonical and cut the player-repo equivalents (worse: GitHub readers lose them).

## 5. Product naming is inconsistent across surfaces ✅ FIXED

Observed names for the same or overlapping things: **Pixodesk SVG Animator** (docs,
player README), **Pixodesk Animator Studio** ("adds the Lottie editor" — `/docs`
index), **Animator (Lottie)** (menu), **2D Animator** (tutorial video titles),
**SVG Animator** and **SVG Editor** (menu). A user cannot reliably map a menu item to
a docs set to a download. The docs index says the SVG Animator "is the SVG half of
Animator Studio", while the menu presents three sibling products and never mentions
Animator Studio.

**Decision (made):** three canonical names —

| Name | What it is |
|---|---|
| **Pixodesk SVG Animator** | the editor for Pixodesk JSON / SVG |
| **Pixodesk 2D Animator (Lottie)** | the Lottie editor |
| **Pixodesk Animator Studio** | the edition that includes both |

**Done (2026-09-06):** the one-line definition of each is written once, together, in
the `/docs` landing intro; every other surface uses the names and points there.

- **Menu + footer:** `Animator (Lottie)` → **2D Animator (Lottie)**; docs submenu
  `Editor Docs` → **SVG Animator Docs**, `Lottie Editor Docs` → **2D Animator
  (Lottie) Docs** (menu labels drop the *Pixodesk* prefix, as the existing entries do).
- **Docs prose:** `/docs` landing intro (the three definitions), `010-introduction`,
  the *Useful Info* glossary (Studio row corrected, a **Pixodesk 2D Animator (Lottie)**
  row added).
- **The Lottie editor page** (`lottie/205-lottie-editor.mdx`) carried a *fourth*
  variant not in the list above — **"Pixodesk Animator (Lottie)"**, no "2D" — as its
  own headline. Title, description, sidebar entry and body are now canonical.
- **Marketing surfaces:** four `/animator/*` page titles, the tutorials H1, the
  pricing card, the two `lottie-pages-text-content.yaml` headings.
- **Player repo:** `docs/start/introduction.md` said the SVG Animator "ships as the
  *Pixodesk Animator Studio* desktop app" — wrong under the new definitions; it now
  ships on its own and *in* Studio. Synced into the site.
- **Fixed in passing:** `/animator/tutorials` carried `title="2D Animator Download"`.

**Deliberately not renamed:** **SVG Editor** (a separate product, not in the decided
set — it has its own menu entry, pages and legal docs; needs its own call); the three
superseded `add-svg-animation/{intro,json,usage}.mdx` drafts, which use "Pixodesk
Animator Studio" *as* the SVG editor — wrong under the new definitions, but issue 7
deletes them; the footer's `Animator Terms of Use` / `Animator Privacy Policy` links
(ambiguous which app's legal text they are); commented-out pricing YAML.

## 6. The player docs never link back to the editor manual ✅ FIXED

Was: `docs/start/editor.md` (player repo) is deliberately feature-level, but its only
outbound pointer was pixodesk.com's **home page** — not the 25-page editor manual at
`/docs`. A reader arriving via GitHub or `/app/svga/docs` has no way to discover that
a full manual exists. Inverse of the cross-links we just added from the manual to the
player docs.

**Done (2026-09-06):** "full editor manual" links to `pixodesk.com/docs` added in
the player repo, one per page, high up where a reader lands (not in the top/bottom nav
lines, which are already dense):

- `docs/README.md` — the router: in *The editor* section, plus an **Editor manual**
  entry in *Go further*.
- `docs/start/editor.md` — a paragraph after the intro, framing the page as
  feature-level.
- `docs/start/editor-playback-settings.md` — appended to the "this page is the editor
  side" paragraph.

Synced into the site and verified as real anchors at `/docs/start/editor`,
`/docs/start/editor-playback-settings` and `/docs/player`. Still a **player-repo edit
that needs pushing** there.

**Note:** now that both docs sets share one Starlight tree, an on-site reader clicking
"full manual" lands on `/docs` — which they are already inside. The link does its real
job for **GitHub** readers, which is where the discovery gap was.

## 7. Dead and placeholder pages are publicly routed 🟡

Everything in `src/pages` ships. Currently live: `/docs-old` (placeholder with a demo
React counter), `/index copy` (!), `/great-post`, `/posts/post1..3` (lorem "greatest
post of all time"), `/svg-animator/Menu_old`, plus the superseded
`add-svg-animation/{intro,json,usage}` drafts and `docs-content.mdx` in the content
dir. None are linked, but all are guessable/indexable and undermine trust in an
otherwise polished site.

**Fix:** delete (or move out of `src/pages`) the leftovers; delete the three
superseded draft mdx files. Zero user-visible risk.

## 8. Sync pipeline: staleness has already bitten ✅ FIXED (local source; freshness check still open)

Was: `yarn sync:svga-docs` pulled **GitHub main**, so it silently reverted the synced
copy to the last *pushed* state — which is exactly how the merged format page vanished
from the site this morning. The then-separate `sync:svga-docs:local` covered preview,
but nothing *checked* freshness; the synced copy (now `src/content/docs/svga`, written
by `scripts/sync-svga-docs.mjs`) is committed and can drift for weeks unnoticed.

**Decision (made):** option (c′) — **committed copy, sourced locally, never run in
CI.** A content author runs `yarn sync:svga-docs` by hand when the player docs change
and commits the result. Explicitly an interim answer.

**Done (2026-09-06):**

- `yarn sync:svga-docs` now reads the **local sibling checkout** (defaulting to
  `../pixodesk-svg-animator/docs`) instead of the GitHub tarball — which removes the
  round-trip that caused the loss, since the local tree is always at least as fresh as
  `main`.
- The old tarball command is kept as `yarn sync:svga-docs:github`, for a machine
  without the sibling checkout; `sync:svga-docs:local` is gone — it *is* the default.
- `scripts/sync-svga-docs.mjs` takes the source as an optional argument and errors with
  the default, the override and the GitHub fallback spelled out.
- Confirmed the build never runs it: `deploy.yml` has no `run:` steps at all, `build`
  is plain `astro build`, and there is no `prebuild` hook.

**Still open — the trade-off this buys:** nothing *checks* freshness, so the committed
copy can drift silently and the build stays green. And a local source means unpushed
working-tree docs can now ship to the site — impossible before, easy now. The cheap
future fix is a CI step that re-runs the sync and fails if the tree is dirty. (Also:
the player repo's docs restructure is **still unpushed**.)

## 9. No search anywhere ✅ FIXED

**Done (2026-09-06):** `pagefind` enabled — with everything in one Starlight tree
(issue 2), one search now covers all ~70 pages, editor manual and player docs
alike. (Search results appear in production builds; the dev server shows the
search box but indexes nothing — that is standard pagefind behaviour.)

## 10. Smaller content notes 🟢

- **Maturity messaging conflicts:** the player README says "🚧 under development"
  while the site's menu sells downloads of the same family. Align (a "beta" badge with
  a date reads better than a bare 🚧).
- **Synced player pages ship no meta descriptions** (titles now come from injected
  frontmatter; descriptions could come from each page's first paragraph in the
  `sync-svga-docs.mjs` post-process).
- The manual's *Useful Info* (glossary, troubleshooting) and the player docs'
  `library/troubleshooting` don't cross-link; a stuck user in one silo won't find the
  other list.
- The synced **editor summary vs manual overlap** (start/editor.md ≈ 1-page digest of
  the 25-page manual) is *by design* for GitHub readers, but on the website both are
  served — consider having the sync skip the digest pages in favour of the manual.
- `vector/140-effects` and `animation/140-animation` share `order: 140` — harmless
  today (different sidebar groups) but an accident waiting for the next reorder.
- ~~`/animator/tutorials` videos unlinked from any docs page~~ ✅ the Lottie landing
  now links them; the SVG Animator manual still doesn't.
- **(new, found while unifying)** every editor-manual page renders its title
  **twice** — Starlight's own H1 plus the body H1 in each mdx. The synced player
  pages don't (the sync strips the body H1). Fix = drop the body H1s from the ~25
  mdx files, or hide Starlight's `_top` H1 in CSS.

## What is in good shape (don't touch)

- The **player docs restructure** (start / library / format / prerendered-svg, one
  format page, README router) is coherent, complete, and survived a loss audit against
  the pre-reorg baseline.
- The repo **README shop window**, **SCHEMA.md/.html**, and package READMEs form a
  clean GitHub-facing funnel.
- The **editor manual content** is thorough, current, and consistently written —
  the problems around it are packaging, not substance.
- The sidebar scroll-spy and the docs shell are now Starlight throughout (the interim
  custom landing/header/scroll-spy were superseded by the unification, as planned).

## Decision checklist

1. ~~**Unification model** (issue 2)~~ ✅ **A one-engine — done.**
2. ~~**Docs URL scheme**~~ ✅ editor slugs kept; `/docs/player|start|library|format|prerendered-svg/*`; redirects from `/app/svga/docs/*` in place.
3. ~~**Lottie editor docs** (issue 3)~~ ✅ dedicated section at `/docs/lottie` — done
   (feature pages still draft; `/lottie-react` orphan still to fold in or delete).
4. ~~**Shared editor manual** vs duplication~~ ✅ shared — the Lottie landing links
   into the shared Vector/Animation chapters.
5. ~~**Canonical product names** (issue 5)~~ ✅ decided and applied — *Pixodesk SVG
   Animator* / *Pixodesk 2D Animator (Lottie)* / *Pixodesk Animator Studio*
   (the edition with both). **Pixodesk SVG Editor** still needs its own call.
6. **Thin-router the two "Add … to your project" pages** (issue 4): yes/no — OPEN.
7. ~~**Sync at build time** vs committed copy (issue 8)~~ ✅ committed copy, sourced
   from the local checkout, never run in CI. A **freshness check** is still OPEN, and
   the player repo docs restructure still needs to be **pushed**.
8. ~~Menu Docs entry + footer links, `site` config fix + stale sitemap, search~~ ✅
   done (issues 1, 9); ~~player-docs → editor-manual backlinks~~ ✅ done (issue 6).
   Still open from the quick list: **delete dead pages** (issue 7) and the smaller
   notes in issue 10 (incl. the double-H1 quirk on editor-manual pages).
