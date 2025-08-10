import { describe, it, expect } from 'vitest';
import { computeAverageOf5 } from '../../shared/utils/computeAverageOf5';
import { computeAverageOf12 } from '../../shared/utils/computeAverageOf12';

type Time = {
  time: number;
  id: number;
  status: 'solved' | 'dnf' | 'plusTwo';
  sessionId: string;
  createdAt: string;
  updatedAt: string;
};

function t(time: number, id = Math.floor(Math.random()*100000)): Time {
  const now = new Date().toISOString();
  return { time: Number(time.toFixed(2)), id, status: 'solved', sessionId: '1', createdAt: now, updatedAt: now };
}

describe('Averages utils', () => {
  it('computeAverageOf5 returns null with <5 times', () => {
    const times: Time[] = [t(10), t(12), t(11), t(9)];
    expect(computeAverageOf5(times)).toBeNull();
  });

  it('computeAverageOf5 drops best and worst and averages remaining 3', () => {
    const times: Time[] = [t(10), t(9), t(11), t(13), t(8)];
    // last 5: [10,9,11,13,8] -> sorted [8,9,10,11,13]
    // drop 8 and 13, average [9,10,11] = 10.00
    expect(computeAverageOf5(times)).toBe(10);
  });

  it('computeAverageOf12 returns null with <12 times', () => {
    const times: Time[] = Array.from({ length: 11 }, (_, i) => t(10 + i));
    expect(computeAverageOf12(times)).toBeNull();
  });

  it('computeAverageOf12 drops two best and two worst and averages remaining 8', () => {
    // Construct 12 times where extremes are clear
  const base = [11, 12, 13, 14, 15, 16, 17, 18]; // middle 8 -> average 14.5
  const extremes = [5, 7, 30, 25]; // two best (5,7) and two worst (30,25)
    const sequence = [...extremes.slice(0, 2), ...base, ...extremes.slice(2)];
    const times: Time[] = sequence.map((v, i) => t(v, i + 1));
  expect(computeAverageOf12(times)).toBe(14.5);
  });
});
