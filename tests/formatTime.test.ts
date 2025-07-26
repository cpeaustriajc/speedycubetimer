import { describe, it, expect } from 'vitest';
import { formatTime } from '../shared/utils/formatTime';

describe('formatTime', () => {
    it('should throw an error for non-number input', () => {
        expect(() => formatTime('string' as any)).toThrow('Invalid time value');
        expect(() => formatTime(null as any)).toThrow('Invalid time value');
        expect(() => formatTime(undefined as any)).toThrow(
            'Invalid time value'
        );
        expect(() => formatTime({} as any)).toThrow('Invalid time value');
    });

    it('should format 0 milliseconds as "00:00"', () => {
        expect(formatTime(0)).toBe('00:00');
    });

    it('should format 0.01 milliseconds as "00.01"', () => {
        expect(formatTime(0.01)).toBe('00:01');
    });

    it('should format 0.1 milliseconds as "00:10"', () => {
        expect(formatTime(0.1)).toBe('00:10');
    });

    it('should format 1.00 milliseconds as second', () => {
        expect(formatTime(1.00)).toBe('01:00');
    });

    it('should format 61 seconds as "01:01:00"', () => {
        expect(formatTime(61)).toBe('01:01:00');
    });
});
