import type { Time } from '~~/shared/types/time';

interface FinalizeContext {
    scramble: string | null | undefined;
    userId: string | null | undefined;
    isPro: boolean;
}

export const useTimerStore = defineStore('timer', () => {
    const time = ref(0);
    const isRunning = ref(false);
    const keyPressed = ref(false);
    const isWaiting = ref(false);
    const waitTimeout = ref<number | null>(null);
    let interval: number | undefined;

    const isInspecting = ref(false);
    const inspectionElapsed = ref(0);
    const inspectionPenalty = ref<'none' | 'plusTwo' | 'dnf'>('none');
    let inspectionInterval: number | undefined;

    const userPreferences = useSessionStorage('userPreferences', {
        timer: {
            waitTime: 200,
            clockPrecision: 2,
            showInspectionTime: false,
            inspectionTimeDuration: 15,
            autoStartOnInspectionTimeUp: false,
            hideUiDuringSolve: false,
        },
    });

    const sessions = useSessionStorage('solve_sessions', [
        {
            id: '1',
            label: 'Casual Solves',
        },
    ]);
    const currentSession = ref(sessions.value[0]!);

    const solves = useSessionStorage<Time[]>('solves', []);

    const currentTimes = computed(() =>
        solves.value.filter((t) => t.sessionId === currentSession.value.id)
    );

    function clearWaitTimeout() {
        if (!import.meta.client) return;
        if (waitTimeout.value !== null) {
            window.clearTimeout(waitTimeout.value);
            waitTimeout.value = null;
        }
    }

    function reset() {
        isRunning.value = false;
        isWaiting.value = false;
        time.value = 0;
        clearWaitTimeout();
    }

    function stop() {
        isRunning.value = false;
        isWaiting.value = false;
        clearWaitTimeout();
    }

    function onSpaceDown() {
        if (isRunning.value) return;
        if (keyPressed.value) return;

        if (
            userPreferences.value.timer.showInspectionTime &&
            !isInspecting.value
        ) {
            keyPressed.value = true;
            isWaiting.value = true;
            if (import.meta.client) {
                waitTimeout.value = window.setTimeout(() => {
                    isWaiting.value = false;
                }, userPreferences.value.timer.waitTime);
            }
            return;
        }

        if (isInspecting.value) {
            keyPressed.value = true;
            isWaiting.value = true;
            if (import.meta.client) {
                waitTimeout.value = window.setTimeout(() => {
                    isWaiting.value = false;
                }, userPreferences.value.timer.waitTime);
            }
            return;
        }

        reset();
        isWaiting.value = true;
        keyPressed.value = true;

        if (import.meta.client) {
            waitTimeout.value = window.setTimeout(() => {
                isWaiting.value = false;
            }, userPreferences.value.timer.waitTime);
        }
    }

    function onSpaceUp(): 'none' | 'started' | 'stopped' {
        if (!import.meta.client) return 'none';

        if (isInspecting.value) {
            if (keyPressed.value) {
                keyPressed.value = false;
                if (!isWaiting.value) {
                    clearWaitTimeout();
                    isWaiting.value = false;
                    stopInspection();
                    isRunning.value = true;
                    return 'started';
                } else {
                    clearWaitTimeout();
                    isWaiting.value = false;
                    return 'none';
                }
            }
            return 'none';
        }

        if (isRunning.value) {
            stop();
            return 'stopped';
        }

        if (
            userPreferences.value.timer.showInspectionTime &&
            !isInspecting.value &&
            !isRunning.value
        ) {
            if (keyPressed.value) {
                keyPressed.value = false;
                if (!isWaiting.value) {
                    clearWaitTimeout();
                    isWaiting.value = false;
                    startInspection();
                    return 'none';
                } else {
                    clearWaitTimeout();
                    isWaiting.value = false;
                    return 'none';
                }
            }
        }

        if (keyPressed.value) {
            keyPressed.value = false;
            if (!isWaiting.value) {
                clearWaitTimeout();
                isWaiting.value = false;
                isRunning.value = true;
                return 'started';
            } else {
                isWaiting.value = false;
                clearWaitTimeout();
            }
        }

        return 'none';
    }

    async function finalizeSolve(ctx: FinalizeContext) {
        const now = new Date().toISOString();
        let finalTime = time.value;
        let status: Time['status'] = 'solved';
        if (inspectionPenalty.value === 'dnf') {
            status = 'dnf';
        } else if (inspectionPenalty.value === 'plusTwo') {
            status = 'plusTwo';
            finalTime = finalTime + 2;
        }

        const record: Time = {
            time: finalTime,
            id: Math.floor(Math.random() * 1000),
            sessionId: currentSession.value.id,
            status,
            createdAt: now,
            updatedAt: now,
        };

        if (ctx.userId && ctx.isPro) {
            try {
                await $fetch('/api/solves', {
                    method: 'POST',
                    body: {
                        time: record.time,
                        sessionId: currentSession.value.id,
                        sessionName: currentSession.value.label,
                        status: record.status,
                        scramble: ctx.scramble ?? null,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        }
    solves.value.push(record);

    // reset inspection penalty for next solve
    inspectionPenalty.value = 'none';
    }

    function removeTime(id: number) {
        solves.value = solves.value.filter((t) => t.id !== Number(id));
    }

    function dnf(id: number) {
        solves.value = solves.value.map((t) => {
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
        solves.value = solves.value.map((t) => {
            if (t.id === id) {
                if (t.status === 'plusTwo') {
                    return { ...t, time: t.time - 2, status: 'solved' };
                }
                return { ...t, time: t.time + 2, status: 'plusTwo' };
            }
            return t;
        });
    }

    watch(
        isRunning,
        (running) => {
            if (!import.meta.client) return;

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
        },
        { immediate: false }
    );

    function startInspection() {
        if (!import.meta.client) return;
        if (!userPreferences.value.timer.showInspectionTime) return;

        if (inspectionInterval) {
            window.clearInterval(inspectionInterval);
            inspectionInterval = undefined;
        }

        const start = window.performance.now();
        inspectionElapsed.value = 0;
        inspectionPenalty.value = 'none';
        isInspecting.value = true;

        const duration = Number(
            userPreferences.value.timer.inspectionTimeDuration ?? 15
        );

        inspectionInterval = window.setInterval(() => {
            const now = window.performance.now();
            inspectionElapsed.value = (now - start) / 1000;

            if (
                inspectionElapsed.value > duration + 2 &&
                inspectionPenalty.value !== 'dnf'
            ) {
                inspectionPenalty.value = 'dnf';
            } else if (
                inspectionElapsed.value > duration &&
                inspectionPenalty.value === 'none'
            ) {
                inspectionPenalty.value = 'plusTwo';
            }

            if (
                userPreferences.value.timer.autoStartOnInspectionTimeUp &&
                inspectionElapsed.value >= duration &&
                !isRunning.value &&
                isInspecting.value &&
                !keyPressed.value
            ) {
                stopInspection();
                isWaiting.value = false;
                isRunning.value = true;
            }
        }, 1);
    }

    function stopInspection() {
        if (!import.meta.client) return;
        if (inspectionInterval) {
            window.clearInterval(inspectionInterval);
            inspectionInterval = undefined;
        }
        isInspecting.value = false;
    }

    function dispose() {
        if (!import.meta.client) return;
        if (interval) {
            window.clearInterval(interval);
            interval = undefined;
        }
        clearWaitTimeout();
        if (inspectionInterval) {
            window.clearInterval(inspectionInterval);
            inspectionInterval = undefined;
        }
    }

    return {
        time,
        isRunning,
        keyPressed,
        isWaiting,
    isInspecting,
    inspectionElapsed,
    inspectionPenalty,
        userPreferences,
        sessions,
        currentSession,
        currentTimes,

        onSpaceDown,
        onSpaceUp,
        finalizeSolve,
        removeTime,
        dnf,
        plusTwo,
        reset,
        stop,
    startInspection,
    stopInspection,
        dispose,
    };
});
