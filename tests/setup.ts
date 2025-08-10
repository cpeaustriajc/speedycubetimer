import { vi } from 'vitest';

// Mock Clerk Vue to avoid network calls and secure context issues
vi.mock('@clerk/nuxt', () => ({}));
vi.stubGlobal('isSecureContext', true);
