import { describe, it, expect } from 'vitest';
import { computePersonalBest } from '../../shared/utils/computePersonalBest';

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

describe('computePersonalBest', () => {
  it('returns null for empty array', () => {
    expect(computePersonalBest([] as unknown as Time[])).toBeNull();
  });

  it('returns lowest time formatted to 2 decimals as string number', () => {
    const times: Time[] = [t(12.345), t(11.1), t(9.999), t(10.005)];
    // best is 9.999 -> toFixed(2) => "10.00"
    expect(computePersonalBest(times)).toBe("10.00");
  });
});
