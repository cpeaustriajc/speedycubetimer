export type Time = {
	time: number;
	id: number;
};

export function formatTime(timeInSeconds: number) {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	const milliseconds = Math.floor((timeInSeconds % 1) * 100);

	const parts = [];

	if (hours > 0) {
		parts.push(hours.toString().padStart(2, '0'));
	}

	if (hours > 0 || minutes > 0) {
		parts.push(minutes.toString().padStart(2, '0'));
	}

	parts.push(seconds.toString().padStart(2, '0'));
	parts.push(milliseconds.toString().padStart(2, '0'));

	if (parts.length > 2) {
		return `${parts.slice(0, -2).join(':')}:${parts.slice(-2).join('.')}`;
	} else {
		return parts.join('.');
	}
}

export function computeAverageOf5(times: Time[]) {
	if (times.length < 5) {
		return null;
	}

	const last5 = times.slice(-5);
	const sorted = last5.slice().sort((a, b) => a.time - b.time);
	sorted.pop();
	sorted.shift();

	return sorted.reduce((a, b) => a + b.time, 0) / 3;
}
