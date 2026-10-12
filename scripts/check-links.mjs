#!/usr/bin/env node
// Every link in the built site must point at something that exists. Run after `astro build`,
// over dist/ (the real pages, the real heading ids):
//
//   node scripts/check-links.mjs            # offline: internal links and anchors, plus the
//                                           #   links into the player repository when its
//                                           #   checkout sits beside this one
//   node scripts/check-links.mjs --online   # …and every other external URL must answer
//
// Internal = `/path`, or `https://pixodesk.com/path` (the site links to itself in full from the
// synced player docs). A page is dist/<path>/index.html; a file is dist/<path>; a redirect is a
// page too (astro writes one per entry of `redirects`). An `#anchor` must be an id in the target
// page. Links into github.com/pixodesk/pixodesk-svg-animator and stackblitz.com/github/… are
// checked against ../pixodesk-svg-animator when it exists (the sync script's source), online
// otherwise.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const DIST = resolve('dist');
const SITE = 'https://pixodesk.com';
const PLAYER_REPO = 'https://github.com/pixodesk/pixodesk-svg-animator';
const PLAYER_STACKBLITZ = 'https://stackblitz.com/github/pixodesk/pixodesk-svg-animator/tree/main/';
const PLAYER_CHECKOUT = resolve('../pixodesk-svg-animator');
const ONLINE = process.argv.includes('--online');
/** Generated bundles the site serves: their existence is checked, their anchors are not ours. */
const NO_ANCHOR_CHECK = /^\/(app|player)\//;

if (!existsSync(join(DIST, 'index.html'))) { console.error('dist/ is missing — run `astro build` first'); process.exit(1); }

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
const pages = walk(DIST).filter(p => p.endsWith('.html'));

const idsOf = new Map();
function ids(file) {
    if (!idsOf.has(file)) {
        const html = readFileSync(file, 'utf8');
        idsOf.set(file, new Set([...html.matchAll(/\s(?:id|name)="([^"]+)"/g)].map(m => m[1])));
    }
    return idsOf.get(file);
}

/** The file a site path is served from, or undefined. */
function targetOf(path) {
    const clean = decodeURIComponent(path).replace(/\/+$/, '');
    const candidates = clean === '' ? [join(DIST, 'index.html')] : [join(DIST, clean, 'index.html'), join(DIST, clean), join(DIST, clean + '.html')];
    return candidates.find(c => existsSync(c) && statSync(c).isFile());
}

const split = url => { const h = url.indexOf('#'); const rest = h === -1 ? url : url.slice(0, h); const q = rest.indexOf('?'); return { path: q === -1 ? rest : rest.slice(0, q), query: q === -1 ? '' : rest.slice(q + 1), anchor: h === -1 ? '' : url.slice(h + 1) }; };
const insideRepo = (root, p) => { const abs = resolve(root, p); const rel = relative(root, abs); return rel.startsWith('..') ? undefined : abs; };

const problems = [];
const external = new Map();   // url → first page using it
const report = (page, url, why) => problems.push(`${relative(DIST, page)} — ${url}: ${why}`);

for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const seen = new Set();
    for (const m of html.matchAll(/<(?:a|img|iframe|source|link)\b[^>]*?\b(?:href|src)="([^"]*)"/g)) {
        const url = m[1].replace(/&#x26;|&amp;/g, '&');
        if (seen.has(url)) continue;
        seen.add(url);
        if (!url || /^(mailto|tel|javascript|data):/i.test(url)) continue;

        // Player repository on GitHub, and StackBlitz opening a folder of it.
        if (url.startsWith(PLAYER_REPO) || url.startsWith(PLAYER_STACKBLITZ)) {
            if (!existsSync(PLAYER_CHECKOUT)) { if (ONLINE) external.set(url, external.get(url) ?? page); continue; }
            const { path, query } = split(url);
            let rel;
            if (url.startsWith(PLAYER_STACKBLITZ)) rel = path.slice(PLAYER_STACKBLITZ.length);
            else { const r = /^\/(?:tree|blob)\/main\/(.*)$/.exec(path.slice(PLAYER_REPO.length)); if (!r) { if (ONLINE) external.set(url, external.get(url) ?? page); continue; } rel = r[1]; }
            const abs = insideRepo(PLAYER_CHECKOUT, decodeURIComponent(rel));
            if (!abs || !existsSync(abs)) { report(page, url, 'no such file or folder in the player repository'); continue; }
            if (url.startsWith(PLAYER_STACKBLITZ)) {
                const pkgFile = join(abs, 'package.json');
                if (!existsSync(pkgFile)) { report(page, url, 'the folder has no package.json — StackBlitz needs a project'); continue; }
                const script = new URLSearchParams(query).get('startScript');
                const scripts = JSON.parse(readFileSync(pkgFile, 'utf8')).scripts ?? {};
                if (script && !(script in scripts)) report(page, url, `startScript=${script} is not a script of that project`);
            }
            continue;
        }

        // Internal: an absolute site path, or the site's own origin spelled out.
        let path = url;
        if (url.startsWith(SITE + '/') || url === SITE) path = url.slice(SITE.length) || '/';
        else if (/^[a-z]+:/i.test(url) || url.startsWith('//')) { if (ONLINE) external.set(url, external.get(url) ?? page); continue; }
        if (!path.startsWith('/')) {              // relative to the page's folder
            const base = '/' + relative(DIST, page).replace(/index\.html$/, '').replace(/\\/g, '/');
            path = new URL(path, 'https://x' + base).pathname;
        }
        const { path: p, anchor } = split(path);
        const target = targetOf(p);
        if (!target) { report(page, url, 'no such page or file in dist/'); continue; }
        if (anchor && anchor !== '_top' && !NO_ANCHOR_CHECK.test(p) && target.endsWith('.html') && !ids(target).has(decodeURIComponent(anchor))) {
            report(page, url, `no element with id "${anchor}" on that page`);
        }
    }
}

if (ONLINE) {
    const check = async url => {
        for (const method of ['HEAD', 'GET']) {
            try {
                const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'pixodesk-website-check' } });
                // 403 / 429: the host turns scripts away (npmjs.com does) — the page is not missing.
                if (res.ok || res.status === 403 || res.status === 429) return '';
                if (method === 'HEAD' && [404, 405].includes(res.status)) continue;
                return `HTTP ${res.status}`;
            } catch (e) { if (method === 'HEAD') continue; return e.message; }
        }
        return 'no answer';
    };
    const urls = [...external];
    let i = 0;
    await Promise.all(Array.from({ length: 8 }, async () => {
        while (i < urls.length) { const [url, page] = urls[i++]; const why = await check(url); if (why) report(page, url, why); }
    }));
    console.log(`${urls.length} external URLs fetched`);
}

const linkCount = pages.length;
if (problems.length) {
    console.error(`${problems.length} broken link(s) across ${linkCount} pages:\n  ` + problems.join('\n  '));
    process.exit(1);
}
console.log(`links ok: ${linkCount} pages, internal links and anchors resolve${existsSync(PLAYER_CHECKOUT) ? ', player-repository links resolve' : ''}${ONLINE ? ', external URLs answer' : ''}`);
