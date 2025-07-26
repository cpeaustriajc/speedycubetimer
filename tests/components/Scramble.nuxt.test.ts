import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Scramble from '../../app/components/Scramble.vue';
import { randomScrambleForEvent } from 'cubing/scramble';

vi.mock('cubing/scramble', () => ({
    generateScramble: vi.fn(() => "R U R' U R U2 R'"),
    randomScrambleForEvent: vi.fn((eventId: string) => "U R U' L F2"),
}));

describe('Scramble.vue', () => {
    it('renders scramble on mount', async () => {
        const wrapper = mount(Scramble);
        // Wait for async scramble loading
        await new Promise((r) => setTimeout(r, 0));
        expect(wrapper.text()).toContain("U R U' L F2");
        expect(wrapper.find('twisty-player').exists()).toBe(true);
    });
});
