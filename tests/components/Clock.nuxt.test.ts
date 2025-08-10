import { describe, it, expect, vi } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';

import { Clock } from '#components';

const { formatTime } = vi.hoisted(() => {
    return {
        formatTime: vi.fn(() => '0.00'),
    };
});

mockNuxtImport('formatTime', () => {
    return formatTime;
});

describe('Clock component', () => {
    it('should render 0.00 seconds initially', async () => {
        const wrapper = await mountSuspended(Clock, {
            props: {
                time: 0,
                isRunning: false,
                keyPressed: false,
                isWaiting: false,
            },
        });
        expect(wrapper.text()).toContain('0.00');
    });

    it('should not update time immediately after pressing spacebar', async () => {
        const wrapper = await mountSuspended(Clock, {
            props: {
                time: 0,
                isRunning: false,
                keyPressed: false,
                isWaiting: false,
            },
        });
        const initialTime = wrapper.text();

        await wrapper.trigger('keydown', { key: ' ' });

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(wrapper.text()).toBe(initialTime);
    });
});
