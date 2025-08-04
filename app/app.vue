<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
    <UApp>
        <UAlert
            color="warning"
            variant="outline"
            title="Product is still in beta"
            description="Changes are frequent and are still unstable. The final product may differ from the current version."
            icon="i-lucide-alert-triangle"
        />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
    <Analytics />
    <SpeedInsights />
</template>
