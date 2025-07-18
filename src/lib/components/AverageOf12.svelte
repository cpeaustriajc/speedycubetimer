<script lang="ts">
	import { TrophyIcon } from '@lucide/svelte';
	import { computeAverageOf12, type Time } from '$lib';

    let { times }: { times: Time[] } = $props();

</script>

<div class="rounded-lg border bg-white shadow-sm">
	<div class="p-6">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
				<TrophyIcon class="w-5 h-5 text-purple-600" />
			</div>
			<div>
				<div class="text-2xl font-bold text-slate-800">{computeAverageOf12(times)}</div>
				<div class="text-sm text-slate-600">Average of 12</div>
			</div>
		</div>
	</div>
</div>
