// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: [
        'reka-ui/nuxt',
        '@clerk/nuxt',
        '@nuxt/icon',
        '@nuxt/test-utils/module',
        '@nuxt/ui',
        '@vueuse/nuxt',
        '@pinia/nuxt',
    ],
    ssr: false,
    devtools: { enabled: true },
    runtimeConfig: {
        dbhost: process.env.NUXT_DATABASE_URL,
    },
    debug: true,
    css: ['~/assets/css/main.css'],
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
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag === 'twisty-player',
        },
    },
    pinia: {
        storesDirs: ['./app/stores/**'],
    },
});
