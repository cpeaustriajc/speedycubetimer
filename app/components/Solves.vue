<script setup lang="ts">
defineProps<{
    times: Time[];
}>();

defineEmits<{
    (e: 'delete', id: number): void;
}>();
</script>

<template>
    <div
        class="h-[442px] overflow-y-scroll rounded-lg border bg-white shadow-sm"
    >
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 class="text-lg font-semibold leading-none tracking-tight">
                Recent Solves
            </h3>
        </div>
        <div class="p-6 pt-0">
            <div class="space-y-2">
                <div
                    v-for="solve in times"
                    :key="solve.id"
                    class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100"
                >
                    <span class="font-mono text-sm font-medium">{{
                        formatTime(solve.time)
                    }}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-slate-500">{{
                            computeAverageOf5(times) ?? 'N/A'
                        }}</span>
                        <span class="text-xs text-slate-400">|</span>
                        <span class="text-xs text-slate-500">{{
                            computeAverageOf12(times) ?? 'N/A'
                        }}</span>
                        <button
                            type="button"
                            class="text-xs text-red-500 hover:text-red-700"
                            @click="$emit('delete', solve.id)"
                        >
                            <Icon name="lucide:trash" class="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
