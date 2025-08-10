<script setup lang="ts">
const { userId, has } = useAuth();

const timer = useTimerStore();
const { scramble, loadScramble } = useScramble();
const {
    time,
    isRunning,
    keyPressed,
    isWaiting,
    isInspecting,
    inspectionElapsed,
    inspectionPenalty,
    userPreferences,
    currentTimes,
    currentSession,
    sessions: solveSessionsSessionStorage,
} = storeToRefs(timer);

const isFocusModeEnabled = computed(
    () => userPreferences.value.timer.hideUiDuringSolve === true
);
const isFocusModeActive = computed(() => {
    if (!isFocusModeEnabled.value) return false;
    // During solving: always focus
    if (isRunning.value) return true;
    // During inspection or when starting inspection (pressed and waiting)
    if (userPreferences.value.timer.showInspectionTime) {
        if (isInspecting.value) return true;
        if (keyPressed.value) return true;
    }
    return false;
});

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
        timer.onSpaceDown();
    }
}

async function handleKeyUp(event: KeyboardEvent) {
    if (event.key === ' ') {
        const result = timer.onSpaceUp();
        if (result === 'stopped') {
            await timer.finalizeSolve({
                scramble: scramble.value,
                userId: userId.value ?? null,
                isPro: Boolean(has.value?.({ plan: 'pro' })),
            });
            await loadScramble();
            // Do not auto-start inspection; require user interaction
        }
    }
}

function onPointerDown(e: PointerEvent) {
    if (!e.isPrimary) return;
    timer.onSpaceDown();
}

async function onPointerUp(e: PointerEvent) {
    if (!e.isPrimary) return;
    const result = timer.onSpaceUp();
    if (result === 'stopped') {
        await timer.finalizeSolve({
            scramble: scramble.value,
            userId: userId.value ?? null,
            isPro: Boolean(has.value?.({ plan: 'pro' })),
        });
        await loadScramble();
    }
}

onMounted(async () => {
    await import('cubing/twisty');
});

onMounted(() => {
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('keydown', handleKeyDown);
    timer.dispose();
});
</script>

<template>
    <div class="flex flex-col-reverse lg:grid gap-6 lg:grid-cols-4">
        <aside
            class="lg:col-span-1 grid gap-2"
            :class="{ 'opacity-0 pointer-events-none select-none': isFocusModeActive }"
            :aria-hidden="isFocusModeActive ? 'true' : 'false'"
        >
            <Sessions
                v-model:currentSession="currentSession"
                v-model:sessions="solveSessionsSessionStorage"
                :times="currentTimes"
            />
            <Solves
                :times="currentTimes"
                @delete="timer.removeTime"
                @dnf="timer.dnf"
                @plus-two="timer.plusTwo"
            />
        </aside>
        <main
            class="space-y-6 lg:col-span-3"
            :class="{ 'opacity-0 pointer-events-none select-none': isFocusModeActive }"
            :aria-hidden="isFocusModeActive ? 'true' : 'false'"
        >
            <LazyScramble />
            <div
                class="select-none"
                @pointerdown.prevent="onPointerDown"
                @pointerup.prevent="onPointerUp"
            >
                <Inspection
                    v-if="userPreferences.timer.showInspectionTime && isInspecting"
                    :elapsed="inspectionElapsed"
                    :duration="userPreferences.timer.inspectionTimeDuration"
                    :isInspecting="isInspecting"
                    :keyPressed="keyPressed"
                    :isWaiting="isWaiting"
                    :penalty="inspectionPenalty"
                />
                <Clock
                    v-else
                    :isRunning="isRunning"
                    :keyPressed="keyPressed"
                    :isWaiting="isWaiting"
                    :time="time"
                />
            </div>
            <div class="flex justify-center mt-12">
                <twisty-player
                    v-if="scramble"
                    :alg="scramble"
                    visualization="2D"
                    background="none"
                    control-panel="none"
                />
            </div>
        </main>

        <!-- Focus Mode Overlay -->
        <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isFocusModeActive"
                class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                @pointerdown.prevent="onPointerDown"
                @pointerup.prevent="onPointerUp"
            >
                <Transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                >
                    <div
                        v-if="isFocusModeActive"
                        class="px-6 py-10 rounded-xl shadow-2xl bg-white/80 dark:bg-slate-900/80 ring-1 ring-black/5 dark:ring-white/10 select-none"
                    >
                        <Inspection
                            v-if="userPreferences.timer.showInspectionTime && isInspecting"
                            :elapsed="inspectionElapsed"
                            :duration="userPreferences.timer.inspectionTimeDuration"
                            :isInspecting="isInspecting"
                            :keyPressed="keyPressed"
                            :isWaiting="isWaiting"
                            :penalty="inspectionPenalty"
                        />
                        <Clock
                            v-else
                            :isRunning="isRunning"
                            :keyPressed="keyPressed"
                            :isWaiting="isWaiting"
                            :time="time"
                        />
                    </div>
                </Transition>
            </div>
        </Transition>
    </div>
</template>
