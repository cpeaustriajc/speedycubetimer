<script setup lang="ts">
const props = defineProps<{
    currentSession: { id: string; label: string };
    sessions: { id: string; label: string }[];
    times: Time[];
}>();

const emit = defineEmits<{
    (e: 'update:currentSession', value: { id: string; label: string }): void;
}>();

const sessionItems = computed(() => {
    return props.sessions.map((session) => ({
        label: session.label,
        id: session.id,
    }));
});
function onCreate(item: string) {
    const newSession = {
        id: Math.random().toString(36).substring(2, 15),
        label: item,
    };
    props.sessions.push(newSession);
    emit('update:currentSession', newSession);
}
</script>

<template>
    <UCard>
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
            <h3
                class="flex items-center gap-3 text-lg font-semibold leading-none tracking-tight"
            >
                <USelectMenu
                    create-item="always"
                    class="w-full"
                    :items="sessionItems"
                    :search-input="{
                        placeholder: 'Search or create session...',
                    }"
                    :model-value="currentSession"
                    @update:model-value="emit('update:currentSession', $event)"
                    @create="onCreate"
                />
            </h3>
            <div class="space-y-4 p-6 pt-0">
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold">
                            {{ times.length }}
                        </div>
                        <div class="text-xs">Solves</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600">
                            {{ computePersonalBest(times) ?? 'N/A' }}
                        </div>
                        <div class="text-xs">Best</div>
                    </div>
                </div>
                <hr class="border-t border-slate-200" />
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-sm">Average of 5</span>
                        <span
                            class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                        >
                            <span v-if="times.length >= 5">{{
                                computeAverageOf5(times) ?? 'N/A'
                            }}</span>
                            <span v-else>N/A</span>
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm">Average of 12</span>
                        <span
                            class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700"
                        >
                            <span v-if="times.length >= 12">{{
                                computeAverageOf12(times) ?? 'N/A'
                            }}</span>
                            <span v-else>N/A</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>
