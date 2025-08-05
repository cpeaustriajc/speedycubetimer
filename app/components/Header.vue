<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { clear } = useUserSession();

const loggedInItems = ref<DropdownMenuItem[]>([
    {
        label: 'Profile',
        icon: 'i-lucide-user',
    },
    {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        onSelect: () => {
            clear();
        },
    },
]);
const loggedOutItems = ref<DropdownMenuItem[]>([
    {
        label: 'Login',
        icon: 'i-lucide-log-in',
        to: '/login',
    },
    {
        label: 'Register',
        icon: 'i-lucide-user-plus',
        to: '/register',
    },
]);
</script>
<template>
    <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div>
                <h1 class="text-2xl font-bold">KyuBix</h1>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <DevOnly>
                <UButton icon="i-lucide-settings" />
                <UButton icon="i-lucide-chart-bar" />
            </DevOnly>
            <AuthState>
                <template #default="{ loggedIn }">
                    <UDropdownMenu
                        :content="{ align: 'start' }"
                        v-if="loggedIn"
                        :items="loggedInItems"
                    >
                        <UButton icon="lucide:user" aria-label="Profile" />
                    </UDropdownMenu>
                    <UDropdownMenu
                        v-else
                        :content="{ align: 'start' }"
                        :items="loggedOutItems"
                    >
                        <UButton icon="lucide:user" aria-label="Profile" />
                    </UDropdownMenu>
                </template>
                <template #placeholder>
                    <button disabled>Loading...</button>
                </template>
            </AuthState>
        </div>
    </header>
</template>
