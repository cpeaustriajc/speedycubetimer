<script lang="ts">
	import type { Alg } from 'cubing/alg';
	import { randomScrambleForEvent } from 'cubing/scramble';
	import { computeAverageOf12, computeAverageOf5, formatTime } from '$lib';
	import { Clock, Settings, BarChart3, Trash, Shuffle, RotateCcw } from '@lucide/svelte';
	import 'cubing/twisty';

	type Times = { time: number; id: number; scramble: Alg | undefined }[];

	let time = $state(0);
	let times = $state<Times>([]);
	let scramble = $state<Alg | undefined>(undefined);
	let isRunning = $state(false);
	let keyPressed = $state(false);

	async function loadScramble() {
		scramble = await randomScrambleForEvent('333');
		return scramble.toString();
	}

	function reset() {
		isRunning = false;
		time = 0;
	}

	function handleKeyUp(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (isRunning) {
				times.push({ time: time, id: Math.floor(Math.random() * 1000), scramble: scramble });
				reset();
			} else {
				keyPressed = false;
				isRunning = true;
			}
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (!isRunning) {
				keyPressed = true;
			}
		}
	}

	$effect(() => {
		if (!scramble) loadScramble();
	});

	$effect(() => {
		let startTime: number;
		let interval: number | undefined;
		if (isRunning) {
			startTime = window.performance.now();

			interval = window.setInterval(() => {
				const currentTime = window.performance.now();
				time = (currentTime - startTime) / 1000;
			}, 1);
		} else {
			window.clearInterval(interval);
		}

		return () => {
			window.clearInterval(interval);
		};
	});
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<svelte:head>
	<title>Speedy Cube Timer</title>
	<meta name="description" content="Fast and open-source rubik's cube timer" />
</svelte:head>
<div
	class="min-h-dvh p-4"
	class:bg-slate-50={!isRunning && !keyPressed}
	class:bg-green-400={isRunning && !keyPressed}
	class:bg-yellow-400={keyPressed}
>
	<div class="mx-auto max-w-7xl">
		<header class="mb-6 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
				>
					<Clock class="h-6 w-6 text-white" />
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
					<Settings class="mr-2 h-4 w-4" />
					Settings
				</button>
				<button
					class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					<BarChart3 class="mr-2 h-4 w-4" />
					Statistics
				</button>
			</div>
		</header>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
			<aside class="lg:col-span-1">
				<div class="rounded-lg border bg-white shadow-sm min-h-80">
					<div class="flex flex-col space-y-1.5 p-6 pb-3">
						<h3 class="text-lg font-semibold leading-none tracking-tight">Recent Solves</h3>
					</div>
					<div class="p-6 pt-0">
						<div class="space-y-2">
							{#each times as solve (solve.id)}
								<div
									class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100"
								>
									<span class="font-mono text-sm font-medium">{formatTime(solve.time)}</span>

									<div class="flex items-center gap-2">
										<span class="text-xs text-slate-500"> {computeAverageOf5(times) ?? 'TBD'}</span>
										<span class="text-xs text-slate-400">|</span>
										<span class="text-xs text-slate-500">{computeAverageOf12(times) ?? 'TBD'}</span>
										<button
											type="button"
											class="text-xs text-red-500 hover:text-red-700"
											onclick={() => (times = times.filter((val) => val.id !== solve.id))}
										>
											<Trash class="h-3 w-3" />
										</button>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</aside>
			<main class="space-y-6 lg:col-span-3">
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
								<twisty-player
									alg={scramble}
									visualization="2D"
									background="none"
									control-panel="none"
								>
								</twisty-player>
							{/if}
						</div>
					</div>
				</div>
				<div class="relative overflow-hidden rounded-lg border bg-white shadow-sm">
					<div
						class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"
					></div>
					<div class="text-center relative z-10">
						<pre
							class="mb-6 font-mono text-8xl font-bold tracking-tight text-slate-800 md:text-9xl">{formatTime(
								time
							)}</pre>
					</div>
				</div>
			</main>
		</div>
	</div>
</div>
