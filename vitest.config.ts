import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
    },
    resolve:{
        alias: {
            '#components': 'app/components',
            '#utils': 'shared/utils',
        },
    }
});
