// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    ssr: false,
    devtools: { enabled: true },
    vite: {
        worker: {
            format: 'es',
        },
        build: {
            target: 'es2020',
        },
        optimizeDeps: { esbuildOptions: { target: 'es2020' } },
    },
    app: {
        head: {
            title: 'KyuBix',
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag === 'twisty-player',
        },
    },
    modules: [
        '@nuxt/icon',
        '@nuxt/test-utils/module',
        '@nuxtjs/tailwindcss',
        'reka-ui/nuxt',
        '@clerk/nuxt',
    ],
});
