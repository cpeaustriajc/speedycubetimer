<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    time: number;
    isRunning: boolean;
    keyPressed: boolean;
}>();

const containerClass = computed(() => [
    'relative overflow-hidden rounded-lg border shadow-sm',
    {
        'bg-white': !props.isRunning && !props.keyPressed,
        'bg-green-400': props.isRunning && !props.keyPressed,
        'bg-yellow-400': props.keyPressed,
    },
]);
</script>

<template>
    <div :class="containerClass">
        <div class="relative z-10 text-center">
            <code class="mb-6 font-mono text-8xl font-bold tracking-tight text-slate-800 md:text-9xl">
                {{ formatTime(time) }}
            </code>
        </div>
    </div>
</template>
