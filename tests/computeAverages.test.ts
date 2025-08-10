import { describe, it, expect } from 'vitest';
import { computeAverageOf5 } from '../shared/utils/computeAverageOf5';
import { computeAverageOf12 } from '../shared/utils/computeAverageOf12';

type Time = {
  time: number;
  id: number;
  status: 'solved' | 'dnf' | 'plusTwo';
  sessionId: string;
  createdAt: string;
  updatedAt: string;
};

const t = (time: number, id = Math.floor(Math.random() * 10000)): Time => ({
  time,
  id,
  status: 'solved',
  sessionId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

describe('computeAverageOf5', () => {
  it('returns null when fewer than 5 solves', () => {
    expect(computeAverageOf5([t(1), t(2), t(3), t(4)])).toBeNull();
  });

  it('drops best and worst and averages the remaining 3', () => {
    const times = [t(1), t(2), t(3), t(4), t(100)];
    // last 5 => [1,2,3,4,100] -> drop 1 and 100 -> avg(2,3,4) = 3.00
    expect(computeAverageOf5(times)).toBe(3.0);
  });
});

describe('computeAverageOf12', () => {
  it('returns null when fewer than 12 solves', () => {
    expect(
      computeAverageOf12(Array.from({ length: 11 }, (_, i) => t(i + 1)))
    ).toBeNull();
  });

  it('drops two best and two worst and averages the remaining 8', () => {
    const last12 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 100].map(t);
    // Sorted: 0,10,11,12,13,14,15,16,17,18,19,100
    // Drop two smallest (0,10) and two largest (100,19)
    // Remaining: 11..18 -> avg = 14.5
    expect(computeAverageOf12(last12)).toBe(14.5);
  });
});
