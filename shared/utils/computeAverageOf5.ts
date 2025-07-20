export function computeAverageOf5(times: Time[]) {
    if (times.length < 5) {
        return null;
    }

    const last5 = times.slice(-5);
    const sorted = last5.slice().sort((a, b) => a.time - b.time);
    sorted.pop();
    sorted.shift();

    const avg = sorted.reduce((a, b) => a + b.time, 0) / 3;
    return Number(avg.toFixed(2));
}
