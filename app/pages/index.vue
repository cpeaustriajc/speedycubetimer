<script setup lang="ts">
const time = ref(0);
const times = useSessionStorage<Time[]>('times', []);
const sessions = useSessionStorage<{ id: string; label: string }[]>('sessions', [
    {
        id: '1',
        label: 'Casual Solves',
    },
]);
const isRunning = ref(false);
const keyPressed = ref(false);
const currentSession = ref(sessions.value[0]!);
const { scramble, loadScramble } = useScramble();

const currentTimes = computed(() =>
    times.value.filter((time) => time.sessionId === currentSession.value.id)
);
function stop() {
    isRunning.value = false;
}

function reset() {
    isRunning.value = false;
    time.value = 0;
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
        } else {
            keyPressed.value = false;
            isRunning.value = true;
        }
    }
}

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
        if (!isRunning.value) {
            keyPressed.value = true;
            reset();
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
});

watch(isRunning, (running) => {
    if (running) {
        const startTime = window.performance.now();
        interval = window.setInterval(() => {
            const currentTime = window.performance.now();
            time.value = (currentTime - startTime) / 1000;
        }, 1);
    } else {
        window.clearInterval(interval);
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
