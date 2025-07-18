<script lang="ts">
	import { RotateCcw, Shuffle } from '@lucide/svelte';
	import type { Alg } from 'cubing/alg';
	import { randomScrambleForEvent } from 'cubing/scramble';

	let scramble = $state<Alg | undefined>(undefined);

	async function loadScramble() {
		scramble = await randomScrambleForEvent('333');
		return scramble.toString();
	}

	$effect(() => {
		if (!scramble) loadScramble();
	});
</script>

<div class="rounded-lg border bg-white shadow-sm">
	<div class="p-6">
		<div class="mb-4 flex items-center gap-3">
			<Shuffle class="h-5 w-5 text-slate-600" />
			<span class="font-medium text-slate-700">Scramble</span>
			<button
				class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				onclick={() => loadScramble()}
			>
				<RotateCcw className="w-4 h-4" />
			</button>
		</div>
		<div class="min-h-6 text-center font-mono text-lg leading-relaxed text-slate-800">
			{#if scramble}
				<p>{scramble}</p>
			{/if}
		</div>
		<div class="flex min-h-64 justify-center">
			{#if scramble}
				<twisty-player alg={scramble} visualization="2D" background="none" control-panel="none">
				</twisty-player>
			{/if}
		</div>
	</div>
</div>
