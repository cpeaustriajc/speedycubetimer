import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/.nuxt/**',
            '**/.output/**',
            'tests/e2e/**',
        ],
        env: {
            // prevent Clerk from trying to hit network in unit tests
            CLERK_PUBLISHABLE_KEY: 'test_pk',
        },
    setupFiles: ['../tests/setup.ts'],
    },
    resolve: {
        alias: {
            '#components': 'app/components',
            '#utils': 'shared/utils',
        },
    },
});
