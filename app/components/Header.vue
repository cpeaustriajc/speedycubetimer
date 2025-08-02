<template>
    <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div>
                <h1 class="text-2xl font-bold text-slate-800">KyuBix</h1>
            </div>
        </div>
        <DevOnly>
            <div class="flex items-center gap-2">
                <UButton icon="i-lucide-settings" />
                <UButton icon="i-lucide-chart-bar" />
                <AuthState>
                    <template #default="{ loggedIn, clear }">
                        <UButton
                            icon="lucide:log-out"
                            aria-label="Logout"
                            v-if="loggedIn"
                            @click="clear"
                        />
                        <div v-else class="flex items-center gap-2">
                            <UButton label="Login" to="/login" />
                            <UButton label="Register" to="/register" />
                        </div>
                    </template>
                    <template #placeholder>
                        <button disabled>Loading...</button>
                    </template>
                </AuthState>
            </div>
        </DevOnly>
    </header>
</template>
