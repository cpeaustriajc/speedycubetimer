<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
const items = computed<DropdownMenuItem[]>(() => [
    {
        icon: 'i-lucide-log-in',
        label: 'Sign In',
        to: '/signin',
    },
    {
        icon: 'i-lucide-user-plus',
        label: 'Sign Up',
        to: '/signup',
    },
]);
</script>
<template>
    <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div>
                <NuxtLink to="/">
                    <h1 class="text-2xl font-bold">KyuBix</h1>
                </NuxtLink>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <DevOnly>
                <UButton
                    class="rounded-full"
                    icon="i-lucide-settings"
                    size="lg"
                />
                <UButton
                    class="rounded-full"
                    icon="i-lucide-chart-bar"
                    size="lg"
                />
            </DevOnly>
            <SignedOut>
                <UDropdownMenu
                    :content="{
                        align: 'end',
                    }"
                    :items="items"
                >
                    <UButton
                        class="rounded-full"
                        size="lg"
                        icon="i-lucide-user"
                    />
                </UDropdownMenu>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </header>
</template>
