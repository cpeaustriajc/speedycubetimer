<template>
    <UApp>
        <UAlert
            color="warning"
            variant="outline"
            title="Product is still in beta"
            description="Changes are frequent and are still unstable. The final product may differ from the current version."
            icon="i-lucide-alert-triangle"
        />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
