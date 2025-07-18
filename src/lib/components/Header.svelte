<script lang="ts">
	import { ChartBarIcon, ClockIcon, SettingsIcon } from '@lucide/svelte';
</script>

<header class="mb-6 flex items-center justify-between">
	<div class="flex items-center gap-3">
		<div
			class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
		>
			<ClockIcon class="h-6 w-6 text-white" />
		</div>
		<div>
			<h1 class="text-2xl font-bold text-slate-800">Speedy Cube Timer</h1>
			<p class="text-sm text-slate-600">Professional Speed Cube Timer</p>
		</div>
	</div>
	<div class="flex items-center gap-2">
		<button
			class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
		>
			<SettingsIcon class="mr-2 h-4 w-4" />
			Settings
		</button>
		<button
			class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
		>
			<ChartBarIcon class="mr-2 h-4 w-4" />
			Statistics
		</button>
	</div>
</header>
