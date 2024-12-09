<script lang="ts">
	import type { Alg } from 'cubing/alg';
	import { randomScrambleForEvent } from 'cubing/scramble';
	import { computeAverageOf5, formatTime } from '$lib';

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
<div class="flex h-dvh" class:bg-green-400={isRunning} class:bg-yellow-400={keyPressed}>
	<aside class="w-1/4">
		<table>
			<thead>
				<tr>
					<th>Time</th>
					<th>Average of 5</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each times as time (time.id)}
					<tr>
						<td>{formatTime(time.time)}</td>

						<td
							>{#if times.length > 5}
								{computeAverageOf5(times)}
							{:else}
								-
							{/if}
						</td>
						<td>
							<button
								type="button"
								onclick={() => (times = times.filter((val) => val.id !== time.id))}>Delete</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</aside>
	<main class="flex flex-col items-center justify-center">
		{#await loadScramble()}
			<p>Loading...</p>
		{:then scramble}
			<twisty-player alg={scramble} visualization="2D" background="none" control-panel="none">
			</twisty-player>
			<pre class="text-9xl">{formatTime(time)}</pre>
			<p>{scramble}</p>
		{:catch error}
			<p class="text-red-400">{error.message}</p>
		{/await}
	</main>
</div>
