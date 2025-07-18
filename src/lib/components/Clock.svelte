<script lang="ts">
	import { formatTime } from '$lib';

	let {
		time,
		isRunning,
		keyPressed
	}: {
		time: number;
		isRunning: boolean;
		keyPressed: boolean;
	} = $props();
</script>

<div
	class="relative overflow-hidden rounded-lg border shadow-sm"
	class:bg-white={!isRunning && !keyPressed}
	class:bg-green-400={isRunning && !keyPressed}
	class:bg-yellow-400={keyPressed}
>
	<div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
	<div class="relative z-10 text-center">
		<pre
			class="mb-6 font-mono text-8xl font-bold tracking-tight text-slate-800 md:text-9xl">{formatTime(
				time
			)}</pre>
	</div>
</div>
