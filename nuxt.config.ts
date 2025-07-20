// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    ssr: false,
    devtools: { enabled: true },
    vite: {
        worker: {
            format: 'es',
        },
    },
    app: {
        head: {
            title: 'Speedy Cube Timer',
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
    modules: ['@nuxt/icon', '@nuxtjs/tailwindcss'],
});
