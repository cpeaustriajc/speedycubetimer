<script lang="ts">
	import { Settings, ChartBar } from '@lucide/svelte';
	import 'cubing/twisty';
	import Sessions from '$lib/components/Sessions.svelte';
	import Solves from '$lib/components/Solves.svelte';
	import Scramble from '$lib/components/Scramble.svelte';
	import Clock from '$lib/components/Clock.svelte';
	import { ClockIcon } from '@lucide/svelte';
	import type { Time } from '$lib';
	import Header from '$lib/components/Header.svelte';
	import PersonalBest from '$lib/components/PersonalBest.svelte';
	import AverageOf5 from '$lib/components/AverageOf5.svelte';
	import AverageOf12 from '$lib/components/AverageOf12.svelte';

	type Times = Time[];

	let time = $state(0);
	let times = $state<Times>([]);
	let isRunning = $state(false);
	let keyPressed = $state(false);
	let currentSession = $state('1');

	function stop() {
		isRunning = false;
	}

	function reset() {
		isRunning = false;
		time = 0;
	}
	function handleKeyUp(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (isRunning) {
				times.push({ time: time, id: Math.floor(Math.random() * 1000) });
				stop();
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
                reset();
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
<div class="min-h-dvh p-4">
	<div class="mx-auto max-w-7xl">
		<Header />
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
			<aside class="lg:col-span-1">
				<Sessions {currentSession} {times} />
				<Solves {times} />
			</aside>
			<main class="space-y-6 lg:col-span-3">
				<Scramble />
				<Clock {isRunning} {keyPressed} {time} />

				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<PersonalBest {times} />
					<AverageOf5 {times} />
					<AverageOf12 {times} />
				</div>
			</main>
		</div>
	</div>
</div>
