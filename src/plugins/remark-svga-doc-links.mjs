/**
 * Prepares the synced SVG Animator docs (see scripts/sync-svga-docs.mjs) for
 * rendering as Starlight pages under /docs.
 *
 * 1. Rewrites the relative cross-links, resolved against the folder the file
 *    lives in. The synced disk layout mirrors the URLs (library is renamed
 *    player-library, the root README is player.md), while the links in the
 *    bodies still use the UPSTREAM names — resolution happens in upstream
 *    terms, then the segment rename is applied to the result:
 *
 *      ./react.md#nextjs   (from player-library/) -> /docs/svga/player-library/react#nextjs
 *      ../library/README.md (from start/)         -> /docs/svga/player-library
 *      ../README.md (the retired docs router)     -> /docs/svga
 *      ../../SCHEMA.md, ../../examples/...        -> the file on GitHub
 *      ../../README.md                            -> the repository README on GitHub
 *
 * 2. Lifts ```mermaid fences into raw `<pre class="mermaid">` blocks. Astro's
 *    expressive-code runs as a *rehype* plugin, i.e. after this one, so
 *    replacing the code node here is enough to keep it from rendering the
 *    diagram source as a syntax-highlighted code block. The client-side
 *    mermaid script (starlight/Head.astro) then draws them.
 *
 * Scoped by file path: only the GENERATED sections under src/content/docs/svga
 * are touched — the authored editor/ manual and everything else is left alone.
 */
import { posix } from 'node:path';

const DOCS_DIR = 'src/content/docs/svga';
// First path segments the sync generates (see GENERATED in scripts/sync-svga-docs.mjs).
const SYNCED_SEGMENTS = new Set(['player-library', 'format', 'player.md']);
const BASE = '/docs/svga';

// Upstream pages that moved into authored site content: links from the synced
// pages still use the upstream paths and are redirected to the new homes.
// ('' means the manual home, /docs/svga.)
const MOVED = {
  'start/introduction': 'editor/how-it-fits-together',
  'start/choosing-a-format': 'editor/choosing-a-format',
  'start/editor': '',
  'start/editor-playback-settings': 'editor/playback-settings',
};
const REPO = 'https://github.com/pixodesk/pixodesk-svg-animator';

/**
 * @param url the link as written in the markdown
 * @param dir the containing file's folder relative to the docs root ('' for
 *            the root README, 'library' for library/react.md, ...)
 */
function rewrite(url, dir) {
  if (!/^\.\.?\//.test(url)) return url; // absolute, external, or #anchor

  const hashIndex = url.indexOf('#');
  const path = hashIndex === -1 ? url : url.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : url.slice(hashIndex);

  // Resolved against the docs root; '../x' escapes to the repository root.
  const resolved = posix.normalize(posix.join(dir, path));

  if (resolved.startsWith('../')) {
    const repoPath = resolved.slice(3);
    if (repoPath === 'README.md') return `${REPO}#readme`;
    // GitHub redirects between blob and tree, so either works for files and
    // directories alike; blob keeps file anchors working.
    return `${REPO}/blob/main/${repoPath}${hash}`;
  }

  let docPath = resolved.replace(/\.md$/, '');
  // The former docs-router README: its role is played by the app home now.
  if (docPath === 'README' || docPath === '.') return `${BASE}${hash}`;
  if (docPath.endsWith('/README')) docPath = docPath.slice(0, -'/README'.length);
  if (docPath in MOVED) docPath = MOVED[docPath];
  // Upstream folder names that read differently as site URL segments (kept in
  // step with SEGMENT_MAP in scripts/sync-svga-docs.mjs).
  docPath = docPath.replace(/^library(?=\/|$)/, 'player-library');
  return docPath ? `${BASE}/${docPath}${hash}` : `${BASE}${hash}`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

export function remarkSvgaDocLinks() {
  return (tree, file) => {
    const path = (file?.history?.[0] ?? file?.path ?? '').replace(/\\/g, '/');
    const docsIndex = path.indexOf(`${DOCS_DIR}/`);
    if (docsIndex === -1) return;

    const rel = path.slice(docsIndex + DOCS_DIR.length + 1);
    // Links are rewritten only in the SYNCED pages (authored content already
    // uses site URLs); mermaid fences are lifted everywhere under svga/.
    const synced = SYNCED_SEGMENTS.has(rel.split('/')[0]);

    const dir = posix.dirname(rel);
    // Links are written in upstream terms, so resolve in upstream terms too.
    const fileDir = (dir === '.' ? '' : dir).replace(/^player-library(?=\/|$)/, 'library');

    walk(tree, (node) => {
      if (synced && (node.type === 'link' || node.type === 'definition') && node.url) {
        node.url = rewrite(node.url, fileDir);
      }

      if (node.type === 'code' && node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<pre class="mermaid">${escapeHtml(node.value)}</pre>`;
        delete node.lang;
        delete node.meta;
      }
    });
  };
}
