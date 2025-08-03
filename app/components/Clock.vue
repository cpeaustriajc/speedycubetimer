<script setup lang="ts">
const props = defineProps<{
    time: number;
    isRunning: boolean;
    keyPressed: boolean;
}>();

const clockTextColor = computed(() => [
    {
        'text-green-400': props.isRunning && !props.keyPressed,
        'text-yellow-400': props.keyPressed,
    },
]);
</script>

<template>
    <div class="relative z-10 text-center">
        <code
            class="mb-6 font-mono text-8xl font-bold tracking-tight md:text-9xl"
            :class="clockTextColor"
        >
            {{ formatTime(time) }}
        </code>
    </div>
</template>
