import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import yaml from "@modyfi/vite-plugin-yaml";


import mdx from '@astrojs/mdx';


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
    integrations: [react(), tailwind({
        config: { applyBaseStyles: true },
    }), mdx()],
});