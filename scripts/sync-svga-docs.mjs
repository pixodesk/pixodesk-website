#!/usr/bin/env node
// Syncs the SVG Animator player docs into the Starlight collection, from the local
// pixodesk-svg-animator checkout.
//
//   node scripts/sync-svga-docs.mjs [sourceDocsDir]
//
// <sourceDocsDir> is a checkout of pixodesk-svg-animator/docs, defaulting to the
// local sibling repo. The synced copy is committed, and the site build never runs
// this — a content author runs `yarn sync:svga-docs` by hand when the player docs
// change, then commits the result. `yarn sync:svga-docs:github` pulls a fresh
// extract of GitHub main instead, for a machine without the sibling checkout;
// note that it reverts the copy to the last *pushed* state of the player repo.
//
// The synced sections live DIRECTLY under src/content/docs/svga, next to the
// authored editor/ manual, so the disk layout matches the URLs:
//
//   upstream library/…         -> svga/player-library/…  /docs/svga/player-library/…
//   upstream format/…          -> svga/format/…          /docs/svga/format
//
// Only those generated paths (GENERATED) are wiped and rewritten. Everything
// else under svga/ is authored and never touched — notably editor/ (the manual,
// which also absorbed the former upstream start/ pages) and prerendered-svg/
// (moved out of the player repo and authored here). Upstream folders listed in
// SKIPPED_UPSTREAM are ignored silently.
//
// The player docs are plain GitHub-flavoured markdown; Starlight needs frontmatter
// and owns the page chrome, so each file is copied with these transforms:
//   - frontmatter injected: `title` (the H1 text) and an explicit `slug`
//     (folder READMEs land on the folder URL: format/README.md -> docs/svga/format)
//   - the H1 line removed (Starlight renders the title itself)
//   - the GitHub-only nav lines removed (`[← …] · [Contents](…) · Next: […]` —
//     Starlight has its own sidebar and prev/next)
// Relative links inside the body are left as written; the remark-svga-doc-links
// plugin resolves them to site routes at render time.
import fs from 'node:fs';
import path from 'node:path';

const TARGET = path.resolve('src/content/docs/svga');
const SLUG_BASE = 'docs/svga';

// Upstream folder names that read differently as site URL segments — and as the
// synced folder names, since the disk layout mirrors the URLs.
const SEGMENT_MAP = { library: 'player-library' };

// Everything the sync owns under TARGET; wiped before each run.
const GENERATED = ['player-library', 'format', 'player.md' /* legacy, wiped */];

// Upstream folders that intentionally do NOT sync: start/ lives on in the
// editor manual (svga/editor), prerendered-svg/ is authored on the site.
// Guarded here so an older checkout can never clobber the authored content.
const SKIPPED_UPSTREAM = ['start', 'prerendered-svg', 'README.md'];

const DEFAULT_SOURCE = '../pixodesk-svg-animator/docs';

const source = process.argv[2] ?? DEFAULT_SOURCE;
if (!fs.existsSync(path.join(source, 'format', 'README.md'))) {
  console.error(
    `Source "${source}" does not look like the player docs directory ` +
      `(no format/README.md in it).\n` +
      `  - default:  the sibling checkout at ${DEFAULT_SOURCE}\n` +
      `  - override: node scripts/sync-svga-docs.mjs <sourceDocsDir>\n` +
      `  - no local checkout: yarn sync:svga-docs:github`,
  );
  process.exit(1);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });
}

// A nav line is ` · `-separated fragments that are all links (optionally prefixed
// with `Next: `), e.g. `[← Web player](./web-player.md) · [Contents](../README.md) · Next: [Vue →](./vue.md)`.
function isNavLine(line) {
  const trimmed = line.trim();
  if (!trimmed.includes('](')) return false;
  const fragments = trimmed.split(' · ');
  if (fragments.length < 2 && !trimmed.startsWith('[←')) return false;
  return fragments.every((fragment) =>
    /^(Next: )?\[[^\]]*\]\([^)]*\)$/.test(fragment.trim()),
  );
}

/** Target path (relative to TARGET) for a source file: segment-mapped, the root
 *  README becomes player.md. Folder READMEs keep their filename — the slug, not
 *  the filename, decides the URL. */
function targetRelPath(relPath) {
  const parts = relPath.split(path.sep);
  const mapped = parts.map((part, i) => (i === 0 && SEGMENT_MAP[part]) || part);
  return mapped.join('/');
}

/** URL slug for a target-relative path. */
function slugFor(targetRel) {
  const noExt = targetRel.replace(/\.md$/, '');
  const parts = noExt.split('/');
  if (parts[parts.length - 1] === 'README') parts.pop(); // folder index
  return [SLUG_BASE, ...parts].join('/');
}

/** Meta description: the page's first body paragraph, de-markdowned and
 *  truncated at a word boundary. */
function deriveDescription(body) {
  const paragraph = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^[#>|`\[!-]/.test(block) && !block.startsWith('**On this page'));
  if (!paragraph) return undefined;
  let text = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length > 160) text = text.slice(0, 157).replace(/\s+\S*$/, '') + '…';
  return text || undefined;
}

for (const generated of GENERATED) {
  fs.rmSync(path.join(TARGET, generated), { recursive: true, force: true });
}

let count = 0;
for (const file of walk(source)) {
  if (!file.endsWith('.md')) continue;
  const relPath = path.relative(source, file);
  if (SKIPPED_UPSTREAM.includes(relPath.split(path.sep)[0])) continue;
  const targetRel = targetRelPath(relPath);
  if (!GENERATED.includes(targetRel.split('/')[0])) {
    console.error(`Unexpected upstream path "${relPath}" — add its folder to GENERATED or SKIPPED_UPSTREAM.`);
    process.exitCode = 1;
    continue;
  }
  const slug = slugFor(targetRel);

  const src = fs.readFileSync(file, 'utf8');
  const h1 = src.match(/^# (.+)$/m);
  if (!h1) {
    console.error(`No H1 in ${relPath} — cannot derive a title, skipping.`);
    process.exitCode = 1;
    continue;
  }
  const title = h1[1].replace(/`/g, '').trim();

  const body = src
    .replace(h1[0] + '\n', '')
    .split('\n')
    .filter((line) => !isNavLine(line))
    .join('\n')
    .replace(/^\n+/, '');

  const description = deriveDescription(body);
  const frontmatter = `---\ntitle: ${JSON.stringify(title)}\nslug: ${JSON.stringify(slug)}\n` +
    (description ? `description: ${JSON.stringify(description)}\n` : '') +
    `---\n\n`;
  const target = path.join(TARGET, targetRel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, frontmatter + body);
  count += 1;
}

console.log(`svga docs synced: ${count} pages from ${source} -> ${path.relative('.', TARGET)}/{${GENERATED.join(', ')}}`);
