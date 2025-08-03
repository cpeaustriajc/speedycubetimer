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
    <UCard>
        <div class="p-6">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100"
                >
                    <Icon name="lucide:target" class="h-5 w-5 text-green-600" />
                </div>
                <div>
                    <div class="text-2xl font-bold">
                        {{ computePersonalBest(times) ?? 'N/A' }}
                    </div>
                    <div class="text-sm">Personal Best</div>
                </div>
            </div>
        </div>
    </UCard>
</template>
