<script lang="ts" setup>
import z from 'zod';

const timer = useTimerStore();
const { userPreferences } = storeToRefs(timer);

const settingsFormSchema = z.object({
    showInspectionTime: z.boolean().default(false),
    inspectionTimeDuration: z.number().default(15),
    autoStartOnInspectionTimeUp: z.boolean().default(false),
    clockPrecision: z.number().default(2),
    waitTime: z.number().default(200),
    hideUiDuringSolve: z.boolean().default(false),
});

type SettingsFormSchema = z.output<typeof settingsFormSchema>;

const settingsFormState = reactive<Partial<SettingsFormSchema>>({
    showInspectionTime: userPreferences.value.timer.showInspectionTime ?? false,
    inspectionTimeDuration:
        userPreferences.value.timer.inspectionTimeDuration ?? 15,
    autoStartOnInspectionTimeUp:
        userPreferences.value.timer.autoStartOnInspectionTimeUp ?? false,
    clockPrecision: userPreferences.value.timer.clockPrecision ?? 2,
    waitTime: userPreferences.value.timer.waitTime ?? 200,
    hideUiDuringSolve: userPreferences.value.timer.hideUiDuringSolve ?? false,
});

watch(
    () => userPreferences.value.timer,
    (prefs) => {
        settingsFormState.showInspectionTime = prefs.showInspectionTime;
        settingsFormState.inspectionTimeDuration = prefs.inspectionTimeDuration;
        settingsFormState.autoStartOnInspectionTimeUp =
            prefs.autoStartOnInspectionTimeUp;
        settingsFormState.clockPrecision = prefs.clockPrecision;
        settingsFormState.waitTime = prefs.waitTime;
    settingsFormState.hideUiDuringSolve = prefs.hideUiDuringSolve ?? false;
    },
    { deep: true }
);

watch(
    settingsFormState,
    (state) => {
        userPreferences.value.timer = {
            ...userPreferences.value.timer,
            showInspectionTime: Boolean(state.showInspectionTime),
            inspectionTimeDuration: Number(state.inspectionTimeDuration ?? 15),
            autoStartOnInspectionTimeUp: Boolean(
                state.autoStartOnInspectionTimeUp
            ),
            clockPrecision: Math.min(
                3,
                Math.max(0, Number(state.clockPrecision ?? 2))
            ),
            waitTime: Math.max(0, Number(state.waitTime ?? 200)),
            hideUiDuringSolve: Boolean(state.hideUiDuringSolve),
        };
    },
    { deep: true, immediate: true }
);
</script>

<template>
    <UCard>
        <template #header>
            <h2 class="text-lg font-bold">Settings</h2>
            <p class="font-medium dark:text-slate-400 text-slate-900">
                Customize your experience
            </p>
        </template>
        <UForm
            class="space-y-4"
            :schema="settingsFormSchema"
            :state="settingsFormState"
        >
            <UFormField label="Clock Precision">
                <UInputNumber
                    v-model="settingsFormState.clockPrecision"
                    :min="0"
                    :max="3"
                    :step="1"
                    label="Precision"
                />
            </UFormField>

            <USeparator />

            <UFormField label="Wait Time (ms)">
                <UInputNumber
                    v-model="settingsFormState.waitTime"
                    :min="0"
                    :max="1000"
                    label="Wait Time"
                />
            </UFormField>

            <USeparator />

            <UFormField label="Show Inspection Time">
                <USwitch
                    v-model="settingsFormState.showInspectionTime"
                    label="Show Inspection Time"
                />
            </UFormField>

            <UFormField label="Focus Mode (hide UI during solve/inspection)">
                <USwitch
                    v-model="settingsFormState.hideUiDuringSolve"
                    label="Hide other UI while solving"
                />
            </UFormField>
            <DevOnly>
                <div class="pl-5 space-y-4">
                    <UFormField
                        label="Inspection Time Duration (seconds)"
                        v-if="settingsFormState.showInspectionTime"
                    >
                        <UInputNumber
                            v-model="settingsFormState.inspectionTimeDuration"
                            :min="1"
                            :max="60"
                            label="Duration"
                        />
                    </UFormField>
                    <UFormField
                        label="Auto Start on Inspection Time Up"
                        v-if="settingsFormState.showInspectionTime"
                    >
                        <USwitch
                            v-model="
                                settingsFormState.autoStartOnInspectionTimeUp
                            "
                            label="Auto Start Timer"
                        />
                    </UFormField>
                </div>
                <USeparator />
            </DevOnly>
        </UForm>
    </UCard>
</template>
