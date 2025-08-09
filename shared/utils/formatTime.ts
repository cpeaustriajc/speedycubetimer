export function formatTime(
    timeInSeconds: number,
    precision: number = 2
): string {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) {
        throw new Error('Invalid time value');
    }

    const p = Math.min(3, Math.max(0, Math.floor(precision)));

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const fractionUnits = Math.pow(10, p);
    const fraction = Math.floor((timeInSeconds % 1) * fractionUnits);

    const pad = (num: number, digits: number = 2) =>
        num.toString().padStart(digits, '0');

    const base =
        hours > 0
            ? [pad(hours), pad(minutes), pad(seconds)].join(':')
            : minutes > 0
            ? [pad(minutes), pad(seconds)].join(':')
            : pad(seconds);

    // Use dot as the decimal separator for fractional seconds
    return p > 0 ? `${base}.${pad(fraction, p)}` : base;
}
