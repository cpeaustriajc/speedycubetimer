export function computeAverageOf12(times: Time[]) {
    if (times.length < 12) {
        return null;
    }

    const last12 = times.slice(-12);
    const sorted = last12.slice().sort((a, b) => a.time - b.time);
    sorted.pop();
    sorted.shift();
    sorted.pop();
    sorted.shift();

    const avg = sorted.reduce((a, b) => a + b.time, 0) / 8;
    return Number(avg.toFixed(2));
}
