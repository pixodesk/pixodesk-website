/**
 * Builds the docs sidebar from the per-app content folders:
 *
 *   src/content/docs/svga/editor — Pixodesk SVG Animator: the editor manual
 *   src/content/docs/svga/{player-library,format,player.md}
 *                                — the synced player docs (scripts/sync-svga-docs.mjs)
 *   src/content/docs/svga/prerendered-svg — authored (moved out of the player repo)
 *   src/content/docs/2d-lottie   — Pixodesk 2D Animator (Lottie)
 *
 * The SVG Animator sidebar is organised into big top-level sections (always
 * open, large titles — see SECTION_LABELS and the styling in
 * starlight/Sidebar.astro): Editor · Player Library · Format · Pre-rendered SVG.
 * Inside Editor, vector/ and animation/ remain
 * nested always-open sub-sections (SUPER_SECTIONS).
 *
 * Group items are hash links to each file's `##` headings, so the sidebar stays
 * in sync with the content — add a `##` heading and it appears.
 *
 * The full entry list contains BOTH apps; the Starlight route middleware
 * (src/routeData.ts) filters it per page so /docs/svga/* shows only SVG Animator
 * entries and /docs/2d-lottie/* only Lottie ones.
 */
import fs from 'node:fs';
import path from 'node:path';

const MANUAL_DIR = path.resolve('src/content/docs/svga/editor');
const LOTTIE_DIR = path.resolve('src/content/docs/2d-lottie');
const SVGA_ROOT = path.resolve('src/content/docs/svga');

/** Sub-folders of MANUAL_DIR that become always-open sub-sections inside the
 *  Editor section (folder → label). Positioned by the lowest `sidebar.order`
 *  of the files inside. */
export const SUPER_SECTIONS = {
    vector: 'Vector Editing',
    animation: 'Animation Editing',
};

/** The big top-level section titles (always open, styled large). */
export const SECTION_LABELS = ['Editor', 'Player Library', 'JSON Format', 'Pre-rendered SVG File'];

// [folder, section label, file order] for the synced player docs. 'Format' is a
// single page: its section carries the page's `##` headings directly.
// Unlisted files still appear, alphabetically last.
const PLAYER_SECTIONS = [
    ['player-library', 'Player Library', ['README.md', 'installation.md', 'web-player.md', 'react.md', 'vue.md', 'react-native.md', 'playback-and-triggers.md', 'troubleshooting.md']],
    ['format', 'JSON Format', ['README.md']],
    ['prerendered-svg', 'Pre-rendered SVG File', ['README.md', 'on-the-web.md', 'static-sites-and-cms.md', 'data-px-meta.md']],
];
const PLAYER_SECTION_BASE_ORDER = 210; // after the Editor section (10)

/** Same rules as github-slugger (the heading-id algorithm Starlight uses). */
export function headingSlug(text) {
    return text.toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu, '').replace(/ /g, '-');
}

function parseSection(file) {
    const src = fs.readFileSync(file, 'utf8');
    const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
    if (!fm) return undefined;
    const get = (key) => (fm[1].match(new RegExp('^' + key + ':\\s*"?(.*?)"?\\s*$', 'm')) || [])[1];
    if (get('draft') === 'true') return undefined;
    const order = Number((fm[1].match(/^\s+order:\s*(\d+)/m) || [])[1] ?? 999);
    const slug = get('slug');
    const body = src.slice(fm[0].length).replace(/```[\s\S]*?```/g, '');   // ignore headings inside code fences
    const seen = new Map();
    const items = [];
    for (const m of body.matchAll(/^## (.+)$/gm)) {
        const label = m[1].trim();
        let id = headingSlug(label);
        const n = seen.get(id) ?? 0; seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        items.push({ label, link: `/${slug}#${id}` });
    }
    return { label: get('title'), order, slug, items };
}

function readSections(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => /\.mdx?$/.test(f) && f !== 'index.mdx')
        .map(f => parseSection(path.join(dir, f)))
        .filter(Boolean)
        .sort((a, b) => a.order - b.order);
}

const sectionGroup = (s) => ({
    label: s.label,
    collapsed: true,
    items: [{ label: 'Overview', link: `/${s.slug}` }, ...s.items],
});

// "React — @pixodesk/svg-animator-react" reads as just "React" in the sidebar.
const shortLabel = (label) => label.split(' — ')[0].trim();

/** The Editor section: one group per manual file, with the vector/ and
 *  animation/ folders as nested always-open sub-sections. */
function editorSection() {
    const entries = readSections(MANUAL_DIR).map(s => ({ order: s.order, item: sectionGroup(s) }));
    for (const [folder, label] of Object.entries(SUPER_SECTIONS)) {
        const sections = readSections(path.join(MANUAL_DIR, folder));
        if (!sections.length) continue;
        entries.push({
            order: Math.min(...sections.map(s => s.order)),
            item: { label, collapsed: false, items: sections.map(sectionGroup) },
        });
    }
    if (!entries.length) return [];
    entries.sort((a, b) => a.order - b.order);
    return [{
        order: 10,
        group: { label: 'Editor', collapsed: false, items: entries.map(e => e.item) },
    }];
}

/** The player docs as big top-level sections (empty until the first
 *  `yarn sync:svga-docs` run). */
function playerSections() {
    const result = [];
    PLAYER_SECTIONS.forEach(([folder, label, order], index) => {
        const dir = path.join(SVGA_ROOT, folder);
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
        const orderedFiles = [
            ...order.filter((f) => files.includes(f)),
            ...files.filter((f) => !order.includes(f)).sort(),
        ];
        const sections = orderedFiles
            .map((f) => parseSection(path.join(dir, f)))
            .filter(Boolean);
        if (!sections.length) return;
        const items = sections.length === 1
            // Single-page section (Format): the page's `##` headings directly.
            ? [{ label: 'Overview', link: `/${sections[0].slug}` }, ...sections[0].items]
            : sections.map((s) => ({ label: shortLabel(s.label), link: `/${s.slug}` }));
        result.push({
            order: PLAYER_SECTION_BASE_ORDER + index * 10,
            group: { label, collapsed: false, items },
        });
    });
    return result;
}

export function docsSidebar() {
    const entries = [...editorSection(), ...playerSections()];
    // The Lottie app's groups. They sort after the SVG Animator entries; the
    // route middleware shows each app only its own entries anyway.
    entries.push(...readSections(LOTTIE_DIR).map(s => ({ order: 1000 + s.order, group: sectionGroup(s) })));
    return entries.sort((a, b) => a.order - b.order).map(e => e.group);
}

/**
 * Redirects for the retired URL schemes — one explicit entry per page (a static
 * build cannot expand a [...slug] redirect):
 *   /app/svga/docs/<x>, /docs/<x>, /docs/svga/library/<x> (player docs) -> /docs/svga/<mapped x>
 *   /docs/<flat editor slug>, /docs/svga/<editor slug>                  -> /docs/svga/editor/<slug>
 *   /docs/<flat lottie slug>                                            -> /docs/2d-lottie/...
 */
export function svgaRedirects() {
    const redirects = {
        // The player docs router page is retired; its sections are the homes now.
        '/app/svga/docs': '/docs/svga/player-library',
        '/docs/player': '/docs/svga/player-library',
        '/docs/svga/player': '/docs/svga/player-library',
        // Old flat Lottie slugs.
        '/docs/lottie': '/docs/2d-lottie',
        '/docs/add-lottie-animation-to-your-project': '/docs/2d-lottie/add-lottie-animation-to-your-project',
        '/docs/lottie-features': '/docs/2d-lottie/lottie-features',
        // Introduction is the app home.
        '/docs/introduction': '/docs/svga',
    };
    // The former start/ pages, absorbed into the editor manual — all their
    // historical URL shapes point at the new homes.
    const START_MOVES = {
        'start/introduction': '/docs/svga/editor/how-it-fits-together',
        'start/choosing-a-format': '/docs/svga/editor/choosing-a-format',
        'start/editor': '/docs/svga',
        'start/editor-playback-settings': '/docs/svga/editor/playback-settings',
    };
    for (const [oldRel, target] of Object.entries(START_MOVES)) {
        redirects[`/app/svga/docs/${oldRel}`] = target;
        redirects[`/docs/${oldRel}`] = target;
        redirects[`/docs/svga/${oldRel}`] = target;
    }
    // Editor-manual slugs: both the original flat form and the brief
    // /docs/svga/<name> form point at /docs/svga/editor/<name>.
    const MANUAL_SLUGS = [
        'quick-start', 'canvas', 'draw-on-canvas', 'edit-objects', 'color', 'text', 'edit-paths',
        'object-creation-tools', 'symbols', 'markers', 'patterns', 'filters', 'masks', 'effects',
        'animation', 'animation-techniques', 'keyframes', 'easing-charts', 'loop-animation',
        'save', 'export', 'add-svg-animation-to-your-project', 'useful-info',
    ];
    for (const slug of MANUAL_SLUGS) {
        redirects[`/docs/${slug}`] = `/docs/svga/editor/${slug}`;
        redirects[`/docs/svga/${slug}`] = `/docs/svga/editor/${slug}`;
    }
    // Synced player sections now live directly under svga/ with the mapped
    // folder names; old URLs used the UPSTREAM names (library, docs root).
    const walkDir = (dir) => fs.existsSync(dir)
        ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
            const p = path.join(dir, entry.name);
            return entry.isDirectory() ? walkDir(p) : [p];
        })
        : [];
    for (const folder of ['player-library', 'format', 'prerendered-svg']) {
        for (const file of walkDir(path.join(SVGA_ROOT, folder))) {
            if (!file.endsWith('.md')) continue;
            let mapped = path.relative(SVGA_ROOT, file).replace(/\.md$/, '').split(path.sep).join('/');
            if (mapped.endsWith('/README')) mapped = mapped.slice(0, -'/README'.length);
            const upstream = mapped.replace(/^player-library(?=\/|$)/, 'library');
            redirects[`/app/svga/docs/${upstream}`] = `/docs/svga/${mapped}`;
            redirects[`/docs/${upstream}`] = `/docs/svga/${mapped}`;
            if (upstream !== mapped) redirects[`/docs/svga/${upstream}`] = `/docs/svga/${mapped}`;
        }
    }
    return redirects;
}

/**
 * Dev-server companion: the sidebar above is computed when Astro loads its config, so during
 * `astro dev` a new section file or a new `##` heading would stay invisible until a manual
 * restart. This integration watches the docs folders and restarts the dev server whenever the
 * generated sidebar would differ from the one currently served (content edits that don't touch
 * headings don't restart anything).
 */
export function docsSidebarIntegration() {
    let served = JSON.stringify(docsSidebar());
    let timer;
    return {
        name: 'docs-sidebar-watch',
        hooks: {
            'astro:server:setup'({ server, logger }) {
                server.watcher.add(SVGA_ROOT);
                server.watcher.add(LOTTIE_DIR);
                const check = (file) => {
                    if (!file) return;
                    if (!file.startsWith(SVGA_ROOT) && !file.startsWith(LOTTIE_DIR)) return;
                    if (!/\.mdx?$/.test(file)) return;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        let next;
                        try { next = JSON.stringify(docsSidebar()); } catch { return; }
                        if (next === served) return;
                        served = next;
                        logger.info('docs sidebar changed — restarting the dev server');
                        server.restart();
                    }, 300);
                };
                server.watcher.on('add', check);
                server.watcher.on('unlink', check);
                server.watcher.on('change', check);
            },
        },
    };
}
