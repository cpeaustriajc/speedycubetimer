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
            title: 'KyuBix',
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
    modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', 'reka-ui/nuxt'],
});
