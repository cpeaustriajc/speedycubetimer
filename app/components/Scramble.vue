<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { randomScrambleForEvent } from 'cubing/scramble';

onMounted(() => {
    import('cubing/twisty');
});

const scramble = ref<string | undefined>(undefined);

async function loadScramble() {
    const result = await randomScrambleForEvent('333');
    scramble.value = result.toString();
}

// Load initial scramble on mount
onMounted(() => {
    if (!scramble.value) loadScramble();
});
</script>

<template>
    <div class="rounded-lg border bg-white shadow-sm">
        <div class="p-6">
            <div class="mb-4 flex items-center gap-3">
                <Icon name="lucide:shuffle" class="h-5 w-5 text-slate-600" />
                <span class="font-medium text-slate-700">Scramble</span>
                <button
                    class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    @click="loadScramble"
                >
                    <Icon name="lucide:rotate-ccw" class="w-4 h-4" />
                </button>
            </div>
            <div
                class="min-h-6 text-center font-mono text-lg leading-relaxed text-slate-800"
            >
                <p v-if="scramble">{{ scramble }}</p>
            </div>
            <div class="flex min-h-64 justify-center">
                <twisty-player
                    v-if="scramble"
                    :alg="scramble"
                    visualization="2D"
                    background="none"
                    control-panel="none"
                />
            </div>
        </div>
    </div>
</template>
