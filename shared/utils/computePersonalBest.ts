export function computePersonalBest(times: Time[]) {
    if (times.length === 0) {
        return null;
    }

    return Number(
        times.reduce((best, current) => {
            return current.time < best.time ? current : best;
        }, times[0]).time
    ).toFixed(2);
}
