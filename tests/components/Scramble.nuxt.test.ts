import { describe, it, expect } from 'vitest';
import useScramble from '../../app/composables/useScramble';

describe('useScramble', () => {
    it.todo('should return a scramble as a string', async () => {
        const { scramble, loadScramble } = useScramble();

        // Initially, scramble should be empty
        expect(scramble.value).toBeTypeOf('undefined');

        // Load a scramble
        await loadScramble();

        // After loading, scramble should be a non-empty string
        expect(scramble.value).toBeDefined();
        expect(scramble.value).toBeTypeOf('string');
    });
});
