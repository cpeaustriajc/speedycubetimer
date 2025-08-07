<script setup lang="ts">
const props = defineProps<{
    time: number;
    isRunning: boolean;
    keyPressed: boolean;
    isWaiting: boolean;
}>();

const clockTextColor = computed(() => {
    if (props.keyPressed && props.isWaiting) {
        return ['text-yellow-400'];
    } else if (props.keyPressed && !props.isWaiting) {
        return ['text-green-400'];
    } else if (props.isRunning) {
        return [];
    } else {
        return [];
    }
});
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
