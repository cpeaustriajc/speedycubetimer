<script setup lang="ts">
const time = ref(0);
const times = useSessionStorage<Time[]>('solves', []);
const sessions = useSessionStorage<{ id: string; label: string }[]>(
    'solve_sessions',
    [
        {
            id: '1',
            label: 'Casual Solves',
        },
    ]
);
const isRunning = ref(false);
const keyPressed = ref(false);
const isWaiting = ref(false);
const waitTimeout = ref<number | null>(null);
const currentSession = ref(sessions.value[0]!);
const { scramble, loadScramble } = useScramble();

const currentTimes = computed(() =>
    times.value.filter((time) => time.sessionId === currentSession.value.id)
);

const userPreferences = useSessionStorage('user_preferences', {
    waitDelayMs: 200,
});

function stop() {
    isRunning.value = false;
    isWaiting.value = false;

    if (waitTimeout.value !== null) {
        window.clearTimeout(waitTimeout.value);
        waitTimeout.value = null;
    }
}

function reset() {
    isRunning.value = false;
    isWaiting.value = false;
    time.value = 0;

    if (waitTimeout.value !== null) {
        window.clearTimeout(waitTimeout.value);
        waitTimeout.value = null;
    }
}

async function handleKeyUp(event: KeyboardEvent) {
    if (event.key === ' ') {
        if (isRunning.value) {
            times.value.push({
                time: time.value,
                id: Math.floor(Math.random() * 1000),
                status: 'solved',
                sessionId: currentSession.value.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            stop();
            await loadScramble();
        } else if (keyPressed.value) {
            keyPressed.value = false;

            if (!isWaiting.value) {
                if (waitTimeout.value !== null) {
                    window.clearTimeout(waitTimeout.value);
                    waitTimeout.value = null;
                }

                isWaiting.value = false;
                isRunning.value = true;
            } else {
                isWaiting.value = false;

                if (waitTimeout.value !== null) {
                    window.clearTimeout(waitTimeout.value);
                    waitTimeout.value = null;
                }
            }
        }
    }
}

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
        if (!isRunning.value) {
            if (keyPressed.value) {
                return;
            }

            reset();

            isWaiting.value = true;
            keyPressed.value = true;

            waitTimeout.value = window.setTimeout(() => {
                isWaiting.value = false;
            }, userPreferences.value.waitDelayMs);
        }
    }
}

function removeTime(id: number) {
    times.value = times.value.filter((t) => t.id !== Number(id));
}

function dnf(id: number) {
    times.value = times.value.map((t) => {
        if (t.id === id) {
            if (t.status === 'dnf') {
                return { ...t, status: 'solved' };
            }

            return { ...t, status: 'dnf' };
        }
        return t;
    });
}

function plusTwo(id: number) {
    times.value = times.value.map((t) => {
        if (t.id === id) {
            if (t.status === 'plusTwo') {
                return { ...t, time: t.time - 2, status: 'solved' };
            }
            return { ...t, time: t.time + 2, status: 'plusTwo' };
        }
        return t;
    });
}

let interval: number | undefined;

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
    if (interval) {
        window.clearInterval(interval);
    }
    if (waitTimeout.value !== null) {
        window.clearTimeout(waitTimeout.value);
    }
});

watch(isRunning, (running) => {
    if (running) {
        if (interval) {
            window.clearInterval(interval);
        }

        const startTime = window.performance.now();
        interval = window.setInterval(() => {
            const currentTime = window.performance.now();
            time.value = (currentTime - startTime) / 1000;
        }, 1);
    } else {
        if (interval) {
            window.clearInterval(interval);
            interval = undefined;
        }
    }
});
</script>

<template>
    <div class="flex flex-col-reverse lg:grid gap-6 lg:grid-cols-4">
        <aside class="lg:col-span-1 grid gap-2">
            <Sessions
                v-model:currentSession="currentSession"
                v-model:sessions="sessions"
                :times="currentTimes"
            />
            <Solves
                :times="currentTimes"
                @delete="removeTime"
                @dnf="dnf"
                @plus-two="plusTwo"
            />
        </aside>
        <main class="space-y-6 lg:col-span-3">
            <LazyScramble />
            <Clock
                :isRunning="isRunning"
                :keyPressed="keyPressed"
                :isWaiting="isWaiting"
                :time="time"
            />
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
    </div>
</template>
