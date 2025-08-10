import { describe, it, expect, vi, beforeEach } from 'vitest';
import useScramble from '../../app/composables/useScramble';

vi.mock('cubing/scramble', () => ({
  randomScrambleForEvent: vi.fn(async () => ({ toString: () => 'R U R\' U\'' }))
}));

describe('useScramble composable', () => {
  beforeEach(() => {
    // reset global state if needed
  });

  it('loads a scramble string', async () => {
    const { scramble, loadScramble } = useScramble();
    expect(scramble.value).toBeUndefined();
    await loadScramble();
    expect(scramble.value).toBe("R U R' U'");
  });
});
