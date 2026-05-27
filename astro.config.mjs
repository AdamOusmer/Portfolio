// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import { paraglideVitePlugin } from '@inlang/paraglide-js';


// https://astro.build/config
export default defineConfig({
    site: 'https://adam-ousmer.dev',
    prefetch:  true,

    compressHTML: true,

    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: false,
        },
    },

    vite: {
        plugins: [
            paraglideVitePlugin({
                project: './project.inlang',
                outdir: './src/paraglide',
                strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
                urlPatterns: [
                    {
                        pattern: '/:path(.*)?',
                        localized: [
                            ['fr', '/fr/:path(.*)?'],
                            ['en', '/:path(.*)?'],
                        ],
                    },
                ],
            }),
        ],
    },



    integrations: [
        mermaid({
            // 'base' lets our themeVariables actually apply. autoTheme would
            // otherwise force 'dark' from Starlight's data-theme and clobber
            // them with mermaid's built-in dark palette.
            theme: 'base',
            autoTheme: false,
            mermaidConfig: {
                themeVariables: {
                    darkMode: true,
                    background: "transparent",
                    primaryColor: "#111827",
                    primaryBorderColor: "#1f2937",
                    primaryTextColor: "#e5e7eb",
                    secondaryColor: "#0b0f19",
                    tertiaryColor: "#0b0f19",
                    lineColor: "#b2bcc7",
                    textColor: "#e5e7eb",
                    nodeTextColor: "#e5e7eb",
                    mainBkg: "#111827",
                    secondBkg: "#0b0f19",
                    nodeBorder: "#1f2937",
                    clusterBkg: "rgba(17, 24, 39, 0.4)",
                    clusterBorder: "#1f2937",
                    edgeLabelBackground: "#0b0f19",
                    actorBkg: "#111827",
                    actorBorder: "#1f2937",
                    actorTextColor: "#e5e7eb",
                    actorLineColor: "#b2bcc7",
                    signalColor: "#e5e7eb",
                    signalTextColor: "#e5e7eb",
                    labelBoxBkgColor: "#111827",
                    labelBoxBorderColor: "#1f2937",
                    labelTextColor: "#e5e7eb",
                    noteBkgColor: "rgba(16, 185, 129, 0.08)",
                    noteTextColor: "#e5e7eb",
                    noteBorderColor: "#10b981",
                },
            },
        }),

        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en-US',
                    fr: 'fr-CA',
                },
            },
        }),
    ],

    server: {
        port: 4321,
        host: true
    },


    build: {
        inlineStylesheets: 'auto',
    }
});
