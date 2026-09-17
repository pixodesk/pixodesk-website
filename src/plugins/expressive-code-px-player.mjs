/**
 * Marks a documentation code block as PLAYABLE, so the page's player script can put a live
 * preview under it (`/app/player/embed.js`, from the private kf/unified-preview-player project).
 *
 * Usage in markdown — a word on the fence's meta line:
 *
 *     ```json px-player
 *     { "type": "svg", … }
 *     ```
 *     ```svg px-player=pixodesk
 *     <svg …>
 *     ```
 *
 * The code block itself is untouched and stays copyable: the player is ADDED beside it, fed with
 * the exact text shown. Nothing has to be hosted as a file, and the example can never drift from
 * what plays, because they are the same characters.
 *
 * `px-player=<name>` picks the starting player (lottie, dotlottie, pixodesk, react, vue); the
 * player figures the format out on its own, so the bare marker is usually right.
 */

const MARKER = /(^|\s)px-player(?:=(\S+))?(\s|$)/;

export function expressiveCodePxPlayer() {
    return {
        name: 'pixodesk-preview-player',
        hooks: {
            postprocessRenderedBlock: ({ codeBlock, renderData }) => {
                const meta = codeBlock.meta ?? '';
                const match = MARKER.exec(meta);
                if (!match) return;
                const root = renderData.blockAst;
                if (!root?.properties) return;
                root.properties['data-px-player'] = '';
                if (match[2]) root.properties['data-px-player-kind'] = match[2];
            },
        },
    };
}
