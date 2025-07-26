<script setup lang="ts">
import type z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    layout: 'auth',
});

type RegisterSchema = z.output<typeof registerSchema>;

const registerState = reactive<Partial<RegisterSchema>>({
    email: undefined,
    name: undefined,
    avatar: undefined,
    password: undefined,
    confirmPassword: undefined,
});

const toast = useToast();
const { fetch } = useUserSession();

async function register(event: FormSubmitEvent<RegisterSchema>) {
    const formData = new FormData();

    if (event.data.avatar) {
        formData.append('avatar', event.data.avatar);
    }

    formData.append('email', event.data.email);
    formData.append('name', event.data.name);
    formData.append('password', event.data.password);
    formData.append('confirmPassword', event.data.confirmPassword);

    await $fetch('/api/register', {
        method: 'POST',
        body: formData,
    })
        .then(() => {
            fetch();
            toast.add({
                color: 'success',
                title: 'Registration Successful',
            });
        })
        .catch((err) => {
            toast.add({
                color: 'error',
                title: 'Registration Failed',
                description: err.data.message,
            });
        });
}
function createObjectUrl(file: File): string {
    return URL.createObjectURL(file);
}
</script>
<template>
    <div class="max-w-sm mx-auto">
        <UCard>
            <template #header>
                <h2 class="text-2xl font-bold">Register</h2>
            </template>
            <UForm
                :schema="registerSchema"
                :state="registerState"
                class="space-y-4"
                @submit="register"
            >
                <UFormField label="Avatar URL" name="avatar">
                    <UFileUpload
                        v-slot="{ open, removeFile }"
                        v-model="registerState.avatar"
                        accept="image/*"
                    >
                        <div class="flex flex-wrap items-center gap-3">
                            <UAvatar
                                size="lg"
                                :src="
                                    registerState.avatar
                                        ? createObjectUrl(registerState.avatar)
                                        : undefined
                                "
                                icon="i-lucide-image"
                            />

                            <UButton
                                :label="
                                    registerState.avatar
                                        ? 'Change image'
                                        : 'Upload image'
                                "
                                color="neutral"
                                variant="outline"
                                @click="open()"
                            />
                        </div>

                        <p
                            v-if="registerState.avatar"
                            class="text-xs text-muted mt-1.5"
                        >
                            {{ registerState.avatar.name }}

                            <UButton
                                label="Remove"
                                color="error"
                                variant="link"
                                size="xs"
                                class="p-0"
                                @click="removeFile()"
                            />
                        </p>
                    </UFileUpload>
                </UFormField>
                <UFormField label="Email" name="email">
                    <UInput v-model="registerState.email" type="email" />
                </UFormField>
                <UFormField label="Name" name="name">
                    <UInput v-model="registerState.name" />
                </UFormField>
                <UFormField label="Password" name="password">
                    <UInput v-model="registerState.password" type="password" />
                </UFormField>
                <UFormField label="Confirm Password" name="confirmPassword">
                    <UInput
                        v-model="registerState.confirmPassword"
                        type="password"
                    />
                </UFormField>
                <UButton type="submit" label="Register" block />
            </UForm>
        </UCard>
    </div>
</template>
