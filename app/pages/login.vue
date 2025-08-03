<script lang="ts" setup>
import z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    layout: 'auth',
});

const { fetch } = useUserSession();
const toast = useToast();
const router = useRouter();

type LoginSchema = z.output<typeof loginSchema>;

const loginState = reactive<Partial<LoginSchema>>({
    email: '',
    password: '',
});

async function login(event: FormSubmitEvent<LoginSchema>) {
    await $fetch('/api/login', {
        method: 'POST',
        body: {
            email: event.data.email,
            password: event.data.password,
        },
    })
        .then(() => {
            fetch();

            toast.add({
                color: 'success',
                title: 'Login Successful',
            });

            router.back();
        })
        .catch((err) => {
            toast.add({
                color: 'error',
                title: 'Login Failed',
                description: err.data.message,
            });
        });
}
</script>

<template>
    <div class="max-w-sm mx-auto">
        <UCard>
            <template #header>
                <h2 class="text-2xl font-bold">Login</h2>
                <p class="text-sm text-slate-600">
                    Please enter your credentials to continue.
                </p>
            </template>
            <UForm
                :schema="loginSchema"
                :state="loginState"
                @submit="login"
                class="space-y-2"
            >
                <UFormField label="Email" name="email">
                    <UInput
                        v-model="loginState.email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </UFormField>

                <UFormField label="Password" name="password">
                    <UInput
                        v-model="loginState.password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </UFormField>

                <UButton type="submit">Login</UButton>
            </UForm>
        </UCard>
    </div>
</template>
