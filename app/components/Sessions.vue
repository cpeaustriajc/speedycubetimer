<script setup lang="ts">
defineProps<{
    currentSession: string;
    times: Time[];
}>();
</script>

<template>
    <div class="mb-6 rounded-lg border bg-white shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
            <h3
                class="flex items-center gap-3 text-lg font-semibold leading-none tracking-tight"
            >
                <Icon name="lucide:trophy" class="h-5 w-5 text-amber-500" />
                Session
                {{ currentSession }}
            </h3>
            <div class="space-y-4 p-6 pt-0">
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-slate-800">
                            {{ times.length }}
                        </div>
                        <div class="text-xs text-slate-600">Solves</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600">
                            {{ computePersonalBest(times) ?? 'N/A' }}
                        </div>
                        <div class="text-xs text-slate-600">Best</div>
                    </div>
                </div>
                <hr class="border-t border-slate-200" />
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-slate-600">Average of 5</span>
                        <span
                            class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                        >
                            <span v-if="times.length >= 5">{{
                                computeAverageOf5(times) ?? 'N/A'
                            }}</span>
                            <span v-else>N/A</span>
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-slate-600"
                            >Average of 12</span
                        >
                        <span
                            class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700"
                        >
                            <span v-if="times.length >= 12">{{
                                computeAverageOf12(times) ?? 'N/A'
                            }}</span>
                            <span v-else>N/A</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
