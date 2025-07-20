<script setup lang="ts">
defineProps<{
    times: Time[];
}>();
</script>

<template>
    <div class="rounded-lg border bg-white shadow-sm">
        <div class="p-6">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"
                >
                    <Icon name="lucide:bar-chart" class="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <div class="text-2xl font-bold text-slate-800">
                        {{ computeAverageOf5(times) ?? 'N/A' }}
                    </div>
                    <div class="text-sm text-slate-600">Average of 5</div>
                </div>
            </div>
        </div>
    </div>
</template>
