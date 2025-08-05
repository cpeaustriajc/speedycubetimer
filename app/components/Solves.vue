<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
    times: Time[];
}>();

const emit = defineEmits<{
    (e: 'delete', id: number): void;
    (e: 'dnf', id: number): void;
    (e: 'plusTwo', id: number): void;
}>();
const items = (solveId: number): DropdownMenuItem[] => {
    return [
        {
            label: 'DNF',
            icon: 'lucide:cross',
            onSelect: () => emit('dnf', solveId),
        },
        {
            label: '+2',
            icon: 'lucide:plus',
            onSelect: () => emit('plusTwo', solveId),
        },
        {
            label: 'Delete',
            icon: 'lucide:trash',
            onSelect: () => emit('delete', solveId),
        },
    ];
};
</script>

<template>
    <UCard class="min-h-80 overflow-y-auto">
        <ScrollAreaRoot>
            <ScrollAreaViewport class="h-96 p-4">
                <div
                    v-if="times.length > 0"
                    v-for="solve in times"
                    :key="solve.id"
                    class="flex items-center justify-between my-2 rounded-lg bg-slate-50 dark:bg-slate-800 px-3 py-2 transition-colors hover:bg-slate-100"
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

                        <UDropdownMenu
                            :content="{
                                align: 'end',
                            }"
                            :items="items(solve.id)"
                        >
                            <UButton icon="i-lucide-ellipsis-vertical" />
                        </UDropdownMenu>
                    </div>
                </div>
                <div v-else>
                    <p
                        class="text-center text-sm text-slate-500 dark:text-slate-50"
                    >
                        No solves recorded yet.
                    </p>
                </div>
                <ScrollAreaScrollbar
                    class="flex select-none touch-none p-0.5 z-20 bg-neutral-100 transition-colors duration-[160ms] ease-out hover:bg-neutral-900 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    orientation="vertical"
                >
                    <ScrollAreaThumb
                        class="flex-1 bg-neutral-500 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
                    />
                </ScrollAreaScrollbar>
            </ScrollAreaViewport>
        </ScrollAreaRoot>
    </UCard>
</template>
