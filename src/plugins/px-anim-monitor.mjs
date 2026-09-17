/**
 * DEV-ONLY: injects `src/scripts/px-anim-monitor.ts` into every page under `astro dev` — the
 * bottom-left panel that counts the animations playing on the page, by kind (pre-rendered
 * SVG + CSS, pre-rendered SVG + JS, JSON + Pixodesk player, lottie-web, dotLottie…).
 *
 * `astro build` gets nothing: the script is only injected when `command === 'dev'`, and the
 * script itself only activates on localhost / 127.0.0.1 (or `?pxdebug=1`).
 */
import { fileURLToPath } from 'node:url';

export function pxAnimMonitor() {
    return {
        name: 'px-anim-monitor',
        hooks: {
            'astro:config:setup': ({ command, injectScript }) => {
                if (command !== 'dev') return;
                const script = fileURLToPath(new URL('../scripts/px-anim-monitor.ts', import.meta.url));
                injectScript('page', `import ${JSON.stringify(script)};`);
            },
        },
    };
}
