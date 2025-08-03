<script setup lang="ts">
defineProps<{
    times: Time[];
}>();
</script>

<template>
    <UCard>
        <div class="p-6">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100"
                >
                    <Icon
                        name="lucide:trophy"
                        class="h-5 w-5 text-purple-600"
                    />
                </div>
                <div>
                    <div class="text-2xl font-bold">
                        {{ computeAverageOf12(times) ?? 'N/A' }}
                    </div>
                    <div class="text-sm">Average of 12</div>
                </div>
            </div>
        </div>
    </UCard>
</template>
