<script setup lang="ts">

interface Time {
    time: number;
    id: number;
}

defineProps<{
    times: Time[];
}>();
</script>

<template>
    <div class="rounded-lg border bg-white shadow-sm">
        <div class="p-6">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100"
                >
                    <Icon name="lucide:target" class="h-5 w-5 text-green-600" />
                </div>
                <div>
                    <div class="text-2xl font-bold text-slate-800">
                        {{ computePersonalBest(times) ?? 'N/A' }}
                    </div>
                    <div class="text-sm text-slate-600">Personal Best</div>
                </div>
            </div>
        </div>
    </div>
</template>
