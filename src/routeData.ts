/**
 * Per-app docs shell (registered as Starlight `routeMiddleware`).
 *
 * The generated sidebar (src/plugins/docs-sidebar.mjs) contains BOTH apps'
 * entries. Here each page keeps only its own app's entries:
 *
 *   /docs               — the cards landing: no sidebar, no ToC, no prev/next
 *   /docs/svga/...      — only Pixodesk SVG Animator entries
 *   /docs/2d-lottie/... — only Pixodesk 2D Animator (Lottie) entries
 *
 * Prev/next links that would cross from one app into the other are dropped.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

const APP_PREFIXES = ['/docs/svga', '/docs/2d-lottie'];

function appOf(href: string | undefined): string | undefined {
    if (!href) return undefined;
    return APP_PREFIXES.find(
        (prefix) =>
            href === prefix ||
            href.startsWith(prefix + '/') ||
            href.startsWith(prefix + '#'),
    );
}

type SidebarEntry = { type: string; href?: string; entries?: Array<SidebarEntry> };

function firstHref(entry: SidebarEntry): string | undefined {
    if (entry.type === 'link') return entry.href;
    for (const child of entry.entries ?? []) {
        const href = firstHref(child);
        if (href) return href;
    }
    return undefined;
}

export const onRequest = defineRouteMiddleware((context) => {
    const route = context.locals.starlightRoute;
    const pathname = context.url.pathname.replace(/\/$/, '') || '/';

    if (pathname === '/docs') {
        // The cards landing: middle column only.
        route.sidebar = [];
        route.hasSidebar = false;
        route.toc = undefined;
        route.pagination = { prev: undefined, next: undefined };
        return;
    }

    const app = appOf(pathname);
    if (!app) return; // not a docs page

    route.sidebar = route.sidebar.filter(
        (entry) => appOf(firstHref(entry as SidebarEntry)) === app,
    );
    const { prev, next } = route.pagination;
    route.pagination = {
        prev: appOf(prev?.href) === app ? prev : undefined,
        next: appOf(next?.href) === app ? next : undefined,
    };
});
