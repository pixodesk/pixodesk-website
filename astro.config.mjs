import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import yaml from "@modyfi/vite-plugin-yaml";
import mdx from '@astrojs/mdx';
import starlight from "@astrojs/starlight";
import { remarkSvgaDocLinks } from "./src/plugins/remark-svga-doc-links.mjs";
import { docsSidebar, docsSidebarIntegration, svgaRedirects } from "./src/plugins/docs-sidebar.mjs";

export default defineConfig({
    site: 'https://pixodesk.com',
    // The player docs moved from the custom /app/svga/docs shell into the
    // Starlight tree under /docs (same section paths, plus /docs/player for the
    // old index). One explicit redirect per synced page.
    redirects: svgaRedirects(),
    markdown: {
        remarkPlugins: [remarkSvgaDocLinks],
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
        },
    },
    vite: {
        plugins: [yaml()],
        // Mermaid is loaded via a lazy dynamic import (starlight/Header.astro), so
        // without this the dev server only discovers it on first use and serves 504
        // "outdated optimize dep" until a restart — diagrams silently don't render.
        optimizeDeps: {
            include: ['mermaid'],
        },
        server: {
            host: true, // Allow access via 127.0.0.1 or custom domains
            allowedHosts: ['pixodesk.com'], // Domain
        }
    },
    integrations: [
        react(),
        tailwind({
        }),
        starlight({
            title: "Pixodesk",
            disable404Route: true,
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
            },
            defaultLocale: 'root',
            expressiveCode: {
                themes: ['github-light', 'github-dark'],  //  github-light, min-light, slack-ochin, solarized-light, vitesse-light
                frames: {
                    terminalTitlebarDotsOpacity: '0',      // Hide the dots
                    terminalTitlebarBorderBottomColor: 'transparent',
                    editorTabBarBorderBottomColor: 'transparent',
                },
                styleOverrides: {
                    frames: {
                        showCopyToClipboardButton: true,  // keep copy button
                        frameBoxShadowCssValue: 'none',
                    },
                },

            },
            customCss: ['./src/styles/starlight-custom-style.css'],
            routeMiddleware: './src/routeData.ts',   // per-app sidebar filtering + bare cards landing
            tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
            components: {
                Sidebar: './src/components/starlight/Sidebar.astro',   // default sidebar + scroll-spy for the hash-link items
                Header: './src/components/starlight/Header.astro',     // site menu on top of the Starlight header
                // Footer: './src/components/starlight/Footer.astro',
            },
            sidebar: docsSidebar(),
        }),
        mdx(),
        docsSidebarIntegration(),   // keeps the generated docs sidebar fresh during `astro dev`
    ]
});