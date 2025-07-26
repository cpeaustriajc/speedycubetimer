<template>
    <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div>
                <h1 class="text-2xl font-bold text-slate-800">KyuBix</h1>
            </div>
        </div>
        <DevOnly>
            <div class="flex items-center gap-2">
                <button
                    class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                    <Icon name="lucide:settings" class="lg:mr-2 h-4 w-4" />
                    <span class="sr-only lg:inline"> Settings </span>
                </button>
                <button
                    class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                    <Icon name="lucide:chart-bar" class="lg:mr-2 h-4 w-4" />
                    <span class="sr-only lg:inline"> Statistics </span>
                </button>
            </div>
        </DevOnly>
    </header>
</template>
