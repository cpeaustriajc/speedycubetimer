<script setup lang="ts">
const time = ref(0);
const times = ref<Time[]>([]);
const isRunning = ref(false);
const keyPressed = ref(false);
const currentSession = ref('1');
const { scramble, loadScramble } = useScramble();
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

function removeTime(id: string) {
    times.value = times.value.filter((t) => t.id !== Number(id));
}

let interval: number | undefined;

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
        <aside class="lg:col-span-1">
            <Sessions :currentSession="currentSession" :times="times" />
            <Solves :times="times" @delete="removeTime" />
        </aside>
        <main class="space-y-6 lg:col-span-3">
            <LazyScramble />
            <Clock
                :isRunning="isRunning"
                :keyPressed="keyPressed"
                :time="time"
            />
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <PersonalBest :times="times" />
                <AverageOf5 :times="times" />
                <AverageOf12 :times="times" />
            </div>
        </main>
    </div>
</template>
