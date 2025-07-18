<script lang="ts">
	import { TrophyIcon } from '@lucide/svelte';
	import { computeAverageOf12, type Time } from '$lib';

	let { times }: { times: Time[] } = $props();
</script>

<div class="rounded-lg border bg-white shadow-sm">
	<div class="p-6">
		<div class="flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
				<TrophyIcon class="h-5 w-5 text-purple-600" />
			</div>
			<div>
				<div class="text-2xl font-bold text-slate-800">{computeAverageOf12(times) ?? 'N/A'}</div>
				<div class="text-sm text-slate-600">Average of 12</div>
			</div>
		</div>
	</div>
</div>
