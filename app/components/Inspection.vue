<script setup lang="ts">
const props = defineProps<{
    elapsed: number;
    duration: number;
    isInspecting: boolean;
    keyPressed: boolean;
    isWaiting: boolean;
    penalty: 'none' | 'plusTwo' | 'dnf';
}>();

const remaining = computed(() => {
    const rem = Math.max(0, props.duration - props.elapsed);
    return rem;
});

const colorClasses = computed(() => {
    if (props.keyPressed && props.isWaiting) return ['text-yellow-400'];
    if (props.keyPressed && !props.isWaiting) return ['text-green-400'];
    if (props.penalty === 'dnf') return ['text-red-500'];
    if (props.penalty === 'plusTwo') return ['text-orange-400'];
    return [];
});

const display = computed(() => {
    const base = props.isInspecting
        ? Math.max(0, Math.ceil(remaining.value))
        : Math.max(0, Math.ceil(props.duration));
    return String(base);
});
</script>

<template>
    <div class="relative z-10 text-center">
        <code class="mb-6 font-mono text-8xl font-bold tracking-tight md:text-9xl" :class="colorClasses">
            {{ display }}
            <span class="ml-4 text-3xl align-super" v-if="penalty === 'plusTwo'">+2</span>
            <span class="ml-4 text-3xl align-super" v-else-if="penalty === 'dnf'">DNF</span>
        </code>
        <div class="text-sm opacity-70">Inspection</div>
    </div>

</template>
