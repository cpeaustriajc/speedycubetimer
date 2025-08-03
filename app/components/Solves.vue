<script setup lang="ts">
defineProps<{
    times: Time[];
}>();

const emit = defineEmits<{
    (e: 'delete', id: string): void;
}>();
</script>

<template>
    <UCard class="min-h-80 overflow-y-auto">
        <div
            v-if="times.length > 0"
            v-for="solve in times"
            :key="solve.id"
            class="flex items-center justify-between my-2 rounded-lg bg-slate-50 dark:bg-slate-800 px-3 py-2 transition-colors hover:bg-slate-100"
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
                    @click="emit('delete', solve.id.toString())"
                >
                    <Icon name="lucide:trash" class="h-3 w-3" />
                </button>
            </div>
        </div>
        <div v-else>
            <p class="text-center text-sm text-slate-500 dark:text-slate-50">
                No solves recorded yet.
            </p>
        </div>
    </UCard>
</template>
