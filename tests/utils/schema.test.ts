import { describe, it, expect } from 'vitest';
import loginSchema from '../../shared/utils/loginSchema';
import registerSchema from '../../shared/utils/registerSchema';

describe('loginSchema', () => {
  it('accepts valid email and password', () => {
    const parsed = loginSchema.safeParse({ email: 'user@example.com', password: 'secret1' });
    expect(parsed.success).toBe(true);
  });

  it('rejects short password', () => {
    const parsed = loginSchema.safeParse({ email: 'user@example.com', password: '123' });
    expect(parsed.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const parsed = loginSchema.safeParse({ email: 'not-an-email', password: 'password123' });
    expect(parsed.success).toBe(false);
  });
});

describe('registerSchema', () => {
  const file = new File([new Uint8Array([1,2,3])], 'avatar.jpg', { type: 'image/jpeg' });

  it('accepts valid payload', () => {
    const data = {
      email: 'user@example.com',
      name: 'User',
      avatar: file,
      password: 'password123',
      confirmPassword: 'password123',
    };
    const parsed = registerSchema.safeParse(data);
    expect(parsed.success).toBe(true);
  });

  it("rejects when passwords don't match", () => {
    const data = {
      email: 'user@example.com',
      name: 'User',
      avatar: file,
      password: 'password123',
      confirmPassword: 'password124',
    };
    const parsed = registerSchema.safeParse(data);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const issue = parsed.error.issues.find(i => i.path.join('.') === 'confirmPassword');
      expect(issue?.message).toBe("Passwords don't match");
    }
  });
});
