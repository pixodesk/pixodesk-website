import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import yaml from "@modyfi/vite-plugin-yaml";


export default defineConfig({
    vite: {
        
        // site: 'https://pixodesk.github.io',
        // base: '/pixodesk-web',

        site: 'https://pixodesk.com',

        // build: {
        //     assets: 'astro-assets',   // instead of "_astro"
        // },
        // base: './',                 // if you want relative paths
        // buildOptions: {
        //     assetsPrefix: './',       // ensure relative asset URLs
        // },
        // base: "./",
        // build: {
        //     assets: './',
        //     assetsPrefix: './'
        // },
        plugins: [yaml()],
        server: {
            host: true, // Allow access via 127.0.0.1 or custom domains
            allowedHosts: ['pixodesk.com'], // Domain
        }
    },
    integrations: [
        react(),
        tailwind({
            config: { applyBaseStyles: true },
<<<<<<< Updated upstream
        })
=======
        }),
        starlight({
            title: "Pixodesk",
            disable404Route: true,
            pagefind: false,
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
            },
            defaultLocale: 'root',
            expressiveCode: {
                themes: ['github-light', 'github-dark'],  // Use light syntax theme, github-light, min-light, slack-ochin, solarized-light, vitesse-light

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
            // customCss: ['./src/styles/starlight-custom.css'], // Custom css
            customCss: ['./src/styles/starlight-custom-style.css'], 
            tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
            components: {
                // Header: './src/components/starlight/Header.astro',
                // Footer: './src/components/starlight/Footer.astro',
            },
            sidebar: [
                {
                    label: 'Getting Started',
                    items: [
                        { label: 'Introduction', slug: 'docs' },
                    ],
                },
                {
                    label: 'Lottie for Web',
                    autogenerate: { directory: 'docs/web' },
                },
                {
                    label: 'Lottie for Mobile',
                    autogenerate: { directory: 'docs/mobile' },
                },
            ],
        }),
        mdx(),

>>>>>>> Stashed changes
    ],
});