<script setup lang="ts">
defineProps<{
    times: Time[];
}>();

const emit = defineEmits<{
    (e: 'delete', id: string): void;
}>();
</script>

<template>
    <ScrollAreaRoot
        class="h-[420px] relative overflow-hidden shadow-sm bg-white border rounded-lg"
        style="--scrollbar-size: 10px"
    >
        <div
            class="absolute top-0 z-10 w-full h-6 bg-gradient-to-t from-transparent to-white"
        />
        <ScrollAreaViewport class="w-full h-full rounded">
            <div class="py-[15px] px-5 space-y-2">
                <div
                    v-if="times.length > 0"
                    v-for="solve in times"
                    :key="solve.id"
                    class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100"
                >
                    <span class="font-mono text-sm font-medium">{{
                        formatTime(solve.time)
                    }}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-slate-500">{{
                            computeAverageOf5(times) ?? 'N/A'
                        }}</span>
                        <span class="text-xs text-slate-400">|</span>
                        <span class="text-xs text-slate-500">{{
                            computeAverageOf12(times) ?? 'N/A'
                        }}</span>
                        <button
                            type="button"
                            class="text-xs text-red-500 hover:text-red-700"
                            @click="emit('delete', solve.id.toString())"
                        >
                            <Icon name="lucide:trash" class="h-3 w-3" />
                        </button>
                    </div>
                </div>
                <div v-else>
                    <p class="text-center text-sm text-slate-500">
                        No solves recorded yet.
                    </p>
                </div>
            </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
            class="flex select-none touch-none p-0.5 z-20 bg-neutral-400 transition-colors duration-[160ms] ease-out hover:bg-blackA2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
        >
            <ScrollAreaThumb
                class="flex-1 bg-gray-200 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            />
        </ScrollAreaScrollbar>
    </ScrollAreaRoot>
</template>
