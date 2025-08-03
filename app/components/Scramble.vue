<script setup lang="ts">
onMounted(async () => {
    await import('cubing/twisty');
});

const { scramble, loadScramble } = useScramble();
</script>

<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Icon name="lucide:shuffle" class="h-5 w-5" />
            <span class="font-medium">Scramble</span>
        </div>
        <UButton @click="loadScramble">
            <Icon name="lucide:rotate-ccw" class="w-4 h-4" />
        </UButton>
    </div>
    <div class="min-h-6 text-center font-mono text-lg leading-relaxed">
        <p v-if="scramble">{{ scramble }}</p>
    </div>
    <!-- <div class="flex min-h-64 justify-center">
            <twisty-player
                v-if="scramble"
                :alg="scramble"
                visualization="2D"
                background="none"
                control-panel="none"
            />
        </div> -->
</template>
