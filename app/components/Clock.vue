<script setup lang="ts">
defineProps<{
    time: number;
}>();
</script>

<template>
    <div class="relative z-10 text-center">
        <code
            class="mb-6 font-mono text-8xl font-bold tracking-tight md:text-9xl"
        >
            {{ formatTime(time) }}
        </code>
    </div>
</template>
