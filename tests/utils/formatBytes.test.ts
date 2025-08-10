import { describe, it, expect } from 'vitest';
import formatBytes from '../../shared/utils/formatBytes';

describe('formatBytes', () => {
  it('formats 0 as 0 Bytes', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
  });

  it('formats bytes to KB with 2 decimals', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1536)).toBe('1.5 KB');
  });

  it('uses provided decimals (trimmed by parseFloat in implementation)', () => {
    expect(formatBytes(1048576, 0)).toBe('1 MB');
    // Implementation uses parseFloat, so trailing zeros are trimmed
    expect(formatBytes(1048576, 3)).toBe('1 MB');
  });
});
