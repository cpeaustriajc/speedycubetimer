import { describe, it, expect } from 'vitest';
import loginSchema from '../../shared/utils/loginSchema';
import registerSchema from '../../shared/utils/registerSchema';

describe('loginSchema (Zod v4)', () => {
  it('accepts valid email and password', () => {
    const data = { email: 'user@example.com', password: 'secret12' };
    expect(() => loginSchema.parse(data)).not.toThrow();
  });

  it('rejects invalid email', () => {
    const data = { email: 'not-an-email', password: 'secret12' };
    expect(() => loginSchema.parse(data)).toThrow();
  });
});

describe('registerSchema (Zod v4)', () => {
  const base = {
    email: 'user@example.com',
    name: 'User',
    avatar: new File([new Blob(['x'])], 'a.png', { type: 'image/png' }),
    password: 'secret12',
    confirmPassword: 'secret12',
  };

  it('accepts valid data', () => {
    expect(() => registerSchema.parse(base)).not.toThrow();
  });

  it("uses 'error' key for mismatch message and targets confirmPassword path", () => {
    // Keep confirmPassword length valid to avoid min-length error overshadowing refine
    const bad = { ...base, confirmPassword: 'different' };
    try {
      registerSchema.parse(bad);
    } catch (e: any) {
      const issue = e.issues?.[0];
      expect(issue?.path).toEqual(['confirmPassword']);
      expect(issue?.message).toBe("Passwords don't match");
    }
  });
});
