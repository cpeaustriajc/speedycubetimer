export function formatTime(timeInSeconds: number): string {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) {
        throw new Error('Invalid time value');
    }

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const centiseconds = Math.floor((timeInSeconds % 1) * 100);

    const pad = (num: number, digits: number = 2) => num.toString().padStart(digits, '0');

    const timeComponents: string[] = [];

    if (hours > 0) {
        timeComponents.push(pad(hours), pad(minutes), pad(seconds));
        return `${timeComponents.join(':')}:${pad(centiseconds)}`;
    }

    if (minutes > 0) {
        timeComponents.push(pad(minutes), pad(seconds));
        return `${timeComponents.join(':')}:${pad(centiseconds)}`;
    }

    return `${pad(seconds)}:${pad(centiseconds)}`;
}
